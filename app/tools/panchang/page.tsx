import type { Metadata } from "next";
import ComingSoon from "@/components/ui/ComingSoon";

export const metadata: Metadata = {
  title: "Daily Panchang",
  description: "Tithi, nakshatra, yoga, karana — the complete Vedic almanac for any date and location.",
};

export default function PanchangPage() {
  return (
    <ComingSoon
      title="Daily Panchang"
      description="Tithi, nakshatra, yoga, karana — the complete Vedic almanac for any date and location, beautifully presented."
      icon="☽"
    />
  );
}
