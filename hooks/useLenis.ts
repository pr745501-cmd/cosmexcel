"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { registerGsap } from "@/lib/gsap";
import { setLenis } from "@/lib/scroll";
import { useReducedMotion } from "./useMediaQuery";

/** Smooth scrolling driven by the GSAP ticker so ScrollTrigger stays in sync. */
export function useLenis() {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const { gsap, ScrollTrigger } = registerGsap();
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
    };
  }, [reduced]);
}
