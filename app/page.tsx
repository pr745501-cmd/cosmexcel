import { Navbar } from "@/components/navigation/Navbar";
import { Hero } from "@/components/sections/Hero";
import { WhySummit } from "@/components/sections/WhySummit";
import { SummitThemes } from "@/components/sections/SummitThemes";
import { Experience } from "@/components/sections/Experience";
import { Leaders } from "@/components/sections/Leaders";
import { Agenda } from "@/components/sections/Agenda";
import { TrustedBy } from "@/components/sections/TrustedBy";
import { Venue } from "@/components/sections/Venue";
import { Registration } from "@/components/sections/Registration";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <WhySummit />
        <SummitThemes />
        <Experience />
        <Leaders />
        <Agenda />
        <TrustedBy />
        <Venue />
        <Registration />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
