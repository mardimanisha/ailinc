"use client";

import Image from "next/image";

/**
 * Card artwork: a real photograph behind a scrim.
 *
 * Every still is a frame from AI LINC's own b-roll (public/video), so
 * the imagery is contextual and rights-clear. The scrim is what keeps
 * the title and bullet list readable over it.
 */
export default function CardVisual({
  image,
  alt = "",
  priority,
}: {
  image: string;
  alt?: string;
  priority?: boolean;
}) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <Image
        src={image}
        alt={alt}
        fill
        sizes="(max-width: 640px) 80vw, 320px"
        priority={priority}
        className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
      />

      {/* brand tint, then a bottom-weighted scrim for the copy */}
      <div
        className="absolute inset-0 opacity-30 mix-blend-color"
        style={{ background: "linear-gradient(150deg,#2356D6,#00E0FF)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/78 via-45% to-transparent" />
    </div>
  );
}
