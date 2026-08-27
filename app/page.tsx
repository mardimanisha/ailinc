import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Company from "@/components/Company";
import Carousel from "@/components/Carousel";
import Engagements from "@/components/Engagements";
import Newsroom from "@/components/Newsroom";
import Partners from "@/components/Partners";
import Footer from "@/components/Footer";
import { capabilities, supply } from "@/lib/content";

export default function Page() {
  return (
    <main className="relative">
      <Nav />
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

      <Engagements />

      <Carousel
        id="education"
        tone="light"
        eyebrow="02 · Education & Institutional Learning"
        heading="People, content, platform"
        italic={["platform"]}
        lead="We supply the people, content and platform that institutions use to run their own programmes. We do not enrol students directly — every engagement is with a government body, university, college, EdTech platform or corporate L&D team."
        slides={supply.map((s) => ({
          step: s.step,
          tag: s.tag,
          title: s.title,
          body: s.body,
          image: s.image,
        }))}
      />

      <Newsroom />

      <Partners />
      <Footer />
    </main>
  );
}
