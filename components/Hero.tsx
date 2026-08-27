"use client";

/**
 * Hero: the brand film, full bleed, and nothing else.
 *
 * The section that follows still scrolls up over the top of it — the
 * sticky wrapper is what produces that overlap.
 */
export default function Hero() {
  return (
    <div id="top" className="relative h-[115svh]">
      <div className="sticky top-0 h-svh overflow-hidden bg-ink">
        <video
          className="h-full w-full object-cover"
          src="/video/AI_LINC_Brand_Film.mp4"
          poster="/video/brand-film-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
      </div>
    </div>
  );
}
