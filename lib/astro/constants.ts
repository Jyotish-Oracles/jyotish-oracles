import type { Rashi, Nakshatra, DetailLevel } from "./types";

// ============================================
// RASHIS (12 Zodiac Signs)
// Each spans 30° of the sidereal zodiac
// ============================================

export const RASHIS: Rashi[] = [
  { index: 0,  name: "Aries",       sanskrit: "Mesha",      element: "fire",  ruler: "Mars",    startDegree: 0 },
  { index: 1,  name: "Taurus",      sanskrit: "Vrishabha",  element: "earth", ruler: "Venus",   startDegree: 30 },
  { index: 2,  name: "Gemini",      sanskrit: "Mithuna",    element: "air",   ruler: "Mercury", startDegree: 60 },
  { index: 3,  name: "Cancer",      sanskrit: "Karka",      element: "water", ruler: "Moon",    startDegree: 90 },
  { index: 4,  name: "Leo",         sanskrit: "Simha",      element: "fire",  ruler: "Sun",     startDegree: 120 },
  { index: 5,  name: "Virgo",       sanskrit: "Kanya",      element: "earth", ruler: "Mercury", startDegree: 150 },
  { index: 6,  name: "Libra",       sanskrit: "Tula",       element: "air",   ruler: "Venus",   startDegree: 180 },
  { index: 7,  name: "Scorpio",     sanskrit: "Vrishchika", element: "water", ruler: "Mars",    startDegree: 210 },
  { index: 8,  name: "Sagittarius", sanskrit: "Dhanu",      element: "fire",  ruler: "Jupiter", startDegree: 240 },
  { index: 9,  name: "Capricorn",   sanskrit: "Makara",     element: "earth", ruler: "Saturn",  startDegree: 270 },
  { index: 10, name: "Aquarius",    sanskrit: "Kumbha",     element: "air",   ruler: "Saturn",  startDegree: 300 },
  { index: 11, name: "Pisces",      sanskrit: "Meena",      element: "water", ruler: "Jupiter", startDegree: 330 },
];

// ============================================
// NAKSHATRAS (27 Lunar Mansions)
// Each spans 13°20' (13.3333°)
// Each has 4 padas of 3°20' (3.3333°)
// ============================================

// Navamsha cycle: padas map to rashis starting from Aries, cycling through all 12
// Nakshatra 1 Pada 1 = Aries(0), Pada 2 = Taurus(1), Pada 3 = Gemini(2), Pada 4 = Cancer(3)
// Nakshatra 2 Pada 1 = Leo(4), etc.
function navamshaRashis(nakshatraIndex: number): [number, number, number, number] {
  const baseIndex = (nakshatraIndex * 4) % 12;
  return [
    baseIndex % 12,
    (baseIndex + 1) % 12,
    (baseIndex + 2) % 12,
    (baseIndex + 3) % 12,
  ];
}

// Vimsottari Dasha lord cycle
const NAKSHATRA_LORDS = [
  "Ketu", "Venus", "Sun", "Moon", "Mars", "Rahu", "Jupiter", "Saturn", "Mercury",
];

export const NAKSHATRAS: Nakshatra[] = [
  "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra",
  "Punarvasu", "Pushya", "Ashlesha", "Magha", "Purva Phalguni", "Uttara Phalguni",
  "Hasta", "Chitra", "Swati", "Vishakha", "Anuradha", "Jyeshtha",
  "Mula", "Purva Ashadha", "Uttara Ashadha", "Shravana", "Dhanishta", "Shatabhisha",
  "Purva Bhadrapada", "Uttara Bhadrapada", "Revati",
].map((name, index) => ({
  index,
  name,
  lord: NAKSHATRA_LORDS[index % 9],
  startDegree: index * (360 / 27),
  rashiIndex: Math.floor((index * (360 / 27)) / 30),
  padas: navamshaRashis(index),
}));

// ============================================
// TITHIS (30 lunar days)
// ============================================

export const TITHI_NAMES = [
  "Pratipada", "Dvitiya", "Tritiya", "Chaturthi", "Panchami",
  "Shashthi", "Saptami", "Ashtami", "Navami", "Dashami",
  "Ekadashi", "Dvadashi", "Trayodashi", "Chaturdashi", "Purnima",
  "Pratipada", "Dvitiya", "Tritiya", "Chaturthi", "Panchami",
  "Shashthi", "Saptami", "Ashtami", "Navami", "Dashami",
  "Ekadashi", "Dvadashi", "Trayodashi", "Chaturdashi", "Amavasya",
];

// ============================================
// YOGAS (27)
// ============================================

export const YOGA_NAMES = [
  "Vishkambha", "Priti", "Ayushman", "Saubhagya", "Shobhana",
  "Atiganda", "Sukarma", "Dhriti", "Shula", "Ganda",
  "Vriddhi", "Dhruva", "Vyaghata", "Harshana", "Vajra",
  "Siddhi", "Vyatipata", "Variyan", "Parigha", "Shiva",
  "Siddha", "Sadhya", "Shubha", "Shukla", "Brahma",
  "Indra", "Vaidhriti",
];

// ============================================
// KARANAS (11 types, 60 in a month)
// ============================================

export const KARANA_NAMES = [
  "Bava", "Balava", "Kaulava", "Taitila", "Garaja",
  "Vanija", "Vishti", "Shakuni", "Chatushpada", "Naga", "Kimstughna",
];

// ============================================
// WEEKDAYS
// ============================================

export const WEEKDAYS = [
  { name: "Sunday",    sanskrit: "Ravivara",     lord: "Sun" },
  { name: "Monday",    sanskrit: "Somavara",     lord: "Moon" },
  { name: "Tuesday",   sanskrit: "Mangalavara",  lord: "Mars" },
  { name: "Wednesday", sanskrit: "Budhavara",    lord: "Mercury" },
  { name: "Thursday",  sanskrit: "Guruvara",     lord: "Jupiter" },
  { name: "Friday",    sanskrit: "Shukravara",   lord: "Venus" },
  { name: "Saturday",  sanskrit: "Shanivara",    lord: "Saturn" },
];

// ============================================
// HELPER FUNCTIONS
// ============================================

const NAKSHATRA_SPAN = 360 / 27; // 13.3333°
const PADA_SPAN = NAKSHATRA_SPAN / 4; // 3.3333°

export function getRashiFromDegree(degree: number): Rashi {
  const normalized = ((degree % 360) + 360) % 360;
  return RASHIS[Math.floor(normalized / 30)];
}

export function getNakshatraFromDegree(degree: number): Nakshatra {
  const normalized = ((degree % 360) + 360) % 360;
  return NAKSHATRAS[Math.floor(normalized / NAKSHATRA_SPAN)];
}

export function getPadaFromDegree(degree: number): { nakshatraIndex: number; pada: number; absolutePada: number } {
  const normalized = ((degree % 360) + 360) % 360;
  const absolutePada = Math.floor(normalized / PADA_SPAN);
  const nakshatraIndex = Math.floor(absolutePada / 4);
  const pada = absolutePada % 4;
  return { nakshatraIndex, pada, absolutePada };
}

export function getBoundaryDegree(level: DetailLevel, index: number): number {
  switch (level) {
    case "rashi": return index * 30;
    case "nakshatra": return index * NAKSHATRA_SPAN;
    case "pada": return index * PADA_SPAN;
  }
}

export function getIndexFromDegree(degree: number, level: DetailLevel): number {
  const normalized = ((degree % 360) + 360) % 360;
  switch (level) {
    case "rashi": return Math.floor(normalized / 30);
    case "nakshatra": return Math.floor(normalized / NAKSHATRA_SPAN);
    case "pada": return Math.floor(normalized / PADA_SPAN);
  }
}

export function getTotalSegments(level: DetailLevel): number {
  switch (level) {
    case "rashi": return 12;
    case "nakshatra": return 27;
    case "pada": return 108;
  }
}
