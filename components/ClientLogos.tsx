"use client";

import Image from "next/image";
import { Reveal } from "./ui";
import { clientLogos, productionLogos, awardLogos } from "@/lib/content";

/**
 * "Products built for" logo strip — two rows of client marks, each row
 * an infinite marquee drifting in opposite directions — followed by two
 * static groups: products running in production, and press/institutional
 * recognition.
 */
export default function ClientLogos() {
  return (
    <section
      data-brand-theme="light"
      className="relative z-30 overflow-hidden bg-paper py-20 sm:py-24"
    >
      <div className="mx-auto max-w-[1240px] px-6 text-center lg:px-10">
        <Reveal>
          <span className="eyebrow text-brand-2">Products built for</span>
        </Reveal>
      </div>

      <div className="mt-12 flex flex-col gap-8">
        <MarqueeRow logos={[...clientLogos].reverse()} duration={26} reverse />
      </div>

      <div className="mx-auto mt-20 max-w-[1240px] px-6 lg:px-10">
        <LogoGroup eyebrow="Running in production with" logos={productionLogos} />
        <LogoGroup
          eyebrow="Recognised & awarded by"
          logos={awardLogos}
          className="mt-16"
        />
      </div>
    </section>
  );
}

function LogoGroup({
  eyebrow,
  logos,
  className,
}: {
  eyebrow: string;
  logos: { name: string; logo: string }[];
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="text-center">
        <Reveal>
          <span className="eyebrow text-brand-2">{eyebrow}</span>
        </Reveal>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
        {logos.map((c, i) => (
          <Reveal key={c.logo} delay={0.05 + i * 0.05}>
            <div className="relative h-9 w-28 shrink-0 opacity-90 transition duration-300 hover:opacity-100 sm:h-11 sm:w-36">
              <Image
                src={c.logo}
                alt={c.name}
                fill
                sizes="144px"
                className="object-contain"
              />
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function MarqueeRow({
  logos,
  duration,
  reverse,
}: {
  logos: { name: string; logo: string }[];
  duration: number;
  reverse?: boolean;
}) {
  // Duplicated so the track can loop seamlessly at -50%, tripled so the
  // pattern still fills ultra-wide viewports without a visible seam.
  const track = [...logos, ...logos, ...logos];

  return (
    <div
      className="group relative flex overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <div
        className="flex w-max shrink-0 items-center gap-16 pr-16 [animation-play-state:running] group-hover:[animation-play-state:paused]"
        style={{
          animation: `${reverse ? "marquee-reverse" : "marquee"} ${duration}s linear infinite`,
          willChange: "transform",
        }}
      >
        {track.map((c, i) => (
          <div
            key={`${c.name}-${i}`}
            className="relative flex h-10 w-32 shrink-0 items-center justify-center opacity-90 transition duration-300 hover:opacity-100 sm:h-12 sm:w-40"
          >
            <Image
              src={c.logo}
              alt={c.name}
              fill
              sizes="160px"
              className="object-contain"
            />
          </div>
        ))}
      </div>

      <style jsx>{`
        /* Track is tripled, so shifting by exactly one third of its own
           width lands on a pixel-identical repeat of the pattern — the
           loop wraps with no visible seam or reset jump. */
        @keyframes marquee {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            transform: translate3d(-33.3333%, 0, 0);
          }
        }
        @keyframes marquee-reverse {
          from {
            transform: translate3d(-33.3333%, 0, 0);
          }
          to {
            transform: translate3d(0, 0, 0);
          }
        }
      `}</style>
    </div>
  );
}
