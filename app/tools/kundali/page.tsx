import type { Metadata } from "next";
import ComingSoon from "@/components/ui/ComingSoon";

export const metadata: Metadata = {
  title: "Kundali Generator",
  description: "Generate your Vedic birth chart with planetary positions, house placements, and nakshatra analysis.",
};

export default function KundaliPage() {
  return (
    <ComingSoon
      title="Kundali Generator"
      description="Generate a birth chart with precise planetary positions, house placements, divisional charts, and full nakshatra analysis."
      icon="☉"
    />
  );
}
