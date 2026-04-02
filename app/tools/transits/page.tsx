"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Container from "@/components/layout/Container";
import FilterPanel from "@/components/transits/FilterPanel";
import TransitTimeline from "@/components/transits/TransitTimeline";
import TransitDetailPanel from "@/components/transits/TransitDetailPanel";
import AspectsTimeline from "@/components/transits/AspectsTimeline";
import Skeleton from "@/components/ui/Skeleton";
import { PLANETS } from "@/lib/astro/planets";
import { useLocation } from "@/lib/location/context";
import type {
  DetailLevel,
  TimePreset,
  TransitData,
  TransitSegment,
  AspectEvent,
  StationEvent,
  CombustionEvent,
} from "@/lib/astro/types";

function getDateRange(preset: TimePreset): { start: Date; end: Date } {
  const now = new Date();
  switch (preset) {
    case "week": {
      const start = new Date(now);
      start.setDate(start.getDate() - start.getDay());
      start.setHours(0, 0, 0, 0);
      const end = new Date(start);
      end.setDate(end.getDate() + 6);
      end.setHours(23, 59, 59, 999);
      return { start, end };
    }
    case "month": {
      const start = new Date(now.getFullYear(), now.getMonth(), 1);
      const end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
      return { start, end };
    }
    case "3months": {
      const start = new Date(now.getFullYear(), now.getMonth(), 1);
      const end = new Date(now.getFullYear(), now.getMonth() + 3, 0, 23, 59, 59);
      return { start, end };
    }
    case "6months": {
      const start = new Date(now.getFullYear(), now.getMonth(), 1);
      const end = new Date(now.getFullYear(), now.getMonth() + 6, 0, 23, 59, 59);
      return { start, end };
    }
    case "year": {
      const start = new Date(now.getFullYear(), 0, 1);
      const end = new Date(now.getFullYear(), 11, 31, 23, 59, 59);
      return { start, end };
    }
    default:
      return {
        start: new Date(now.getFullYear(), now.getMonth(), 1),
        end: new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59),
      };
  }
}

function getDefaultPlanets(preset: TimePreset): Set<string> {
  return new Set(
    PLANETS.filter((p) => {
      if (p.speedGroup === "fast") {
        return preset === "week";
      }
      return true;
    }).map((p) => p.id)
  );
}

export default function TransitsPage() {
  const { city } = useLocation();
  const [timePreset, setTimePreset] = useState<TimePreset>("month");
  const [detailLevel, setDetailLevel] = useState<DetailLevel>("rashi");
  const [enabledPlanets, setEnabledPlanets] = useState<Set<string>>(
    () => getDefaultPlanets("month")
  );
  const [transitData, setTransitData] = useState<TransitData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSegment, setSelectedSegment] = useState<{
    segment: TransitSegment;
    planetName: string;
  } | null>(null);

  // Custom date range
  const [customStart, setCustomStart] = useState<Date | null>(null);
  const [customEnd, setCustomEnd] = useState<Date | null>(null);

  // Aspects state
  const [aspectsData, setAspectsData] = useState<AspectEvent[]>([]);
  const [stationsData, setStationsData] = useState<StationEvent[]>([]);
  const [combustionData, setCombustionData] = useState<CombustionEvent[]>([]);
  const [aspectsLoading, setAspectsLoading] = useState(true);

  // Use custom range if set, otherwise use preset
  const { start, end } = useMemo(() => {
    if (timePreset === "custom" && customStart && customEnd) {
      return { start: customStart, end: customEnd };
    }
    return getDateRange(timePreset);
  }, [timePreset, customStart, customEnd]);

  const handleTimePresetChange = useCallback((preset: TimePreset) => {
    setTimePreset(preset);
    setCustomStart(null);
    setCustomEnd(null);
    setEnabledPlanets((prev) => {
      const next = new Set(prev);
      const moonPlanet = PLANETS.find((p) => p.speedGroup === "fast");
      if (moonPlanet) {
        if (preset === "week") {
          next.add(moonPlanet.id);
        } else {
          next.delete(moonPlanet.id);
        }
      }
      return next;
    });
  }, []);

  const handleCustomRangeChange = useCallback((newStart: Date, newEnd: Date) => {
    setTimePreset("custom");
    setCustomStart(newStart);
    setCustomEnd(newEnd);
  }, []);

  const handleTogglePlanet = useCallback((id: string) => {
    setEnabledPlanets((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const handleSegmentClick = useCallback(
    (segment: TransitSegment, planetName: string) => {
      setSelectedSegment({ segment, planetName });
    },
    []
  );

  // Fetch transit data
  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const planetIds = Array.from(enabledPlanets).join(",");
        const params = new URLSearchParams({
          start: start.toISOString(),
          end: end.toISOString(),
          planets: planetIds,
          level: detailLevel,
        });
        const res = await fetch(`/api/transits?${params}`, {
          signal: controller.signal,
        });
        const json = await res.json();
        setTransitData(json.data || []);
      } catch (err) {
        if (!(err instanceof DOMException && err.name === "AbortError")) {
          console.error("Failed to fetch transits:", err);
        }
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [start, end, enabledPlanets, detailLevel]);

  // Fetch aspects, stations, combustion (shares time range with transits)
  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setAspectsLoading(true);
      try {
        const params = new URLSearchParams({
          start: start.toISOString(),
          end: end.toISOString(),
        });
        const res = await fetch(`/api/aspects?${params}`, {
          signal: controller.signal,
        });
        const json = await res.json();
        setAspectsData(json.aspects || []);
        setStationsData(json.stations || []);
        setCombustionData(json.combustion || []);
      } catch (err) {
        if (!(err instanceof DOMException && err.name === "AbortError")) {
          console.error("Failed to fetch aspects:", err);
        }
      } finally {
        setAspectsLoading(false);
      }
    }, 300);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [start, end]);

  return (
    <div className="min-h-screen">
      {/* Page header */}
      <div className="border-b border-border-light bg-bg-warm">
        <Container className="py-8 md:py-12">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.12em] text-green">
            Planetary Transits
          </p>
          <h1 className="mb-2">Transit Timeline</h1>
          <p className="max-w-[55ch] text-lg text-text-secondary">
            Visualize when planets move through signs, nakshatras, and padas.
            Click any segment for detailed transit information.
          </p>
        </Container>
      </div>

      {/* Main content */}
      <Container className="py-8">
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Filter sidebar */}
          <FilterPanel
            enabledPlanets={enabledPlanets}
            onTogglePlanet={handleTogglePlanet}
            detailLevel={detailLevel}
            onDetailLevelChange={setDetailLevel}
            timePreset={timePreset}
            onTimePresetChange={handleTimePresetChange}
            customStart={customStart ?? undefined}
            customEnd={customEnd ?? undefined}
            onCustomRangeChange={handleCustomRangeChange}
          />

          {/* Timeline + Aspects */}
          <div className="flex-1 min-w-0">
            {isLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-10 w-full" />
                {Array.from({ length: 8 }).map((_, i) => (
                  <Skeleton key={i} className="h-10 w-full" />
                ))}
              </div>
            ) : transitData.length === 0 ? (
              <div className="flex h-64 items-center justify-center rounded-2xl bg-surface text-text-secondary">
                Select at least one planet to view transits
              </div>
            ) : (
              <TransitTimeline
                data={transitData}
                startDate={start}
                endDate={end}
                detailLevel={detailLevel}
                enabledPlanets={enabledPlanets}
                onSegmentClick={handleSegmentClick}
              />
            )}

            {/* Aspects, Stations & Combustion */}
            <AspectsTimeline
              aspects={aspectsData}
              stations={stationsData}
              combustion={combustionData}
              isLoading={aspectsLoading}
              location={{ lat: city.lat, lng: city.lng, city: city.name, timezone: city.timezone }}
            />
          </div>
        </div>
      </Container>

      {/* Detail panel */}
      <TransitDetailPanel
        segment={selectedSegment?.segment ?? null}
        planetName={selectedSegment?.planetName ?? ""}
        onClose={() => setSelectedSegment(null)}
      />
    </div>
  );
}
