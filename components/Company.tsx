"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { Pill, Reveal, Words } from "./ui";
import GlobeReach from "./GlobeReach";
import DeliveryRail from "./DeliveryRail";
import { whoWeAre } from "@/lib/content";


/**
 * The overlap section: it scrolls up over the sticky hero, with the
 * globe panel sliding in from off-screen — the reference's second beat.
 */
export default function Company() {
  const ref = useRef<HTMLElement>(null);
  const [country, setCountry] = useState("IN");
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
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1.02fr] lg:items-center lg:gap-14">
          {/* ---------------- left column ---------------- */}
          <div>
            <Pill>{whoWeAre.eyebrow}</Pill>

            <h2 className="display mt-7 text-[clamp(2.3rem,4.6vw,3.5rem)] text-paper">
              <span className="block">
                <Words text={whoWeAre.title[0]} />
              </span>
              <span className="mt-1 block">
                <Words text={whoWeAre.title[1]} delay={0.12} />{" "}
                <Words text={whoWeAre.title[2]} delay={0.24} italic={["backbone"]} />
              </span>
            </h2>

            <Reveal delay={0.15} className="mt-8 max-w-[52ch]">
              <p className="text-[0.95rem] leading-relaxed text-paper-2/55">{whoWeAre.body}</p>
            </Reveal>

          </div>

          {/* ---------------- right column: the globe ---------------- */}
          <ScrollIn progress={scrollYProgress}>
            <article className="card-dark card-glow relative overflow-hidden rounded-[26px] px-6 pb-7 pt-7 text-paper sm:px-8">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="eyebrow text-brand-2/70">{whoWeAre.reach.kicker}</span>
                <span className="text-[0.62rem] uppercase tracking-[0.14em] text-paper-2/30">
                  Drag to spin
                </span>
              </div>

              <h3 className="display mt-3 text-[clamp(1.35rem,2.4vw,1.7rem)] leading-tight">
                {whoWeAre.reach.statement}{" "}
                <span className="italic text-brand-2">{whoWeAre.reach.statementHighlight}</span>
              </h3>

              <div className="mt-2">
                <GlobeReach selected={country} onSelect={setCountry} />
              </div>
            </article>
          </ScrollIn>
        </div>

        <DeliveryRail />
      </div>
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
