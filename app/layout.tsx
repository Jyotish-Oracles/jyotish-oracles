import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import { LocationProvider } from "@/lib/location/context";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Jyotish Oracles — Vedic Astrology Consultations & Tools",
    template: "%s | Jyotish Oracles",
  },
  description:
    "The science of light — Vedic astrology consultations and precision tools rooted in millennia of celestial observation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable}`}
    >
      <body>
        <LocationProvider>
          {/* Skip to content — WCAG 2.4.1 */}
          <a href="#main-content" className="skip-to-content">
            Skip to content
          </a>

          <Nav />

          <main id="main-content" className="flex-1" style={{ paddingTop: "var(--nav-height)" }}>
            {children}
          </main>

          <Footer />
        </LocationProvider>
      </body>
    </html>
  );
}
