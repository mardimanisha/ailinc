"use client";

import Image from "next/image";
import { Pill, Reveal, Words } from "./ui";
import { press } from "@/lib/content";

/**
 * Press and award coverage, laid out as a masonry bento — each clipping
 * keeps its native aspect ratio and stacks into whichever column CSS
 * columns assigns it, on the light surface between the education
 * carousel and the partner strip.
 */
export default function Newsroom() {
  return (
    <section className="grain relative z-50 -mt-7 rounded-t-[28px] bg-paper py-24 text-brand-deep sm:-mt-10 sm:rounded-t-[40px] sm:py-32">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          background:
            "radial-gradient(60% 50% at 10% 0%, rgba(35,86,214,0.12), transparent 62%), radial-gradient(55% 45% at 92% 100%, rgba(0,224,255,0.14), transparent 65%)",
        }}
      />

      <div className="relative mx-auto max-w-[1240px] px-6 lg:px-10">
        <Pill tone="light">03 · Newsroom</Pill>

        <h2 className="display mt-7 max-w-[16ch] text-[clamp(2.7rem,7vw,5.2rem)] text-brand-deep">
          <Words text="In the press" italic={["press"]} />
        </h2>

        <Reveal delay={0.15} className="mt-6 max-w-[60ch]">
          <p className="text-sm leading-relaxed text-brand-deep/60">
            Award recognitions and regional press coverage of our institutional
            partnerships — including the Osmania University MoU and the ET Industry
            Achievers award for AI &amp; Technology Education.
          </p>
        </Reveal>

        <div className="mt-14 columns-2 gap-4 sm:columns-3 lg:mt-16 lg:columns-4">
          {press.map((p, i) => (
            <Reveal
              key={p.image}
              delay={Math.min(i * 0.04, 0.4)}
              className="mb-4 break-inside-avoid"
            >
              <article className="group relative overflow-hidden rounded-[14px] bg-paper-2 ring-1 ring-brand-deep/8 transition-shadow duration-500 hover:ring-brand/25">
                <Image
                  src={p.image}
                  alt={p.outlet}
                  width={p.w}
                  height={p.h}
                  sizes="(min-width: 1024px) 24vw, (min-width: 640px) 32vw, 48vw"
                  className="block h-auto w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />

                <span className="pointer-events-none absolute left-2.5 top-2.5 inline-flex items-center gap-1.5 rounded-full bg-ink/55 px-2.5 py-1 text-[0.6rem] font-medium tracking-wide text-paper-2/90 uppercase opacity-0 ring-1 ring-white/10 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100">
                  <span
                    className="size-1.5 rounded-full"
                    style={{ background: "linear-gradient(100deg,#2356D6,#00E0FF)" }}
                  />
                  {p.outlet}
                </span>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
