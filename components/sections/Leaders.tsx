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

const NetworkScene = dynamic(() => import("@/components/3d/NetworkScene"), { ssr: false, loading: () => <ScenePoster className="absolute inset-0" /> });

const ICONS: Record<string, LucideIcon> = { "c-suite": Briefcase, manufacturing: Factory, innovation: FlaskConical, strategic: Network, ecosystem: Handshake };

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
      <div className="mx-auto max-w-[1500px] px-5 pt-24 sm:px-8 md:pt-32 lg:px-12">
        <Reveal className="max-w-3xl">
          <h2 id="leaders-title" className="font-display text-[clamp(2.6rem,6.5vw,5.5rem)] leading-[0.98] font-medium">
            {audienceIntro.heading}
          </h2>
          <p className="mt-6 font-display text-[clamp(1.6rem,2.6vw,2.3rem)] text-champagne">{audienceIntro.sub}</p>
          <p className="mt-4 text-lg text-ivory/80">{audienceIntro.lead}</p>
        </Reveal>
      </div>

      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:grid lg:grid-cols-12 lg:gap-12 lg:px-12">
        <div className="sticky top-[4.25rem] z-10 -mx-5 mt-6 h-[34svh] bg-aubergine sm:-mx-8 lg:top-0 lg:col-span-6 lg:mx-0 lg:mt-0 lg:h-svh lg:self-start lg:bg-transparent">
          <div aria-hidden className="absolute inset-0">
            {quality === "none" ? <ScenePoster className="absolute inset-0" /> : <NetworkScene active={active} quality={quality} animate={!reduced} />}
          </div>
          <p aria-live="polite" className="pointer-events-none absolute inset-x-0 bottom-3 text-center text-sm tracking-[0.18em] text-champagne uppercase lg:bottom-12">
            {audience[active].title}
          </p>
        </div>

        <ol className="lg:col-span-6 lg:py-[18svh]">
          {audience.map((group, i) => {
            const Icon = ICONS[group.id];
            const isActive = i === active;
            return (
              <li
                key={group.id}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                data-index={i}
                className={cn("flex min-h-[62svh] flex-col justify-center border-t border-champagne/20 py-14 transition-opacity duration-700 lg:min-h-[78svh]", isActive ? "opacity-100" : "opacity-45")}
              >
                <div className="flex items-center gap-5">
                  <span className="font-display text-5xl text-gold tabular">{group.index}</span>
                  <Icon aria-hidden strokeWidth={1.2} className="h-9 w-9 text-champagne" />
                </div>
                <h3 className="mt-6 font-display text-[clamp(2.2rem,4vw,3.6rem)] leading-[1.02]">{group.title}</h3>
                <ul className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                  {group.members.map((m) => (
                    <li key={m} className="flex items-start gap-3 text-[1.02rem] text-ivory/90">
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

      <div className="border-t border-champagne/20">
        <div className="mx-auto max-w-[1500px] px-5 py-14 text-center sm:px-8 lg:px-12">
          <p className="font-display text-3xl text-ivory">Be Part of What’s Next</p>
          <ul className="mt-8 flex flex-wrap justify-center gap-x-10 gap-y-4 text-sm tracking-[0.22em] text-champagne uppercase">
            {audienceIntro.closing.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
