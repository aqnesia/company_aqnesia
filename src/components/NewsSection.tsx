"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";

interface Article {
  title: string;
  category: string;
  date: string;
  description: string;
}

const articles: Article[] = [
  {
    title: "Lorem ipsum dolor sit amet consectetur",
    category: "LOREM / IPSUM",
    date: "JAN 2026",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    title: "Consectetur adipiscing elit sed do eiusmod",
    category: "DOLOR / SIT",
    date: "AUG 2025",
    description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat.",
  },
  {
    title: "Tempor incididunt ut labore et dolore magna",
    category: "AMET / TEMPOR",
    date: "NOV 2024",
    description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
];

export default function NewsSection() {
  return (
    <section id="insights" className="relative py-28 px-6 sm:px-12 max-w-7xl mx-auto z-10">
      <div className="border-b border-[#181520]/15 pb-8 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#464157] block mb-2 font-semibold">
            Lorem Ipsum
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#181520] font-display uppercase">
            Articles & Research
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {articles.map((item, idx) => (
          <article
            key={idx}
            className="group rounded-xl border border-[#181520]/15 bg-white/80 hover:bg-white transition-all duration-300 p-8 flex flex-col justify-between shadow-sm"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-[#464157] mb-6">
                <span className="text-[11px] font-bold text-[#181520]">{item.category}</span>
                <span>{item.date}</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#181520] font-display uppercase group-hover:opacity-75 transition-opacity mb-3 leading-snug">
                {item.title}
              </h3>

              <p className="text-xs sm:text-sm text-[#464157] leading-relaxed mb-8">
                {item.description}
              </p>
            </div>

            <div className="pt-4 border-t border-[#181520]/10 flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase text-[#181520] group-hover:underline flex items-center gap-1.5">
                <span>Read article</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
