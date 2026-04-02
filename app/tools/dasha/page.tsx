import type { Metadata } from "next";
import ComingSoon from "@/components/ui/ComingSoon";

export const metadata: Metadata = {
  title: "Dasha Timeline",
  description: "Vimshottari dasha calculator with interactive timeline — major periods, sub-periods, and antardasha.",
};

export default function DashaPage() {
  return (
    <ComingSoon
      title="Dasha Timeline"
      description="Vimshottari dasha calculator with interactive timeline — major periods, sub-periods, and antardasha laid out visually."
      icon="⟳"
    />
  );
}
