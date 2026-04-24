"use client";

import { motion } from "motion/react";
import Link from "next/link";

export default function WhatWeAre() {
  return (
    <section
      id="what"
      className="py-20 px-[5vw] bg-bg border-t border-border max-[600px]:py-14 max-[600px]:px-[4vw]"
    >
      <div className="grid grid-cols-[1fr_420px] gap-[72px] items-center max-[900px]:grid-cols-1 max-[900px]:gap-10">
        {/* Texto */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span className="sec-tag">What we are</span>
          <h2 className="sec-title">
            Technology & marketing,
            <br />
            under one roof.
          </h2>
          <p
            className="text-muted leading-[1.75] font-light mt-4 max-w-[520px]"
            style={{ fontSize: "clamp(16px, 1.4vw, 18px)" }}
          >
            TelioLabs is a{" "}
            <em className="not-italic text-accent font-medium">
              U.S.-managed technology and digital marketing partner.
            </em>{" "}
            We design, build, and grow digital products for startups,
            enterprises, and agencies — with senior leadership on every
            engagement.
          </p>

          <div className="flex gap-3 flex-wrap mt-8">
            <Link
              href="/#services"
              className="bg-navy text-white font-medium text-sm px-6 py-3 rounded-full hover:-translate-y-0.5 hover:opacity-85 transition-all inline-block"
            >
              Explore Services →
            </Link>
            <Link
              href="/#work"
              className="text-muted text-sm flex items-center gap-1.5 hover:text-navy transition-colors group self-center"
            >
              See Our Work{" "}
              <span className="inline-block group-hover:translate-x-1 transition-transform">
                →
              </span>
            </Link>
          </div>
        </motion.div>

        {/* Foto */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative rounded-[20px] overflow-hidden h-[440px] max-[900px]:h-[280px]"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80')",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg,rgba(6,12,24,.15),rgba(74,111,232,.1))",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}