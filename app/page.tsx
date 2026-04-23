"use client";

import { useRevealOnScroll } from "@/lib/useRevealOnScroll";
import Navbar from "@/components/Navbar";
import ServicesCarousel from "@/components/ServicesCarousel";
import StatementHero from "@/components/StatementHero";
import Audience from "@/components/Audience";
import ProcessSection from "@/components/ProcessSection";
import ServicesTicker from "@/components/ServicesTicker";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";

export default function Page() {
  useRevealOnScroll();

  return (
    <>
      <Navbar />
      <main>
        <ServicesCarousel />
        <StatementHero />
        <Audience />
        <ProcessSection />
        <ServicesTicker />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
