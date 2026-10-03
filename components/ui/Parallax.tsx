"use client";

import { useEffect, useRef } from "react";
import { registerGsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
  /** Percentage of the element's own height to travel across the viewport. */
  amount?: number;
}

/** Gentle scroll-linked drift for imagery. Skipped entirely for reduced motion. */
export function Parallax({ children, className, amount = 10 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const { gsap } = registerGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(el, { yPercent: amount / 2 }, { yPercent: -amount / 2, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
    });
    return () => ctx.revert();
  }, [amount]);
  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}
