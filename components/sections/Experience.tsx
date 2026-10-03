import { Globe, Lightbulb, Leaf, Star, type LucideIcon } from "lucide-react";
import { event, pillars } from "@/data/event";
import { Reveal } from "@/components/ui/Reveal";

const ICONS: LucideIcon[] = [Globe, Lightbulb, Leaf, Star];

export function Experience() {
  return (
    <section aria-labelledby="positioning-title" className="on-dark relative overflow-hidden bg-night text-ivory">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: "radial-gradient(50% 70% at 85% 20%, rgba(184,138,75,0.16), transparent 70%), radial-gradient(45% 60% at 10% 90%, rgba(74,33,66,0.7), transparent 70%)" }}
      />
      <div className="relative mx-auto max-w-[1500px] px-4 py-20 sm:px-8 md:py-28 lg:px-12">
        <Reveal className="mx-auto max-w-4xl text-center">
          <h2 id="positioning-title" className="font-display text-[clamp(1rem,1.6vw,1.4rem)] tracking-[0.3em] text-gold uppercase">
            {event.fullName}
          </h2>
          <p className="mt-5 font-display text-[clamp(2.6rem,9vw,8rem)] leading-[0.95] font-medium text-champagne italic">{event.tagline}</p>
          <p className="mx-auto mt-8 max-w-3xl font-display text-[clamp(1.2rem,2.6vw,2.3rem)] leading-[1.35] text-ivory/95">{event.positioning}</p>
        </Reveal>

        {/* 4 pillars: 1-col on mobile, 2-col on sm, 4-col on lg */}
        <ul className="mx-auto mt-16 grid max-w-6xl border-y border-champagne/25 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => {
            const Icon = ICONS[i];
            return (
              <Reveal
                as="li"
                key={p.word}
                delay={i * 0.1}
                className="flex flex-col items-center gap-4 border-champagne/25 px-6 py-10 text-center border-b sm:last:border-b-0 sm:[&:nth-child(odd)]:border-r lg:border-b-0 lg:not-last:border-r lg:[&:nth-child(odd)]:border-r"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/70 sm:h-16 sm:w-16">
                  <Icon aria-hidden strokeWidth={1.2} className="h-6 w-6 text-champagne sm:h-7 sm:w-7" />
                </span>
                <p className="font-display text-2xl tracking-[0.14em] text-ivory uppercase sm:text-3xl">{p.word}</p>
                <p className="text-sm text-ivory/70">{p.line}</p>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
