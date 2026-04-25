"use client";

import { useRevealOnScroll } from "@/lib/useRevealOnScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CtaSection from "@/components/CtaSection";
import ServicesHero from "@/components/services/ServicesHero";
import WhyUs from "@/components/services/WhyUs";
import Process from "@/components/services/Process";
import SoftwareCategory from "@/components/services/SoftwareCategory";
import MarketingCategory from "@/components/services/MarketingCategory";

export default function ServicesPage() {
  useRevealOnScroll();

  return (
    <>
      <Navbar />
      <main>
        <ServicesHero />
        <WhyUs />
        <Process />
        <SoftwareCategory />
        <MarketingCategory />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}