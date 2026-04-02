import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import Card from "@/components/ui/Card";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tools",
  description:
    "Interactive Vedic astrology tools powered by Swiss Ephemeris — kundali, panchang, transits, and more.",
};

const tools = [
  {
    icon: "♃",
    title: "Planetary Transits",
    description:
      "Visualize when planets move through signs, nakshatras, and padas with an interactive swim-lane timeline. Aspects, stations, and combustion events included.",
    href: "/tools/transits",
    color: "text-gold",
    status: "live" as const,
  },
  {
    icon: "☉",
    title: "Kundali Generator",
    description:
      "Generate a birth chart with precise planetary positions, house placements, divisional charts, and full nakshatra analysis.",
    href: "/tools/kundali",
    color: "text-accent",
    status: "soon" as const,
  },
  {
    icon: "☽",
    title: "Daily Panchang",
    description:
      "Tithi, nakshatra, yoga, karana — the complete Vedic almanac for any date and location, beautifully presented.",
    href: "/tools/panchang",
    color: "text-green",
    status: "soon" as const,
  },
  {
    icon: "◆",
    title: "PanchaPakshi",
    description:
      "Real-time bird state analysis and optimal timing recommendations based on the classical five-bird system.",
    href: "/tools/pakshi",
    color: "text-green-dark",
    status: "soon" as const,
  },
  {
    icon: "⟳",
    title: "Dasha Timeline",
    description:
      "Vimshottari dasha calculator with interactive timeline — major periods, sub-periods, and antardasha laid out visually.",
    href: "/tools/dasha",
    color: "text-accent",
    status: "soon" as const,
  },
  {
    icon: "✦",
    title: "Muhurta Finder",
    description:
      "Find auspicious windows for marriage, travel, business, and other life events using classical Vedic timing principles.",
    href: "/tools/muhurta",
    color: "text-gold",
    status: "soon" as const,
  },
  {
    icon: "⊞",
    title: "Ashtakavarga",
    description:
      "Compute bindu scores for each planet across all signs. Identify strong and weak transits with precision.",
    href: "/tools/ashtakavarga",
    color: "text-green",
    status: "soon" as const,
  },
  {
    icon: "⚭",
    title: "Compatibility",
    description:
      "Kundali matching with Ashtakuta analysis — assess harmony, longevity, and compatibility between two charts.",
    href: "/tools/compatibility",
    color: "text-green-dark",
    status: "soon" as const,
  },
];

export default function ToolsPage() {
  return (
    <div className="min-h-screen">
      <div className="border-b border-border-light bg-bg-warm">
        <Container className="py-8 md:py-12">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.12em] text-green">
            Precision Tools
          </p>
          <h1 className="mb-2">Instruments of Insight</h1>
          <p className="max-w-[55ch] text-lg text-text-secondary">
            Interactive Vedic astrology tools powered by Swiss Ephemeris — the
            gold standard in astronomical computation.
          </p>
        </Container>
      </div>

      <Container className="py-12 md:py-16">
        <div className="grid gap-6 sm:grid-cols-2">
          {tools.map((tool, i) => (
            <ScrollReveal key={tool.title} delay={i * 0.06}>
              {tool.status === "live" ? (
                <Link href={tool.href} className="block no-underline">
                  <Card variant="elevated" className="h-full">
                    <div className="mb-4 flex items-start justify-between">
                      <div className={`text-2xl ${tool.color}`} aria-hidden="true">
                        {tool.icon}
                      </div>
                      <span className="rounded-full bg-green/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-green">
                        Live
                      </span>
                    </div>
                    <h2 className="mb-2 font-serif text-xl font-semibold text-text">
                      {tool.title}
                    </h2>
                    <p className="text-sm leading-relaxed text-text-secondary">
                      {tool.description}
                    </p>
                  </Card>
                </Link>
              ) : (
                <Link href={tool.href} className="block no-underline">
                  <Card variant="elevated" className="h-full opacity-70 hover:opacity-90">
                    <div className="mb-4 flex items-start justify-between">
                      <div className={`text-2xl ${tool.color}`} aria-hidden="true">
                        {tool.icon}
                      </div>
                      <span className="rounded-full bg-surface-alt px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-text-tertiary">
                        Coming Soon
                      </span>
                    </div>
                    <h2 className="mb-2 font-serif text-xl font-semibold text-text">
                      {tool.title}
                    </h2>
                    <p className="text-sm leading-relaxed text-text-secondary">
                      {tool.description}
                    </p>
                  </Card>
                </Link>
              )}
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </div>
  );
}
