"use client";

import { motion } from "motion/react";
import { useState } from "react";
import clsx from "clsx";
import { Pill, Reveal, Words } from "./ui";
import { engagements, footprint } from "@/lib/content";

export default function Engagements() {
  const [active, setActive] = useState(0);

  return (
    <section className="grain relative z-40 rounded-t-[28px] bg-ink py-24 sm:rounded-t-[40px] sm:py-32">
      <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Pill>Engagement models</Pill>
            <h2 className="display mt-7 max-w-[13ch] text-[clamp(2.5rem,6vw,4.4rem)] text-paper">
              <Words text="Three levels of ownership" italic={["ownership"]} />
            </h2>
          </div>
          <Reveal delay={0.2} className="max-w-[38ch]">
            <p className="text-sm leading-relaxed text-paper-2/50">
              Engagements run from full product builds to embedded engineering squads
              and independent security and compliance assessments — sized against the
              delivery capacity we actually hold.
            </p>
          </Reveal>
        </div>

        {/* accordion rows: the active row expands, the others recede */}
        <div className="mt-14 grid gap-4 lg:mt-16 lg:grid-cols-3">
          {engagements.map((e, i) => (
            <Reveal key={e.title} delay={i * 0.1}>
              <motion.article
                onHoverStart={() => setActive(i)}
                onFocus={() => setActive(i)}
                tabIndex={0}
                animate={{
                  y: active === i ? -8 : 0,
                }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className={clsx(
                  "relative h-full overflow-hidden rounded-[22px] p-7 outline-none transition-colors duration-700 sm:p-8",
                  active === i
                    ? "bg-paper text-brand-deep"
                    : "card-dark text-paper"
                )}
              >
                <span
                  className={clsx(
                    "eyebrow",
                    active === i ? "text-brand" : "text-brand-2/65"
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <h3 className="display mt-5 text-[clamp(1.5rem,2.6vw,2rem)] leading-tight">
                  {e.title}
                </h3>

                <p
                  className={clsx(
                    "mt-3 font-display text-lg italic",
                    active === i ? "text-brand" : "text-brand-2/80"
                  )}
                >
                  {e.lede}
                </p>

                <p
                  className={clsx(
                    "mt-4 text-sm leading-relaxed",
                    active === i ? "text-brand-deep/65" : "text-paper-2/50"
                  )}
                >
                  {e.body}
                </p>

                <motion.span
                  animate={{ scaleX: active === i ? 1 : 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-x-0 bottom-0 h-[3px] origin-left"
                  style={{ background: "linear-gradient(100deg,#2356D6,#00E0FF)" }}
                />
              </motion.article>
            </Reveal>
          ))}
        </div>

        {/* footprint statement */}
        <Reveal delay={0.15} className="mt-20 lg:mt-28">
          <blockquote className="mx-auto max-w-[54ch] text-center">
            <p className="display text-[clamp(1.35rem,2.9vw,2.05rem)] leading-[1.28] text-paper-2/85">
              {footprint}
            </p>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
