import type { Metadata } from "next";
import ComingSoon from "@/components/ui/ComingSoon";

export const metadata: Metadata = {
  title: "Compatibility",
  description: "Kundali matching with Ashtakuta analysis — assess harmony and compatibility between two charts.",
};

export default function CompatibilityPage() {
  return (
    <ComingSoon
      title="Compatibility"
      description="Kundali matching with Ashtakuta analysis — assess harmony, longevity, and compatibility between two charts."
      icon="⚭"
    />
  );
}
