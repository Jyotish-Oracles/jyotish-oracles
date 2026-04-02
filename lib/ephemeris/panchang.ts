// Panchang (Vedic almanac) calculations
// Aligned with /Users/sandeepvenkatesh/Documents/GitHub/Ephemeris/utils/panchanga.py

import { getPlanetPosition, dateToJd } from "./calculations";
import { SE_SUN, SE_MOON } from "@/lib/astro/planets";
import { RASHIS, NAKSHATRAS, TITHI_NAMES, YOGA_NAMES, KARANA_NAMES, WEEKDAYS } from "@/lib/astro/constants";
import type { PanchangData } from "@/lib/astro/types";

export async function computePanchang(date: Date, _lat?: number, _lng?: number): Promise<PanchangData> {
  // lat/lng reserved for future sunrise-based vaara calculation
  const jd = dateToJd(date);

  const [moonPos, sunPos] = await Promise.all([
    getPlanetPosition(SE_MOON, jd),
    getPlanetPosition(SE_SUN, jd),
  ]);

  // Tithi: Moon-Sun angular separation / 12°
  // Using Math.ceil matching your Python: math.ceil(moon_sun_separation / 12) → 1-30
  let moonSunDiff = (moonPos.longitude - sunPos.longitude) % 360;
  if (moonSunDiff < 0) moonSunDiff += 360;

  const tithiNumber = Math.ceil(moonSunDiff / 12); // 1-30 (matches your Python code)
  // Handle edge case: moonSunDiff exactly 0 → ceil gives 0, should be 30 (Amavasya end)
  const adjustedTithi = tithiNumber === 0 ? 30 : tithiNumber;

  const paksha = adjustedTithi <= 15 ? "Shukla" : "Krishna";

  // Tithi number within the paksha (1-15)
  const tithiInPaksha = adjustedTithi <= 15 ? adjustedTithi : adjustedTithi - 15;

  // Map to TITHI_NAMES array (0-indexed, so subtract 1)
  const tithiNameIndex = (adjustedTithi - 1) % 30;

  // Yoga: (Moon longitude + Sun longitude) / (360/27)°
  // Matches your Python: combined_long // yoga_degrees
  const yogaSum = (moonPos.longitude + sunPos.longitude) % 360;
  const yogaIndex = Math.floor(yogaSum / (360 / 27));

  // Karana: Moon-Sun separation / 6°
  // Matches your Python karana logic:
  // K=0 → Kimstughna, K=57 → Shakuni, K=58 → Chatushpada, K=59 → Naga
  // else → MOVABLE_KARANAS[(K-1) % 7]
  const karanaIndex = Math.floor(moonSunDiff / 6); // 0-59
  let karanaName: string;
  if (karanaIndex === 0) {
    karanaName = KARANA_NAMES[10]; // Kimstughna
  } else if (karanaIndex === 57) {
    karanaName = KARANA_NAMES[7];  // Shakuni
  } else if (karanaIndex === 58) {
    karanaName = KARANA_NAMES[8];  // Chatushpada
  } else if (karanaIndex === 59) {
    karanaName = KARANA_NAMES[9];  // Naga
  } else {
    karanaName = KARANA_NAMES[(karanaIndex - 1) % 7]; // Movable karanas: Bava..Vishti
  }

  const moonNakshatra = NAKSHATRAS[moonPos.nakshatraIndex];
  const weekday = WEEKDAYS[date.getDay()];

  return {
    date: date.toISOString().split("T")[0],
    weekday: weekday.name,
    tithi: {
      name: TITHI_NAMES[tithiNameIndex],
      number: tithiInPaksha,
      paksha,
    },
    nakshatra: {
      name: moonNakshatra.name,
      index: moonNakshatra.index,
      lord: moonNakshatra.lord,
      pada: moonPos.padaIndex + 1,
    },
    yoga: {
      name: YOGA_NAMES[yogaIndex % 27],
      index: yogaIndex,
    },
    karana: {
      name: karanaName,
      index: karanaIndex,
    },
    moonSign: RASHIS[moonPos.rashiIndex].sanskrit,
    sunSign: RASHIS[sunPos.rashiIndex].sanskrit,
    moonDegree: moonPos.longitude,
    sunDegree: sunPos.longitude,
  };
}
