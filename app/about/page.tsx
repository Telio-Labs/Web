"use client";

import { useRevealOnScroll } from "@/lib/useRevealOnScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CtaSection from "@/components/CtaSection";
import AboutHero from "@/components/about/AboutHero";
import StatsBar from "@/components/about/StatsBar";
import WhatWeAre from "@/components/about/WhatWeAre";
import WhatWeDoBest from "@/components/about/WhatWeDoBest";
import Story from "@/components/about/Story";
import Leadership from "@/components/about/Leadership";
import Values from "@/components/about/Values";

export default function AboutPage() {
  useRevealOnScroll();

  return (
    <>
      <Navbar />
      <main>
        <AboutHero />
        <StatsBar />
        <WhatWeAre />
        <WhatWeDoBest />
        <Story />
        <Leadership />
        <Values />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}