"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { Chevron, Pill, Reveal, Words } from "./ui";
import { press } from "@/lib/content";

type PressItem = (typeof press)[number];

const EASE = [0.16, 1, 0.3, 1] as const;
const PAGE_SIZE = 8;

/**
 * True masonry: tallest items first (LPT — longest processing time —
 * scheduling), each dropped into whichever column is currently
 * shortest, tracked by its normalized (aspect-ratio) height. Placing
 * the biggest pieces first is what keeps the column bottoms level;
 * greedily packing in source order (or without the LPT sort) leaves
 * whichever column drew the last, small items visibly shorter than
 * the rest. Not CSS multi-column, which fills top-to-bottom in source
 * order and strands a short last column full of gaps.
 */
function distributeIntoColumns(items: PressItem[], cols: number) {
  const sorted = [...items].sort((a, b) => b.h / b.w - a.h / a.w);
  const heights = new Array(cols).fill(0);
  const columns: PressItem[][] = Array.from({ length: cols }, () => []);
  for (const item of sorted) {
    let shortest = 0;
    for (let i = 1; i < cols; i++) {
      if (heights[i] < heights[shortest]) shortest = i;
    }
    columns[shortest].push(item);
    heights[shortest] += item.h / item.w;
  }
  return columns;
}

function useColumnCount() {
  const [cols, setCols] = useState(4);
  useEffect(() => {
    function update() {
      const w = window.innerWidth;
      setCols(w >= 1024 ? 4 : w >= 640 ? 3 : 2);
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return cols;
}

const FILTERS = [
  { key: "All", label: "All coverage" },
  { key: "Awards", label: "Awards & Recognition" },
  { key: "Press", label: "Press & Features" },
  { key: "Talks", label: "Talks & Milestones" },
] as const;

type FilterKey = (typeof FILTERS)[number]["key"];

/**
 * Press and award coverage. A featured spotlight strip surfaces the two
 * headline recognitions, category pills filter the rest, and a masonry
 * bento reveals in pages via "Show more" now that the archive has grown
 * well past a single screenful.
 */
export default function Newsroom() {
  const [filter, setFilter] = useState<FilterKey>("All");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const cols = useColumnCount();

  const featured = useMemo(() => press.filter((p) => p.featured), []);

  const rest = useMemo(
    () =>
      press.filter((p) => {
        if (p.featured) return false;
        if (filter === "All") return true;
        return p.category === filter;
      }),
    [filter]
  );

  const shown = rest.slice(0, visible);
  const remaining = rest.length - shown.length;
  const columns = useMemo(() => distributeIntoColumns(shown, cols), [shown, cols]);

  function selectFilter(key: FilterKey) {
    setFilter(key);
    setVisible(PAGE_SIZE);
  }

  return (
    <section
      data-brand-theme="light"
      className="grain relative z-50 -mt-7 rounded-t-[28px] bg-paper py-24 text-brand-deep sm:-mt-10 sm:rounded-t-[40px] sm:py-32"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          background:
            "radial-gradient(60% 50% at 10% 0%, rgba(35,86,214,0.12), transparent 62%), radial-gradient(55% 45% at 92% 100%, rgba(0,224,255,0.14), transparent 65%)",
        }}
      />

      <div className="relative mx-auto max-w-[1240px] px-6 lg:px-10">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <Pill tone="light">03 · Newsroom</Pill>

            <h2 className="display mt-7 max-w-[16ch] text-[clamp(2.7rem,7vw,5.2rem)] text-brand-deep">
              <Words text="In the press" italic={["press"]} />
            </h2>

            <Reveal delay={0.15} className="mt-6 max-w-[60ch]">
              <p className="text-sm leading-relaxed text-brand-deep/60">
                Award recognitions, regional press coverage, and the talks and
                milestones behind them — {press.length} clippings and counting.
              </p>
            </Reveal>
          </div>
        </div>

        {/* featured spotlight — the two headline recognitions */}
        {featured.length > 0 && (
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-16">
            {featured.map((p, i) => (
              <Reveal key={p.image} delay={Math.min(i * 0.08, 0.3)}>
                <article className="group relative overflow-hidden rounded-[22px] bg-ink ring-1 ring-brand-deep/10">
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={p.image}
                      alt={p.outlet}
                      fill
                      sizes="(min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/25 to-transparent" />
                  </div>

                  <span className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-paper/90 px-3 py-1.5 text-[0.65rem] font-medium tracking-wide text-brand-deep uppercase ring-1 ring-white/40 backdrop-blur-md">
                    <span
                      className="size-1.5 rounded-full"
                      style={{ background: "linear-gradient(100deg,#2356D6,#00E0FF)" }}
                    />
                    Featured &middot; {p.tag}
                  </span>

                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <span className="text-xs uppercase tracking-wide text-paper-2/60">
                      {p.outlet}
                    </span>
                    {p.blurb && (
                      <p className="mt-2 max-w-[48ch] text-sm leading-relaxed text-paper-2/90">
                        {p.blurb}
                      </p>
                    )}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        )}

        {/* category filter pills */}
        <div className="mt-12 flex flex-wrap gap-2 lg:mt-14">
          {FILTERS.map((f) => {
            const on = f.key === filter;
            return (
              <button
                key={f.key}
                type="button"
                onClick={() => selectFilter(f.key)}
                aria-pressed={on}
                className="relative shrink-0 rounded-full transition-transform duration-300 hover:-translate-y-0.5"
              >
                {on && (
                  <motion.span
                    layoutId="press-filter"
                    transition={{ type: "spring", stiffness: 380, damping: 34 }}
                    className="absolute inset-0 rounded-full shadow-[0_6px_16px_-6px_rgba(35,86,214,0.55)]"
                    style={{ background: "linear-gradient(100deg,#2356D6,#00E0FF)" }}
                  />
                )}
                {!on && (
                  <span className="absolute inset-0 rounded-full bg-brand-deep/[0.04] ring-1 ring-brand-deep/10" />
                )}
                <span
                  className={`relative block px-4 py-2 text-xs font-medium tracking-wide ${
                    on ? "text-paper" : "text-brand-deep/65"
                  }`}
                >
                  {f.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* masonry grid, paged via Show more — bin-packed into even columns in JS */}
        <div className="mt-8 flex gap-4">
          {columns.map((col, ci) => (
            <div key={ci} className="flex flex-1 flex-col gap-4">
              <AnimatePresence initial={false}>
                {col.map((p) => {
                  const i = shown.indexOf(p);
                  return (
                    <motion.div
                      key={p.image}
                      layout
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: Math.min((i % PAGE_SIZE) * 0.04, 0.32),
                        ease: EASE,
                      }}
                    >
                      <PressCard p={p} />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {rest.length === 0 && (
          <p className="mt-10 text-sm text-brand-deep/50">No coverage in this category yet.</p>
        )}

        {/* show more / show less */}
        {rest.length > PAGE_SIZE && (
          <div className="mt-4 flex justify-center">
            <motion.button
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 380, damping: 26 }}
              onClick={() =>
                setVisible((v) => (remaining > 0 ? v + PAGE_SIZE : PAGE_SIZE))
              }
              className="group inline-flex items-center gap-3 rounded-full bg-brand-deep/[0.04] py-2 pl-6 pr-2 text-sm font-medium text-brand-deep ring-1 ring-brand-deep/10 transition-colors duration-300 hover:bg-brand-deep/[0.07]"
            >
              <span className="font-display text-base">
                {remaining > 0 ? `Show ${Math.min(remaining, PAGE_SIZE)} more` : "Show less"}
              </span>
              <span
                className="grid size-8 place-items-center rounded-full text-paper transition-transform duration-500 group-hover:translate-y-0.5"
                style={{ background: "linear-gradient(100deg,#2356D6,#00E0FF)" }}
              >
                <Chevron className={remaining > 0 ? "rotate-90" : "-rotate-90"} />
              </span>
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
}

function PressCard({ p }: { p: PressItem }) {
  return (
    <article className="group relative overflow-hidden rounded-[14px] bg-paper-2 ring-1 ring-brand-deep/8 transition-shadow duration-500 hover:ring-brand/25">
      <Image
        src={p.image}
        alt={p.outlet}
        width={p.w}
        height={p.h}
        sizes="(min-width: 1024px) 24vw, (min-width: 640px) 32vw, 48vw"
        className="block h-auto w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
      />

      <span className="pointer-events-none absolute left-2.5 top-2.5 inline-flex items-center gap-1.5 rounded-full bg-ink/55 px-2.5 py-1 text-[0.6rem] font-medium tracking-wide text-paper-2/90 uppercase opacity-0 ring-1 ring-white/10 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100">
        <span
          className="size-1.5 rounded-full"
          style={{ background: "linear-gradient(100deg,#2356D6,#00E0FF)" }}
        />
        {p.outlet}
      </span>

      {p.blurb ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex translate-y-2 flex-col gap-1 bg-gradient-to-t from-ink/90 via-ink/70 to-transparent px-3.5 pb-3.5 pt-10 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
          <span className="text-[0.65rem] font-medium tracking-wide text-paper-2/80 uppercase">
            {p.tag}
          </span>
          <p className="text-xs leading-snug text-paper-2">{p.blurb}</p>
        </div>
      ) : null}
    </article>
  );
}
