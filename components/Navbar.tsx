import Image from "next/image";
import Link from "next/link";

const NAV_LINKS = [
  { href: "#about", label: "About Us" },
  { href: "#services", label: "Software" },
  { href: "#services", label: "Digital Marketing" },
  { href: "#work", label: "Work" },
];

export default function Navbar() {
  return (
    <nav className="sticky top-0 left-0 right-0 z-[100] grid grid-cols-[1fr_auto_1fr] items-center h-[76px] px-[5vw] bg-[#111111] border-b border-white/10 max-[600px]:h-16 max-[600px]:px-[4vw]">
      <Link href="/" className="flex items-center">
        <Image
          src="/Telio-Labs.svg"
          alt="TelioLabs"
          width={140}
          height={32}
          priority
          className="h-8 w-auto max-[600px]:h-7"
        />
      </Link>

      <ul className="hidden md:flex gap-1 list-none justify-center">
        {NAV_LINKS.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-[15px] font-medium text-white/70 hover:text-white hover:bg-white/5 px-[18px] py-2 rounded-lg transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      <Link
        href="#contact"
        className="justify-self-end bg-accent-light text-navy font-semibold text-[15px] px-[26px] py-[11px] rounded-full hover:opacity-85 transition-opacity max-[900px]:px-4 max-[900px]:py-2 max-[900px]:text-[13px]"
      >
        Contact Us
      </Link>
    </nav>
  );
}