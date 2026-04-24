"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "motion/react";
import { useEffect, useRef } from "react";

type Stat = {
  value: string;
  suffix?: string;
  label: string;
  isText?: boolean;
};

const STATS: Stat[] = [
  { value: "20", suffix: "+", label: "Years of combined leadership experience" },
  { value: "3", label: "Senior leaders driving every project" },
  { value: "Since 2010", label: "Building digital products that scale", isText: true },
  { value: "10", suffix: "+", label: "Industries served across the portfolio" },
];

export default function StatsBar() {
  return (
    <div className="bg-bg border-t border-b border-border py-12 px-[5vw] grid grid-cols-4 gap-4 max-[900px]:grid-cols-2 max-[600px]:grid-cols-2 max-[600px]:gap-2">
      {STATS.map((stat, i) => (
        <StatCard key={i} stat={stat} index={i} />
      ))}
    </div>
  );
}

function StatCard({ stat, index }: { stat: Stat; index: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -3, borderColor: "#4A6FE8" }}
      className="bg-surface border border-border rounded-2xl p-7 flex flex-col justify-center transition-colors max-[600px]:p-4"
    >
      {stat.isText ? (
        <div
          className="font-display font-bold text-accent leading-none tracking-[-0.5px]"
          style={{ fontSize: "clamp(22px, 2vw, 30px)" }}
        >
          {stat.value}
        </div>
      ) : (
        <Counter
          value={parseInt(stat.value)}
          suffix={stat.suffix}
          inView={inView}
          delay={index * 0.15}
        />
      )}
      <div className="text-xs text-muted font-normal mt-2 tracking-wide leading-[1.5]">
        {stat.label}
      </div>
    </motion.div>
  );
}

function Counter({
  value,
  suffix = "",
  inView,
  delay = 0,
}: {
  value: number;
  suffix?: string;
  inView: boolean;
  delay?: number;
}) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.floor(latest));
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, value, {
      duration: 1.2,
      delay,
      ease: [0.17, 0.55, 0.55, 1],
    });
    return () => controls.stop();
  }, [inView, value, delay, count]);

  useEffect(() => {
    return rounded.on("change", (latest) => {
      if (ref.current) ref.current.textContent = String(latest);
    });
  }, [rounded]);

  return (
    <div
      className="font-display font-extrabold text-navy leading-none tracking-[-2px]"
      style={{ fontSize: "clamp(36px, 3.5vw, 52px)" }}
    >
      <span ref={ref}>0</span>
      {suffix && <span className="text-accent">{suffix}</span>}
    </div>
  );
}