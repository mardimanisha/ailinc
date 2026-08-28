"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";

type Project = {
  client: string;
  logo: string;
  flag: string;
  country: string;
  step: string;
  title: string;
  body: string;
  tags: string[];
};

/**
 * A pinned, scroll-driven reveal. The left rail stays fixed in place;
 * the right stage is sticky within a tall scroll track — one
 * screen-height segment per *project* (not per country) — so scrolling
 * through a country with several clients steps through each one in
 * turn, highlighting its card while its neighbours sit dimmed, before
 * crossfading into the next country's stack.
 */
export default function CountryPortfolio({ projects }: { projects: Project[] }) {
  const grouped = useMemo(() => {
    const countries = Array.from(new Set(projects.map((p) => p.country)));
    return countries.map((country) => ({
      country,
      flag: projects.find((p) => p.country === country)!.flag,
      projects: projects.filter((p) => p.country === country),
    }));
  }, [projects]);

  const flatSteps = useMemo(
    () =>
      grouped.flatMap((g, groupIndex) =>
        g.projects.map((_, indexInGroup) => ({ groupIndex, indexInGroup }))
      ),
    [grouped]
  );

  const [activeFlat, setActiveFlat] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const els = stepRefs.current;
    const observers = els.map((el, i) => {
      if (!el) return null;
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveFlat(i);
        },
        { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
      );
      io.observe(el);
      return io;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, [flatSteps.length]);

  const activeGroupIndex = flatSteps[activeFlat]?.groupIndex ?? 0;
  const activeIndexInGroup = flatSteps[activeFlat]?.indexInGroup ?? 0;
  const activeGroup = grouped[activeGroupIndex];

  const goTo = (flatIndex: number) =>
    stepRefs.current[flatIndex]?.scrollIntoView({ behavior: "smooth", block: "start" });

  const goToCountry = (groupIndex: number) => {
    const flatIndex = flatSteps.findIndex((s) => s.groupIndex === groupIndex);
    if (flatIndex >= 0) goTo(flatIndex);
  };

  return (
    <div className="lg:grid lg:grid-cols-[15rem_1fr] lg:gap-14 xl:grid-cols-[17rem_1fr]">
      {/* left rail — country index, sticky through the whole pinned scroll */}
      <div className="hidden lg:block">
        <div className="sticky top-32 flex flex-col gap-1">
          {grouped.map((g, i) => (
            <button
              key={g.country}
              type="button"
              onClick={() => goToCountry(i)}
              className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-left"
            >
              <span
                className={clsx(
                  "relative h-5 w-7 shrink-0 overflow-hidden rounded-[3px] ring-1 transition-all duration-500",
                  activeGroupIndex === i ? "opacity-100 ring-brand-deep/25" : "opacity-40 ring-brand-deep/10"
                )}
              >
                <Image src={g.flag} alt={g.country} fill sizes="28px" className="object-cover" />
              </span>
              <span
                className={clsx(
                  "display transition-all duration-500",
                  activeGroupIndex === i ? "text-[1.15rem] text-brand-deep" : "text-[0.95rem] text-brand-deep/35"
                )}
              >
                {g.country}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* right — desktop: a tall scroll track (one 100vh segment per
          project) with a sticky stage that shows the active country's
          cards, highlighting whichever project is current */}
      <div className="relative hidden lg:block" style={{ height: `${flatSteps.length * 100}vh` }}>
        {flatSteps.map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              stepRefs.current[i] = el;
            }}
            className="pointer-events-none absolute inset-x-0"
            style={{ top: `${i * 100}vh`, height: "100vh" }}
          />
        ))}

        <div className="sticky top-32 flex h-[calc(100vh-9rem)] flex-col justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeGroup.country}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -28 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex max-h-full flex-col justify-center gap-4 overflow-y-auto"
            >
              {activeGroup.projects.map((p, pi) => (
                <ProjectCard key={p.client} project={p} active={pi === activeIndexInGroup} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* mobile / tablet — pinning doesn't translate below lg, so fall
          back to a plain stacked list grouped by country */}
      <div className="flex flex-col gap-16 lg:hidden">
        {grouped.map((g) => (
          <div key={g.country} className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <span className="relative h-5 w-7 shrink-0 overflow-hidden rounded-[3px] ring-1 ring-brand-deep/15">
                <Image src={g.flag} alt={g.country} fill sizes="28px" className="object-cover" />
              </span>
              <span className="eyebrow text-brand-deep/60">{g.country}</span>
            </div>

            {g.projects.map((p) => (
              <ProjectCard key={p.client} project={p} active />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project: p, active }: { project: Project; active: boolean }) {
  return (
    <motion.div
      layout
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={clsx(
        "relative shrink-0 overflow-hidden rounded-[22px] ring-1 transition-colors duration-500",
        active
          ? "bg-paper text-brand-deep shadow-[0_18px_45px_-20px_rgba(10,18,40,0.35)] ring-brand-deep/10"
          : "bg-ink-3/70 text-paper-2/60 ring-white/5"
      )}
    >
      <span
        className="block h-[3px] w-full transition-opacity duration-500"
        style={{
          background: "linear-gradient(100deg,#2356D6,#00E0FF)",
          opacity: active ? 1 : 0.3,
        }}
      />

      <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-start sm:gap-6 sm:p-7">
        <div className="flex shrink-0 items-center gap-3 sm:w-40 sm:flex-col sm:items-start sm:gap-3">
          <span className="relative h-9 w-28 shrink-0 overflow-hidden rounded-lg bg-paper px-2.5 py-1.5 ring-1 ring-brand-deep/10">
            <Image src={p.logo} alt={p.client} fill sizes="140px" className="object-contain object-left p-1" />
          </span>
          <span
            className={clsx(
              "relative h-5 w-8 shrink-0 overflow-hidden rounded-[3px] ring-1",
              active ? "ring-brand-deep/15" : "ring-white/10"
            )}
          >
            <Image src={p.flag} alt={p.country} fill sizes="32px" className="object-cover" />
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <span className={clsx("eyebrow", active ? "text-brand-2/70" : "text-paper-2/30")}>
            Project {p.step}
          </span>

          <h4
            className={clsx(
              "display mt-2 leading-snug",
              active ? "text-[1.3rem] text-brand-deep" : "text-[1.05rem]"
            )}
          >
            {p.title}
          </h4>

          <p
            className={clsx(
              "mt-2 max-w-[62ch] text-[0.8rem] leading-relaxed",
              active ? "text-brand-deep/60" : "line-clamp-2 text-paper-2/40"
            )}
          >
            {p.body}
          </p>

          <AnimatePresence>
            {active && (
              <motion.ul
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="mt-4 flex flex-wrap gap-1.5 overflow-hidden"
              >
                {p.tags.map((t) => (
                  <li
                    key={t}
                    className="rounded-md bg-brand/12 px-2 py-1 text-[0.62rem] font-medium tracking-wide text-brand-soft uppercase ring-1 ring-brand-soft/20"
                  >
                    {t}
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
