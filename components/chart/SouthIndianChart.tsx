"use client";

import { RASHIS } from "@/lib/astro/constants";

interface ChartPlanetEntry {
  id: string;
  name: string;
  rashiIndex: number;
  isRetrograde?: boolean;
}

interface Props {
  planets: ChartPlanetEntry[];
  lagnaRashiIndex: number;
  title: string;
}

const GRID: (number | null)[][] = [
  [11, 0, 1, 2],
  [10, null, null, 3],
  [9, null, null, 4],
  [8, 7, 6, 5],
];

const ABBREV: Record<string, string> = {
  sun: "Su", moon: "Mo", mars: "Ma", mercury: "Me",
  jupiter: "Ju", venus: "Ve", saturn: "Sa",
  rahu: "Ra", ketu: "Ke",
  uranus: "Ur", neptune: "Ne", pluto: "Pl",
};

const PLANET_COLORS: Record<string, string> = {
  sun: "#C25E30", moon: "#6B6F5E", mars: "#C25E30", mercury: "#7A8450",
  jupiter: "#D4A646", venus: "#8DB560", saturn: "#4A4C40",
  rahu: "#6B6F5E", ketu: "#8A8E7A",
  uranus: "#5C8A7A", neptune: "#5C6A8A", pluto: "#7A5C5C",
};

const CELL = 80;
const PAD = 16;
const CHART_SIZE = CELL * 4 + PAD * 2;
const INNER = CELL * 4;

export default function SouthIndianChart({ planets, lagnaRashiIndex, title }: Props) {
  const safeId = title.replace(/[^a-zA-Z0-9]/g, "");
  const byRashi: Record<number, ChartPlanetEntry[]> = {};
  for (const p of planets) {
    if (!byRashi[p.rashiIndex]) byRashi[p.rashiIndex] = [];
    byRashi[p.rashiIndex].push(p);
  }

  return (
    <div>
      <h3 className="mb-4 text-center font-serif text-lg font-semibold">{title}</h3>
      <svg
        viewBox={`0 0 ${CHART_SIZE} ${CHART_SIZE}`}
        className="w-full max-w-[360px] mx-auto"
        role="img"
        aria-label={`${title} chart`}
      >
        <defs>
          <linearGradient id={`lgf-${safeId}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7A8450" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#7A8450" stopOpacity="0.03" />
          </linearGradient>
        </defs>

        {/* Outer background */}
        <rect width={CHART_SIZE} height={CHART_SIZE} fill="#F7F6F1" rx={3} />

        {/* Main grid background */}
        <rect x={PAD} y={PAD} width={INNER} height={INNER} fill="#FDFCF8" />

        {/* Outer border — strong */}
        <rect
          x={PAD} y={PAD}
          width={INNER} height={INNER}
          fill="none"
          stroke="#2B2D24"
          strokeWidth={2}
        />

        {/* Grid cells */}
        {GRID.map((row, ri) =>
          row.map((signIndex, ci) => {
            if (signIndex === null) return null;
            const x = PAD + ci * CELL;
            const y = PAD + ri * CELL;
            const isLagna = signIndex === lagnaRashiIndex;
            const cellPlanets = byRashi[signIndex] || [];
            const rashi = RASHIS[signIndex];

            return (
              <g key={`${ri}-${ci}`}>
                {/* Cell fill */}
                <rect
                  x={x} y={y}
                  width={CELL} height={CELL}
                  fill={isLagna ? `url(#lgf-${safeId})` : "transparent"}
                />

                {/* Cell border — visible, consistent weight */}
                <rect
                  x={x} y={y}
                  width={CELL} height={CELL}
                  fill="none"
                  stroke="#B0AE9E"
                  strokeWidth={1}
                />

                {/* Lagna marker — small L-bracket, top-left corner */}
                {isLagna && (
                  <>
                    <line x1={x + 3} y1={y + 3} x2={x + 3} y2={y + 15} stroke="#5C6340" strokeWidth={2} strokeLinecap="round" />
                    <line x1={x + 3} y1={y + 3} x2={x + 15} y2={y + 3} stroke="#5C6340" strokeWidth={2} strokeLinecap="round" />
                  </>
                )}

                {/* Sign label — top center */}
                <text
                  x={x + CELL / 2} y={y + 12}
                  textAnchor="middle"
                  style={{ fontSize: 8, fontFamily: "var(--font-body)", fontWeight: 500, letterSpacing: "0.06em" }}
                  fill={isLagna ? "#5C6340" : "#8A8E7A"}
                >
                  {rashi.sanskrit.substring(0, 3).toUpperCase()}
                </text>

                {/* Sign number — top right */}
                <text
                  x={x + CELL - 5} y={y + 11}
                  textAnchor="end"
                  style={{ fontSize: 7, fontFamily: "var(--font-mono)" }}
                  fill="#B0AE9E"
                >
                  {signIndex + 1}
                </text>

                {/* Planets */}
                {cellPlanets.map((p, pi) => {
                  const cols = cellPlanets.length <= 3 ? cellPlanets.length : 3;
                  const col = pi % cols;
                  const rowIdx = Math.floor(pi / cols);
                  const totalRows = Math.ceil(cellPlanets.length / cols);
                  const colW = 24;
                  const rowH = 16;
                  const gridW = cols * colW;
                  const gridH = totalRows * rowH;
                  const px = x + (CELL - gridW) / 2 + col * colW + colW / 2;
                  const py = y + 20 + (CELL - 20 - gridH) / 2 + rowIdx * rowH + rowH / 2 + 2;

                  const abbr = ABBREV[p.id] || p.name.substring(0, 2);
                  const color = PLANET_COLORS[p.id] || "#2B2D24";

                  return (
                    <g key={p.id}>
                      <text
                        x={px} y={py}
                        textAnchor="middle" dominantBaseline="central"
                        style={{ fontSize: 11, fontFamily: "var(--font-body)", fontWeight: 600 }}
                        fill={color}
                      >
                        {abbr}
                      </text>
                      {p.isRetrograde && (
                        <text
                          x={px + 12} y={py - 4}
                          textAnchor="middle"
                          style={{ fontSize: 6, fontFamily: "var(--font-body)", fontWeight: 600 }}
                          fill="#C25E30"
                        >
                          R
                        </text>
                      )}
                    </g>
                  );
                })}
              </g>
            );
          })
        )}

        {/* Center area */}
        <rect
          x={PAD + CELL} y={PAD + CELL}
          width={CELL * 2} height={CELL * 2}
          fill="#F2F0E8"
          stroke="#B0AE9E"
          strokeWidth={1}
        />

        {/* Inner decorative border */}
        <rect
          x={PAD + CELL + 6} y={PAD + CELL + 6}
          width={CELL * 2 - 12} height={CELL * 2 - 12}
          fill="none"
          stroke="#D4D3C4"
          strokeWidth={0.5}
        />

        {/* Center text */}
        <text
          x={CHART_SIZE / 2} y={CHART_SIZE / 2 - 16}
          textAnchor="middle"
          style={{ fontSize: 8, fontFamily: "var(--font-body)", fontWeight: 500, letterSpacing: "0.15em" }}
          fill="#8A8E7A"
        >
          {title.includes("D9") ? "NAVAMSHA" : "RASHI"}
        </text>
        <text
          x={CHART_SIZE / 2} y={CHART_SIZE / 2 + 3}
          textAnchor="middle"
          style={{ fontSize: 14, fontFamily: "var(--font-heading)", fontWeight: 600 }}
          fill="#2B2D24"
        >
          {RASHIS[lagnaRashiIndex].sanskrit}
        </text>
        <text
          x={CHART_SIZE / 2} y={CHART_SIZE / 2 + 18}
          textAnchor="middle"
          style={{ fontSize: 7, fontFamily: "var(--font-body)", fontWeight: 400, letterSpacing: "0.1em" }}
          fill="#8A8E7A"
        >
          ASCENDANT
        </text>

        {/* Strong outer border on top (drawn last to be crisp) */}
        <rect
          x={PAD} y={PAD}
          width={INNER} height={INNER}
          fill="none"
          stroke="#2B2D24"
          strokeWidth={2}
        />
      </svg>
    </div>
  );
}
