"use client";

import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isClosed, setIsClosed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Begitu mulai di-scroll ke bawah dari posisi paling atas, header langsung naik / menutup ke atas keluar layar
      setIsClosed(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isClosed
          ? "-translate-y-full opacity-0 pointer-events-none"
          : "translate-y-0 opacity-100 bg-transparent py-6"
      }`}
    >
      <div className="w-full px-6 sm:px-10 md:px-12 lg:px-16 flex items-center justify-between">
        {/* Brand Logo for PT. Aqnesia Multi Usaha */}
        <a
          href="#home"
          className="group flex items-center gap-3 text-[#181520] transition-opacity hover:opacity-85 select-none"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#181520] text-white flex items-center justify-center font-machina font-black text-xs sm:text-sm tracking-tighter shadow-sm group-hover:scale-105 transition-transform shrink-0">
            AQ
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-machina font-extrabold text-sm sm:text-base tracking-tight uppercase text-[#181520]">
              PT. Aqnesia Multi Usaha
            </span>
            <span className="font-mono text-[9px] tracking-widest uppercase text-[#464157] mt-1 font-semibold">
              Global Workforce
            </span>
          </div>
        </a>

        {/* Right-Aligned Desktop Navigation Links (Tata Letak Sesuai Screenshot) */}
        <nav className="hidden lg:flex items-center gap-8 xl:gap-12 text-[13px] font-mono uppercase tracking-widest text-[#181520] font-medium">
          <a href="#home" className="hover-line-link transition-colors hover:text-black">
            Home
          </a>
          <a href="#capabilities" className="hover-line-link transition-colors hover:text-black">
            Capabilities
          </a>
          <a href="#about" className="hover-line-link transition-colors hover:text-black">
            About
          </a>
          <a href="#contact" className="hover-line-link transition-colors hover:text-black">
            Connect
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-[#181520] hover:opacity-75 focus:outline-none"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#181520]/15 px-6 py-8 space-y-6">
          <nav className="flex flex-col gap-5 text-base font-bold font-mono uppercase tracking-widest text-[#181520]">
            <a href="#home" onClick={() => setMobileMenuOpen(false)}>
              Home
            </a>
            <a href="#capabilities" onClick={() => setMobileMenuOpen(false)}>
              Capabilities
            </a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)}>
              About
            </a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)}>
              Connect
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
