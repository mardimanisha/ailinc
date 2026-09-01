"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useState } from "react";

type Impact = {
  timeline: string;
  value: string;
  label: string;
};

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
  impact?: Impact;
};

/**
 * Portfolio spotlight — one project per tab, matching the printed
 * Vertical 01 brochure's project cards. Switching projects is driven
 * entirely by the tabs/arrows, not by scroll position.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

export default function PortfolioTabs({ projects }: { projects: Project[] }) {
  const [index, setIndex] = useState(0);

  const go = useCallback(
    (next: number) => {
      setIndex(Math.min(Math.max(next, 0), projects.length - 1));
    },
    [projects.length]
  );

  const project = projects[index];
  const progress = ((index + 1) / projects.length) * 100;

  return (
    <div className="relative flex flex-col justify-center">
      {/* ambient glow */}
      <div
        className="pointer-events-none absolute -inset-x-10 -top-16 -bottom-16 -z-10 opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(40% 60% at 20% 10%, rgba(35,86,214,0.14), transparent 70%), radial-gradient(35% 50% at 85% 90%, rgba(0,224,255,0.14), transparent 70%)",
        }}
      />

      {/* client tabs — single line, scrolling horizontally if it doesn't fit */}
      <div
        className="flex flex-nowrap items-center gap-2 overflow-x-auto rounded-full bg-brand-deep/[0.03] px-2.5 py-2 ring-1 ring-brand-deep/[0.06] sm:justify-center sm:gap-2.5 [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: "none", width: "fit-content", margin: "0 auto" }}
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
                  className="absolute inset-0 rounded-full shadow-[0_6px_16px_-6px_rgba(35,86,214,0.55)]"
                  style={{ background: "linear-gradient(100deg,#2356D6,#00E0FF)" }}
                />
              )}
              {!on && (
                <span className="absolute inset-0 rounded-full bg-paper ring-1 ring-brand-deep/10" />
              )}
              <span className="relative flex items-center px-3 py-2">
                <span className="relative h-6 w-11 shrink-0 overflow-hidden rounded-[3px] bg-paper">
                  <Image src={p.logo} alt={p.client} fill sizes="44px" className="object-contain p-0.5" />
                </span>
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
          className="relative mt-7 grid overflow-hidden rounded-[28px] bg-paper shadow-[0_30px_70px_-40px_rgba(10,18,40,0.45)] ring-1 ring-brand-deep/10 sm:mt-9 md:grid-cols-2"
        >
          {/* gradient edge */}
          <div
            className="pointer-events-none absolute inset-0 rounded-[28px] opacity-70"
            style={{
              padding: 1,
              background: "linear-gradient(135deg, rgba(35,86,214,0.35), transparent 30%, transparent 70%, rgba(0,224,255,0.3))",
              WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
            }}
          />

          {/* image side */}
          <div className="relative h-64 sm:h-72 md:h-auto md:min-h-[26rem]">
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(min-width:768px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-ink/10" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-ink/10 md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-paper/5" />

            <div className="absolute left-5 right-5 top-5 flex items-center justify-between">
              <span className="flex h-11 items-center gap-2 rounded-xl bg-paper px-3 shadow-[0_10px_24px_-14px_rgba(10,18,40,0.6)]">
                <span className="relative h-6 w-16">
                  <Image
                    src={project.logo}
                    alt={project.client}
                    fill
                    sizes="64px"
                    className="object-contain object-left"
                  />
                </span>
              </span>

              <span className="flex items-center gap-1.5 rounded-full bg-ink/40 px-3 py-1.5 text-[0.65rem] font-medium uppercase tracking-[0.14em] text-paper backdrop-blur-sm ring-1 ring-paper/15">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
                </span>
                Live in production
              </span>
            </div>

            <div className="absolute bottom-6 left-6 right-6 text-paper">
              <h4 className="display text-[1.5rem] leading-tight sm:text-[1.7rem]">
                {project.title}
              </h4>
              <span className="mt-2 block text-xs uppercase tracking-[0.18em] text-paper-2/60">
                {project.country}
              </span>
            </div>
          </div>

          {/* details side */}
          <div className="flex flex-col justify-center gap-6 p-7 sm:gap-7 sm:p-10">
            <p className="text-sm leading-relaxed text-brand-deep/65">{project.body}</p>

            {project.impact && (
              <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-brand/[0.05] to-brand-2/[0.03] ring-1 ring-brand-deep/[0.07]">
                <div className="grid grid-cols-2 divide-x divide-brand-deep/[0.07]">
                  <div className="px-4 py-3.5">
                    <span className="block text-[0.62rem] font-medium uppercase tracking-[0.14em] text-brand-deep/45">
                      Concept &rarr; Production
                    </span>
                    <span className="mt-1 block font-display text-lg text-brand-deep">
                      {project.impact.timeline}
                    </span>
                  </div>
                  <div className="px-4 py-3.5">
                    <span className="block text-[0.62rem] font-medium uppercase tracking-[0.14em] text-brand-deep/45">
                      {project.impact.label}
                    </span>
                    <span
                      className="mt-1 block bg-clip-text font-display text-lg text-transparent"
                      style={{ backgroundImage: "linear-gradient(100deg,#2356D6,#00A8CC)" }}
                    >
                      {project.impact.value}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="h-px w-full bg-gradient-to-r from-brand-deep/10 via-brand-deep/10 to-transparent" />

            <span className="flex w-fit shrink-0 items-center gap-2 rounded-full bg-brand-deep/[0.04] py-1.5 pl-1.5 pr-3 ring-1 ring-brand-deep/10">
              <span className="relative h-5 w-7 shrink-0 overflow-hidden rounded-[3px] shadow-sm ring-1 ring-brand-deep/10">
                <Image src={project.flag} alt={project.country} fill sizes="28px" className="object-cover" />
              </span>
              <span className="text-[0.65rem] font-medium uppercase tracking-[0.1em] text-brand-deep/60">
                {project.country}
              </span>
            </span>

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
      <div className="mt-7 flex flex-col items-center gap-4 sm:mt-9">
        <div className="h-1 w-40 overflow-hidden rounded-full bg-brand-deep/10">
          <motion.div
            className="h-full rounded-full"
            style={{ background: "linear-gradient(100deg,#2356D6,#00E0FF)" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: EASE }}
          />
        </div>
        <div className="flex items-center justify-center gap-5">
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
