import type { Metadata } from "next";
import ComingSoon from "@/components/ui/ComingSoon";

export const metadata: Metadata = {
  title: "PanchaPakshi",
  description: "Real-time bird state analysis and optimal timing based on the classical five-bird system.",
};

export default function PakshiPage() {
  return (
    <ComingSoon
      title="PanchaPakshi"
      description="Real-time bird state analysis and optimal timing recommendations based on the classical five-bird system."
      icon="◆"
    />
  );
}
