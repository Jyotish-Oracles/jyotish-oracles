import { NextResponse } from "next/server";
import { computeAllTransits } from "@/lib/ephemeris/transits";
import { PLANETS } from "@/lib/astro/planets";
import type { DetailLevel } from "@/lib/astro/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const startParam = searchParams.get("start");
  const endParam = searchParams.get("end");
  const planetsParam = searchParams.get("planets");
  const levelParam = (searchParams.get("level") || "rashi") as DetailLevel;

  // Defaults: current month
  const now = new Date();
  const start = startParam
    ? new Date(startParam)
    : new Date(now.getFullYear(), now.getMonth(), 1);
  const end = endParam
    ? new Date(endParam)
    : new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

  // Validate dates
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return NextResponse.json({ error: "Invalid date" }, { status: 400 });
  }

  // Max range: 1 year
  const daysDiff = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
  if (daysDiff > 366) {
    return NextResponse.json(
      { error: "Range cannot exceed 1 year" },
      { status: 400 }
    );
  }

  // Validate detail level
  if (!["rashi", "nakshatra", "pada"].includes(levelParam)) {
    return NextResponse.json(
      { error: "Level must be rashi, nakshatra, or pada" },
      { status: 400 }
    );
  }

  // Parse planet filter
  const validIds = PLANETS.map((p) => p.id);
  const planetIds = planetsParam
    ? planetsParam.split(",").filter((id) => validIds.includes(id))
    : validIds.filter((id) => {
        const planet = PLANETS.find((p) => p.id === id);
        return planet && planet.speedGroup !== "fast"; // Moon off by default
      });

  const transits = await computeAllTransits(planetIds, start, end, levelParam);

  // Build response with planet metadata
  const data = Object.entries(transits).map(([planetId, segments]) => {
    const planet = PLANETS.find((p) => p.id === planetId);
    return {
      planetId,
      planetName: planet?.name || planetId,
      planetSanskrit: planet?.sanskrit || "",
      color: planet?.color || "#888",
      speedGroup: planet?.speedGroup || "medium",
      segments,
    };
  });

  // Cache: past dates forever, future 1 hour
  const isPast = end < now;
  const cacheControl = isPast
    ? "public, s-maxage=31536000, immutable"
    : "public, s-maxage=3600, stale-while-revalidate=7200";

  return NextResponse.json(
    { timeRange: { start: start.toISOString(), end: end.toISOString() }, level: levelParam, data },
    { headers: { "Cache-Control": cacheControl } }
  );
}
