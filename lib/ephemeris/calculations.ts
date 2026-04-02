// Core Swiss Ephemeris calculation functions
// Server-only — all functions run on the server via API routes

import { initEphemeris } from "./client";
import { SE_MEAN_NODE } from "@/lib/astro/planets";
import {
  getIndexFromDegree,
  getPadaFromDegree,
} from "@/lib/astro/constants";
import type { PlanetPosition, DetailLevel } from "@/lib/astro/types";

// Swiss Ephemeris flags (matching your Python: swe.FLG_SWIEPH + swe.FLG_SIDEREAL + swe.FLG_SPEED)
const SEFLG_SWIEPH = 2;           // Use Swiss Ephemeris data files
const SEFLG_SPEED = 256;          // Include speed data
const SEFLG_SIDEREAL = 64 * 1024; // Sidereal zodiac

// Cache sweph module reference
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let swephModule: any = null;

async function getSweph() {
  if (!swephModule) {
    await initEphemeris();
    try {
      swephModule = await import(/* webpackIgnore: true */ "sweph");
    } catch {
      return null;
    }
  }
  return swephModule;
}

// Convert a JS Date to Julian Day number
export function dateToJd(date: Date): number {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day =
    date.getUTCDate() +
    date.getUTCHours() / 24 +
    date.getUTCMinutes() / 1440 +
    date.getUTCSeconds() / 86400;

  // Julian Day calculation (Meeus algorithm)
  let y = year;
  let m = month;
  if (m <= 2) {
    y -= 1;
    m += 12;
  }
  const A = Math.floor(y / 100);
  const B = 2 - A + Math.floor(A / 4);
  return (
    Math.floor(365.25 * (y + 4716)) +
    Math.floor(30.6001 * (m + 1)) +
    day +
    B -
    1524.5
  );
}

// Convert Julian Day to JS Date
export function jdToDate(jd: number): Date {
  const z = Math.floor(jd + 0.5);
  const f = jd + 0.5 - z;
  let A: number;
  if (z < 2299161) {
    A = z;
  } else {
    const alpha = Math.floor((z - 1867216.25) / 36524.25);
    A = z + 1 + alpha - Math.floor(alpha / 4);
  }
  const B = A + 1524;
  const C = Math.floor((B - 122.1) / 365.25);
  const D = Math.floor(365.25 * C);
  const E = Math.floor((B - D) / 30.6001);

  const day = B - D - Math.floor(30.6001 * E) + f;
  const month = E < 14 ? E - 1 : E - 13;
  const year = month > 2 ? C - 4716 : C - 4715;

  const dayInt = Math.floor(day);
  const dayFrac = day - dayInt;
  const hours = Math.floor(dayFrac * 24);
  const minutes = Math.floor((dayFrac * 24 - hours) * 60);
  const seconds = Math.floor(
    ((dayFrac * 24 - hours) * 60 - minutes) * 60
  );

  return new Date(Date.UTC(year, month - 1, dayInt, hours, minutes, seconds));
}

// Get planet position at a given Julian Day
export async function getPlanetPosition(
  swephId: number,
  jd: number,
  isKetu: boolean = false
): Promise<PlanetPosition> {
  const sweph = await getSweph();

  if (sweph) {
    try {
      const actualId = isKetu ? SE_MEAN_NODE : swephId;
      const flags = SEFLG_SWIEPH | SEFLG_SIDEREAL | SEFLG_SPEED;
      const result = sweph.calc_ut(jd, actualId, flags);

      if (result.error && result.error.length > 0) {
        throw new Error(result.error);
      }

      let longitude = result.data[0];
      const latitude = result.data[1];
      let speed = result.data[3];

      // For Ketu: add 180° to Rahu's longitude (same speed, same retrograde)
      if (isKetu) {
        longitude = (longitude + 180) % 360;
        // Speed stays the same as Rahu (both nodes move together)
      }

      const rashiIndex = Math.floor(longitude / 30);
      const rashiDegree = longitude % 30;
      const nakshatraIndex = getIndexFromDegree(longitude, "nakshatra");
      const { pada, absolutePada } = getPadaFromDegree(longitude);

      return {
        longitude,
        latitude,
        speed,
        isRetrograde: speed < 0,
        rashiIndex,
        rashiDegree,
        nakshatraIndex,
        padaIndex: pada,
        absolutePadaIndex: absolutePada,
      };
    } catch (error) {
      console.error("[Ephemeris] calc_ut error:", error);
    }
  }

  // Mock fallback when sweph not available
  return getMockPosition(swephId, jd, isKetu);
}

// Get TROPICAL longitude + speed for a planet (no sidereal correction)
// Used for combustion calculation — matching Python's COMBUST_FLAGS = FLG_SWIEPH | FLG_SPEED
export async function getTropicalPosition(
  swephId: number,
  jd: number
): Promise<{ longitude: number; speed: number }> {
  const sweph = await getSweph();

  if (sweph) {
    try {
      const flags = SEFLG_SWIEPH | SEFLG_SPEED; // NO sidereal flag
      const result = sweph.calc_ut(jd, swephId, flags);

      if (result.error && result.error.length > 0) {
        throw new Error(result.error);
      }

      return {
        longitude: result.data[0],
        speed: result.data[3],
      };
    } catch (error) {
      console.error("[Ephemeris] tropical calc_ut error:", error);
    }
  }

  // Mock fallback — approximate tropical by adding ~24° ayanamsa to sidereal mock
  const mockPos = getMockPosition(swephId, jd, false);
  return { longitude: (mockPos.longitude + 24.2) % 360, speed: mockPos.speed };
}

// Mock position generator for development without ephemeris files
function getMockPosition(
  swephId: number,
  jd: number,
  isKetu: boolean
): PlanetPosition {
  // Generate deterministic but realistic-looking positions
  const baseSpeed = [
    1.0, 13.0, 1.6, 1.2, 0.083, 1.2, 0.033, 0.012, 0.006, 0.004,
    -0.053, 0, // Rahu moves retrograde
  ];
  const speed = baseSpeed[isKetu ? 10 : swephId] || 0.05;
  const baseOffset = (swephId * 47 + (isKetu ? 180 : 0)) % 360;

  // Simple linear motion from a base date (J2000)
  const daysSinceJ2000 = jd - 2451545.0;
  let longitude = (baseOffset + speed * daysSinceJ2000) % 360;
  if (longitude < 0) longitude += 360;

  const rashiIndex = Math.floor(longitude / 30);
  const rashiDegree = longitude % 30;
  const nakshatraIndex = getIndexFromDegree(longitude, "nakshatra");
  const { pada, absolutePada } = getPadaFromDegree(longitude);

  return {
    longitude,
    latitude: 0,
    speed: isKetu ? 0.053 : speed,
    isRetrograde: isKetu || swephId === SE_MEAN_NODE,
    rashiIndex,
    rashiDegree,
    nakshatraIndex,
    padaIndex: pada,
    absolutePadaIndex: absolutePada,
  };
}
