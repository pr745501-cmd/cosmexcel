"use client";

import { useSyncExternalStore } from "react";
import { cn, pad } from "@/lib/utils";

interface CountdownProps {
  /** ISO 8601 target, including a timezone offset. */
  target: string;
  className?: string;
  /** Shown once the target has passed. */
  completedLabel?: string;
}

const UNITS = ["Days", "Hours", "Minutes", "Seconds"] as const;

/** One-second wall-clock store. Server snapshot is 0 so markup matches during hydration. */
function subscribe(cb: () => void) {
  const id = window.setInterval(cb, 1000);
  return () => window.clearInterval(id);
}
const getSnapshot = () => Math.floor(Date.now() / 1000);
const getServerSnapshot = () => 0;

export function Countdown({ target, className, completedLabel = "The summit is underway" }: CountdownProps) {
  const now = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const targetSec = Math.floor(new Date(target).getTime() / 1000);
  const ready = now !== 0;
  const remaining = Math.max(0, targetSec - now);

  if (ready && remaining === 0) {
    return <p className={cn("font-display text-3xl italic text-champagne", className)}>{completedLabel}</p>;
  }

  const parts = [
    Math.floor(remaining / 86400),
    Math.floor((remaining % 86400) / 3600),
    Math.floor((remaining % 3600) / 60),
    remaining % 60,
  ];
  const label = ready
    ? `${parts[0]} days, ${parts[1]} hours and ${parts[2]} minutes until Cosmexcel 2027 begins`
    : "Countdown to Cosmexcel 2027";

  return (
    <div className={cn("flex items-end gap-5 sm:gap-8", className)}>
      {/* Screen readers get a minute-level label instead of a per-second stream */}
      <p className="sr-only">{label}</p>
      {UNITS.map((unit, i) => (
        <div key={unit} className="min-w-[3.4rem] sm:min-w-[4.5rem]" aria-hidden>
          <div className="tabular font-display text-[2.6rem] font-medium leading-none text-ivory sm:text-6xl">
            {ready ? pad(parts[i]) : "––"}
          </div>
          <div className="mt-2 text-[0.7rem] tracking-[0.18em] text-champagne/80 uppercase">{unit}</div>
        </div>
      ))}
    </div>
  );
}
