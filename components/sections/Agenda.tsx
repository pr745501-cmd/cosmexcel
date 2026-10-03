"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Award, Coffee, Lightbulb, Mic2, Moon, Presentation, type LucideIcon } from "lucide-react";
import { agenda, type SessionKind } from "@/data/agenda";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { registerGsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const KIND_ICON: Record<SessionKind, LucideIcon> = {
  keynote: Mic2,
  session: Presentation,
  spotlight: Lightbulb,
  networking: Coffee,
  ceremony: Award,
  break: Moon,
};

export function Agenda() {
  const [dayIndex, setDayIndex] = useState(0);
  const day = agenda[dayIndex];
  const list = useRef<HTMLOListElement>(null);
  const progress = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!list.current || !progress.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const { gsap } = registerGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        progress.current,
        { scaleY: 0 },
        { scaleY: 1, ease: "none", scrollTrigger: { trigger: list.current, start: "top 65%", end: "bottom 65%", scrub: 0.4 } },
      );
    });
    return () => ctx.revert();
  }, [dayIndex]);

  return (
    <section id="agenda" aria-labelledby="agenda-title" className="relative bg-ivory">
      <div className="mx-auto max-w-[1500px] px-4 py-20 sm:px-8 md:py-28 lg:px-12">
        <Reveal>
          <SectionHeading id="agenda-title" title="Agenda" lead="Two days, from the future of beauty to the closing CEO/CXO panel." />
        </Reveal>

        {/* Day tabs */}
        <div role="tablist" aria-label="Summit days" className="mt-12 grid gap-px bg-gold/30 sm:grid-cols-2">
          {agenda.map((d, i) => {
            const selected = i === dayIndex;
            return (
              <button
                key={d.id}
                role="tab"
                id={`tab-${d.id}`}
                aria-selected={selected}
                aria-controls="agenda-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => setDayIndex(i)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                    const next = (i + (e.key === "ArrowRight" ? 1 : -1) + agenda.length) % agenda.length;
                    setDayIndex(next);
                    document.getElementById(`tab-${agenda[next].id}`)?.focus();
                  }
                }}
                className={cn(
                  "flex min-h-20 items-center justify-between gap-4 px-5 py-4 text-left transition-colors duration-500 sm:min-h-24 sm:px-8",
                  selected ? "on-dark bg-aubergine text-ivory" : "bg-ivory text-ink hover:bg-cream",
                )}
              >
                <span>
                  <span className={cn("block font-display text-3xl leading-none sm:text-5xl", selected ? "text-champagne" : "text-aubergine")}>{d.label}</span>
                  <span className={cn("mt-1.5 block text-xs sm:mt-2 sm:text-sm", selected ? "text-ivory/75" : "text-mist")}>{d.date}</span>
                </span>
                <span className={cn("font-display text-xl italic sm:text-3xl", selected ? "text-champagne" : "text-gold-deep")}>{d.theme}</span>
              </button>
            );
          })}
        </div>

        {/* Agenda panel */}
        <div id="agenda-panel" role="tabpanel" aria-labelledby={`tab-${day.id}`} className="mt-10 lg:mt-14">
          <AnimatePresence mode="wait">
            <motion.div
              key={day.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Day path breadcrumb */}
              <p className="flex flex-wrap items-center gap-x-2 gap-y-2 font-display text-lg text-gold-deep italic sm:text-xl md:text-2xl">
                {day.path.map((step, i) => (
                  <span key={step} className="flex items-center gap-2">
                    {step}
                    {i < day.path.length - 1 && (
                      <span aria-hidden className="text-gold">→</span>
                    )}
                  </span>
                ))}
              </p>

              {/* Desktop header row */}
              <div
                aria-hidden
                className="mt-8 hidden grid-cols-[8rem_1.5rem_minmax(0,5fr)_minmax(0,6fr)] gap-x-5 border-b border-gold/40 pb-3 text-sm font-medium text-mist xl:grid"
              >
                <span>Time</span>
                <span />
                <span>Session</span>
                <span>Title</span>
              </div>

              {/* Session rows */}
              <ol ref={list} className="relative mt-5 xl:mt-0">
                {/* Timeline rail */}
                <span aria-hidden className="absolute top-2 bottom-2 left-[0.45rem] w-px bg-gold/25 md:left-[8.45rem] xl:left-[8.45rem]">
                  <span ref={progress} className="absolute inset-0 origin-top bg-gold" />
                </span>

                {day.items.map((item, i) => {
                  const Icon = KIND_ICON[item.kind];
                  const light = item.kind === "networking" || item.kind === "break" || item.kind === "spotlight";
                  const feature = item.kind === "ceremony";
                  return (
                    <li
                      key={`${day.id}-${i}`}
                      className={cn(
                        "group relative grid grid-cols-[1.5rem_minmax(0,1fr)] gap-x-4 py-4 transition-colors duration-500",
                        "md:grid-cols-[8rem_1.5rem_minmax(0,1fr)] md:gap-x-5",
                        "xl:grid-cols-[8rem_1.5rem_minmax(0,5fr)_minmax(0,6fr)]",
                        feature ? "on-dark my-2 bg-aubergine px-3 text-ivory md:px-5" : "hover:bg-cream/70",
                      )}
                    >
                      {/* Time */}
                      <time
                        className={cn(
                          "tabular col-start-2 text-[0.85rem] font-medium md:col-start-1 md:row-start-1 md:pt-1 sm:text-[0.95rem]",
                          feature ? "text-champagne" : "text-gold-deep group-hover:text-plum",
                        )}
                      >
                        {item.time}
                      </time>

                      {/* Diamond dot */}
                      <span
                        aria-hidden
                        className={cn(
                          "absolute top-[1.4rem] left-0 z-10 block h-3 w-3 rotate-45 border border-gold transition-transform duration-500 group-hover:scale-125",
                          "md:static md:col-start-2 md:row-start-1 md:mt-[0.45rem] md:ml-[0.1rem]",
                          light ? "bg-ivory" : "bg-gold",
                          feature && "bg-champagne",
                        )}
                      />

                      {/* Session type */}
                      <div className="col-start-2 mt-1 flex items-start gap-3 md:col-start-3 md:row-start-1 md:mt-0">
                        <Icon
                          aria-hidden
                          strokeWidth={1.4}
                          className={cn("mt-1 h-4 w-4 shrink-0 sm:h-5 sm:w-5", feature ? "text-champagne" : light ? "text-gold/80" : "text-gold-deep")}
                        />
                        <p
                          className={cn(
                            "font-display leading-tight",
                            light ? "text-lg text-ink/80 sm:text-xl" : "text-[1.5rem] font-medium sm:text-[1.7rem]",
                            !light && !feature && "text-aubergine",
                            feature && "text-champagne",
                          )}
                        >
                          {item.session}
                        </p>
                      </div>

                      {/* Title */}
                      {item.title && (
                        <p
                          className={cn(
                            "col-start-2 mt-2 text-[0.9rem] leading-relaxed sm:text-[0.98rem]",
                            "md:col-start-3 md:row-start-2",
                            "xl:col-start-4 xl:row-start-1 xl:mt-1",
                            feature ? "text-ivory/85" : "text-ink/80",
                          )}
                        >
                          {item.title}
                        </p>
                      )}
                    </li>
                  );
                })}
              </ol>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
