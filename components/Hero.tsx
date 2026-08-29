"use client";

import { useState } from "react";

/**
 * Hero: the brand film, full bleed, plus the tagline and scroll cue
 * overlaid on top of it. The logo lockup lives in BrandMark so it
 * stays visible past the hero and on every page.
 *
 * The section that follows still scrolls up over the top of it — the
 * sticky wrapper is what produces that overlap.
 */
export default function Hero() {
  const [muted, setMuted] = useState(true);

  return (
    <div id="top" data-brand-theme="dark" className="relative h-[115svh]">
      <div className="sticky top-0 h-svh overflow-hidden bg-ink">
        <video
          className="h-full w-full object-cover"
          src="/video/AI_LINC_Brand_Film.mp4"
          poster="/video/brand-film-poster.jpg"
          autoPlay
          muted={muted}
          loop
          playsInline
          preload="auto"
        />

        <p className="display absolute bottom-10 left-0 w-full max-w-2xl bg-gradient-to-r from-ink/80 via-ink/50 to-transparent py-3 pl-6 pr-16 text-[8.5vw] leading-[1.05] text-paper sm:bottom-16 sm:max-w-3xl sm:py-4 sm:pl-10 sm:pr-24 sm:text-4xl md:text-5xl">
          Empowering the world with{" "}
          <em className="text-grad italic">infinite possibilities</em> of AI.
        </p>

        <div className="absolute bottom-1 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 sm:bottom-2">
          <span className="eyebrow text-paper-2/70">Scroll</span>
          <span className="relative h-16 w-px overflow-hidden bg-paper-2/20">
            <span className="absolute inset-x-0 -top-4 h-4 animate-scroll-cue bg-brand-2" />
          </span>
        </div>

        <button
          type="button"
          onClick={() => setMuted((prev) => !prev)}
          aria-label={muted ? "Unmute sound" : "Mute sound"}
          className="absolute bottom-10 right-6 flex h-11 w-11 items-center justify-center rounded-full border border-paper-2/30 bg-ink/50 text-paper transition hover:border-paper-2/60 sm:bottom-16 sm:right-10"
        >
          {muted ? (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="M4 9v6h4l5 5V4L8 9H4z" />
              <path d="M17 9l5 6M22 9l-5 6" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="M4 9v6h4l5 5V4L8 9H4z" />
              <path d="M16 8a5 5 0 0 1 0 8" />
              <path d="M18.5 5.5a9 9 0 0 1 0 13" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
