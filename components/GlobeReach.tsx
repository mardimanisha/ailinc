"use client";

import { useEffect, useMemo, useRef, useState } from "react";

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

/**
 * Network points fanning out from the India hub. The other stops are
 * generic — not tied to any real office — so the globe reads as "reach
 * everywhere," not "here's exactly where we are."
 */
const NODES: { lat: number; lng: number }[] = [
  { lat: 20, lng: 78 }, // hub — India
  { lat: 40, lng: -75 },
  { lat: 55, lng: -100 },
  { lat: 19, lng: -99 },
  { lat: -10, lng: -50 },
  { lat: 52, lng: -1 },
  { lat: 55, lng: 60 },
  { lat: 25, lng: 45 },
  { lat: 12, lng: 18 },
  { lat: 35, lng: 105 },
  { lat: 36, lng: 138 },
  { lat: 4, lng: 105 },
  { lat: -25, lng: 135 },
  { lat: -27, lng: 25 },
  { lat: 9, lng: 8 },
];

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

/**
 * A full-sphere Fibonacci lattice — every point on the globe gets a dot,
 * not just land, so the sphere itself reads as a solid mesh with
 * continents picked out as brighter clusters.
 */
function buildDots() {
  const dots: { lat: number; lng: number; land: boolean }[] = [];
  const n = 4200;
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const radius = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = golden * i;
    const x = Math.cos(theta) * radius;
    const z = Math.sin(theta) * radius;
    const lat = Math.asin(y) / RAD;
    const lng = Math.atan2(x, z) / RAD;
    const land = LAND.some((p) => pointInPolygon(lng, lat, p));
    dots.push({ lat, lng, land });
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
 * The section's centrepiece: a fixed dot-globe with a starburst of
 * routes fanning out from the India hub across the world. It holds
 * still — only the travelling packets and marker glow animate.
 */
export default function GlobeReach() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  const dots = useMemo(buildDots, []);
  // Pre-convert each land outline to sphere vectors once — coastlines stay
  // fixed relative to the globe, only the yaw/pitch rotation moves them.
  const coastlines = useMemo(() => LAND.map((poly) => poly.map(([lng, lat]) => toVec(lat, lng))), []);

  // Everything the render loop reads without wanting to restart on change.
  // yaw/pitch are fixed so the India hub sits front-and-centre — the
  // globe holds still, only the route packets travel.
  const state = useRef({
    yaw: -1.36,
    pitch: 0.3,
    drag: null as null | { x: number; y: number; yaw: number; pitch: number },
    hover: null as number | null,
    hits: [] as { idx: number; x: number; y: number }[],
    size: 0,
  });
  state.current.hover = hoverIdx;

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
      const size = Math.max(220, Math.min(wrap.clientWidth, 460));
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
      const R = size * 0.42;
      const cx = size / 2;
      const cy = size / 2;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, size, size);

      // atmosphere — a wide, vivid blue glow
      const halo = ctx.createRadialGradient(cx, cy, R * 0.6, cx, cy, R * 1.85);
      halo.addColorStop(0, "rgba(40,140,255,0.45)");
      halo.addColorStop(0.45, "rgba(35,86,214,0.22)");
      halo.addColorStop(1, "rgba(8,11,20,0)");
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.85, 0, Math.PI * 2);
      ctx.fill();

      // ocean body — a lit, saturated blue so the network reads clearly
      const body = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.4, R * 0.1, cx, cy, R);
      body.addColorStop(0, "rgba(24,60,130,0.96)");
      body.addColorStop(0.6, "rgba(12,32,78,0.97)");
      body.addColorStop(1, "rgba(6,14,36,0.99)");
      ctx.fillStyle = body;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(120,195,255,0.4)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // full-sphere dot mesh — land clusters bright, ocean dots dim but present
      for (const d of dots) {
        const p = rotate(toVec(d.lat, d.lng), s.yaw, s.pitch);
        if (p.z <= 0.02) continue;
        if (d.land) {
          const a = 0.55 + 0.45 * p.z;
          ctx.fillStyle = `rgba(190,230,255,${a.toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(cx + p.x * R, cy - p.y * R, 1 + p.z, 0, Math.PI * 2);
          ctx.fill();
        } else {
          const a = 0.07 + 0.14 * p.z;
          ctx.fillStyle = `rgba(80,135,205,${a.toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(cx + p.x * R, cy - p.y * R, 0.5 + 0.45 * p.z, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // coastline outlines — crisp edges on top of the dot mesh so each
      // continent's silhouette reads clearly, not just a speckle cluster.
      ctx.strokeStyle = "rgba(215,238,255,0.55)";
      ctx.lineWidth = 1.1;
      for (const poly of coastlines) {
        ctx.beginPath();
        let started = false;
        let prevZ = -1;
        for (let i = 0; i <= poly.length; i++) {
          const v = poly[i % poly.length];
          const p = rotate(v, s.yaw, s.pitch);
          if (p.z <= 0.02) {
            started = false;
            prevZ = p.z;
            continue;
          }
          const x = cx + p.x * R;
          const y = cy - p.y * R;
          if (started && prevZ > 0.02) ctx.lineTo(x, y);
          else ctx.moveTo(x, y);
          started = true;
          prevZ = p.z;
        }
        ctx.stroke();
      }

      // starburst — every route fans out of the one hub node, evenly bright
      const hub = toVec(NODES[0].lat, NODES[0].lng);
      for (let i = 1; i < NODES.length; i++) {
        const dest = toVec(NODES[i].lat, NODES[i].lng);
        const live = s.hover === i;
        const steps = 64;
        ctx.lineWidth = live ? 2.4 : 1.6;
        ctx.shadowColor = "rgba(70,180,255,0.9)";
        ctx.shadowBlur = live ? 18 : 10;
        ctx.beginPath();
        let started = false;
        for (let k = 0; k <= steps; k++) {
          const p = rotate(arcPoint(hub, dest, k / steps, 0.28), s.yaw, s.pitch);
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
        ctx.strokeStyle = live ? "rgba(190,235,255,0.98)" : "rgba(80,180,255,0.75)";
        ctx.stroke();
        ctx.shadowBlur = 0;

        // travelling packet
        const t = reduced ? 0.5 : (now / 2800 + i * 0.13) % 1;
        const pk = rotate(arcPoint(hub, dest, t, 0.28), s.yaw, s.pitch);
        if (pk.z > -0.05) {
          ctx.fillStyle = "rgba(220,245,255,0.9)";
          ctx.beginPath();
          ctx.arc(cx + pk.x * R, cy - pk.y * R, live ? 2.4 : 1.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // markers — every node styled the same, hover just brightens it
      const hits: { idx: number; x: number; y: number }[] = [];
      NODES.forEach((node, idx) => {
        const p = rotate(toVec(node.lat, node.lng), s.yaw, s.pitch);
        if (p.z <= 0) return;
        const x = cx + p.x * R;
        const y = cy - p.y * R;
        hits.push({ idx, x, y });

        const live = s.hover === idx;
        const fade = Math.min(1, p.z * 2.4);

        const glow = ctx.createRadialGradient(x, y, 0, x, y, live ? 13 : 9);
        glow.addColorStop(0, `rgba(120,210,255,${(0.55 * fade).toFixed(3)})`);
        glow.addColorStop(1, "rgba(120,210,255,0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(x, y, live ? 13 : 9, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = live
          ? `rgba(255,255,255,${fade})`
          : `rgba(150,210,255,${(0.95 * fade).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(x, y, live ? 4.4 : 3.4, 0, Math.PI * 2);
        ctx.fill();
      });
      s.hits = hits;
    };

    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [dots, coastlines]);

  const nearest = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    let best: number | null = null;
    let bd = 16;
    for (const h of state.current.hits) {
      const d = Math.hypot(h.x - px, h.y - py);
      if (d < bd) {
        bd = d;
        best = h.idx;
      }
    }
    return best;
  };

  return (
    <div ref={wrapRef} className="relative w-full">
      <canvas
        ref={canvasRef}
        className="mx-auto block touch-none select-none"
        style={{ cursor: "grab" }}
        onPointerDown={(e) => {
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
          setHoverIdx(nearest(e));
        }}
        onPointerUp={() => {
          state.current.drag = null;
        }}
        onPointerLeave={() => {
          state.current.drag = null;
          setHoverIdx(null);
        }}
      />
    </div>
  );
}
