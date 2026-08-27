"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Counter, Pill, Reveal, Words } from "./ui";
import { whoWeAre, stats } from "@/lib/content";

/**
 * The overlap section: it scrolls up over the sticky hero, with the
 * right-hand card stack sliding in from off-screen on a stagger —
 * exactly the reference's second beat.
 */
export default function Company() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 25%"],
  });

  return (
    <section
      ref={ref}
      id="company"
      // overflow-x-clip: the cards enter from off-screen right, and a
      // transform still counts toward scrollable overflow. `clip` (not
      // `hidden`) avoids turning this into a scroll container.
      className="grain relative z-20 overflow-x-clip rounded-t-[28px] bg-ink pt-24 pb-28 sm:rounded-t-[40px] sm:pt-32 lg:pb-36"
      style={{ boxShadow: "0 -40px 100px -20px rgba(8,11,20,0.95)" }}
    >
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-16 px-6 lg:grid-cols-[1fr_1.05fr] lg:gap-14 lg:px-10">
        {/* ---------------- left column ---------------- */}
        <div className="flex flex-col justify-between">
          <div>
            <Pill>{whoWeAre.eyebrow}</Pill>

            <h2 className="display mt-7 text-[clamp(2.3rem,4.6vw,3.5rem)] text-paper">
              <span className="block">
                <Words text={whoWeAre.title[0]} />
              </span>
              <span className="mt-1 block">
                <Words text={whoWeAre.title[1]} delay={0.12} />{" "}
                {/* inline media chip, as in the reference heading */}
                <span className="relative inline-block h-[0.72em] w-[1.35em] translate-y-[0.06em] overflow-hidden rounded-[0.28em] align-middle ring-1 ring-brand-2/25">
                  <span
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(120deg,#2356D6,#00E0FF)" }}
                  />
                  <Image
                    src="/logos/ai-linc-mark-white.svg"
                    alt=""
                    fill
                    className="scale-[0.62] object-contain opacity-90"
                  />
                </span>{" "}
                <Words text={whoWeAre.title[2]} delay={0.24} italic={["backbone"]} />
              </span>
            </h2>

            <Reveal delay={0.15} className="mt-8 max-w-[52ch]">
              <p className="text-[0.95rem] leading-relaxed text-paper-2/55">
                {whoWeAre.body}
              </p>
            </Reveal>
          </div>

          {/* stat row */}
          <div className="mt-14 grid grid-cols-3 gap-6 lg:mt-20">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={0.1 + i * 0.1}>
                <p className="display text-[clamp(2.2rem,5vw,3.4rem)] text-paper">
                  <Counter value={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-2 text-xs leading-snug text-paper-2/45">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ---------------- right column: reach card ---------------- */}
        <div className="flex flex-col justify-center">
          <ReachCard progress={scrollYProgress} />
        </div>
      </div>
    </section>
  );
}

function ReachCard({
  progress,
}: {
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const { reach } = whoWeAre;
  const x = useTransform(progress, [0, 0.72], [220, 0]);
  const opacity = useTransform(progress, [0, 0.45], [0, 1]);

  return (
    <motion.article
      style={{ x, opacity }}
      className="card-dark group relative overflow-hidden rounded-[22px] p-8 text-paper sm:p-10"
    >
      <span className="eyebrow text-brand-2/70">{reach.kicker}</span>

      <div className="mt-6 flex flex-wrap gap-2.5">
        {reach.scope.map((s) => (
          <span
            key={s}
            className="rounded-full border border-brand-2/25 bg-brand-2/10 px-4 py-1.5 text-xs font-medium tracking-wide text-brand-2"
          >
            {s}
          </span>
        ))}
      </div>

      <p className="mt-6 max-w-[46ch] text-sm leading-relaxed text-paper-2/50">
        {reach.lead}
      </p>

      <h3 className="display mt-8 text-[clamp(1.5rem,2.9vw,2rem)] leading-tight">
        {reach.statement}
        <br />
        <span className="italic text-brand-2">{reach.statementHighlight}</span>
      </h3>

      {/* sheen on hover */}
      <span className="pointer-events-none absolute -inset-x-10 -top-24 h-40 rotate-12 bg-gradient-to-r from-transparent via-white/6 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
    </motion.article>
  );
}
