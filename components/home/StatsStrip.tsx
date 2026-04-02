"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Container from "@/components/layout/Container";

const stats = [
  { number: 9, label: "Grahas" },
  { number: 27, label: "Nakshatras" },
  { number: 12, label: "Rashis" },
  { number: 5, label: "Pakshi States" },
];

export default function StatsStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="bg-dark py-10 md:py-14" aria-label="Key numbers">
      <Container>
        <div
          ref={ref}
          className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-0 md:divide-x md:divide-dark-border"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="font-serif text-4xl font-bold text-gold md:text-5xl">
                {isInView ? stat.number : 0}
              </div>
              <div className="mt-1 text-[11px] font-medium uppercase tracking-[0.12em] text-text-on-dark/45">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
