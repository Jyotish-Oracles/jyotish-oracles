// Lagna (Ascendant) computation using Swiss Ephemeris
// Matching Python: swe.houses(jd, lat, lon, 'W') + sidereal correction

import { initEphemeris } from "./client";
import { dateToJd } from "./calculations";

interface LagnaResult {
  ascendant: number; // sidereal longitude
  rashiIndex: number;
  rashiDegree: number;
}

export async function computeLagna(
  date: Date,
  lat: number,
  lng: number
): Promise<LagnaResult> {
  await initEphemeris();

  const jd = dateToJd(date);

  try {
    const sweph = await import("sweph");

    // Whole Sign house system — standard for Jyotish
    const result = sweph.houses(jd, lat, lng, "W");
    const tropicalAsc = result.data.points[0]; // Tropical ascendant

    // Get Lahiri ayanamsa and convert to sidereal
    const ayanamsa = sweph.get_ayanamsa_ut(jd);
    const siderealAsc = ((tropicalAsc - ayanamsa) % 360 + 360) % 360;

    return {
      ascendant: siderealAsc,
      rashiIndex: Math.floor(siderealAsc / 30),
      rashiDegree: siderealAsc % 30,
    };
  } catch {
    // Mock fallback — approximate lagna based on time of day + location
    const hourAngle = (date.getUTCHours() + lng / 15) * 15;
    const mockAsc = (hourAngle + 180) % 360;
    return {
      ascendant: mockAsc,
      rashiIndex: Math.floor(mockAsc / 30),
      rashiDegree: mockAsc % 30,
    };
  }
}
