import type { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  variant?: "light" | "warm" | "dark";
  id?: string;
  ariaLabel?: string;
}

const variants = {
  light: "bg-background",
  warm: "bg-bg-warm",
  dark: "bg-dark text-text-on-dark",
};

export default function Section({
  children,
  className = "",
  variant = "light",
  id,
  ariaLabel,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={`py-16 md:py-24 ${variants[variant]} ${className}`}
    >
      {children}
    </section>
  );
}
