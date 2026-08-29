/**
 * Line motifs for the five delivery stages, drawn on one 120×120 stage.
 *
 * Like the domain plates, each paints itself from `--art-a` (structure)
 * and `--art-b` (accent), which the stage card sets from the brand ramp
 * — so the motif re-colours itself for the open white card and the ink
 * cards without a second copy of the artwork.
 */

const S = {
  fill: "none",
  stroke: "var(--art-a)",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const ACCENT = {
  fill: "none",
  stroke: "var(--art-b)",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const ART: Record<string, React.ReactNode> = {
  /* a lit bulb — the problem framed */
  Idea: (
    <>
      <path
        d="M60 28a24 24 0 0 0-14 43.5V80h28v-8.5A24 24 0 0 0 60 28Z"
        {...S}
      />
      <path d="M46 88h28M51 96h18" {...S} />
      <path d="M53 68q7-10 14 0M60 46v22" {...ACCENT} />
      <path d="M60 14V6M28 30l-6-6M92 30l6-6M22 56h-8M98 56h8" {...ACCENT} />
    </>
  ),

  /* a sketched frame — proof, not product */
  Prototype: (
    <>
      <path d="M18 24h84v74H18z" {...S} strokeDasharray="7 7" />
      <rect x="28" y="36" width="30" height="22" rx="3" {...S} />
      <path d="M68 42h26M68 52h18" {...S} />
      <rect x="28" y="68" width="66" height="20" rx="3" {...ACCENT} strokeDasharray="5 6" />
      <circle cx="94" cy="30" r="5" fill="var(--art-b)" />
    </>
  ),

  /* a finished screen, signed off */
  Product: (
    <>
      <rect x="12" y="24" width="96" height="72" rx="8" {...S} />
      <path d="M12 44h96" {...S} />
      <circle cx="24" cy="34" r="2.5" fill="var(--art-b)" />
      <circle cx="33" cy="34" r="2.5" fill="var(--art-b)" />
      <circle cx="42" cy="34" r="2.5" fill="var(--art-b)" />
      <path d="M26 58h32M26 70h44M26 82h24" {...S} />
      <rect x="74" y="54" width="24" height="32" rx="4" {...ACCENT} />
      <path d="M79 70l5 5 10-11" {...ACCENT} />
    </>
  ),

  /* a gear inside a closed loop — it runs itself */
  Automation: (
    <>
      <circle cx="60" cy="60" r="16" {...S} />
      <circle cx="60" cy="60" r="6" {...S} />
      <path
        d="M60 38v-8M60 82v8M38 60h-8M82 60h8M45 45l-6-6M75 75l6 6M75 45l6-6M45 75l-6 6"
        {...S}
      />
      <path d="M26 60a34 34 0 0 1 48-31" {...ACCENT} />
      <path d="M64 22l11 7-8 9" {...ACCENT} />
      <path d="M94 60a34 34 0 0 1-48 31" {...ACCENT} />
      <path d="M56 98l-11-7 8-9" {...ACCENT} />
    </>
  ),

  /* one node fanning out — it grows with you */
  Scale: (
    <>
      <path d="M32 60 60 36M32 60l28 24M60 36l28-12M60 36l28 12M60 84l28-12M60 84l28 12" {...S} />
      <circle cx="26" cy="60" r="8" {...S} />
      <circle cx="60" cy="36" r="6" {...S} />
      <circle cx="60" cy="84" r="6" {...S} />
      <circle cx="94" cy="24" r="5" {...ACCENT} />
      <circle cx="94" cy="48" r="5" {...ACCENT} />
      <circle cx="94" cy="72" r="5" {...ACCENT} />
      <circle cx="94" cy="96" r="5" {...ACCENT} />
    </>
  ),
};

export default function StageArt({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 120 120" fill="none" aria-hidden className={className}>
      {ART[name] ?? ART.Idea}
    </svg>
  );
}
