"use client";

import { useState, useEffect } from "react";
import Hero from "@/components/home/Hero";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { useLocation } from "@/lib/location/context";
import type { PanchangData } from "@/lib/astro/types";

export default function HomePage() {
  const { city, isLoading: locationLoading } = useLocation();
  const [panchang, setPanchang] = useState<PanchangData | null>(null);

  useEffect(() => {
    if (locationLoading) return;

    const params = new URLSearchParams({
      tz: city.timezone,
      lat: String(city.lat),
      lng: String(city.lng),
    });

    fetch(`/api/panchang?${params}`)
      .then((r) => r.json())
      .then((data) => setPanchang(data))
      .catch(console.error);
  }, [city, locationLoading]);

  return (
    <>
      <Hero panchang={panchang} cityName={city.name} />

      <Section variant="warm" ariaLabel="About the practice">
        <Container size="md">
          <ScrollReveal>
            <p className="text-center font-serif text-2xl leading-relaxed text-text md:text-3xl">
              Jyotish — the science of light — reveals the patterns written in the
              sky at the moment of your birth. Through precise calculation and
              thoughtful interpretation, we illuminate the path ahead.
            </p>
          </ScrollReveal>
        </Container>
      </Section>
    </>
  );
}
