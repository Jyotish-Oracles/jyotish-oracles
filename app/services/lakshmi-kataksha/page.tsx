import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Lakshmi Kataksha",
  description:
    "Vedic wealth and prosperity analysis — identifying fortune energy points in your chart and activation techniques through yantras, mantras, and tailored remedies.",
};

export default function LakshmiKatakshaPage() {
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
            Lakshmi Kataksha
          </h1>
          <p className="font-serif text-xl italic text-text-secondary">
            The Gaze of Fortune — Unlocking Abundance Through Your Chart
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
                In the Vedic tradition, wealth is not an accident. It is a flow — a
                current of Lakshmi&rsquo;s grace that moves through specific channels
                in every horoscope. Some charts carry these channels wide open from
                birth. Others have them constricted by karmic debris — planetary
                afflictions, weak house lords, or unfavorable Dasha sequences that
                block the natural movement of prosperity. The question is never
                whether abundance exists in your chart. It always does, in some form.
                The question is: where are the energy points, and how do you activate
                them?
              </p>

              <p>
                <em>Kataksha</em> means a sideward glance — the glance of the goddess.
                In classical iconography, Lakshmi&rsquo;s gaze falls upon those whose
                karmic ledger and present actions create a resonance with her energy.
                This consultation is the systematic work of identifying exactly where
                that resonance lives in your chart, what obstructs it, and what
                practices — performed with discipline and consistency — can clear the
                path.
              </p>

              <blockquote className="border-l-2 border-green pl-6 py-1">
                <p className="font-serif text-xl italic leading-relaxed text-text">
                  &ldquo;Wealth comes to the one who acts with dharma at the right
                  time, in the right direction, with the right intention — not to the
                  one who merely desires it.&rdquo;
                </p>
                <cite className="mt-3 block text-sm not-italic text-text-tertiary">
                  — Paraphrased from Arthashastra principles
                </cite>
              </blockquote>

              <h3 className="font-serif text-2xl font-semibold text-text">
                What This Consultation Analyses
              </h3>

              <p>
                The Lakshmi Kataksha is a deep, methodical analysis of the houses and
                planets that govern material fortune, financial stability, and the
                capacity to generate, retain, and grow wealth. This is not a surface
                reading. It is a forensic examination of your chart&rsquo;s prosperity
                architecture.
              </p>

              <ul className="space-y-4 pl-0">
                {[
                  {
                    title: "Key Houses of Fortune",
                    body: "The 2nd house (accumulated wealth and family resources), the 11th house (gains, income streams, and fulfillment of desires), the 9th house (bhagya \u2014 luck and divine grace), the 5th house (purva punya and speculative gains), and the 10th house (karma sthana \u2014 the engine of professional action). The lords of these houses, their dignities, aspects, conjunctions, and Dasha activations are mapped in detail."
                  },
                  {
                    title: "Planets of Prosperity",
                    body: "Jupiter as the significator of wealth and expansion. Venus as the planet of luxury, material comfort, and Lakshmi herself. Mercury as the planet of commerce and transactional intelligence. The Sun as authority and inherited fortune. Each planet\u2019s strength, placement, and relationship to your chart\u2019s Dhana yogas (wealth combinations) is assessed."
                  },
                  {
                    title: "Energy Points & Activation Techniques",
                    body: "Every chart has dormant energy points \u2014 planetary combinations or house configurations that hold latent prosperity but require specific activation. These may be triggered by transits, Dasha onsets, or \u2014 critically \u2014 by deliberate remedial action. This consultation identifies your specific activation points and provides a clear, time-bound roadmap for engaging them."
                  },
                  {
                    title: "Yantra & Mantra Prescriptions",
                    body: "Based on the planets and houses that need strengthening or pacification, specific yantras for daily worship and mantras for regular japa are prescribed. These are not generic recommendations. They are derived from your chart\u2019s specific planetary configuration and calibrated to the Dasha period you are currently navigating."
                  },
                  {
                    title: "Personalised Remedy Schedule",
                    body: "Remedies are tailored to your capacity. A remedy that cannot be followed consistently is worse than no remedy at all \u2014 it creates a pattern of broken intention that compounds the original obstruction. Your schedule of practices is designed to be sustainable, realistic, and aligned with your daily life. The emphasis is always on what you can commit to, not on an aspirational ideal."
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
                On Consistency
              </h3>

              <p>
                Any remedy — whether mantra, yantra, puja, or practical adjustment —
                requires consistency to work. This is not a suggestion. It is the
                fundamental operating principle. A mantra chanted for three days and
                abandoned carries no force. A yantra worshipped erratically generates
                confusion, not clarity. The planetary energies respond to sustained,
                disciplined engagement — the same way a muscle responds to regular
                training, not to a single visit to a gymnasium.
              </p>

              <p>
                For this reason, the remedial measures prescribed in this consultation
                are matched to your capacity and commitment level. It is better to
                chant one mantra 108 times daily for six months than to attempt an
                elaborate regimen for a week and then stop. The consultation includes
                an honest conversation about what you can sustain, and the prescriptions
                are built around that reality.
              </p>

              {/* Disclaimer */}
              <div className="rounded-xl border border-border-light bg-bg-warm p-6">
                <h3 className="mb-3 font-serif text-lg font-semibold text-text">
                  Important Note
                </h3>
                <div className="space-y-3 text-[15px] leading-relaxed text-text-secondary">
                  <p>
                    This consultation works within the scope of the horoscope. Jyotish
                    reveals the karmic patterns encoded in the chart — it does not
                    override them. Where karma is severe and the afflictions are deeply
                    rooted, remedies can <em>balance</em> and <em>cushion</em> the
                    impact to the extent cosmically permissible, but they cannot
                    eliminate what the soul has brought to resolve. Honest assessment,
                    not false promises, is the foundation of this work.
                  </p>
                  <p>
                    There is also the possibility that I may not take up certain charts
                    for this consultation. If specific combinations are present that,
                    based on the guidance of my gurus, indicate this work should not be
                    undertaken, I will communicate this directly and respectfully. This
                    is not a refusal of service — it is an adherence to the ethical
                    boundaries of the tradition.
                  </p>
                </div>
              </div>

              <p className="text-[16px] italic text-text-tertiary">
                This consultation is for those who are prepared to engage seriously
                with the remedial process — not as a one-time intervention, but as a
                sustained practice. The results are proportional to the commitment.
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
                    Lakshmi Kataksha
                  </h3>
                  <ul className="mb-6 space-y-3 text-sm text-text-on-dark/70">
                    {[
                      "Key house & planet analysis",
                      "Dhana yoga identification",
                      "Energy activation roadmap",
                      "Yantra & mantra prescriptions",
                      "Personalised remedy schedule",
                      "Capacity-matched practice plan",
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
                  Consistency in practice is required. Limited availability.
                </p>
              </div>
            </aside>
          </div>
        </Container>
      </div>
    </div>
  );
}
