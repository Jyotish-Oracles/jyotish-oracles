// Combustion interval detection — OPTIMIZED
// Pre-computes Sun + combustible planet positions, checks thresholds from cache.
// All positions use sidereal (Lahiri).

import { getPlanetPosition, dateToJd, jdToDate } from "./calculations";
import { SE_SUN, PLANETS } from "@/lib/astro/planets";
import type { CombustionEvent } from "@/lib/astro/types";

const COMBUSTION_THRESHOLDS: Record<string, number> = {
  mars: 17.0,
  mercury: 14.0,
  venus: 10.0,
  jupiter: 11.0,
  saturn: 15.0,
};

const COMBUSTION_THRESHOLDS_RETRO: Record<string, number> = {
  mercury: 12.0,
  venus: 8.0,
};

function norm360(x: number): number {
  x = x % 360;
  if (x < 0) x += 360;
  return x;
}

function lonSepDeg(l1: number, l2: number): number {
  const d = norm360(l1 - l2 + 180) - 180;
  return Math.abs(d);
}

function getThreshold(planetId: string, isRetro: boolean): number {
  if (isRetro && COMBUSTION_THRESHOLDS_RETRO[planetId] !== undefined) {
    return COMBUSTION_THRESHOLDS_RETRO[planetId];
  }
  return COMBUSTION_THRESHOLDS[planetId] || 0;
}

// Binary search for combustion threshold crossing (~20 calls)
async function refineCombustionCrossing(
  jd0: number,
  jd1: number,
  swephId: number,
  planetId: string
): Promise<number> {
  const pos0 = await getPlanetPosition(swephId, jd0);
  const sunPos0 = await getPlanetPosition(SE_SUN, jd0);
  const threshold = getThreshold(planetId, pos0.isRetrograde);
  let f0 = lonSepDeg(pos0.longitude, sunPos0.longitude) - threshold;

  for (let i = 0; i < 20; i++) {
    const mid = (jd0 + jd1) / 2;
    if (Math.abs(jd1 - jd0) < 1e-5) return mid;

    const posM = await getPlanetPosition(swephId, mid);
    const sunM = await getPlanetPosition(SE_SUN, mid);
    const fm = lonSepDeg(posM.longitude, sunM.longitude) - getThreshold(planetId, posM.isRetrograde);

    if (f0 * fm <= 0) {
      jd1 = mid;
    } else {
      jd0 = mid;
      f0 = fm;
    }
  }
  return (jd0 + jd1) / 2;
}

export async function computeCombustion(
  startDate: Date,
  endDate: Date
): Promise<CombustionEvent[]> {
  const jdStart = dateToJd(startDate);
  const jdEnd = dateToJd(endDate);
  // 6-hour steps for combustion (Sun moves ~1°/day, planets ~0-2°/day)
  const stepDays = 6 / 24;

  const combustiblePlanets = PLANETS.filter(
    (p) => COMBUSTION_THRESHOLDS[p.id] !== undefined
  );

  // Pre-compute Sun positions at all steps
  const steps: number[] = [];
  for (let jd = jdStart; jd <= jdEnd; jd += stepDays) steps.push(jd);
  if (steps[steps.length - 1] < jdEnd) steps.push(jdEnd);

  const sunPositions = await Promise.all(
    steps.map((jd) => getPlanetPosition(SE_SUN, jd))
  );

  const events: CombustionEvent[] = [];

  for (const planet of combustiblePlanets) {
    const swephId = planet.swephId;

    // Pre-compute this planet's positions at all steps
    const plPositions = await Promise.all(
      steps.map((jd) => getPlanetPosition(swephId, jd))
    );

    // Check threshold crossings from cache (no sweph calls in this loop)
    let prevSep = lonSepDeg(plPositions[0].longitude, sunPositions[0].longitude);
    let prevThreshold = getThreshold(planet.id, plPositions[0].isRetrograde);
    let inCombust = prevSep <= prevThreshold;

    for (let s = 1; s < steps.length; s++) {
      const sep = lonSepDeg(plPositions[s].longitude, sunPositions[s].longitude);
      const threshold = getThreshold(planet.id, plPositions[s].isRetrograde);
      const nowIn = sep <= threshold;

      if (inCombust !== nowIn) {
        // Crossing detected — binary search for exact time
        const crossJd = await refineCombustionCrossing(
          steps[s - 1], steps[s], swephId, planet.id
        );
        const crossPos = await getPlanetPosition(swephId, crossJd);
        const crossSun = await getPlanetPosition(SE_SUN, crossJd);
        const crossSep = lonSepDeg(crossPos.longitude, crossSun.longitude);

        events.push({
          type: "combustion",
          planetId: planet.id,
          planetName: planet.name,
          eventType: inCombust ? "exit" : "enter",
          date: jdToDate(crossJd).toISOString(),
          separationDegrees: crossSep,
          threshold: getThreshold(planet.id, crossPos.isRetrograde),
          isRetrograde: crossPos.isRetrograde,
        });

        inCombust = nowIn;
      }

      prevSep = sep;
      prevThreshold = threshold;
    }
  }

  events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  return events;
}
