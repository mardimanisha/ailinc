"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import CardVisual from "./CardVisual";
import { Pill, Words } from "./ui";

export type Slide = {
  step: string;
  tag: string;
  title: string;
  body: string;
  image: string;
  bullets?: { name: string; detail: string }[];
};

/** Card geometry, in rem. The track shifts by exactly one card + gap. */
const CARD_W = 19;
const GAP = 1.25;

/**
 * The reference's signature block: a left rail carrying the heading and
 * an index counter, and a track of cards that slides one position at a
 * time and bleeds off the right edge of the viewport.
 */
export default function Carousel({
  id,
  eyebrow,
  heading,
  italic,
  lead,
  slides,
  tone = "light",
}: {
  id: string;
  eyebrow: string;
  heading: string;
  italic?: string[];
  lead: string;
  slides: Slide[];
  tone?: "light" | "dark";
}) {
  const [index, setIndex] = useState(0);
  const [active, setActive] = useState(0);
  const light = tone === "light";
  const trackRef = useRef<HTMLDivElement>(null);

  const go = useCallback(
    (dir: number) =>
      setIndex((i) => {
        const next = Math.min(Math.max(i + dir, 0), slides.length - 1);
        setActive(next);
        return next;
      }),
    [slides.length]
  );

  // Trackpad / touch swipe, matching the drag affordance in the reference.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let x0 = 0;
    const down = (e: PointerEvent) => {
      x0 = e.clientX;
      el.setPointerCapture(e.pointerId);
    };
    const up = (e: PointerEvent) => {
      const dx = e.clientX - x0;
      if (Math.abs(dx) > 60) go(dx < 0 ? 1 : -1);
    };
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointerup", up);
    return () => {
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointerup", up);
    };
  }, [go]);

  return (
    <section
      id={id}
      data-brand-theme={light ? "light" : "dark"}
      className={clsx(
        "grain relative z-30 overflow-hidden rounded-t-[28px] py-24 sm:rounded-t-[40px] sm:py-32",
        light ? "bg-paper text-brand-deep" : "bg-ink text-paper"
      )}
    >
      {/* soft wash behind the whole block */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          background: light
            ? "radial-gradient(70% 55% at 78% 4%, rgba(0,224,255,0.16), transparent 62%), radial-gradient(60% 50% at 12% 92%, rgba(35,86,214,0.13), transparent 65%)"
            : "radial-gradient(65% 50% at 80% 0%, rgba(0,224,255,0.12), transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-[1240px] px-6 lg:px-10">
        <Pill tone={light ? "light" : "dark"}>{eyebrow}</Pill>

        <h2
          className={clsx(
            "display mt-7 max-w-[15ch] text-[clamp(2.7rem,7vw,5.2rem)]",
            light ? "text-brand-deep" : "text-paper"
          )}
        >
          <Words text={heading} italic={italic} />
        </h2>
      </div>

      {/* Same max-width container as the heading, so the rail lines up
          with it. Only the track escapes, to bleed off the right edge. */}
      <div className="relative mx-auto mt-14 flex max-w-[1240px] flex-col gap-10 px-6 lg:mt-16 lg:flex-row lg:items-start lg:gap-10 lg:pr-0 lg:pl-10">
        {/* left rail */}
        <div className="w-full shrink-0 lg:w-[15rem] xl:w-[17rem]">
          <div className="flex items-baseline gap-1">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={slides[active].step}
                initial={{ y: 26, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -26, opacity: 0 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="display inline-block text-[clamp(2.6rem,5vw,3.6rem)]"
              >
                {slides[active].step}
              </motion.span>
            </AnimatePresence>
            <span
              className={clsx(
                "display text-[clamp(1.4rem,2.6vw,1.9rem)]",
                light ? "text-brand-deep/35" : "text-paper-2/30"
              )}
            >
              /{String(slides.length).padStart(2, "0")}
            </span>
          </div>

          <p
            className={clsx(
              "mt-5 max-w-[34ch] text-sm leading-relaxed",
              light ? "text-brand-deep/60" : "text-paper-2/50"
            )}
          >
            {lead}
          </p>
        </div>

        {/* mobile: a plain vertical stack, one card per row */}
        <div className="flex flex-col gap-6 lg:hidden">
          {slides.map((s, i) => (
            <Card key={s.title} s={s} i={i} onActivate={setActive} className="w-full" />
          ))}
        </div>

        {/* desktop: sliding track — the negative right margin lets it run
            out to the viewport edge on screens wider than the container */}
        <div
          ref={trackRef}
          className="hidden min-w-0 flex-1 touch-pan-y overflow-hidden lg:block lg:mr-[min(0px,calc(620px-50vw))]"
        >
          <motion.div
            className="flex"
            style={{ gap: `${GAP}rem` }}
            animate={{ x: `-${index * (CARD_W + GAP)}rem` }}
            transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
          >
            {slides.map((s, i) => (
              <Card
                key={s.title}
                s={s}
                i={i}
                onActivate={setActive}
                fade={i < index}
                className="w-[19rem] shrink-0"
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Card({
  s,
  i,
  onActivate,
  fade = false,
  className,
}: {
  s: Slide;
  i: number;
  onActivate: (i: number) => void;
  fade?: boolean;
  className?: string;
}) {
  return (
    <motion.article
      onHoverStart={() => onActivate(i)}
      onFocus={() => onActivate(i)}
      tabIndex={0}
      animate={{ opacity: fade ? 0.25 : 1 }}
      transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
      className={clsx(
        "group relative h-[26rem] overflow-hidden rounded-[22px] outline-none",
        className
      )}
    >
      <CardVisual image={s.image} priority={i === 0} />

      <div className="relative flex h-full flex-col justify-between p-6">
        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-ink/55 px-3 py-1.5 eyebrow text-paper-2/85 ring-1 ring-white/10 backdrop-blur-md">
          <span
            className="size-1.5 rounded-full"
            style={{ background: "linear-gradient(100deg,#2356D6,#00E0FF)" }}
          />
          {s.tag}
        </span>

        <div>
          <h3 className="display text-[1.6rem] leading-tight text-paper">{s.title}</h3>
          <p className="mt-2 text-[0.78rem] leading-relaxed text-paper-2/65">{s.body}</p>

          {s.bullets && (
            <ul className="mt-4 space-y-2 border-t border-white/15 pt-3">
              {s.bullets.map((b) => (
                <li key={b.name}>
                  <p className="text-[0.74rem] font-medium text-paper-2/90">{b.name}</p>
                  <p className="text-[0.68rem] leading-snug text-paper-2/45">{b.detail}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </motion.article>
  );
}
