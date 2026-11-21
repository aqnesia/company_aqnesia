"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setFade(true);
            setTimeout(onComplete, 700);
          }, 250);
          return 100;
        }
        const step = Math.floor(Math.random() * 8) + 4;
        return Math.min(prev + step, 100);
      });
    }, 35);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col justify-between p-8 sm:p-14 bg-[#dee7f1] text-[#181520] transition-all duration-700 select-none ${
        fade ? "opacity-0 pointer-events-none -translate-y-full" : "opacity-100"
      }`}
    >
      {/* Top Header */}
      <div className="flex justify-between items-center text-xs font-mono tracking-widest text-[#464157] uppercase">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded bg-[#181520] text-[#c9d2e7] flex items-center justify-center font-machina font-black text-xs">
            AQ
          </div>
          <span className="font-machina font-bold tracking-tight text-xs uppercase text-[#181520]">
            PT. Aqnesia Multi Usaha
          </span>
        </div>
        <span>DIGITAL EXPERIENCES</span>
      </div>

      {/* Center Counter */}
      <div className="flex flex-col items-center justify-center my-auto space-y-4">
        <div className="text-8xl sm:text-9xl md:text-[13rem] font-bold tracking-tighter text-[#181520] font-display">
          {progress}
          <span className="text-[#231b35]/30 text-4xl sm:text-6xl md:text-7xl ml-2 font-mono">%</span>
        </div>
        <div className="w-48 sm:w-64 h-1 bg-[#231b35]/15 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#181520] transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Bottom Status */}
      <div className="flex justify-between items-center text-xs font-mono tracking-wider text-[#464157]">
        <span className="animate-pulse">LOADING 3D SCENE & DRIVING EXPERIENCE...</span>
        <span className="hidden sm:inline-block">JAKARTA &amp; SURAKARTA</span>
      </div>
    </div>
  );
}
