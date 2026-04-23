"use client";

import { useEffect, useRef, useState } from "react";

type Step = {
  num: string;
  title: string;
  desc: string;
  image: string;
};

const STEPS: Step[] = [
  {
    num: "01",
    title: "Discovery",
    desc: "We get deep into your goals, constraints, and definition of success before writing a single line of code. No assumptions, no guesswork.",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
  },
  {
    num: "02",
    title: "Architecture",
    desc: "We design the technical foundation — stack, infrastructure, and data model — built for your scale targets from day one, not retrofitted later.",
    image:
      "https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?auto=format&fit=crop&w=1200&q=80",
  },
  {
    num: "03",
    title: "Build & Iterate",
    desc: "Agile delivery in short cycles. You see real progress every week — not a big reveal at the end of a three-month contract.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
  },
  {
    num: "04",
    title: "Launch & Scale",
    desc: "We don't disappear at go-live. Ongoing support, monitoring, and iteration are built into every engagement from the start.",
    image:
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [step, setStep] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 600);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const section = sectionRef.current;
    if (!section) return;

    const update = () => {
      const rect = section.getBoundingClientRect();
      const navH = 76;
      const total = section.offsetHeight - (window.innerHeight - navH);
      if (total <= 0) return;
      const scrolled = -(rect.top - navH);
      const progress = Math.max(0, Math.min(1, scrolled / total));
      const raw = progress * STEPS.length;
      const current = Math.min(STEPS.length - 1, Math.floor(raw));
      setStep(current);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [isMobile]);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="bg-[#111111] border-t border-white/10"
    >
      <div
        className={`process-track-wrap ${
          isMobile ? "h-auto pb-10" : "h-[380vh]"
        }`}
      >
        <div
          className={`
            ${
              isMobile
                ? "relative top-0 h-auto flex flex-col overflow-visible"
                : "sticky top-[76px] grid grid-cols-[300px_1fr] items-center gap-0 overflow-hidden"
            }
            max-[900px]:grid-cols-[200px_1fr]
          `}
          style={{
            height: isMobile ? "auto" : "calc(100vh - 68px)",
          }}
        >
          {/* LEFT: title + steps nav — FONDO #111111 */}
          <div
            className={`
              flex flex-col h-full justify-center bg-[#111111] gap-0
              ${isMobile ? "px-[4vw] py-10" : "pl-[5vw] pr-0 py-0"}
              max-[900px]:pl-[4vw]
            `}
          >
            <span className="text-[11px] uppercase tracking-[0.14em] text-accent-light font-medium mb-5">
              How we work
            </span>
            <div className="font-display text-[32px] font-extrabold tracking-[-1.5px] text-white leading-[1.08] mb-10 max-[900px]:text-2xl">
              From brief
              <br />
              to launch.
              <div className="w-12 h-[3px] bg-accent-light mt-4" />
            </div>

            {!isMobile && (
              <div className="flex flex-col gap-0">
                {STEPS.map((s, i) => {
                  const active = i === step;
                  return (
                    <div
                      key={s.num}
                      onClick={() => setStep(i)}
                      className={`
                        flex items-center gap-3.5 py-3.5 cursor-pointer pl-5
                        border-l-2 transition-colors duration-300
                        ${active ? "border-accent" : "border-white/10"}
                      `}
                    >
                      <span
                        className={`text-[11px] font-semibold tracking-[0.1em] min-w-5 transition-colors duration-300 ${
                          active ? "text-accent" : "text-[#c8d7ff]/30"
                        }`}
                      >
                        {s.num}
                      </span>
                      <span
                        className={`font-display text-[15px] font-semibold transition-colors duration-300 ${
                          active ? "text-white" : "text-[#c8d7ff]/45"
                        }`}
                      >
                        {s.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* RIGHT: slides */}
          <div
            className={`
              ${
                isMobile
                  ? "relative h-auto overflow-visible"
                  : "relative h-full overflow-hidden"
              }
            `}
          >
            {STEPS.map((s, i) => {
              const isActive = i === step;
              const isPast = i < step;

              if (isMobile) {
                return (
                  <div
                    key={s.num}
                    className="relative mb-4 mx-2 rounded-2xl overflow-hidden min-h-[320px] flex flex-col justify-end"
                    style={{
                      position: "sticky",
                      top: `${64 + i * 10}px`,
                      background: "#111111",
                      zIndex: i + 1,
                    }}
                  >
                    <div
                      className="bg-photo"
                      style={{ backgroundImage: `url(${s.image})` }}
                    />
                    <div
                      className="absolute inset-0 z-[1]"
                      style={{
                        background:
                          "linear-gradient(135deg,rgba(17,17,17,.82),rgba(10,26,60,.78))",
                      }}
                    />
                    <div className="relative z-[2] bg-white/10 border border-white/15 rounded-2xl p-7 m-6">
                      <div className="font-display text-[64px] font-extrabold text-white/10 tracking-[-6px] leading-[0.9] mb-3">
                        {s.num}
                      </div>
                      <h3 className="font-display text-[22px] font-extrabold tracking-[-1px] text-white mb-4">
                        {s.title}
                      </h3>
                      <p className="text-sm text-[#c8d7ff]/70 leading-[1.75] font-light">
                        {s.desc}
                      </p>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={s.num}
                  className={`
                    absolute inset-0 flex items-center justify-center
                    pl-10 pr-[5vw]
                    transition-[transform,opacity] duration-700 ease-[cubic-bezier(.4,0,.2,1)]
                    bg-cover bg-center
                    ${
                      isActive
                        ? "translate-x-0 opacity-100"
                        : isPast
                        ? "-translate-x-full opacity-0"
                        : "translate-x-full opacity-100"
                    }
                  `}
                  style={{ background: "#111111" }}
                >
                  <div
                    className="bg-photo"
                    style={{ backgroundImage: `url(${s.image})` }}
                  />
                  <div
                    className="absolute inset-0 z-[1]"
                    style={{
                      background:
                        "linear-gradient(135deg,rgba(17,17,17,.82),rgba(10,26,60,.78))",
                    }}
                  />
                  <div className="bg-bg border border-border rounded-2xl p-14 max-w-[680px] w-full relative overflow-hidden z-[2] max-[900px]:p-9">
                    <span className="absolute top-0 left-0 right-0 h-[3px] bg-accent rounded-t-2xl" />
                    <div className="font-display text-[120px] font-extrabold text-border tracking-[-6px] leading-[0.9] mb-3 max-[900px]:text-[80px]">
                      {s.num}
                    </div>
                    <h3 className="font-display text-4xl font-extrabold tracking-[-1px] text-navy mb-4 max-[900px]:text-[26px]">
                      {s.title}
                    </h3>
                    <p className="text-base text-muted leading-[1.75] font-light max-w-[440px]">
                      {s.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}