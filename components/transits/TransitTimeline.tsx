"use client";

import { useMemo, useRef, useState } from "react";
import { scaleTime, type ScaleTime } from "d3-scale";
import { timeDay, timeWeek, timeMonth } from "d3-time";
import { timeFormat } from "d3-time-format";
import { PLANETS } from "@/lib/astro/planets";
import { getRashiColor } from "@/lib/astro/colors";
import type { TransitData, TransitSegment, DetailLevel } from "@/lib/astro/types";

interface Props {
  data: TransitData[];
  startDate: Date;
  endDate: Date;
  detailLevel: DetailLevel;
  enabledPlanets: Set<string>;
  onSegmentClick: (segment: TransitSegment, planetName: string) => void;
}

const LABEL_WIDTH = 120;
const LANE_HEIGHT = 40;
const LANE_GAP = 4;
const HEADER_HEIGHT = 36;
const PADDING_RIGHT = 16;

export default function TransitTimeline({
  data,
  startDate,
  endDate,
  detailLevel,
  enabledPlanets,
  onSegmentClick,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null);
  const [tooltipInfo, setTooltipInfo] = useState<{
    x: number;
    y: number;
    text: string;
  } | null>(null);

  // Filter to enabled planets, maintain order
  const visibleData = useMemo(() => {
    const planetOrder = PLANETS.map((p) => p.id);
    return data
      .filter((d) => enabledPlanets.has(d.planetId))
      .sort(
        (a, b) =>
          planetOrder.indexOf(a.planetId) - planetOrder.indexOf(b.planetId)
      );
  }, [data, enabledPlanets]);

  // SVG dimensions
  const width = 900; // Will be responsive via viewBox
  const contentWidth = width - LABEL_WIDTH - PADDING_RIGHT;
  const svgHeight =
    HEADER_HEIGHT + visibleData.length * (LANE_HEIGHT + LANE_GAP) + 16;

  // D3 time scale
  const xScale: ScaleTime<number, number> = useMemo(
    () =>
      scaleTime<number>()
        .domain([startDate, endDate])
        .range([LABEL_WIDTH, width - PADDING_RIGHT]),
    [startDate, endDate, width]
  );

  // Determine tick interval based on range
  const rangeDays = (endDate.getTime() - startDate.getTime()) / 86400000;
  const tickInterval =
    rangeDays <= 10
      ? timeDay.every(1)
      : rangeDays <= 60
        ? timeWeek.every(1)
        : timeMonth.every(1);

  const formatTick =
    rangeDays <= 10
      ? timeFormat("%b %d")
      : rangeDays <= 60
        ? timeFormat("%b %d")
        : timeFormat("%b %Y");

  const ticks = tickInterval ? xScale.ticks(tickInterval) : xScale.ticks(8);

  // Today marker
  const today = new Date();
  const todayX = xScale(today);
  const showToday = today >= startDate && today <= endDate;

  return (
    <div
      ref={containerRef}
      className="w-full overflow-x-auto rounded-2xl bg-white border border-border-light"
    >
      <svg
        viewBox={`0 0 ${width} ${svgHeight}`}
        className="w-full min-w-[700px]"
        role="img"
        aria-label={`Planetary transit timeline from ${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}`}
      >
        {/* Time axis */}
        <g>
          {ticks.map((tick) => {
            const x = xScale(tick);
            return (
              <g key={tick.getTime()}>
                <line
                  x1={x}
                  y1={HEADER_HEIGHT}
                  x2={x}
                  y2={svgHeight}
                  stroke="var(--color-border-light)"
                  strokeWidth={1}
                />
                <text
                  x={x}
                  y={HEADER_HEIGHT - 10}
                  textAnchor="middle"
                  className="fill-text-tertiary"
                  style={{ fontSize: 10, fontFamily: "var(--font-body)" }}
                >
                  {formatTick(tick)}
                </text>
              </g>
            );
          })}
        </g>

        {/* Today marker */}
        {showToday && (
          <g>
            <line
              x1={todayX}
              y1={HEADER_HEIGHT}
              x2={todayX}
              y2={svgHeight}
              stroke="var(--color-accent)"
              strokeWidth={1.5}
              strokeDasharray="4 3"
              opacity={0.7}
            />
            <text
              x={todayX}
              y={HEADER_HEIGHT - 2}
              textAnchor="middle"
              className="fill-accent"
              style={{
                fontSize: 9,
                fontWeight: 600,
                fontFamily: "var(--font-body)",
              }}
            >
              TODAY
            </text>
          </g>
        )}

        {/* Planet lanes */}
        {visibleData.map((planetData, laneIndex) => {
          const planet = PLANETS.find((p) => p.id === planetData.planetId);
          if (!planet) return null;

          const y = HEADER_HEIGHT + laneIndex * (LANE_HEIGHT + LANE_GAP);
          const isMoonOnMonthly =
            planet.speedGroup === "fast" && rangeDays > 14;

          return (
            <g key={planet.id}>
              {/* Lane background */}
              <rect
                x={LABEL_WIDTH}
                y={y}
                width={contentWidth}
                height={LANE_HEIGHT}
                fill={laneIndex % 2 === 0 ? "transparent" : "rgba(238,237,223,0.3)"}
                rx={4}
              />

              {/* Planet label */}
              <text
                x={LABEL_WIDTH - 12}
                y={y + LANE_HEIGHT / 2}
                textAnchor="end"
                dominantBaseline="central"
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  fontFamily: "var(--font-body)",
                }}
                className="fill-text"
              >
                {planet.name}
              </text>
              <text
                x={LABEL_WIDTH - 12}
                y={y + LANE_HEIGHT / 2 + 13}
                textAnchor="end"
                dominantBaseline="central"
                style={{
                  fontSize: 9,
                  fontFamily: "var(--font-body)",
                }}
                className="fill-text-tertiary"
              >
                {planet.sanskrit}
              </text>

              {/* Segments or Moon ribbon */}
              {isMoonOnMonthly ? (
                <MoonRibbon
                  segments={planetData.segments}
                  xScale={xScale}
                  y={y}
                  height={LANE_HEIGHT}
                  onHover={(info) => setTooltipInfo(info)}
                  onLeave={() => setTooltipInfo(null)}
                />
              ) : (
                planetData.segments.map((segment, segIndex) => {
                  const segStart = xScale(new Date(segment.startDate));
                  const segEnd = xScale(new Date(segment.endDate));
                  const segWidth = Math.max(segEnd - segStart, 1);
                  const color = getRashiColor(segment.rashiIndex);
                  const segKey = `${segment.planetId}-${segIndex}`;
                  const isHovered = hoveredSegment === segKey;

                  const label =
                    detailLevel === "rashi"
                      ? segment.rashiName
                      : segment.nakshatraName;
                  const showLabel = segWidth > 60;
                  const showSmallLabel = segWidth > 35 && !showLabel;

                  return (
                    <g
                      key={segKey}
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        onSegmentClick(segment, planet.name)
                      }
                      onMouseEnter={() => {
                        setHoveredSegment(segKey);
                        setTooltipInfo({
                          x: segStart + segWidth / 2,
                          y: y - 8,
                          text: `${label}${segment.isRetrograde ? " (R)" : ""}`,
                        });
                      }}
                      onMouseLeave={() => {
                        setHoveredSegment(null);
                        setTooltipInfo(null);
                      }}
                    >
                      {/* Ingress marker */}
                      {segIndex > 0 && (
                        <line
                          x1={segStart}
                          y1={y + 2}
                          x2={segStart}
                          y2={y + LANE_HEIGHT - 2}
                          stroke="var(--color-text)"
                          strokeWidth={0.5}
                          opacity={0.15}
                        />
                      )}

                      <rect
                        x={segStart + 0.5}
                        y={y + 3}
                        width={Math.max(segWidth - 1, 1)}
                        height={LANE_HEIGHT - 6}
                        fill={color.bg}
                        rx={3}
                        opacity={
                          segment.isRetrograde
                            ? 0.6
                            : isHovered
                              ? 0.95
                              : 0.8
                        }
                        style={{
                          transition: "opacity 100ms ease",
                        }}
                      />

                      {/* Retrograde pattern */}
                      {segment.isRetrograde && segWidth > 12 && (
                        <text
                          x={segStart + segWidth / 2}
                          y={y + LANE_HEIGHT / 2 + 1}
                          textAnchor="middle"
                          dominantBaseline="central"
                          style={{
                            fontSize: 8,
                            fontWeight: 600,
                            fontFamily: "var(--font-body)",
                          }}
                          fill={color.text}
                          opacity={0.6}
                        >
                          R
                        </text>
                      )}

                      {/* Label */}
                      {showLabel && !segment.isRetrograde && (
                        <text
                          x={segStart + segWidth / 2}
                          y={y + LANE_HEIGHT / 2 + 1}
                          textAnchor="middle"
                          dominantBaseline="central"
                          style={{
                            fontSize: 10,
                            fontWeight: 500,
                            fontFamily: "var(--font-body)",
                          }}
                          fill={color.text}
                        >
                          {label}
                        </text>
                      )}
                      {showSmallLabel && !segment.isRetrograde && (
                        <text
                          x={segStart + segWidth / 2}
                          y={y + LANE_HEIGHT / 2 + 1}
                          textAnchor="middle"
                          dominantBaseline="central"
                          style={{
                            fontSize: 8,
                            fontFamily: "var(--font-body)",
                          }}
                          fill={color.text}
                          opacity={0.7}
                        >
                          {label.substring(0, 3)}
                        </text>
                      )}
                    </g>
                  );
                })
              )}
            </g>
          );
        })}

        {/* Tooltip */}
        {tooltipInfo && (
          <g>
            <rect
              x={tooltipInfo.x - 40}
              y={tooltipInfo.y - 20}
              width={80}
              height={18}
              rx={4}
              fill="var(--color-dark)"
              opacity={0.9}
            />
            <text
              x={tooltipInfo.x}
              y={tooltipInfo.y - 8}
              textAnchor="middle"
              dominantBaseline="central"
              fill="var(--color-text-on-dark)"
              style={{ fontSize: 9, fontFamily: "var(--font-body)" }}
            >
              {tooltipInfo.text}
            </text>
          </g>
        )}
      </svg>
    </div>
  );
}

// Moon Ribbon — gradient representation for monthly+ views
function MoonRibbon({
  segments,
  xScale,
  y,
  height,
  onHover,
  onLeave,
}: {
  segments: TransitSegment[];
  xScale: ScaleTime<number, number>;
  y: number;
  height: number;
  onHover: (info: { x: number; y: number; text: string }) => void;
  onLeave: () => void;
}) {
  const gradientId = `moon-gradient-${y}`;
  const range = xScale.range() as [number, number];
  const rangeStart = range[0];
  const rangeEnd = range[1];
  const totalWidth = rangeEnd - rangeStart;

  return (
    <g
      onMouseMove={(e) => {
        const svg = e.currentTarget.closest("svg");
        if (!svg) return;
        const pt = svg.createSVGPoint();
        pt.x = e.clientX;
        pt.y = e.clientY;
        const svgPt = pt.matrixTransform(svg.getScreenCTM()?.inverse());
        const date = xScale.invert(svgPt.x);

        // Find which segment this date falls in
        const seg = segments.find(
          (s) => new Date(s.startDate) <= date && new Date(s.endDate) >= date
        );
        if (seg) {
          onHover({
            x: svgPt.x,
            y: y - 8,
            text: `${seg.rashiName}${seg.nakshatraName ? " / " + seg.nakshatraName : ""}`,
          });
        }
      }}
      onMouseLeave={onLeave}
      style={{ cursor: "pointer" }}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" x2="1" y1="0" y2="0">
          {segments.map((seg, i) => {
            const startX = Number(xScale(new Date(seg.startDate)));
            const endX = Number(xScale(new Date(seg.endDate)));
            const startOffset = Math.max(0, (startX - rangeStart) / totalWidth);
            const endOffset = Math.min(1, (endX - rangeStart) / totalWidth);
            const color = getRashiColor(seg.rashiIndex);

            return [
              <stop
                key={`${i}-start`}
                offset={startOffset}
                stopColor={color.bg}
              />,
              <stop
                key={`${i}-end`}
                offset={endOffset}
                stopColor={color.bg}
              />,
            ];
          })}
        </linearGradient>
      </defs>
      <rect
        x={rangeStart}
        y={y + 3}
        width={totalWidth}
        height={height - 6}
        fill={`url(#${gradientId})`}
        rx={3}
        opacity={0.75}
      />
    </g>
  );
}
