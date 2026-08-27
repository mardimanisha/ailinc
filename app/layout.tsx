import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
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
  title: "AI LINC — One company. Two verticals.",
  description:
    "AILinc Technologies Pvt Ltd builds AI-native software for enterprises and AI-native learning infrastructure for institutions — engineered by the same team, delivered across six countries.",
  metadataBase: new URL("https://ailinc.com"),
  icons: { icon: "/logos/ai-linc-mark-color.svg" },
  openGraph: {
    title: "AI LINC — One company. Two verticals.",
    description:
      "AI-native software for enterprises and AI-native learning infrastructure for institutions.",
    images: ["/logos/ai-linc-lockup-color.png"],
  },
};

export const viewport: Viewport = {
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
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
