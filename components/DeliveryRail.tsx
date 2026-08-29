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
import { Chevron } from "./ui";
import {
  capabilityTags,
  deliveryProcess,
  domainFocus,
  domainImages,
} from "@/lib/content";

const EASE = [0.16, 1, 0.3, 1] as const;
const DWELL = 3600;

/* Line glyphs, one per capability — index-matched to capabilityTags. */
const GLYPHS = [
  "M4 17V7l8-3 8 3v10l-8 3-8-3Zm8-9v12", // product
  "M12 3v4m0 10v4M3 12h4m10 0h4M12 9.5A2.5 2.5 0 1 0 12 14.5a2.5 2.5 0 0 0 0-5Z", // prototyping
  "M7 3h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm3 15h4", // apps
  "M8 6 3 12l5 6m8-12 5 6-5 6M14 4l-4 16", // custom software
  "M12 4a4 4 0 0 1 4 4v1a4 4 0 0 1 0 7v1a4 4 0 0 1-8 0v-1a4 4 0 0 1 0-7V8a4 4 0 0 1 4-4Z", // agents
  "M4 7h9m0 0-3-3m3 3-3 3m10 7h-9m0 0 3 3m-3-3 3-3", // automation
  "M12 3v6m0 6v6M4.5 7.5l5 3m5 3 5 3m0-9-5 3m-5 3-5 3", // integration
];

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
   What we build — a hairline list rather than another card grid.
------------------------------------------------------------- */
function Capabilities() {
  return (
    <div className="mt-24 grid grid-cols-1 gap-10 lg:mt-32 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
      <div>
        <h4 className="display text-[clamp(1.6rem,2.8vw,2.2rem)] leading-tight text-paper">
          What we <span className="text-grad italic">build</span>
        </h4>
        <p className="mt-4 max-w-[30ch] text-[0.88rem] leading-relaxed text-paper-2/45">
          Seven practices, one team. Most engagements draw on several of them at
          once.
        </p>
      </div>

      <ul className="border-t border-brand-soft/12">
        {capabilityTags.map((tag, i) => {
          const c = ramp(i, capabilityTags.length);
          return (
            <motion.li
              key={tag}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -60px 0px" }}
              transition={{ duration: 0.55, delay: i * 0.05, ease: EASE }}
              tabIndex={0}
              className="group relative -mx-4 flex items-center gap-5 border-b border-brand-soft/12 px-4 py-5 outline-none transition-colors duration-300 hover:bg-paper/[0.035] focus-visible:bg-paper/[0.035] sm:gap-6"
            >
              <span
                className="w-7 shrink-0 text-[0.62rem] font-semibold tabular-nums tracking-[0.14em]"
                style={{ color: c }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <span
                className="grid size-11 shrink-0 place-items-center rounded-xl transition-transform duration-500 group-hover:scale-110 group-focus-visible:scale-110"
                style={{
                  background: `linear-gradient(140deg, ${ramp(i, capabilityTags.length, 0.22)}, ${ramp(i, capabilityTags.length, 0.04)})`,
                  boxShadow: `inset 0 0 0 1px ${ramp(i, capabilityTags.length, 0.3)}`,
                  color: c,
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" aria-hidden className="size-5">
                  <path
                    d={GLYPHS[i % GLYPHS.length]}
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>

              <span className="text-[1.05rem] font-medium leading-snug text-paper-2/75 transition-colors duration-300 group-hover:text-paper group-focus-visible:text-paper md:text-xl">
                {tag}
              </span>

              {/* the rule draws itself out of the chevron on hover */}
              <span
                aria-hidden
                className="ml-auto hidden h-px w-0 transition-all duration-500 group-hover:w-20 group-focus-visible:w-20 sm:block"
                style={{ background: c }}
              />
              <Chevron className="ml-auto size-4 shrink-0 text-paper-2/25 transition-all duration-300 group-hover:translate-x-1 group-hover:text-brand-2 group-focus-visible:translate-x-1 group-focus-visible:text-brand-2 sm:ml-4" />
            </motion.li>
          );
        })}
      </ul>
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
