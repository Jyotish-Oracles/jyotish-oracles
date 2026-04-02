import Container from "./Container";
import Link from "next/link";

const footerLinks = {
  Tools: [
    { label: "Kundali Generator", href: "/tools/kundali" },
    { label: "Daily Panchang", href: "/tools/panchang" },
    { label: "Planetary Transits", href: "/tools/transits" },
    { label: "PanchaPakshi", href: "/tools/pakshi" },
  ],
  Services: [
    { label: "Garbhadhana Muhurtha", href: "/services/garbhadhana" },
    { label: "Child Horoscopy", href: "/services/child-horoscopy" },
    { label: "Lakshmi Kataksha", href: "/services/lakshmi-kataksha" },
    { label: "All Services", href: "/services" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Media", href: "/insights" },
    { label: "Contact", href: "/contact" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-dark pt-20 pb-12 text-text-on-dark" role="contentinfo">
      <Container>
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div>
            <Link href="/" className="font-serif text-xl font-semibold text-green-light no-underline">
              Jyotish Oracles
            </Link>
            <p className="mt-4 max-w-[280px] text-sm leading-relaxed text-text-on-dark/60">
              The science of light — Vedic astrology consultations and precision tools rooted in millennia of celestial observation.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="mb-4 text-xs font-medium uppercase tracking-[0.12em] text-text-on-dark/40 font-sans">
                {title}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-on-dark/60 no-underline transition-colors hover:text-text-on-dark"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-dark-border pt-6 sm:flex-row">
          <p className="text-xs text-text-on-dark/40">
            &copy; {new Date().getFullYear()} Jyotish Oracles. All rights reserved.
          </p>
          <p className="text-xs text-text-on-dark/30">
            Calculations powered by Swiss Ephemeris
          </p>
        </div>
      </Container>
    </footer>
  );
}
