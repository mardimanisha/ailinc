"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Reveal } from "./ui";
import { mentors } from "@/lib/mentors";

/**
 * Trainer marketplace. Each card leads with the person's current
 * company and years of experience, which is what an institution is
 * actually buying against.
 */
export default function Mentors() {
  return (
    <div className="mt-24">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow text-brand-deep/40">Trainer marketplace</p>
            <p className="mt-4 max-w-[46ch] font-display text-[clamp(1.3rem,2.6vw,1.9rem)] leading-snug">
              Working practitioners from MAANG and top product companies, matched
              to your programme and delivery calendar.
            </p>
          </div>
          <span className="eyebrow text-brand-deep/40">
            {mentors.length} practitioners
          </span>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mentors.map((m, i) => (
          <motion.article
            key={m.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -60px 0px" }}
            transition={{
              duration: 0.75,
              delay: (i % 3) * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={{ y: -4 }}
            className="group flex flex-col rounded-[20px] bg-white p-5 text-ink ring-1 ring-brand-deep/10 shadow-[0_1px_2px_rgba(10,18,40,0.04),0_12px_32px_-16px_rgba(10,18,40,0.12)] transition-shadow duration-500 hover:ring-brand/30 hover:shadow-[0_1px_2px_rgba(10,18,40,0.04),0_20px_40px_-16px_rgba(10,18,40,0.18)]"
          >
            {/* identity */}
            <div className="flex items-start gap-4">
              <span className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-paper-3">
                <Image
                  src={m.image}
                  alt={m.name}
                  fill
                  sizes="56px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </span>

              <div className="min-w-0">
                <h4 className="display text-[1.35rem] leading-tight text-brand-deep">{m.name}</h4>
                <p className="mt-1 eyebrow text-brand">{m.role}</p>
              </div>
            </div>

            {/* company + years of experience */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {m.company && (
                <span className="flex items-center gap-1.5 rounded-md bg-brand/10 px-2.5 py-1 text-[0.72rem] font-medium text-brand ring-1 ring-brand/20">
                  {m.companyDomain && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={`https://www.google.com/s2/favicons?domain=${m.companyDomain}&sz=64`}
                      alt=""
                      width={14}
                      height={14}
                      className="size-3.5 shrink-0 rounded-sm object-contain"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  )}
                  {m.company}
                </span>
              )}
              <span className="rounded-md bg-brand-deep/5 px-2.5 py-1 text-[0.72rem] font-medium text-brand-deep ring-1 ring-brand-deep/15">
                {m.yoe} YOE
              </span>
              {m.location && (
                <span className="eyebrow text-brand-deep/35">{m.location}</span>
              )}
            </div>

            {/* what they teach */}
            <p className="mt-5 text-sm font-medium text-brand-deep/90">
              {m.specialty}
            </p>
            <p className="mt-2 text-[0.8rem] leading-relaxed text-brand-deep/45">
              {m.note}
            </p>

            {/* footer */}
            <div className="mt-auto flex items-center justify-between gap-4 border-t border-brand-deep/10 pt-4">
              <span className="eyebrow text-brand-deep/35">{m.tier}</span>
              {m.rating && (
                <span className="text-[0.72rem] text-brand-deep/45">
                  <span className="text-brand">★</span> {m.rating}
                  {m.mentees ? ` · ${m.mentees} mentees` : ""}
                </span>
              )}
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
