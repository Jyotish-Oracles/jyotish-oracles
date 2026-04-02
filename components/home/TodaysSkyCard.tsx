import Card from "@/components/ui/Card";
import Skeleton from "@/components/ui/Skeleton";
import type { PanchangData } from "@/lib/astro/types";

interface Props {
  panchang: PanchangData | null;
  cityName: string;
}

export default function TodaysSkyCard({ panchang, cityName }: Props) {
  if (!panchang) {
    return (
      <Card variant="dark" className="min-w-[240px] max-w-[300px]">
        <div className="space-y-3 p-2">
          <Skeleton className="mx-auto h-8 w-8 rounded-full !bg-dark-border" />
          <Skeleton className="mx-auto h-4 w-24 !bg-dark-border" />
          <Skeleton className="mx-auto h-6 w-32 !bg-dark-border" />
          <Skeleton className="h-3 w-full !bg-dark-border" />
          <Skeleton className="h-3 w-full !bg-dark-border" />
          <Skeleton className="h-3 w-full !bg-dark-border" />
        </div>
      </Card>
    );
  }

  return (
    <Card variant="dark" className="min-w-[240px] max-w-[300px]">
      <div className="mb-4 text-center text-3xl" aria-hidden="true">
        &#x263D;
      </div>
      <div className="mb-1 text-center text-[11px] font-medium uppercase tracking-[0.12em] text-text-on-dark/50">
        Today&apos;s Sky &middot; {cityName}
      </div>
      <div className="text-center font-serif text-xl font-semibold text-gold">
        {panchang.nakshatra.name}
      </div>
      <div className="mt-1 text-center text-xs text-text-on-dark/50">
        Pada {panchang.nakshatra.pada} &middot; {panchang.moonSign}
      </div>

      <div className="mt-5 space-y-2.5 border-t border-dark-border pt-4">
        <Row label="Tithi" value={`${panchang.tithi.paksha} ${panchang.tithi.name}`} />
        <Row label="Yoga" value={panchang.yoga.name} />
        <Row label="Karana" value={panchang.karana.name} />
        <Row label="Weekday" value={panchang.weekday} />
      </div>
    </Card>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-text-on-dark/40">{label}</span>
      <span className="font-medium text-text-on-dark/80">{value}</span>
    </div>
  );
}
