import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import Card from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "About",
  description:
    "Sandeep V — Vedic astrologer, software engineer, and author. Creator of Navya Mandala, Sagar Ephemeris, and JyotishOracles.",
};

const products = [
  {
    name: "Navya Mandala",
    type: "Application",
    description:
      "Vedic astrology app on Google Play with kundali charts, Panchanga, and Dasha analysis.",
  },
  {
    name: "Sagar Ephemeris 2026",
    type: "Book",
    description:
      "Published astrological almanac combining classical Jyotisha with NASA/JPL datasets and Swiss Ephemeris precision.",
  },
  {
    name: "Tarot · Astromoola",
    type: "Application",
    description:
      "AI-powered tarot guidance blending machine intelligence with intuitive card interpretation.",
    href: "https://tarot.astromoola.com",
  },
  {
    name: "Stellar Manifestation",
    type: "Application",
    description:
      "Meditation app combining Vedic astrological timing with curated soundscapes for intentional practice.",
  },
  {
    name: "PanchaPakshi",
    type: "Tool",
    description:
      "Biorhythm-based timing method with real-time bird state analysis, integrated with AI for interpretation.",
  },
  {
    name: "Astromoola Podcasts",
    type: "Media",
    description:
      "Conversations on astrology, spirituality, and conscious living — available on Spotify.",
  },
];

const specializations = [
  "Vedic Astrology (Jyotish)",
  "Astrological Timing & Muhurtha",
  "Tarot Interpretation",
  "Manifestation & Meditation",
  "Divisional Charts & Dashas",
  "PanchaPakshi Shastra",
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-border-light bg-bg-warm">
        <Container className="py-8 md:py-12">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.12em] text-green">
            About
          </p>
          <h1 className="mb-2">Sandeep V</h1>
          <p className="max-w-[55ch] text-lg text-text-secondary">
            An explorer of the mystical and a software developer by profession —
            bridging the ancient science of Jyotish with modern computation.
          </p>
        </Container>
      </div>

      <Container className="py-12 md:py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
          {/* Main content */}
          <div className="space-y-12">
            {/* Bio */}
            <section>
              <h2 className="mb-5 font-serif text-2xl font-semibold">The Practice</h2>
              <div className="space-y-4 text-base leading-relaxed text-text-secondary">
                <p>
                  My path into Jyotish began where most serious students begin — with the
                  realisation that the sky is not decorative but functional, a living
                  language written in the positions of planets against the backdrop of
                  nakshatras and rashis. Over years of study and personal observation, I
                  have developed a practice grounded in classical texts while informed by
                  precise computational tools.
                </p>
                <p>
                  As a software engineer with over eight years of professional experience,
                  I approach astrology the same way I approach code — with discipline,
                  reproducibility, and a deep respect for source material. Every tool on
                  this platform is built on Swiss Ephemeris with Lahiri ayanamsa, the same
                  dataset that professional-grade astronomical software uses.
                </p>
                <p>
                  I hold degrees from M.S. Ramaiah Institute of Technology and have
                  published research in IEEE. My technical work spans distributed systems,
                  intelligent API design (U.S. patent), and distributed monitoring
                  infrastructure (U.S. patent). That same rigour shapes how I build
                  astrological software — precision is not optional.
                </p>
              </div>
            </section>

            {/* Products */}
            <section>
              <h2 className="mb-5 font-serif text-2xl font-semibold">
                Works &amp; Publications
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {products.map((p) => (
                  <Card key={p.name} variant="standard" className="!p-5">
                    <div className="mb-1 flex items-center gap-2">
                      <span className="rounded bg-surface-alt px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-text-tertiary">
                        {p.type}
                      </span>
                    </div>
                    <h3 className="mb-1.5 font-serif text-base font-semibold text-text">
                      {p.href ? (
                        <a
                          href={p.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-text no-underline hover:text-green"
                        >
                          {p.name} ↗
                        </a>
                      ) : (
                        p.name
                      )}
                    </h3>
                    <p className="text-sm leading-relaxed text-text-secondary">
                      {p.description}
                    </p>
                  </Card>
                ))}
              </div>
            </section>

            {/* Languages */}
            <section>
              <h2 className="mb-4 font-serif text-2xl font-semibold">Languages</h2>
              <p className="text-base text-text-secondary">
                English, Kannada, Telugu, Tamil, Hindi
              </p>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            {/* Specializations */}
            <Card variant="standard">
              <h3 className="mb-4 text-xs font-medium uppercase tracking-[0.12em] text-text-tertiary">
                Specialisations
              </h3>
              <ul className="space-y-2.5">
                {specializations.map((s) => (
                  <li key={s} className="flex items-center gap-2.5 text-sm text-text-secondary">
                    <span className="h-1 w-1 flex-shrink-0 rounded-full bg-green" />
                    {s}
                  </li>
                ))}
              </ul>
            </Card>

            {/* Location */}
            <Card variant="standard">
              <h3 className="mb-4 text-xs font-medium uppercase tracking-[0.12em] text-text-tertiary">
                Based In
              </h3>
              <p className="text-sm text-text-secondary">Bengaluru, Karnataka, India</p>
            </Card>

            {/* Connect */}
            <Card variant="standard">
              <h3 className="mb-4 text-xs font-medium uppercase tracking-[0.12em] text-text-tertiary">
                Connect
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="https://sandeep.astromoola.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-green no-underline hover:underline underline-offset-4"
                  >
                    astromoola.com ↗
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/vsandeepnaidu/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-green no-underline hover:underline underline-offset-4"
                  >
                    LinkedIn ↗
                  </a>
                </li>
              </ul>
            </Card>

            {/* Book */}
            <div className="rounded-2xl bg-dark p-6 text-text-on-dark">
              <p className="mb-1 text-xs font-medium uppercase tracking-[0.12em] text-green-light opacity-70">
                Consultations
              </p>
              <h3 className="mb-3 font-serif text-lg font-semibold">
                Book a Reading
              </h3>
              <p className="mb-4 text-sm leading-relaxed text-text-on-dark/60">
                Personal birth chart readings, annual forecasts, muhurta selection,
                and compatibility analysis.
              </p>
              <a
                href="/contact"
                className="inline-block rounded-lg bg-green px-4 py-2 text-sm font-medium text-white no-underline transition-opacity hover:opacity-90"
              >
                Get in touch
              </a>
            </div>
          </aside>
        </div>
      </Container>
    </div>
  );
}
