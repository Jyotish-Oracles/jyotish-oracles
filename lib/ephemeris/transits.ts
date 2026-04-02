// Transit computation engine
// Step-walk with binary search ingress detection

import { getPlanetPosition, dateToJd, jdToDate } from "./calculations";
import { getIndexFromDegree, RASHIS, NAKSHATRAS } from "@/lib/astro/constants";
import { PLANETS, getStepSizeDays } from "@/lib/astro/planets";
import type { TransitSegment, DetailLevel } from "@/lib/astro/types";

const BINARY_SEARCH_PRECISION = 0.0007; // ~1 minute in Julian Days

function getSegmentIndex(longitude: number, level: DetailLevel): number {
  return getIndexFromDegree(longitude, level);
}

function getSegmentName(index: number, level: DetailLevel): { rashiName: string; nakshatraName: string } {
  switch (level) {
    case "rashi":
      return {
        rashiName: RASHIS[index % 12].sanskrit,
        nakshatraName: "",
      };
    case "nakshatra": {
      const nk = NAKSHATRAS[index % 27];
      return {
        rashiName: RASHIS[nk.rashiIndex].sanskrit,
        nakshatraName: nk.name,
      };
    }
    case "pada": {
      const nkIndex = Math.floor(index / 4);
      const nk = NAKSHATRAS[nkIndex % 27];
      return {
        rashiName: RASHIS[nk.rashiIndex].sanskrit,
        nakshatraName: `${nk.name} P${(index % 4) + 1}`,
      };
    }
  }
}

// Binary search to find exact boundary crossing time
async function findIngress(
  swephId: number,
  isKetu: boolean,
  jdBefore: number,
  jdAfter: number,
  level: DetailLevel,
  indexBefore: number
): Promise<number> {
  let lo = jdBefore;
  let hi = jdAfter;

  while (hi - lo > BINARY_SEARCH_PRECISION) {
    const mid = (lo + hi) / 2;
    const pos = await getPlanetPosition(swephId, mid, isKetu);
    const midIndex = getSegmentIndex(pos.longitude, level);

    if (midIndex === indexBefore) {
      lo = mid;
    } else {
      hi = mid;
    }
  }

  return hi;
}

export async function computeTransitSegments(
  planetId: string,
  startDate: Date,
  endDate: Date,
  level: DetailLevel
): Promise<TransitSegment[]> {
  const planet = PLANETS.find((p) => p.id === planetId);
  if (!planet) return [];

  const isKetu = planet.id === "ketu";
  const swephId = isKetu ? 10 : planet.swephId; // 10 = SE_MEAN_NODE for ketu
  const stepDays = getStepSizeDays(planet.speedGroup);

  const startJd = dateToJd(startDate);
  const endJd = dateToJd(endDate);

  // Get initial position
  let prevPos = await getPlanetPosition(swephId, startJd, isKetu);
  let prevIndex = getSegmentIndex(prevPos.longitude, level);

  const segments: TransitSegment[] = [];
  let segmentStartJd = startJd;
  let segmentStartDegree = prevPos.longitude;
  let segmentRetrograde = prevPos.isRetrograde;

  // Walk through the time range
  let jd = startJd + stepDays;

  while (jd <= endJd) {
    const pos = await getPlanetPosition(swephId, jd, isKetu);
    const currentIndex = getSegmentIndex(pos.longitude, level);

    // Check for retrograde change (also creates a new segment for visual clarity)
    const retroChanged =
      pos.isRetrograde !== segmentRetrograde && planet.speedGroup !== "fast";

    if (currentIndex !== prevIndex || retroChanged) {
      // Boundary crossed — find exact ingress time
      const ingressJd = await findIngress(
        swephId,
        isKetu,
        jd - stepDays,
        jd,
        level,
        prevIndex
      );

      const ingressPos = await getPlanetPosition(swephId, ingressJd - BINARY_SEARCH_PRECISION, isKetu);
      const names = getSegmentName(prevIndex, level);

      segments.push({
        planetId,
        startDate: jdToDate(segmentStartJd).toISOString(),
        endDate: jdToDate(ingressJd).toISOString(),
        rashiIndex: level === "rashi" ? prevIndex % 12 : NAKSHATRAS[level === "nakshatra" ? prevIndex % 27 : Math.floor(prevIndex / 4) % 27].rashiIndex,
        rashiName: names.rashiName,
        nakshatraIndex: level === "nakshatra" ? prevIndex % 27 : Math.floor(prevIndex / 4) % 27,
        nakshatraName: names.nakshatraName,
        padaIndex: level === "pada" ? prevIndex % 4 : 0,
        isRetrograde: segmentRetrograde,
        startDegree: segmentStartDegree,
        endDegree: ingressPos.longitude,
      });

      // Start new segment
      segmentStartJd = ingressJd;
      segmentStartDegree = pos.longitude;
      segmentRetrograde = pos.isRetrograde;
      prevIndex = currentIndex;
    }

    prevPos = pos;
    jd += stepDays;
  }

  // Close final segment
  const finalPos = await getPlanetPosition(swephId, endJd, isKetu);
  const finalNames = getSegmentName(prevIndex, level);

  segments.push({
    planetId,
    startDate: jdToDate(segmentStartJd).toISOString(),
    endDate: jdToDate(endJd).toISOString(),
    rashiIndex: level === "rashi" ? prevIndex % 12 : NAKSHATRAS[level === "nakshatra" ? prevIndex % 27 : Math.floor(prevIndex / 4) % 27].rashiIndex,
    rashiName: finalNames.rashiName,
    nakshatraIndex: level === "nakshatra" ? prevIndex % 27 : Math.floor(prevIndex / 4) % 27,
    nakshatraName: finalNames.nakshatraName,
    padaIndex: level === "pada" ? prevIndex % 4 : 0,
    isRetrograde: segmentRetrograde,
    startDegree: segmentStartDegree,
    endDegree: finalPos.longitude,
  });

  return segments;
}

// Compute transits for multiple planets
export async function computeAllTransits(
  planetIds: string[],
  startDate: Date,
  endDate: Date,
  level: DetailLevel
): Promise<Record<string, TransitSegment[]>> {
  const results: Record<string, TransitSegment[]> = {};

  // Process in parallel
  const promises = planetIds.map(async (id) => {
    results[id] = await computeTransitSegments(id, startDate, endDate, level);
  });

  await Promise.all(promises);
  return results;
}
