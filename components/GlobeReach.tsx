"use client";

import { useEffect, useMemo, useRef, useState } from "react";

/* -------------------------------------------------------------
   Land outlines as [lng, lat] rings. Coarse by design — they are
   sampled on a ~2° lattice to decide which dots read as land, so
   they only need to carry each landmass's silhouette, not its
   coastline. Rings are simple non-self-intersecting loops; the big
   bays (Hudson, the Mediterranean, the Gulf) are folded in as
   indentations rather than carried as separate holes.
------------------------------------------------------------- */
const LAND: [number, number][][] = [
  // North America — Hudson Bay traced as an inward bay
  [[-168, 66], [-166, 60], [-158, 56], [-150, 59], [-140, 60], [-133, 55], [-124, 48],
   [-124, 40], [-120, 34], [-117, 32], [-110, 24], [-106, 23], [-98, 19], [-95, 18],
   [-92, 18], [-88, 21], [-90, 21], [-97, 22], [-97, 26], [-93, 29], [-89, 29],
   [-84, 30], [-81, 25], [-80, 27], [-81, 31], [-76, 35], [-75, 38], [-70, 42],
   [-67, 45], [-60, 47], [-55, 52], [-64, 58], [-78, 62], [-80, 55], [-92, 57],
   [-94, 62], [-87, 66], [-95, 68], [-110, 68], [-125, 70], [-140, 70], [-155, 71],
   [-165, 68]],
  // Central America
  [[-92, 18], [-88, 16], [-83, 15], [-79, 9], [-77, 8], [-83, 10], [-87, 13], [-94, 16]],
  // South America
  [[-77, 8], [-72, 12], [-62, 10], [-52, 5], [-50, 0], [-44, -2], [-38, -5], [-35, -8],
   [-39, -17], [-42, -22], [-48, -25], [-53, -33], [-57, -38], [-62, -40], [-65, -45],
   [-68, -52], [-73, -54], [-75, -45], [-73, -37], [-71, -30], [-70, -20], [-76, -14],
   [-81, -6], [-80, 0], [-77, 4]],
  // Greenland
  [[-45, 60], [-52, 64], [-53, 68], [-55, 72], [-60, 76], [-68, 78], [-62, 82],
   [-40, 83], [-25, 80], [-22, 75], [-28, 70], [-38, 66], [-42, 62]],
  // Iceland
  [[-24, 65], [-18, 66], [-14, 65], [-18, 63.5], [-22, 64]],
  // Caribbean — Cuba / Hispaniola band
  [[-85, 22], [-77, 20], [-70, 19], [-74, 20.5], [-80, 23]],
  // Eurasia — the Mediterranean and the Gulf folded in as bays
  [[-9, 37], [-6, 36], [-2, 36.7], [3, 42], [5, 43], [8, 44], [10, 43], [12, 41],
   [15, 40], [16, 38], [17, 40], [15, 42], [13, 45], [15, 44], [19, 42], [23, 40],
   [24, 38], [26, 38], [29, 36], [36, 36], [35, 33], [34, 31], [34, 28], [39, 20],
   [43, 13], [52, 17], [57, 25], [50, 29], [48, 30], [56, 27], [61, 25], [67, 25],
   [72, 21], [73, 16], [77, 8], [80, 13], [84, 19], [87, 22], [92, 21], [95, 16],
   [98, 10], [104, 1.5], [102, 6], [105, 10], [109, 13], [107, 21], [110, 21],
   [117, 24], [121, 30], [122, 37], [118, 39], [124, 40], [126, 35], [129, 38],
   [128, 42], [131, 44], [135, 48], [141, 53], [143, 59], [155, 59], [163, 58],
   [170, 62], [180, 65], [178, 68], [160, 70], [140, 73], [110, 76], [90, 75],
   [75, 72], [60, 70], [50, 68], [42, 66], [38, 64], [33, 66], [30, 62], [28, 60],
   [22, 57], [18, 55], [12, 54], [6, 53], [2, 51], [-2, 48], [-4, 48], [-1, 46],
   [-2, 43.5], [-9, 43]],
  // Fennoscandia
  [[5, 58], [8, 58], [11, 59], [13, 55.5], [16, 56.2], [19, 58], [17, 61], [21, 63],
   [24, 65], [25, 65.5], [24, 60], [28, 60], [30, 62], [30, 66], [29, 69], [25, 71],
   [18, 70], [14, 68], [12, 65], [8, 63], [5, 60]],
  // Great Britain
  [[-5, 50], [0, 51], [1, 53], [-1, 54], [-3, 56], [-2, 58], [-5, 58.5], [-6, 56],
   [-5, 54], [-3, 51.5]],
  // Ireland
  [[-10, 51.5], [-6, 52], [-6, 55], [-10, 54.5]],
  // Africa
  [[-17, 21], [-16, 28], [-9, 30], [-6, 35], [0, 36], [10, 37], [11, 33], [19, 30],
   [25, 32], [32, 31], [34, 28], [37, 22], [39, 15], [43, 12], [51, 12], [48, 5],
   [42, -1], [40, -8], [40, -15], [35, -20], [33, -26], [31, -30], [27, -33],
   [20, -34.5], [17, -29], [12, -18], [13, -8], [9, -1], [9, 4], [3, 6], [-3, 5],
   [-8, 4], [-13, 8], [-17, 14]],
  // Madagascar
  [[43, -12], [50, -15], [50, -25], [45, -25], [43, -17]],
  // Sri Lanka
  [[80, 9], [82, 7], [81, 6], [80, 7]],
  // Japan
  [[130, 32], [132, 34], [136, 35], [139, 35], [141, 38], [141, 41], [145, 43],
   [141, 45], [140, 42], [137, 37], [133, 35], [129, 33]],
  // Sumatra
  [[95, 6], [98, 2], [102, -3], [106, -6], [104, -6], [100, 0], [95, 5]],
  // Java
  [[105, -6], [114, -8], [114, -8.6], [105, -7]],
  // Borneo
  [[109, 2], [117, 4], [119, -1], [116, -4], [110, -3], [109, 0]],
  // Sulawesi
  [[120, 1], [125, 1], [124, -5], [120, -3], [119, 0]],
  // Philippines
  [[120, 18], [122, 14], [126, 10], [126, 6], [122, 7], [120, 13]],
  // New Guinea
  [[131, -1], [140, -3], [147, -6], [150, -10], [143, -9], [137, -8], [132, -5]],
  // Australia — the Gulf of Carpentaria folded in
  [[113, -22], [115, -32], [118, -35], [125, -32], [131, -31.5], [137, -33],
   [141, -38], [145, -38.5], [150, -37], [153, -32], [153, -27], [149, -21],
   [146, -19], [143, -14], [142, -11], [140, -17], [137, -16], [136, -12],
   [132, -11], [128, -15], [125, -14], [122, -17], [117, -21]],
  // New Zealand
  [[166, -46], [169, -47], [174, -41], [178, -38], [176, -37], [173, -41], [170, -44]],
];

/** The one hub. Every route on the globe hangs off this point. */
const HUB = { lat: 21, lng: 79 };

/**
 * Destinations for the starburst — generic regional anchors, not
 * offices, so the globe reads as "reach everywhere" while every arc
 * visibly starts at India. Tier 1 lanes carry two packets and a
 * slightly larger marker.
 */
const NODES: { lat: number; lng: number; tier: number }[] = [
  { lat: 40, lng: -74, tier: 1 }, // North America
  { lat: 49, lng: -114, tier: 2 },
  { lat: 19, lng: -99, tier: 2 },
  { lat: -15, lng: -47, tier: 2 }, // South America
  { lat: 51, lng: -1, tier: 1 }, // Europe
  { lat: 52, lng: 13, tier: 2 },
  { lat: 25, lng: 55, tier: 1 }, // Middle East
  { lat: 24, lng: 46, tier: 2 },
  { lat: 30, lng: 31, tier: 2 }, // Africa
  { lat: -1, lng: 36, tier: 1 },
  { lat: -26, lng: 28, tier: 2 },
  { lat: 1, lng: 104, tier: 1 }, // Southeast Asia
  { lat: 39, lng: 116, tier: 2 }, // East Asia
  { lat: 36, lng: 140, tier: 1 },
  { lat: -34, lng: 151, tier: 1 }, // Australia
  { lat: 56, lng: 38, tier: 2 }, // Eurasia
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
 * Even-area lattice: one row every `step` degrees of latitude, with the
 * longitude step widened by 1/cos(lat) so dots stay the same distance
 * apart near the poles as at the equator. Only land is kept — the ocean
 * stays a clean dark sphere, as in the reference.
 */
function buildDots(step = 2.1) {
  const dots: { lat: number; lng: number; heat: number }[] = [];
  const centre = toVec(HUB.lat, HUB.lng);
  for (let lat = -56; lat <= 80; lat += step) {
    const dLng = step / Math.max(0.22, Math.cos(lat * RAD));
    for (let lng = -180; lng < 180; lng += dLng) {
      if (!LAND.some((p) => pointInPolygon(lng, lat, p))) continue;
      // The subcontinent burns brighter than the rest of the map. Falloff is
      // by great-circle distance from the hub, not a lat/lng box — a box
      // reads as a literal bright rectangle sitting on the sphere.
      const v = toVec(lat, lng);
      const d = Math.acos(
        Math.min(1, Math.max(-1, v.x * centre.x + v.y * centre.y + v.z * centre.z))
      );
      const heat = Math.max(0, 1 - d / 0.34) ** 1.4;
      dots.push({ lat, lng, heat });
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

/** Deterministic 0..1 — packet spacing stays varied but stable across mounts. */
function rand(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

type Packet = { route: number; t: number; speed: number; size: number };

/**
 * The section's centrepiece: a dot-globe held still with India front
 * and centre and a starburst of routes fanning out of it. Only the
 * travelling packets, the hub pulse and the arrival flashes animate —
 * the sphere itself doesn't spin, so India never rotates out of view.
 */
export default function GlobeReach() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  const dots = useMemo(() => buildDots(), []);

  // Everything the render loop reads without wanting to restart on change.
  // yaw/pitch start with India centred and tilted slightly toward the viewer.
  const state = useRef({
    yaw: -1.38,
    pitch: 0.26,
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
      const size = Math.max(240, Math.min(wrap.clientWidth, 660));
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
    // Belt and braces: ResizeObserver callbacks can be starved while the tab
    // is backgrounded, which leaves the canvas stuck at its old size after a
    // rotate or window resize.
    window.addEventListener("resize", resize);
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), {
      threshold: 0.02,
    });
    io.observe(wrap);

    const hub = toVec(HUB.lat, HUB.lng);
    const dests = NODES.map((n) => toVec(n.lat, n.lng));
    // Arcs hug the sphere: a big lift would swing long routes far outside
    // the silhouette before they reach the limb.
    const lifts = NODES.map((_, i) => 0.09 + rand(i * 3.3) * 0.07);
    // Graticule rings, built once — they only need re-projecting per frame.
    const meridians: Vec[][] = [];
    for (let lng = -180; lng < 180; lng += 30) {
      meridians.push(Array.from({ length: 73 }, (_, i) => toVec(-90 + i * 2.5, lng)));
    }
    const parallels: Vec[][] = [];
    for (let lat = -60; lat <= 60; lat += 30) {
      parallels.push(Array.from({ length: 97 }, (_, i) => toVec(lat, -180 + i * 3.75)));
    }

    // Two packets on the primary lanes, one on the rest, each with its
    // own speed and phase so nothing marches in lockstep.
    const packets: Packet[] = [];
    NODES.forEach((n, i) => {
      const count = n.tier === 1 ? 2 : 1;
      for (let k = 0; k < count; k++) {
        packets.push({
          route: i,
          t: rand(i * 7.7 + k * 2.1),
          speed: 0.16 + rand(i * 5.1 + k) * 0.14,
          size: n.tier === 1 ? 2.1 : 1.7,
        });
      }
    });

    // Arrival flashes — one decaying 0..1 value per destination.
    const flash = new Float32Array(NODES.length);
    // A fixed star field behind the sphere, faint enough to read as depth.
    const stars = Array.from({ length: 70 }, (_, i) => ({
      x: rand(i * 1.7),
      y: rand(i * 4.3 + 9),
      r: 0.4 + rand(i * 2.9) * 0.8,
      a: 0.1 + rand(i * 6.1) * 0.26,
    }));

    let last = performance.now();

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(64, now - last) / 1000;
      last = now;
      if (!visible) return;

      const s = state.current;
      const size = s.size;
      const R = size * 0.355;
      const cx = size / 2;
      const cy = size / 2;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, size, size);

      // background star field
      for (const st of stars) {
        const x = st.x * size;
        const y = st.y * size;
        if (Math.hypot(x - cx, y - cy) < R * 1.05) continue;
        ctx.fillStyle = `rgba(180,215,255,${st.a})`;
        ctx.beginPath();
        ctx.arc(x, y, st.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // atmosphere — layered stops so the falloff reads soft, not banded
      const halo = ctx.createRadialGradient(cx, cy, R * 0.55, cx, cy, R * 2.05);
      halo.addColorStop(0, "rgba(38,124,255,0.34)");
      halo.addColorStop(0.4, "rgba(30,78,200,0.17)");
      halo.addColorStop(0.75, "rgba(18,44,130,0.06)");
      halo.addColorStop(1, "rgba(8,11,20,0)");
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 2.05, 0, Math.PI * 2);
      ctx.fill();

      // ocean body — deep navy, lit from the upper left
      const body = ctx.createRadialGradient(cx - R * 0.4, cy - R * 0.45, R * 0.08, cx, cy, R);
      body.addColorStop(0, "rgba(19,50,116,0.98)");
      body.addColorStop(0.55, "rgba(10,28,72,0.99)");
      body.addColorStop(1, "rgba(5,11,30,1)");
      ctx.fillStyle = body;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fill();

      // rim light along the limb
      const rim = ctx.createRadialGradient(cx, cy, R * 0.9, cx, cy, R * 1.02);
      rim.addColorStop(0, "rgba(90,170,255,0)");
      rim.addColorStop(1, "rgba(120,200,255,0.45)");
      ctx.fillStyle = rim;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.02, 0, Math.PI * 2);
      ctx.fill();

      // graticule — faint meridians and parallels give the sphere depth
      ctx.strokeStyle = "rgba(70,140,225,0.13)";
      ctx.lineWidth = 0.7;
      const drawRing = (pts: Vec[]) => {
        ctx.beginPath();
        let started = false;
        for (const v of pts) {
          const p = rotate(v, s.yaw, s.pitch);
          if (p.z <= 0.02) {
            started = false;
            continue;
          }
          const x = cx + p.x * R;
          const y = cy - p.y * R;
          if (started) ctx.lineTo(x, y);
          else ctx.moveTo(x, y);
          started = true;
        }
        ctx.stroke();
      };
      for (const ring of meridians) drawRing(ring);
      for (const ring of parallels) drawRing(ring);

      // land lattice — the map itself
      const dotScale = size / 520;
      for (const d of dots) {
        const p = rotate(toVec(d.lat, d.lng), s.yaw, s.pitch);
        if (p.z <= 0.02) continue;
        const depth = Math.min(1, p.z * 1.6);
        const x = cx + p.x * R;
        const y = cy - p.y * R;
        const h = d.heat;
        const alpha = (0.3 + 0.55 * depth) * (1 - h) + (0.55 + 0.45 * depth) * h;
        const g = Math.round(192 + 50 * h);
        const b = Math.round(255);
        const r = Math.round(133 + 82 * h);
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(x, y, (0.75 + 0.3 * h + (0.5 + 0.25 * h) * p.z) * dotScale, 0, Math.PI * 2);
        ctx.fill();
      }

      // the hub, projected once and reused by every route
      const hubP = rotate(hub, s.yaw, s.pitch);
      const hubX = cx + hubP.x * R;
      const hubY = cy - hubP.y * R;

      // India's ground glow, under the arcs
      if (hubP.z > 0) {
        const g = ctx.createRadialGradient(hubX, hubY, 0, hubX, hubY, R * 0.34);
        g.addColorStop(0, "rgba(120,205,255,0.42)");
        g.addColorStop(0.45, "rgba(70,150,255,0.16)");
        g.addColorStop(1, "rgba(70,150,255,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(hubX, hubY, R * 0.34, 0, Math.PI * 2);
        ctx.fill();
      }

      // ---- routes -------------------------------------------------
      // Each arc is a dim rail; the packets riding it supply the motion,
      // so the lines themselves stay quiet.
      // Stroked segment by segment rather than as one path: the lift carries
      // arc points off the sphere, so a route heading for the far side would
      // otherwise balloon past the silhouette and end in a hard-cut stray
      // line. Per-segment alpha lets each route dissolve into the limb.
      NODES.forEach((_, i) => {
        const live = s.hover === i;
        const steps = 48;
        let prev: { x: number; y: number; a: number } | null = null;
        for (let k = 0; k <= steps; k++) {
          const p = rotate(arcPoint(hub, dests[i], k / steps, lifts[i]), s.yaw, s.pitch);
          // Two fades: one for depth, one for the silhouette. The lift puts
          // arc points above the surface, so a route bound for the far side
          // swings outside the disc before its depth runs out — without the
          // second term it would end as a bright line hanging in space.
          const a =
            Math.max(0, Math.min(1, p.z / 0.26)) *
            Math.max(0, Math.min(1, (1.04 - Math.hypot(p.x, p.y)) / 0.12));
          const cur = { x: cx + p.x * R, y: cy - p.y * R, a };
          if (prev && (prev.a > 0.01 || a > 0.01)) {
            const edge = Math.min(prev.a, a);
            ctx.beginPath();
            ctx.moveTo(prev.x, prev.y);
            ctx.lineTo(cur.x, cur.y);
            // wide, dim pass first — cheaper than a shadow blur and it
            // leaves the line with a halo rather than a smear
            ctx.lineWidth = live ? 6 : 4;
            ctx.strokeStyle = `rgba(58,150,255,${(edge * (live ? 0.3 : 0.14)).toFixed(3)})`;
            ctx.stroke();
            ctx.lineWidth = live ? 2 : 1.1;
            ctx.strokeStyle = live
              ? `rgba(205,240,255,${(edge * 0.95).toFixed(3)})`
              : `rgba(112,190,255,${(edge * 0.6).toFixed(3)})`;
            ctx.stroke();
          }
          prev = cur;
        }
      });

      // ---- packets ------------------------------------------------
      for (const pk of packets) {
        if (!reduced) {
          pk.t += pk.speed * dt;
          if (pk.t >= 1) {
            pk.t -= 1;
            flash[pk.route] = 1;
          }
        }
        const lift = lifts[pk.route];
        const dest = dests[pk.route];
        const live = s.hover === pk.route;

        // trail: a few samples behind the head, fading out
        const TRAIL = 7;
        for (let k = TRAIL; k >= 0; k--) {
          const t = pk.t - k * 0.022;
          if (t < 0) continue;
          const p = rotate(arcPoint(hub, dest, t, lift), s.yaw, s.pitch);
          if (p.z <= 0.02) continue;
          const limb =
            Math.max(0, Math.min(1, p.z / 0.26)) *
            Math.max(0, Math.min(1, (1.04 - Math.hypot(p.x, p.y)) / 0.12));
          const fade = (1 - k / (TRAIL + 1)) ** 2;
          const r = pk.size * (0.35 + 0.65 * fade) * (live ? 1.3 : 1);
          ctx.fillStyle = `rgba(196,236,255,${(0.75 * fade * limb).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(cx + p.x * R, cy - p.y * R, r, 0, Math.PI * 2);
          ctx.fill();
        }

        // head, with a soft bloom
        const head = rotate(arcPoint(hub, dest, pk.t, lift), s.yaw, s.pitch);
        if (head.z > 0.02) {
          const x = cx + head.x * R;
          const y = cy - head.y * R;
          const limb =
            Math.max(0, Math.min(1, head.z / 0.26)) *
            Math.max(0, Math.min(1, (1.04 - Math.hypot(head.x, head.y)) / 0.12));
          const bloom = ctx.createRadialGradient(x, y, 0, x, y, pk.size * 4.5);
          bloom.addColorStop(0, `rgba(190,235,255,${(0.55 * limb).toFixed(3)})`);
          bloom.addColorStop(1, "rgba(140,205,255,0)");
          ctx.fillStyle = bloom;
          ctx.beginPath();
          ctx.arc(x, y, pk.size * 4.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = `rgba(240,251,255,${(0.98 * limb).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(x, y, pk.size * (live ? 1.25 : 1), 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // ---- destination markers ------------------------------------
      const hits: { idx: number; x: number; y: number }[] = [];
      NODES.forEach((node, idx) => {
        const p = rotate(toVec(node.lat, node.lng), s.yaw, s.pitch);
        if (p.z <= 0) return;
        const x = cx + p.x * R;
        const y = cy - p.y * R;
        hits.push({ idx, x, y });

        const live = s.hover === idx;
        const fade = Math.min(1, p.z * 2.4);
        const f = flash[idx];
        if (!reduced && f > 0) flash[idx] = Math.max(0, f - dt * 1.6);

        // arrival ring — expands and fades as the flash decays
        if (f > 0) {
          ctx.strokeStyle = `rgba(170,225,255,${(f * 0.55 * fade).toFixed(3)})`;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.arc(x, y, 4 + (1 - f) * 12, 0, Math.PI * 2);
          ctx.stroke();
        }

        const rad = (live ? 13 : 9) + f * 4;
        const glow = ctx.createRadialGradient(x, y, 0, x, y, rad);
        glow.addColorStop(0, `rgba(120,205,255,${((0.45 + f * 0.35) * fade).toFixed(3)})`);
        glow.addColorStop(1, "rgba(120,205,255,0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(x, y, rad, 0, Math.PI * 2);
        ctx.fill();

        const core = node.tier === 1 ? 3 : 2.3;
        ctx.fillStyle =
          live || f > 0.4
            ? `rgba(255,255,255,${fade})`
            : `rgba(158,214,255,${(0.9 * fade).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(x, y, live ? core + 1.2 : core, 0, Math.PI * 2);
        ctx.fill();
      });
      s.hits = hits;

      // ---- the hub marker, drawn last so it sits on top ------------
      if (hubP.z > 0) {
        // two expanding rings, half a cycle apart
        if (!reduced) {
          for (let k = 0; k < 2; k++) {
            const t = (now / 2600 + k * 0.5) % 1;
            ctx.strokeStyle = `rgba(150,220,255,${(0.4 * (1 - t) ** 1.6).toFixed(3)})`;
            ctx.lineWidth = 1.3;
            ctx.beginPath();
            ctx.arc(hubX, hubY, 5 + t * 34, 0, Math.PI * 2);
            ctx.stroke();
          }
        }
        const beat = reduced ? 0 : (Math.sin(now / 620) + 1) / 2;
        const core = ctx.createRadialGradient(hubX, hubY, 0, hubX, hubY, 16 + beat * 4);
        core.addColorStop(0, "rgba(235,250,255,0.95)");
        core.addColorStop(0.25, "rgba(130,210,255,0.55)");
        core.addColorStop(1, "rgba(90,175,255,0)");
        ctx.fillStyle = core;
        ctx.beginPath();
        ctx.arc(hubX, hubY, 16 + beat * 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "rgba(255,255,255,0.98)";
        ctx.beginPath();
        ctx.arc(hubX, hubY, 3.6 + beat * 0.5, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      ro.disconnect();
      io.disconnect();
    };
  }, [dots]);

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
