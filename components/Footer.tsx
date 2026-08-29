"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { useState } from "react";
import MeshField from "./MeshField";
import { Words } from "./ui";
import { company, countries, nav } from "@/lib/content";

export default function Footer() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [need, setNeed] = useState("");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <footer
      id="contact"
      data-brand-theme="dark"
      className="grain relative z-70 overflow-hidden rounded-t-[28px] bg-ink pt-24 sm:rounded-t-[40px] sm:pt-32"
    >
      {/* the landscape returns, bottom-lit */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%] opacity-60">
        <MeshField className="h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-transparent to-ink/80" />
      </div>

      <div className="relative mx-auto max-w-[1240px] px-6 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr]">
          {/* left: headline + capture */}
          <div>
            <h2 className="display max-w-[13ch] text-[clamp(2.4rem,6vw,4.4rem)] text-paper">
              <Words text="Let's scope the next one" italic={["one"]} />
            </h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (name.trim() && contact.trim() && email.trim()) setSent(true);
              }}
              className="mt-9 flex max-w-md flex-col gap-3 rounded-3xl bg-ink-3/70 p-4 ring-1 ring-brand-soft/20 backdrop-blur-md"
            >
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                aria-label="Name"
                className="min-w-0 rounded-full bg-ink-2/60 px-4 py-2.5 text-sm text-paper outline-none ring-1 ring-brand-soft/10 placeholder:text-paper-2/35 focus:ring-brand-2/40"
              />
              <input
                type="text"
                required
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="Phone number"
                aria-label="Contact number"
                className="min-w-0 rounded-full bg-ink-2/60 px-4 py-2.5 text-sm text-paper outline-none ring-1 ring-brand-soft/10 placeholder:text-paper-2/35 focus:ring-brand-2/40"
              />
              <input
                type="text"
                value={need}
                onChange={(e) => setNeed(e.target.value)}
                placeholder="What do you want to build?"
                aria-label="What you want"
                className="min-w-0 rounded-full bg-ink-2/60 px-4 py-2.5 text-sm text-paper outline-none ring-1 ring-brand-soft/10 placeholder:text-paper-2/35 focus:ring-brand-2/40"
              />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your work email"
                aria-label="Work email"
                className="min-w-0 rounded-full bg-ink-2/60 px-4 py-2.5 text-sm text-paper outline-none ring-1 ring-brand-soft/10 placeholder:text-paper-2/35 focus:ring-brand-2/40"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 380, damping: 24 }}
                className="mt-1 shrink-0 rounded-full px-5 py-2.5 text-sm font-medium text-paper"
                style={{ background: "linear-gradient(100deg,#2356D6,#00E0FF)" }}
              >
                {sent ? "Received" : "Contact us"}
              </motion.button>
            </form>

            <motion.p
              animate={{ opacity: sent ? 1 : 0, y: sent ? 0 : -6 }}
              transition={{ duration: 0.5 }}
              className="mt-3 text-xs text-brand-2/80"
            >
              Thanks — we&apos;ll reply from {company.tech.emails[0]}.
            </motion.p>

            <p className="mt-9 max-w-[44ch] text-sm leading-relaxed text-paper-2/50">
              {company.tagline}.
            </p>
          </div>

          {/* right: directory */}
          <div className="grid gap-10 sm:grid-cols-3">
            <div>
              <p className="eyebrow text-paper-2/35">Technology</p>
              <ul className="mt-4 space-y-2.5 text-sm">
                <FooterLink href="https://ailinc.com">{company.tech.site}</FooterLink>
                {company.tech.emails.map((e) => (
                  <FooterLink key={e} href={`mailto:${e}`}>
                    {e}
                  </FooterLink>
                ))}
              </ul>
            </div>

            <div>
              <p className="eyebrow text-paper-2/35">Explore</p>
              <ul className="mt-4 space-y-2.5 text-sm">
                {nav.map((n) => (
                  <FooterLink key={n.href} href={n.href}>
                    {n.label}
                  </FooterLink>
                ))}
              </ul>

              <p className="mt-8 eyebrow text-paper-2/35">Connect</p>
              <ul className="mt-4 space-y-2.5 text-sm">
                <FooterLink href={`tel:${company.phone.replace(/\s/g, "")}`}>
                  {company.phone}
                </FooterLink>
                <FooterLink href="https://www.linkedin.com/company/ai-linc">
                  LinkedIn ↗
                </FooterLink>
              </ul>
            </div>

            <div>
              <p className="eyebrow text-paper-2/35">Office</p>
              <p className="mt-4 text-sm leading-relaxed text-paper-2/55">
                {company.address}
              </p>
              <a
                href="https://maps.google.com/?q=AI+Linc+Financial+District+Hyderabad"
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-block text-sm text-brand-2 transition-opacity hover:opacity-70"
              >
                View on map ↗
              </a>

              <p className="mt-8 eyebrow text-paper-2/35">Delivery</p>
              <p className="mt-4 text-sm leading-relaxed text-paper-2/55">
                {countries.join(" · ")}
              </p>
            </div>
          </div>
        </div>

        {/* legal bar */}
        <div className="mt-20 flex flex-col gap-6 border-t border-brand-soft/10 py-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/logos/ai-linc-mark-white.svg"
              alt=""
              width={56}
              height={34}
              className="w-12 opacity-80"
            />
            <span className="display text-2xl tracking-tight text-paper/85">
              AI <span className="text-grad">LINC</span>
            </span>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-xs text-paper-2/35">
            <span>{company.name}</span>
            <span>© {new Date().getFullYear()}</span>
          </div>
        </div>
      </div>

      {/* oversized wordmark bleeding off the base, as in the reference */}
      <div className="pointer-events-none relative select-none">
        <p
          className="display translate-y-[18%] text-center text-[clamp(4rem,19vw,17rem)] leading-none text-transparent"
          style={{
            WebkitTextStroke: "1px rgba(109,148,255,0.16)",
          }}
        >
          AI LINC
        </p>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const cls =
    "group inline-flex text-paper-2/55 transition-colors duration-300 hover:text-paper";
  const inner = (
    <span className="relative">
      {children}
      <span
        className="absolute -bottom-0.5 left-0 h-px w-0 transition-all duration-500 group-hover:w-full"
        style={{ background: "linear-gradient(100deg,#2356D6,#00E0FF)" }}
      />
    </span>
  );
  // Internal routes get client-side navigation; hashes, mailto and tel
  // stay plain anchors.
  const isRoute = href.startsWith("/") && !href.includes("#");

  return (
    <li>
      {isRoute ? (
        <Link href={href} className={cls}>
          {inner}
        </Link>
      ) : (
        <a href={href} className={cls}>
          {inner}
        </a>
      )}
    </li>
  );
}
