"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

/**
 * Fixed brand lockup — pinned to the top-left of the viewport on every
 * page and every scroll position, above all section content.
 *
 * The page alternates dark (bg-ink) and light (bg-paper) sections, so
 * a single fixed logo color would go invisible against half of them.
 * Each section carries a `data-brand-theme="dark" | "light"` marker;
 * on scroll we read whichever section currently sits under the logo
 * and pick the matching lockup.
 *
 * The sample point is offset below-right of the logo itself (the
 * logo tops out around y=78/x=168 at its largest breakpoint) so the
 * hit test lands on the section behind it instead of on the logo's
 * own link/image.
 */
const SAMPLE_X = 100;
const SAMPLE_Y = 90;

export default function BrandMark() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const update = () => {
      const el = document.elementFromPoint(SAMPLE_X, SAMPLE_Y);
      const section = el?.closest("[data-brand-theme]");
      const value = section?.getAttribute("data-brand-theme");
      setTheme(value === "light" ? "light" : "dark");
    };

    update();

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        update();
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const isDark = theme === "dark";

  return (
    <Link
      href="/"
      aria-label="AI LINC"
      className="fixed left-4 top-4 z-80 sm:left-6 sm:top-6"
    >
      <Image
        src={
          isDark
            ? "/logos/ai-linc-lockup-darkmode.svg"
            : "/logos/ai-linc-lockup-ink.svg"
        }
        alt="AI LINC"
        width={1600}
        height={600}
        priority
        className="w-28 sm:w-36"
      />
    </Link>
  );
}
