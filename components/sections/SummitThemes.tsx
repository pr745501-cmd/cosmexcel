"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Compass, Factory, FlaskConical, Globe, Leaf, Rocket, ShieldCheck, Waypoints, type LucideIcon } from "lucide-react";
import { themes } from "@/data/themes";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const ICONS: Record<string, LucideIcon> = {
  market: Globe,
  innovation: FlaskConical,
  entrepreneurship: Rocket,
  sustainability: Leaf,
  manufacturing: Factory,
  regulatory: ShieldCheck,
  growth: Waypoints,
  leadership: Compass,
};

export function SummitThemes() {
  const [active, setActive] = useState(0);
  const current = themes[active];
  const ActiveIcon = ICONS[current.id];

  return (
    <section id="experience" aria-labelledby="themes-title" className="relative bg-cream">
      <div className="mx-auto max-w-[1500px] px-4 py-20 sm:px-8 md:py-28 lg:px-12">
        <Reveal>
          <SectionHeading
            id="themes-title"
            title={<>What you&apos;ll <em className="font-medium text-gold-deep">gain</em> at this summit</>}
            lead="At this summit, participants will gain insights into:"
          />
        </Reveal>

        <div className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-12 lg:gap-16">
          {/* Theme list — interactive on desktop, tap-to-expand on mobile */}
          <ul className="lg:col-span-6">
            {themes.map((theme, i) => {
              const Icon = ICONS[theme.id];
              const isActive = i === active;
              return (
                <li key={theme.id} className="border-b border-gold/30 first:border-t">
                  {/* Mobile: tappable button that expands an inline detail panel */}
                  <button
                    type="button"
                    aria-expanded={isActive}
                    onClick={() => setActive(isActive ? active : i)}
                    onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
                    onFocus={() => setActive(i)}
                    className="group relative flex min-h-[4.5rem] w-full items-center gap-4 py-4 text-left sm:gap-5 sm:py-5"
                  >
                    <span className={cn("font-display text-2xl tabular transition-colors duration-500 sm:text-3xl", isActive ? "text-gold-deep" : "text-gold/70")}>
                      {theme.index}
                    </span>
                    <span className={cn("flex-1 text-[0.95rem] font-medium transition-[color,transform] duration-500 ease-[var(--ease-lux)] sm:text-[1.05rem]", isActive ? "translate-x-1 text-aubergine" : "text-ink/80 group-hover:text-aubergine")}>
                      {theme.title}
                    </span>
                    <Icon aria-hidden strokeWidth={1.4} className={cn("h-6 w-6 shrink-0 transition-colors duration-500 sm:h-7 sm:w-7", isActive ? "text-gold-deep" : "text-gold/60")} />
                    <span aria-hidden className={cn("absolute bottom-[-1px] left-0 h-px bg-gold-deep transition-[width] duration-700 ease-[var(--ease-lux)]", isActive ? "w-full" : "w-0")} />
                  </button>

                  {/* Inline mobile detail card — only shown on non-lg screens */}
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        key={`mobile-detail-${theme.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden lg:hidden"
                      >
                        <div className="on-dark mb-4 bg-aubergine p-6 text-ivory relative overflow-hidden">
                          <div
                            aria-hidden
                            className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full"
                            style={{ background: "radial-gradient(circle, rgba(184,138,75,0.28), transparent 68%)" }}
                          />
                          <div className="relative flex items-center justify-between">
                            <span className="font-display text-[4rem] leading-none text-champagne/90 tabular">{theme.index}</span>
                            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-dashed border-gold/60">
                              <ActiveIcon aria-hidden strokeWidth={1.1} className="h-7 w-7 text-champagne" />
                            </span>
                          </div>
                          <h3 className="relative mt-4 font-display text-[1.8rem] leading-[1.05] text-ivory">{theme.title}</h3>
                          <div className="relative mt-5 h-px w-full bg-gradient-to-r from-gold to-transparent" />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>

          {/* Desktop stage — hidden on mobile, shown on lg+ */}
          <div className="hidden lg:col-span-6 lg:block">
            <div className="on-dark sticky top-28 overflow-hidden bg-aubergine p-12 text-ivory shadow-[var(--shadow-soft)]">
              <motion.div
                aria-hidden
                key={current.id + "-glow"}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full"
                style={{ background: "radial-gradient(circle, rgba(184,138,75,0.28), transparent 68%)" }}
              />
              <div className="relative flex items-start justify-between">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={current.index}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="font-display text-[8rem] leading-none text-champagne/90 tabular"
                  >
                    {current.index}
                  </motion.span>
                </AnimatePresence>
                <span className="relative mt-3 flex h-24 w-24 items-center justify-center">
                  <motion.span
                    aria-hidden
                    className="absolute inset-0 rounded-full border border-dashed border-gold/60"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 40, ease: "linear", repeat: Infinity }}
                  />
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={current.id}
                      initial={{ opacity: 0, scale: 0.6, rotate: -30 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <ActiveIcon aria-hidden strokeWidth={1.1} className="h-11 w-11 text-champagne" />
                    </motion.span>
                  </AnimatePresence>
                </span>
              </div>
              <AnimatePresence mode="wait">
                <motion.h3
                  key={current.id}
                  aria-live="polite"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="relative mt-6 font-display text-[2.6rem] leading-[1.05]"
                >
                  {current.title}
                </motion.h3>
              </AnimatePresence>
              <div className="relative mt-8 h-px w-full bg-gradient-to-r from-gold to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
