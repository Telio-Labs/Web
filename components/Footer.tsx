import Link from "next/link";

const SERVICES = [
  "Custom Software",
  "Mobile Apps",
  "Web Platforms",
  "DevOps & Cloud",
  "Cybersecurity",
  "Digital Marketing",
];

const SOCIALS = ["LinkedIn", "Instagram", "X / Twitter"];

export default function Footer() {
  return (
    <footer className="bg-navy border-t border-white/10">
      <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr] gap-12 py-12 px-[5vw] pb-10 max-[900px]:grid-cols-2 max-[900px]:gap-9 max-[600px]:grid-cols-1 max-[600px]:gap-8 max-[600px]:py-10 max-[600px]:px-[4vw] max-[600px]:pb-8">
        {/* Brand */}
        <div>
          <Link
            href="/"
            className="font-display text-[28px] font-extrabold tracking-[-1px] text-white inline-block mb-4"
          >
            Telio<span className="text-accent-light font-normal">Labs</span>
          </Link>
          <p className="text-sm text-[#c8d7ff]/45 leading-[1.65] font-light max-w-[240px]">
            Senior engineering and product leadership — helping startups,
            enterprises, and agencies build software that scales.
          </p>
        </div>

        {/* Services */}
        <FooterCol title="Services">
          <ul className="list-none flex flex-col gap-2.5">
            {SERVICES.map((s) => (
              <li key={s}>
                <a
                  href="#services"
                  className="text-sm text-[#c8d7ff]/50 hover:text-white transition-colors font-light"
                >
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </FooterCol>

        {/* Contact */}
        <FooterCol title="Contact">
          <div className="text-sm text-[#c8d7ff]/50 mb-2.5 font-light">
            <a
              href="mailto:hello@teliolabs.ai"
              className="text-[#c8d7ff]/50 hover:text-white transition-colors"
            >
              hello@teliolabs.ai
            </a>
          </div>
          <div className="text-sm text-[#c8d7ff]/50 mb-2.5 font-light">
            Las Vegas, NV · USA
          </div>
          <div className="mt-2">
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 bg-accent-light text-navy font-semibold text-[13px] px-5 py-2.5 rounded-full"
            >
              Schedule a Call →
            </a>
          </div>
        </FooterCol>

        {/* Socials */}
        <FooterCol title="Follow Us">
          <div className="flex flex-col gap-2.5 max-[600px]:flex-row max-[600px]:flex-wrap">
            {SOCIALS.map((s) => (
              <a
                key={s}
                href="#"
                className="inline-flex items-center gap-2 text-[13px] font-medium text-[#c8d7ff]/70 border border-white/10 px-[18px] py-2 rounded-full hover:border-accent-light/40 hover:text-white transition-all w-fit"
              >
                {s}
              </a>
            ))}
          </div>
        </FooterCol>
      </div>

      {/* Bottom bar */}
      <div className="py-5 px-[5vw] border-t border-white/5 flex items-center justify-between flex-wrap gap-3 max-[600px]:py-4 max-[600px]:px-[4vw] max-[600px]:flex-col max-[600px]:items-start max-[600px]:gap-2">
        <p className="text-xs text-[#c8d7ff]/30">
          © 2026 TelioLabs, Inc. All rights reserved.
        </p>
        <div className="flex gap-5">
          <a
            href="#"
            className="text-xs text-[#c8d7ff]/30 hover:text-[#c8d7ff]/70 transition-colors"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-xs text-[#c8d7ff]/30 hover:text-[#c8d7ff]/70 transition-colors"
          >
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h4 className="font-display text-[15px] font-bold text-white mb-5 tracking-[-0.2px]">
        {title}
      </h4>
      {children}
    </div>
  );
}
