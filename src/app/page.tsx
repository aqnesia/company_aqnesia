"use client";

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ScrollyCases from "@/components/ScrollyCases";
import ShowreelSection from "@/components/ShowreelSection";
import ServicesSection from "@/components/ServicesSection";
import AnatomyBench from "@/components/AnatomyBench";
import WorkSection from "@/components/WorkSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import NewsSection from "@/components/NewsSection";
import ContactFormSection from "@/components/ContactFormSection";
import Footer from "@/components/Footer";

// Dynamically import Scene3D with SSR disabled to prevent hydration mismatch
const Scene3D = dynamic(() => import("@/components/Scene3D"), {
  ssr: false,
});

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const trackHeight = trackRef.current.offsetHeight - window.innerHeight;
      if (trackHeight > 0) {
        const progress = Math.min(Math.max(-rect.top / trackHeight, 0), 1);
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-Snap per Negara & Klimaks Segitiga: Indonesia (0.20), Jepang (0.48), Taiwan (0.76), Segitiga 3 Bendera (0.96)
  useEffect(() => {
    const STOPS = [0.20, 0.48, 0.76, 0.96];
    let isLocked = false;
    let lockTimer: any = null;

    const handleWheel = (e: WheelEvent) => {
      if (!trackRef.current) return;
      const trackHeight = trackRef.current.offsetHeight - window.innerHeight;
      if (trackHeight <= 0) return;

      const currentY = window.scrollY;
      const trackTop = trackRef.current.offsetTop;
      const trackBottom = trackTop + trackHeight;

      // Hanya aktif saat berada di area track scrollytelling (setelah Hero / Wayang)
      const inTrackZone = currentY >= trackTop - 60 && currentY <= trackBottom + 60;
      if (!inTrackZone) return;

      const currentProgress = Math.min(Math.max((currentY - trackTop) / trackHeight, 0), 1);

      if (isLocked) {
        e.preventDefault();
        return;
      }

      const delta = e.deltaY;
      if (Math.abs(delta) < 25) return;

      const lenis = (window as any).__lenis;

      if (delta > 0) {
        // Scroll ke bawah
        const nextStop = STOPS.find((s) => s > currentProgress + 0.05);
        if (nextStop !== undefined) {
          e.preventDefault();
          isLocked = true;
          const targetY = trackTop + trackHeight * nextStop;
          if (lenis) {
            lenis.scrollTo(targetY, { duration: 0.9 });
          } else {
            window.scrollTo({ top: targetY, behavior: "smooth" });
          }
          clearTimeout(lockTimer);
          lockTimer = setTimeout(() => {
            isLocked = false;
          }, 850);
        } else if (currentProgress >= 0.90 && currentY < trackBottom + 20) {
          // Dari Segitiga 3 Bendera lanjut keluar ke Showreel
          e.preventDefault();
          isLocked = true;
          const targetY = trackBottom + 120;
          if (lenis) {
            lenis.scrollTo(targetY, { duration: 0.9 });
          } else {
            window.scrollTo({ top: targetY, behavior: "smooth" });
          }
          clearTimeout(lockTimer);
          lockTimer = setTimeout(() => {
            isLocked = false;
          }, 850);
        }
      } else {
        // Scroll ke atas
        const prevStops = [...STOPS].reverse();
        const prevStop = prevStops.find((s) => s < currentProgress - 0.05);
        if (prevStop !== undefined) {
          e.preventDefault();
          isLocked = true;
          const targetY = trackTop + trackHeight * prevStop;
          if (lenis) {
            lenis.scrollTo(targetY, { duration: 0.9 });
          } else {
            window.scrollTo({ top: targetY, behavior: "smooth" });
          }
          clearTimeout(lockTimer);
          lockTimer = setTimeout(() => {
            isLocked = false;
          }, 850);
        } else if (currentProgress <= 0.25 && currentY > trackTop - 30) {
          // Dari Indonesia kembali ke Hero (paling atas)
          e.preventDefault();
          isLocked = true;
          if (lenis) {
            lenis.scrollTo(0, { duration: 0.9 });
          } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
          clearTimeout(lockTimer);
          lockTimer = setTimeout(() => {
            isLocked = false;
          }, 850);
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      clearTimeout(lockTimer);
    };
  }, []);

  return (
    <SmoothScroll>
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      <main className="relative min-h-screen bg-white text-[#181520] overflow-x-hidden selection:bg-[#181520] selection:text-white">
        {/* Full 3D WebGL Canvas (Driven by Waypoints) */}
        <Scene3D scrollProgress={scrollProgress} />

        <Navbar />

        {/* Hero Section: Di luar sticky container sehingga saat di-scroll ke bawah, teks langsung naik dan keluar layar secara alami */}
        <HeroSection />

        {/* 3D Camera Scrollytelling Track (300vh for smooth camera flight) */}
        <div ref={trackRef} className="relative h-[300vh]">
          {/* Pinned Viewport Container khusus untuk Case HUD */}
          <div className="sticky top-0 h-screen overflow-hidden pointer-events-none flex flex-col justify-end">
            <ScrollyCases scrollProgress={scrollProgress} />
          </div>
        </div>

        {/* Subsequent Editorial Sections */}
        <ShowreelSection />
        <ServicesSection />
        <AnatomyBench />
        <WorkSection />
        <TestimonialsSection />
        <NewsSection />
        <ContactFormSection />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
