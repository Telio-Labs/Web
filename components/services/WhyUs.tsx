"use client";

import { motion } from "motion/react";

type Feature = {
  icon: React.ReactNode;
  title: string;
  desc: string;
};

const FEATURES: Feature[] = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    title: "Senior-led always.",
    desc: "Every project is owned by an experienced director. No junior handoffs, no bait-and-switch.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    title: "Zero handoffs.",
    desc: "One team covers every layer. Managing five vendors creates five points of failure. We eliminate that.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    title: "Weekly progress.",
    desc: "Real deliverables every week — not a big reveal at the end of a three-month contract.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    title: "Results, not reports.",
    desc: "Metrics matter more than mockups. We care about what the product does for your business.",
  },
];

export default function WhyUs() {
  return (
    <section className="py-20 px-[5vw] bg-bg border-t border-border max-[600px]:py-14 max-[600px]:px-[4vw]">
      <div className="grid grid-cols-4 gap-4 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1 max-[600px]:gap-3">
        {FEATURES.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.55, delay: i * 0.1 }}
            whileHover={{ y: -3, borderColor: "#4A6FE8" }}
            className="bg-surface border border-border rounded-2xl p-7 transition-colors max-[600px]:p-6"
          >
            <div className="w-11 h-11 rounded-xl bg-accent-dim flex items-center justify-center mb-5 text-accent">
              <div className="w-5 h-5">{f.icon}</div>
            </div>
            <div className="text-[10px] font-semibold tracking-[0.14em] uppercase text-muted mb-3">
              Why us
            </div>
            <div className="w-8 h-px bg-border mb-3" />
            <h3 className="font-display text-lg font-bold text-navy tracking-[-0.3px] mb-2 leading-[1.25]">
              {f.title}
            </h3>
            <p className="text-[13px] text-muted leading-[1.65] font-light">
              {f.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}