"use client";

import { useRevealOnScroll } from "@/lib/useRevealOnScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CtaSection from "@/components/CtaSection";
import StatsBar from "@/components/about/StatsBar";
import IndustriesHero from "@/components/industries/IndustriesHero";
import IndustriesTabs from "@/components/industries/IndustriesTabs";
import ProblemsWeSolve from "@/components/industries/ProblemsWeSolve";
import WhoWeWorkWith from "@/components/industries/WhoWeWorkWith";

export default function IndustriesPage() {
  useRevealOnScroll();

  return (
    <>
      <Navbar />
      <main>
        <IndustriesHero />
        <StatsBar />
        <IndustriesTabs />
        <ProblemsWeSolve />
        <WhoWeWorkWith />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}