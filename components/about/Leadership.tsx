"use client";

import { motion } from "motion/react";

type Leader = {
  name: string;
  role: string;
  bio: string;
  tags: string[];
  image: string;
  linkedin: string;
};

const LEADERS: Leader[] = [
  {
    name: "Elio Montes",
    role: "Chief Executive Officer",
    bio: "20+ years building digital products and leading technology teams. Founded TelioLabs to bring senior-level execution to organizations of every size.",
    tags: ["Product Strategy", "Software", "Growth"],
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80",
    linkedin: "https://linkedin.com/in/eliomontes",
  },
  {
    name: "Edmundo Rodriguez",
    role: "Chief Marketing Officer",
    bio: "Senior engineering leader with deep expertise in cloud infrastructure, scalable systems, and end-to-end product development across enterprise environments.",
    tags: ["Engineering", "Cloud", "Architecture"],
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=600&q=80",
    linkedin: "https://linkedin.com/in/edmundorodriguez",
  },
  {
    name: "Hugo Soliz",
    role: "Chief Technology Officer",
    bio: "Senior engineering leader with deep expertise in cloud infrastructure, scalable systems, and end-to-end product development across enterprise environments.",
    tags: ["Engineering", "Cloud", "Architecture"],
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80",
    linkedin: "https://linkedin.com/in/hugosoliz",
  },
  {
    name: "Luis Barrientos",
    role: "Senior Software Architect",
    bio: "Seasoned software architect with deep expertise in system design, scalable architectures, and engineering best practices across complex enterprise environments.",
    tags: ["Architecture", "System Design", "Engineering"],
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80",
    linkedin: "https://linkedin.com/in/luisbarrientos",
  },
];

function LinkedInIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#A8BEFF">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function LeaderCard({ leader, index }: { leader: Leader; index: number }) {
  const cardClass = "rounded-[20px] overflow-hidden relative h-[480px] cursor-pointer bg-[#060C18] group max-[900px]:h-[420px]";
  const overlayClass = "absolute inset-0 z-[1] bg-gradient-to-t from-[#060C18]/95 via-[#060C18]/40 to-transparent group-hover:from-[#060C18]/98 group-hover:via-[#060C18]/70 group-hover:to-[#060C18]/20 transition-all duration-500";
  const linkClass = "w-8 h-8 rounded-lg bg-accent-light/15 border border-accent-light/20 flex items-center justify-center flex-shrink-0 hover:bg-accent-light/30 transition-colors";
  const bioWrapClass = "overflow-hidden max-h-0 opacity-0 group-hover:max-h-[120px] group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(.4,0,.2,1)] max-[900px]:max-h-[120px] max-[900px]:opacity-100";
  const tagsWrapClass = "flex flex-wrap gap-1.5 mt-0 max-h-0 opacity-0 group-hover:mt-3.5 group-hover:max-h-[60px] group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(.4,0,.2,1)] delay-75 max-[900px]:mt-3.5 max-[900px]:max-h-[60px] max-[900px]:opacity-100";
  const tagClass = "bg-accent-light/15 border border-accent-light/20 text-accent-light text-[11px] font-medium px-3 py-1 rounded-full";

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={cardClass}
    >
      <motion.div
        className="absolute inset-0 bg-cover z-0"
        style={{ backgroundImage: "url(" + leader.image + ")", backgroundPosition: "center top" }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      />
      <div className={overlayClass} />
      <div className="absolute bottom-0 left-0 right-0 z-[2] p-8 px-7">
        <div className="flex items-center justify-between mb-1">
          <div className="font-display text-[22px] font-extrabold text-white tracking-[-0.5px]">
            {leader.name}
          </div>
          <a href={leader.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn" className={linkClass}>
            <LinkedInIcon />
          </a>
        </div>
        <div className="text-xs font-semibold text-accent-light tracking-[0.1em] uppercase mb-4">
          {leader.role}
        </div>
        <div className={bioWrapClass}>
          <p className="text-[13px] text-[#c8d7ff]/70 leading-[1.65] font-light">
            {leader.bio}
          </p>
        </div>
        <div className={tagsWrapClass}>
          {leader.tags.map((t) => (
            <span key={t} className={tagClass}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Leadership() {
  return (
    <section id="team" className="py-20 px-[5vw] bg-bg border-t border-border max-[600px]:py-14 max-[600px]:px-[4vw]">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.65 }}
      >
        <span className="sec-tag">Leadership</span>
        <h2 className="sec-title">
          The people behind
          <br />
          the work.
        </h2>
      </motion.div>
      <div className="grid grid-cols-4 gap-5 mt-14 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1">
        {LEADERS.map((leader, i) => (
          <LeaderCard key={i} leader={leader} index={i} />
        ))}
      </div>
    </section>
  );
}
