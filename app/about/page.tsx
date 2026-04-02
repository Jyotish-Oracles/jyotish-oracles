import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import Card from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "About — Sandeep V",
  description:
    "Computational Jyotishi, software engineer, and published author. Sandeep V applies the rigour of data science to the ancient astronomy of Jyotish.",
};

const products = [
  {
    name: "Sagar Ephemeris 2026",
    type: "Publication",
    description:
      "A precision astrological almanac cross-referenced against NASA/JPL planetary datasets and computed via Swiss Ephemeris. The only Jyotish ephemeris to systematically validate classical tables against modern astronomical data.",
  },
  {
    name: "Anuguna Tara Paddati",
    type: "Publication",
    description:
      "A research work on nakshatra-based compatibility methodology, reviving a classical system of stellar alignment largely absent from contemporary practice.",
  },
  {
    name: "Navya Mandala",
    type: "Application",
    description:
      "Vedic astrology application on Google Play featuring precise kundali charts, live Panchanga, and Vimshottari Dasha analysis — built on Swiss Ephemeris with Lahiri ayanamsa.",
    href: "https://sandeep.astromoola.com",
  },
  {
    name: "Tarot · Astromoola",
    type: "Application",
    description:
      "A synthesis of intuitive card wisdom and machine intelligence — AI-assisted tarot guidance with Vedic timing overlays.",
    href: "https://tarot.astromoola.com",
  },
  {
    name: "Stellar Manifestation",
    type: "Application",
    description:
      "Meditation application that pairs astrologically-elected soundscapes with intentional practice windows derived from PanchaPakshi Shastra.",
  },
  {
    name: "Astromoola Podcasts",
    type: "Media",
    description:
      "Long-form conversations on classical Jyotish, consciousness, and the mathematical underpinnings of cosmic cycles. Available on Spotify.",
  },
];

const credentials = [
  "Swiss Ephemeris · Lahiri Ayanamsa",
  "U.S. Patent — Intelligent API Proxy Design",
  "U.S. Patent — Distributed Cluster Monitoring",
  "Published Researcher · IEEE",
  "M.S. Ramaiah Institute of Technology",
  "8+ Years · Production Engineering",
];

const specializations = [
  "Natal Chart Analysis (D1\u2013D60)",
  "Garbhadhana Muhurtha",
  "Child Horoscopy & Samskara Timing",
  "Lakshmi Kataksha (Wealth Analysis)",
  "Name & Logo Astrology",
  "Watch Astrology",
  "PanchaPakshi Shastra",
  "Nakshatra & Pada Analysis",
  "Ashtakavarga Strength Mapping",
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-border-light bg-bg-warm">
        <Container className="py-10 md:py-16">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.15em] text-green">
            About
          </p>
          <h1 className="mb-4">Sandeep V</h1>
          <p className="max-w-[58ch] text-xl leading-relaxed text-text-secondary">
            Computational Jyotishi. Software engineer. Published author.
            Approaching the oldest astronomical science on earth with the
            discipline of a data scientist.
          </p>
        </Container>
      </div>

      <Container className="py-14 md:py-20">
        <div className="grid gap-14 lg:grid-cols-[1fr_300px]">
          {/* Main */}
          <div className="space-y-14">

            {/* Philosophy */}
            <section>
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.12em] text-green">
                Philosophy
              </p>
              <h2 className="mb-6 font-serif text-3xl font-semibold">
                Where Ancient Astronomy Meets Rigorous Computation
              </h2>
              <div className="space-y-5 text-[17px] leading-[1.85] text-text-secondary">
                <p>
                  Jyotish — the <em>science of light</em> — is not metaphor. It is a
                  mathematical system developed over millennia by astronomers who tracked
                  planetary cycles to a precision that rivals modern ephemerides. The
                  nakshatras are not symbols. They are 27 precise arcs of the ecliptic,
                  each 13°20′ wide, each with measurable correlations to lunar velocity,
                  tidal force, and biological rhythm. The grahas are not myths. They are
                  gravitational bodies whose positions relative to the earth at the moment
                  of birth encode the karmic signature of an incarnating soul.
                </p>
                <p>
                  I came to this science as an engineer — someone trained to ask for proof,
                  demand reproducibility, and distrust anecdote. What I found was not
                  superstition. What I found was a system of extraordinary depth, whose
                  predictions, when computed correctly and interpreted from classical
                  sources, hold with a consistency that no statistical coincidence can
                  explain.
                </p>
                <p>
                  The operative phrase is <em>computed correctly</em>. Most contemporary
                  Jyotish software introduces silent errors — tropical coordinates used in
                  sidereal calculations, incorrect ayanamsa selection, approximate planetary
                  algorithms. Every tool on this platform uses Swiss Ephemeris — the same
                  computational engine used by the Astronomical Almanac and JPL Horizons —
                  with strict Lahiri ayanamsa throughout. The calculations are not
                  approximate. They are exact.
                </p>
              </div>
            </section>

            {/* Background */}
            <section>
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.12em] text-green">
                Background
              </p>
              <h2 className="mb-6 font-serif text-3xl font-semibold">
                The Scientist Behind the Practice
              </h2>
              <div className="space-y-5 text-[17px] leading-[1.85] text-text-secondary">
                <p>
                  By profession, I am a senior software engineer with over eight years
                  building production infrastructure at scale. My technical work has been
                  recognised with two U.S. patents — one in intelligent API proxy design
                  systems, another in distributed cluster monitoring with self-healing
                  architecture. I have published in IEEE. I hold an engineering degree
                  from M.S. Ramaiah Institute of Technology.
                </p>
                <p>
                  That background shapes how I practise Jyotish in ways that are difficult
                  to overstate. I do not accept classical claims without verification. I
                  cross-reference predictions against empirical data. When I published the
                  <em> Sagar Ephemeris 2026</em>, I validated every planetary position
                  against NASA/JPL datasets before committing it to print — because an
                  ephemeris that is wrong, even by arc-minutes, compounds error across
                  every prediction made from it.
                </p>
                <p>
                  Jyotish deserves that standard. The people who come to this science in
                  their most vulnerable moments — facing health crises, navigating
                  marriages, planning for children — deserve a practitioner who does not
                  guess. I do not guess.
                </p>
              </div>
            </section>

            {/* Works */}
            <section>
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.12em] text-green">
                Works &amp; Publications
              </p>
              <h2 className="mb-6 font-serif text-3xl font-semibold">
                Research, Tools &amp; Platforms
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {products.map((p) => (
                  <Card key={p.name} variant="standard" className="!p-5">
                    <span className="mb-2 inline-block rounded bg-surface-alt px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-text-tertiary">
                      {p.type}
                    </span>
                    <h3 className="mb-2 font-serif text-base font-semibold text-text">
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
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.12em] text-green">
                Languages
              </p>
              <p className="text-[17px] text-text-secondary">
                English · Kannada · Telugu · Tamil · Hindi
              </p>
            </section>

          </div>

          {/* Sidebar */}
          <aside className="space-y-6">

            <Card variant="standard">
              <h3 className="mb-4 text-xs font-medium uppercase tracking-[0.12em] text-text-tertiary">
                Credentials
              </h3>
              <ul className="space-y-3">
                {credentials.map((c) => (
                  <li key={c} className="flex items-start gap-2.5 text-sm leading-snug text-text-secondary">
                    <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-accent" />
                    {c}
                  </li>
                ))}
              </ul>
            </Card>

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

            <Card variant="standard">
              <h3 className="mb-4 text-xs font-medium uppercase tracking-[0.12em] text-text-tertiary">
                Based In
              </h3>
              <p className="text-sm text-text-secondary">Bengaluru, Karnataka, India</p>
              <div className="mt-4 space-y-2">
                <a href="https://sandeep.astromoola.com" target="_blank" rel="noopener noreferrer"
                  className="block text-sm text-green no-underline hover:underline underline-offset-4">
                  astromoola.com ↗
                </a>
                <a href="https://www.linkedin.com/in/vsandeepnaidu/" target="_blank" rel="noopener noreferrer"
                  className="block text-sm text-green no-underline hover:underline underline-offset-4">
                  LinkedIn ↗
                </a>
              </div>
            </Card>

            <div className="rounded-2xl bg-dark p-6 text-text-on-dark">
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-green-light opacity-60">
                Consultations
              </p>
              <h3 className="mb-3 font-serif text-lg font-semibold leading-snug !text-text-on-dark">
                Work with Sandeep
              </h3>
              <p className="mb-5 text-sm leading-relaxed text-text-on-dark/60">
                Garbhadhana Muhurtha, Child Horoscopy, Lakshmi Kataksha,
                natal readings, and specialised consultations — conducted with
                the precision this science demands.
              </p>
              <a
                href="/services"
                className="inline-block rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-text-on-dark no-underline transition-opacity hover:opacity-90"
              >
                View services
              </a>
            </div>

          </aside>
        </div>
      </Container>
    </div>
  );
}
