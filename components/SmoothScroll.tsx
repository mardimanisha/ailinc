"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * The reference UI glides rather than jumps — every scroll-linked
 * animation below is tuned against this easing.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    // Hash links glide, but only when the target is on the page we are
    // already on. A "/#company" click from /team must fall through to a
    // real navigation instead.
    const onAnchor = (e: MouseEvent) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      const anchor = (e.target as HTMLElement)?.closest?.(
        "a[href]"
      ) as HTMLAnchorElement | null;
      if (!anchor || anchor.target === "_blank") return;

      const raw = anchor.getAttribute("href");
      if (!raw || !raw.includes("#")) return;

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname !== window.location.pathname) return;
      if (!url.hash || url.hash === "#") return;

      const el = document.querySelector(url.hash);
      if (!el) return;

      e.preventDefault();
      history.replaceState(null, "", url.hash);
      lenis.scrollTo(el as HTMLElement, { offset: -40 });
    };

    document.addEventListener("click", onAnchor);

    return () => {
      document.removeEventListener("click", onAnchor);
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
}
