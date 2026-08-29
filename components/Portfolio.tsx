"use client";

import Image from "next/image";
import { Pill, Reveal, Tilt, Words } from "./ui";
import PortfolioTabs from "./PortfolioTabs";
import { portfolio } from "@/lib/content";

/**
 * Vertical 01 — Project Portfolio. Sits on the paper (light) surface
 * between the technology carousel and the engagement-model section,
 * proving the capability claims with named, shipped work.
 */
export default function Portfolio() {
  return (
    <section
      id="portfolio"
      data-brand-theme="light"
      className="grain relative z-[35] -mt-7 rounded-t-[28px] bg-paper py-24 text-brand-deep sm:-mt-10 sm:rounded-t-[40px] sm:py-32"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          background:
            "radial-gradient(55% 45% at 90% 0%, rgba(35,86,214,0.1), transparent 62%), radial-gradient(50% 40% at 8% 100%, rgba(0,224,255,0.12), transparent 65%)",
        }}
      />

      <div className="relative mx-auto max-w-[1240px] px-6 lg:px-10">
        <Pill tone="light">{portfolio.eyebrow}</Pill>

        <h2 className="display mt-7 max-w-[16ch] text-[clamp(2.7rem,7vw,5.2rem)] text-brand-deep">
          <Words text={portfolio.title.join(" ")} italic={["actually"]} />
        </h2>

        <Reveal delay={0.15} className="mt-6 max-w-[62ch]">
          <p className="text-sm leading-relaxed text-brand-deep/60">{portfolio.body}</p>
        </Reveal>

        <div className="mt-16 lg:mt-20">
          <PortfolioTabs projects={portfolio.projects} />
        </div>

        {/* also delivered */}
        <div className="mt-20 lg:mt-24">
          <span className="eyebrow text-brand/70">{portfolio.alsoDeliveredEyebrow}</span>
          <h3 className="display mt-3 text-[clamp(1.6rem,3vw,2.3rem)] text-brand-deep">
            {portfolio.alsoDeliveredTitle}
          </h3>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {portfolio.alsoDelivered.map((a, i) => (
              <Reveal key={a.tag} delay={Math.min(i * 0.05, 0.4)}>
                <Tilt strength={5} className="h-full">
                  <div
                    className="group relative h-full rounded-[20px] p-[1px] transition-all duration-500 hover:-translate-y-1"
                    style={{
                      background: `linear-gradient(${150 + i * 35}deg, rgba(35,86,214,0.35), rgba(0,224,255,0.35) 45%, rgba(35,86,214,0) 70%)`,
                    }}
                  >
                    <div className="relative flex h-full flex-col overflow-hidden rounded-[19px] bg-white/80 p-6 ring-1 ring-brand-deep/8 transition-all duration-500 group-hover:bg-white group-hover:shadow-[0_28px_60px_-28px_rgba(35,86,214,0.35)]">
                      <span
                        aria-hidden
                        className="pointer-events-none absolute -right-3 -top-6 select-none font-display text-[6.5rem] leading-none text-brand-deep/[0.05] transition-all duration-500 group-hover:-translate-y-1 group-hover:text-brand-deep/[0.09]"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-40"
                        style={{ background: "linear-gradient(100deg,#2356D6,#00E0FF)" }}
                      />

                      <span className="relative inline-flex w-fit items-center gap-2">
                        <span
                          className="size-1.5 shrink-0 rounded-full transition-transform duration-500 group-hover:scale-125"
                          style={{ background: "linear-gradient(100deg,#2356D6,#00E0FF)" }}
                        />
                        <span className="eyebrow text-brand-deep">{a.tag}</span>
                      </span>
                      <p className="relative mt-3 flex-1 text-sm leading-relaxed text-brand-deep/55">
                        {a.body}
                      </p>
                      <div className="relative mt-5 flex items-center justify-between border-t border-brand-deep/8 pt-4">
                        <div className="flex items-center gap-1.5">
                          {a.countries.map((c) => (
                            <span
                              key={c.code}
                              title={c.name}
                              className="relative h-4 w-6 shrink-0 overflow-hidden rounded-[3px] ring-1 ring-brand-deep/10 transition-transform duration-300 hover:z-10 hover:scale-125"
                            >
                              <Image src={c.flag} alt={c.name} fill sizes="24px" className="object-cover" />
                            </span>
                          ))}
                        </div>
                        <span className="text-[11px] uppercase tracking-wide text-brand-deep/35">
                          {a.countries.map((c) => c.name).join(" · ")}
                        </span>
                      </div>
                    </div>
                  </div>
                </Tilt>
              </Reveal>
            ))}

            <Reveal delay={0.4}>
              <Tilt strength={5} className="h-full">
                <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[20px] bg-ink px-7 py-8">
                  <span
                    className="pointer-events-none absolute -right-14 -top-14 size-44 rounded-full opacity-30 blur-3xl"
                    style={{ background: "linear-gradient(100deg,#2356D6,#00E0FF)" }}
                  />
                  <span className="display text-[clamp(2.6rem,5vw,3.4rem)] text-paper">
                    {portfolio.further.value}
                  </span>
                  <div>
                    <p className="font-display text-lg text-paper">{portfolio.further.title}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-paper-2/55">
                      {portfolio.further.body}
                    </p>
                  </div>
                </div>
              </Tilt>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
