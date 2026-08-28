import type { Metadata } from "next";
import Nav from "@/components/Nav";
import BrandMark from "@/components/BrandMark";
import Team from "@/components/Team";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Team — AI LINC",
  description:
    "Founders with enterprise engineering backgrounds, leading the delivery team behind our product engineering, platform reliability and security work.",
  alternates: { canonical: "/team" },
};

export default function TeamPage() {
  return (
    <main className="relative">
      <Nav />
      <BrandMark />
      <Team />
      <Footer />
    </main>
  );
}
