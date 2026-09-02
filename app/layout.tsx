import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

// Self-hosted so the site never depends on a Google Fonts fetch at
// build or request time.
const instrument = localFont({
  src: [
    { path: "../public/fonts/InstrumentSerif-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/InstrumentSerif-Italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-instrument",
  display: "swap",
  fallback: ["Times New Roman", "serif"],
});

const inter = localFont({
  src: [{ path: "../public/fonts/Inter-Variable.woff2", weight: "100 900", style: "normal" }],
  variable: "--font-inter",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  title: "AI LINC — Engineering, secured end to end.",
  description:
    "AILinc Technologies Pvt Ltd builds and secures AI-native software for enterprise and public-sector clients, delivered across six countries.",
  metadataBase: new URL("https://ailinc.com"),
  icons: { icon: "/logos/ai-linc-mark-color.svg" },
  openGraph: {
    title: "AI LINC — Engineering, secured end to end.",
    description:
      "AI-native software for enterprise and public-sector clients — product engineering, platform reliability and security & compliance.",
    images: ["/logos/ai-linc-lockup-color.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#080b14",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${instrument.variable} ${inter.variable}`}>
      <body>
        {/* Every section's entrance animation is gated behind
            IntersectionObserver, which only starts reporting once React
            hydrates. If the browser restores a mid-page scroll position on
            reload, everything below the fold sits at its hidden initial
            state for the whole hydration window, so refreshing anywhere
            but the top flashes an almost-blank page. Landing here always
            at the top sidesteps that entirely. */}
        <Script id="reset-scroll" strategy="beforeInteractive">
          {`try { history.scrollRestoration = "manual"; window.scrollTo(0, 0); } catch (e) {}`}
        </Script>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
