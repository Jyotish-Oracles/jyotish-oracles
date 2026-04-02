"use client";

import { useState } from "react";
import { PLANETS } from "@/lib/astro/planets";
import type { DetailLevel, TimePreset } from "@/lib/astro/types";

interface Props {
  enabledPlanets: Set<string>;
  onTogglePlanet: (id: string) => void;
  detailLevel: DetailLevel;
  onDetailLevelChange: (level: DetailLevel) => void;
  timePreset: TimePreset;
  onTimePresetChange: (preset: TimePreset) => void;
  customStart?: Date;
  customEnd?: Date;
  onCustomRangeChange: (start: Date, end: Date) => void;
}

const speedGroups = [
  { label: "Slow Movers", group: "slow" as const },
  { label: "Medium Movers", group: "medium" as const },
  { label: "Fast (Moon)", group: "fast" as const },
];

const presets: { value: TimePreset; label: string }[] = [
  { value: "week", label: "This Week" },
  { value: "month", label: "This Month" },
  { value: "3months", label: "3 Months" },
  { value: "6months", label: "6 Months" },
  { value: "year", label: "This Year" },
];

const detailLevels: { value: DetailLevel; label: string }[] = [
  { value: "rashi", label: "Rashi" },
  { value: "nakshatra", label: "Nakshatra" },
  { value: "pada", label: "Pada" },
];

function toInputDate(d: Date): string {
  return d.toISOString().split("T")[0];
}

export default function FilterPanel({
  enabledPlanets,
  onTogglePlanet,
  detailLevel,
  onDetailLevelChange,
  timePreset,
  onTimePresetChange,
  customStart,
  customEnd,
  onCustomRangeChange,
}: Props) {
  const [showCustom, setShowCustom] = useState(timePreset === "custom");
  const [localStart, setLocalStart] = useState(
    customStart ? toInputDate(customStart) : toInputDate(new Date())
  );
  const [localEnd, setLocalEnd] = useState(
    customEnd ? toInputDate(customEnd) : toInputDate(new Date())
  );

  const handlePresetClick = (preset: TimePreset) => {
    setShowCustom(false);
    onTimePresetChange(preset);
  };

  const handleCustomToggle = () => {
    setShowCustom(true);
    // Apply current local values
    const start = new Date(localStart);
    const end = new Date(localEnd);
    end.setHours(23, 59, 59, 999);
    if (!isNaN(start.getTime()) && !isNaN(end.getTime()) && end > start) {
      onCustomRangeChange(start, end);
    }
  };

  const handleDateChange = (field: "start" | "end", value: string) => {
    if (field === "start") setLocalStart(value);
    else setLocalEnd(value);

    const start = new Date(field === "start" ? value : localStart);
    const end = new Date(field === "end" ? value : localEnd);
    end.setHours(23, 59, 59, 999);

    if (!isNaN(start.getTime()) && !isNaN(end.getTime()) && end > start) {
      onCustomRangeChange(start, end);
    }
  };

  return (
    <aside
      className="w-full shrink-0 space-y-6 rounded-2xl bg-surface p-5 lg:w-[260px]"
      aria-label="Transit filters"
    >
      {/* Time Range */}
      <div>
        <h3 className="mb-3 text-[11px] font-medium uppercase tracking-[0.12em] text-text-tertiary font-sans">
          Time Range
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {presets.map((p) => (
            <button
              key={p.value}
              onClick={() => handlePresetClick(p.value)}
              className={`rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                timePreset === p.value && !showCustom
                  ? "bg-green text-white"
                  : "bg-surface-alt text-text-secondary hover:text-text"
              }`}
            >
              {p.label}
            </button>
          ))}
          <button
            onClick={handleCustomToggle}
            className={`col-span-2 rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
              showCustom
                ? "bg-green text-white"
                : "bg-surface-alt text-text-secondary hover:text-text"
            }`}
          >
            Custom Range
          </button>
        </div>

        {/* Custom date inputs */}
        {showCustom && (
          <div className="mt-3 space-y-2">
            <div>
              <label className="mb-1 block text-[10px] font-medium uppercase tracking-wider text-text-tertiary">
                From
              </label>
              <input
                type="date"
                value={localStart}
                onChange={(e) => handleDateChange("start", e.target.value)}
                className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-text focus:border-green focus:outline-none focus:ring-2 focus:ring-green/15"
              />
            </div>
            <div>
              <label className="mb-1 block text-[10px] font-medium uppercase tracking-wider text-text-tertiary">
                To
              </label>
              <input
                type="date"
                value={localEnd}
                onChange={(e) => handleDateChange("end", e.target.value)}
                max={(() => {
                  const maxDate = new Date(localStart);
                  maxDate.setFullYear(maxDate.getFullYear() + 1);
                  return toInputDate(maxDate);
                })()}
                className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-text focus:border-green focus:outline-none focus:ring-2 focus:ring-green/15"
              />
            </div>
            <p className="text-[10px] text-text-tertiary">Max range: 1 year</p>
          </div>
        )}
      </div>

      {/* Detail Level */}
      <div>
        <h3 className="mb-3 text-[11px] font-medium uppercase tracking-[0.12em] text-text-tertiary font-sans">
          Detail Level
        </h3>
        <div className="flex rounded-lg bg-surface-alt p-1">
          {detailLevels.map((level) => (
            <button
              key={level.value}
              onClick={() => onDetailLevelChange(level.value)}
              className={`flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                detailLevel === level.value
                  ? "bg-white text-text shadow-sm"
                  : "text-text-secondary hover:text-text"
              }`}
            >
              {level.label}
            </button>
          ))}
        </div>
      </div>

      {/* Planet Toggles */}
      {speedGroups.map(({ label, group }) => {
        const groupPlanets = PLANETS.filter((p) => p.speedGroup === group);
        return (
          <div key={group}>
            <h3 className="mb-3 text-[11px] font-medium uppercase tracking-[0.12em] text-text-tertiary font-sans">
              {label}
            </h3>
            <div className="space-y-1.5">
              {groupPlanets.map((planet) => {
                const enabled = enabledPlanets.has(planet.id);
                return (
                  <button
                    key={planet.id}
                    onClick={() => onTogglePlanet(planet.id)}
                    aria-pressed={enabled}
                    className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                      enabled
                        ? "bg-white text-text shadow-sm"
                        : "text-text-tertiary hover:text-text-secondary"
                    }`}
                  >
                    <span
                      className="inline-block h-2.5 w-2.5 rounded-full"
                      style={{
                        backgroundColor: planet.color,
                        opacity: enabled ? 1 : 0.3,
                      }}
                    />
                    <span className="flex-1">{planet.name}</span>
                    <span className="text-xs text-text-tertiary">
                      {planet.sanskrit}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </aside>
  );
}
