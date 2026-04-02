import Card from "@/components/ui/Card";
import type { PanchangData } from "@/lib/astro/types";

interface Props {
  panchang: PanchangData;
}

export default function ChartPanchang({ panchang }: Props) {
  return (
    <div>
      <h3 className="mb-3 font-serif text-lg font-semibold">Panchang</h3>
      <Card variant="standard">
        <div className="space-y-3">
          <Row label="Tithi" value={`${panchang.tithi.paksha} ${panchang.tithi.name}`} />
          <Row label="Nakshatra" value={`${panchang.nakshatra.name} (Pada ${panchang.nakshatra.pada})`} />
          <Row label="Nakshatra Lord" value={panchang.nakshatra.lord} />
          <Row label="Yoga" value={panchang.yoga.name} />
          <Row label="Karana" value={panchang.karana.name} />
          <Row label="Moon Sign" value={panchang.moonSign} />
          <Row label="Sun Sign" value={panchang.sunSign} />
          <Row label="Weekday" value={panchang.weekday} />
        </div>
      </Card>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-text-secondary">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
