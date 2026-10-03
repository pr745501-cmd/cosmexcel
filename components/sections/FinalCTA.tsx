import Image from "next/image";
import { closing } from "@/data/event";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Parallax } from "@/components/ui/Parallax";
import { Reveal } from "@/components/ui/Reveal";

export function FinalCTA() {
  return (
    <section aria-labelledby="cta-title" className="on-dark relative isolate overflow-hidden bg-night text-ivory">
      <Parallax amount={14} className="absolute inset-0 -z-10">
        <Image
          src="/images/leaders.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center opacity-35"
          style={{ maskImage: "radial-gradient(ellipse 60% 62% at 50% 50%, #000 30%, transparent 85%)", WebkitMaskImage: "radial-gradient(ellipse 60% 62% at 50% 50%, #000 30%, transparent 85%)" }}
        />
      </Parallax>
      <div aria-hidden className="absolute inset-0 -z-10" style={{ background: "radial-gradient(60% 60% at 50% 40%, rgba(184,138,75,0.18), transparent 70%), linear-gradient(180deg, #2b1535 0%, #1a0c22 40%, #1a0c22 100%)", opacity: 0.85 }} />
      <div className="mx-auto max-w-5xl px-5 py-28 text-center sm:px-8 md:py-44">
        <Reveal>
          <h2 id="cta-title" className="font-display text-[clamp(2.8rem,7.5vw,6.6rem)] leading-[1] font-medium text-ivory">
            {closing.heading}
          </h2>
          <p className="mt-8 font-display text-[clamp(1.7rem,3.4vw,3rem)] text-champagne italic">{closing.quote}</p>
        </Reveal>
        <Reveal delay={0.1} className="mx-auto mt-14 max-w-2xl">
          <p className="text-lg text-ivory/85">{closing.lead}</p>
          <ul className="mt-6 space-y-2 text-xl">
            {closing.roles.map((r) => (
              <li key={r.key}>
                <span className="text-ivory/80">{r.lead} </span>
                <strong className="font-display text-2xl font-semibold text-champagne">{r.key}.</strong>
              </li>
            ))}
          </ul>
          <p className="mt-10 text-ivory/80">{closing.gathering}</p>
        </Reveal>
        <Reveal delay={0.2} className="mt-14">
          <MagneticButton href="#registration">Register now</MagneticButton>
        </Reveal>
      </div>
    </section>
  );
}
