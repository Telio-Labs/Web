"use client";

import { motion } from "motion/react";
import FlipCard, { FlipCardData } from "./FlipCard";

const SOFTWARE_SERVICES: FlipCardData[] = [
  {
    num: "01",
    tag: "Engineering",
    name: "Custom Software Development",
    desc: "Software built around your workflows — scalable, maintainable, and designed to grow with your business.",
    includes: [
      "Requirements discovery & scoping",
      "Architecture design & full-cycle dev",
      "QA, deployment & ongoing support",
    ],
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=700&q=80",
    overlayColor: "rgba(6,12,24",
  },
  {
    num: "02",
    tag: "Mobile",
    name: "Mobile Application Development",
    desc: "iOS and Android apps built for performance and retention — from MVP to fully scaled products.",
    includes: [
      "iOS & Android / React Native / Flutter",
      "UX/UI design & prototyping",
      "App Store & Play Store submission",
    ],
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=700&q=80",
    overlayColor: "rgba(8,20,40",
  },
  {
    num: "03",
    tag: "Web",
    name: "Web Platforms & Digital Experiences",
    desc: "High-performance platforms designed to convert users, reduce friction, and scale traffic.",
    includes: [
      "React, Next.js, headless CMS",
      "Backend & API development",
      "Performance & Core Web Vitals",
    ],
    image:
      "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=700&q=80",
    overlayColor: "rgba(10,26,56",
  },
  {
    num: "04",
    tag: "AI & ML",
    name: "Custom AI & ML Solutions",
    desc: "Models built for your specific data and outcomes — not generic tools adapted to fit.",
    includes: [
      "Custom ML model development",
      "LLM integration & fine-tuning",
      "AI-powered APIs & pipelines",
    ],
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=700&q=80",
    overlayColor: "rgba(4,8,32",
  },
  {
    num: "05",
    tag: "Agentic AI",
    name: "Agentic AI Systems",
    desc: "AI that doesn't just answer — it acts. Autonomous systems that execute tasks and make decisions.",
    includes: [
      "Autonomous agent design & dev",
      "Multi-agent workflow orchestration",
      "Business process automation",
    ],
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=700&q=80",
    overlayColor: "rgba(8,4,40",
  },
  {
    num: "06",
    tag: "Cloud",
    name: "DevOps & Cloud Infrastructure",
    desc: "Automated pipelines, reliable cloud architecture built for reliability and cost efficiency at scale.",
    includes: [
      "CI/CD pipeline setup & automation",
      "AWS · GCP · Azure architecture",
      "Docker, Kubernetes, monitoring",
    ],
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=700&q=80",
    overlayColor: "rgba(10,37,96",
  },
  {
    num: "07",
    tag: "Security",
    name: "Cybersecurity Solutions",
    desc: "Protect what you've built. Penetration testing, audits, and compliance-ready architecture.",
    includes: [
      "Pentesting & vulnerability assessments",
      "SOC2, GDPR, HIPAA readiness",
      "Auth & identity management",
    ],
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=700&q=80",
    overlayColor: "rgba(15,30,80",
  },
];

export default function SoftwareCategory() {
  return (
    <section
      id="software"
      className="py-20 px-[5vw] bg-bg border-t border-border max-[600px]:py-14 max-[600px]:px-[4vw]"
    >
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.65 }}
        className="flex items-end justify-between mb-13 max-[600px]:flex-col max-[600px]:items-start max-[600px]:gap-3"
      >
        <div>
          <span className="sec-tag">Software Development</span>
          <h2 className="sec-title">
            We build things
            <br />
            that scale.
          </h2>
        </div>
        <div className="text-[13px] text-muted pb-1">
          7 services · hover to explore
        </div>
      </motion.div>

      <div className="grid grid-cols-3 gap-5 mt-12 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1 max-[600px]:gap-4">
        {SOFTWARE_SERVICES.map((s, i) => (
          <FlipCard key={s.num} data={s} index={i} />
        ))}
      </div>
    </section>
  );
}