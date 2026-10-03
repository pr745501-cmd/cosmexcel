"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { CalendarDays, MapPin } from "lucide-react";
import { Countdown } from "@/components/ui/Countdown";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ScenePoster } from "@/components/3d/SceneLoader";
import { useSceneQuality } from "@/hooks/useSceneQuality";
import { useReducedMotion } from "@/hooks/useMediaQuery";
import { registerGsap } from "@/lib/gsap";
import { sceneState } from "@/lib/scroll";
import { event } from "@/data/event";

const HeroScene = dynamic(() => import("@/components/3d/HeroScene"), {
  ssr: false,
  loading: () => <ScenePoster className="absolute inset-0" />,
});

const WORD = "COSMEXCEL".split("");

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const quality = useSceneQuality();
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const { gsap, ScrollTrigger } = registerGsap();
    const motionOk = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        sceneState.scroll = motionOk ? self.progress : 0;
      },
    });

    const onMove = (e: PointerEvent) => {
      sceneState.pointerX = (e.clientX / window.innerWidth - 0.5) * 2;
      sceneState.pointerY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const ctx = gsap.context(() => {
      if (!motionOk) return;
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.to("[data-hero-scene]", { opacity: 1, duration: 1.8, ease: "power2.out" }, 0)
        .to("[data-letter]", { y: 0, yPercent: 0, duration: 1.5, stagger: 0.055 }, 0.15)
        .to("[data-hero-in]", { opacity: 1, y: 0, duration: 1.1, stagger: 0.12 }, 0.95);
      gsap.to("[data-hero-title]", {
        yPercent: -14,
        opacity: 0.25,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
      });
    }, el);

    return () => {
      ctx.revert();
      st.kill();
      window.removeEventListener("pointermove", onMove);
      sceneState.scroll = 0;
      sceneState.pointerX = 0;
      sceneState.pointerY = 0;
    };
  }, []);

  return (
    <section
      id="top"
      ref={root}
      aria-labelledby="hero-title"
      className="on-dark relative isolate min-h-[100svh] overflow-hidden bg-night text-ivory"
    >
      {/* ── Layer 0: Atmosphere background ─────────────────── */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(58% 48% at 50% 58%, rgba(122,52,114,0.5), transparent 72%), " +
            "radial-gradient(38% 34% at 82% 8%, rgba(184,138,75,0.2), transparent 70%), " +
            "radial-gradient(40% 40% at 8% 90%, rgba(74,33,66,0.6), transparent 70%), " +
            "linear-gradient(180deg, #1a0c22 0%, #2b1535 58%, #1a0c22 100%)",
        }}
      />

      {/* ── Layer 1: Wordmark (sits behind 3D objects intentionally) ── */}
      <div
        data-hero-title
        className="absolute inset-x-0 z-10 px-2 text-center"
        style={{ top: "clamp(4.5rem, 14svh, 10rem)" }}
      >
        <h1
          id="hero-title"
          aria-label="Cosmexcel 2027"
          className="font-display leading-[0.86] font-medium tracking-[-0.02em] text-ivory"
          style={{ fontSize: "clamp(2.6rem, 13vw, 17.5rem)" }}
        >
          {WORD.map((ch, i) => (
            <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.08em] align-bottom">
              <span data-letter className="inline-block">
                {ch}
              </span>
            </span>
          ))}
        </h1>
      </div>

      {/* ── Layer 2: 3D scene ───────────────────────────────── */}
      <div
        data-hero-scene
        className="pointer-events-none absolute inset-0 z-20"
        style={{ opacity: reduced ? 1 : undefined }}
        aria-hidden
      >
        {quality === "none" ? (
          <ScenePoster className="absolute inset-0" />
        ) : (
          <HeroScene quality={quality} animate={!reduced} />
        )}
      </div>

      {/* ── Layer 3: Bottom veil — strong enough to cover 3D objects ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[25]"
        style={{
          height: "62%",
          background:
            "linear-gradient(to top, #1a0c22 0%, #1a0c22 18%, rgba(26,12,34,0.92) 36%, rgba(26,12,34,0.7) 52%, transparent 100%)",
        }}
      />

      {/* ── Layer 4: Content band ───────────────────────────── */}
      <div className="relative z-30 mx-auto flex min-h-[100svh] max-w-[1500px] flex-col justify-end px-4 pb-8 pt-24 sm:px-8 sm:pb-10 lg:px-12 lg:pb-14">
        {/* Single-column on mobile, 12-col grid on lg+ */}
        <div className="grid gap-y-6 lg:grid-cols-12 lg:items-end lg:gap-x-10">

          {/* ── Tagline ── */}
          <div data-hero-in className="lg:col-span-5">
            <p
              aria-hidden
              className="font-display leading-[0.85] text-champagne italic"
              style={{ fontSize: "clamp(2.8rem, 8vw, 7.5rem)" }}
            >
              2027
            </p>
            <p
              className="mt-3 font-display leading-[1.05] text-ivory italic"
              style={{ fontSize: "clamp(1.3rem, 3vw, 3.1rem)" }}
            >
              {event.tagline}
            </p>
            <p className="mt-2 text-[0.78rem] font-medium tracking-[0.22em] text-ivory/90 uppercase sm:text-[0.8rem]">
              {event.title}
            </p>
            {/* Summary shown on all sizes — hidden originally on <sm */}
            <p className="mt-3 max-w-md text-[0.85rem] leading-relaxed text-ivory/70 sm:text-[0.9rem]">
              {event.summary}
            </p>
          </div>

          {/* ── Date / Venue ── */}
          <ul data-hero-in className="space-y-2 text-ivory lg:col-span-3">
            <li className="flex items-start gap-3">
              <CalendarDays aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-gold sm:h-5 sm:w-5" strokeWidth={1.5} />
              <span className="text-sm font-medium leading-snug sm:text-base">{event.dateLabel}</span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-gold sm:h-5 sm:w-5" strokeWidth={1.5} />
              <span className="text-sm font-medium leading-snug sm:text-base">{event.venue}</span>
            </li>
          </ul>

          {/* ── Countdown + CTAs ── */}
          <div data-hero-in className="flex flex-col gap-4 lg:col-span-4 lg:items-end">
            <Countdown target={event.startsAt} />
            <div className="flex flex-wrap gap-3">
              <MagneticButton href="#registration">Register now</MagneticButton>
              <MagneticButton href="#agenda" variant="outline">
                View agenda
              </MagneticButton>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
