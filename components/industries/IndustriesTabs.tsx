"use client";

import { motion, AnimatePresence } from "motion/react";
import { useEffect, useRef, useState } from "react";

type Industry = {
  id: string;
  name: string;
  fullName: string;
  desc: string;
  icon: React.ReactNode;
  subcategories: string[];
  services: string[];
};

const FintechIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <path d="M2 10h20M6 15h2M10 15h4" />
  </svg>
);
const HealthIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 12h-4l-3 3-4-6-3 3H2" />
    <path d="M12 2a10 10 0 100 20 10 10 0 000-20z" opacity=".2" />
  </svg>
);
const EcommerceIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 01-8 0" />
  </svg>
);
const RealEstateIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);
const EdtechIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
    <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
  </svg>
);
const HospitalityIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 22V8l9-6 9 6v14" />
    <path d="M9 22V12h6v10" />
    <rect x="9" y="7" width="6" height="4" rx="1" />
  </svg>
);
const LogisticsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="13" rx="1" />
    <path d="M16 8h4l3 3v5h-7V8z" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);
const SaasIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <path d="M8 21h8M12 17v4" />
  </svg>
);

const INDUSTRIES: Industry[] = [
  {
    id: "fintech",
    name: "Fintech",
    fullName: "Financial Technology",
    desc: "We've built payment platforms, banking dashboards, and financial management tools that handle real money at scale. We understand compliance, security, and the performance demands of financial products from the ground up.",
    icon: <FintechIcon />,
    subcategories: ["Payments", "Banking & Neobanks", "Investment Platforms", "Crypto & DeFi", "Insurance Tech"],
    services: ["Custom Software", "Mobile Apps", "Cybersecurity", "DevOps & Cloud"],
  },
  {
    id: "healthtech",
    name: "HealthTech",
    fullName: "Healthcare Technology",
    desc: "From telemedicine platforms to patient management systems, we build healthcare software that meets HIPAA requirements without sacrificing user experience. We know that in health, reliability isn't optional.",
    icon: <HealthIcon />,
    subcategories: ["Telemedicine", "EMR / EHR", "Wellness Apps", "Medical Devices", "Mental Health"],
    services: ["Custom Software", "Mobile Apps", "Cybersecurity", "AI & ML"],
  },
  {
    id: "ecommerce",
    name: "E-commerce",
    fullName: "Commerce & Retail",
    desc: "High-conversion storefronts, custom marketplaces, and backend systems that handle real sales volume. We build e-commerce products that scale on Black Friday without breaking on a Tuesday.",
    icon: <EcommerceIcon />,
    subcategories: ["DTC Brands", "Marketplaces", "B2B Commerce", "Subscription", "Wholesale"],
    services: ["Web Platforms", "Mobile Apps", "Digital Marketing", "DevOps"],
  },
  {
    id: "realestate",
    name: "Real Estate",
    fullName: "Real Estate & PropTech",
    desc: "Property listing platforms, CRM systems, investment tools, and marketplace solutions for real estate businesses. We understand the workflows of agents, brokers, and investors — and how technology can simplify them.",
    icon: <RealEstateIcon />,
    subcategories: ["PropTech", "Listing Platforms", "CRM for Agents", "Investment Tools"],
    services: ["Custom Software", "Web Platforms", "Mobile Apps", "Digital Marketing"],
  },
  {
    id: "edtech",
    name: "EdTech",
    fullName: "Education Technology",
    desc: "Learning management systems, tutoring platforms, certification tools, and interactive educational experiences. We build EdTech products that students actually want to use — not just platforms that check compliance boxes.",
    icon: <EdtechIcon />,
    subcategories: ["LMS Platforms", "Tutoring Apps", "Certifications", "Corporate Training"],
    services: ["Custom Software", "Mobile Apps", "AI & ML", "Web Platforms"],
  },
  {
    id: "hospitality",
    name: "Hospitality",
    fullName: "Hospitality & Travel",
    desc: "Booking platforms, property management systems, POS integrations, and guest experience tools for hotels, restaurants, and travel businesses. We build hospitality tech that works during peak season — not just in demos.",
    icon: <HospitalityIcon />,
    subcategories: ["Hotels & Resorts", "Restaurants", "Travel Booking", "Short-term Rentals"],
    services: ["Custom Software", "Mobile Apps", "Digital Marketing", "Web Platforms"],
  },
  {
    id: "logistics",
    name: "Logistics",
    fullName: "Logistics & Supply Chain",
    desc: "Route optimization, fleet management, supply chain visibility, and warehouse systems for logistics businesses. We build software that keeps things moving — and gives you real-time visibility when they don't.",
    icon: <LogisticsIcon />,
    subcategories: ["Fleet Management", "Supply Chain", "Last-mile Delivery", "Warehouse"],
    services: ["Custom Software", "Mobile Apps", "AI & ML", "DevOps"],
  },
  {
    id: "saas",
    name: "SaaS",
    fullName: "Software as a Service",
    desc: "B2B platforms, developer tools, and API-first products built to scale from zero to thousands of users. We understand SaaS architecture, multi-tenancy, and the infrastructure decisions that separate products that scale from ones that don't.",
    icon: <SaasIcon />,
    subcategories: ["B2B Platforms", "Developer Tools", "APIs & Integrations", "Vertical SaaS"],
    services: ["Custom Software", "DevOps & Cloud", "AI & ML", "Cybersecurity"],
  },
];

export default function IndustriesTabs() {
  const [activeId, setActiveId] = useState(INDUSTRIES[0].id);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const active = INDUSTRIES.find((i) => i.id === activeId)!;

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 900);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleSelect = (id: string) => {
    setActiveId(id);
    setMobileOpen(false);
  };

  return (
    <section
      id="industries"
      className="py-20 px-[5vw] bg-bg border-t border-border max-[600px]:py-14 max-[600px]:px-[4vw]"
    >
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.65 }}
        className="mb-12 max-[600px]:mb-8"
      >
        <span className="sec-tag">Where we work</span>
        <h2 className="sec-title">
          Industry-specific
          <br />
          expertise.
        </h2>
      </motion.div>

      <div className="grid grid-cols-[280px_1fr] gap-10 max-[900px]:grid-cols-1 max-[900px]:gap-5">
        {!isMobile ? (
          <DesktopTabs industries={INDUSTRIES} activeId={activeId} onSelect={handleSelect} />
        ) : (
          <MobileSelector
            industries={INDUSTRIES}
            active={active}
            isOpen={mobileOpen}
            onToggle={() => setMobileOpen((o) => !o)}
            onSelect={handleSelect}
            onClose={() => setMobileOpen(false)}
          />
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
            className="bg-surface border border-border rounded-2xl p-10 max-[900px]:p-7 max-[600px]:p-6"
          >
            <div className="flex items-start justify-between gap-6 mb-7 max-[600px]:gap-4 max-[600px]:mb-6">
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold tracking-[0.14em] uppercase text-accent mb-3">
                  {active.name}
                </div>
                <h3
                  className="font-display font-extrabold text-navy tracking-[-1px] leading-[1.1] mb-4 max-[600px]:mb-3"
                  style={{ fontSize: "clamp(22px, 2.6vw, 36px)" }}
                >
                  {active.fullName}
                </h3>
                <p className="text-[15px] text-muted leading-[1.75] font-light max-w-[560px] max-[600px]:text-[14px] max-[600px]:leading-[1.65]">
                  {active.desc}
                </p>
              </div>

              <div className="w-14 h-14 rounded-xl bg-accent-dim flex items-center justify-center flex-shrink-0 text-accent max-[600px]:w-11 max-[600px]:h-11">
                <div className="w-6 h-6 max-[600px]:w-5 max-[600px]:h-5">
                  {active.icon}
                </div>
              </div>
            </div>

            <div className="mb-7 max-[600px]:mb-5">
              <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-muted mb-3">
                Subcategories
              </div>
              <div className="flex flex-wrap gap-2">
                {active.subcategories.map((sub) => (
                  <span
                    key={sub}
                    className="bg-bg border border-border text-text text-[13px] font-normal px-4 py-1.5 rounded-full max-[600px]:text-[12px] max-[600px]:px-3 max-[600px]:py-1"
                  >
                    {sub}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-8 max-[600px]:mb-6">
              <div className="text-[11px] font-semibold tracking-[0.14em] uppercase text-muted mb-3">
                Services we typically apply
              </div>
              <div className="flex flex-wrap gap-2">
                {active.services.map((s) => (
                  <span
                    key={s}
                    className="bg-accent-dim text-accent text-[13px] font-semibold px-4 py-1.5 rounded-full max-[600px]:text-[12px] max-[600px]:px-3 max-[600px]:py-1"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <a href="#contact" className="inline-flex items-center gap-2 bg-navy text-white text-sm font-medium px-6 py-3 rounded-full hover:opacity-85 hover:-translate-y-0.5 transition-all max-[600px]:w-full max-[600px]:justify-center">Talk to us about {active.name} →</a>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

type DesktopTabsProps = {
  industries: Industry[];
  activeId: string;
  onSelect: (id: string) => void;
};

function DesktopTabs({ industries, activeId, onSelect }: DesktopTabsProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {industries.map((ind) => {
        const isActive = ind.id === activeId;
        return (
          <button
            key={ind.id}
            onClick={() => onSelect(ind.id)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all border outline-none ${
              isActive
                ? "bg-navy text-white border-navy"
                : "bg-bg text-text border-border hover:border-accent hover:text-accent"
            }`}
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            <div className={`w-5 h-5 flex-shrink-0 ${isActive ? "text-accent-light" : "text-accent"}`}>
              {ind.icon}
            </div>
            <div className="font-display text-[15px] font-semibold tracking-[-0.2px] flex-1">
              {ind.name}
            </div>
            <div className={`text-sm transition-transform ${isActive ? "translate-x-1" : ""}`}>
              →
            </div>
          </button>
        );
      })}
    </div>
  );
}

type MobileSelectorProps = {
  industries: Industry[];
  active: Industry;
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (id: string) => void;
  onClose: () => void;
};

function MobileSelector({
  industries,
  active,
  isOpen,
  onToggle,
  onSelect,
  onClose,
}: MobileSelectorProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen, onClose]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 bg-navy text-white px-4 py-3.5 rounded-xl border border-navy outline-none"
        style={{ WebkitTapHighlightColor: "transparent" }}
        aria-expanded={isOpen}
      >
        <div className="w-5 h-5 flex-shrink-0 text-accent-light">{active.icon}</div>
        <div className="flex flex-col items-start flex-1 text-left min-w-0">
          <div className="text-[10px] font-semibold tracking-[0.14em] uppercase text-accent-light/60 mb-0.5">
            Select industry
          </div>
          <div className="font-display text-[15px] font-semibold tracking-[-0.2px] truncate">
            {active.name}
          </div>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-accent-light text-lg flex-shrink-0"
        >
          ▾
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/40 z-[40] backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.97 }}
              transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
              className="absolute top-full left-0 right-0 mt-2 bg-bg border border-border rounded-2xl shadow-2xl z-[50] overflow-hidden"
            >
              <div className="p-2 grid grid-cols-2 gap-1.5 max-[420px]:grid-cols-1">
                {industries.map((ind) => {
                  const isActive = ind.id === active.id;
                  return (
                    <button
                      key={ind.id}
                      onClick={() => onSelect(ind.id)}
                      className={`flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-colors border outline-none ${
                        isActive
                          ? "bg-navy text-white border-navy"
                          : "bg-bg text-text border-transparent hover:bg-surface active:bg-surface"
                      }`}
                      style={{ WebkitTapHighlightColor: "transparent" }}
                    >
                      <div className={`w-5 h-5 flex-shrink-0 ${isActive ? "text-accent-light" : "text-accent"}`}>
                        {ind.icon}
                      </div>
                      <div className="font-display text-[14px] font-semibold tracking-[-0.2px] flex-1 truncate">
                        {ind.name}
                      </div>
                      {isActive && <div className="text-accent-light text-xs">✓</div>}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}