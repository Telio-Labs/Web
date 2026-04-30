"use client";

import { motion } from "motion/react";

const AUDIENCES = [
  {
    num: "01",
    title: "Startups & Founders",
    desc: "You have an idea and need to move fast without cutting corners. We've helped founders go from concept to product in weeks.",
    pills: ["MVP Development", "Mobile-first", "Early-stage"],
  },
  {
    num: "02",
    title: "Enterprises & SMBs",
    desc: "You need to modernize, scale, or add new capabilities without disrupting what already works. We integrate with your existing systems.",
    pills: ["System Integration", "Modernization", "Scale"],
  },
  {
    num: "03",
    title: "Agencies & Studios",
    desc: "You need a reliable white-label partner that delivers senior-level execution without the overhead of hiring. We operate quietly behind the scenes.",
    pills: ["White-label", "Overflow capacity", "Senior execution"],
  },
];

export default function WhoWeWorkWith() {
  return (
    <section className="py-20 px-[5vw] bg-bg border-t border-border max-[600px]:py-14 max-[600px]:px-[4vw]">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.65 }}
      >
        <span className="sec-tag">Who we work with</span>
        <h2 className="sec-title">
          Built for every stage,
          <br />
          every size.
        </h2>
      </motion.div>

      <div className="grid grid-cols-3 gap-5 mt-12 max-[900px]:grid-cols-1 max-[900px]:gap-4">
        {AUDIENCES.map((a, i) => (
          <motion.div
            key={a.num}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.55, delay: i * 0.1 }}
            whileHover={{ y: -4, borderColor: "#4A6FE8" }}
            className="bg-surface border border-border rounded-2xl p-8 transition-colors max-[600px]:p-7"
          >
            <div className="font-display text-[42px] font-extrabold text-border tracking-[-2px] leading-none mb-5">
              {a.num}
            </div>
            <h3 className="font-display text-xl font-bold text-navy tracking-[-0.4px] mb-3 leading-[1.2]">
              {a.title}
            </h3>
            <p className="text-[14px] text-muted leading-[1.7] font-light mb-5">
              {a.desc}
            </p>
            <div className="flex flex-wrap gap-2">
              {a.pills.map((pill) => (
                <span
                  key={pill}
                  className="bg-accent-dim text-accent text-[12px] font-semibold px-3 py-1 rounded-full"
                >
                  {pill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}