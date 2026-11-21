"use client";

import React, { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export default function ContactFormSection() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    project: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", project: "" });
    }, 5000);
  };

  return (
    <section id="contact" className="relative py-28 sm:py-36 px-6 sm:px-12 max-w-7xl mx-auto z-10 select-none">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
        {/* Left Column: Clean Editorial Typography */}
        <div className="lg:col-span-5 space-y-1">
          <p className="text-xs sm:text-sm font-display uppercase tracking-wider text-[#181520] leading-snug">
            WITH US IT HAPPENS.
          </p>
          <p className="text-xs sm:text-sm font-display uppercase tracking-wider text-[#181520] leading-snug">
            WE WOULD LOVE TO HEAR FROM YOU.
          </p>

          <div className="pt-24 hidden lg:block text-xs font-mono text-[#464157]/60 space-y-1">
            <p>PT. AQNESIA MULTI USAHA</p>
            <p>JAKARTA &amp; SURAKARTA</p>
          </div>
        </div>

        {/* Right Column: Frameless Minimalist Underline Form */}
        <div className="lg:col-span-7">
          {submitted ? (
            <div className="py-20 flex flex-col items-start justify-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#181520] text-[#c9d2e7] flex items-center justify-center">
                <Check className="w-5 h-5" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#181520] font-display uppercase tracking-tight">
                Message Sent
              </h3>
              <p className="text-xs sm:text-sm text-[#464157] max-w-md leading-relaxed">
                Thank you for reaching out. We will review your inquiry and follow up with you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-10 sm:space-y-12">
              {/* YOUR NAME */}
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-xs sm:text-sm font-display uppercase tracking-widest text-[#181520] block font-semibold"
                >
                  YOUR NAME
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-transparent border-b border-[#181520] pb-3 text-sm sm:text-base text-[#181520] placeholder:text-[#181520]/25 focus:outline-none transition-colors rounded-none"
                />
              </div>

              {/* YOUR EMAIL */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-xs sm:text-sm font-display uppercase tracking-widest text-[#181520] block font-semibold"
                >
                  YOUR EMAIL
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-transparent border-b border-[#181520] pb-3 text-sm sm:text-base text-[#181520] placeholder:text-[#181520]/25 focus:outline-none transition-colors rounded-none"
                />
              </div>

              {/* YOUR PROJECT IS ABOUT */}
              <div className="space-y-2">
                <label
                  htmlFor="project"
                  className="text-xs sm:text-sm font-display uppercase tracking-widest text-[#181520] block font-semibold"
                >
                  YOUR PROJECT IS ABOUT
                </label>
                <input
                  id="project"
                  type="text"
                  required
                  value={formData.project}
                  onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                  className="w-full bg-transparent border-b border-[#181520]/30 focus:border-[#181520] pb-3 text-sm sm:text-base text-[#181520] placeholder:text-[#181520]/25 focus:outline-none transition-colors rounded-none"
                />
              </div>

              {/* SUBMIT BUTTON */}
              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full bg-[#181520] text-[#c9d2e7] hover:bg-[#231b35] font-mono text-xs uppercase tracking-widest font-bold transition-all shadow-sm group"
                >
                  <span>SEND</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
