"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

type Audience = {
  num: string;
  title: string;
  types: string[];
  image: string;
  gradient: string;
  bg: string;
};

const AUDIENCES: Audience[] = [
  {
    num: "01",
    title: "Startups &\nFounders",
    types: [
      "SaaS",
      "Fintech",
      "HealthTech",
      "EdTech",
      "Marketplaces",
      "Mobile-first",
      "Early-stage MVPs",
    ],
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80",
    gradient:
      "linear-gradient(135deg, rgba(6,12,24,.75), rgba(13,31,60,.82))",
    bg: "#060C18",
  },
  {
    num: "02",
    title: "Enterprises\n& SMBs",
    types: [
      "Restaurants & Hospitality",
      "Retail & E-commerce",
      "Professional Services",
      "Healthcare",
      "Logistics",
      "Real Estate",
      "Corporate",
    ],
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
    gradient:
      "linear-gradient(135deg, rgba(10,22,40,.75), rgba(17,34,68,.82))",
    bg: "#0A1628",
  },
  {
    num: "03",
    title: "Agencies &\nStudios",
    types: [
      "Digital Agencies",
      "Creative Studios",
      "Marketing Firms",
      "Design Consultancies",
      "White-label Partners",
    ],
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1600&q=80",
    gradient:
      "linear-gradient(135deg, rgba(13,16,48,.75), rgba(26,31,82,.82))",
    bg: "#0D1030",
  },
];

const STICKY_TOPS = ["top-[84px]", "top-[100px]", "top-[116px]"];
const STICKY_TOPS_MOBILE = [
  "max-[600px]:top-[68px]",
  "max-[600px]:top-[80px]",
  "max-[600px]:top-[92px]",
];

export default function Audience() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <section
      id="audience"
      className="audience bg-bg pt-14 border-t border-border"
    >
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
        className="audience-header px-[5vw] pb-8 max-[600px]:px-[4vw] max-[600px]:pb-7"
      >
        <span className="sec-tag">Who we work with</span>
        <h2 className="sec-title">
          Built for every stage.
          <br />
          Every industry.
        </h2>
      </motion.div>

      <div
        ref={containerRef}
        className="flex flex-col gap-0 px-4 pb-4 max-[600px]:px-2 max-[600px]:pb-2"
      >
        {AUDIENCES.map((a, i) => (
          <AudienceCard
            key={a.num}
            audience={a}
            index={i}
            total={AUDIENCES.length}
            containerRef={containerRef}
          />
        ))}
      </div>
    </section>
  );
}

type AudienceCardProps = {
  audience: Audience;
  index: number;
  total: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
};

function AudienceCard({ audience, index, total }: AudienceCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start start", "end start"],
  });

  const isLast = index === total - 1;
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    isLast ? [1, 1] : [1, 0.92]
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 1],
    isLast ? [1, 1] : [1, 0.75]
  );
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
        delay: index * 0.05,
      }}
      style={{ scale, opacity, background: audience.bg }}
      className={`
        relative sticky overflow-hidden cursor-pointer
        flex items-center h-[400px] px-[5vw] py-13 rounded-[20px] mb-4
        max-[900px]:h-[380px] max-[900px]:px-[5vw] max-[900px]:py-9
        max-[600px]:h-[340px] max-[600px]:px-[4vw] max-[600px]:py-8 max-[600px]:rounded-2xl
        ${STICKY_TOPS[index]} ${STICKY_TOPS_MOBILE[index]}
        group
      `}
    >
      {/* Imagen de fondo con parallax */}
      <motion.div
        className="absolute inset-0 z-0 rounded-[20px] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${audience.image})`,
          y: imageY,
          scale: 1.15,
        }}
      />

      {/* Overlay gradient */}
      <div
        className="absolute inset-0 z-[1] rounded-[20px] transition-transform duration-700 ease-[cubic-bezier(.4,0,.2,1)] group-hover:scale-[1.01]"
        style={{ background: audience.gradient }}
      />

      {/* Contenido — ahora centrado verticalmente */}
      <div className="relative z-[3] w-full flex items-center justify-between gap-10">
        <div className="flex-1">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xs font-semibold text-white/35 tracking-[0.16em] mb-5 block"
          >
            {audience.num}
          </motion.span>

          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="font-display font-extrabold tracking-[-2.5px] leading-none text-white mb-7 whitespace-pre-line text-left max-[600px]:tracking-[-2px] max-[600px]:mb-5"
            style={{ fontSize: "clamp(40px, 6vw, 80px)" }}
          >
            {audience.title}
          </motion.h3>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.05,
                  delayChildren: 0.35,
                },
              },
            }}
            className="flex flex-wrap gap-2.5 max-[600px]:gap-2"
          >
            {audience.types.map((t) => (
              <motion.span
                key={t}
                variants={{
                  hidden: { opacity: 0, y: 10, scale: 0.95 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { duration: 0.4, ease: "easeOut" },
                  },
                }}
                className="bg-white/10 border border-white/15 text-white/80 text-[13px] font-normal px-4 py-1.5 rounded-full transition-colors duration-300 group-hover:bg-accent-light/15 group-hover:border-accent-light/30 group-hover:text-white max-[600px]:text-xs max-[600px]:px-[13px] max-[600px]:py-[5px]"
              >
                {t}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* CTA circular — centrado vertical */}
        <motion.a
          href="#contact"
          whileHover={{ rotate: 45, scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-xl text-navy flex-shrink-0 group-hover:bg-accent-light transition-colors max-[600px]:w-11 max-[600px]:h-11 max-[600px]:text-base"
        >
          ↗
        </motion.a>
      </div>
    </motion.div>
  );
}