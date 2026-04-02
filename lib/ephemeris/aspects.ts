// Planetary aspect computation — OPTIMIZED
// Pre-computes all planet positions once, then checks pairs from memory.
// ~10-100x faster than per-pair stepping.

import { getPlanetPosition, dateToJd, jdToDate } from "./calculations";
import { PLANETS, SE_MEAN_NODE } from "@/lib/astro/planets";
import { RASHIS } from "@/lib/astro/constants";
import type { AspectEvent } from "@/lib/astro/types";

// --- Math helpers ---

function norm360(x: number): number {
  x = x % 360;
  if (x < 0) x += 360;
  return x;
}

function unwrapSeries(prevVal: number, curVal: number): number {
  let delta = (curVal - prevVal) % 360;
  if (delta > 180) delta -= 360;
  if (delta < -180) delta += 360;
  return prevVal + delta;
}

// --- Aspect definitions ---

const ASPECT_NAMES: Record<number, string> = {
  0: "Conjunction",
  60: "Sextile",
  90: "Square",
  120: "Trine",
  180: "Opposition",
  210: "Mars 8th",
  240: "Jupiter 9th",
  270: "Saturn 10th",
};

const STANDARD_ASPECTS = [0, 60, 90, 120, 180];

const SPECIAL_VEDIC: Record<string, number[]> = {
  mars: [210],
  jupiter: [240],
  saturn: [270],
};

// Bodies for aspect computation (no Moon)
interface AspectBody {
  name: string;
  id: string;
  swephId: number;
  isKetu: boolean;
  index: number; // position in the bodies array
}

function getAspectBodies(): AspectBody[] {
  return PLANETS
    .filter((p) => p.speedGroup !== "fast")
    .map((p, idx) => ({
      name: p.name,
      id: p.id,
      swephId: p.id === "ketu" ? SE_MEAN_NODE : p.swephId,
      isKetu: p.id === "ketu",
      index: idx,
    }));
}

// --- Pre-computed position cache ---

interface TimeSlice {
  jd: number;
  longitudes: number[]; // indexed by body.index
}

// Pre-compute all planet positions at every time step — ONE pass
async function precomputePositions(
  bodies: AspectBody[],
  jdStart: number,
  jdEnd: number,
  stepDays: number
): Promise<TimeSlice[]> {
  const slices: TimeSlice[] = [];
  let jd = jdStart;

  while (jd <= jdEnd) {
    const longitudes: number[] = [];

    // Compute all bodies at this JD in parallel
    const positions = await Promise.all(
      bodies.map((b) => getPlanetPosition(b.swephId, jd, b.isKetu))
    );

    for (const pos of positions) {
      longitudes.push(pos.longitude);
    }

    slices.push({ jd, longitudes });
    jd += stepDays;
  }

  // Ensure we include the exact end point
  if (slices.length > 0 && slices[slices.length - 1].jd < jdEnd) {
    const positions = await Promise.all(
      bodies.map((b) => getPlanetPosition(b.swephId, jdEnd, b.isKetu))
    );
    slices.push({ jd: jdEnd, longitudes: positions.map((p) => p.longitude) });
  }

  return slices;
}

// Binary search for exact aspect crossing — uses direct sweph calls (only ~20 per crossing)
async function findAspectCrossing(
  jd0: number,
  jd1: number,
  body1: AspectBody,
  body2: AspectBody,
  targetDeg: number,
  prevSep: number
): Promise<number> {
  let pos1 = await getPlanetPosition(body1.swephId, jd0, body1.isKetu);
  let pos2 = await getPlanetPosition(body2.swephId, jd0, body2.isKetu);
  let sep0 = unwrapSeries(prevSep, norm360(pos2.longitude - pos1.longitude));

  for (let i = 0; i < 20; i++) {
    const mid = (jd0 + jd1) / 2;
    if (Math.abs(jd1 - jd0) < 1e-5) return mid;

    pos1 = await getPlanetPosition(body1.swephId, mid, body1.isKetu);
    pos2 = await getPlanetPosition(body2.swephId, mid, body2.isKetu);
    const sepm = unwrapSeries(sep0, norm360(pos2.longitude - pos1.longitude));

    if ((sep0 - targetDeg) * (sepm - targetDeg) <= 0) {
      jd1 = mid;
    } else {
      jd0 = mid;
      sep0 = sepm;
    }
  }
  return (jd0 + jd1) / 2;
}

// --- Main computation ---

export async function computeAspects(
  startDate: Date,
  endDate: Date
): Promise<AspectEvent[]> {
  const bodies = getAspectBodies();
  const jdStart = dateToJd(startDate);
  const jdEnd = dateToJd(endDate);

  // Adaptive step: 6 hours is enough to catch all aspects
  // (fastest relative motion is ~14°/day for Mercury, so 6h = ~3.5° max movement)
  const stepDays = 6 / 24;

  // PHASE 1: Pre-compute ALL positions in one pass
  const slices = await precomputePositions(bodies, jdStart, jdEnd, stepDays);

  // Build all unique pairs (no self, no Rahu-Ketu)
  const pairs: [number, number][] = [];
  for (let i = 0; i < bodies.length; i++) {
    for (let j = i + 1; j < bodies.length; j++) {
      const ids = new Set([bodies[i].id, bodies[j].id]);
      if (ids.has("rahu") && ids.has("ketu")) continue;
      pairs.push([i, j]);
    }
  }

  const events: AspectEvent[] = [];

  // PHASE 2: Check all pairs against cached positions (pure memory, no sweph calls)
  for (const [i, j] of pairs) {
    const body1 = bodies[i];
    const body2 = bodies[j];

    // Aspect angles for this pair
    const angles = [...STANDARD_ASPECTS];
    if (SPECIAL_VEDIC[body1.id]) {
      angles.push(...SPECIAL_VEDIC[body1.id]);
    }
    if (SPECIAL_VEDIC[body2.id]) {
      for (const angle of SPECIAL_VEDIC[body2.id]) {
        angles.push(360 - angle);
      }
    }

    let sep0 = norm360(slices[0].longitudes[j] - slices[0].longitudes[i]);

    for (let s = 1; s < slices.length; s++) {
      const sep1 = unwrapSeries(
        sep0,
        norm360(slices[s].longitudes[j] - slices[s].longitudes[i])
      );

      for (const aspect of angles) {
        const crossed = (sep0 - aspect) * (sep1 - aspect) < 0;
        if (crossed) {
          // PHASE 3: Binary search only for actual crossings (~rare, ~20 calls each)
          const jdCross = await findAspectCrossing(
            slices[s - 1].jd,
            slices[s].jd,
            body1,
            body2,
            aspect,
            sep0
          );

          const pos1 = await getPlanetPosition(body1.swephId, jdCross, body1.isKetu);
          const pos2 = await getPlanetPosition(body2.swephId, jdCross, body2.isKetu);

          let displayAngle = aspect;
          let isSpecial = false;
          if (aspect > 180) {
            if (SPECIAL_VEDIC[body1.id]?.includes(aspect)) {
              displayAngle = aspect;
              isSpecial = true;
            } else {
              displayAngle = 360 - aspect;
              isSpecial = true;
            }
          }

          const rashi1 = RASHIS[Math.floor(pos1.longitude / 30)];
          const rashi2 = RASHIS[Math.floor(pos2.longitude / 30)];

          events.push({
            type: "aspect",
            planet1Id: body1.id,
            planet2Id: body2.id,
            planet1Name: body1.name,
            planet2Name: body2.name,
            aspectAngle: displayAngle,
            aspectName: ASPECT_NAMES[displayAngle] || `${displayAngle}°`,
            isSpecialVedic: isSpecial,
            date: jdToDate(jdCross).toISOString(),
            separation: norm360(pos2.longitude - pos1.longitude),
            planet1Degree: pos1.longitude,
            planet2Degree: pos2.longitude,
            planet1Rashi: rashi1.sanskrit,
            planet2Rashi: rashi2.sanskrit,
          });
        }
      }

      sep0 = sep1;
    }
  }

  events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  return events;
}
