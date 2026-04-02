"use client";

import { forwardRef } from "react";

type Variant = "primary" | "secondary" | "ghost";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  href?: string;
}

const base =
  "inline-flex items-center justify-center font-sans font-medium tracking-wide uppercase transition-all cursor-pointer focus-visible:outline-none";

const variants: Record<Variant, string> = {
  primary:
    "h-12 px-8 rounded-lg text-sm bg-accent text-white hover:bg-accent-hover active:scale-[0.98] focus-visible:ring-3 focus-visible:ring-accent/40 focus-visible:ring-offset-2",
  secondary:
    "h-11 px-6 rounded-lg text-sm border-[1.5px] border-green-dark text-green-dark hover:bg-green-dark hover:text-white active:scale-[0.98] focus-visible:ring-3 focus-visible:ring-green/40 focus-visible:ring-offset-2",
  ghost:
    "px-1 py-2 text-sm text-green-dark hover:text-text hover:underline underline-offset-4 focus-visible:underline",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", className = "", children, href, ...props }, ref) => {
    const classes = `${base} ${variants[variant]} ${className}`;

    if (href) {
      return (
        <a href={href} className={classes}>
          {children}
        </a>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
