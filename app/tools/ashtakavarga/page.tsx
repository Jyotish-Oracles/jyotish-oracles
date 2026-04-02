import type { Metadata } from "next";
import ComingSoon from "@/components/ui/ComingSoon";

export const metadata: Metadata = {
  title: "Ashtakavarga",
  description: "Compute bindu scores for each planet across all signs and identify strong transits.",
};

export default function AshtakavargaPage() {
  return (
    <ComingSoon
      title="Ashtakavarga"
      description="Compute bindu scores for each planet across all signs. Identify strong and weak transits with precision."
      icon="⊞"
    />
  );
}
