"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const NAV_LINKS = [
  { href: "#about", label: "About Us" },
  { href: "#software", label: "Software" },
  { href: "#marketing", label: "Digital Marketing" },
  { href: "#work", label: "Work" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  useEffect(() => {
    if (!menuOpen) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };

    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <nav className="sticky top-0 left-0 right-0 z-[100] h-[76px] border-b border-white/10 bg-[#111111]/90 backdrop-blur-xl px-[5vw] max-[900px]:h-[68px] max-[600px]:px-[4vw]">
        <div className="mx-auto flex h-full w-full max-w-[1440px] items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex shrink-0 items-center"
            onClick={closeMenu}
            aria-label="Go to homepage"
          >
            <Image
              src="/Telio-Labs.svg"
              alt="TelioLabs"
              width={140}
              height={32}
              priority
              className="h-8 w-auto max-[900px]:h-7"
            />
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center justify-center gap-1 xl:gap-2">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="rounded-xl px-4 py-2 text-[14px] xl:px-[18px] xl:text-[15px] font-medium text-white/70 transition-all duration-200 hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Tablet/Desktop CTA */}
            <Link
              href="#contact"
              className="hidden sm:inline-flex items-center justify-center rounded-full bg-accent-light px-5 py-[10px] text-[14px] font-semibold text-navy transition-all duration-200 hover:opacity-85 lg:px-[24px] lg:py-[11px] lg:text-[15px]"
            >
              Contact Us
            </Link>

            {/* Mobile Menu Button */}
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={toggleMenu}
              className="lg:hidden flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white transition-colors duration-200 hover:bg-white/[0.08]"
            >
              <div className="relative flex h-4 w-5 flex-col justify-between">
                <span
                  className={`block h-[2px] w-full rounded-full bg-white transition-all duration-300 ${
                    menuOpen ? "translate-y-[7px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`block h-[2px] w-full rounded-full bg-white transition-all duration-300 ${
                    menuOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`block h-[2px] w-full rounded-full bg-white transition-all duration-300 ${
                    menuOpen ? "-translate-y-[7px] -rotate-45" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile / Tablet Menu Overlay */}
      <div
        className={`fixed inset-0 z-[99] lg:hidden transition-all duration-300 ${
          menuOpen
            ? "pointer-events-auto bg-black/55 opacity-100"
            : "pointer-events-none bg-black/0 opacity-0"
        }`}
        onClick={closeMenu}
      >
        <div
          className={`absolute left-[4vw] right-[4vw] top-[84px] rounded-3xl border border-white/10 bg-[#111111]/95 p-4 shadow-2xl backdrop-blur-2xl transition-all duration-300 max-[900px]:top-[76px] ${
            menuOpen ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={closeMenu}
                className="rounded-2xl px-4 py-3 text-[15px] font-medium text-white/85 transition-all duration-200 hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile CTA */}
            <div className="mt-2 border-t border-white/10 pt-3 sm:hidden">
              <Link
                href="#contact"
                onClick={closeMenu}
                className="flex w-full items-center justify-center rounded-full bg-accent-light px-5 py-3 text-[14px] font-semibold text-navy transition-opacity duration-200 hover:opacity-85"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}