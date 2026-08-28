import Nav from "@/components/Nav";
import BrandMark from "@/components/BrandMark";
import Hero from "@/components/Hero";
import Company from "@/components/Company";
import ClientLogos from "@/components/ClientLogos";
import Carousel from "@/components/Carousel";
import Portfolio from "@/components/Portfolio";
import Engagements from "@/components/Engagements";
import Newsroom from "@/components/Newsroom";
import Footer from "@/components/Footer";
import { capabilities } from "@/lib/content";

export default function Page() {
  return (
    <main className="relative">
      <Nav />
      <BrandMark />
      <Hero />

      <Company />

      <Carousel
        id="technology"
        tone="light"
        eyebrow="01 · Technology & Software Services"
        heading="Build it, run it, secure it"
        italic={["secure"]}
        lead="We build and secure production software for enterprise and public-sector clients — from full product builds to embedded engineering squads and independent security assessments."
        slides={capabilities.map((c) => ({
          step: c.step,
          tag: c.kicker,
          title: c.title,
          body: c.lead,
          image: c.image,
          bullets: c.items,
        }))}
      />

      <Portfolio />

      <Engagements />

      <ClientLogos />

      <Newsroom />

      <Footer />
    </main>
  );
}
