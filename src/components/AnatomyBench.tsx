"use client";

import React, { useEffect, useRef, useState } from "react";
import anatomyData from "./anatomyData.json";

const {
  P,
  BLOCKS,
  DIAL,
  DIAL_R,
  DIAL_TOP,
  PER_TURN,
  STEP,
  BLOCK_W,
  TIP_R,
  BASE,
  STOPS,
  REACH,
  plate,
  rails,
  fixture,
  carriage,
  plunger,
  dial,
} = anatomyData;

const RADIANS = Math.PI / 180;
const UNIT = Math.sqrt(1.6);

function cameraOf(projection: typeof P) {
  const a = (projection.azimuth || 42) * RADIANS;
  const e = (projection.elevation || 30) * RADIANS;
  return {
    sinA: Math.sin(a),
    cosA: Math.cos(a),
    sinE: Math.sin(e),
    cosE: Math.cos(e),
    k: projection.scale * UNIT,
  };
}

function iso([x, y, z]: [number, number, number], projection: typeof P): [number, number] {
  const { origin } = projection;
  const { sinA, cosA, sinE, cosE, k } = cameraOf(projection);
  return [
    origin[0] + (x * sinA - y * cosA) * k,
    origin[1] + ((x * cosA + y * sinA) * sinE - z * cosE) * k,
  ];
}

function axisVector(projection: typeof P, [dx, dy, dz]: [number, number, number]): [number, number] {
  const origin = iso([0, 0, 0], projection);
  const moved = iso([dx, dy, dz], projection);
  return [moved[0] - origin[0], moved[1] - origin[1]];
}

function translateAlong(projection: typeof P, by: [number, number, number]): string {
  const [x, y] = axisVector(projection, by);
  return `translate(${Math.round(x * 100) / 100} ${Math.round(y * 100) / 100})`;
}

function needleAt(turn: number): string {
  const angle = turn * Math.PI * 2;
  const [x, y] = DIAL;
  const p1 = iso(
    [x - Math.sin(angle) * 3.4, y + Math.cos(angle) * 3.4, DIAL_TOP + 0.2],
    P
  );
  const p2 = iso(
    [x + Math.sin(angle) * (DIAL_R - 4), y - Math.cos(angle) * (DIAL_R - 4), DIAL_TOP + 0.2],
    P
  );
  return `M${Math.round(p1[0] * 10) / 10} ${Math.round(p1[1] * 10) / 10}L${Math.round(p2[0] * 10) / 10} ${Math.round(p2[1] * 10) / 10}`;
}

const BLOCK_METRICS = [
  { label: "BLOCK 01", height: 18.0, desc: "IOR Index: 1.52 (Crown Glass)", value: "18.0 mm" },
  { label: "BLOCK 02", height: 14.0, desc: "Roughness: 0.28 Ra (Microfacet)", value: "14.0 mm" },
  { label: "BLOCK 03", height: 10.0, desc: "Dispersion: 64.0 Abbe (Optical)", value: "10.0 mm" },
];

export default function AnatomyBench() {
  const stageRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const carriageRef = useRef<SVGGElement>(null);
  const plungerRef = useRef<SVGGElement>(null);
  const needleRef = useRef<SVGPathElement>(null);
  const readoutRef = useRef<HTMLSpanElement>(null);

  const [activeBlockIndex, setActiveBlockIndex] = useState<number>(0);
  const [touring, setTouring] = useState<boolean>(true);
  const [readout, setReadout] = useState<string>("BLOCK 01: 18.0 mm / IOR: 1.52 / 120 FPS");

  // Physics simulation references (to avoid re-renders at 60/120fps)
  const animRef = useRef<{
    x: number;
    target: number;
    tip: { at: number; rate: number };
    touring: boolean;
    clock: number;
    last: number;
    frame: number;
    visible: boolean;
    idleTimer: NodeJS.Timeout | null;
  }>({
    x: STOPS[0],
    target: STOPS[0],
    tip: { at: BASE + BLOCKS[0], rate: 0 },
    touring: true,
    clock: 0,
    last: 0,
    frame: 0,
    visible: false,
    idleTimer: null,
  });

  const clamp = (val: number, min: number, max: number) => Math.min(max, Math.max(min, val));

  const heightUnder = (cx: number) => {
    let top = BASE;
    BLOCKS.forEach((height, index) => {
      const from = cx - 24 + STEP * index;
      const to = from + BLOCK_W;
      if (to > DIAL[0] - TIP_R && from < DIAL[0] + TIP_R) {
        top = Math.max(top, BASE + height);
      }
    });
    return top;
  };

  const blockUnder = (cx: number) => {
    return BLOCKS.findIndex((_, index) => {
      const from = cx - 24 + STEP * index;
      return DIAL[0] >= from && DIAL[0] <= from + BLOCK_W;
    });
  };

  const steer = (next: number) => {
    const s = animRef.current;
    s.touring = false;
    setTouring(false);
    s.target = clamp(next, REACH[0], REACH[1]);

    if (s.idleTimer) clearTimeout(s.idleTimer);
    s.idleTimer = setTimeout(() => {
      if (typeof window !== "undefined" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        s.touring = true;
        setTouring(true);
        s.clock = 0;
        startLoop();
      }
    }, 4500);

    startLoop();
  };

  const startLoop = () => {
    const s = animRef.current;
    if (!s.frame && s.visible) {
      s.last = 0;
      s.frame = requestAnimationFrame(tick);
    }
  };

  const tick = (now: number) => {
    const s = animRef.current;
    const dt = s.last ? Math.min((now - s.last) / 1000, 1 / 30) : 1 / 60;
    s.last = now;

    const calm = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (s.touring) {
      s.clock += dt;
      const stepIdx = Math.floor(s.clock / 2.4) % STOPS.length;
      s.target = STOPS[stepIdx];
    }

    s.x = calm ? s.target : s.x + (s.target - s.x) * (1 - Math.exp(-dt / 0.28));
    if (Math.abs(s.target - s.x) < 0.01) s.x = s.target;

    const want = heightUnder(s.x);
    const stiff = 420;
    const drag = calm ? 2 * Math.sqrt(420) : 26;

    for (let i = 0; i < 4; i++) {
      s.tip.rate += ((want - s.tip.at) * stiff - s.tip.rate * drag) * (dt / 4);
      s.tip.at += s.tip.rate * (dt / 4);
    }

    if (Math.abs(want - s.tip.at) < 0.005 && Math.abs(s.tip.rate) < 0.005) {
      s.tip.at = want;
      s.tip.rate = 0;
    }

    // Direct DOM attribute mutations for 120 FPS render performance
    if (carriageRef.current) {
      carriageRef.current.setAttribute("transform", translateAlong(P, [s.x, 0, 0]));
    }
    if (plungerRef.current) {
      plungerRef.current.setAttribute("transform", translateAlong(P, [0, 0, s.tip.at]));
    }
    if (needleRef.current) {
      needleRef.current.setAttribute("d", needleAt((s.tip.at - BASE) / PER_TURN));
    }

    const bIdx = blockUnder(s.x);
    setActiveBlockIndex(bIdx);

    const deflection = (s.tip.at - BASE).toFixed(1);
    let statusText = "";
    if (bIdx >= 0) {
      const metric = BLOCK_METRICS[bIdx];
      statusText = `${metric.label}: ${deflection} mm / ${metric.desc.split(" ")[0]} ${metric.desc.split(" ")[1]}`;
    } else {
      statusText = `TRANSIT: ${deflection} mm DEFLECTION`;
    }

    if (readoutRef.current && readoutRef.current.textContent !== statusText) {
      readoutRef.current.textContent = statusText;
      setReadout(statusText);
    }

    if (stageRef.current) {
      stageRef.current.setAttribute("aria-valuenow", String(Math.round(s.tip.at - BASE)));
      stageRef.current.setAttribute("aria-valuetext", statusText);
    }

    const settled = !s.touring && s.x === s.target && s.tip.rate === 0 && s.tip.at === want;
    s.frame = s.visible && !settled ? requestAnimationFrame(tick) : 0;
  };

  useEffect(() => {
    const s = animRef.current;
    const stage = stageRef.current;
    if (!stage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        s.visible = Boolean(entries[entries.length - 1]?.isIntersecting);
        if (s.visible) startLoop();
      },
      { rootMargin: "120px 0px" }
    );

    observer.observe(stage);

    const onPointerMove = (e: PointerEvent) => {
      if (!svgRef.current) return;
      const rect = svgRef.current.getBoundingClientRect();
      const share = clamp(((e.clientX - rect.left) / rect.width - 0.22) / 0.56, 0, 1);
      steer(REACH[0] + share * (REACH[1] - REACH[0]));
    };

    const onKeyDown = (e: KeyboardEvent) => {
      const currentIdx = STOPS.reduce(
        (best, stop, idx) => (Math.abs(stop - s.target) < Math.abs(STOPS[best] - s.target) ? idx : best),
        0
      );
      let nextIdx: number | null = null;
      if (e.key === "ArrowRight" || e.key === "ArrowUp") nextIdx = Math.max(0, currentIdx - 1);
      if (e.key === "ArrowLeft" || e.key === "ArrowDown") nextIdx = Math.min(STOPS.length - 1, currentIdx + 1);
      if (e.key === "Home") nextIdx = 0;
      if (e.key === "End") nextIdx = STOPS.length - 1;

      if (nextIdx !== null) {
        e.preventDefault();
        steer(STOPS[nextIdx]);
      }
    };

    stage.addEventListener("pointermove", onPointerMove);
    stage.addEventListener("keydown", onKeyDown);

    // Initial render
    if (carriageRef.current) carriageRef.current.setAttribute("transform", translateAlong(P, [s.x, 0, 0]));
    if (plungerRef.current) plungerRef.current.setAttribute("transform", translateAlong(P, [0, 0, s.tip.at]));
    if (needleRef.current) needleRef.current.setAttribute("d", needleAt((s.tip.at - BASE) / PER_TURN));

    return () => {
      observer.disconnect();
      stage.removeEventListener("pointermove", onPointerMove);
      stage.removeEventListener("keydown", onKeyDown);
      if (s.frame) cancelAnimationFrame(s.frame);
      if (s.idleTimer) clearTimeout(s.idleTimer);
    };
  }, []);

  return (
    <section className="relative w-full py-24 px-6 md:px-12 lg:px-24 bg-white border-t border-[#181520]/15">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#181520]/15">
          <div className="max-w-xl">
            <span className="font-mono text-xs tracking-widest text-[#181520]/60 uppercase block mb-2">
              Lorem Ipsum Fig. 01
            </span>
            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight text-[#181520] font-machina">
              Lorem Ipsum Bench
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-sm md:text-base text-[#181520]/75 max-w-md font-sans">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        {/* Isometric Apparatus Plate */}
        <div className="iso" data-theme="light">
          <figure className="iso-figure !m-0">
            <div className="iso-plate rounded-xl shadow-lg overflow-hidden border border-[#181520]/20 bg-[#d8e2f0]">
              {/* Corner Metadata HUD */}
              <div className="iso-plate-corners pointer-events-none" aria-hidden="true">
                <span className="iso-plate-corner" data-corner="fig">
                  FIG. 1
                </span>
                <span className="iso-plate-corner" data-corner="title">
                  SPATIAL OPTICS & GLASS DISPERSION BENCH
                </span>
                <span className="iso-plate-corner" data-corner="hint">
                  HOVER OR USE ARROW KEYS TO SLIDE
                </span>
                <span className="iso-plate-corner font-mono" data-corner="readout" ref={readoutRef}>
                  {readout}
                </span>
              </div>

              {/* Interactive Stage */}
              <div
                ref={stageRef}
                className="iso-stage outline-none focus-visible:ring-2 focus-visible:ring-[#181520] rounded cursor-ew-resize"
                tabIndex={0}
                role="slider"
                aria-label="Calibration bench: arrow keys move carriage along the optical gauge blocks"
                aria-valuemin={0}
                aria-valuemax={18}
                aria-valuenow={18}
              >
                <svg
                  ref={svgRef}
                  xmlns="http://www.w3.org/2000/svg"
                  className="iso-svg"
                  viewBox="0 0 600 380"
                  role="img"
                  aria-label="Isometric calibration apparatus on a precision steel surface plate with sliding gauge blocks and dial indicator"
                >
                  {/* Pre-rendered Static Geometry */}
                  <g dangerouslySetInnerHTML={{ __html: plate }} />
                  <g dangerouslySetInnerHTML={{ __html: rails }} />
                  <g dangerouslySetInnerHTML={{ __html: fixture }} />

                  {/* Dynamic Moving Parts */}
                  <g ref={carriageRef} data-part="carriage">
                    <g dangerouslySetInnerHTML={{ __html: carriage }} />
                  </g>

                  <g ref={plungerRef} data-part="plunger">
                    <g dangerouslySetInnerHTML={{ __html: plunger }} />
                  </g>

                  <g dangerouslySetInnerHTML={{ __html: dial }} />

                  {/* Dial Gauge Indicator Needle */}
                  <path
                    ref={needleRef}
                    data-part="needle"
                    className="iso-line"
                    data-tone="lit"
                    data-free="start"
                    d={needleAt(BLOCKS[0] / PER_TURN)}
                    style={{ strokeWidth: "1.25px", stroke: "#181520" }}
                  />
                </svg>
              </div>
            </div>

            {/* Bench Controls & Gauge Block Selector */}
            <div className="mt-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono font-semibold tracking-wider text-[#181520]/60 mr-2 uppercase">
                  Gauge Presets:
                </span>
                {BLOCK_METRICS.map((block, idx) => {
                  const isSelected = activeBlockIndex === idx;
                  return (
                    <button
                      key={block.label}
                      type="button"
                      onClick={() => steer(STOPS[idx])}
                      className={`px-3.5 py-1.5 text-xs font-mono font-medium rounded-md border transition-all duration-200 flex items-center gap-2 ${
                        isSelected
                          ? "bg-[#181520] text-[#c9d2e7] border-[#181520] shadow-sm"
                          : "bg-white/40 hover:bg-white/70 text-[#181520] border-[#181520]/25"
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? "bg-[#c9d2e7]" : "bg-[#181520]/40"}`} />
                      {block.label} ({block.value})
                    </button>
                  );
                })}
              </div>

              {/* Auto Tour Toggle */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    const next = !touring;
                    setTouring(next);
                    animRef.current.touring = next;
                    if (next) startLoop();
                  }}
                  className="px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider rounded-md border border-[#181520]/25 bg-white/40 hover:bg-white/70 text-[#181520] transition-colors"
                >
                  Tour Mode: {touring ? "Active" : "Paused"}
                </button>
                <span className="text-xs font-mono text-[#181520]/60 hidden sm:inline-block">
                  120 Hz Physics Loop
                </span>
              </div>
            </div>

            {/* Instrument Legend & Engineering Specs */}
            <figcaption className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-[#181520]/15 text-xs text-[#181520]/80">
              <div className="flex items-start gap-3">
                <div className="w-2.5 h-2.5 rounded-sm bg-[#181520] mt-0.5 shrink-0" />
                <div>
                  <strong className="block font-medium text-[#181520]">Hardened Micrometer Plunger</strong>
                  Precision spring-mass damper (k=420 N/m) tracking vertical step deflection.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2.5 h-2.5 rounded-sm bg-[#4a5568] mt-0.5 shrink-0" />
                <div>
                  <strong className="block font-medium text-[#181520]">Graduated Dial Needle</strong>
                  Single rotation corresponds to 20.0 mm carriage travel with 0.01 mm resolution.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2.5 h-2.5 rounded-sm bg-white border border-[#181520]/30 mt-0.5 shrink-0" />
                <div>
                  <strong className="block font-medium text-[#181520]">Three Stepped Gauge Blocks</strong>
                  Simulates dispersion across glass densities from 10.0 mm to 18.0 mm optical height.
                </div>
              </div>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
