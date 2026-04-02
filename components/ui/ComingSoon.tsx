import Container from "@/components/layout/Container";
import Link from "next/link";

interface Props {
  title: string;
  description: string;
  icon: string;
}

export default function ComingSoon({ title, description, icon }: Props) {
  return (
    <div className="min-h-screen">
      <div className="border-b border-border-light bg-bg-warm">
        <Container className="py-8 md:py-12">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.12em] text-green">
            Tools
          </p>
          <h1 className="mb-2">{title}</h1>
          <p className="max-w-[55ch] text-lg text-text-secondary">{description}</p>
        </Container>
      </div>

      <Container className="py-24">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="mb-6 text-5xl opacity-30" aria-hidden="true">
            {icon}
          </div>
          <div className="mb-3 inline-block rounded-full bg-surface-alt px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-text-tertiary">
            Coming Soon
          </div>
          <h2 className="mb-4 font-serif text-3xl font-semibold text-text">
            Under Development
          </h2>
          <p className="mb-8 max-w-[42ch] text-base leading-relaxed text-text-secondary">
            This tool is being carefully crafted. Precision takes time — we are
            building something worthy of your practice.
          </p>
          <Link
            href="/tools"
            className="text-sm font-medium text-green underline-offset-4 hover:underline"
          >
            ← Back to all tools
          </Link>
        </div>
      </Container>
    </div>
  );
}
