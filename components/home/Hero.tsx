import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import TodaysSkyCard from "./TodaysSkyCard";
import HeroAnimations from "./HeroAnimations";
import type { PanchangData } from "@/lib/astro/types";

interface Props {
  panchang: PanchangData | null;
  cityName: string;
}

export default function Hero({ panchang, cityName }: Props) {
  return (
    <section className="relative min-h-[min(90vh,800px)] flex items-center" aria-label="Hero">
      <Container className="py-16 md:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Text — 7 columns (golden ratio approx) */}
          <HeroAnimations className="lg:col-span-7">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.12em] text-green">
              Vedic Astrology
            </p>
            <h1 className="mb-5 max-w-[14ch]">
              The Science of Light
            </h1>
            <p className="mb-8 max-w-[50ch] text-lg leading-relaxed text-text-secondary">
              Consultations and precision tools rooted in millennia of celestial observation.
              Understand your chart. Align with the cosmos.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary" href="/services">
                Book a Reading
              </Button>
              <Button variant="secondary" href="/tools">
                Explore Tools
              </Button>
            </div>
          </HeroAnimations>

          {/* Feature card — 5 columns */}
          <div className="flex justify-center lg:col-span-5 lg:justify-end">
            <HeroAnimations delay={0.2}>
              <TodaysSkyCard panchang={panchang} cityName={cityName} />
            </HeroAnimations>
          </div>
        </div>
      </Container>
    </section>
  );
}
