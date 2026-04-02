import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Child Horoscopy",
  description:
    "A fixed-format Vedic reading for newborns — life timelines, ashtakarma milestones, lucky symbols, deity recommendations, and cosmic guidance for the early years.",
};

export default function ChildHoroscopyPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-border-light bg-bg-warm">
        <Container className="py-10 md:py-16">
          <Link
            href="/services"
            className="mb-4 inline-flex items-center gap-1.5 text-sm text-text-tertiary no-underline hover:text-green"
          >
            ← All Services
          </Link>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            Signature Service
          </p>
          <h1 className="mb-2 font-serif text-4xl font-semibold md:text-5xl">
            Child Horoscopy
          </h1>
          <p className="font-serif text-xl italic text-text-secondary">
            A Cosmic Blueprint for the Early Years
          </p>
        </Container>
      </div>

      {/* Body */}
      <div className="border-b border-border-light bg-surface">
        <Container className="py-16 md:py-24">
          <div className="grid gap-14 lg:grid-cols-[1fr_340px]">
            {/* Body copy */}
            <div className="space-y-7 text-[17px] leading-[1.9] text-text-secondary">
              <p>
                The moment a child draws its first breath, the sky stamps a signature
                onto its life. The rising lagna, the Moon&rsquo;s nakshatra, the
                disposition of the nine grahas across the twelve bhavas — all of it
                crystallises in that instant into a chart that encodes the child&rsquo;s
                temperament, constitution, innate talents, and the rhythmic unfolding
                of life events through the Dasha system. This is not prediction. It is
                pattern recognition, refined over three thousand years of observation.
              </p>

              <p>
                The Child Horoscopy is designed for parents who want to understand
                this pattern early — not to answer questions or explore speculative
                possibilities, but to receive a structured, research-based reading
                that maps the child&rsquo;s first years with precision and provides
                actionable guidance for nurturing the child in alignment with its
                cosmic constitution.
              </p>

              <blockquote className="border-l-2 border-green pl-6 py-1">
                <p className="font-serif text-xl italic leading-relaxed text-text">
                  &ldquo;The nakshatra under which a child is born shapes the grain
                  of its nature — the deity that presides, the element that governs,
                  the qualities that will surface naturally if nurtured with
                  awareness.&rdquo;
                </p>
                <cite className="mt-3 block text-sm not-italic text-text-tertiary">
                  — Classical principle, Brihat Samhita
                </cite>
              </blockquote>

              <h3 className="font-serif text-2xl font-semibold text-text">
                A Fixed Reading — Not a Questions Session
              </h3>

              <p>
                This consultation is fundamentally different from other services. It
                is a <strong>fixed-format deliverable</strong> — a structured document
                prepared through careful chart analysis, not an interactive
                question-and-answer session. There are no questions to bring. The
                reading covers a defined scope, and its value lies in the completeness
                and depth of what is delivered, not in ad-hoc enquiry.
              </p>

              <p>
                The reason is simple: a child&rsquo;s chart at birth is a seed. The
                meaningful work is not to interrogate it with anxious questions about
                the future, but to understand its inherent design — its strengths, its
                sensitivities, its timing — and to create the conditions for it to
                unfold well. That is what this reading provides.
              </p>

              <h3 className="font-serif text-2xl font-semibold text-text">
                What the Reading Covers
              </h3>

              <p>
                The Child Horoscopy is structured around two pillars: <em>timelines</em>
                {" "}and <em>cosmic guidance</em> for instilling positive energies
                during the formative years.
              </p>

              <ul className="space-y-4 pl-0">
                {[
                  {
                    title: "Life Timelines — First Five Years",
                    body: "A month-by-month and year-by-year mapping of the child\u2019s early developmental phases as indicated by the Dasha system and transit patterns. Key periods of growth, sensitivity, health considerations, and temperamental shifts are identified so parents can anticipate and support rather than react."
                  },
                  {
                    title: "Ashtakarma Milestone Timelines",
                    body: "Approximate timings for the principal samskaras from birth through Vidyabhyasa (the commencement of formal education) — Namakarana (naming), Nishkramana (first outing), Annaprashana (first feeding), Chudakarana (first haircut), Karnavedha (ear piercing), and Vidyarambha/Vidyabhyasa (beginning of learning). Each timing is derived from the child\u2019s chart, not from generic calendrical rules."
                  },
                  {
                    title: "Lucky Symbols, Elements & Colors",
                    body: "Based on the Janma Nakshatra, lagna lord, and the strongest planetary influences in the chart, a set of auspicious symbols, elements, colors, and materials are identified. These are not superstitions — they are resonance markers derived from the chart\u2019s planetary signatures. Surrounding the child with these influences during the early years reinforces the positive cosmic energies encoded in the birth moment."
                  },
                  {
                    title: "Deity & Mantra Recommendations",
                    body: "The presiding deity of the Janma Nakshatra, the Ishta Devata derived from the Atmakaraka and the Navamsa, and specific mantras suited for the child\u2019s spiritual constitution are identified. Parents are guided on which deity worship to instill in the household to create a protective and elevating spiritual atmosphere around the child."
                  },
                  {
                    title: "Favorable Foods & Dietary Notes",
                    body: "Classical Jyotish and Ayurvedic correlations between planetary constitutions and dietary preferences are used to suggest foods that support the child\u2019s elemental balance — strengthening weak planets, calming aggravated ones, and nurturing the child\u2019s overall prakriti during the critical early years."
                  },
                  {
                    title: "Things to Avoid",
                    body: "Equally important as what to embrace is what to be cautious of. Based on the chart\u2019s afflictions, specific planetary sensitivities, and the Dasha periods active in early childhood, guidance is provided on environments, influences, timing of certain activities, and exposures that are best avoided or handled with extra care."
                  }
                ].map((item) => (
                  <li key={item.title} className="flex gap-4">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                    <div>
                      <strong className="block font-serif text-[17px] font-semibold text-text">
                        {item.title}
                      </strong>
                      <span className="text-[16px] leading-relaxed text-text-secondary">
                        {item.body}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>

              <h3 className="font-serif text-2xl font-semibold text-text">
                The Purpose Behind This Reading
              </h3>

              <p>
                Every tradition that has survived millennia understood something that
                modern parenting culture has forgotten: the early years are not neutral.
                They are a window of extraordinary receptivity. The sounds, symbols,
                colors, foods, and spiritual practices a child is exposed to in the
                first years of life create grooves — <em>samskaras</em> — that shape
                the trajectory of the entire life.
              </p>

              <p>
                This reading gives parents a research-backed, chart-specific guide
                to making those early choices with cosmic awareness rather than
                guesswork. It is not about controlling the child&rsquo;s destiny. It
                is about understanding the seed that has arrived and providing the
                soil, light, and nourishment that allows it to become what it was
                always meant to be.
              </p>

              <p className="text-[16px] italic text-text-tertiary">
                This is a fixed-format reading. No questions session is included.
                The deliverable is a comprehensive written document covering all
                areas described above, prepared from the child&rsquo;s precise birth
                data (date, time, and place of birth).
              </p>
            </div>

            {/* Sidebar CTA */}
            <aside className="space-y-6">
              <div className="sticky top-24 space-y-5">
                <div className="rounded-2xl bg-dark p-7 text-text-on-dark">
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-accent opacity-80">
                    Signature Service
                  </p>
                  <h3 className="mb-4 font-serif text-2xl font-semibold leading-snug !text-text-on-dark">
                    Child Horoscopy
                  </h3>
                  <ul className="mb-6 space-y-3 text-sm text-text-on-dark/70">
                    {[
                      "Fixed-format life timeline (0\u20135 years)",
                      "Ashtakarma milestone timing",
                      "Lucky symbols & elements",
                      "Deity & mantra recommendations",
                      "Colors, foods & favorable items",
                      "Things to avoid",
                    ].map((f) => (
                      <li key={f} className="flex items-center gap-2.5">
                        <span className="h-1 w-1 flex-shrink-0 rounded-full bg-green-light opacity-60" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact"
                    className="block w-full rounded-lg bg-accent py-3 text-center text-sm font-semibold text-white no-underline transition-opacity hover:opacity-90"
                  >
                    Enquire about this service
                  </Link>
                </div>

                <p className="text-center text-xs text-text-tertiary">
                  No questions session. Fixed-format reading only.
                </p>
              </div>
            </aside>
          </div>
        </Container>
      </div>
    </div>
  );
}
