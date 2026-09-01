"use client";

import Image from "next/image";
import {
  AnimatePresence,
  type AnimationPlaybackControls,
  animate,
  motion,
  useMotionValue,
  useScroll,
  useTransform,
} from "motion/react";
import { Fragment, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import StageArt from "./StageArt";
import CapabilityArt from "./CapabilityArt";
import {
  buildCapabilities,
  deliveryProcess,
  domainFocus,
  domainImages,
} from "@/lib/content";

const EASE = [0.16, 1, 0.3, 1] as const;
const DWELL = 3600;

/**
 * The brand gradient runs #2356D6 → #00E0FF. Every list here samples it
 * by index, so position in a row is position on the brand ramp.
 */
const BRAND_FROM = [35, 86, 214];
const BRAND_TO = [0, 224, 255];

function ramp(i: number, n: number, alpha = 1) {
  const t = n <= 1 ? 0 : i / (n - 1);
  const [r, g, b] = BRAND_FROM.map((c, k) => Math.round(c + (BRAND_TO[k] - c) * t));
  return `rgba(${r},${g},${b},${alpha})`;
}

/** Desktop-only behaviour (the expanding stage) needs a real breakpoint read. */
function useWide() {
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(min-width: 768px)");
    const sync = () => setWide(m.matches);
    sync();
    m.addEventListener("change", sync);
    return () => m.removeEventListener("change", sync);
  }, []);
  return wide;
}

/**
 * The delivery story: an expanding stage strip where the open stage is
 * the one white surface in an otherwise ink section, a hairline list of
 * capabilities, and a photographic gallery of the domains served.
 */
export default function DeliveryRail() {
  return (
    <div className="mt-28 lg:mt-40">
      <StageStrip />
      <Capabilities />
      <Domains />
    </div>
  );
}

/* -------------------------------------------------------------
   Idea → scale. One stage is open at a time and renders in paper
   white; the rest stay ink. It advances on its own and yields to
   the pointer.
------------------------------------------------------------- */
function StageStrip() {
  const wide = useWide();
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "start 35%"],
  });
  const rule = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    if (held || !wide) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(
      () => setActive((i) => (i + 1) % deliveryProcess.length),
      DWELL
    );
    return () => clearInterval(id);
  }, [held, wide]);

  return (
    <div ref={ref}>
      <header className="relative flex flex-wrap items-end justify-between gap-6 pb-7">
        <div>
          <span className="eyebrow text-brand-2/70">Delivery pipeline</span>
          <h3 className="display mt-3 text-[clamp(2rem,4.2vw,3.2rem)] leading-[1.05] text-paper">
            Idea to scale, <span className="text-grad italic">one track</span>
          </h3>
        </div>
        <p className="max-w-[36ch] text-[0.9rem] leading-relaxed text-paper-2/45">
          A single delivery team carries the work from first scope through to
          production and the releases after it.
        </p>
        <span aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-brand-soft/12" />
        <motion.span
          aria-hidden
          className="absolute bottom-0 left-0 h-px"
          style={{ background: "var(--brand-grad)", width: rule }}
        />
      </header>

      <div
        className="mt-10 flex flex-col gap-3 md:flex-row"
        onMouseLeave={() => setHeld(false)}
      >
        {deliveryProcess.map((p, i) => {
          const on = active === i;
          const open = !wide || on;
          const c = ramp(i, deliveryProcess.length);
          return (
            <motion.button
              key={p.step}
              type="button"
              aria-expanded={open}
              onMouseEnter={() => {
                setHeld(true);
                setActive(i);
              }}
              onFocus={() => {
                setHeld(true);
                setActive(i);
              }}
              onClick={() => setActive(i)}
              initial={false}
              animate={{ flexGrow: wide ? (on ? 2.6 : 1) : 1 }}
              transition={{ type: "spring", stiffness: 220, damping: 30 }}
              className={clsx(
                "group relative flex-1 overflow-hidden rounded-[22px] px-6 py-6 text-left transition-colors duration-500 md:min-h-[15.5rem] md:basis-0",
                on
                  ? "bg-paper text-brand-deep"
                  : "bg-ink-2 text-paper ring-1 ring-brand-soft/12 hover:ring-brand-2/35"
              )}
              style={
                {
                  "--art-a": ramp(i, deliveryProcess.length, on ? 0.75 : 0.55),
                  "--art-b": ramp(i, deliveryProcess.length, on ? 0.95 : 0.8),
                } as React.CSSProperties
              }
            >
              {/* the stage's own motif, sitting behind the copy */}
              <StageArt
                name={p.label}
                className={clsx(
                  "pointer-events-none absolute -bottom-5 -right-4 w-[9rem] transition-all duration-700 ease-out group-hover:-translate-y-1",
                  on ? "opacity-80" : "opacity-45"
                )}
              />

              {/* stage colour: a band on the open card, a wash on the rest */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-[3px] transition-opacity duration-500"
                style={{
                  background: `linear-gradient(90deg, ${c}, ${ramp(i, deliveryProcess.length, 0.12)})`,
                  opacity: on ? 1 : 0.45,
                }}
              />
              <span
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-12 size-36 rounded-full blur-2xl transition-opacity duration-700"
                style={{ background: c, opacity: on ? 0.22 : 0.1 }}
              />

              <span
                className="display relative block text-[2.9rem] leading-none transition-colors duration-500"
                style={{
                  backgroundImage: on
                    ? `linear-gradient(150deg, ${c}, ${ramp(i, deliveryProcess.length, 0.25)})`
                    : undefined,
                  WebkitBackgroundClip: on ? "text" : undefined,
                  backgroundClip: on ? "text" : undefined,
                  color: on ? "transparent" : "rgba(232,236,247,0.16)",
                }}
              >
                {p.step}
              </span>

              {/* Copy keeps a fixed size and a fixed measure: the card width
                  springs open behind it, so anything that re-wraps or
                  re-flows here reads as the text jumping. */}
              <p className="relative mt-4 whitespace-nowrap text-lg font-medium transition-colors duration-500">
                {p.label}
              </p>

              <motion.p
                initial={false}
                animate={{ opacity: open ? 1 : 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                aria-hidden={!open}
                className={clsx(
                  "relative mt-3 text-[0.88rem] leading-relaxed",
                  "w-full md:w-[30ch]",
                  on ? "text-brand-deep/60" : "text-paper-2/45"
                )}
              >
                {p.detail}
              </motion.p>

              {/* dwell meter under the open card */}
              {on && wide && (
                <motion.span
                  aria-hidden
                  key={`meter-${i}-${held}`}
                  className="absolute inset-x-6 bottom-5 h-[3px] origin-left rounded-full"
                  style={{ background: c }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: held ? 1 : [0, 1] }}
                  transition={
                    held
                      ? { duration: 0.3 }
                      : { duration: DWELL / 1000, ease: "linear" }
                  }
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------
   What we build — the AI LINC mark as the rail. The seven
   capabilities sit on the lemniscate itself and a lit segment
   travels the loop, arriving at one node at a time.

   Geometry note: the brand mark is a two-lobe lemniscate drawn as
   an outer and an inner outline, tilted -7deg. The rail below is
   the centreline between those two outlines (the midpoint of each
   control point), so the ribbon traces the logo exactly. The tilt
   is baked into the coordinates rather than applied as an SVG
   transform, because the nodes are HTML and read their positions
   straight off the path with getPointAtLength — which reports in
   the path's own user space, ignoring any transform on it.
------------------------------------------------------------- */
/** Seconds the fill takes to travel from one capability to the next. */
const STEP = 3.2;
/** Seconds the closed ring takes to unspool before the next lap. */
const RELEASE = 1.1;

type Pt = [number, number];

/** Lemniscate centreline: start point, then four cubic segments. */
const MARK_PIVOT: Pt = [200, 120];
const MARK_TILT = -7;
const MARK_START: Pt = [200, 120];
const MARK_SEGMENTS: [Pt, Pt, Pt][] = [
  [[157, 58.75], [117.3, 58.75], [113, 120]], // left lobe, over
  [[108.7, 181.25], [157, 181.25], [200, 120]], // left lobe, under
  [[275.5, 22], [344.45, 22], [352, 120]], // right lobe, over
  [[359.55, 218], [275.5, 218], [200, 120]], // right lobe, under
];
/** Padded to leave room for the node labels outside the ribbon. */
const MARK_VIEWBOX = { x: 42, y: 2, w: 330, h: 230 };

/** Node diameter in px, used only until the rendered button can be measured. */
const NODE_PX = 40;
/** Rendered width cap for a node label, matching its CSS max-width. */
const LABEL_PX = 74;
/**
 * How long a scrub to a hovered node takes. Distance-scaled, so a jump
 * across the loop and a nudge to the next node hold roughly the same
 * speed rather than the same duration.
 */
const span = (d: number) => Math.min(1.1, 0.35 + Math.abs(d) * 1.2);

function tilt([x, y]: Pt): Pt {
  const rad = (MARK_TILT * Math.PI) / 180;
  const [cx, cy] = MARK_PIVOT;
  const dx = x - cx;
  const dy = y - cy;
  return [
    cx + dx * Math.cos(rad) - dy * Math.sin(rad),
    cy + dx * Math.sin(rad) + dy * Math.cos(rad),
  ];
}

const MARK_PATH = (() => {
  const [sx, sy] = tilt(MARK_START);
  const body = MARK_SEGMENTS.map(
    (seg) =>
      "C " +
      seg
        .map(tilt)
        .map(([x, y]) => `${x.toFixed(2)} ${y.toFixed(2)}`)
        .join(", ")
  ).join(" ");
  return `M ${sx.toFixed(2)} ${sy.toFixed(2)} ${body} Z`;
})();

/** SVG user units → percentage of the padded box, for the HTML nodes. */
function toBox([x, y]: Pt) {
  return {
    left: ((x - MARK_VIEWBOX.x) / MARK_VIEWBOX.w) * 100,
    top: ((y - MARK_VIEWBOX.y) / MARK_VIEWBOX.h) * 100,
  };
}

/** Where node `i` sits on the loop, as a share of it. */
const nodeAt = (i: number, n: number) => (i + 0.5) / n;

type Rect = [number, number, number, number];

const hits = (a: Rect, b: Rect, pad: number) =>
  a[0] < b[2] + pad && b[0] < a[2] + pad && a[1] < b[3] + pad && b[1] < a[3] + pad;

/** Distance from a point to a rectangle — 0 when the point is inside it. */
function gapTo([x, y]: Pt, r: Rect) {
  const cx = Math.max(r[0], Math.min(x, r[2]));
  const cy = Math.max(r[1], Math.min(y, r[3]));
  return Math.hypot(x - cx, y - cy);
}

/**
 * Where a node's label goes.
 *
 * A fixed rule ("above if the node is in the top half") puts labels on the
 * ribbon wherever it doubles back, and on the far side of the figure at the
 * crossing. So each label instead tries 24 directions at four distances and
 * keeps the best: outside the figure, clear of the ribbon, clear of every
 * node, clear of the motif and of the labels already placed, and inside the
 * box. Everything here is in viewBox units, which the container scales
 * uniformly, so one solve holds at every width.
 */
function placeLabel(
  p: Pt,
  outward: Pt,
  size: Pt,
  ring: Pt[],
  centres: Pt[],
  taken: Rect[],
  unit: number,
  nodePx: number
) {
  const [w, h] = size;
  const r = nodePx / 2 / unit;
  const near = 3 / unit;
  let best: { score: number; ax: number; ay: number; fx: number; fy: number; rect: Rect } | null =
    null;

  for (let a = 0; a < 24; a++) {
    const angle = (a / 24) * Math.PI * 2;
    const dx = Math.cos(angle);
    const dy = Math.sin(angle);
    const align = dx * outward[0] + dy * outward[1];
    if (align < 0.1) continue; // never inside the figure

    for (const gap of [10, 18, 28, 40]) {
      const d = r + gap / unit;
      const ax = p[0] + dx * d;
      const ay = p[1] + dy * d;
      // Anchor the edge the label grows from, so a wide one runs away from
      // its node rather than back across the figure.
      const fx = dx > 0.35 ? 0 : dx < -0.35 ? -1 : -0.5;
      const fy = dy > 0.35 ? 0 : dy < -0.35 ? -1 : -0.5;
      const rect: Rect = [ax + fx * w, ay + fy * h, ax + fx * w + w, ay + fy * h + h];

      let score = align * 7 - d * 0.25;
      if (ring.some((q) => gapTo(q, rect) < near)) score -= 100;
      if (centres.some((c) => gapTo(c, rect) < r + near)) score -= 100;
      if (taken.some((t) => hits(rect, t, near))) score -= 80;
      score -=
        (Math.max(0, MARK_VIEWBOX.x - rect[0]) +
          Math.max(0, rect[2] - (MARK_VIEWBOX.x + MARK_VIEWBOX.w)) +
          Math.max(0, MARK_VIEWBOX.y - rect[1]) +
          Math.max(0, rect[3] - (MARK_VIEWBOX.y + MARK_VIEWBOX.h))) *
        3;

      if (!best || score > best.score) best = { score, ax, ay, fx, fy, rect };
    }
  }

  if (best) return best;
  // Nothing scored: fall straight out along the normal.
  const d = r + 18 / unit;
  const ax = p[0] + outward[0] * d;
  const ay = p[1] + outward[1] * d;
  return { score: 0, ax, ay, fx: -0.5, fy: -0.5, rect: [ax, ay, ax, ay] as Rect };
}

function Capabilities() {
  const n = buildCapabilities.length;
  const railRef = useRef<SVGPathElement>(null);
  const [len, setLen] = useState(0);
  const boxRef = useRef<HTMLDivElement>(null);
  const nodeRef = useRef<HTMLDivElement>(null);
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [nodes, setNodes] = useState<
    {
      left: number;
      top: number;
      lx: number;
      ly: number;
      fx: number;
      fy: number;
    }[]
  >([]);
  const [motif, setMotif] = useState<{ left: number; top: number } | null>(null);

  /**
   * The fill runs the show: it sweeps at a constant speed and the active
   * capability is whichever node it has most recently passed. There is no
   * dwell timer, so nothing ever waits at a node — the copy changes on
   * arrival and the fill carries straight on to the next one.
   */
  const [active, setActive] = useState(0);
  const [hover, setHover] = useState<number | null>(null);
  const hoverRef = useRef<number | null>(null);
  useEffect(() => {
    hoverRef.current = hover;
  }, [hover]);

  /**
   * Everything positional comes off the rail itself, once it has laid out:
   * the node points, the motif's seat in the larger lobe, and a solved spot
   * for each label. Labels are measured as rendered rather than estimated,
   * so the solve holds whatever the capability names are.
   */
  useEffect(() => {
    const path = railRef.current;
    const svg = path?.ownerSVGElement;
    const box = boxRef.current;
    if (!path || !svg || !box) return;

    const measure = () => {
      const total = path.getTotalLength();
      setLen(total);
      const unit = box.getBoundingClientRect().width / MARK_VIEWBOX.w;
      // The container can still be zero-width on the first pass; the solve
      // is in px-derived units, so it has to wait for a real width.
      if (!unit) return false;

      const SAMPLES = 280;
      const ring: Pt[] = Array.from({ length: SAMPLES }, (_, k) => {
        const q = path.getPointAtLength((k / SAMPLES) * total);
        return [q.x, q.y];
      });

      // The loop returns to the crossing mid-way; the longer of the two
      // lobes either side of it is the one with room for the motif.
      const pivot = tilt(MARK_PIVOT);
      let cross = 0;
      let nearest = Infinity;
      ring.forEach((q, k) => {
        const f = k / SAMPLES;
        if (f < 0.15 || f > 0.85) return;
        const d = Math.hypot(q[0] - pivot[0], q[1] - pivot[1]);
        if (d < nearest) {
          nearest = d;
          cross = f;
        }
      });
      const lobe = ring.filter((_, k) =>
        cross < 0.5 ? k / SAMPLES >= cross : k / SAMPLES < cross
      );
      const seat: Pt = [
        lobe.reduce((a, q) => a + q[0], 0) / lobe.length,
        lobe.reduce((a, q) => a + q[1], 0) / lobe.length,
      ];
      setMotif(toBox(seat));

      // The node is size-8 on phones and size-10 above it; read the rendered
      // one rather than assuming, since it sets how far a label must clear.
      const nodePx = nodeRef.current?.offsetWidth || NODE_PX;

      const centres: Pt[] = buildCapabilities.map((_, i) => {
        const q = path.getPointAtLength(nodeAt(i, n) * total);
        return [q.x, q.y];
      });

      // The motif is an obstacle for the labels, like a label already placed.
      const half = 42 / unit;
      const taken: Rect[] = [
        [seat[0] - half, seat[1] - half, seat[0] + half, seat[1] + half],
      ];

      setNodes(
        centres.map((p, i) => {
          const s = nodeAt(i, n) * total;
          const a = path.getPointAtLength((s - 2 + total) % total);
          const b = path.getPointAtLength((s + 2) % total);
          let nx = -(b.y - a.y);
          let ny = b.x - a.x;
          const m = Math.hypot(nx, ny) || 1;
          nx /= m;
          ny /= m;
          // Point the normal out of the figure, whichever way the rail runs.
          const probe = svg.createSVGPoint();
          probe.x = p[0] + nx * 12;
          probe.y = p[1] + ny * 12;
          if (path.isPointInFill(probe)) {
            nx = -nx;
            ny = -ny;
          }

          const el = labelRefs.current[i];
          const size: Pt = [
            (el?.offsetWidth ?? LABEL_PX) / unit,
            (el?.offsetHeight ?? 15) / unit,
          ];
          const spot = placeLabel(
            p,
            [nx, ny],
            size,
            ring,
            centres,
            taken,
            unit,
            nodePx
          );
          taken.push(spot.rect);

          const anchor = toBox([spot.ax, spot.ay]);
          return {
            ...toBox(p),
            lx: anchor.left,
            ly: anchor.top,
            fx: spot.fx,
            fy: spot.fy,
          };
        })
      );
      return true;
    };

    // ResizeObserver only delivers alongside the rendering steps, which a
    // backgrounded tab does not run — so the first measure retries on a
    // timer rather than relying on the observer to come back to it.
    let tries = 0;
    let timer = 0;
    const attempt = () => {
      if (!measure() && tries++ < 30) timer = window.setTimeout(attempt, 120);
    };
    attempt();

    const ro = new ResizeObserver(() => measure());
    ro.observe(box);
    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("resize", onResize);
      ro.disconnect();
    };
  }, [n]);

  /**
   * The fill is the arc between `from` and `to`, both as a share of the
   * loop. A lap runs from a single fixed start: `from` stays at 0 while
   * `to` sweeps the whole way round. Only once the ring has closed does
   * `from` chase it — the ring unspools forwards, in the same direction it
   * was drawn, so a new lap can start from 0 with nothing to rewind.
   */
  const from = useMotionValue(0);
  const to = useMotionValue(0);

  // Whichever node the fill has passed is the one on show. Reading it off
  // the fill rather than off a timer is what keeps the two in step.
  useEffect(
    () =>
      to.on("change", (v) => {
        if (hoverRef.current !== null) return;
        const i = Math.min(n - 1, Math.max(0, Math.floor(v * n - 0.5 + 1e-6)));
        setActive((a) => (a === i ? a : i));
      }),
    [to, n]
  );

  /**
   * The lap: one constant-speed sweep of the whole loop, then the release.
   * It picks up from wherever the fill currently is, so handing control
   * back after a hover resumes rather than restarts.
   */
  useEffect(() => {
    if (!len || hover !== null) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let stopped = false;
    let current: AnimationPlaybackControls | undefined;

    const play = (controls: AnimationPlaybackControls) => {
      current = controls;
      return controls.finished;
    };

    const lap = async () => {
      while (!stopped) {
        await play(
          animate(to, 1, { duration: (1 - to.get()) * n * STEP, ease: "linear" })
        );
        if (stopped) return;
        await play(animate(from, 1, { duration: RELEASE, ease: EASE }));
        if (stopped) return;
        from.set(0);
        to.set(0);
      }
    };

    lap().catch(() => {});
    return () => {
      stopped = true;
      current?.stop();
    };
  }, [len, hover, n, from, to]);

  /**
   * A hovered node is scrubbed to directly — the fill is a fill, so it can
   * shrink back to an earlier node as readily as it grows to a later one.
   */
  useEffect(() => {
    if (hover === null || !len) return;
    setActive(hover);
    const target = (hover + 0.5) / n;
    const c = animate(to, target, {
      duration: span(target - to.get()),
      ease: EASE,
    });
    const r = from.get() ? animate(from, 0, { duration: 0.45, ease: EASE }) : null;
    return () => {
      c.stop();
      r?.stop();
    };
  }, [hover, len, n, from, to]);

  // Dash units are fractions of the loop, courtesy of pathLength={1}.
  const dashArray = useTransform([from, to], ([a, b]: number[]) => `${b - a} 1`);
  const dashOffset = useTransform(from, (a) => -a);
  const headX = useTransform(to, (t) =>
    railRef.current && len ? railRef.current.getPointAtLength(t * len).x : 0
  );
  const headY = useTransform(to, (t) =>
    railRef.current && len ? railRef.current.getPointAtLength(t * len).y : 0
  );
  const headOpacity = useTransform([from, to], ([a, b]: number[]) =>
    b - a < 0.012 ? 0 : 1
  );

  const cap = buildCapabilities[active];
  const activeColor = ramp(active, n);

  return (
    <div className="mt-24 lg:mt-32">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-brand-soft/12 pb-7">
        <div>
          <span className="eyebrow text-brand-2/70">Our approach</span>
          <h4 className="display mt-3 text-[clamp(1.6rem,2.8vw,2.2rem)] leading-tight text-paper">
            What we <span className="text-grad italic">build</span>
          </h4>
        </div>
        <p className="max-w-[36ch] text-[0.88rem] leading-relaxed text-paper-2/45">
          Seven core capabilities, one team. Most engagements draw on several
          of them at once.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,30rem)_1fr] lg:gap-16">
        {/* the mark, carrying the seven capabilities */}
        <div
          ref={boxRef}
          className="relative mx-auto w-full max-w-[30rem]"
          style={{ aspectRatio: `${MARK_VIEWBOX.w} / ${MARK_VIEWBOX.h}` }}
          onMouseLeave={() => setHover(null)}
        >
          <svg
            aria-hidden
            viewBox={`${MARK_VIEWBOX.x} ${MARK_VIEWBOX.y} ${MARK_VIEWBOX.w} ${MARK_VIEWBOX.h}`}
            className="absolute inset-0 size-full overflow-visible"
          >
            <defs>
              <linearGradient
                id="cap-rail"
                x1="113"
                y1="60"
                x2="352"
                y2="180"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stopColor="#2356D6" />
                <stop offset="1" stopColor="#00E0FF" />
              </linearGradient>
              <filter id="cap-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2.6" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* a soft brand wash, so the shape still reads as the logo */}
            <path
              d={MARK_PATH}
              fill="none"
              stroke="url(#cap-rail)"
              strokeWidth="8"
              strokeLinecap="round"
              opacity="0.12"
              filter="url(#cap-glow)"
            />
            {/* the unlit rail */}
            <path
              ref={railRef}
              d={MARK_PATH}
              fill="none"
              stroke="rgba(232,236,247,0.14)"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            {/* the fill, growing from the start of the loop */}
            {len > 0 && (
              <motion.path
                d={MARK_PATH}
                pathLength={1}
                fill="none"
                stroke="url(#cap-rail)"
                strokeWidth="3.4"
                strokeLinecap="round"
                filter="url(#cap-glow)"
                style={{
                  strokeDasharray: dashArray,
                  strokeDashoffset: dashOffset,
                }}
              />
            )}
            {/* its leading edge */}
            {len > 0 && (
              <motion.circle
                r="2.6"
                fill="#EAF6FF"
                cx={headX}
                cy={headY}
                filter="url(#cap-glow)"
                style={{ opacity: headOpacity }}
              />
            )}
          </svg>

          {/* the active motif, seated at the centre of the larger lobe */}
          <div
            className="pointer-events-none absolute hidden -translate-x-1/2 -translate-y-1/2 sm:block"
            style={{ left: `${motif?.left ?? 63}%`, top: `${motif?.top ?? 45}%` }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, scale: 0.75, rotate: -8 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.75, rotate: 8 }}
                transition={{ duration: 0.45, ease: EASE }}
                style={
                  {
                    "--art-a": activeColor,
                    "--art-b": ramp(active, n, 0.7),
                  } as React.CSSProperties
                }
              >
                <CapabilityArt
                  name={cap.title}
                  className="size-14 opacity-90 lg:size-16"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* the nodes, and their solved labels */}
          {buildCapabilities.map((c, i) => {
            const node = nodes[i];
            const on = active === i;
            const col = ramp(i, n);
            return (
              <Fragment key={c.title}>
                <div
                  ref={i === 0 ? nodeRef : undefined}
                  className="absolute -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300"
                  style={{
                    left: `${node?.left ?? 50}%`,
                    top: `${node?.top ?? 50}%`,
                    opacity: node ? 1 : 0,
                  }}
                >
                  <motion.button
                    type="button"
                    aria-label={c.title}
                    aria-pressed={on}
                    onMouseEnter={() => setHover(i)}
                    onFocus={() => setHover(i)}
                    onBlur={() => setHover(null)}
                    onClick={() => setHover(i)}
                    initial={false}
                    animate={{ scale: on ? 1.18 : 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    className="grid size-8 place-items-center rounded-full outline-none transition-colors duration-300 sm:size-10"
                    style={{
                      background: on ? col : "rgba(8,11,20,0.92)",
                      boxShadow: on
                        ? `0 0 0 5px ${ramp(i, n, 0.16)}`
                        : "inset 0 0 0 1px rgba(232,236,247,0.22)",
                    }}
                  >
                    <span
                      className="text-[0.58rem] font-semibold tabular-nums tracking-[0.08em] sm:text-[0.62rem]"
                      style={{ color: on ? "#080B14" : "rgba(232,236,247,0.55)" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </motion.button>
                </div>

                {/* Rendered before it is placed so it can be measured; the
                    solver needs the real wrapped size, not an estimate. */}
                <span
                  ref={(el) => {
                    labelRefs.current[i] = el;
                  }}
                  className="pointer-events-none absolute w-max max-w-[4.6rem] text-[0.62rem] font-medium leading-tight transition-[color,opacity] duration-300 sm:text-[0.72rem]"
                  style={{
                    left: `${node?.lx ?? 50}%`,
                    top: `${node?.ly ?? 50}%`,
                    transform: node
                      ? `translate(${node.fx * 100}%, ${node.fy * 100}%)`
                      : "translate(-50%, -50%)",
                    textAlign:
                      node?.fx === 0 ? "left" : node?.fx === -1 ? "right" : "center",
                    opacity: node ? 1 : 0,
                    color: on ? "#E8ECF7" : "rgba(232,236,247,0.42)",
                  }}
                >
                  {c.title}
                </span>
              </Fragment>
            );
          })}
        </div>

        {/* detail panel */}
        <div className="relative min-h-[15rem]">
          <AnimatePresence mode="wait">
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              <span
                className="text-[0.68rem] font-semibold tabular-nums tracking-[0.16em]"
                style={{ color: activeColor }}
              >
                {String(active + 1).padStart(2, "0")} /{" "}
                {String(n).padStart(2, "0")}
              </span>
              <h5 className="display mt-4 text-[clamp(1.9rem,3.6vw,2.8rem)] leading-tight text-paper">
                {cap.title}
              </h5>
              <p className="mt-4 max-w-[46ch] text-[0.95rem] leading-relaxed text-paper-2/55">
                {cap.detail}
              </p>

              <ul className="mt-7 flex flex-wrap gap-2.5">
                {cap.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-center gap-2 rounded-full px-4 py-2 text-[0.8rem] text-paper-2/70 ring-1 ring-brand-soft/15"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden
                      className="size-3.5 shrink-0"
                      style={{ color: activeColor }}
                    >
                      <path
                        d="M5 12.5 9.5 17 19 7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {b}
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------
   Who we build it for — a photograph per domain.
------------------------------------------------------------- */
function Domains() {
  return (
    <div className="mt-24 lg:mt-32">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-brand-soft/12 pb-7">
        <h4 className="display text-[clamp(1.6rem,2.8vw,2.2rem)] leading-tight text-paper">
          Who we build it <span className="text-grad italic">for</span>
        </h4>
        <span className="eyebrow text-paper-2/30">Eight domains</span>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {domainFocus.map((d, i) => {
          const c = ramp(i, domainFocus.length);
          return (
            <motion.article
              key={d}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -60px 0px" }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.07, ease: EASE }}
              whileHover={{ y: -5 }}
              className="group relative overflow-hidden rounded-[20px] bg-ink-2 ring-1 ring-brand-soft/12 transition-shadow duration-500"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                {domainImages[d] && (
                  <Image
                    src={domainImages[d]}
                    alt={d}
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    // The set runs from a sunlit tower to a night port, so a
                    // shared dim keeps the row even against the ink section;
                    // hovering returns the photograph to full strength.
                    className="object-cover brightness-[0.82] transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-100"
                  />
                )}
                {/* just enough scrim to seat the photo against the footer */}
                <span
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(0deg, rgba(8,11,20,0.75), rgba(8,11,20,0.10) 45%, transparent 70%)",
                  }}
                />
                {/* a whisper of the stage colour, so the row stays on-brand */}
                <span
                  aria-hidden
                  className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-0"
                  style={{
                    background: `linear-gradient(150deg, ${ramp(i, domainFocus.length, 0.18)}, transparent 60%)`,
                  }}
                />
              </div>

              {/* the one white surface on the tile, earned on hover */}
              <div className="relative flex items-center justify-between gap-2 border-t border-brand-soft/12 px-4 py-3.5 transition-colors duration-500 group-hover:bg-paper">
                <span className="text-[0.9rem] font-medium text-paper transition-colors duration-500 group-hover:text-brand-deep">
                  {d}
                </span>
                <span
                  className="text-[0.6rem] font-semibold tabular-nums tracking-[0.14em]"
                  style={{ color: c }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}
