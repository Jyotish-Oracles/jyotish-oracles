import type { Planet } from "./types";

// Swiss Ephemeris planet constants
// These match the sweph library's SE_* constants
export const SE_SUN = 0;
export const SE_MOON = 1;
export const SE_MERCURY = 2;
export const SE_VENUS = 3;
export const SE_MARS = 4;
export const SE_JUPITER = 5;
export const SE_SATURN = 6;
export const SE_URANUS = 7;
export const SE_NEPTUNE = 8;
export const SE_PLUTO = 9;
export const SE_MEAN_NODE = 10; // Rahu (mean node)
// Ketu = Rahu + 180° (calculated, no separate constant)

export const PLANETS: Planet[] = [
  {
    id: "sun",
    name: "Sun",
    sanskrit: "Surya",
    swephId: SE_SUN,
    speedGroup: "medium",
    color: "#D47B2E",
    symbol: "\u2609",
    avgSignDays: 30,
    isOuter: false,
  },
  {
    id: "moon",
    name: "Moon",
    sanskrit: "Chandra",
    swephId: SE_MOON,
    speedGroup: "fast",
    color: "#B8C4A0",
    symbol: "\u263D",
    avgSignDays: 2.25,
    isOuter: false,
  },
  {
    id: "mars",
    name: "Mars",
    sanskrit: "Mangal",
    swephId: SE_MARS,
    speedGroup: "medium",
    color: "#C25E30",
    symbol: "\u2642",
    avgSignDays: 45,
    isOuter: false,
  },
  {
    id: "mercury",
    name: "Mercury",
    sanskrit: "Budha",
    swephId: SE_MERCURY,
    speedGroup: "medium",
    color: "#7A8450",
    symbol: "\u263F",
    avgSignDays: 25,
    isOuter: false,
  },
  {
    id: "jupiter",
    name: "Jupiter",
    sanskrit: "Guru",
    swephId: SE_JUPITER,
    speedGroup: "slow",
    color: "#D4A646",
    symbol: "\u2643",
    avgSignDays: 365,
    isOuter: false,
  },
  {
    id: "venus",
    name: "Venus",
    sanskrit: "Shukra",
    swephId: SE_VENUS,
    speedGroup: "medium",
    color: "#8DB560",
    symbol: "\u2640",
    avgSignDays: 28,
    isOuter: false,
  },
  {
    id: "saturn",
    name: "Saturn",
    sanskrit: "Shani",
    swephId: SE_SATURN,
    speedGroup: "slow",
    color: "#6B6F5E",
    symbol: "\u2644",
    avgSignDays: 912,
    isOuter: false,
  },
  {
    id: "rahu",
    name: "Rahu",
    sanskrit: "Rahu",
    swephId: SE_MEAN_NODE,
    speedGroup: "slow",
    color: "#4A4C40",
    symbol: "\u260A",
    avgSignDays: 547,
    isOuter: false,
  },
  {
    id: "ketu",
    name: "Ketu",
    sanskrit: "Ketu",
    swephId: -1, // Calculated from Rahu
    speedGroup: "slow",
    color: "#8A8E7A",
    symbol: "\u260B",
    avgSignDays: 547,
    isOuter: false,
  },
  {
    id: "uranus",
    name: "Uranus",
    sanskrit: "Uranus",
    swephId: SE_URANUS,
    speedGroup: "slow",
    color: "#5C8A7A",
    symbol: "\u2645",
    avgSignDays: 2555,
    isOuter: true,
  },
  {
    id: "neptune",
    name: "Neptune",
    sanskrit: "Neptune",
    swephId: SE_NEPTUNE,
    speedGroup: "slow",
    color: "#5C6A8A",
    symbol: "\u2646",
    avgSignDays: 5110,
    isOuter: true,
  },
  {
    id: "pluto",
    name: "Pluto",
    sanskrit: "Pluto",
    swephId: SE_PLUTO,
    speedGroup: "slow",
    color: "#7A5C5C",
    symbol: "\u2647",
    avgSignDays: 7665,
    isOuter: true,
  },
];

export function getPlanetById(id: string): Planet | undefined {
  return PLANETS.find((p) => p.id === id);
}

export function getPlanetsBySpeedGroup(group: Planet["speedGroup"]): Planet[] {
  return PLANETS.filter((p) => p.speedGroup === group);
}

// Step size in days for transit computation per speed group
export function getStepSizeDays(speedGroup: Planet["speedGroup"]): number {
  switch (speedGroup) {
    case "fast": return 1 / 24;      // 1 hour
    case "medium": return 6 / 24;    // 6 hours
    case "slow": return 1;           // 1 day
  }
}
