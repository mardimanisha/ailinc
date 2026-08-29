"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import { operatingCountries } from "@/lib/content";

/* -------------------------------------------------------------
   Coarse land outlines, [lng, lat]. These are only ever sampled at
   ~3°, so they exist to decide which dots of the sphere read as
   land — not to be an accurate map.
------------------------------------------------------------- */
const LAND: [number, number][][] = [
  // North America
  [[-168, 65], [-160, 71], [-130, 70], [-100, 72], [-80, 73], [-60, 60], [-52, 47],
   [-66, 45], [-70, 41], [-75, 35], [-81, 25], [-90, 29], [-97, 26], [-105, 20],
   [-115, 29], [-125, 40], [-135, 58], [-150, 60]],
  // Central America
  [[-105, 20], [-92, 18], [-83, 15], [-77, 8], [-82, 8], [-88, 15], [-95, 16], [-102, 16]],
  // South America
  [[-81, 8], [-70, 12], [-60, 10], [-52, 5], [-35, -5], [-38, -15], [-48, -25],
   [-58, -35], [-62, -42], [-66, -52], [-73, -52], [-71, -40], [-75, -20], [-81, -6]],
  // Greenland
  [[-45, 60], [-55, 70], [-50, 78], [-30, 82], [-20, 75], [-30, 66]],
  // Europe
  [[-10, 36], [-9, 44], [-2, 49], [4, 51], [5, 58], [12, 55], [10, 64], [20, 70],
   [30, 70], [40, 66], [45, 55], [40, 47], [28, 45], [20, 42], [24, 35], [12, 38], [0, 38]],
  // British Isles
  [[-8, 51], [-2, 53], [-3, 58], [-7, 57]],
  // Africa
  [[-17, 15], [-16, 28], [-10, 32], [10, 33], [25, 32], [33, 31], [43, 12], [51, 12],
   [42, -2], [40, -15], [35, -24], [25, -34], [18, -34], [12, -18], [9, 4], [-8, 4]],
  // Asia
  [[26, 40], [40, 45], [50, 50], [60, 55], [70, 70], [90, 75], [110, 76], [130, 72],
   [145, 70], [165, 67], [180, 65], [180, 60], [160, 55], [140, 50], [135, 42],
   [127, 35], [122, 30], [110, 20], [105, 10], [100, 5], [95, 15], [90, 22], [80, 8],
   [72, 20], [65, 25], [58, 25], [48, 30], [45, 38], [35, 37]],
  // Japan
  [[130, 32], [140, 36], [146, 44], [140, 45], [134, 34]],
  // Indonesia / maritime SE Asia
  [[95, 6], [118, 2], [135, -3], [140, -8], [120, -9], [105, -7], [96, -2]],
  // Australia
  [[113, -22], [114, -33], [129, -32], [138, -35], [146, -39], [150, -37], [153, -28],
   [146, -19], [142, -11], [132, -11], [125, -14]],
  // New Zealand
  [[166, -46], [174, -41], [178, -37], [173, -34], [168, -44]],
];

/** Real coordinates for each delivery country, keyed by ISO code. */
const NODES: Record<string, { lat: number; lng: number; city: string }> = {
  SA: { lat: 24.71, lng: 46.68, city: "Riyadh" },
  AE: { lat: 25.2, lng: 55.27, city: "Dubai" },
  SG: { lat: 1.35, lng: 103.82, city: "Singapore" },
  LK: { lat: 6.93, lng: 79.86, city: "Colombo" },
  IN: { lat: 17.38, lng: 78.49, city: "Hyderabad" },
  AU: { lat: -33.87, lng: 151.21, city: "Sydney" },
};

const HQ = "IN";
const RAD = Math.PI / 180;

function pointInPolygon(x: number, y: number, poly: [number, number][]) {
  let hit = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) hit = !hit;
  }
  return hit;
}

/** Roughly equal-area dot lattice, land only. */
function buildDots() {
  const dots: { lat: number; lng: number }[] = [];
  for (let lat = -84; lat <= 84; lat += 2.2) {
    const step = 2.2 / Math.max(0.25, Math.cos(lat * RAD));
    for (let lng = -180; lng < 180; lng += step) {
      if (LAND.some((p) => pointInPolygon(lng, lat, p))) dots.push({ lat, lng });
    }
  }
  return dots;
}

type Vec = { x: number; y: number; z: number };

function toVec(lat: number, lng: number): Vec {
  const a = lat * RAD;
  const b = lng * RAD;
  return { x: Math.cos(a) * Math.sin(b), y: Math.sin(a), z: Math.cos(a) * Math.cos(b) };
}

/** Spin around the pole, then tilt the pole toward the viewer. */
function rotate(v: Vec, yaw: number, pitch: number): Vec {
  const cy = Math.cos(yaw);
  const sy = Math.sin(yaw);
  const x = v.x * cy + v.z * sy;
  const z0 = -v.x * sy + v.z * cy;
  const cp = Math.cos(pitch);
  const sp = Math.sin(pitch);
  return { x, y: v.y * cp - z0 * sp, z: v.y * sp + z0 * cp };
}

/** Great-circle interpolation, lifted off the surface at mid-span. */
function arcPoint(a: Vec, b: Vec, t: number, lift: number): Vec {
  const dot = Math.min(1, Math.max(-1, a.x * b.x + a.y * b.y + a.z * b.z));
  const w = Math.acos(dot);
  const s = Math.sin(w) || 1e-6;
  const k1 = Math.sin((1 - t) * w) / s;
  const k2 = Math.sin(t * w) / s;
  const r = 1 + lift * Math.sin(Math.PI * t);
  return {
    x: (a.x * k1 + b.x * k2) * r,
    y: (a.y * k1 + b.y * k2) * r,
    z: (a.z * k1 + b.z * k2) * r,
  };
}

/**
 * The section's centrepiece: a draggable dot-globe with live routes
 * running out of the Hyderabad HQ to every delivery country.
 */
export default function GlobeReach({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (code: string) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<string | null>(null);

  const dots = useMemo(buildDots, []);

  // Everything the render loop reads without wanting to restart on change.
  const state = useRef({
    yaw: -1.2,
    pitch: 0.32,
    drag: null as null | { x: number; y: number; yaw: number; pitch: number },
    selected,
    hover: null as string | null,
    hits: [] as { code: string; x: number; y: number }[],
    size: 0,
  });
  state.current.selected = selected;
  state.current.hover = hover;

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let visible = true;
    let raf = 0;
    let dpr = 1;

    const resize = () => {
      const size = Math.max(220, Math.min(wrap.clientWidth, 390));
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = size * dpr;
      canvas.height = size * dpr;
      // The backing store is square, so pin the CSS box to match or the
      // globe renders as an ellipse in a wider container.
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;
      state.current.size = size;
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), {
      threshold: 0.02,
    });
    io.observe(wrap);

    let last = performance.now();

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(64, now - last);
      last = now;
      if (!visible) return;

      const s = state.current;
      const size = s.size;
      const R = size * 0.37;
      const cx = size / 2;
      const cy = size / 2;

      // Ease the selected node round to face the viewer, then drift on.
      if (!s.drag) {
        const node = NODES[s.selected];
        if (node) {
          const target = -node.lng * RAD;
          let d = target - s.yaw;
          while (d > Math.PI) d -= 2 * Math.PI;
          while (d < -Math.PI) d += 2 * Math.PI;
          s.yaw += d * Math.min(1, dt / 700);
          if (!reduced && Math.abs(d) < 0.02) s.yaw += 0.00004 * dt;
        } else if (!reduced) {
          s.yaw += 0.00009 * dt;
        }
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, size, size);

      // atmosphere
      const halo = ctx.createRadialGradient(cx, cy, R * 0.75, cx, cy, R * 1.55);
      halo.addColorStop(0, "rgba(0,224,255,0.15)");
      halo.addColorStop(0.45, "rgba(35,86,214,0.09)");
      halo.addColorStop(1, "rgba(8,11,20,0)");
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.55, 0, Math.PI * 2);
      ctx.fill();

      // ocean body
      const body = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.4, R * 0.1, cx, cy, R);
      body.addColorStop(0, "rgba(30,40,72,0.95)");
      body.addColorStop(1, "rgba(8,11,20,0.98)");
      ctx.fillStyle = body;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(109,148,255,0.22)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // graticule
      ctx.strokeStyle = "rgba(109,148,255,0.10)";
      for (let lat = -60; lat <= 60; lat += 30) {
        ctx.beginPath();
        let started = false;
        for (let lng = -180; lng <= 180; lng += 4) {
          const p = rotate(toVec(lat, lng), s.yaw, s.pitch);
          if (p.z <= 0) {
            started = false;
            continue;
          }
          const x = cx + p.x * R;
          const y = cy - p.y * R;
          if (started) ctx.lineTo(x, y);
          else {
            ctx.moveTo(x, y);
            started = true;
          }
        }
        ctx.stroke();
      }

      // land dots
      for (const d of dots) {
        const p = rotate(toVec(d.lat, d.lng), s.yaw, s.pitch);
        if (p.z <= 0.02) continue;
        const a = 0.14 + 0.66 * p.z;
        ctx.fillStyle = `rgba(154,199,255,${a.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(cx + p.x * R, cy - p.y * R, 0.5 + 0.75 * p.z, 0, Math.PI * 2);
        ctx.fill();
      }

      // routes out of the HQ
      const hq = toVec(NODES[HQ].lat, NODES[HQ].lng);
      const codes = Object.keys(NODES).filter((c) => c !== HQ);
      codes.forEach((code, i) => {
        const dest = toVec(NODES[code].lat, NODES[code].lng);
        const live = s.selected === code || s.hover === code;
        const steps = 64;
        ctx.lineWidth = live ? 1.8 : 1;
        ctx.beginPath();
        let started = false;
        for (let k = 0; k <= steps; k++) {
          const p = rotate(arcPoint(hq, dest, k / steps, 0.28), s.yaw, s.pitch);
          if (p.z <= -0.08) {
            started = false;
            continue;
          }
          const x = cx + p.x * R;
          const y = cy - p.y * R;
          if (started) ctx.lineTo(x, y);
          else {
            ctx.moveTo(x, y);
            started = true;
          }
        }
        ctx.strokeStyle = live ? "rgba(0,224,255,0.85)" : "rgba(0,224,255,0.26)";
        ctx.stroke();

        // travelling packet
        const t = reduced ? 0.5 : (now / 2600 + i * 0.19) % 1;
        const pk = rotate(arcPoint(hq, dest, t, 0.28), s.yaw, s.pitch);
        if (pk.z > -0.05) {
          ctx.fillStyle = live ? "rgba(255,255,255,0.95)" : "rgba(0,224,255,0.7)";
          ctx.beginPath();
          ctx.arc(cx + pk.x * R, cy - pk.y * R, live ? 2.6 : 1.8, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // markers
      const hits: { code: string; x: number; y: number }[] = [];
      for (const code of Object.keys(NODES)) {
        const p = rotate(toVec(NODES[code].lat, NODES[code].lng), s.yaw, s.pitch);
        if (p.z <= 0) continue;
        const x = cx + p.x * R;
        const y = cy - p.y * R;
        hits.push({ code, x, y });

        const isHq = code === HQ;
        const live = s.selected === code || s.hover === code;
        const fade = Math.min(1, p.z * 2.4);

        if (live || isHq) {
          const pulse = reduced ? 0.4 : (now / (isHq ? 1900 : 1400) + (isHq ? 0 : 0.4)) % 1;
          ctx.strokeStyle = `rgba(0,224,255,${((1 - pulse) * 0.55 * fade).toFixed(3)})`;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.arc(x, y, 5 + pulse * 16, 0, Math.PI * 2);
          ctx.stroke();
        }

        ctx.fillStyle = live
          ? `rgba(255,255,255,${fade})`
          : isHq
            ? `rgba(0,224,255,${fade})`
            : `rgba(109,148,255,${(0.85 * fade).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(x, y, live ? 4.4 : 3.2, 0, Math.PI * 2);
        ctx.fill();

        if (live) {
          ctx.strokeStyle = `rgba(0,224,255,${fade})`;
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.arc(x, y, 8.5, 0, Math.PI * 2);
          ctx.stroke();

          const label = `${NODES[code].city.toUpperCase()}${isHq ? " · HQ" : ""}`;
          ctx.font = "600 10px ui-sans-serif, system-ui, sans-serif";
          const w = ctx.measureText(label).width;
          const bx = Math.min(Math.max(x - w / 2 - 7, 4), size - w - 18);
          const by = y - 30;
          ctx.fillStyle = "rgba(12,17,32,0.92)";
          ctx.beginPath();
          ctx.roundRect(bx, by, w + 14, 20, 6);
          ctx.fill();
          ctx.strokeStyle = "rgba(0,224,255,0.35)";
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.fillStyle = "rgba(242,244,250,0.95)";
          ctx.fillText(label, bx + 7, by + 14);
        }
      }
      s.hits = hits;
    };

    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [dots]);

  const nearest = useCallback((e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    let best: string | null = null;
    let bd = 20;
    for (const h of state.current.hits) {
      const d = Math.hypot(h.x - px, h.y - py);
      if (d < bd) {
        bd = d;
        best = h.code;
      }
    }
    return best;
  }, []);

  const active = operatingCountries.find((c) => c.code === selected);

  return (
    <div ref={wrapRef} className="relative w-full">
      <canvas
        ref={canvasRef}
        className="mx-auto block touch-none select-none"
        style={{ cursor: hover ? "pointer" : "grab" }}
        onPointerDown={(e) => {
          const hit = nearest(e);
          if (hit) {
            onSelect(hit);
            return;
          }
          e.currentTarget.setPointerCapture(e.pointerId);
          state.current.drag = {
            x: e.clientX,
            y: e.clientY,
            yaw: state.current.yaw,
            pitch: state.current.pitch,
          };
        }}
        onPointerMove={(e) => {
          const drag = state.current.drag;
          if (drag) {
            state.current.yaw = drag.yaw + (e.clientX - drag.x) * 0.006;
            state.current.pitch = Math.max(
              -0.9,
              Math.min(0.9, drag.pitch + (e.clientY - drag.y) * 0.005)
            );
            return;
          }
          setHover(nearest(e));
        }}
        onPointerUp={() => {
          state.current.drag = null;
        }}
        onPointerLeave={() => {
          state.current.drag = null;
          setHover(null);
        }}
      />

      {/* country selector */}
      <div className="-mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {operatingCountries.map((c) => {
          const on = selected === c.code;
          return (
            <button
              key={c.code}
              type="button"
              onClick={() => onSelect(c.code)}
              onMouseEnter={() => setHover(c.code)}
              onMouseLeave={() => setHover(null)}
              aria-pressed={on}
              className={clsx(
                "flex items-center gap-2 rounded-full py-1.5 pl-1.5 pr-3 text-xs font-medium transition-all duration-300",
                on
                  ? "text-brand-deep"
                  : "bg-ink-3/70 text-paper-2/60 ring-1 ring-brand-soft/15 hover:text-paper hover:ring-brand-2/40"
              )}
              style={on ? { background: "var(--brand-grad)" } : undefined}
            >
              <span className="relative size-5 overflow-hidden rounded-full ring-1 ring-ink-4">
                <Image src={c.flag} alt="" fill sizes="20px" className="object-cover" />
              </span>
              {c.name}
            </button>
          );
        })}
      </div>

      {/* min-h: the caption swaps with mode="wait", so the box must not collapse */}
      <div className="mt-4 flex min-h-[2.9rem] items-center rounded-2xl bg-ink/45 px-5 py-3 ring-1 ring-brand-soft/12">
        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="flex w-full flex-wrap items-baseline justify-between gap-x-4 gap-y-1"
          >
            <span className="text-sm font-medium text-paper">{active?.name}</span>
            <span className="text-[0.68rem] uppercase tracking-[0.14em] text-brand-2/75">
              {selected === HQ
                ? "Hyderabad · headquarters"
                : `${NODES[selected]?.city} · delivery`}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
