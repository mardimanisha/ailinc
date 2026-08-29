"use client";

import Image from "next/image";
import { Pill, Reveal, Tilt, Words } from "./ui";
import { founders, trainers } from "@/lib/content";

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
        <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-2">
          {founders.map((f, i) => (
            <Reveal key={f.name} delay={i * 0.12} className="h-full">
              <Tilt strength={4} className="h-full">
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

        {/* trainers */}
        <div className="mt-28">
          <Pill tone="light">Trainers</Pill>
          <h2 className="display mt-7 max-w-[20ch] text-[clamp(2.2rem,5vw,3.6rem)]">
            <Words text="Trainers who've shipped at the companies they teach about" italic={["about"]} />
          </h2>

          {/* `items-stretch` + `h-full` on every wrapper: the article can only
              fill the grid row if Reveal and Tilt pass the height through. */}
          <div className="mt-14 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {trainers.map((t, i) => (
              <Reveal key={t.name} delay={(i % 6) * 0.08} className="h-full">
                <Tilt strength={3} className="h-full">
                  <article className="group relative flex h-full flex-col overflow-hidden rounded-[20px] bg-white p-6 ring-1 ring-brand-deep/10 shadow-[0_18px_50px_-34px_rgba(10,18,40,0.5)] transition-shadow duration-500 hover:shadow-[0_28px_70px_-32px_rgba(35,86,214,0.45)]">
                    {/* brand hairline that draws itself in on hover */}
                    <span
                      className="pointer-events-none absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 transition-transform duration-700 ease-out-expo group-hover:scale-x-100"
                      style={{ background: "var(--brand-grad)" }}
                    />

                    <header className="flex items-start gap-4">
                      <div
                        className="relative size-16 shrink-0 rounded-full p-[2px]"
                        style={{ background: "var(--brand-grad)" }}
                      >
                        <div className="relative size-full overflow-hidden rounded-full ring-2 ring-white">
                          <Image
                            src={t.photo}
                            alt={t.name}
                            fill
                            sizes="64px"
                            className="object-cover transition-transform duration-[900ms] group-hover:scale-105"
                          />
                        </div>
                      </div>

                      <div className="min-w-0 pt-1.5">
                        <h3 className="display truncate text-[1.2rem] leading-tight text-brand-deep">
                          {t.name}
                        </h3>
                        <p className="mt-1 truncate text-xs text-brand-deep/55">{t.title}</p>
                      </div>

                      {t.rating && (
                        <span className="ml-auto shrink-0 rounded-full bg-brand-deep px-2.5 py-1 text-[11px] font-medium tracking-wide text-paper">
                          ★ {t.rating}
                        </span>
                      )}
                    </header>

                    <p className="mt-5 text-sm font-semibold leading-snug text-brand-deep">
                      {t.specialization}
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-brand/8 px-2.5 py-1 eyebrow text-brand ring-1 ring-brand/15">
                        {t.experience}
                      </span>
                      {t.location && (
                        <span className="rounded-full bg-ink/5 px-2.5 py-1 eyebrow text-brand-deep/55 ring-1 ring-brand-deep/10">
                          {t.location}
                        </span>
                      )}
                    </div>

                    {/* flex-1 absorbs the row's spare height so the CTA below
                        lands on the same line across every card */}
                    <ul className="mt-5 flex-1 space-y-2 border-t border-brand-deep/10 pt-4 text-[13px] leading-relaxed text-brand-deep/65">
                      {t.achievements.map((a) => (
                        <li key={a} className="flex gap-2.5">
                          <span
                            className="mt-[7px] size-1.5 shrink-0 rounded-full"
                            style={{ background: "var(--brand-grad)" }}
                          />
                          <span>{a}</span>
                        </li>
                      ))}
                    </ul>

                    <a
                      href={t.linkedin}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-brand-deep px-4 py-2 text-xs font-medium text-paper transition-colors duration-300 hover:bg-brand"
                    >
                      LinkedIn
                      <svg viewBox="0 0 24 24" fill="none" className="size-3.5">
                        <path
                          d="M7 17 17 7m0 0H8m9 0v9"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                  </article>
                </Tilt>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
