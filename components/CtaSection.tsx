"use client";

import { useState } from "react";

type CompanyType = "Startup" | "SMB" | "Enterprise" | "Agency";
type Timing = "ASAP" | "1–3 months" | "3–6 months" | "Just exploring";

const COMPANY_TYPES: CompanyType[] = ["Startup", "SMB", "Enterprise", "Agency"];

const INDUSTRY_MAP: Record<CompanyType, string[]> = {
  Startup: ["SaaS / Software", "Fintech", "HealthTech", "EdTech", "E-commerce", "Marketplace", "Other"],
  SMB: ["Retail & E-commerce", "Restaurants & Hospitality", "Professional Services", "Healthcare", "Real Estate", "Logistics", "Other"],
  Enterprise: ["Financial Services", "Healthcare & Pharma", "Manufacturing", "Retail & CPG", "Telecom", "Government", "Other"],
  Agency: ["Digital Agency", "Creative Studio", "Marketing Firm", "Design Consultancy", "PR Agency", "Other"],
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

type SubmitState = "idle" | "loading" | "success" | "error";

export default function CtaSection() {
  const [step, setStep] = useState(0);
  const [companyType, setCompanyType] = useState<CompanyType | null>(null);
  const [industry, setIndustry] = useState<string | null>(null);
  const [services, setServices] = useState<string[]>([]);
  const [timing, setTiming] = useState<Timing | null>(null);

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");

  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

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

  const handleSubmit = async () => {
    if (!name || !email) {
      setErrorMsg("Please fill in your name and email.");
      return;
    }

    setSubmitState("loading");
    setErrorMsg("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          role,
          company,
          email,
          companyType,
          industry,
          services,
          timing,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitState("success");
      } else {
        setSubmitState("error");
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        console.error("Submit error:", data);
      }
    } catch (err) {
      setSubmitState("error");
      setErrorMsg("Network error. Please check your connection.");
      console.error(err);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-20 px-[5vw] bg-[#060C18] overflow-hidden max-[600px]:py-14 max-[600px]:px-[4vw]"
    >
      <div
        className="absolute -bottom-48 left-1/2 -translate-x-1/2 w-[700px] h-[500px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(74,111,232,.3) 0%, transparent 70%)" }}
      />

      <div className="reveal relative z-[3] grid grid-cols-2 gap-20 items-start max-[900px]:grid-cols-1 max-[900px]:gap-10">
        <div className="max-w-[720px]">
          <span className="sec-tag text-accent-light">Ready to build?</span>
          <h2 className="font-display text-white text-[clamp(34px,4.2vw,58px)] leading-[1.08] font-extrabold tracking-[-1.2px] mt-3 max-w-[720px] max-[900px]:max-w-[620px] max-[600px]:text-[clamp(28px,7vw,40px)]">
            Let&apos;s turn your roadmap <br className="max-[600px]:hidden" />
            into a product.
          </h2>
          <div className="w-12 h-[3px] bg-accent-light mt-5 mb-5 rounded-full" />
          <p className="text-white/85 text-base leading-[1.8] font-light max-w-[420px]">
            Tell us what you&apos;re building and we&apos;ll match you with the right team
            and service — in minutes.
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-9 px-8 max-[600px]:p-7 max-[600px]:px-6">
          <div className="flex gap-1.5 mb-7">
            {progressDots.map((state, i) => (
              <div
                key={i}
                className={`h-[3px] rounded-[3px] flex-1 transition-colors duration-300 ${
                  state === "done" ? "bg-accent-light" : state === "active" ? "bg-accent" : "bg-white/15"
                }`}
              />
            ))}
          </div>

          {step === 0 && (
            <div>
              <QuizQuestion>What type of company are you?</QuizQuestion>
              <QuizOptions>
                {COMPANY_TYPES.map((t) => (
                  <QuizOption key={t} selected={companyType === t} onClick={() => { setCompanyType(t); advance(1); }}>
                    {t}
                  </QuizOption>
                ))}
              </QuizOptions>
              <QuizNav label="1 of 4" />
            </div>
          )}

          {step === 1 && companyType && (
            <div>
              <QuizQuestion>What does your company do?</QuizQuestion>
              <QuizOptions>
                {INDUSTRY_MAP[companyType].map((i) => (
                  <QuizOption key={i} selected={industry === i} onClick={() => { setIndustry(i); advance(2); }}>
                    {i}
                  </QuizOption>
                ))}
              </QuizOptions>
              <QuizNav label="2 of 4" />
            </div>
          )}

          {step === 2 && (
            <div>
              <QuizQuestion>What do you need?</QuizQuestion>
              <div className="text-xs text-[#c8d7ff]/40 mb-3.5 -mt-3">You can select more than one</div>
              <QuizOptions>
                {SERVICES.map((s) => (
                  <QuizOption key={s} selected={services.includes(s)} onClick={() => toggleService(s)}>
                    {s}
                  </QuizOption>
                ))}
              </QuizOptions>
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/30 tracking-[0.08em]">3 of 4</span>
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

          {step === 3 && (
            <div>
              <QuizQuestion>When do you want to start?</QuizQuestion>
              <QuizOptions>
                {TIMINGS.map((t) => (
                  <QuizOption key={t} selected={timing === t} onClick={() => { setTiming(t); advance(4); }}>
                    {t}
                  </QuizOption>
                ))}
              </QuizOptions>
              <QuizNav label="4 of 4" />
            </div>
          )}

          {step === 4 && (
            <div>
              {submitState === "success" ? (
                <div className="text-center py-6">
                  <div className="text-5xl mb-4">✓</div>
                  <div className="font-display text-xl font-bold text-white mb-2">
                    Thanks, {name.split(" ")[0] || "we got it"}!
                  </div>
                  <p className="text-sm text-[#c8d7ff]/70 leading-[1.6]">
                    Your message is on its way. We&apos;ll reach out within 24 hours.
                  </p>
                </div>
              ) : (
                <>
                  <div className="font-display text-lg font-bold text-white mb-2">
                    {timing ? RESULT_TITLES[timing] : "Let's make it happen."}
                  </div>
                  <p className="text-sm text-[#c8d7ff]/60 mb-6 leading-[1.6]">
                    You need help with {services.length ? services.join(", ") : "your project"}. Leave your details
                    and we&apos;ll reach out within 24 hours.
                  </p>
                  <div className="flex flex-col gap-3 mb-5">
                    <div className="grid grid-cols-2 gap-2.5 max-[600px]:grid-cols-1">
                      <QuizInput placeholder="Your name *" value={name} onChange={(e) => setName(e.target.value)} />
                      <QuizInput placeholder="Your role / title" value={role} onChange={(e) => setRole(e.target.value)} />
                    </div>
                    <QuizInput placeholder="Company name" value={company} onChange={(e) => setCompany(e.target.value)} />
                    <QuizInput type="email" placeholder="Work email *" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>

                  {errorMsg && (
                    <div className="text-xs text-red-400 mb-3 bg-red-500/10 border border-red-500/20 px-3 py-2 rounded-md">
                      {errorMsg}
                    </div>
                  )}

                  <button
                    onClick={handleSubmit}
                    disabled={submitState === "loading"}
                    className={`w-full bg-accent-light text-navy text-[15px] font-semibold py-3.5 rounded-full border-0 cursor-pointer font-sans transition-opacity ${
                      submitState === "loading" ? "opacity-70 cursor-wait" : "hover:opacity-85"
                    }`}
                  >
                    {submitState === "loading" ? "Sending..." : "Schedule a Call →"}
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

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
      className={`border text-sm font-normal px-[18px] py-2 rounded-full cursor-pointer transition-all ${
        selected
          ? "bg-accent border-accent text-white font-medium"
          : "bg-white/5 border-white/15 text-white/75 hover:bg-accent-light/15 hover:border-accent-light/40 hover:text-white"
      }`}
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