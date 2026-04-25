"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export default function ServicesHero() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      ref={ref}
      className="min-h-[55vh] bg-[#111111] relative overflow-hidden flex flex-col justify-end px-[5vw] pb-14 max-[600px]:pb-10"
    >
      {/* BG con parallax */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1800&q=80')",
          y: bgY,
          scale: 1.15,
        }}
      />

      {/* Overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(160deg,rgba(17,17,17,.92) 0%,rgba(17,17,17,.75) 50%,rgba(10,26,60,.88) 100%)",
        }}
      />

      {/* Grid blueprint */}
      <div
        className="absolute inset-0 z-[2]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(168,190,255,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(168,190,255,.03) 1px,transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 30% 60%,black 30%,transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 70% at 30% 60%,black 30%,transparent 100%)",
        }}
      />

      {/* Contenido */}
      <div className="relative z-[3] max-w-[900px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center gap-2.5 text-xs font-semibold tracking-[0.16em] uppercase text-accent-light mb-4"
        >
          <span className="inline-block w-7 h-px bg-accent-light" />
          What We Build & Grow
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-display font-extrabold leading-[1.04] tracking-[-2.5px] text-white mb-4"
          style={{ fontSize: "clamp(36px, 5vw, 72px)" }}
        >
          One partner.
          <br />
          Every layer of{" "}
          <em className="not-italic text-accent-light">your stack.</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-[#c8d7ff]/65 max-w-[560px] leading-[1.75] font-light"
          style={{ fontSize: "clamp(16px, 1.4vw, 19px)" }}
        >
          Senior-led execution across software development, AI, and digital
          marketing — under one roof. Hover each service to learn more.
        </motion.p>
      </div>
    </section>
  );
}