"use client";

import { motion, AnimatePresence } from "motion/react";
import { useEffect, useRef, useState } from "react";

type CompanyType = "Startup" | "SMB" | "Enterprise" | "Agency";
type Timing = "ASAP" | "1–3 months" | "3–6 months" | "Just exploring";

const COMPANY_TYPES: CompanyType[] = ["Startup", "SMB", "Enterprise", "Agency"];

const SERVICES = [
  "Custom Software",
  "Mobile App",
  "Web Platform",
  "AI & ML",
  "Agentic AI",
  "DevOps / Cloud",
  "Cybersecurity",
  "Digital Marketing",
];

const TIMINGS: Timing[] = ["ASAP", "1–3 months", "3–6 months", "Just exploring"];

const SOURCES = [
  "Google / Search",
  "LinkedIn",
  "Instagram",
  "Facebook",
  "Referral from someone",
  "Other",
];

const RESULT_TITLES: Record<Timing, string> = {
  ASAP: "Let's move fast.",
  "1–3 months": "Perfect timing.",
  "3–6 months": "Good to plan ahead.",
  "Just exploring": "No pressure — let's talk.",
};

const MIN_FILL_TIME_MS = 3000;

type SubmitState = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [step, setStep] = useState(0);
  const [companyType, setCompanyType] = useState<CompanyType | null>(null);
  const [services, setServices] = useState<string[]>([]);
  const [timing, setTiming] = useState<Timing | null>(null);

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [source, setSource] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const mountedAt = useRef<number>(Date.now());

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  const advance = (to: number) => setTimeout(() => setStep(to), 260);

  const toggleService = (s: string) => {
    setServices((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  };

  const handleSubmit = async () => {
    if (honeypot) {
      setSubmitState("success");
      return;
    }
    const fillTime = Date.now() - mountedAt.current;
    if (fillTime < MIN_FILL_TIME_MS) {
      setSubmitState("success");
      return;
    }
    if (!fname || !email) {
      setErrorMsg("Please fill in your name and email.");
      return;
    }

    setSubmitState("loading");
    setErrorMsg("");

    const fullName = `${fname} ${lname}`.trim();

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fullName,
          role: "",
          company,
          email,
          phone,
          message,
          source,
          companyType,
          industry: "",
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
      }
    } catch (err) {
      setSubmitState("error");
      setErrorMsg("Network error. Please check your connection.");
      console.error(err);
    }
  };

  const progressDots = [0, 1, 2, 3].map((i) => {
    if (i < step) return "done";
    if (i === step) return "active";
    return "";
  });

  /* ─────── Success state ─────── */
  if (submitState === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-surface border border-border rounded-2xl p-12 text-center max-[600px]:p-8"
      >
        <div className="w-16 h-16 rounded-full bg-accent-dim border-2 border-accent/20 flex items-center justify-center mx-auto mb-5 text-accent text-3xl font-bold">
          ✓
        </div>
        <h3 className="font-display text-3xl font-extrabold text-navy tracking-[-0.6px] mb-3 max-[600px]:text-2xl">
          {timing && RESULT_TITLES[timing]
            ? RESULT_TITLES[timing]
            : "We'll be in touch."}
        </h3>
        <p className="text-[15px] text-muted leading-[1.7] max-w-[460px] mx-auto">
          Thanks {fname || "for reaching out"}! Check your inbox — we sent you a
          confirmation. A senior member of our team will contact you within 24
          hours.
        </p>
      </motion.div>
    );
  }

  /* ─────── Form ─────── */
  return (
    <div className="bg-surface border border-border rounded-2xl p-9 max-[900px]:p-7 max-[600px]:p-6">
      {/* Header */}
      <div className="mb-7 max-[600px]:mb-5">
        <span className="sec-tag">Get in touch</span>
        <h2
          className="font-display font-extrabold text-navy tracking-[-1px] leading-[1.1] mt-2"
          style={{ fontSize: "clamp(24px, 2.5vw, 36px)" }}
        >
          Tell us about
          <br />
          your project.
        </h2>
      </div>

      {/* Progress */}
      <div className="flex gap-1.5 mb-7 max-[600px]:mb-5">
        {progressDots.map((state, i) => (
          <div
            key={i}
            className={`h-[3px] rounded-[3px] flex-1 transition-colors duration-300 ${
              state === "done"
                ? "bg-accent"
                : state === "active"
                ? "bg-accent-light"
                : "bg-border"
            }`}
          />
        ))}
      </div>

      {/* Honeypot */}
      <div
        style={{
          position: "absolute",
          left: "-9999px",
          width: 1,
          height: 1,
          overflow: "hidden",
        }}
        aria-hidden="true"
      >
        <label>
          Don&apos;t fill this:
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </label>
      </div>

      <AnimatePresence mode="wait">
        {/* Step 0 — Company type */}
        {step === 0 && (
          <Panel key="s0">
            <Question>What type of company are you?</Question>
            <Sub>This helps us route you to the right team.</Sub>
            <Options>
              {COMPANY_TYPES.map((t) => (
                <Option
                  key={t}
                  selected={companyType === t}
                  onClick={() => {
                    setCompanyType(t);
                    advance(1);
                  }}
                >
                  {t}
                </Option>
              ))}
            </Options>
            <NavLabel label="Step 1 of 4" />
          </Panel>
        )}

        {/* Step 1 — Services (multi) */}
        {step === 1 && (
          <Panel key="s1">
            <Question>What do you need?</Question>
            <Sub>Select all that apply.</Sub>
            <Options>
              {SERVICES.map((s) => (
                <Option
                  key={s}
                  selected={services.includes(s)}
                  onClick={() => toggleService(s)}
                >
                  {s}
                </Option>
              ))}
            </Options>
            <div className="flex items-center justify-between mt-5">
              <span className="text-[11px] text-muted tracking-[0.08em] uppercase">
                Step 2 of 4
              </span>
              <button
                onClick={() => setStep(2)}
                disabled={services.length === 0}
                className="bg-navy text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:opacity-85 disabled:opacity-30 disabled:cursor-default transition-opacity"
              >
                Continue →
              </button>
            </div>
          </Panel>
        )}

        {/* Step 2 — Timing */}
        {step === 2 && (
          <Panel key="s2">
            <Question>When do you want to start?</Question>
            <Sub>No commitment — just helps us prepare.</Sub>
            <Options>
              {TIMINGS.map((t) => (
                <Option
                  key={t}
                  selected={timing === t}
                  onClick={() => {
                    setTiming(t);
                    advance(3);
                  }}
                >
                  {t}
                </Option>
              ))}
            </Options>
            <NavLabel label="Step 3 of 4" />
          </Panel>
        )}

        {/* Step 3 — Contact info */}
        {step === 3 && (
          <Panel key="s3">
            <Question>Almost there.</Question>
            <Sub>
              Leave your details and we&apos;ll reach out within 24 hours.
            </Sub>

            <div className="flex flex-col gap-4 mb-5 mt-2">
              <div className="grid grid-cols-2 gap-3 max-[600px]:grid-cols-1">
                <Field label="First name">
                  <Input
                    placeholder="Elio"
                    value={fname}
                    onChange={(e) => setFname(e.target.value)}
                    autoComplete="given-name"
                  />
                </Field>
                <Field label="Last name">
                  <Input
                    placeholder="Montes"
                    value={lname}
                    onChange={(e) => setLname(e.target.value)}
                    autoComplete="family-name"
                  />
                </Field>
              </div>

              <div className="grid grid-cols-2 gap-3 max-[600px]:grid-cols-1">
                <Field label="Work email">
                  <Input
                    type="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                  />
                </Field>
                <Field label="Phone (optional)">
                  <Input
                    type="tel"
                    placeholder="+1 (702) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    autoComplete="tel"
                  />
                </Field>
              </div>

              <Field label="Company name">
                <Input
                  placeholder="Acme Corp"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  autoComplete="organization"
                />
              </Field>

              <Field
                label="How can we help?"
                hint="(optional)"
              >
                <textarea
                  placeholder="Tell us briefly about your project, goals, or challenges…"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  className="w-full bg-bg border border-border text-text text-sm px-4 py-3 rounded-[10px] outline-none font-sans placeholder:text-muted/60 focus:border-accent transition-colors resize-y min-h-[88px]"
                />
              </Field>

              <Field label="How did you hear about us?">
                <select
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  className="w-full bg-bg border border-border text-text text-sm px-4 py-3 rounded-[10px] outline-none font-sans focus:border-accent transition-colors appearance-none cursor-pointer"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%236B7D9C' d='M6 8L0 0h12z'/%3E%3C/svg%3E\")",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 16px center",
                    paddingRight: "40px",
                  }}
                >
                  <option value="" disabled>Select an option</option>
                  {SOURCES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </Field>
            </div>

            {errorMsg && (
              <div className="text-xs text-red-600 mb-3 bg-red-50 border border-red-200 px-3 py-2 rounded-md">
                {errorMsg}
              </div>
            )}

            <div className="flex items-center justify-between gap-3 mb-4">
              <span className="text-[11px] text-muted tracking-[0.08em] uppercase">
                Step 4 of 4
              </span>
            </div>

            <button
              onClick={handleSubmit}
              disabled={submitState === "loading"}
              className={`w-full inline-flex items-center justify-center gap-2 bg-navy text-white text-[15px] font-semibold py-3.5 rounded-full transition-opacity ${
                submitState === "loading"
                  ? "opacity-70 cursor-wait"
                  : "hover:opacity-85"
              }`}
            >
              {submitState === "loading" ? (
                "Sending..."
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                  Schedule a Call
                </>
              )}
            </button>
          </Panel>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────── Sub-components ─────── */

function Panel({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Question({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-display text-xl font-bold text-navy tracking-[-0.3px] mb-1.5 max-[600px]:text-lg">
      {children}
    </div>
  );
}

function Sub({ children }: { children: React.ReactNode }) {
  return <div className="text-[13px] text-muted mb-5">{children}</div>;
}

function Options({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap gap-2">{children}</div>;
}

function Option({
  children,
  selected,
  onClick,
}: {
  children: React.ReactNode;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`text-sm font-normal px-[18px] py-2.5 rounded-full cursor-pointer transition-all border outline-none ${
        selected
          ? "bg-navy border-navy text-white font-medium"
          : "bg-bg border-border text-text hover:border-accent hover:text-accent"
      }`}
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      {children}
    </button>
  );
}

function NavLabel({ label }: { label: string }) {
  return (
    <div className="mt-5">
      <span className="text-[11px] text-muted tracking-[0.08em] uppercase">
        {label}
      </span>
    </div>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-semibold tracking-[0.06em] uppercase text-muted">
        {label}
        {hint && (
          <span className="text-muted/70 font-light normal-case ml-1">
            {hint}
          </span>
        )}
      </label>
      {children}
    </div>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="bg-bg border border-border text-text text-sm px-4 py-3 rounded-[10px] outline-none font-sans placeholder:text-muted/60 focus:border-accent transition-colors"
    />
  );
}