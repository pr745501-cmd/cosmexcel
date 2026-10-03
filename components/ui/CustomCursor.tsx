"use client";

import { useEffect, useRef } from "react";
import { registerGsap } from "@/lib/gsap";
import { useMediaQuery, useReducedMotion } from "@/hooks/useMediaQuery";

/** A restrained gold ring that trails the pointer. Fine-pointer desktops only; the native cursor stays. */
export function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);
  const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)");
  const reduced = useReducedMotion();
  const enabled = finePointer && !reduced;

  useEffect(() => {
    if (!enabled || !ref.current) return;
    const { gsap } = registerGsap();
    const el = ref.current;
    const x = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3.out" });
    const y = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3.out" });
    const move = (e: PointerEvent) => {
      x(e.clientX);
      y(e.clientY);
      el.style.opacity = "1";
      const interactive = (e.target as HTMLElement | null)?.closest("a, button, [role='button'], input, select, textarea");
      el.dataset.active = interactive ? "true" : "false";
    };
    const leave = () => (el.style.opacity = "0");
    window.addEventListener("pointermove", move);
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <div
      ref={ref}
      aria-hidden
      style={{ opacity: 0 }}
      className="pointer-events-none fixed left-0 top-0 z-[70] -ml-4 -mt-4 h-8 w-8 rounded-full border border-gold/80 mix-blend-difference transition-[width,height,margin,background-color] duration-300 data-[active=true]:-ml-6 data-[active=true]:-mt-6 data-[active=true]:h-12 data-[active=true]:w-12 data-[active=true]:bg-champagne/20"
    />
  );
}
