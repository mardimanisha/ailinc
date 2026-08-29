"use client";

/**
 * Line motifs for the seven capabilities, drawn on one 120×120 stage.
 *
 * Same contract as StageArt: everything paints itself from `--art-a`
 * (structure) and `--art-b` (accent), which the tile sets from the brand
 * ramp. What differs is that these move — the parent tile drives a
 * `hover` variant, so each motif performs the thing it depicts: the
 * prototype frame marches, the automation loop turns, the hub pulses.
 */

import { motion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

const S = {
  fill: "none",
  stroke: "var(--art-a)",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const ACCENT = { ...S, stroke: "var(--art-b)" };

/**
 * Variant keys are shared with the tile: `show` is the resting state the
 * grid animates into, `hover` is what the motif does under the pointer.
 */
/** Re-draw a structural path from nothing when the tile is entered. */
const draw = (delay = 0) => ({
  show: { pathLength: 1, opacity: 1 },
  hover: {
    pathLength: [0, 1],
    transition: { duration: 0.9, delay, ease: EASE },
  },
});

/** A group that turns for as long as the pointer is on the tile. */
const spin = (duration: number, dir = 1) => ({
  show: {},
  hover: {
    rotate: 360 * dir,
    transition: { duration, repeat: Infinity, ease: "linear" as const },
  },
});

const pulse = (delay = 0) => ({
  show: { opacity: 0.55, scale: 1 },
  hover: {
    opacity: [0.55, 1, 0.55],
    scale: [1, 1.35, 1],
    transition: { duration: 1.4, delay, repeat: Infinity, ease: "easeInOut" as const },
  },
});

/** Origin at the middle of the 120-unit stage, for the turning groups. */
const CENTRE = { transformBox: "view-box", transformOrigin: "60px 60px" } as const;

const ART: Record<string, React.ReactNode> = {
  /* an isometric box being closed — the product taking shape */
  "Product Development": (
    <>
      <motion.path d="M60 22 100 42v36L60 98 20 78V42Z" {...S} variants={draw()} />
      <motion.path d="M20 42l40 20 40-20M60 62v36" {...S} variants={draw(0.15)} />
      <motion.path d="M40 32 80 52" {...ACCENT} variants={draw(0.3)} />
      <motion.circle cx="60" cy="14" r="4" fill="var(--art-b)" variants={pulse()} />
    </>
  ),

  /* a dashed frame with the ants still marching — proof, not product */
  "AI Prototyping": (
    <>
      <motion.rect
        x="18"
        y="24"
        width="84"
        height="74"
        rx="6"
        {...S}
        strokeDasharray="8 8"
        variants={{
          show: { strokeDashoffset: 0 },
          hover: {
            strokeDashoffset: [0, -32],
            transition: { duration: 1.1, repeat: Infinity, ease: "linear" },
          },
        }}
      />
      <motion.rect x="30" y="38" width="30" height="22" rx="3" {...S} variants={draw(0.1)} />
      <motion.path d="M70 44h22M70 56h14" {...S} variants={draw(0.2)} />
      <motion.rect
        x="30"
        y="70"
        width="60"
        height="16"
        rx="3"
        {...ACCENT}
        strokeDasharray="5 6"
        variants={draw(0.3)}
      />
      <motion.circle cx="96" cy="30" r="4" fill="var(--art-b)" variants={pulse(0.2)} />
    </>
  ),

  /* a handset in front of a window — one product, two surfaces */
  "Web & Mobile Apps": (
    <>
      <motion.rect x="14" y="26" width="76" height="54" rx="6" {...S} variants={draw()} />
      <motion.path d="M14 40h76" {...S} variants={draw(0.12)} />
      <motion.rect x="72" y="48" width="34" height="52" rx="7" {...ACCENT} variants={draw(0.24)} />
      <motion.path
        d="M28 52h30M28 62h22M28 72h34"
        {...S}
        variants={{
          show: { opacity: 1, x: 0 },
          hover: {
            opacity: [0, 1],
            x: [-10, 0],
            transition: { duration: 0.7, delay: 0.3, ease: EASE },
          },
        }}
      />
      <motion.path d="M84 90h10" {...ACCENT} variants={draw(0.4)} />
    </>
  ),

  /* brackets breathing around a caret — code written to order */
  "Custom Software": (
    <>
      <motion.path
        d="M40 34 14 60l26 26"
        {...S}
        variants={{
          show: { x: 0 },
          hover: {
            x: [0, -7, 0],
            transition: { duration: 1.6, repeat: Infinity, ease: "easeInOut" },
          },
        }}
      />
      <motion.path
        d="M80 34l26 26-26 26"
        {...S}
        variants={{
          show: { x: 0 },
          hover: {
            x: [0, 7, 0],
            transition: { duration: 1.6, repeat: Infinity, ease: "easeInOut" },
          },
        }}
      />
      <motion.path d="M68 26 52 94" {...ACCENT} variants={draw(0.15)} />
      <motion.path
        d="M46 104h28"
        {...ACCENT}
        variants={{
          show: { opacity: 0.6 },
          hover: {
            opacity: [0.2, 1, 0.2],
            transition: { duration: 1, repeat: Infinity, ease: "easeInOut" },
          },
        }}
      />
    </>
  ),

  /* satellites holding station around a core — agents on task */
  "AI Tools & Agents": (
    <>
      <motion.circle cx="60" cy="60" r="14" {...S} variants={draw()} />
      <motion.circle cx="60" cy="60" r="5" fill="var(--art-b)" variants={pulse()} />
      <motion.g style={CENTRE} variants={spin(9)}>
        <ellipse cx="60" cy="60" rx="42" ry="18" {...S} opacity={0.7} />
        <circle cx="102" cy="60" r="5" fill="var(--art-b)" />
        <circle cx="18" cy="60" r="4" fill="var(--art-a)" />
      </motion.g>
      <motion.g style={CENTRE} variants={spin(13, -1)}>
        <ellipse
          cx="60"
          cy="60"
          rx="18"
          ry="42"
          {...ACCENT}
          opacity={0.55}
        />
        <circle cx="60" cy="18" r="4" fill="var(--art-b)" />
      </motion.g>
    </>
  ),

  /* a closed loop that keeps turning — it runs itself */
  "Workflow Automation": (
    <>
      <motion.g style={CENTRE} variants={spin(7)}>
        <path d="M26 60a34 34 0 0 1 48-31" {...S} />
        <path d="M64 22l11 7-8 9" {...S} />
        <path d="M94 60a34 34 0 0 1-48 31" {...ACCENT} />
        <path d="M56 98l-11-7 8-9" {...ACCENT} />
      </motion.g>
      <motion.rect x="46" y="46" width="28" height="28" rx="6" {...S} variants={draw()} />
      <motion.path d="M54 60h12M60 54v12" {...ACCENT} variants={draw(0.2)} />
    </>
  ),

  /* two systems joined at a live hub — the seam holds */
  "AI Integration": (
    <>
      <motion.path d="M60 20v24M60 76v24M20 60h24M76 60h24" {...S} variants={draw()} />
      <motion.path d="M32 32l16 16M88 32L72 48M32 88l16-16M88 88L72 72" {...S} variants={draw(0.15)} />
      <motion.circle cx="60" cy="60" r="12" {...ACCENT} variants={draw(0.3)} />
      <motion.circle cx="60" cy="60" r="22" {...ACCENT} opacity={0.35} variants={pulse()} />
      <motion.circle cx="60" cy="14" r="4" fill="var(--art-b)" variants={pulse(0.1)} />
      <motion.circle cx="60" cy="106" r="4" fill="var(--art-b)" variants={pulse(0.35)} />
      <motion.circle cx="14" cy="60" r="4" fill="var(--art-a)" variants={pulse(0.6)} />
      <motion.circle cx="106" cy="60" r="4" fill="var(--art-a)" variants={pulse(0.85)} />
    </>
  ),
};

export default function CapabilityArt({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 120 120" fill="none" aria-hidden className={className}>
      {ART[name] ?? ART["Product Development"]}
    </svg>
  );
}
