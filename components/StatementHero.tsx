"use client";

import { useEffect, useRef } from "react";

export default function StatementHero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const COUNT = 55;
    const MAX_DIST = 130;

    type Node = { x: number; y: number; vx: number; vy: number; r: number };
    let nodes: Node[] = [];
    let raf = 0;

    const resize = () => {
      if (!canvas.parentElement) return;
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    };

    const initNodes = () => {
      nodes = Array.from({ length: COUNT }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 1.5,
      }));
    };

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      // Lines between nearby nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(74,111,232,${(1 - dist / MAX_DIST) * 0.25})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Dots
      nodes.forEach((n) => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(74,111,232,0.5)";
        ctx.fill();
      });

      // Move
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
      });

      raf = requestAnimationFrame(draw);
    };

    const handleResize = () => {
      resize();
      initNodes();
    };

    resize();
    initNodes();
    draw();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="relative py-14 px-[5vw] bg-bg border-t border-border overflow-hidden max-[600px]:py-12 max-[600px]:px-[4vw]">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0 max-[900px]:hidden"
      />
      <div className="relative z-[1]">
        <span className="sec-tag">20+ Years of Combined Leadership Experience</span>
        <h1
          className="font-display font-extrabold leading-[1.02] tracking-[-3px] text-navy mb-7 max-[600px]:tracking-[-2px]"
          style={{ fontSize: "clamp(44px, 5.5vw, 88px)" }}
        >
          We build digital
          <br />
          products that
          <br />
          actually <em className="not-italic text-accent">scale.</em>
        </h1>
        {/* underline */}
        <div className="w-12 h-[3px] bg-accent mb-7 -mt-3" />
        <p
          className="text-muted max-w-[500px] leading-[1.75] font-light mb-0"
          style={{ fontSize: "clamp(15px, 1.4vw, 18px)" }}
        >
          TelioLabs brings together senior engineering and product leadership —
          helping startups, enterprises, and agencies ship software that works,
          grows, and lasts.
        </p>
        <div className="flex gap-4 items-center flex-wrap mt-8 max-[600px]:gap-3">
          <a
            href="#contact"
            className="bg-navy text-white font-sans font-medium text-[15px] px-8 py-3.5 rounded-full hover:-translate-y-0.5 hover:opacity-85 transition-all inline-block max-[600px]:text-sm max-[600px]:px-6 max-[600px]:py-3"
          >
            Schedule a Call
          </a>
          <a
            href="#services"
            className="text-muted text-[15px] font-normal flex items-center gap-1.5 hover:text-navy transition-colors group"
          >
            See what we build{" "}
            <span className="inline-block group-hover:translate-x-1 transition-transform">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
