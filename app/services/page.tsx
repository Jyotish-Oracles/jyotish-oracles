import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Vedic astrology consultations — Garbhadhana Muhurtha, Child Horoscopy, Lakshmi Kataksha, natal readings, name & logo selection, and watch astrology.",
};

const signatureServices = [
  {
    id: "garbhadhana",
    href: "/services/garbhadhana",
    title: "Garbhadhana Muhurtha",
    subtitle: "Vedic Alignment of Conscious Conception",
    description:
      "The first of the sixteen sacred samskaras — a multi-stage consultation that analyses both partners\u2019 charts, elects auspicious windows for conception, and prescribes remedial and preparatory measures rooted in classical Muhurtha Shastra.",
    features: [
      "Both partner charts analysed",
      "Saptamsa (D7) progeny analysis",
      "Multiple elected muhurtha windows",
      "Remedies & preparation guide",
    ],
  },
  {
    id: "child-horoscopy",
    href: "/services/child-horoscopy",
    title: "Child Horoscopy",
    subtitle: "A Cosmic Blueprint for the Early Years",
    description:
      "A fixed-format reading for newborns — no questions session. Covers life timelines for the first five years, Ashtakarma milestone timing through Vidyabhyasa, lucky symbols, deity worship, colors, foods, and things to avoid based on the child\u2019s chart.",
    features: [
      "Life timeline (0\u20135 years)",
      "Ashtakarma milestone timing",
      "Lucky symbols, colors & foods",
      "Deity & mantra guidance",
    ],
  },
  {
    id: "lakshmi-kataksha",
    href: "/services/lakshmi-kataksha",
    title: "Lakshmi Kataksha",
    subtitle: "The Gaze of Fortune",
    description:
      "A forensic analysis of your chart\u2019s prosperity architecture — key houses and planets of fortune, dormant energy points, and activation techniques through yantras, mantras, and capacity-matched remedial practices.",
    features: [
      "Dhana yoga identification",
      "Energy activation roadmap",
      "Yantra & mantra prescriptions",
      "Capacity-matched remedy plan",
    ],
  },
];

const otherServices = [
  {
    id: "birth-chart",
    icon: "\u2609",
    title: "Natal Chart Reading",
    subtitle: "Full Birth Chart Analysis",
    description:
      "A systematic examination of your chart across multiple divisional charts \u2014 D1 through D60. Planetary dignities, Dasha periods, yogas, and karmic indicators are interpreted to give a precise map of your life\u2019s design, challenges, and latent strengths.",
    features: [
      "D1 through D9 analysis",
      "Current Dasha interpretation",
      "Karmic patterns & past life indicators",
    ],
  },
  {
    id: "name-logo",
    icon: "\u2726",
    title: "Name & Logo Selection",
    subtitle: "Business Identity Astrology",
    description:
      "Your company\u2019s name and logo are not cosmetic choices \u2014 they are vibrational signatures that interact with the owner\u2019s horoscope every day. This consultation analyses the owner\u2019s chart alongside the nature of the business to recommend names, colors, symbols, and letterforms that resonate with the strongest planetary energies in the chart. Multiple classical and numerological methodologies are cross-referenced to arrive at options that are both astrologically sound and practically viable.",
    features: [
      "Owner\u2019s horoscope analysis",
      "Business-type planetary mapping",
      "Name, color & symbol recommendations",
      "Multiple methodologies cross-referenced",
    ],
  },
  {
    id: "watch-astrology",
    icon: "\u25D4",
    title: "Watch Astrology",
    subtitle: "Wrist-Worn Energy Alignment",
    description:
      "A watch sits on the wrist \u2014 against the pulse, in constant view, marking every hour of your day. Its shape, color, material, and symbols exert a subtle but persistent influence on your energy field. This consultation selects the right watch characteristics based on your horoscope to enhance beneficial planetary energies. Methods to energise the watch and auspicious muhurthas for first wearing are included. Most clients report noticeable shifts within a couple of months.",
    features: [
      "Shape, color & material selection",
      "Symbol & dial recommendations",
      "Watch energisation methods",
      "Muhurtha for first wearing",
    ],
  },
];

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

      {/* === SIGNATURE SERVICES === */}
      <div className="border-b border-border-light bg-surface">
        <Container className="py-16 md:py-20">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            Signature Services
          </p>
          <h2 className="mb-12 font-serif text-3xl font-semibold">
            Deep Consultations
          </h2>

          <div className="grid gap-8 lg:grid-cols-3">
            {signatureServices.map((s) => (
              <Link
                key={s.id}
                href={s.href}
                className="group flex flex-col rounded-2xl border border-border-light bg-white p-8 no-underline transition-shadow hover:shadow-lg"
              >
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-accent">
                  Signature Service
                </p>
                <h3 className="mb-1 font-serif text-2xl font-semibold text-text">
                  {s.title}
                </h3>
                <p className="mb-4 font-serif text-sm italic text-text-tertiary">
                  {s.subtitle}
                </p>
                <p className="mb-5 flex-1 text-sm leading-relaxed text-text-secondary">
                  {s.description}
                </p>
                <ul className="mb-6 space-y-2">
                  {s.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2.5 text-sm text-text-secondary"
                    >
                      <span className="h-1 w-1 flex-shrink-0 rounded-full bg-accent" />
                      {f}
                    </li>
                  ))}
                </ul>
                <span className="text-sm font-medium text-green group-hover:underline">
                  Learn more →
                </span>
              </Link>
            ))}
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
          {otherServices.map((s) => (
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
              <p className="mb-5 text-sm leading-relaxed text-text-secondary">
                {s.description}
              </p>
              <ul className="mb-6 space-y-2">
                {s.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2.5 text-sm text-text-secondary"
                  >
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
