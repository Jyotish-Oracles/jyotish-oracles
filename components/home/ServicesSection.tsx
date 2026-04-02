import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import ScrollReveal from "@/components/ui/ScrollReveal";

const services = [
  {
    title: "Birth Chart Reading",
    description:
      "A comprehensive analysis of your natal chart — planetary positions, dashas, yogas, and practical guidance for the path ahead.",
    duration: "90 minutes",
    recommended: false,
  },
  {
    title: "Annual Forecast",
    description:
      "Year-ahead transit analysis covering career, relationships, health, and finances. Includes muhurta recommendations for key decisions.",
    duration: "60 minutes",
    recommended: true,
  },
  {
    title: "Specific Question",
    description:
      "Focused consultation on a specific life area — career transition, relationship, relocation, or timing a major decision.",
    duration: "45 minutes",
    recommended: false,
  },
];

export default function ServicesSection() {
  return (
    <Section variant="light" ariaLabel="Consultation services">
      <Container>
        <ScrollReveal>
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.12em] text-green">
            Consultations
          </p>
          <h2 className="mb-4">Personalized Guidance</h2>
          <p className="max-w-[55ch] text-lg text-text-secondary">
            One-on-one Vedic astrology consultations tailored to your unique celestial blueprint.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {services.map((service, i) => (
            <ScrollReveal key={service.title} delay={i * 0.08}>
              <Card
                variant={service.recommended ? "elevated" : "standard"}
                className={`relative h-full flex flex-col ${
                  service.recommended ? "ring-2 ring-accent/20" : ""
                }`}
              >
                {service.recommended && (
                  <span className="absolute -top-3 left-6 rounded-full bg-accent px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
                    Recommended
                  </span>
                )}
                <h3 className="mb-2 font-serif text-xl font-semibold text-text">
                  {service.title}
                </h3>
                <p className="mb-4 flex-1 text-sm leading-relaxed text-text-secondary">
                  {service.description}
                </p>
                <div className="mb-4 text-xs font-medium uppercase tracking-wider text-text-tertiary">
                  {service.duration}
                </div>
                <Button
                  variant={service.recommended ? "primary" : "secondary"}
                  href="/contact"
                  className="w-full"
                >
                  Book Now
                </Button>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
