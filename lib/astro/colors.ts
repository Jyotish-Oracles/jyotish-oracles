// Rashi colors — earthy muted tones from the Temple Stone palette
// Each color has enough differentiation while staying harmonious

export interface RashiColor {
  bg: string;
  text: string;
  label: string;
}

export const RASHI_COLORS: RashiColor[] = [
  { bg: "#D47B2E", text: "#FFFFFF", label: "Mesha" },        // 0  Aries — warm orange
  { bg: "#8DB560", text: "#1E2E10", label: "Vrishabha" },    // 1  Taurus — leaf green
  { bg: "#D4A646", text: "#33291A", label: "Mithuna" },      // 2  Gemini — golden
  { bg: "#7AA0B0", text: "#FFFFFF", label: "Karka" },        // 3  Cancer — muted blue
  { bg: "#C25E30", text: "#FFFFFF", label: "Simha" },        // 4  Leo — deep orange
  { bg: "#7A8450", text: "#FFFFFF", label: "Kanya" },        // 5  Virgo — sage green
  { bg: "#B8A088", text: "#2B2D24", label: "Tula" },         // 6  Libra — warm stone
  { bg: "#8A5C50", text: "#FFFFFF", label: "Vrishchika" },   // 7  Scorpio — deep earth
  { bg: "#B88A50", text: "#FFFFFF", label: "Dhanu" },        // 8  Sagittarius — amber
  { bg: "#6B6F5E", text: "#FFFFFF", label: "Makara" },       // 9  Capricorn — dark sage
  { bg: "#5C7A8A", text: "#FFFFFF", label: "Kumbha" },       // 10 Aquarius — steel blue
  { bg: "#8A7AB0", text: "#FFFFFF", label: "Meena" },        // 11 Pisces — muted violet
];

export function getRashiColor(rashiIndex: number): RashiColor {
  return RASHI_COLORS[((rashiIndex % 12) + 12) % 12];
}
