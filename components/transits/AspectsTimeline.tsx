"use client";

import { useState, useMemo } from "react";
import type { AspectEvent, StationEvent, CombustionEvent, AstroEvent } from "@/lib/astro/types";

interface Props {
  aspects: AspectEvent[];
  stations: StationEvent[];
  combustion: CombustionEvent[];
  isLoading: boolean;
  location?: { lat: number; lng: number; city: string; timezone: string };
}

const ASPECT_COLORS: Record<number, { bg: string; text: string; label: string }> = {
  0:   { bg: "bg-gold-light", text: "text-[#8A6A20]", label: "Conjunction" },
  60:  { bg: "bg-success-bg", text: "text-success", label: "Sextile" },
  90:  { bg: "bg-accent-light", text: "text-accent", label: "Square" },
  120: { bg: "bg-success-bg", text: "text-green-dark", label: "Trine" },
  180: { bg: "bg-error-bg", text: "text-error", label: "Opposition" },
  210: { bg: "bg-surface", text: "text-green-dark", label: "Mars 8th" },
  240: { bg: "bg-surface", text: "text-green-dark", label: "Jupiter 9th" },
  270: { bg: "bg-surface", text: "text-green-dark", label: "Saturn 10th" },
};

type FilterType = "aspects" | "stations" | "combustion";

export default function AspectsTimeline({
  aspects,
  stations,
  combustion,
  isLoading,
  location,
}: Props) {
  const [filters, setFilters] = useState<Set<FilterType>>(
    new Set(["aspects", "stations", "combustion"])
  );

  const toggleFilter = (f: FilterType) => {
    setFilters((prev) => {
      const next = new Set(prev);
      if (next.has(f)) next.delete(f);
      else next.add(f);
      return next;
    });
  };

  // Merge and sort all events chronologically
  const allEvents = useMemo(() => {
    const events: AstroEvent[] = [];
    if (filters.has("aspects")) events.push(...aspects);
    if (filters.has("stations")) events.push(...stations);
    if (filters.has("combustion")) events.push(...combustion);
    return events.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }, [aspects, stations, combustion, filters]);

  // Group by date
  const grouped = useMemo(() => {
    const map = new Map<string, AstroEvent[]>();
    for (const event of allEvents) {
      const dateKey = new Date(event.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      if (!map.has(dateKey)) map.set(dateKey, []);
      map.get(dateKey)!.push(event);
    }
    return map;
  }, [allEvents]);

  if (isLoading) {
    return (
      <div className="mt-8 space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-16 animate-pulse rounded-xl bg-surface-alt" />
        ))}
      </div>
    );
  }

  return (
    <div className="mt-10">
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h2 className="font-serif text-2xl font-semibold">
          Aspects, Stations & Combustion
        </h2>
        <div className="flex gap-2">
          {(
            [
              { key: "aspects" as FilterType, label: "Aspects", count: aspects.length },
              { key: "stations" as FilterType, label: "Stations", count: stations.length },
              { key: "combustion" as FilterType, label: "Combustion", count: combustion.length },
            ] as const
          ).map((f) => (
            <button
              key={f.key}
              onClick={() => toggleFilter(f.key)}
              aria-pressed={filters.has(f.key)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                filters.has(f.key)
                  ? "bg-green text-white"
                  : "bg-surface-alt text-text-tertiary"
              }`}
            >
              {f.label} ({f.count})
            </button>
          ))}
        </div>
      </div>

      {allEvents.length === 0 ? (
        <div className="flex h-32 items-center justify-center rounded-2xl bg-surface text-text-secondary">
          No events in this time range
        </div>
      ) : (
        <div className="space-y-6">
          {Array.from(grouped.entries()).map(([dateKey, events]) => (
            <div key={dateKey}>
              {/* Date header */}
              <div className="sticky top-[72px] z-10 mb-3 bg-background/90 py-1 backdrop-blur-sm">
                <span className="text-xs font-medium uppercase tracking-[0.1em] text-text-tertiary">
                  {dateKey}
                </span>
              </div>

              <div className="space-y-2">
                {events.map((event, i) => (
                  <EventCard key={`${dateKey}-${i}`} event={event} location={location} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function chartUrl(date: string, loc?: { lat: number; lng: number; city: string; timezone: string }): string {
  const params = new URLSearchParams({ date });
  if (loc) {
    params.set("lat", String(loc.lat));
    params.set("lng", String(loc.lng));
    params.set("city", loc.city);
    params.set("tz", loc.timezone);
  }
  return `/tools/chart?${params}`;
}

function EventCard({ event, location }: { event: AstroEvent; location?: Props["location"] }) {
  const time = new Date(event.date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const link = chartUrl(event.date, location);

  if (event.type === "aspect") {
    return <AspectCard event={event} time={time} chartLink={link} />;
  }
  if (event.type === "station") {
    return <StationCard event={event} time={time} chartLink={link} />;
  }
  return <CombustionCard event={event} time={time} chartLink={link} />;
}

function ChartLink({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="shrink-0 rounded-md px-2 py-1 text-[10px] font-medium text-green-dark no-underline transition-colors hover:bg-surface-alt"
      title="View chart at this moment"
    >
      Chart ↗
    </a>
  );
}

function AspectCard({ event, time, chartLink }: { event: AspectEvent; time: string; chartLink: string }) {
  const color = ASPECT_COLORS[event.aspectAngle] || ASPECT_COLORS[0];

  return (
    <div className="flex items-center gap-4 rounded-xl border border-border-light bg-white p-4 transition-colors hover:bg-surface">
      {/* Time */}
      <div className="w-16 shrink-0 text-right font-mono text-xs text-text-tertiary">
        {time}
      </div>

      {/* Aspect badge */}
      <span
        className={`shrink-0 rounded-md px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${color.bg} ${color.text}`}
      >
        {event.aspectName}
      </span>

      {/* Planet pair */}
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium">
          {event.planet1Name}
          <span className="mx-1.5 text-text-tertiary">—</span>
          {event.planet2Name}
        </div>
        <div className="text-xs text-text-tertiary">
          {event.planet1Rashi} ({event.planet1Degree.toFixed(1)}°)
          {" / "}
          {event.planet2Rashi} ({event.planet2Degree.toFixed(1)}°)
        </div>
      </div>

      {/* Special badge */}
      {event.isSpecialVedic && (
        <span className="shrink-0 rounded-full bg-surface px-2 py-0.5 text-[9px] font-medium text-text-tertiary">
          Vedic
        </span>
      )}

      <ChartLink href={chartLink} />
    </div>
  );
}

function StationCard({ event, time, chartLink }: { event: StationEvent; time: string; chartLink: string }) {
  const isRetro = event.stationType === "retrograde";

  return (
    <div
      className={`flex items-center gap-4 rounded-xl border p-4 transition-colors hover:bg-surface ${
        isRetro
          ? "border-dashed border-text-tertiary/40 bg-surface"
          : "border-border-light bg-white"
      }`}
    >
      <div className="w-16 shrink-0 text-right font-mono text-xs text-text-tertiary">
        {time}
      </div>

      <span
        className={`shrink-0 rounded-md px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${
          isRetro
            ? "bg-surface-alt text-text-secondary"
            : "bg-success-bg text-success"
        }`}
      >
        {isRetro ? "Retrograde" : "Direct"}
      </span>

      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium">{event.planetName}</div>
        <div className="text-xs text-text-tertiary">
          {event.rashi} / {event.nakshatra} at {event.degree.toFixed(2)}°
        </div>
      </div>

      <ChartLink href={chartLink} />
    </div>
  );
}

function CombustionCard({
  event,
  time,
  chartLink,
}: {
  event: CombustionEvent;
  time: string;
  chartLink: string;
}) {
  const isEnter = event.eventType === "enter";

  return (
    <div className="flex items-center gap-4 rounded-xl border border-warning/30 bg-warning-bg p-4 transition-colors hover:bg-warning-bg/80">
      <div className="w-16 shrink-0 text-right font-mono text-xs text-text-tertiary">
        {time}
      </div>

      <span className="shrink-0 rounded-md bg-warning/20 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#8A6A20]">
        {isEnter ? "Combust" : "Free"}
      </span>

      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium">
          {event.planetName}
          <span className="ml-1.5 text-text-tertiary">
            {isEnter ? "enters" : "exits"} combustion
          </span>
        </div>
        <div className="text-xs text-text-tertiary">
          Sep: {event.separationDegrees.toFixed(1)}° (threshold: {event.threshold}°)
          {event.isRetrograde && " · Retrograde"}
        </div>
      </div>

      <ChartLink href={chartLink} />
    </div>
  );
}
