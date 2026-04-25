"use client";

import { motion } from "motion/react";
import { useState } from "react";

export type FlipCardData = {
  num: string;
  tag: string;
  name: string;
  desc: string;
  includes: string[];
  image: string;
  overlayColor: string;
};

type Props = {
  data: FlipCardData;
  index: number;
};

export default function FlipCard(props: Props) {
  const { data, index } = props;
  const [flipped, setFlipped] = useState(false);

  const overlay = "linear-gradient(160deg," + data.overlayColor + ",.7)," + data.overlayColor + ",.92))";
  const bgImg = "url('" + data.image + "')";
  const ctaClass = "relative z-10 inline-flex items-center gap-2 bg-accent-light text-navy text-[13px] font-semibold px-5 py-2.5 rounded-full w-fit hover:opacity-85 transition-opacity";

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.06 }}
      className="relative h-[380px] cursor-pointer"
      style={{ perspective: "1500px" }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped((f) => !f)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="absolute inset-0 rounded-[20px] overflow-hidden" style={{ backfaceVisibility: "hidden" }}>
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: bgImg }} />
          <div className="absolute inset-0" style={{ background: overlay }} />
          <div className="absolute top-7 right-7 font-display text-[64px] font-extrabold text-white/15 tracking-[-3px] leading-none z-[2]">{data.num}</div>
          <div className="absolute bottom-0 left-0 right-0 p-7 z-[2]">
            <div className="text-[10px] font-semibold tracking-[0.14em] uppercase text-accent-light mb-3 inline-block px-3 py-1 rounded-full bg-white/10 border border-white/15">{data.tag}</div>
            <h3 className="font-display text-2xl font-extrabold text-white tracking-[-0.6px] leading-[1.15] mb-3 max-[900px]:text-xl">{data.name}</h3>
            <div className="flex items-center gap-2 text-[11px] text-white/40 tracking-[0.08em] uppercase">Hover to explore<span> →</span></div>
          </div>
        </div>

        <div className="absolute inset-0 rounded-[20px] bg-[#0A1628] border border-white/10 p-7 flex flex-col justify-between overflow-hidden" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
          <div className="absolute top-7 right-7 font-display text-[64px] font-extrabold text-white/10 tracking-[-3px] leading-none">{data.num}</div>
          <div className="relative z-[1]">
            <h3 className="font-display text-xl font-bold text-white tracking-[-0.4px] mb-3 max-w-[260px] leading-[1.2]">{data.name}</h3>
            <p className="text-[13px] text-[#c8d7ff]/70 leading-[1.65] font-light mb-5">{data.desc}</p>
            <div className="flex flex-col gap-2">
              {data.includes.map((inc, i) => (<div key={i} className="flex items-start gap-2 text-[12px] text-[#c8d7ff]/85 leading-[1.5]"><span className="text-accent-light mt-0.5"> →</span>{inc}</div>))}
            </div>
          </div>
          <a href="#contact" onClick={(e) => e.stopPropagation()} className={ctaClass}>Get a Quote →</a>
        </div>
      </motion.div>
    </motion.div>
  );
}
