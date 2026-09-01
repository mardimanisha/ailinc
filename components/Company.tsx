"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { ArrowButton, Pill, Reveal, RotatingWord, Words } from "./ui";
import dynamic from "next/dynamic";

const DeliveryRail = dynamic(() => import("./DeliveryRail"), { ssr: false });
const GlobeReach = dynamic(() => import("./GlobeReach"), { ssr: false });
import ContactModal from "./ContactModal";
import {
  whoWeAre,
  whoWeAreDomains,
  whoWeAreFeatures,
  whoWeAreTrustedBy,
} from "@/lib/content";

const STAT_TILES = whoWeAre.stats;

const STAT_COLORS = ["#A855F7", "#2356D6", "#A855F7", "#2356D6"];

/* icon glyphs for the feature grid, reach badges and trusted-by row */
const ICON_PATHS: Record<string, string> = {
  cube: "M12 3 4 7v10l8 4 8-4V7l-8-4Zm0 0v9m0 0L4 7m8 5 8-5",
  shield: "M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z",
  rocket:
    "M12 2c2 2 3 5 3 8 0 2-.5 4-1.5 5.5L12 22l-1.5-6.5C9.5 14 9 12 9 10c0-3 1-6 3-8Zm-3 12-3 3m9-3 3 3M12 9.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z",
  users:
    "M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm8 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM2 20c0-3 2.5-5 6-5s6 2 6 5m2-5c3 0 6 2 6 5",
  building:
    "M4 21V5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v16m8 0V10a1 1 0 0 0-1-1h-6m-8 0h2m-2 4h2m-2 4h2m4-8h2m-2 4h2m-2 4h2m2-8h2m-2 4h2",
  layers: "M12 3 3 8l9 5 9-5-9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5",
  globe:
    "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm-9-9h18M12 3a13 13 0 0 1 0 18 13 13 0 0 1 0-18Z",
  landmark: "M3 21h18M4 21V10L12 4l8 6v11M9 21v-7h6v7M4 10h16",
  cap: "M12 3 2 8l10 5 10-5-10-5Zm-7 8.2V16c0 1.3 3.1 3 7 3s7-1.7 7-3v-4.8M22 8v6",
  heart:
    "M12 20s-6.5-4.2-9-8C1 8.5 2 4.5 6 4.5c2 0 3.5 1.3 4 2.8.5-1.5 2-2.8 4-2.8 4 0 5 4 3 7.5-2.5 3.8-9 8-9 8Z",
  finance: "M3 10l9-6 9 6M5 10v9m4-9v9m6-9v9m4-9v9M3 19h18",
  truck:
    "M3 7h10v8H3V7Zm10 3h4l4 3v2h-8v-5ZM6 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm12 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
  bag: "M6 8h12l-1.5 12h-9L6 8Zm3 0V6a3 3 0 0 1 6 0v2",
  more: "M6 12h.01M12 12h.01M18 12h.01",
};

function Icon({ name, className }: { name: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <path
        d={ICON_PATHS[name]}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * The overlap section: it scrolls up over the sticky hero, with the
 * globe panel sliding in from off-screen — the reference's second beat.
 */
export default function Company() {
  const ref = useRef<HTMLElement>(null);
  const [contactOpen, setContactOpen] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 25%"],
  });

  return (
    <section
      ref={ref}
      id="company"
      data-brand-theme="dark"
      // overflow-x-clip: the panel enters from off-screen right, and a
      // transform still counts toward scrollable overflow. `clip` (not
      // `hidden`) avoids turning this into a scroll container.
      className="grain relative z-20 overflow-x-clip rounded-t-[28px] bg-ink pt-24 pb-28 sm:rounded-t-[40px] sm:pt-32 lg:pb-36"
      style={{ boxShadow: "0 -40px 100px -20px rgba(8,11,20,0.95)" }}
    >
      {/* soft brand wash behind the globe */}
      <span
        aria-hidden
        className="pointer-events-none absolute right-[-10%] top-[8%] hidden size-[46rem] rounded-full opacity-60 blur-3xl lg:block"
        style={{
          background:
            "radial-gradient(circle, rgba(35,86,214,0.16) 0%, rgba(0,224,255,0.06) 45%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1240px] px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1.02fr] lg:items-start lg:gap-14">
          {/* ---------------- left column ---------------- */}
          <div>
            <Pill>{whoWeAre.eyebrow}</Pill>

            <h2 className="display mt-7 text-[clamp(2.3rem,4.6vw,3.5rem)] text-paper">
              <span className="block">
                <Words text={whoWeAre.title[0]} />
              </span>
              <span className="mt-1 block">
                <Words text={whoWeAre.title[1]} delay={0.12} />{" "}
                <RotatingWord words={whoWeAre.rotatingWords} />.
              </span>
            </h2>

            <Reveal delay={0.15} className="mt-8 max-w-[52ch]">
              <p className="text-[0.95rem] leading-relaxed text-paper-2/55">{whoWeAre.body}</p>
            </Reveal>

            {/* at-a-glance feature row */}
            <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 sm:gap-x-5">
              {whoWeAreFeatures.map((f, i) => (
                <Reveal key={f.title} delay={0.2 + i * 0.06}>
                  <span
                    className="grid size-11 place-items-center rounded-full"
                    style={{
                      background: `color-mix(in srgb, ${f.accent} 16%, transparent)`,
                      color: f.accent,
                    }}
                  >
                    <Icon name={f.icon} className="size-5" />
                  </span>
                  <p className="mt-3 text-sm font-semibold leading-snug text-paper">{f.title}</p>
                  <p className="mt-1 max-w-[16ch] text-xs leading-relaxed text-paper-2/45">
                    {f.body}
                  </p>
                </Reveal>
              ))}
            </div>

            {/* stats + trusted-by panel */}
            <Reveal delay={0.4} className="mt-10 rounded-2xl ring-1 ring-brand-soft/14">
              <div className="grid grid-cols-3 gap-x-4 gap-y-6 p-6">
                {STAT_TILES.map((s, i) => (
                  <div key={s.label}>
                    <span
                      className="display block text-[clamp(1.6rem,2.8vw,2rem)]"
                      style={{ color: STAT_COLORS[i] }}
                    >
                      {s.value}
                    </span>
                    <p className="mt-1 max-w-[14ch] text-[0.72rem] leading-snug text-paper-2/45">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-brand-soft/14 px-6 py-5">
                <span className="eyebrow text-paper-2/35">Trusted by</span>
                <div className="mt-3 flex flex-wrap gap-x-6 gap-y-3">
                  {whoWeAreTrustedBy.map((t) => (
                    <span
                      key={t.label}
                      className="flex items-center gap-2 text-[0.82rem] text-paper-2/60"
                    >
                      <Icon name={t.icon} className="size-4 shrink-0 text-brand-2/80" />
                      {t.label}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* ---------------- right column: the globe ---------------- */}
          <ScrollIn progress={scrollYProgress}>
            <div className="card-dark card-glow overflow-hidden rounded-[26px] text-paper">
              {/* reach badges, floating over the live globe */}
              <div className="relative flex min-h-[420px] flex-col justify-between overflow-hidden p-6 sm:min-h-[480px] sm:p-8">
                {/* the globe sits centered behind the badge quadrants */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.85]"
                >
                  <GlobeReach />
                </div>

                {[whoWeAre.reach.badges.slice(0, 2), whoWeAre.reach.badges.slice(2, 4)].map(
                  (row, rowIdx) => (
                    <div
                      key={rowIdx}
                      className="relative flex flex-wrap justify-between gap-3 sm:flex-nowrap sm:gap-4"
                    >
                      {row.map((b, i) => {
                        const idx = rowIdx * 2 + i;
                        return (
                          <motion.span
                            key={b.label}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "0px 0px -80px 0px" }}
                            transition={{
                              duration: 0.7,
                              delay: 0.15 + idx * 0.08,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                            className="flex w-full max-w-[15.5rem] items-start gap-3 rounded-xl bg-ink/55 p-4 ring-1 ring-paper/12 backdrop-blur-md"
                          >
                            <span
                              className="grid size-9 shrink-0 place-items-center rounded-lg text-brand-2"
                              style={{
                                background:
                                  "linear-gradient(140deg, rgba(35,86,214,0.28), rgba(0,224,255,0.08))",
                              }}
                            >
                              <Icon name={b.icon} className="size-4.5" />
                            </span>
                            <span className="min-w-0">
                              <span className="block text-[0.85rem] font-semibold leading-tight text-paper">
                                {b.label}
                              </span>
                              <span className="mt-1 block text-[0.78rem] leading-snug text-paper-2/50">
                                {b.caption}
                              </span>
                            </span>
                          </motion.span>
                        );
                      })}
                    </div>
                  )
                )}
              </div>

              <div className="h-px bg-brand-soft/14" />

              {/* CTA */}
              <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:p-8">
                <div>
                  <p className="display text-[1.2rem] leading-snug text-paper">
                    {whoWeAre.reach.cta.title}
                  </p>
                  <p className="mt-2 max-w-[36ch] text-[0.85rem] leading-relaxed text-paper-2/50">
                    {whoWeAre.reach.cta.body}
                  </p>
                </div>
                <div className="shrink-0">
                  <ArrowButton onClick={() => setContactOpen(true)}>
                    {whoWeAre.reach.cta.button}
                  </ArrowButton>
                </div>
              </div>

              <div className="h-px bg-brand-soft/14" />

              {/* domains served strip */}
              <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-4 px-6 py-5 sm:px-8">
                {whoWeAreDomains.map((d) => (
                  <span
                    key={d.label}
                    className="flex flex-col items-center gap-2 text-center"
                  >
                    <span className="grid size-9 place-items-center rounded-full bg-paper/5 text-paper-2/70 ring-1 ring-brand-soft/14">
                      <Icon name={d.icon} className="size-4" />
                    </span>
                    <span className="text-[0.68rem] leading-tight text-paper-2/45">
                      {d.label}
                    </span>
                  </span>
                ))}
              </div>
            </div>
          </ScrollIn>
        </div>

        <DeliveryRail />
      </div>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </section>
  );
}

function ScrollIn({
  progress,
  children,
}: {
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  children: React.ReactNode;
}) {
  const x = useTransform(progress, [0, 0.72], [220, 0]);
  const opacity = useTransform(progress, [0, 0.45], [0, 1]);

  return <motion.div style={{ x, opacity }}>{children}</motion.div>;
}
