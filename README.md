# AI LINC — corporate website

One-page corporate site for AILinc Technologies Pvt Ltd, built from
`AI_LINC_Company_Profile.pdf` with the interaction language of
`Reference UI.mp4`.

```bash
npm install
npm run dev
```

## Stack

- **Next.js 15** (App Router, TypeScript, fully static)
- **Tailwind CSS v4** — design tokens live in `app/globals.css` under `@theme`
- **Motion** (`motion/react`) for scroll-linked and entrance animation
- **Lenis** for the smooth-scroll feel the reference animations are tuned against
- Fonts are **self-hosted** in `public/fonts` (Instrument Serif + Inter), so
  there is no Google Fonts fetch at build or request time

## Branding

Extracted from `public/logos/ai-linc-lockup-color.svg`:

| Token | Value | Role |
| --- | --- | --- |
| `--color-brand` | `#2356D6` | logo gradient start |
| `--color-brand-2` | `#00E0FF` | logo gradient end |
| `--color-brand-deep` | `#0A1228` | wordmark ink |
| `--color-ink` | `#080B14` | page black (deliberately not pure black) |
| `--color-paper` | `#F2F4FA` | page white (deliberately not pure white) |

The reference UI's olive/green accent maps to the `#2356D6 → #00E0FF`
gradient everywhere it appeared: heading emphasis, pill dots, card
borders, buttons, the carousel tags and the LMS white-label banner.

## Animations carried over from the reference

| Reference beat | Implementation |
| --- | --- |
| Sticky cinematic hero that the next section scrolls over | `components/Hero.tsx` — sticky wrapper, scroll-linked parallax/scale/fade |
| Point-mesh landscape with a lit trail | `components/MeshField.tsx` — procedural canvas, drawn in the brand gradient |
| Masked word-by-word heading reveals | `Words` in `components/ui.tsx` |
| Card stack sliding in from the right on a stagger | `SlideCard` in `components/Company.tsx` |
| Stat row counting up on entry | `Counter` in `components/ui.tsx` |
| `01/04` carousel with circular controls and a scaling lead card | `components/Carousel.tsx` |
| Accordion cards that lift and invert on hover | `components/Engagements.tsx` |
| Scroll-linked beam down the stacked layers | `components/Platform.tsx` |
| Rounded window framing the whole page | `.site-frame` in `app/globals.css` |

`prefers-reduced-motion` disables the marquees, the mesh animation and
the smooth scroll.

## Content

All copy is transcribed from the company profile PDF and centralised in
`lib/content.ts` — edit that one file to update the page.

## Notes

- `npm audit` reports two advisories against the `postcss` copy bundled
  inside Next itself. They concern build-time processing of
  attacker-controlled CSS, which does not apply here (all CSS is authored
  in-repo), and the only available fix is a major upgrade to Next 16.
- `components/Footer.tsx` has a contact form that currently just
  acknowledges the submission on the client — wire it to your endpoint
  or CRM before launch.
- `public/video/` holds the brand film and a b-roll loop. Neither is
  used yet; the hero renders its landscape procedurally instead, since
  the brand film carries burnt-in titles.
