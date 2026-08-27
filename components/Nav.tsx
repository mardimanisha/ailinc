"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { useState } from "react";
import clsx from "clsx";
import { nav } from "@/lib/content";

/**
 * Static header — no entrance animation and no scroll-triggered
 * background or blur. It looks the same at every scroll position.
 */
export default function Nav() {
  const [open, setOpen] = useState(false);

  const left = nav.slice(0, 2);
  const right = nav.slice(2);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-70 flex justify-center px-4 pt-5 sm:pt-7">
        <nav className="flex items-center gap-2 rounded-full bg-ink-2/70 px-2 py-2 ring-1 ring-brand-soft/15 backdrop-blur-xl sm:gap-6 sm:px-3">
          <ul className="hidden items-center gap-6 pl-4 md:flex">
            {left.map((item) => (
              <NavLink key={item.href} {...item} />
            ))}
          </ul>

          <Link href="/" className="relative grid h-11 w-16 place-items-center">
            <Image
              src="/logos/ai-linc-mark-color.svg"
              alt="AI LINC"
              width={64}
              height={38}
              priority
              className="w-14"
            />
          </Link>

          <ul className="hidden items-center gap-6 pr-4 md:flex">
            {right.map((item) => (
              <NavLink key={item.href} {...item} />
            ))}
            <li>
              <a
                href="#contact"
                className="rounded-full bg-paper px-4 py-1.5 text-sm font-medium text-brand-deep"
              >
                Contact
              </a>
            </li>
          </ul>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
            className="grid size-10 place-items-center rounded-full text-paper md:hidden"
          >
            <span className="relative block h-3 w-5">
              <span
                className={clsx(
                  "absolute inset-x-0 h-px bg-current",
                  open ? "top-1.5 rotate-45" : "top-0"
                )}
              />
              <span
                className={clsx(
                  "absolute inset-x-0 h-px bg-current",
                  open ? "top-1.5 -rotate-45" : "top-3"
                )}
              />
            </span>
          </button>
        </nav>
      </header>

      {/* mobile sheet */}
      <motion.div
        initial={false}
        animate={{ opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none" }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-60 bg-ink/95 backdrop-blur-xl md:hidden"
      >
        <ul className="flex h-full flex-col items-center justify-center gap-7">
          {[...nav, { label: "Contact", href: "#contact" }].map((item) => (
            <li key={item.href}>
              {item.href.includes("#") ? (
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="display text-4xl text-paper"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="display text-4xl text-paper"
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </motion.div>
    </>
  );
}

function NavLink({ label, href }: { label: string; href: string }) {
  const cls = "text-sm text-paper-2/75";
  // Hash links are handled by SmoothScroll, so they stay plain anchors.
  return (
    <li>
      {href.includes("#") ? (
        <a href={href} className={cls}>
          {label}
        </a>
      ) : (
        <Link href={href} className={cls}>
          {label}
        </Link>
      )}
    </li>
  );
}
