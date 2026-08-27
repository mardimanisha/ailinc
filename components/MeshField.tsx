"use client";

import { useEffect, useRef } from "react";

/**
 * The reference hero is a cinematic point-mesh landscape with a lit
 * trail running through it. This recreates it procedurally so it can
 * be rendered in the AI LINC gradient (#2356D6 -> #00E0FF) instead of
 * the reference's olive/green.
 */

const ROWS = 78;
const COLS = 132;

function ridge(x: number, z: number) {
  // Two mountain masses either side, a valley down the middle, plus a
  // smaller foreground shoulder so the frame reads as depth not a V.
  const left = Math.exp(-Math.pow((x + 0.58) / 0.3, 2)) * 1.25;
  const right = Math.exp(-Math.pow((x - 0.52) / 0.36, 2)) * 1.55;
  const outerL = Math.exp(-Math.pow((x + 1.05) / 0.34, 2)) * 0.85;
  const outerR = Math.exp(-Math.pow((x - 1.0) / 0.32, 2)) * 0.95;
  const far = Math.max(0, z - 0.18) * 1.35;
  return (left + right + outerL + outerR) * far;
}

export default function MeshField({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let dpr = 1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let raf = 0;
    let t = 0;

    const draw = () => {
      t += reduced ? 0 : 0.0042;
      ctx.clearRect(0, 0, w, h);

      const horizon = h * 0.3;
      const spread = w * 0.78;

      for (let r = 0; r < ROWS; r++) {
        // 0 = far (at the horizon), 1 = near (bottom of frame)
        const rz = r / (ROWS - 1);
        const persp = 0.06 + Math.pow(rz, 2.35) * 1.9;
        const rowY = horizon + persp * h * 0.62;
        if (rowY > h + 40) continue;

        const rowSpread = spread * (0.22 + persp * 1.15);
        const cols = Math.round(COLS * Math.min(1, 0.35 + persp * 1.3));

        for (let c = 0; c <= cols; c++) {
          const nx = (c / cols - 0.5) * 2; // -1 .. 1
          const x = w / 2 + nx * rowSpread * 0.5;
          if (x < -30 || x > w + 30) continue;

          // Layered waves + terrain mass.
          const wave =
            Math.sin(nx * 6.2 + rz * 9 - t * 3.1) * 0.06 +
            Math.sin(nx * 13.4 - rz * 5 + t * 2.2) * 0.028 +
            Math.sin(rz * 22 + t * 4) * 0.02;

          const elevation = (ridge(nx, rz) + wave) * h * 0.3;
          const y = rowY - elevation * persp;

          // The lit trail meandering down the valley.
          const trailX = Math.sin(rz * 5.1 + 0.6) * 0.16 + Math.sin(rz * 2.2) * 0.06;
          const onTrail = Math.exp(-Math.pow((nx - trailX) / 0.055, 2));

          const depth = Math.pow(rz, 0.75);
          const size = 0.5 + persp * 1.15;

          if (onTrail > 0.05) {
            const pulse = 0.55 + 0.45 * Math.sin(rz * 26 - t * 9);
            const a = onTrail * (0.45 + 0.55 * pulse) * (0.45 + depth * 0.55);
            ctx.fillStyle = `rgba(${Math.round(160 + 95 * pulse)}, 240, 255, ${a})`;
            ctx.fillRect(x - size, y - size, size * 2.8, size * 2.8);
          } else {
            // #2356D6 far  ->  #00E0FF near, brightening with elevation
            const lift = Math.min(1, elevation / (h * 0.2));
            const mix = Math.min(1, depth * 0.55 + lift * 0.75);
            const rr = Math.round(35 + (0 - 35) * mix);
            const gg = Math.round(86 + (224 - 86) * mix);
            const bb = Math.round(214 + (255 - 214) * mix);
            const a = (0.3 + depth * 0.55) * (0.3 + lift * 0.7);
            ctx.fillStyle = `rgba(${rr}, ${gg}, ${bb}, ${a})`;
            ctx.fillRect(x, y, size, size);
          }
        }
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden />;
}
