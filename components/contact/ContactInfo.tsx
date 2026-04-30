"use client";

import { motion } from "motion/react";

export default function ContactInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className="flex flex-col gap-6"
    >
      {/* Map */}
      <div className="rounded-2xl overflow-hidden border border-border h-[260px] bg-surface max-[600px]:h-[200px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d206252.48929553935!2d-115.31391805!3d36.1672559!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80beb782a4f57dd1%3A0x3accd5e6d5b379a3!2sLas%20Vegas%2C%20NV!5e0!3m2!1sen!2sus!4v1698765432100!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0, filter: "grayscale(0.3) contrast(1.05)" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      {/* Response badge */}
      <div className="flex items-center gap-3 bg-accent-dim border border-accent/20 rounded-xl px-4 py-3.5">
        <div className="relative w-2.5 h-2.5 flex-shrink-0">
          <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-40" />
          <span className="absolute inset-0 rounded-full bg-green-500" />
        </div>
        <div className="text-[13px] text-text leading-[1.5]">
          <strong className="font-semibold">We&apos;re available</strong> — typical response within 24 hours
        </div>
      </div>

      {/* Office */}
      <div>
        <div className="text-[10px] font-semibold tracking-[0.14em] uppercase text-muted mb-3">Office</div>
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-surface border border-border flex items-center justify-center text-accent flex-shrink-0">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </div>
          <div className="min-w-0 flex-1 pt-0.5">
            <div className="text-[14px] font-semibold text-navy">Las Vegas, Nevada</div>
            <div className="text-[13px] text-muted leading-[1.5]">United States of America<br />U.S.-managed operations</div>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div>
        <div className="text-[10px] font-semibold tracking-[0.14em] uppercase text-muted mb-3">Contact</div>
        <div className="flex flex-col gap-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-surface border border-border flex items-center justify-center text-accent flex-shrink-0">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            <div className="min-w-0 flex-1 pt-0.5">
              <div className="text-[14px] font-semibold text-navy">Email</div>
              <a href="mailto:hello@teliolabs.io" className="text-[13px] text-accent hover:underline break-all">hello@teliolabs.io</a>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-surface border border-border flex items-center justify-center text-accent flex-shrink-0">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
              </svg>
            </div>
            <div className="min-w-0 flex-1 pt-0.5">
              <div className="text-[14px] font-semibold text-navy">WhatsApp</div>
              <a href="https://wa.me/17025550100" className="text-[13px] text-accent hover:underline break-all">Message us on WhatsApp</a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
