"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Testimonial {
  quote: string;
  name: string;
  position: string;
  company: string;
  logo: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    name: "Lorem Ipsum",
    position: "Director",
    company: "Company A",
    logo: "/mobileRev/mrev1.png",
  },
  {
    quote:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.",
    name: "Dolor Sit",
    position: "Creative Director",
    company: "Company B",
    logo: "/mobileRev/mrev2.png",
  },
  {
    quote:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque.",
    name: "Amet Consectetur",
    position: "VP of Product",
    company: "Company C",
    logo: "/mobileRev/mrev3.png",
  },
  {
    quote:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est.",
    name: "Adipiscing Elit",
    position: "Senior Producer",
    company: "Company D",
    logo: "/mobileRev/mrev4.png",
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const current = testimonials[currentIndex];

  return (
    <section className="relative py-28 px-6 sm:px-10 max-w-7xl mx-auto z-10 space-y-12">
      <div className="border-b border-[#231b35]/15 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-2xl space-y-3">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#181520] font-display uppercase">
            Lorem ipsum dolor sit amet consectetur.
          </h2>
          <p className="text-xs sm:text-sm text-[#464157] leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={prev}
            className="p-3 rounded-full border border-[#231b35]/20 hover:border-[#181520] transition-colors text-[#231b35]"
            aria-label="Previous review"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="p-3 rounded-full border border-[#231b35]/20 hover:border-[#181520] transition-colors text-[#231b35]"
            aria-label="Next review"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Review Card in white clean theme */}
      <div className="rounded-2xl border border-[#231b35]/15 bg-white/80 backdrop-blur-md p-8 sm:p-14 relative overflow-hidden shadow-sm">
        <Quote className="w-12 h-12 text-[#231b35]/15 mb-6" />

        <div className="min-h-[160px] flex items-center">
          <p className="text-xl sm:text-2xl md:text-3xl font-medium tracking-tight text-[#181520] leading-relaxed font-sans">
            &ldquo;{current.quote}&rdquo;
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-[#231b35]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-[#c9d2e7] border border-[#231b35]/15 flex items-center justify-center p-2 relative overflow-hidden">
              <Image
                src={current.logo}
                alt={current.company}
                width={36}
                height={36}
                className="object-contain"
              />
            </div>
            <div>
              <p className="font-bold text-sm text-[#181520] uppercase font-display">{current.name}</p>
              <p className="text-xs font-mono text-[#464157]">
                {current.position}, {current.company}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentIndex === idx ? "w-8 bg-[#181520]" : "w-2 bg-[#231b35]/20 hover:bg-[#231b35]/40"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
