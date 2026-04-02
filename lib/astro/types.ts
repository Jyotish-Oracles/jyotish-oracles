export type DetailLevel = "rashi" | "nakshatra" | "pada";

export type SpeedGroup = "slow" | "medium" | "fast";

export type TimePreset = "week" | "month" | "3months" | "6months" | "year" | "custom";

export interface Rashi {
  index: number;
  name: string;
  sanskrit: string;
  element: "fire" | "earth" | "air" | "water";
  ruler: string;
  startDegree: number;
}

export interface Nakshatra {
  index: number;
  name: string;
  lord: string;
  startDegree: number;
  rashiIndex: number;
  padas: [number, number, number, number]; // navamsha rashi indices
}

export interface Planet {
  id: string;
  name: string;
  sanskrit: string;
  swephId: number;
  speedGroup: SpeedGroup;
  color: string;
  symbol: string;
  avgSignDays: number;
  isOuter: boolean;
}

export interface PlanetPosition {
  longitude: number;
  latitude: number;
  speed: number;
  isRetrograde: boolean;
  rashiIndex: number;
  rashiDegree: number;
  nakshatraIndex: number;
  padaIndex: number; // 0-3 within the nakshatra
  absolutePadaIndex: number; // 0-107 across all nakshatras
}

export interface TransitSegment {
  planetId: string;
  startDate: string; // ISO
  endDate: string; // ISO
  rashiIndex: number;
  rashiName: string;
  nakshatraIndex: number;
  nakshatraName: string;
  padaIndex: number;
  isRetrograde: boolean;
  startDegree: number;
  endDegree: number;
}

export interface TransitData {
  planetId: string;
  planetName: string;
  segments: TransitSegment[];
}

// --- Aspects, Stations, Combustion ---

export interface AspectEvent {
  type: "aspect";
  planet1Id: string;
  planet2Id: string;
  planet1Name: string;
  planet2Name: string;
  aspectAngle: number;
  aspectName: string;
  isSpecialVedic: boolean;
  date: string; // ISO
  separation: number;
  planet1Degree: number;
  planet2Degree: number;
  planet1Rashi: string;
  planet2Rashi: string;
}

export interface StationEvent {
  type: "station";
  planetId: string;
  planetName: string;
  stationType: "retrograde" | "direct";
  date: string; // ISO
  degree: number;
  rashi: string;
  nakshatra: string;
}

export interface CombustionEvent {
  type: "combustion";
  planetId: string;
  planetName: string;
  eventType: "enter" | "exit";
  date: string; // ISO
  separationDegrees: number;
  threshold: number;
  isRetrograde: boolean;
}

export type AstroEvent = AspectEvent | StationEvent | CombustionEvent;

// --- Chart Data ---

export interface ChartPlanet {
  id: string;
  name: string;
  sanskrit: string;
  longitude: number;
  rashiIndex: number;
  rashiName: string;
  rashiDegree: number;
  nakshatraIndex: number;
  nakshatraName: string;
  nakshatraLord: string;
  pada: number;
  speed: number;
  isRetrograde: boolean;
}

export interface D9Planet {
  id: string;
  name: string;
  rashiIndex: number;
  rashiName: string;
}

export interface ChartData {
  datetime: string;
  location: { lat: number; lng: number; city: string };
  lagna: { degree: number; rashiIndex: number; rashiName: string; rashiDegree: number };
  planets: ChartPlanet[];
  d9Planets: D9Planet[];
  panchang: PanchangData;
}

export interface PanchangData {
  date: string;
  weekday: string;
  tithi: { name: string; number: number; paksha: string };
  nakshatra: { name: string; index: number; lord: string; pada: number };
  yoga: { name: string; index: number };
  karana: { name: string; index: number };
  moonSign: string;
  sunSign: string;
  moonDegree: number;
  sunDegree: number;
}
