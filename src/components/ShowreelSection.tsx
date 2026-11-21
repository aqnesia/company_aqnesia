"use client";

import React, { useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize2 } from "lucide-react";

export default function ShowreelSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <section id="about" className="relative py-24 px-6 sm:px-12 max-w-7xl mx-auto z-10 space-y-20">
      {/* Editorial Statement: Digital made human */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end border-b border-[#181520]/15 pb-16">
        <div className="md:col-span-6">
          <span className="text-xs font-mono uppercase tracking-widest text-[#464157] block mb-2 font-semibold">
            Lorem Ipsum
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#181520] font-display uppercase">
            Lorem ipsum dolor sit amet
          </h2>
        </div>
        <p className="md:col-span-6 text-sm sm:text-base text-[#231b35] leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
        </p>
      </div>

      {/* Showreel Video Container */}
      <div className="space-y-4">
        <div className="flex justify-between items-center text-xs font-mono text-[#464157]">
          <span className="font-semibold text-[#181520]">LOREM IPSUM 2025</span>
          <span className="uppercase">{isMuted ? "Click Speaker to Unmute" : "Sound Enabled"}</span>
        </div>

        <div className="relative rounded-xl overflow-hidden border border-[#181520]/20 bg-[#181520] shadow-xl group">
          <video
            ref={videoRef}
            src="https://noomo-website.cdn.prismic.io/noomo-website/aHDVIEMqNJQqHyXy_Showreel2025.mp4"
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="w-full h-auto aspect-video object-cover"
          />

          {/* Clean minimal controls on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-6 pointer-events-none">
            <div className="flex items-center gap-3 pointer-events-auto">
              <button
                onClick={togglePlay}
                className="p-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white transition-all border border-white/20"
                aria-label={isPlaying ? "Pause Video" : "Play Video"}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              </button>

              <button
                onClick={toggleMute}
                className="p-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white transition-all border border-white/20"
                aria-label={isMuted ? "Unmute Sound" : "Mute Sound"}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>

            <button
              onClick={handleFullscreen}
              className="p-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white transition-all border border-white/20 pointer-events-auto"
              aria-label="Fullscreen"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
