"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Container from "@/components/layout/Container";
import SouthIndianChart from "@/components/chart/SouthIndianChart";
import PositionsTable from "@/components/chart/PositionsTable";
import ChartPanchang from "@/components/chart/ChartPanchang";
import Skeleton from "@/components/ui/Skeleton";
import type { ChartPlanet, D9Planet, PanchangData } from "@/lib/astro/types";

interface ChartResponse {
  datetime: string;
  location: { lat: number; lng: number; city: string };
  lagna: { degree: number; rashiIndex: number; rashiName: string; rashiDegree: number };
  d9Lagna: { rashiIndex: number; rashiName: string };
  planets: ChartPlanet[];
  d9Planets: D9Planet[];
  panchang: PanchangData;
}

function ChartContent() {
  const searchParams = useSearchParams();
  const [data, setData] = useState<ChartResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const dateParam = searchParams.get("date");
  const lat = searchParams.get("lat") || "12.9716";
  const lng = searchParams.get("lng") || "77.5946";
  const city = searchParams.get("city") || "Bangalore";

  useEffect(() => {
    if (!dateParam) {
      setLoading(false);
      return;
    }

    const params = new URLSearchParams({ date: dateParam, lat, lng, city });
    fetch(`/api/chart?${params}`)
      .then((r) => r.json())
      .then((d) => setData(d))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [dateParam, lat, lng, city]);

  if (!dateParam) {
    return (
      <Container className="py-16 text-center text-text-secondary">
        No date specified. Open this page from a transit event.
      </Container>
    );
  }

  if (loading) {
    return (
      <Container className="py-8">
        <div className="space-y-4">
          <Skeleton className="h-8 w-64" />
          <div className="grid gap-8 md:grid-cols-2">
            <Skeleton className="h-[300px]" />
            <Skeleton className="h-[300px]" />
          </div>
          <Skeleton className="h-[400px]" />
        </div>
      </Container>
    );
  }

  if (!data) {
    return (
      <Container className="py-16 text-center text-text-secondary">
        Failed to load chart data.
      </Container>
    );
  }

  const chartDate = new Date(data.datetime);
  const formattedDate = chartDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = chartDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <Container className="py-8">
      {/* Header */}
      <div className="mb-8">
        <p className="mb-1 text-xs font-medium uppercase tracking-[0.12em] text-green">
          Mundane Chart
        </p>
        <h1 className="mb-2">{formattedDate}</h1>
        <p className="text-lg text-text-secondary">
          {formattedTime} &middot; {data.location.city}
        </p>
        <p className="mt-1 text-sm text-text-tertiary">
          Lagna: {data.lagna.rashiName} {data.lagna.rashiDegree.toFixed(1)}°
          &middot; {data.location.lat.toFixed(4)}°N, {data.location.lng.toFixed(4)}°E
        </p>
      </div>

      {/* Charts: D1 and D9 side by side */}
      <div className="mb-10 grid gap-8 sm:grid-cols-2">
        <SouthIndianChart
          planets={data.planets.map((p) => ({
            id: p.id,
            name: p.name,
            rashiIndex: p.rashiIndex,
            isRetrograde: p.isRetrograde,
          }))}
          lagnaRashiIndex={data.lagna.rashiIndex}
          title="Rashi (D1)"
        />
        <SouthIndianChart
          planets={data.d9Planets.map((p) => ({
            id: p.id,
            name: p.name,
            rashiIndex: p.rashiIndex,
          }))}
          lagnaRashiIndex={data.d9Lagna.rashiIndex}
          title="Navamsha (D9)"
        />
      </div>

      {/* Positions table */}
      <div className="mb-10">
        <PositionsTable planets={data.planets} />
      </div>

      {/* Panchang */}
      <div className="mb-10 max-w-md">
        <ChartPanchang panchang={data.panchang} />
      </div>
    </Container>
  );
}

export default function ChartPage() {
  return (
    <div className="min-h-screen">
      <div className="border-b border-border-light bg-bg-warm">
        <Container className="py-6">
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-green">
            Tools
          </p>
          <h2 className="font-serif text-2xl font-semibold">Moment Chart</h2>
        </Container>
      </div>
      <Suspense fallback={<Container className="py-8"><Skeleton className="h-96" /></Container>}>
        <ChartContent />
      </Suspense>
    </div>
  );
}
