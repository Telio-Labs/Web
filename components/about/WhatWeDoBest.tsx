"use client";

import { motion } from "motion/react";

type Card = {
  icon: React.ReactNode;
  title: string;
  desc: string;
  tags: string[];
};

const CARDS: Card[] = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#4A6FE8" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M9 9l3 3-3 3M13 15h3" />
      </svg>
    ),
    title: "Building products from zero.",
    desc: "We take ideas from concept to deployed product — managing architecture, development, and launch with a single senior-led team. No gaps, no handoffs, no surprises.",
    tags: ["Custom Software", "Mobile Apps", "Web Platforms"],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#4A6FE8" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    title: "Scaling complex infrastructure.",
    desc: "When performance, security, and reliability are non-negotiable, we build the infrastructure that holds. Cloud architecture, DevOps, and data systems that scale with your growth.",
    tags: ["DevOps & Cloud", "Database", "Cybersecurity"],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#4A6FE8" strokeWidth="1.5">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    title: "Growing brands through performance.",
    desc: "Social media and paid advertising built around real results — more qualified leads, lower cost per acquisition, and campaigns that improve over time, not just at launch.",
    tags: ["Social Media", "Paid Ads", "Performance"],
  },
];

export default function WhatWeDoBest() {
  return (
    <section
      id="best"
      className="py-20 px-[5vw] bg-surface border-t border-border max-[600px]:py-14 max-[600px]:px-[4vw]"
    >
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.65 }}
      >
        <span className="sec-tag">What we do best</span>
        <h2 className="sec-title">
          Where we deliver
          <br />
          the most value.
        </h2>
      </motion.div>

      <div className="grid grid-cols-3 gap-6 mt-14 max-[900px]:grid-cols-1">
        {CARDS.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: i * 0.12 }}
            whileHover={{ y: -8, borderColor: "#4A6FE8" }}
            className="bg-bg border border-border rounded-[20px] p-10 px-9 relative overflow-hidden group transition-colors"
          >
            {/* Línea superior que aparece al hover */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-[3px] bg-accent origin-left"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
            />
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-accent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-[350ms]" />

            <div className="w-12 h-12 rounded-xl bg-accent-dim flex items-center justify-center mb-6">
              <div className="w-[22px] h-[22px]">{card.icon}</div>
            </div>

            <h3 className="font-display text-xl font-bold text-navy tracking-[-0.4px] mb-3 leading-[1.2]">
              {card.title}
            </h3>

            <p className="text-sm text-muted leading-[1.75] font-light">
              {card.desc}
            </p>

            <div className="flex flex-wrap gap-1.5 mt-5">
              {card.tags.map((t) => (
                <span
                  key={t}
                  className="bg-accent-dim text-accent text-[11px] font-semibold px-3 py-1 rounded-full"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}