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
          style={{
            maskImage: "radial-gradient(ellipse 60% 62% at 50% 50%, #000 30%, transparent 85%)",
            WebkitMaskImage: "radial-gradient(ellipse 60% 62% at 50% 50%, #000 30%, transparent 85%)",
          }}
        />
      </Parallax>
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background: "radial-gradient(60% 60% at 50% 40%, rgba(184,138,75,0.18), transparent 70%), linear-gradient(180deg, #2b1535 0%, #1a0c22 40%, #1a0c22 100%)",
          opacity: 0.85,
        }}
      />

      <div className="mx-auto max-w-5xl px-4 py-20 text-center sm:px-8 md:py-36 lg:py-44">
        <Reveal>
          <h2
            id="cta-title"
            className="font-display text-[clamp(2.2rem,7.5vw,6.6rem)] leading-[1.02] font-medium text-ivory"
          >
            {closing.heading}
          </h2>
          <p className="mt-6 font-display text-[clamp(1.4rem,3.4vw,3rem)] text-champagne italic">{closing.quote}</p>
        </Reveal>

        <Reveal delay={0.1} className="mx-auto mt-12 max-w-2xl">
          <p className="text-base text-ivory/85 sm:text-lg">{closing.lead}</p>
          <ul className="mt-5 space-y-2 text-lg sm:text-xl">
            {closing.roles.map((r) => (
              <li key={r.key}>
                <span className="text-ivory/80">{r.lead} </span>
                <strong className="font-display text-xl font-semibold text-champagne sm:text-2xl">{r.key}.</strong>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-ivory/80 sm:text-base">{closing.gathering}</p>
        </Reveal>

        <Reveal delay={0.2} className="mt-12">
          <MagneticButton href="#registration">Register now</MagneticButton>
        </Reveal>
      </div>
    </section>
  );
}
