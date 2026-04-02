import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import Card from "@/components/ui/Card";
import ScrollReveal from "@/components/ui/ScrollReveal";

const tools = [
  {
    icon: "\u2609", // Sun symbol
    title: "Kundali Generator",
    description:
      "Generate your birth chart with precise planetary positions, house placements, and nakshatra analysis.",
    href: "/tools/kundali",
    color: "text-accent",
  },
  {
    icon: "\u263D", // Moon symbol
    title: "Daily Panchang",
    description:
      "Tithi, nakshatra, yoga, karana — the complete Vedic almanac for any date, beautifully presented.",
    href: "/tools/panchang",
    color: "text-green",
  },
  {
    icon: "\u2666", // Diamond
    title: "PanchaPakshi",
    description:
      "Real-time bird state analysis and optimal timing recommendations based on the five-bird system.",
    href: "/tools/pakshi",
    color: "text-gold",
  },
];

export default function ToolsSection() {
  return (
    <Section variant="warm" ariaLabel="Astrology tools">
      <Container>
        <ScrollReveal>
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.12em] text-green">
            Precision Tools
          </p>
          <h2 className="mb-4">Instruments of Insight</h2>
          <p className="max-w-[55ch] text-lg text-text-secondary">
            Interactive Vedic astrology tools powered by Swiss Ephemeris — the gold standard in astronomical computation.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {tools.map((tool, i) => (
            <ScrollReveal key={tool.title} delay={i * 0.08}>
              <a href={tool.href} className="block no-underline">
                <Card variant="elevated" className="h-full">
                  <div className={`text-2xl ${tool.color} mb-4`} aria-hidden="true">
                    {tool.icon}
                  </div>
                  <h3 className="mb-2 font-serif text-xl font-semibold text-text">
                    {tool.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-text-secondary">
                    {tool.description}
                  </p>
                </Card>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
