"use client";

import { useEffect, useRef } from "react";
import { registerGsap } from "@/lib/gsap";

export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { gsap } = registerGsap();
    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { trigger: document.documentElement, start: "top top", end: "bottom bottom", scrub: 0.3 },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px]">
      <div ref={ref} className="h-full origin-left scale-x-0 bg-gradient-to-r from-gold via-champagne to-gold" />
    </div>
  );
}
