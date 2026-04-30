"use client";

import { useRevealOnScroll } from "@/lib/useRevealOnScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactHero from "@/components/contact/ContactHero";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactForm from "@/components/contact/ContactForm";

export default function ContactPage() {
  useRevealOnScroll();

  return (
    <>
      <Navbar />
      <main>
        <ContactHero />
        <section
          id="form"
          className="bg-bg py-16 px-[5vw] max-[600px]:py-12 max-[600px]:px-[4vw]"
        >
          <div className="grid grid-cols-[1.05fr_1.4fr] gap-12 max-w-[1280px] mx-auto max-[1000px]:grid-cols-1 max-[1000px]:gap-9">
            <ContactInfo />
            <ContactForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}