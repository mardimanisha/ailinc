"use client";

import Image from "next/image";
import { Pill, Reveal, Tilt, Words } from "./ui";
import { founders } from "@/lib/content";

export default function Team() {
  return (
    <section
      id="team"
      className="grain relative z-60 bg-paper pt-36 pb-24 text-brand-deep sm:pt-44 sm:pb-32"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(60% 45% at 85% 0%, rgba(0,224,255,0.16), transparent 62%), radial-gradient(55% 45% at 8% 100%, rgba(35,86,214,0.12), transparent 66%)",
        }}
      />

      <div className="relative mx-auto max-w-[1240px] px-6 lg:px-10">
        <Pill tone="light">Leadership</Pill>
        <h2 className="display mt-7 max-w-[16ch] text-[clamp(2.5rem,6vw,4.4rem)]">
          <Words text="Founders with enterprise engineering backgrounds" italic={["backgrounds"]} />
        </h2>

        {/* founders */}
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {founders.map((f, i) => (
            <Reveal key={f.name} delay={i * 0.12}>
              <Tilt strength={4}>
                <article className="group flex h-full flex-col gap-6 rounded-[22px] bg-ink p-6 text-paper sm:flex-row sm:p-7">
                  <div className="relative aspect-square w-full shrink-0 overflow-hidden rounded-2xl sm:size-40">
                    <Image
                      src={f.image}
                      alt={f.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 160px"
                      className="object-cover transition-transform duration-[900ms] group-hover:scale-105"
                    />
                  </div>

                  <div className="flex flex-col justify-center">
                    <h3 className="display text-[clamp(1.5rem,2.6vw,2rem)]">{f.name}</h3>
                    <p className="mt-1 eyebrow text-brand-2/80">{f.role}</p>
                    <p className="mt-4 max-w-[40ch] text-sm leading-relaxed text-paper-2/55">
                      {f.body}
                    </p>
                  </div>
                </article>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
