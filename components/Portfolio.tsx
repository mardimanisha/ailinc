"use client";

import { Pill, Reveal, Words } from "./ui";
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

        {/* project grid */}
        <div className="mt-16 lg:mt-20">
          <span className="eyebrow text-brand/70">{portfolio.sectionEyebrow}</span>
          <h3 className="display mt-3 text-[clamp(1.6rem,3vw,2.3rem)] text-brand-deep">
            {portfolio.sectionTitle}
          </h3>
        </div>

        <div className="mt-12 lg:mt-14">
          <PortfolioTabs projects={portfolio.projects} />
        </div>

        {/* also delivered */}
        <div className="mt-20 lg:mt-24">
          <span className="eyebrow text-brand/70">{portfolio.alsoDeliveredEyebrow}</span>
          <h3 className="display mt-3 text-[clamp(1.6rem,3vw,2.3rem)] text-brand-deep">
            {portfolio.alsoDeliveredTitle}
          </h3>

          <div className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
            {portfolio.alsoDelivered.map((a, i) => (
              <Reveal key={a.tag} delay={Math.min(i * 0.05, 0.4)}>
                <span className="eyebrow text-brand-deep/70">{a.tag}</span>
                <p className="mt-2 text-sm leading-relaxed text-brand-deep/55">{a.body}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2} className="mt-10">
            <div className="flex flex-col items-start gap-4 rounded-[18px] bg-ink px-7 py-8 sm:flex-row sm:items-center sm:gap-8 sm:px-9">
              <span className="display text-[clamp(2.2rem,4.6vw,3rem)] text-paper">
                {portfolio.further.value}
              </span>
              <div>
                <p className="font-display text-lg text-paper">{portfolio.further.title}</p>
                <p className="mt-1.5 max-w-[64ch] text-sm leading-relaxed text-paper-2/55">
                  {portfolio.further.body}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
