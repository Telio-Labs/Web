"use client";

import { motion } from "motion/react";
import { useEffect, useRef } from "react";

type Service = {
  tag: string;
  title: string;
  value: string;
  image: string;
  overlay: string;
};

const SERVICES: Service[] = [
  {
    tag: "Engineering",
    title: "Custom Software Development",
    value: "Software built around your business — not the other way around.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
    overlay: "rgba(6,12,24,.85), rgba(6,12,24,.92)",
  },
  {
    tag: "Mobile",
    title: "Mobile Apps",
    value: "iOS & Android apps people actually use — built for retention, not just launch.",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=800&q=80",
    overlay: "rgba(13,31,60,.85), rgba(13,31,60,.92)",
  },
  {
    tag: "Web",
    title: "Web Platforms & Digital Experiences",
    value: "Fast, conversion-ready platforms that scale without breaking.",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=800&q=80",
    overlay: "rgba(17,34,68,.85), rgba(17,34,68,.92)",
  },
  {
    tag: "Cloud",
    title: "DevOps & Cloud Infrastructure",
    value: "Ship faster. Break less. Scale without surprises.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    overlay: "rgba(10,37,96,.85), rgba(10,37,96,.92)",
  },
  {
    tag: "Data",
    title: "Database Engineering & Optimization",
    value: "Your data, fast and clean — no matter how much you grow.",
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=800&q=80",
    overlay: "rgba(15,30,80,.85), rgba(15,30,80,.92)",
  },
  {
    tag: "Security",
    title: "Cybersecurity Solutions",
    value: "Protect what you've built. Stay compliant. Sleep better.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
    overlay: "rgba(26,31,82,.85), rgba(26,31,82,.92)",
  },
  {
    tag: "AI & ML",
    title: "Custom AI & ML Solutions",
    value: "Models, predictions, and intelligent systems built for your specific data and business outcomes.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
    overlay: "rgba(4,8,32,.85), rgba(16,8,48,.92)",
  },
  {
    tag: "Agentic AI",
    title: "Agentic AI Systems",
    value: "AI that doesn't just answer — it acts. Autonomous systems that execute tasks, make decisions, and get things done.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
    overlay: "rgba(8,4,40,.85), rgba(24,8,60,.92)",
  },
  {
    tag: "Social Media & Paid Ads",
    title: "Digital Marketing",
    value: "More leads. Lower CAC. Results you can actually measure.",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80",
    overlay: "rgba(59,31,110,.85), rgba(59,31,110,.92)",
  },
];

const SPEED = 0.6;

export default function ServicesTicker() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const state = useRef({
    offset: 0,
    paused: false,
    dragging: false,
    dragStartX: 0,
    dragStartOffset: 0,
  });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf = 0;

    const getHalfWidth = () => track.scrollWidth / 2;

    const loop = () => {
      const s = state.current;
      if (!s.paused && !s.dragging) {
        s.offset += SPEED;
        const half = getHalfWidth();
        if (s.offset >= half) s.offset -= half;
      }
      track.style.transform = "translateX(-" + s.offset + "px)";
      raf = requestAnimationFrame(loop);
    };

    const onEnter = () => (state.current.paused = true);
    const onLeave = () => {
      if (!state.current.dragging) state.current.paused = false;
    };

    const onMouseDown = (e: MouseEvent) => {
      state.current.dragging = true;
      state.current.paused = true;
      state.current.dragStartX = e.clientX;
      state.current.dragStartOffset = state.current.offset;
      track.classList.add("cursor-grabbing");
    };

    const onMouseUp = () => {
      if (!state.current.dragging) return;
      state.current.dragging = false;
      track.classList.remove("cursor-grabbing");
      state.current.paused = false;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!state.current.dragging) return;
      const dx = state.current.dragStartX - e.clientX;
      let next = state.current.dragStartOffset + dx;
      const half = getHalfWidth();
      if (next < 0) next += half;
      if (next >= half) next -= half;
      state.current.offset = next;
    };

    let touchStartX = 0;
    let touchStartOffset = 0;

    const onTouchStart = (e: TouchEvent) => {
      state.current.paused = true;
      touchStartX = e.touches[0].clientX;
      touchStartOffset = state.current.offset;
    };

    const onTouchMove = (e: TouchEvent) => {
      const dx = touchStartX - e.touches[0].clientX;
      let next = touchStartOffset + dx;
      const half = getHalfWidth();
      if (next < 0) next += half;
      if (next >= half) next -= half;
      state.current.offset = next;
    };

    const onTouchEnd = () => {
      state.current.paused = false;
    };

    track.addEventListener("mouseenter", onEnter);
    track.addEventListener("mouseleave", onLeave);
    track.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mousemove", onMouseMove);
    track.addEventListener("touchstart", onTouchStart, { passive: true });
    track.addEventListener("touchmove", onTouchMove, { passive: true });
    track.addEventListener("touchend", onTouchEnd);

    loop();

    return () => {
      cancelAnimationFrame(raf);
      track.removeEventListener("mouseenter", onEnter);
      track.removeEventListener("mouseleave", onLeave);
      track.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mousemove", onMouseMove);
      track.removeEventListener("touchstart", onTouchStart);
      track.removeEventListener("touchmove", onTouchMove);
      track.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  const doubled = [...SERVICES, ...SERVICES];

  return (
    <section id="services-all" className="py-16 bg-bg border-t border-border overflow-hidden max-[600px]:py-12">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        className="flex flex-col items-center text-center px-[5vw] pb-10 max-[600px]:px-[4vw] max-[600px]:pb-8"
      >
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="sec-tag"
        >
          What we deliver
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-display font-extrabold text-navy leading-[1.08] tracking-[-1.5px] mt-0 mb-0 text-center"
          style={{ fontSize: "clamp(30px, 3.5vw, 48px)" }}
        >
          One partner.
          <br />
          Every layer.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="w-12 h-[3px] bg-accent mt-4 origin-center"
        />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-[13px] text-muted flex items-center gap-2 mt-6"
        >
          <span className="inline-block w-8 h-px bg-muted" />
          Drag to explore
          <span className="inline-block w-8 h-px bg-muted" />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="overflow-hidden relative"
      >
        <div
          ref={trackRef}
          className="flex gap-4 pb-2 cursor-grab select-none will-change-transform"
        >
          {doubled.map((s, i) => {
            const cardBg = "linear-gradient(" + s.overlay + "), url('" + s.image + "') center/cover no-repeat";
            return (
              <motion.div
                key={i}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 300, damping: 20 },
                }}
                className="flex-[0_0_320px] h-[420px] rounded-2xl p-9 px-8 flex flex-col justify-between relative overflow-hidden text-white group max-[900px]:flex-[0_0_280px] max-[900px]:h-[380px] max-[600px]:flex-[0_0_260px] max-[600px]:h-[340px] max-[600px]:p-7 max-[600px]:rounded-2xl"
                style={{ background: cardBg }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent-light/0 to-accent-light/0 group-hover:from-accent-light/10 group-hover:to-transparent transition-all duration-500 pointer-events-none" />

                <div className="relative z-[1]">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="text-[11px] font-semibold tracking-[0.1em] uppercase mb-5 inline-block px-3 py-1 rounded-full bg-white/10 border border-white/15 backdrop-blur-sm"
                    style={{ color: "#A8BEFF" }}
                  >
                    {s.tag}
                  </motion.div>

                  <h3 className="font-display text-[28px] font-extrabold tracking-[-0.8px] leading-[1.1] mb-4 max-[600px]:text-[22px]">
                    {s.title}
                  </h3>

                  <p className="text-sm leading-[1.7] font-light opacity-75 max-w-[240px]">
                    {s.value}
                  </p>
                </div>

                <motion.a
                  href="#contact"
                  whileHover={{
                    rotate: 45,
                    scale: 1.1,
                    backgroundColor: "rgba(255,255,255,0.95)",
                    color: "#060C18",
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="relative z-[1] w-12 h-12 rounded-full bg-white/15 flex items-center justify-center text-lg self-end border border-white/20"
                >
                  ↗
                </motion.a>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
