"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";

interface Project {
  index: string;
  title: string;
  discipline: string;
  client: string;
  year: string;
  summary: string;
}

const projects: Project[] = [
  {
    index: "01",
    title: "Lorem ipsum dolor sit amet",
    discipline: "Lorem, Ipsum, Dolor",
    client: "Lorem Corp",
    year: "2025",
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
  },
  {
    index: "02",
    title: "Consectetur adipiscing elit",
    discipline: "Adipiscing, Elit, Sed",
    client: "Ipsum Group",
    year: "2025",
    summary:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
  },
  {
    index: "03",
    title: "Tempor incididunt ut labore",
    discipline: "Eiusmod, Tempor, Incididunt",
    client: "Dolor Enterprise",
    year: "2024",
    summary:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste.",
  },
  {
    index: "04",
    title: "Magna aliqua minim veniam",
    discipline: "Magna, Aliqua, Veniam",
    client: "Amet Systems",
    year: "2024",
    summary:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.",
  },
];

export default function WorkSection() {
  return (
    <section id="work" className="relative py-28 px-6 sm:px-12 max-w-7xl mx-auto z-10">
      <div className="border-b border-[#181520]/15 pb-8 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#464157] block mb-2 font-semibold">
            Lorem Ipsum
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#181520] font-display uppercase">
            Featured Projects
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[#464157] max-w-sm font-mono leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore.
        </p>
      </div>

      {/* Editorial Asymmetrical Layout (No copy-paste card grid) */}
      <div className="divide-y divide-[#181520]/15">
        {projects.map((project) => (
          <article
            key={project.index}
            className="py-12 group transition-colors flex flex-col lg:flex-row lg:items-start justify-between gap-8"
          >
            <div className="flex items-baseline gap-6 sm:gap-10 lg:w-7/12">
              <span className="text-sm font-mono text-[#464157] font-semibold">{project.index}</span>
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#464157]">
                  <span className="text-[#181520] font-bold uppercase">{project.client}</span>
                  <span>·</span>
                  <span>{project.year}</span>
                </div>
                <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#181520] font-display uppercase group-hover:opacity-75 transition-opacity">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#464157] max-w-xl leading-relaxed">
                  {project.summary}
                </p>
              </div>
            </div>

            <div className="lg:w-4/12 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-4">
              <span className="text-xs font-mono text-[#464157] lg:text-right">
                {project.discipline}
              </span>
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-[#181520] hover-line-link"
              >
                <span>View Project</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
