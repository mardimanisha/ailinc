import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Team from "@/components/Team";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Team — AI LINC",
  description:
    "Founders with enterprise engineering backgrounds, one delivery team across both verticals, and a marketplace of practitioner trainers.",
  alternates: { canonical: "/team" },
};

export default function TeamPage() {
  return (
    <main className="relative">
      <Nav />
      <Team />
      <Footer />
    </main>
  );
}
