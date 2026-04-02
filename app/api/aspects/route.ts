import { NextResponse } from "next/server";
import { computeAspects } from "@/lib/ephemeris/aspects";
import { computeStations } from "@/lib/ephemeris/stations";
import { computeCombustion } from "@/lib/ephemeris/combustion";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const startParam = searchParams.get("start");
  const endParam = searchParams.get("end");

  const now = new Date();
  const start = startParam
    ? new Date(startParam)
    : new Date(now.getFullYear(), now.getMonth(), 1);
  const end = endParam
    ? new Date(endParam)
    : new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return NextResponse.json({ error: "Invalid date" }, { status: 400 });
  }

  const daysDiff = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
  if (daysDiff > 366) {
    return NextResponse.json({ error: "Range cannot exceed 1 year" }, { status: 400 });
  }

  const [aspects, stations, combustion] = await Promise.all([
    computeAspects(start, end),
    computeStations(start, end),
    computeCombustion(start, end),
  ]);

  const isPast = end < now;
  const cacheControl = isPast
    ? "public, s-maxage=31536000, immutable"
    : "public, s-maxage=3600, stale-while-revalidate=7200";

  return NextResponse.json(
    { aspects, stations, combustion },
    { headers: { "Cache-Control": cacheControl } }
  );
}
