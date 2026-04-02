import { NextResponse } from "next/server";
import { computePanchang } from "@/lib/ephemeris/panchang";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const dateParam = searchParams.get("date");
  const tzParam = searchParams.get("tz");
  const latParam = searchParams.get("lat");
  const lngParam = searchParams.get("lng");

  // If timezone provided, compute for local date in that timezone
  let date: Date;
  if (dateParam) {
    date = new Date(dateParam);
  } else if (tzParam) {
    // Get current date in the user's timezone
    const localDateStr = new Date().toLocaleDateString("en-CA", { timeZone: tzParam });
    date = new Date(localDateStr + "T12:00:00Z"); // noon UTC for the local date
  } else {
    date = new Date();
  }

  if (isNaN(date.getTime())) {
    return NextResponse.json({ error: "Invalid date" }, { status: 400 });
  }

  const lat = latParam ? parseFloat(latParam) : undefined;
  const lng = lngParam ? parseFloat(lngParam) : undefined;

  const panchang = await computePanchang(date, lat, lng);

  return NextResponse.json(panchang, {
    headers: {
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
    },
  });
}
