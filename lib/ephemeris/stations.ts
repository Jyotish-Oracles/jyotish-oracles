// Planetary station (retrograde/direct) detection — OPTIMIZED
// Pre-computes speeds for all planets, then detects sign changes from cache.

import { getPlanetPosition, dateToJd, jdToDate } from "./calculations";
import { PLANETS } from "@/lib/astro/planets";
import { RASHIS, NAKSHATRAS } from "@/lib/astro/constants";
import type { StationEvent } from "@/lib/astro/types";

// Bodies that can station (no Sun, Moon, Rahu, Ketu)
const STATION_PLANETS = PLANETS.filter(
  (p) =>
    p.speedGroup !== "fast" &&
    p.id !== "sun" &&
    p.id !== "rahu" &&
    p.id !== "ketu"
);

// Binary search for exact zero-crossing of speed (~20 calls
async function findZeroCrossing(
  jd0: number,
  jd1: number,
  swephId: number,
  isKetu: boolean
): Promise<number> {
  let sp0 = (await getPlanetPosition(swephId, jd0, isKetu)).speed;

  for (let i = 0; i < 20; i++) {
    const mid = (jd0 + jd1) / 2;
    if (Math.abs(jd1 - jd0) < 1e-5) return mid;

    const spm = (await getPlanetPosition(swephId, mid, isKetu)).speed;
    if (sp0 * spm <= 0) {
      jd1 = mid;
    } else {
      jd0 = mid;
      sp0 = spm;
    }
  }
  return (jd0 + jd1) / 2;
}

export async function computeStations(
  startDate: Date,
  endDate: Date
): Promise<StationEvent[]> {
  const jdStart = dateToJd(startDate);
  const jdEnd = dateToJd(endDate);
  const stepDays = 1; // 1 day is fine for stations (speed changes slowly)

  const events: StationEvent[] = [];

  // Pre-compute speeds for all station planets at each step
  const steps: number[] = [];
  for (let jd = jdStart; jd <= jdEnd; jd += stepDays) steps.push(jd);
  if (steps[steps.length - 1] < jdEnd) steps.push(jdEnd);

  for (const planet of STATION_PLANETS) {
    const swephId = planet.swephId;

    // Batch-fetch speeds at all steps
    const speeds = await Promise.all(
      steps.map((jd) => getPlanetPosition(swephId, jd).then((p) => p.speed))
    );

    for (let i = 1; i < speeds.length; i++) {
      if (speeds[i - 1] * speeds[i] < 0) {
        const jdCross = await findZeroCrossing(steps[i - 1], steps[i], swephId, false);
        const kind: "retrograde" | "direct" = speeds[i] > speeds[i - 1] ? "direct" : "retrograde";

        const pos = await getPlanetPosition(swephId, jdCross);
        events.push({
          type: "station",
          planetId: planet.id,
          planetName: planet.name,
          stationType: kind,
          date: jdToDate(jdCross).toISOString(),
          degree: pos.longitude,
          rashi: RASHIS[pos.rashiIndex].sanskrit,
          nakshatra: NAKSHATRAS[pos.nakshatraIndex].name,
        });
      }
    }
  }

  events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  return events;
}
