"use client";

import { useEffect, useRef, useState } from "react";
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
 * The hit-test point is derived from the logo's own rendered bounding
 * box (just past its right edge) rather than a hardcoded pixel — a
 * fixed guess previously landed inside the logo's own box at some
 * breakpoints, so elementFromPoint kept hitting the logo/link itself
 * instead of the section behind it, and theme detection silently
 * stuck on the "dark" default.
 */
export default function BrandMark() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const update = () => {
      // Sampling to the side of the logo isn't enough: Nav's fixed
      // <header> spans the full page width (inset-x-0) even though its
      // visible pill sits at the right, so any point within its height
      // still hits that invisible box instead of the section behind it.
      // Sampling below both the logo and the header avoids that.
      const rect = linkRef.current?.getBoundingClientRect();
      const sampleX = rect ? rect.left + rect.width / 2 : 100;
      const sampleY = rect ? rect.bottom + 20 : 130;
      const el = document.elementFromPoint(sampleX, sampleY);
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
      ref={linkRef}
      href="/"
      aria-label="AI LINC"
      className="fixed left-4 top-4 z-80 sm:left-6 sm:top-6"
    >
      <Image
        src={
          isDark
            ? "/logos/ai-linc-lockup-darkmode.svg"
            : "/logos/ai-linc-lockup-color.svg"
        }
        alt="AI LINC"
        width={1600}
        height={600}
        priority
        className="w-56 sm:w-72"
      />
    </Link>
  );
}
