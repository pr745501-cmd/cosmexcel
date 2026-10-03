"use client";

import { useEffect, useRef } from "react";
import { registerGsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "li" | "p" | "h2" | "h3" | "article";
  delay?: number;
  y?: number;
  /** Reveal direct children one after another. */
  stagger?: number;
}

/**
 * Scroll-triggered reveal. Content is visible without JS; the hidden start state
 * is applied by CSS only when scripting is enabled and motion is allowed.
 */
export function Reveal({ children, className, as: Tag = "div", delay = 0, y = 28, stagger }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const { gsap } = registerGsap();
    const ctx = gsap.context(() => {
      const targets = stagger ? Array.from(el.children) : el;
      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          delay,
          stagger: stagger ?? 0,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        },
      );
    }, el);
    return () => ctx.revert();
  }, [delay, y, stagger]);

  // `as` only ever receives block-level tags; narrowing to "div" keeps JSX typing tractable.
  const Component = Tag as "div";
  return (
    <Component ref={ref} data-reveal={stagger ? undefined : ""} className={cn(className)}>
      {children}
    </Component>
  );
}
