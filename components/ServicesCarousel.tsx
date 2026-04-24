"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

type Item = {
  title: string;
  label: string;
  desc: string;
  image: string;
  gradient: string;
};

const ITEMS: Item[] = [
  {
    title: "Custom\nSoftware",
    label: "Custom Software",
    desc: "We design and build software tailored to your business — scalable, maintainable, and built to grow with you from day one.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80",
    gradient: "linear-gradient(150deg, rgba(6,12,24,.78), rgba(13,32,64,.82))",
  },
  {
    title: "Mobile\nApps",
    label: "Mobile Apps",
    desc: "iOS and Android apps built for performance and retention — from MVP to fully scaled consumer or enterprise products.",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1600&q=80",
    gradient: "linear-gradient(150deg, rgba(8,20,40,.78), rgba(15,42,82,.82))",
  },
  {
    title: "Web\nPlatforms",
    label: "Web Platforms",
    desc: "High-performance web platforms and digital experiences designed to convert users, reduce friction, and scale without limits.",
    image:
      "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=1600&q=80",
    gradient:
      "linear-gradient(150deg, rgba(10,26,56,.78), rgba(22,50,102,.82))",
  },
  {
    title: "Social Media\n& Paid Ads",
    label: "Digital Marketing",
    desc: "We run social media and paid advertising campaigns focused on one thing — results. More leads, lower cost per acquisition, measurable growth.",
    image:
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=1600&q=80",
    gradient:
      "linear-gradient(150deg, rgba(20,16,58,.78), rgba(36,24,88,.82))",
  },
  {
    title: "Custom AI &\nML Solutions",
    label: "AI & ML",
    desc: "Models, predictions, and intelligent systems built for your specific data — not generic tools. Real AI for real business outcomes.",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1600&q=80",
    gradient: "linear-gradient(150deg, rgba(4,8,32,.85), rgba(16,8,48,.88))",
  },
  {
    title: "Agentic AI\nSystems",
    label: "Agentic AI",
    desc: "AI that doesn't just answer — it acts. Autonomous systems that execute tasks, make decisions, and get things done on your behalf.",
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1600&q=80",
    gradient: "linear-gradient(150deg, rgba(8,4,40,.85), rgba(24,8,60,.88))",
  },
];

const contentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export default function ServicesCarousel() {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (hovered) return;
    const t = setInterval(() => {
      setActive((prev) => (prev + 1) % ITEMS.length);
    }, 4000);
    return () => clearInterval(t);
  }, [hovered]);

  return (
    <section
      id="services"
      className="services-section bg-bg overflow-hidden p-0"
    >
      <div
        className="reveal flex p-4 max-[900px]:h-[70vh] max-[900px]:p-2.5 max-[600px]:h-[88vh] max-[600px]:p-2"
        style={{ height: "calc(100vh - 68px)" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="flex gap-1.5 w-full">
          {ITEMS.map((item, i) => {
            const isActive = i === active;
            return (
              <motion.button
                key={i}
                onClick={() => setActive(i)}
                layout
                initial={false}
                animate={{
                  flex: isActive ? 10 : 1,
                }}
                transition={{
                  type: "spring",
                  stiffness: 140,
                  damping: 22,
                  mass: 0.9,
                }}
                className={`
                  relative overflow-hidden cursor-pointer text-left
                  rounded-2xl flex flex-col justify-end bg-navy
                  border-0 outline-none appearance-none
                  focus:outline-none focus-visible:outline-none
                  focus:ring-0 focus-visible:ring-0
                  max-[900px]:rounded-xl max-[600px]:rounded-[10px]
                  ${!isActive ? "min-w-[60px] max-[600px]:min-w-[48px]" : ""}
                `}
                style={{
                  WebkitTapHighlightColor: "transparent",
                  background: "#060C18",
                }}
              >
                {/* Imagen de fondo con zoom sutil al activar */}
                <motion.div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  animate={{ scale: isActive ? 1.05 : 1 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  style={{ backgroundImage: `url(${item.image})` }}
                />

                {/* Overlay gradient */}
                <div
                  className="absolute inset-0 z-[1]"
                  style={{ background: item.gradient }}
                />

                {/* Formas decorativas */}
                <AnimatePresence>
                  {isActive && (
                    <>
                      <motion.div
                        key="shape-1"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="absolute -top-20 -right-20 w-[360px] h-[360px] rounded-full border border-white/5 z-[1] pointer-events-none"
                      />
                      <motion.div
                        key="shape-2"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="absolute -top-5 -right-5 w-[180px] h-[180px] rounded-full border border-white/5 z-[1] pointer-events-none"
                      />
                    </>
                  )}
                </AnimatePresence>

                {/* Arrow cuando está colapsado */}
                <AnimatePresence>
                  {!isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute top-8 left-1/2 -translate-x-1/2 z-[2] w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-white/40 text-sm hover:border-accent-light/40 hover:text-accent-light transition-colors"
                    >
                      →
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Label vertical cuando está colapsado */}
                <AnimatePresence>
                  {!isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute bottom-12 left-1/2 z-[2] whitespace-nowrap font-display text-sm font-semibold text-white/40 tracking-[0.06em] origin-center pointer-events-none"
                      style={{ transform: "translateX(-50%) rotate(-90deg)" }}
                    >
                      {item.label}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Contenido activo */}
                <AnimatePresence mode="wait">
                  {isActive && (
                    <motion.div
                      key={`content-${i}`}
                      variants={contentVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className="absolute inset-0 z-[2] flex flex-col justify-end items-start text-left p-16 max-[900px]:p-9 max-[600px]:p-7"
                    >
                      <motion.div
                        variants={itemVariants}
                        className="text-xs font-semibold text-accent-light/60 tracking-[0.16em] mb-5"
                      >
                        0{i + 1}
                      </motion.div>

                      <motion.h3
                        variants={itemVariants}
                        className="font-display font-extrabold tracking-[-2px] leading-[1.05] mb-5 text-white max-w-[640px] whitespace-pre-line text-left"
                        style={{ fontSize: "clamp(36px, 4.5vw, 72px)" }}
                      >
                        {item.title}
                      </motion.h3>

                      <motion.p
                        variants={itemVariants}
                        className="text-[#c8d7ff]/80 leading-[1.75] max-w-[500px] font-light mb-9 text-left max-[900px]:text-sm max-[900px]:mb-6 max-[600px]:max-w-full max-[600px]:text-[13px] max-[600px]:mb-5"
                        style={{ fontSize: "clamp(14px, 1.2vw, 17px)" }}
                      >
                        {item.desc}
                      </motion.p>

                      <motion.a
                        variants={itemVariants}
                        href="#contact"
                        whileHover={{ y: -2, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="inline-flex items-center gap-2.5 bg-accent-light text-navy font-sans font-medium text-sm px-7 py-3 rounded-full w-fit max-[900px]:text-[13px] max-[900px]:px-[22px] max-[900px]:py-[11px] max-[600px]:text-[13px] max-[600px]:py-2.5 max-[600px]:px-5"
                      >
                        Learn More →
                      </motion.a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Dots */}
      <div className="flex gap-2 px-[5vw] pt-5 items-center bg-bg max-[600px]:px-[4vw] max-[600px]:pt-3">
        {ITEMS.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => setActive(i)}
            whileHover={{ scaleY: 2 }}
            animate={{
              width: i === active ? 36 : 20,
              backgroundColor: i === active ? "#4A6FE8" : "#E2E8F0",
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="h-0.5 rounded-[2px] cursor-pointer border-0 outline-none focus:outline-none"
            style={{ WebkitTapHighlightColor: "transparent" }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}