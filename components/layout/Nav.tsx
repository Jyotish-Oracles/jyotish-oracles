"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "./Container";
import Button from "@/components/ui/Button";
import LocationPicker from "@/components/ui/LocationPicker";

const links = [
  { href: "/", label: "Home" },
  { href: "/tools", label: "Tools" },
  { href: "/services", label: "Services" },
  { href: "/insights", label: "Media" },
  { href: "/about", label: "About" },
];

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 h-[72px] border-b border-border-light backdrop-blur-xl"
        style={{ background: "rgba(247, 246, 241, 0.9)" }}
        aria-label="Main navigation"
      >
        <Container className="flex h-full items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="font-serif text-xl font-semibold tracking-wide text-text no-underline hover:text-text"
          >
            Jyotish Oracles
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-7 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[15px] no-underline transition-colors ${
                  pathname === link.href
                    ? "font-medium text-text"
                    : "text-text-secondary hover:text-text"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <LocationPicker />
            <Button variant="primary" href="/services">
              Book a Reading
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="flex h-12 w-12 items-center justify-center md:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
        </Container>
      </nav>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-background"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <button
            className="absolute top-5 right-5 flex h-12 w-12 items-center justify-center"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          <div className="flex flex-col items-center gap-5">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-serif text-[28px] font-semibold text-text no-underline"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4">
              <Button variant="primary" href="/services">
                Book a Reading
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
