"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
}

const services: ServiceItem[] = [
  {
    id: "01",
    title: "Lorem ipsum dolor",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    tags: ["Lorem", "Ipsum", "Dolor", "Sit"],
  },
  {
    id: "02",
    title: "Consectetur adipiscing",
    description:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
    tags: ["Amet", "Consectetur", "Adipiscing", "Elit"],
  },
  {
    id: "03",
    title: "Tempor incididunt",
    description:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste.",
    tags: ["Tempor", "Incididunt", "Labore", "Dolore"],
  },
  {
    id: "04",
    title: "Magna aliqua enim",
    description:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    tags: ["Magna", "Aliqua", "Minim", "Veniam"],
  },
];

export default function ServicesSection() {
  const [activeId, setActiveId] = useState<string>("01");

  return (
    <section id="capabilities" className="relative py-28 px-6 sm:px-12 max-w-7xl mx-auto z-10">
      <div className="border-b border-[#181520]/15 pb-8 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#464157] block mb-2 font-semibold">
            Lorem Ipsum
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#181520] font-display uppercase max-w-3xl leading-[1.08]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor.
          </h2>
        </div>
      </div>

      <div className="divide-y divide-[#181520]/15">
        {services.map((service) => {
          const isOpen = activeId === service.id;
          return (
            <div
              key={service.id}
              className="py-8 transition-colors group cursor-pointer"
              onClick={() => setActiveId(isOpen ? "" : service.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-baseline gap-6 sm:gap-12">
                  <span className="text-xs font-mono text-[#464157] font-semibold">{service.id}</span>
                  <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#181520] group-hover:opacity-75 transition-opacity font-display uppercase">
                    {service.title}
                  </h3>
                </div>
                <div className="p-2 rounded-full border border-[#181520]/20 group-hover:border-[#181520] transition-colors text-[#181520]">
                  {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </div>

              {isOpen && (
                <div className="mt-6 pt-4 pl-0 sm:pl-16 grid grid-cols-1 md:grid-cols-12 gap-6 animate-fadeIn">
                  <p className="md:col-span-8 text-sm sm:text-base text-[#464157] leading-relaxed">
                    {service.description}
                  </p>
                  <div className="md:col-span-4 flex flex-wrap gap-2 items-start justify-start md:justify-end">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-mono text-[#181520] bg-[#dee7f1] border border-[#181520]/15 px-2.5 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
