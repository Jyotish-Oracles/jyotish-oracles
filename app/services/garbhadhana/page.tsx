import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Garbhadhana Muhurtha",
  description:
    "Vedic alignment of conscious conception — classical Muhurtha election for the sacred act of bringing a soul into the world.",
};

export default function GarbhadhanaPage() {
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
            Garbhadhana Muhurtha
          </h1>
          <p className="font-serif text-xl italic text-text-secondary">
            Vedic Alignment of Conscious Conception
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
                In the Vedic worldview, a child is not born — a soul <em>arrives</em>.
                It arrives carrying karma accumulated across lifetimes, seeking parents
                whose chart signatures provide the karmic field it needs to fulfill its
                dharma. What determines which soul answers the call of a given union,
                at a given moment? The answer, encoded in classical texts from the
                Rigveda to the Charaka Samhita, is cosmic timing — the precise
                configuration of the sky at the moment of conception.
              </p>

              <blockquote className="border-l-2 border-green pl-6 py-1">
                <p className="font-serif text-xl italic leading-relaxed text-text">
                  &ldquo;The mental condition of a child depends upon the mental status
                  of his parents at the time he is conceived. According to the Vedic
                  system, therefore, the Garbhadhana-samskara is observed.&rdquo;
                </p>
                <cite className="mt-3 block text-sm not-italic text-text-tertiary">
                  — Srila Prabhupada, commentary on Srimad-Bhagavatam
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
                  &ldquo;Garbha Samskara is an ancient Indian practice rooted in
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
                    body: "The natal charts of both partners are examined in full — the 5th house (children and purva punya), the 7th (partnership), the Saptamsa (D7, the divisional chart of progeny), Jupiter\u2019s placement and dignity, and the condition of the Moon in both charts. Karmic strengths, doshas affecting fertility, and timing windows from Dasha periods are all mapped."
                  },
                  {
                    title: "Election of Auspicious Muhurthas",
                    body: "Drawing on classical Muhurtha Shastra, a series of optimal windows are identified — specific dates and time brackets where the Panchanga (Tithi, Vara, Nakshatra, Yoga, Karana), the rising lagna, and the Moon\u2019s position align to invite a soul of high vibration. Nakshatras such as Rohini, Pushya, Uttara Phalguni, and Shravana are analysed for their suitability in both partners\u2019 charts."
                  },
                  {
                    title: "Remedial Measures",
                    body: "Where karmic obstacles are identified — planetary afflictions to the 5th house, Rahu-Ketu axis involvement, Saturn or Mars afflicting the Moon — specific remedies are prescribed. These span the classical spectrum: Vedic mantras and pujas for invocation of Santana Gopala and Prajapati; Ayurvedic Garbha Samskara preparatory practices; practical lifestyle adjustments to align both partners\u2019 nervous systems with the elected moment."
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
                  <h3 className="mb-4 font-serif text-2xl font-semibold leading-snug !text-text-on-dark">
                    Garbhadhana Muhurtha
                  </h3>
                  <ul className="mb-6 space-y-3 text-sm text-text-on-dark/70">
                    {[
                      "Analysis of both partner charts",
                      "Saptamsa (D7) progeny analysis",
                      "Multiple elected muhurtha windows",
                      "Remedies \u2014 mantra, puja & practical",
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
    </div>
  );
}
