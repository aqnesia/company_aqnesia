"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t border-[#231b35]/15 bg-white z-10 pt-20 pb-16 px-6 sm:px-10">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start justify-between">
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#181520] text-white flex items-center justify-center font-machina font-black text-xs tracking-tighter shadow-sm">
                AQ
              </div>
              <span className="font-machina font-black text-lg tracking-tight uppercase text-[#181520]">
                PT. Aqnesia Multi Usaha
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#464157] max-w-md leading-relaxed font-mono">
              Mitra strategis global workforce dan transformasi digital terpercaya untuk pengembangan talenta, teknologi, dan kemitraan antarnegara.
            </p>
          </div>

          <div className="md:col-span-3 space-y-2 text-xs font-mono text-[#231b35]">
            <span className="text-[10px] uppercase text-[#464157] block font-semibold">Inquiries</span>
            <p>
              <a href="mailto:hello@noomoagency.com" className="hover:underline">
                hello@noomoagency.com
              </a>
            </p>
            <p className="text-[#464157]">Jakarta &amp; Surakarta, Indonesia</p>
          </div>

          <div className="md:col-span-3 space-y-2 text-xs font-mono text-[#231b35]">
            <span className="text-[10px] uppercase text-[#464157] block font-semibold">Socials & Press</span>
            <div className="flex flex-col gap-1.5">
              <a href="https://twitter.com/noomoagency" target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1">
                <span>Twitter / X</span>
                <ArrowUpRight className="w-3 h-3 text-[#464157]" />
              </a>
              <a href="https://linkedin.com/company/noomo-agency" target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1">
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3 h-3 text-[#464157]" />
              </a>
              <a href="https://instagram.com/noomoagency" target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1">
                <span>Instagram</span>
                <ArrowUpRight className="w-3 h-3 text-[#464157]" />
              </a>
              <a href="https://www.awwwards.com/noomo/" target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1">
                <span>Awwwards</span>
                <ArrowUpRight className="w-3 h-3 text-[#464157]" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-[#231b35]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#464157]">
          <span>© 2026 PT. AQNESIA MULTI USAHA. ALL RIGHTS RESERVED.</span>
          <div className="flex items-center gap-6">
            <a href="/privacy" className="hover:text-[#181520]">Privacy Policy</a>
            <a href="/terms" className="hover:text-[#181520]">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
