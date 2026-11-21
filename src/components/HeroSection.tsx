"use client";

import React from "react";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center pt-20 pb-10 px-6 sm:px-12 lg:px-20 max-w-[1500px] mx-auto z-10 select-none"
    >
      <div className="w-full my-auto space-y-2 sm:space-y-4 lg:space-y-5">
        {/* Line 1: BRIDGING GLOBAL TALENT */}
        <div className="w-full">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[4.15rem] xl:text-[4.85rem] font-light tracking-[-0.035em] leading-[0.94] text-[#181520] uppercase font-sans whitespace-nowrap">
            BRIDGING GLOBAL TALENT
          </h1>
        </div>

        {/* Line 2: ACROSS (left) ... BORDERLESS (right) */}
        <div className="w-full flex items-baseline justify-between gap-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[4.15rem] xl:text-[4.85rem] font-light tracking-[-0.035em] leading-[0.94] text-[#181520] uppercase font-sans">
            ACROSS
          </h2>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[4.15rem] xl:text-[4.85rem] font-light tracking-[-0.035em] leading-[0.94] text-[#181520] uppercase font-sans text-right">
            BORDERLESS
          </h2>
        </div>

        {/* Line 3: INNOVATION (left) + Sub-Description (right) */}
        <div className="w-full flex flex-col md:flex-row md:items-end justify-between gap-6 pt-1">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[4.15rem] xl:text-[4.85rem] font-light tracking-[-0.035em] leading-[0.94] text-[#181520] uppercase font-sans">
            INNOVATION
          </h2>

          <div className="max-w-[280px] sm:max-w-xs md:pb-2 text-left self-start md:self-end">
            <p className="text-xs sm:text-sm font-sans text-[#181520] leading-relaxed tracking-normal">
              Empowering cross-border workforce ecosystems connecting Indonesia, Japan, and Taiwan.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
