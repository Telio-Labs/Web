"use client";

import { motion } from "motion/react";

const PROBLEMS = [
  {
    num: "01",
    title: "Vendors who disappear after launch.",
    desc: "Most agencies hand off and move on. We build ongoing support into every engagement — because a launch isn't the finish line, it's the starting line.",
  },
  {
    num: "02",
    title: "Junior teams overpromising, underdelivering.",
    desc: "You hired a senior team and got handed to juniors. At TelioLabs, the people you meet are the people who build. Senior-led, always.",
  },
  {
    num: "03",
    title: "Five vendors, five points of failure.",
    desc: "Design here, dev there, marketing somewhere else. We cover software, infrastructure, and growth under one roof — with one point of contact.",
  },
];

export default function ProblemsWeSolve() {
  return (
    <section className="relative py-20 px-[5vw] bg-[#111111] border-t border-white/10 overflow-hidden max-[600px]:py-14 max-[600px]:px-[4vw]">
      {/* Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(74,111,232,.18) 0%, transparent 70%)" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.65 }}
        className="relative z-[1]"
      >
        <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-accent-light mb-2.5 block">
          What we fix
        </span>
        <h2
          className="font-display font-extrabold text-white tracking-[-1.5px] leading-[1.08]"
          style={{ fontSize: "clamp(30px, 3.5vw, 48px)" }}
        >
          The same problems,
          <br />
          every industry.
        </h2>
        <div className="w-12 h-[3px] bg-accent-light mt-4" />
      </motion.div>

      <div className="relative z-[1] grid grid-cols-3 gap-5 mt-12 max-[900px]:grid-cols-1 max-[900px]:gap-4">
        {PROBLEMS.map((p, i) => (
          <motion.div
            key={p.num}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.55, delay: i * 0.1 }}
            whileHover={{ y: -4 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-accent-light/40 transition-colors max-[600px]:p-7"
          >
            <div className="font-display text-[42px] font-extrabold text-accent-light/30 tracking-[-2px] leading-none mb-5">
              {p.num}
            </div>
            <h3 className="font-display text-lg font-bold text-white tracking-[-0.3px] mb-3 leading-[1.3]">
              {p.title}
            </h3>
            <p className="text-[14px] text-[#c8d7ff]/65 leading-[1.65] font-light">
              {p.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}