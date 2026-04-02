import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Vedic astrology consultations — natal readings, Garbhadhana Muhurtha, annual forecasts, electional astrology, and compatibility analysis.",
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-border-light bg-bg-warm">
        <Container className="py-10 md:py-16">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.15em] text-green">
            Services
          </p>
          <h1 className="mb-4">Consultations</h1>
          <p className="max-w-[55ch] text-xl leading-relaxed text-text-secondary">
            Each consultation is a research exercise — systematic, precise, and
            rooted in classical sources. No templates. No generic interpretations.
          </p>
        </Container>
      </div>

      {/* === GARBHADHANA — HERO SERVICE === */}
      <div className="border-b border-border-light bg-surface">
        <Container className="py-16 md:py-24">

          {/* Kicker */}
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            Signature Service
          </p>

          {/* Title */}
          <h2 className="mb-2 font-serif text-4xl font-semibold md:text-5xl">
            Garbhadhana Muhurtha
          </h2>
          <p className="mb-10 font-serif text-xl italic text-text-secondary">
            Vedic Alignment of Conscious Conception
          </p>

          <div className="grid gap-14 lg:grid-cols-[1fr_340px]">
            {/* Body copy */}
            <div className="space-y-7 text-[17px] leading-[1.9] text-text-secondary">

              <p>
                In the Vedic worldview, a child is not born — a soul <em>arrives</em>.
                It arrives carrying karma accumulated across lifetimes, seeking parents
                whose chart signatures provide the karmic field it needs to fulfill its
                dharma. What determines which soul answers the call of a given union,
                at a given moment? The answer, encoded in classical texts from the
                Rigveda to the Charaka Samhita, is cosmic timing — the precise
                configuration of the sky at the moment of conception.
              </p>

              {/* Pull quote */}
              <blockquote className="border-l-2 border-green pl-6 py-1">
                <p className="font-serif text-xl italic leading-relaxed text-text">
                  &ldquo;The mental condition of a child depends upon the mental status
                  of his parents at the time he is conceived. According to the Vedic
                  system, therefore, the Garbhadhana-samskara is observed.&rdquo;
                </p>
                <cite className="mt-3 block text-sm not-italic text-text-tertiary">
                  — Srila Prabhupada, commentary on Śrīmad-Bhāgavatam
                </cite>
              </blockquote>

              <h3 className="font-serif text-2xl font-semibold text-text">
                A Practice Abandoned — and Why It Matters
              </h3>

              <p>
                For most of recorded human history, the union of a man and woman for
                the purpose of creating a child was treated as the most consequential
                act a family could perform. Across ancient India, the <em>Garbhadhana
                Samskara</em> — the first of the sixteen sacred rites of passage — was
                observed with the same seriousness as a marriage or coronation. An
                astrologer would analyse both partners&rsquo; charts, identify the
                window of days when planetary forces aligned favourably with their
                combined karma, and elect the precise moment — down to the muhurtha —
                when the act of conception should take place.
              </p>

              <p>
                The classical texts — the <em>Atharva Veda</em>, the <em>Sushruta
                Samhita</em>, the <em>Charaka Samhita</em>, the <em>Grhya Sutras</em>
                — devoted entire chapters to this science. They specified which
                nakshatras support healthy conception, which tithis strengthen the
                child&rsquo;s intellect, which planetary dignities in the elected
                moment protect against illness and temperamental imbalance in the
                child. The nakshatra rising at the elected muhurtha would become the
                child&rsquo;s Janma Nakshatra. The lagna of that moment would shape
                the child&rsquo;s ascendant and the fundamental architecture of their
                chart.
              </p>

              <p>
                Think of it as the difference between planting a seed on any random
                day and planting it in the optimal season, in prepared soil, under
                the right conditions. The seed — the soul — is the same. But what it
                becomes is shaped profoundly by the conditions of its arrival.
              </p>

              <h3 className="font-serif text-2xl font-semibold text-text">
                What Modern Life Has Cost Us
              </h3>

              <p>
                This practice vanished gradually — eroded by urbanisation, by the
                medicalisation of reproduction, by a cultural amnesia that came with
                colonial disruption of indigenous knowledge systems. Today, conception
                is something that simply happens — unplanned, untimed, unguided by
                any understanding of the cosmic forces active at that moment.
              </p>

              <p>
                The consequences are not invisible. We are living through a generation
                of children with unprecedented rates of anxiety, developmental
                challenges, autoimmune conditions, and a pervasive sense of
                disconnection from purpose. Modern epigenetic research — published
                in journals from <em>Nature</em> to the <em>Journal of Indian Medical
                Heritage</em> — now confirms what the ancient Ayurvedic physicians
                wrote in the Charaka Samhita: the mental, emotional, and physical
                state of both parents at the moment of conception has measurable
                effects on gene expression, foetal development, and the temperament
                of the child. The science is not metaphysical. It is biochemical.
                And the Vedic rishis understood it three thousand years before the
                invention of the microscope.
              </p>

              <blockquote className="border-l-2 border-green pl-6 py-1">
                <p className="font-serif text-xl italic leading-relaxed text-text">
                  &ldquo;Garbha Saṃskāra is an ancient Indian practice rooted in
                  Vedic literature that emphasized antenatal care through physical,
                  mental, and spiritual wellness to promote optimal development of
                  the fetus and mother.&rdquo;
                </p>
                <cite className="mt-3 block text-sm not-italic text-text-tertiary">
                  — Scoping Review, Journal of Indian Medical Heritage, 2024
                </cite>
              </blockquote>

              <h3 className="font-serif text-2xl font-semibold text-text">
                What This Consultation Includes
              </h3>

              <p>
                The Garbhadhana Muhurtha consultation is an intensive, multi-stage
                process. It is not a single session. It is a collaboration.
              </p>

              <ul className="space-y-4 pl-0">
                {[
                  {
                    title: "Deep Analysis of Both Charts",
                    body: "The natal charts of both partners are examined in full — the 5th house (children and purva punya), the 7th (partnership), the Saptamsa (D7, the divisional chart of progeny), Jupiter's placement and dignity, and the condition of the Moon in both charts. Karmic strengths, doshas affecting fertility, and timing windows from Dasha periods are all mapped."
                  },
                  {
                    title: "Election of Auspicious Muhurthas",
                    body: "Drawing on classical Muhurtha Shastra, a series of optimal windows are identified — specific dates and time brackets where the Panchanga (Tithi, Vara, Nakshatra, Yoga, Karana), the rising lagna, and the Moon's position align to invite a soul of high vibration. Nakshatras such as Rohini, Pushya, Uttara Phalguni, and Shravana are analysed for their suitability in both partners' charts."
                  },
                  {
                    title: "Remedial Measures",
                    body: "Where karmic obstacles are identified — planetary afflictions to the 5th house, Rahu-Ketu axis involvement, Saturn or Mars afflicting the Moon — specific remedies are prescribed. These span the classical spectrum: Vedic mantras and pujas for invocation of Santana Gopala and Prajapati; Ayurvedic Garbha Samskara preparatory practices; practical lifestyle adjustments to align both partners' nervous systems with the elected moment."
                  },
                  {
                    title: "Guidance on Preparation",
                    body: "The weeks leading to an elected muhurtha are as important as the moment itself. Classical texts specify mental, dietary, and spiritual preparation for both partners. This guidance — tailored to your specific charts — is provided as part of the consultation."
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

              <p className="text-[16px] italic text-text-tertiary">
                This consultation is offered to couples who approach the creation of a
                child as the most sacred act of their lives. It requires commitment,
                preparation, and a willingness to surrender to cosmic timing. The
                results, for those who have followed this path, speak for themselves.
              </p>

            </div>

            {/* Sidebar CTA */}
            <aside className="space-y-6">
              <div className="sticky top-24 space-y-5">
                <div className="rounded-2xl bg-dark p-7 text-text-on-dark">
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-accent opacity-80">
                    Signature Service
                  </p>
                  <h3 className="mb-4 font-serif text-2xl font-semibold leading-snug">
                    Garbhadhana Muhurtha
                  </h3>
                  <ul className="mb-6 space-y-3 text-sm text-text-on-dark/70">
                    {[
                      "Analysis of both partner charts",
                      "Saptamsa (D7) progeny analysis",
                      "Multiple elected muhurtha windows",
                      "Remedies — mantra, puja & practical",
                      "Pre-conception preparation guide",
                      "Follow-up support included",
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
                  This service is offered by consultation only. Limited availability.
                </p>
              </div>
            </aside>
          </div>
        </Container>
      </div>

      {/* === OTHER SERVICES === */}
      <Container className="py-16 md:py-20">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.12em] text-green">
          Further Consultations
        </p>
        <h2 className="mb-12 font-serif text-3xl font-semibold">
          Other Services
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              id: "birth-chart",
              icon: "☉",
              title: "Natal Chart Reading",
              subtitle: "Full Birth Chart Analysis",
              description:
                "A systematic examination of your chart across multiple divisional charts — D1 through D60. Planetary dignities, Dasha periods, yogas, and karmic indicators are interpreted to give a precise map of your life&rsquo;s design, challenges, and latent strengths.",
              features: ["D1 through D9 analysis", "Current Dasha interpretation", "Karmic patterns & past life indicators", "Written report included"],
            },
            {
              id: "annual",
              icon: "◎",
              title: "Annual Forecast",
              subtitle: "Varshaphala & Transit Analysis",
              description:
                "A forward-looking consultation combining Varshaphala (Solar Return), Ashtakavarga transit strength, and Dasha-Antardasha timing to map the key themes, opportunities, and cautions of the coming twelve months.",
              features: ["Month-by-month timing windows", "Ashtakavarga transit scores", "Dasha & Antardasha mapping", "Favourable periods highlighted"],
            },
            {
              id: "muhurta",
              icon: "✦",
              title: "Muhurtha Selection",
              subtitle: "Electional Astrology",
              description:
                "For marriages, business launches, property purchases, surgeries, or any significant undertaking — an auspicious moment elected by systematic analysis of Panchanga, Lagna strength, and natal chart compatibility.",
              features: ["Panchanga analysis", "Lagna election", "Natal chart integration", "Multiple options provided"],
            },
            {
              id: "compatibility",
              icon: "⚭",
              title: "Compatibility Analysis",
              subtitle: "Synastry & Ashtakuta",
              description:
                "A full Kundali Milan using Ashtakuta scoring alongside planetary synastry — examining the interplay of Moons, Venus, Mars, and the 7th house across both charts for a nuanced picture of partnership potential.",
              features: ["Ashtakuta scoring", "Planetary synastry", "Dosha analysis & remedies", "Long-term compatibility map"],
            },
            {
              id: "dasha",
              icon: "⟳",
              title: "Dasha Consultation",
              subtitle: "Planetary Period Analysis",
              description:
                "A focused consultation on the Dasha period you are currently navigating — its themes, its demands, and how to work with its planetary energy rather than against it. Particularly useful during challenging Mahadasha transitions.",
              features: ["Current Mahadasha analysis", "Antardasha breakdown", "Practical guidance", "Remedial recommendations"],
            },
            {
              id: "prashna",
              icon: "?",
              title: "Prashna (Horary)",
              subtitle: "Question-Based Reading",
              description:
                "When a specific question demands a specific answer — the classical Prashna chart, cast for the exact moment the question is posed, reveals the answer encoded in the sky at that instant. Direct, precise, actionable.",
              features: ["Instant clarity on specific questions", "No birth data required", "Classical Prashna methodology", "Written analysis provided"],
            },
          ].map((s) => (
            <div
              key={s.id}
              id={s.id}
              className="group rounded-2xl border border-border-light bg-white p-7 transition-shadow hover:shadow-md"
            >
              <div className="mb-4 text-2xl text-green" aria-hidden="true">
                {s.icon}
              </div>
              <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-wider text-text-tertiary">
                {s.subtitle}
              </p>
              <h3 className="mb-3 font-serif text-xl font-semibold text-text">
                {s.title}
              </h3>
              <p
                className="mb-5 text-sm leading-relaxed text-text-secondary"
                dangerouslySetInnerHTML={{ __html: s.description }}
              />
              <ul className="mb-6 space-y-2">
                {s.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-text-secondary">
                    <span className="h-1 w-1 flex-shrink-0 rounded-full bg-green" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="text-sm font-medium text-green no-underline underline-offset-4 hover:underline"
              >
                Enquire →
              </Link>
            </div>
          ))}
        </div>
      </Container>

      {/* Bottom CTA */}
      <div className="border-t border-border-light bg-bg-warm">
        <Container className="py-16 text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.12em] text-green">
            Ready to begin?
          </p>
          <h2 className="mb-4 font-serif text-3xl font-semibold">
            Every consultation starts with a conversation.
          </h2>
          <p className="mx-auto mb-8 max-w-[48ch] text-lg text-text-secondary">
            Share your question, your situation, and your birth details. The
            right consultation will become clear.
          </p>
          <Link
            href="/contact"
            className="inline-block rounded-xl bg-dark px-8 py-4 font-semibold text-text-on-dark no-underline transition-opacity hover:opacity-90"
          >
            Get in touch
          </Link>
        </Container>
      </div>
    </div>
  );
}
