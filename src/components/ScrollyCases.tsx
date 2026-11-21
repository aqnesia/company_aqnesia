"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";

interface CaseItem {
  id: number;
  year: string;
  tag: string;
  subTags: string;
  title: string;
  description: string;
  range: [number, number];
}

const cases: CaseItem[] = [
  {
    id: 1,
    year: "2025",
    tag: "SOVEREIGN DIGITAL",
    subTags: "Jakarta & Nusantara Alliance",
    title: "PPTKS",
    description: "Empowering Southeast Asia's sovereign digital infrastructure through high-scale cloud platforms and immersive spatial experiences.",
    range: [0.08, 0.34],
  },
  {
    id: 2,
    year: "2025",
    tag: "PRECISION CRAFT",
    subTags: "Tokyo & Global Systems",
    title: "LPK AQNESIA",
    description: "Fusing traditional Japanese industrial engineering rigor with high-frequency 3D WebGL interfaces and tactile digital craftsmanship.",
    range: [0.36, 0.62],
  },
  {
    id: 3,
    year: "2024",
    tag: "COMPUTE & HARDWARE",
    subTags: "Taipei Advanced Computing",
    title: "P3MI",
    description: "Connecting global hardware ecosystems with real-time interactive dashboards and semiconductor-grade microservices.",
    range: [0.64, 0.86],
  },
];

export default function ScrollyCases({ scrollProgress }: { scrollProgress: number }) {
  const clampedProgress = Math.min(Math.max(scrollProgress, 0), 1);

  // Trigger negara mana yang aktif berdasarkan posisi scroll (1: Indonesia, 2: Jepang, 3: Taiwan)
  let activeId = 0;
  if (clampedProgress >= 0.10 && clampedProgress < 0.35) {
    activeId = 1; // Indonesia
  } else if (clampedProgress >= 0.35 && clampedProgress < 0.63) {
    activeId = 2; // Jepang
  } else if (clampedProgress >= 0.63 && clampedProgress < 0.88) {
    activeId = 3; // Taiwan
  }
  // Saat >= 0.88 (Segitiga 3 Bendera), activeId = 0 sehingga bersih tanpa card & tombol

  return (
    <div className="pointer-events-none fixed bottom-0 left-0 right-0 z-20 p-6 sm:p-12">
      <div className="max-w-7xl mx-auto relative h-48 sm:h-44">
        {cases.map((c) => {
          const isActive = c.id === activeId;

          return (
            <div
              key={c.id}
              className={`absolute bottom-0 left-0 right-0 flex flex-col md:flex-row md:items-end justify-between gap-6 ${
                isActive
                  ? "opacity-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 translate-y-6 pointer-events-none"
              }`}
              style={{
                transition:
                  "opacity 2s cubic-bezier(0.16, 1, 0.3, 1), transform 2s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <div className="max-w-xl space-y-2.5 bg-white/95 backdrop-blur-md p-6 sm:p-8 rounded-xl border border-[#181520]/15 shadow-lg">
                <div className="flex items-center gap-3 text-xs font-mono text-[#464157]">
                  <span className="font-bold text-[#181520] uppercase">{c.tag}</span>
                  <span>·</span>
                  <span>{c.year}</span>
                  <span>·</span>
                  <span>{c.subTags}</span>
                </div>

                <h3 className="text-xl sm:text-3xl font-extrabold tracking-tight text-[#181520] font-display uppercase">
                  {c.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#464157] leading-relaxed">
                  {c.description}
                </p>
              </div>

              <div className="hidden sm:block">
                <a
                  href="#work"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#181520] text-[#c9d2e7] hover:bg-[#231b35] font-mono text-xs uppercase tracking-wider font-semibold transition-all shadow-md group"
                >
                  <span>View Project</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
