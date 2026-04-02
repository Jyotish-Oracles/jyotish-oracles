import { NextResponse } from "next/server";
import { getPlanetPosition, dateToJd } from "@/lib/ephemeris/calculations";
import { computeLagna } from "@/lib/ephemeris/houses";
import { computePanchang } from "@/lib/ephemeris/panchang";
import { PLANETS } from "@/lib/astro/planets";
import { RASHIS, NAKSHATRAS } from "@/lib/astro/constants";
import type { ChartPlanet, D9Planet } from "@/lib/astro/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const dateParam = searchParams.get("date");
  const latParam = searchParams.get("lat");
  const lngParam = searchParams.get("lng");
  const cityParam = searchParams.get("city") || "Unknown";

  if (!dateParam) {
    return NextResponse.json({ error: "date is required" }, { status: 400 });
  }

  const date = new Date(dateParam);
  if (isNaN(date.getTime())) {
    return NextResponse.json({ error: "Invalid date" }, { status: 400 });
  }

  const lat = latParam ? parseFloat(latParam) : 12.9716; // Bangalore default
  const lng = lngParam ? parseFloat(lngParam) : 77.5946;

  const jd = dateToJd(date);

  // Compute lagna
  const lagna = await computeLagna(date, lat, lng);

  // Compute all planet positions in parallel
  const planetPositions = await Promise.all(
    PLANETS.map(async (planet) => {
      const isKetu = planet.id === "ketu";
      const swephId = isKetu ? 10 : planet.swephId;
      const pos = await getPlanetPosition(swephId, jd, isKetu);
      const rashi = RASHIS[pos.rashiIndex];
      const nakshatra = NAKSHATRAS[pos.nakshatraIndex];

      return {
        id: planet.id,
        name: planet.name,
        sanskrit: planet.sanskrit,
        longitude: pos.longitude,
        rashiIndex: pos.rashiIndex,
        rashiName: rashi.sanskrit,
        rashiDegree: pos.rashiDegree,
        nakshatraIndex: pos.nakshatraIndex,
        nakshatraName: nakshatra.name,
        nakshatraLord: nakshatra.lord,
        pada: pos.padaIndex + 1,
        speed: pos.speed,
        isRetrograde: pos.isRetrograde,
      } satisfies ChartPlanet;
    })
  );

  // Compute D9 (Navamsha) positions
  // Navamsha sign = floor((longitude × 9 % 360) / 30)
  const d9Planets: D9Planet[] = planetPositions.map((p) => {
    const navLon = ((p.longitude * 9) % 360 + 360) % 360;
    const navRashiIndex = Math.floor(navLon / 30);
    return {
      id: p.id,
      name: p.name,
      rashiIndex: navRashiIndex,
      rashiName: RASHIS[navRashiIndex].sanskrit,
    };
  });

  // D9 Lagna
  const d9LagnaLon = ((lagna.ascendant * 9) % 360 + 360) % 360;
  const d9LagnaRashi = Math.floor(d9LagnaLon / 30);

  // Panchang
  const panchang = await computePanchang(date, lat, lng);

  const lagnaRashi = RASHIS[lagna.rashiIndex];

  return NextResponse.json({
    datetime: date.toISOString(),
    location: { lat, lng, city: cityParam },
    lagna: {
      degree: lagna.ascendant,
      rashiIndex: lagna.rashiIndex,
      rashiName: lagnaRashi.sanskrit,
      rashiDegree: lagna.rashiDegree,
    },
    d9Lagna: {
      rashiIndex: d9LagnaRashi,
      rashiName: RASHIS[d9LagnaRashi].sanskrit,
    },
    planets: planetPositions,
    d9Planets,
    panchang,
  }, {
    headers: {
      "Cache-Control": "public, s-maxage=31536000, immutable",
    },
  });
}
