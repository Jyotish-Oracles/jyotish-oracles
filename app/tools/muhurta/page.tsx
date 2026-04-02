import type { Metadata } from "next";
import ComingSoon from "@/components/ui/ComingSoon";

export const metadata: Metadata = {
  title: "Muhurta Finder",
  description: "Find auspicious windows for marriage, travel, business, and other life events.",
};

export default function MuhurtaPage() {
  return (
    <ComingSoon
      title="Muhurta Finder"
      description="Find auspicious windows for marriage, travel, business, and other life events using classical Vedic timing principles."
      icon="✦"
    />
  );
}
