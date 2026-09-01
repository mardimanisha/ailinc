"use client";

import { AnimatePresence, motion, useInView, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import clsx from "clsx";

/* -------------------------------------------------------------
   Reveal — the reference's standard entrance: a short rise with a
   long expo ease, staggered by index.
------------------------------------------------------------- */
export function Reveal({
  children,
  delay = 0,
  y = 26,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "span" | "li" | "p";
}) {
  const Cmp = motion[as] as typeof motion.div;
  return (
    <Cmp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -90px 0px" }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Cmp>
  );
}

/* -------------------------------------------------------------
   Words — display headings resolve word by word.
------------------------------------------------------------- */
export function Words({
  text,
  className,
  delay = 0,
  italic,
  highlight,
}: {
  text: string;
  className?: string;
  delay?: number;
  /** words rendered in the display italic, as in the reference */
  italic?: string[];
  /** words rendered in the brand accent color, as in the reference */
  highlight?: string[];
}) {
  const words = text.split(" ");
  const ref = useRef<HTMLSpanElement>(null);
  let highlightOrder = 0;

  // Each mask fully clips its word while it sits at y:110%, and an
  // IntersectionObserver on a completely clipped element never reports a
  // hit — so the trigger is observed on the unclipped wrapper instead.
  const inView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });

  return (
    <span ref={ref} className={clsx("inline", className)}>
      {/* The mask is grown 0.2em below and pulled back with an equal negative
          margin: the clip box then clears descenders (p, g, y) while the word
          stays on the same baseline, and the hidden word — parked a full 110%
          of its own height down — is still out of sight. */}
      {words.map((word, i) => {
        const isHighlighted = highlight?.includes(word.replace(/[.,]/g, ""));
        const extraDelay = isHighlighted ? highlightOrder++ * 0.18 : 0;
        return (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden align-bottom pb-[0.2em] -mb-[0.2em]"
        >
          <motion.span
            className={clsx(
              "inline-block",
              italic?.includes(word.replace(/[.,]/g, "")) && "italic pr-[0.06em]"
            )}
            style={isHighlighted ? { color: "var(--color-brand-2)" } : undefined}
            initial={
              isHighlighted
                ? { y: "110%", opacity: 0, scale: 0.6 }
                : { y: "110%", opacity: 0 }
            }
            animate={
              inView
                ? isHighlighted
                  ? { y: "0%", opacity: 1, scale: 1 }
                  : { y: "0%", opacity: 1 }
                : isHighlighted
                  ? { y: "110%", opacity: 0, scale: 0.6 }
                  : { y: "110%", opacity: 0 }
            }
            transition={
              isHighlighted
                ? {
                    delay: delay + i * 0.055 + extraDelay,
                    type: "spring",
                    stiffness: 280,
                    damping: 18,
                  }
                : {
                    duration: 1,
                    delay: delay + i * 0.055,
                    ease: [0.16, 1, 0.3, 1],
                  }
            }
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
        );
      })}
    </span>
  );
}

/* -------------------------------------------------------------
   RotatingWord — a single accent-colored slot that cycles through a
   list of words on a hold/transition loop, each one sliding up and
   fading in while the previous slides up and fades out (the
   reference's "at TCS / at Infosys / at Wipro" pattern).
------------------------------------------------------------- */
export function RotatingWord({
  words,
  className,
  holdMs = 2200,
}: {
  words: readonly string[];
  className?: string;
  holdMs?: number;
}) {
  const [index, setIndex] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, holdMs);
    return () => clearInterval(id);
  }, [inView, words.length, holdMs]);

  return (
    <span
      ref={ref}
      className={clsx(
        "relative inline-block overflow-hidden align-bottom pb-[0.2em] -mb-[0.2em]",
        className
      )}
      style={{ color: "var(--color-brand-2)" }}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={inView ? words[index] : "idle"}
          className="inline-block"
          initial={{ y: "110%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-110%", opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {inView ? words[index] : words[0]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/* -------------------------------------------------------------
   Pill — the small rounded label above every heading.
------------------------------------------------------------- */
export function Pill({
  children,
  tone = "dark",
  className,
}: {
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <Reveal
      className={clsx(
        "inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 eyebrow",
        tone === "dark"
          ? "bg-ink-3/80 text-paper-2 ring-1 ring-brand-soft/20"
          : "bg-ink/8 text-brand-deep ring-1 ring-brand-deep/10",
        className
      )}
    >
      <span
        className="size-1.5 rounded-full"
        style={{ background: "linear-gradient(100deg,#2356D6,#00E0FF)" }}
      />
      {children}
    </Reveal>
  );
}

/* -------------------------------------------------------------
   ArrowButton — the pill CTA and the circular carousel controls.
------------------------------------------------------------- */
export function ArrowButton({
  children,
  href = "#",
  tone = "light",
  onClick,
}: {
  children: ReactNode;
  href?: string;
  tone?: "light" | "dark";
  onClick?: () => void;
}) {
  const className = clsx(
    "group inline-flex items-center gap-3 rounded-full py-2 pl-6 pr-2 text-sm font-medium",
    tone === "light"
      ? "bg-paper text-brand-deep shadow-[0_18px_50px_-18px_rgba(0,224,255,0.55)]"
      : "bg-ink-3 text-paper ring-1 ring-brand-soft/25"
  );

  const inner = (
    <>
      <span className="font-display text-base">{children}</span>
      <span
        className={clsx(
          "grid size-8 place-items-center rounded-full transition-transform duration-500 group-hover:translate-x-0.5",
          tone === "light" ? "text-paper" : "text-brand-deep"
        )}
        style={{ background: "linear-gradient(100deg,#2356D6,#00E0FF)" }}
      >
        <Chevron />
      </span>
    </>
  );

  // A click handler means the caller drives the behavior (e.g. opening a
  // modal) instead of navigating, so this renders as a button, not a link.
  if (onClick) {
    return (
      <motion.button
        type="button"
        onClick={onClick}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 380, damping: 26 }}
        className={className}
      >
        {inner}
      </motion.button>
    );
  }

  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 380, damping: 26 }}
      className={className}
    >
      {inner}
    </motion.a>
  );
}

export function Chevron({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={clsx("size-4", className)}>
      <path
        d="M5 12h13m0 0-5-5m5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function RoundButton({
  onClick,
  label,
  flip,
  disabled,
  tone = "dark",
}: {
  onClick: () => void;
  label: string;
  flip?: boolean;
  disabled?: boolean;
  tone?: "dark" | "light";
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={label}
      disabled={disabled}
      whileHover={disabled ? undefined : { scale: 1.1 }}
      whileTap={disabled ? undefined : { scale: 0.92 }}
      transition={{ type: "spring", stiffness: 420, damping: 24 }}
      className={clsx(
        "grid size-11 place-items-center rounded-full transition-opacity duration-300",
        tone === "dark"
          ? "bg-ink-3 text-paper ring-1 ring-brand-soft/25"
          : "bg-brand-deep text-paper",
        disabled && "opacity-30"
      )}
    >
      <Chevron className={clsx("size-4", flip && "rotate-180")} />
    </motion.button>
  );
}

/* -------------------------------------------------------------
   Counter — the stat row tallies up when it enters view.
------------------------------------------------------------- */
export function Counter({
  value,
  suffix = "",
  decimals = 0,
}: {
  value: number;
  suffix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 60, damping: 20, mass: 0.9 });

  useEffect(() => {
    if (inView) mv.set(value);
  }, [inView, mv, value]);

  useEffect(
    () =>
      spring.on("change", (v) => {
        if (ref.current) ref.current.textContent = v.toFixed(decimals);
      }),
    [spring, decimals]
  );

  return (
    <span className="tabular-nums">
      <span ref={ref}>0</span>
      {suffix}
    </span>
  );
}

/* -------------------------------------------------------------
   Tilt — cards lean toward the cursor.
------------------------------------------------------------- */
export function Tilt({
  children,
  className,
  strength = 8,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useSpring(useMotionValue(0), { stiffness: 220, damping: 22 });
  const ry = useSpring(useMotionValue(0), { stiffness: 220, damping: 22 });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1200 }}
      onPointerMove={(e) => {
        // Touch has no pointerleave to reset the tilt afterwards, so a tap
        // would otherwise leave the card permanently skewed (and, with
        // transformPerspective, poking past the viewport edge on mobile).
        if (e.pointerType === "touch") return;
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        ry.set(((e.clientX - r.left) / r.width - 0.5) * strength * 2);
        rx.set(-((e.clientY - r.top) / r.height - 0.5) * strength * 2);
      }}
      onPointerLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
