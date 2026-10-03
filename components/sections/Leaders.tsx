"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Briefcase, Factory, FlaskConical, Handshake, Network, type LucideIcon } from "lucide-react";
import { audience, audienceIntro } from "@/data/audience";
import { ScenePoster } from "@/components/3d/SceneLoader";
import { useSceneQuality } from "@/hooks/useSceneQuality";
import { useReducedMotion } from "@/hooks/useMediaQuery";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const NetworkScene = dynamic(() => import("@/components/3d/NetworkScene"), {
  ssr: false,
  loading: () => <ScenePoster className="absolute inset-0" />,
});

const ICONS: Record<string, LucideIcon> = {
  "c-suite": Briefcase,
  manufacturing: Factory,
  innovation: FlaskConical,
  strategic: Network,
  ecosystem: Handshake,
};

export function Leaders() {
  const [active, setActive] = useState(0);
  const quality = useSceneQuality();
  const reduced = useReducedMotion();
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        }),
      { rootMargin: "-48% 0px -48% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="leaders" aria-labelledby="leaders-title" className="on-dark relative bg-aubergine text-ivory">
      {/* Intro */}
      <div className="mx-auto max-w-[1500px] px-4 pt-20 sm:px-8 md:pt-28 lg:px-12">
        <Reveal className="max-w-3xl">
          <h2 id="leaders-title" className="font-display text-[clamp(2.2rem,6.5vw,5.5rem)] leading-[0.98] font-medium">
            {audienceIntro.heading}
          </h2>
          <p className="mt-5 font-display text-[clamp(1.3rem,2.6vw,2.3rem)] text-champagne">{audienceIntro.sub}</p>
          <p className="mt-3 text-base text-ivory/80 sm:text-lg">{audienceIntro.lead}</p>
        </Reveal>
      </div>

      {/* Scroll-driven content */}
      <div className="mx-auto max-w-[1500px] px-4 sm:px-8 lg:grid lg:grid-cols-12 lg:gap-12 lg:px-12">
        {/* Sticky 3D panel */}
        <div className="sticky top-[4.25rem] z-10 -mx-4 mt-6 h-[28svh] bg-aubergine sm:-mx-8 sm:h-[32svh] lg:top-0 lg:col-span-6 lg:mx-0 lg:mt-0 lg:h-svh lg:self-start lg:bg-transparent">
          <div aria-hidden className="absolute inset-0">
            {quality === "none" ? (
              <ScenePoster className="absolute inset-0" />
            ) : (
              <NetworkScene active={active} quality={quality} animate={!reduced} />
            )}
          </div>
          <p
            aria-live="polite"
            className="pointer-events-none absolute inset-x-0 bottom-3 text-center text-xs tracking-[0.16em] text-champagne uppercase sm:text-sm sm:tracking-[0.18em] lg:bottom-12"
          >
            {audience[active].title}
          </p>
        </div>

        {/* Audience list */}
        <ol className="lg:col-span-6 lg:py-[18svh]">
          {audience.map((group, i) => {
            const Icon = ICONS[group.id];
            const isActive = i === active;
            return (
              <li
                key={group.id}
                ref={(el) => { refs.current[i] = el; }}
                data-index={i}
                className={cn(
                  "flex min-h-[55svh] flex-col justify-center border-t border-champagne/20 py-12 transition-opacity duration-700 sm:min-h-[60svh] lg:min-h-[78svh]",
                  isActive ? "opacity-100" : "opacity-45",
                )}
              >
                <div className="flex items-center gap-4">
                  <span className="font-display text-4xl text-gold tabular sm:text-5xl">{group.index}</span>
                  <Icon aria-hidden strokeWidth={1.2} className="h-8 w-8 text-champagne sm:h-9 sm:w-9" />
                </div>
                <h3 className="mt-5 font-display text-[clamp(1.8rem,4vw,3.6rem)] leading-[1.02]">{group.title}</h3>
                <ul className="mt-6 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                  {group.members.map((m) => (
                    <li key={m} className="flex items-start gap-3 text-[0.95rem] text-ivory/90 sm:text-[1.02rem]">
                      <span aria-hidden className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" />
                      {m}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Closing strip */}
      <div className="border-t border-champagne/20">
        <div className="mx-auto max-w-[1500px] px-4 py-12 text-center sm:px-8 lg:px-12">
          <p className="font-display text-2xl text-ivory sm:text-3xl">Be Part of What&apos;s Next</p>
          <ul className="mt-6 flex flex-wrap justify-center gap-x-8 gap-y-3 text-xs tracking-[0.2em] text-champagne uppercase sm:text-sm sm:tracking-[0.22em]">
            {audienceIntro.closing.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
