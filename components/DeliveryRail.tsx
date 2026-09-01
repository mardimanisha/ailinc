"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
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

              <p
                className={clsx(
                  "relative mt-4 font-medium transition-all duration-500",
                  on ? "text-xl" : "text-base"
                )}
              >
                {p.label}
              </p>

              <AnimatePresence initial={false}>
                {open && (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className={clsx(
                      "relative mt-3 max-w-[34ch] text-[0.88rem] leading-relaxed",
                      on ? "text-brand-deep/60" : "text-paper-2/45"
                    )}
                  >
                    {p.detail}
                  </motion.p>
                )}
              </AnimatePresence>

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
   What we build — a hub-and-spoke orbit. Seven capabilities ring a
   centre stage; the ring advances on its own, yields to the
   pointer, and the centre morphs its motif + copy to match.
------------------------------------------------------------- */
const ORBIT_DWELL = 3200;

function Capabilities() {
  const n = buildCapabilities.length;
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);

  useEffect(() => {
    if (held) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setActive((i) => (i + 1) % n), ORBIT_DWELL);
    return () => clearInterval(id);
  }, [held, n]);

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

      <div className="mt-14 grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,24rem)_1fr] lg:gap-16">
        {/* the orbit */}
        <div
          className="relative mx-auto aspect-square w-full max-w-[21rem]"
          onMouseLeave={() => setHeld(false)}
        >
          <svg viewBox="0 0 100 100" aria-hidden className="absolute inset-0 size-full overflow-visible">
            {buildCapabilities.map((_, i) => {
              const angle = ((-90 + (360 / n) * i) * Math.PI) / 180;
              const x = 50 + 42 * Math.cos(angle);
              const y = 50 + 42 * Math.sin(angle);
              const on = active === i;
              return (
                <motion.line
                  key={i}
                  x1="50"
                  y1="50"
                  x2={x}
                  y2={y}
                  stroke={on ? ramp(i, n) : "rgba(232,236,247,0.14)"}
                  strokeWidth={on ? 0.7 : 0.4}
                  animate={{ opacity: on ? 0.9 : 0.5 }}
                  transition={{ duration: 0.4, ease: EASE }}
                />
              );
            })}
          </svg>

          {/* centre stage */}
          <div className="absolute inset-[17%] grid place-items-center overflow-hidden rounded-full bg-ink-2 ring-1 ring-brand-soft/15">
            <span
              aria-hidden
              className="absolute inset-0 transition-colors duration-700"
              style={{ background: `radial-gradient(circle, ${ramp(active, n, 0.3)}, transparent 72%)` }}
            />
            <AnimatePresence mode="wait">
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, scale: 0.75, rotate: -8 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.75, rotate: 8 }}
                transition={{ duration: 0.45, ease: EASE }}
                style={{ "--art-a": activeColor, "--art-b": ramp(active, n, 0.7) } as React.CSSProperties}
              >
                <CapabilityArt name={cap.title} className="size-20 sm:size-24" />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* orbiting nodes */}
          {buildCapabilities.map((c, i) => {
            const angle = ((-90 + (360 / n) * i) * Math.PI) / 180;
            const x = 50 + 42 * Math.cos(angle);
            const y = 50 + 42 * Math.sin(angle);
            const on = active === i;
            const col = ramp(i, n);
            return (
              <motion.button
                key={c.title}
                type="button"
                aria-label={c.title}
                aria-pressed={on}
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
                animate={{ scale: on ? 1.15 : 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="absolute grid size-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full outline-none transition-colors duration-300 sm:size-11"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  background: on ? col : "rgba(232,236,247,0.06)",
                  boxShadow: on ? `0 0 0 5px ${ramp(i, n, 0.16)}` : "inset 0 0 0 1px rgba(232,236,247,0.16)",
                }}
              >
                <span
                  className="text-[0.6rem] font-semibold tabular-nums tracking-[0.08em]"
                  style={{ color: on ? "#080B14" : "rgba(232,236,247,0.55)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </motion.button>
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
                {String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
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
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden className="size-3.5 shrink-0" style={{ color: activeColor }}>
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
