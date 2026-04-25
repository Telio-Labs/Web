"use client";

import { motion } from "motion/react";

const STEPS = [
  { num: "01", title: "Discover.", desc: "We understand your goals and constraints before writing a single line of code. No assumptions." },
  { num: "02", title: "Architect.", desc: "We design the technical foundation aligned to your scale targets from day one — not retrofitted later." },
  { num: "03", title: "Build.", desc: "Agile delivery in short cycles. You see real progress every week, not at the end of a long contract." },
  { num: "04", title: "Deliver.", desc: "We don't disappear at go-live. Support, monitoring, and iteration are built in from the start." },
];

export default function Process() {
  return (
    <section className="py-20 px-[5vw] bg-surface border-t border-border max-[600px]:py-14 max-[600px]:px-[4vw]">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.65 }}
        className="mb-13"
      >
        <span className="sec-tag">How we work</span>
        <h2 className="sec-title">
          From brief to launch,
          <br />
          without the noise.
        </h2>
      </motion.div>

      <div className="grid grid-cols-4 gap-4 mt-12 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1 max-[600px]:gap-3">
        {STEPS.map((s, i) => (
          <motion.div
            key={s.num}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -3 }}
            className="bg-bg border border-border rounded-2xl p-7 group hover:border-accent transition-colors max-[600px]:p-6"
          >
            <div className="font-display text-3xl font-extrabold text-border tracking-[-1.5px] leading-none mb-3 group-hover:text-accent transition-colors">
              {s.num}
            </div>
            <div className="text-[10px] font-semibold tracking-[0.14em] uppercase text-muted mb-3">
              Step
            </div>
            <div className="w-8 h-px bg-border mb-3" />
            <h3 className="font-display text-lg font-bold text-navy tracking-[-0.3px] mb-2">
              {s.title}
            </h3>
            <p className="text-[13px] text-muted leading-[1.65] font-light">
              {s.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}