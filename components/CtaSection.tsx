"use client";

import { useState } from "react";

type CompanyType = "Startup" | "SMB" | "Enterprise" | "Agency";
type Timing = "ASAP" | "1–3 months" | "3–6 months" | "Just exploring";

const COMPANY_TYPES: CompanyType[] = ["Startup", "SMB", "Enterprise", "Agency"];

const INDUSTRY_MAP: Record<CompanyType, string[]> = {
  Startup: [
    "SaaS / Software",
    "Fintech",
    "HealthTech",
    "EdTech",
    "E-commerce",
    "Marketplace",
    "Other",
  ],
  SMB: [
    "Retail & E-commerce",
    "Restaurants & Hospitality",
    "Professional Services",
    "Healthcare",
    "Real Estate",
    "Logistics",
    "Other",
  ],
  Enterprise: [
    "Financial Services",
    "Healthcare & Pharma",
    "Manufacturing",
    "Retail & CPG",
    "Telecom",
    "Government",
    "Other",
  ],
  Agency: [
    "Digital Agency",
    "Creative Studio",
    "Marketing Firm",
    "Design Consultancy",
    "PR Agency",
    "Other",
  ],
};

const SERVICES = [
  "Custom Software",
  "Mobile App",
  "Web Platform",
  "DevOps / Cloud",
  "Cybersecurity",
  "Digital Marketing",
  "Not sure yet",
];

const TIMINGS: Timing[] = ["ASAP", "1–3 months", "3–6 months", "Just exploring"];

const RESULT_TITLES: Record<Timing, string> = {
  ASAP: "Let's move fast.",
  "1–3 months": "Perfect timing.",
  "3–6 months": "Good to plan ahead.",
  "Just exploring": "No pressure — let's talk.",
};

export default function CtaSection() {
  const [step, setStep] = useState(0); // 0..3 steps + 4 = result
  const [companyType, setCompanyType] = useState<CompanyType | null>(null);
  const [industry, setIndustry] = useState<string | null>(null);
  const [services, setServices] = useState<string[]>([]);
  const [timing, setTiming] = useState<Timing | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const advance = (to: number) => setTimeout(() => setStep(to), 260);

  const toggleService = (s: string) => {
    setServices((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  };

  const progressDots = [0, 1, 2, 3].map((i) => {
    if (i < step) return "done";
    if (i === step) return "active";
    return "";
  });

  return (
    <section
      id="contact"
      className="relative py-20 px-[5vw] bg-[#060C18] overflow-hidden max-[600px]:py-14 max-[600px]:px-[4vw]"
    >
      {/* Glow */}
      <div
        className="absolute -bottom-48 left-1/2 -translate-x-1/2 w-[700px] h-[500px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse,rgba(74,111,232,.3) 0%,transparent 70%)",
        }}
      />

      <div className="reveal relative z-[3] grid grid-cols-2 gap-20 items-start max-[900px]:grid-cols-1 max-[900px]:gap-10">
        {/* LEFT copy */}
        <div>
          <span className="sec-tag text-accent-light">Ready to build?</span>
          <h2 className="sec-title text-white [&::after]:bg-accent-light max-[600px]:!text-[clamp(28px,7vw,40px)]">
            Let&apos;s turn your roadmap into a product.
          </h2>
          <p className="text-[#c8d7ff]/55 text-base leading-[1.7] font-light mt-4 max-w-[380px]">
            Tell us what you&apos;re building and we&apos;ll match you with the right team
            and service — in minutes.
          </p>
        </div>

        {/* RIGHT quiz card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-9 px-8 max-[600px]:p-7 max-[600px]:px-6">
          {/* Progress bar */}
          <div className="flex gap-1.5 mb-7">
            {progressDots.map((state, i) => (
              <div
                key={i}
                className={`h-[3px] rounded-[3px] flex-1 transition-colors duration-300 ${
                  state === "done"
                    ? "bg-accent-light"
                    : state === "active"
                    ? "bg-accent"
                    : "bg-white/15"
                }`}
              />
            ))}
          </div>

          {/* Step 0: Company type */}
          {step === 0 && (
            <div>
              <QuizQuestion>What type of company are you?</QuizQuestion>
              <QuizOptions>
                {COMPANY_TYPES.map((t) => (
                  <QuizOption
                    key={t}
                    selected={companyType === t}
                    onClick={() => {
                      setCompanyType(t);
                      advance(1);
                    }}
                  >
                    {t}
                  </QuizOption>
                ))}
              </QuizOptions>
              <QuizNav label="1 of 4" />
            </div>
          )}

          {/* Step 1: Industry */}
          {step === 1 && companyType && (
            <div>
              <QuizQuestion>What does your company do?</QuizQuestion>
              <QuizOptions>
                {INDUSTRY_MAP[companyType].map((i) => (
                  <QuizOption
                    key={i}
                    selected={industry === i}
                    onClick={() => {
                      setIndustry(i);
                      advance(2);
                    }}
                  >
                    {i}
                  </QuizOption>
                ))}
              </QuizOptions>
              <QuizNav label="2 of 4" />
            </div>
          )}

          {/* Step 2: Services (multi-select) */}
          {step === 2 && (
            <div>
              <QuizQuestion>What do you need?</QuizQuestion>
              <div className="text-xs text-[#c8d7ff]/40 mb-3.5 -mt-3">
                You can select more than one
              </div>
              <QuizOptions>
                {SERVICES.map((s) => (
                  <QuizOption
                    key={s}
                    selected={services.includes(s)}
                    onClick={() => toggleService(s)}
                  >
                    {s}
                  </QuizOption>
                ))}
              </QuizOptions>
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/30 tracking-[0.08em]">
                  3 of 4
                </span>
                <button
                  onClick={() => setStep(3)}
                  disabled={services.length === 0}
                  className="bg-accent-light text-navy text-sm font-semibold px-6 py-2.5 rounded-full border-0 cursor-pointer hover:opacity-85 disabled:opacity-30 disabled:cursor-default transition-opacity"
                >
                  Next →
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Timeline */}
          {step === 3 && (
            <div>
              <QuizQuestion>When do you want to start?</QuizQuestion>
              <QuizOptions>
                {TIMINGS.map((t) => (
                  <QuizOption
                    key={t}
                    selected={timing === t}
                    onClick={() => {
                      setTiming(t);
                      advance(4);
                    }}
                  >
                    {t}
                  </QuizOption>
                ))}
              </QuizOptions>
              <QuizNav label="4 of 4" />
            </div>
          )}

          {/* Result: contact form */}
          {step === 4 && (
            <div>
              <div className="font-display text-lg font-bold text-white mb-2">
                {timing ? RESULT_TITLES[timing] : "Let's make it happen."}
              </div>
              <p className="text-sm text-[#c8d7ff]/60 mb-6 leading-[1.6]">
                You need help with{" "}
                {services.length ? services.join(", ") : "your project"}. Leave
                your details and we&apos;ll reach out within 24 hours.
              </p>
              <div className="flex flex-col gap-3 mb-5">
                <div className="grid grid-cols-2 gap-2.5 max-[600px]:grid-cols-1">
                  <QuizInput placeholder="Your name" />
                  <QuizInput placeholder="Your role / title" />
                </div>
                <QuizInput placeholder="Company name" />
                <QuizInput type="email" placeholder="Work email" />
              </div>
              <button
                onClick={() => setSubmitted(true)}
                disabled={submitted}
                className={`w-full bg-accent-light text-navy text-[15px] font-semibold py-3.5 rounded-full border-0 cursor-pointer font-sans transition-opacity ${
                  submitted ? "opacity-70 cursor-default" : "hover:opacity-85"
                }`}
              >
                {submitted ? "✓ We'll be in touch soon!" : "Schedule a Call →"}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ─── Small internal presentational components ─── */

function QuizQuestion({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-display text-xl font-bold text-white mb-5 tracking-[-0.3px] max-[600px]:text-[17px]">
      {children}
    </div>
  );
}

function QuizOptions({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap gap-2.5 mb-6">{children}</div>;
}

function QuizOption({
  children,
  selected,
  onClick,
}: {
  children: React.ReactNode;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`
        border text-sm font-normal px-[18px] py-2 rounded-full cursor-pointer transition-all
        ${
          selected
            ? "bg-accent border-accent text-white font-medium"
            : "bg-white/5 border-white/15 text-white/75 hover:bg-accent-light/15 hover:border-accent-light/40 hover:text-white"
        }
      `}
    >
      {children}
    </div>
  );
}

function QuizNav({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-white/30 tracking-[0.08em]">{label}</span>
    </div>
  );
}

function QuizInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="bg-white/5 border border-white/15 text-white text-sm px-4 py-3 rounded-[10px] outline-none font-sans placeholder:text-white/30 focus:border-accent-light/50 transition-colors"
    />
  );
}
