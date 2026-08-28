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
          className="h-full w-full cursor-pointer object-cover"
          src="/video/AI_LINC_Brand_Film.mp4"
          poster="/video/brand-film-poster.jpg"
          autoPlay
          muted={muted}
          loop
          playsInline
          preload="auto"
          onClick={() => setMuted((prev) => !prev)}
        />

        <p className="display absolute bottom-10 left-6 max-w-lg text-[8.5vw] leading-[1.05] text-paper sm:bottom-16 sm:left-10 sm:max-w-2xl sm:text-4xl md:text-5xl">
          Empowering the world with{" "}
          <em className="text-grad italic">infinite possibilities</em> of AI.
        </p>

        <div className="absolute bottom-10 right-6 flex items-center gap-3 sm:bottom-16 sm:right-10">
          <span className="eyebrow text-paper-2/70">Scroll</span>
          <span className="relative h-16 w-px overflow-hidden bg-paper-2/20">
            <span className="absolute inset-x-0 -top-4 h-4 animate-scroll-cue bg-brand-2" />
          </span>
        </div>
      </div>
    </div>
  );
}
