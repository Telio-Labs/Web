"use client";

import { motion } from "motion/react";
import FlipCard, { FlipCardData } from "./FlipCard";

const MARKETING_SERVICES: FlipCardData[] = [
  {
    num: "08",
    tag: "Social Media",
    name: "Social Media Marketing",
    desc: "Strategy and management for brands that want real outcomes — not just vanity metrics.",
    includes: [
      "Instagram, LinkedIn, TikTok, Facebook",
      "Content creation & calendar mgmt",
      "Monthly performance reports",
    ],
    image:
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=700&q=80",
    overlayColor: "rgba(59,31,110",
  },
  {
    num: "09",
    tag: "Paid Ads",
    name: "Paid Advertising",
    desc: "Performance-driven campaigns built around one metric: results. More leads, lower CAC.",
    includes: [
      "Meta Ads (Facebook & Instagram)",
      "Google Ads & Search campaigns",
      "Conversion tracking & A/B testing",
    ],
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=700&q=80",
    overlayColor: "rgba(76,29,149",
  },
];

export default function MarketingCategory() {
  return (
    <section
      id="marketing"
      className="py-20 px-[5vw] bg-surface border-t border-border max-[600px]:py-14 max-[600px]:px-[4vw]"
    >
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.65 }}
        className="flex items-end justify-between mb-13 max-[600px]:flex-col max-[600px]:items-start max-[600px]:gap-3"
      >
        <div>
          <span className="sec-tag">Digital Marketing</span>
          <h2 className="sec-title">
            We grow things
            <br />
            that matter.
          </h2>
        </div>
        <div className="text-[13px] text-muted pb-1">
          2 services · hover to explore
        </div>
      </motion.div>

      <div className="grid grid-cols-2 gap-5 mt-12 max-w-[860px] max-[600px]:grid-cols-1 max-[600px]:gap-4">
        {MARKETING_SERVICES.map((s, i) => (
          <FlipCard key={s.num} data={s} index={i} />
        ))}
      </div>
    </section>
  );
}