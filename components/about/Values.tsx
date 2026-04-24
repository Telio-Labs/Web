"use client";

import { motion } from "motion/react";

const VALUES = [
  {
    num: "01",
    title: "Senior leadership on every project.",
    desc: "No bait-and-switch. The people you meet are the people who build. Every engagement is led by someone with real skin in the game.",
  },
  {
    num: "02",
    title: "Clarity over complexity.",
    desc: "We don't impress clients with jargon. We give them clear timelines, honest scopes, and predictable outcomes — from day one.",
  },
  {
    num: "03",
    title: "We don't disappear at launch.",
    desc: "Most agencies go quiet after go-live. We build ongoing support into every engagement because a launch isn't the finish line — it's the starting line.",
  },
  {
    num: "04",
    title: "Results, not deliverables.",
    desc: "We care about what the product does for your business, not just what it looks like in a presentation. Metrics matter more than mockups.",
  },
];

export default function Values() {
  return (
    <section
      id="values"
      className="py-16 px-[5vw] bg-surface border-t border-border relative overflow-hidden max-[600px]:py-14 max-[600px]:px-[4vw]"
    >
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.65 }}
      >
        <span className="sec-tag">What we believe</span>
        <h2 className="sec-title">
          The principles we
          <br />
          build everything on.
        </h2>
      </motion.div>

      <div className="grid grid-cols-2 gap-[3px] mt-10 rounded-2xl overflow-hidden max-[600px]:grid-cols-1">
        {VALUES.map((v, i) => (
          <motion.div
            key={v.num}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            whileHover={{ y: -3 }}
            className="bg-bg border border-border p-8 px-9 relative overflow-hidden group hover:border-accent transition-colors"
          >
            {/* Línea superior al hover */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-accent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-[350ms]" />

            <div className="font-display text-4xl font-extrabold text-border tracking-[-2px] leading-none mb-3">
              {v.num}
            </div>
            <h3 className="font-display text-lg font-bold text-navy tracking-[-0.3px] mb-2">
              {v.title}
            </h3>
            <p className="text-[13px] text-muted leading-[1.65] font-light">
              {v.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}