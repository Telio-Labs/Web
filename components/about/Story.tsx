"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export default function Story() {
  const photoRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: photoRef,
    offset: ["start end", "end start"],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section
        id="story"
        className="relative py-[100px] px-[5vw] bg-bg border-t border-border max-[600px]:py-16 max-[600px]:px-[4vw]"
      >
      <div className="grid grid-cols-2 gap-20 items-center max-[900px]:grid-cols-1 max-[900px]:gap-10">
        {/* Texto */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span className="sec-tag">Our Story</span>
          <h2 className="sec-title">
            Built from experience,
            <br />
            not from theory.
          </h2>
          <div className="text-[17px] text-muted leading-[1.85] font-light mt-7 space-y-5">
            <p>
              TelioLabs didn&apos;t start in a boardroom. It started with{" "}
              <strong className="text-text font-medium">
                20+ years of real experience
              </strong>{" "}
              building, launching, and scaling digital products across startups,
              enterprises, and agencies.
            </p>
            <p>
              We saw the same problems repeat: missed deadlines, junior teams
              overpromising, vendors disappearing after launch, five different
              partners managing five different pieces. Organizations were
              paying more and getting less.
            </p>
            <p>
              So we built something different.{" "}
              <strong className="text-text font-medium">
                One senior-led team. End-to-end execution. Real accountability.
              </strong>{" "}
              TelioLabs is what happens when people who&apos;ve been inside the
              problem decide to fix it.
            </p>
          </div>
        </motion.div>

        {/* Foto con parallax + badge */}
        <motion.div
          ref={photoRef}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative rounded-[20px] overflow-hidden h-[480px] max-[900px]:h-[320px]"
        >
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80')",
              y: photoY,
              scale: 1.15,
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg,rgba(6,12,24,.15),rgba(74,111,232,.1))",
            }}
          />

          {/* Badge flotante */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="absolute bottom-7 left-7 bg-[#060C18]/85 border border-accent-light/20 rounded-xl px-5 py-4"
            style={{ backdropFilter: "blur(12px)" }}
          >
            <div className="font-display text-[28px] font-extrabold text-white tracking-[-1px]">
              60<span className="text-accent-light">+</span>
            </div>
            <div className="text-xs text-[#c8d7ff]/50 mt-0.5">
              Projects delivered
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}