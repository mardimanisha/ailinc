"use client";

import Image from "next/image";
import { Reveal } from "./ui";
import { trustBar } from "@/lib/content";

/**
 * Accreditation, production and press logos. Lives on the home page, between
 * the platform stack and the footer.
 */
function LogoRow({
  label,
  logos,
  reverse = false,
}: {
  label: string;
  logos: { name: string; image: string; dark?: boolean }[];
  reverse?: boolean;
}) {
  return (
    <div className="mt-12 first:mt-10">
      <Reveal>
        <p className="eyebrow text-center text-brand-deep/40">{label}</p>
      </Reveal>
      <div className="relative mt-6 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <div
          className={`flex w-max items-center gap-14 ${
            reverse ? "animate-marquee-reverse" : "animate-marquee"
          }`}
        >
          {[...logos, ...logos].map((p, i) => (
            <div
              key={`${p.name}-${i}`}
              className={
                p.dark
                  ? "relative flex h-12 w-36 shrink-0 items-center justify-center rounded-xl bg-brand-deep px-4"
                  : "relative h-12 w-36 shrink-0 transition-opacity duration-500"
              }
            >
              <Image
                src={p.image}
                alt={p.name}
                fill
                sizes="144px"
                className={p.dark ? "object-contain p-2" : "object-contain"}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Partners() {
  return (
    <section className="grain relative z-60 -mt-7 rounded-t-[28px] bg-paper py-20 text-brand-deep sm:-mt-10 sm:rounded-t-[40px] sm:py-24">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(55% 45% at 85% 0%, rgba(0,224,255,0.14), transparent 62%), radial-gradient(50% 45% at 8% 100%, rgba(35,86,214,0.10), transparent 66%)",
        }}
      />

      <div className="relative mx-auto max-w-[1240px] px-6 lg:px-10">
        <Reveal>
          <p className="eyebrow text-center text-brand-deep/40">
            Accredited, running in production &amp; recognised with
          </p>
        </Reveal>

        <LogoRow label="Flagship programme accredited by" logos={trustBar.accredited} />
        <LogoRow label="Running in production with" logos={trustBar.runningInProduction} reverse />
        <LogoRow label="Recognised & awarded by" logos={trustBar.recognised} />
      </div>
    </section>
  );
}
