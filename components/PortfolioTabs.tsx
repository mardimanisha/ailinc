"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

type Project = {
  client: string;
  country: string;
  step: string;
  title: string;
  body: string;
  tags: string[];
  logo: string;
  flag: string;
  image: string;
};

/**
 * Portfolio spotlight — one project per tab, matching the printed
 * Vertical 01 brochure's project cards. The section pins in place for a
 * scroll track spanning all projects: scrolling steps through the
 * tabs one by one while the card stays fixed on screen, and only once
 * the last project has been visited does the page continue scrolling
 * past the section.
 */

const EASE = [0.16, 1, 0.3, 1] as const;
const STEP_VH = 100; // scroll distance dedicated to each project, in vh

export default function PortfolioTabs({ projects }: { projects: Project[] }) {
  const [index, setIndex] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  const go = useCallback(
    (next: number) => {
      const clamped = Math.min(Math.max(next, 0), projects.length - 1);
      stepRefs.current[clamped]?.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    [projects.length]
  );

  useEffect(() => {
    const els = stepRefs.current;
    const observers = els.map((el, i) => {
      if (!el) return null;
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setIndex(i);
        },
        { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
      );
      io.observe(el);
      return io;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, [projects.length]);

  const project = projects[index];

  return (
    <div className="relative" style={{ height: `${projects.length * STEP_VH}svh` }}>
      {/* invisible scroll markers, one per project, driving the pin */}
      {projects.map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            stepRefs.current[i] = el;
          }}
          className="pointer-events-none absolute inset-x-0"
          style={{ top: `${i * STEP_VH}svh`, height: `${STEP_VH}svh` }}
        />
      ))}

      <div className="sticky top-28 flex h-[calc(100svh-7rem)] flex-col justify-center sm:top-32 sm:h-[calc(100svh-8rem)]">
        {/* client tabs — single line, scrolling horizontally if it doesn't fit */}
        <div
          className="flex flex-nowrap items-center gap-2 overflow-x-auto px-2 pb-1 sm:justify-center sm:gap-2.5 [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: "none" }}
        >
          {projects.map((p, i) => {
            const on = i === index;
            return (
              <button
                key={p.client}
                type="button"
                onClick={() => go(i)}
                aria-current={on}
                title={p.client}
                className="relative shrink-0 rounded-full transition-transform duration-300 hover:-translate-y-0.5"
              >
                {on && (
                  <motion.span
                    layoutId="portfolio-tab"
                    transition={{ type: "spring", stiffness: 380, damping: 34 }}
                    className="absolute inset-0 rounded-full"
                    style={{ background: "linear-gradient(100deg,#2356D6,#00E0FF)" }}
                  />
                )}
                {!on && (
                  <span className="absolute inset-0 rounded-full bg-paper ring-1 ring-brand-deep/10" />
                )}
                <span
                  className={`relative flex items-center gap-1.5 whitespace-nowrap px-3.5 py-1.5 text-[0.8rem] font-medium ${
                    on ? "text-paper" : "text-brand-deep/70"
                  }`}
                >
                  <span className="relative h-3.5 w-5 shrink-0 overflow-hidden rounded-[2px] ring-1 ring-brand-deep/10">
                    <Image src={p.flag} alt="" fill sizes="20px" className="object-cover" />
                  </span>
                  {p.client}
                </span>
              </button>
            );
          })}
        </div>

        {/* spotlight card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={project.client}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="mt-7 grid overflow-hidden rounded-[24px] bg-paper ring-1 ring-brand-deep/10 sm:mt-9 md:grid-cols-2"
          >
            {/* image side */}
            <div className="relative h-64 sm:h-72 md:h-auto md:min-h-[24rem]">
              <Image
                src={project.image}
                alt=""
                fill
                sizes="(min-width:768px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-transparent" />

              <span className="absolute left-5 top-5 flex h-11 items-center gap-2 rounded-xl bg-paper px-3">
                <span className="relative h-6 w-16">
                  <Image
                    src={project.logo}
                    alt={project.client}
                    fill
                    sizes="64px"
                    className="object-contain object-left"
                  />
                </span>
                <span className="relative h-5 w-8 shrink-0 overflow-hidden rounded-[3px] ring-1 ring-brand-deep/15">
                  <Image src={project.flag} alt="" fill sizes="32px" className="object-cover" />
                </span>
              </span>

              <div className="absolute bottom-6 left-6 right-6 text-paper">
                <span className="eyebrow text-brand-2/80">Project {project.step}</span>
                <h4 className="display mt-2 text-[1.5rem] leading-tight sm:text-[1.7rem]">
                  {project.title}
                </h4>
                <span className="mt-2 block text-xs uppercase tracking-[0.18em] text-paper-2/60">
                  {project.country}
                </span>
              </div>
            </div>

            {/* details side */}
            <div className="flex flex-col justify-center gap-5 p-7 sm:gap-6 sm:p-10">
              <div className="flex items-center gap-3">
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-brand text-paper">
                  <svg viewBox="0 0 24 24" fill="none" className="size-3.5">
                    <path
                      d="M5 13l4 4L19 7"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="font-display text-base text-brand-deep">What we built</span>
              </div>

              <p className="text-sm leading-relaxed text-brand-deep/65">{project.body}</p>

              <div className="h-px w-full bg-brand-deep/10" />

              <ul className="flex flex-wrap gap-2">
                {project.tags.map((t) => (
                  <li
                    key={t}
                    className="rounded-md bg-brand/10 px-3 py-1.5 text-[0.7rem] font-medium uppercase tracking-wide text-brand ring-1 ring-brand/20"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* pager */}
        <div className="mt-6 flex items-center justify-center gap-5 sm:mt-8">
          <Arrow onClick={() => go(index - 1)} label="Previous project" flip />
          <span className="font-display text-sm text-brand-deep/50 tabular-nums">
            {String(index + 1).padStart(2, "0")}
            <span className="text-brand-deep/25">
              {" "}
              / {String(projects.length).padStart(2, "0")}
            </span>
          </span>
          <Arrow onClick={() => go(index + 1)} label="Next project" />
        </div>
      </div>
    </div>
  );
}

function Arrow({
  onClick,
  label,
  flip,
}: {
  onClick: () => void;
  label: string;
  flip?: boolean;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={label}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: "spring", stiffness: 420, damping: 24 }}
      className="grid size-11 place-items-center rounded-full bg-paper text-brand-deep shadow-[0_10px_24px_-14px_rgba(10,18,40,0.6)] ring-1 ring-brand-deep/10"
    >
      <svg viewBox="0 0 24 24" fill="none" className={`size-4 ${flip ? "rotate-180" : ""}`}>
        <path
          d="M5 12h13m0 0-5-5m5 5-5 5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.button>
  );
}
