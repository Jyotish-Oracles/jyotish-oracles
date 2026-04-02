import type { ReactNode } from "react";

type Variant = "standard" | "elevated" | "dark";

interface CardProps {
  variant?: Variant;
  className?: string;
  children: ReactNode;
}

const variants: Record<Variant, string> = {
  standard:
    "bg-surface rounded-2xl p-6 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:shadow-lg",
  elevated:
    "bg-white rounded-2xl p-8 border border-border-light shadow-md transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:shadow-lg",
  dark:
    "bg-dark rounded-2xl p-7 text-text-on-dark border border-dark-border transition-all duration-300 hover:bg-dark-surface",
};

export default function Card({
  variant = "standard",
  className = "",
  children,
}: CardProps) {
  return <div className={`${variants[variant]} ${className}`}>{children}</div>;
}
