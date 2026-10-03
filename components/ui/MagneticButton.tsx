"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { scrollToHash } from "@/lib/scroll";
import { cn } from "@/lib/utils";
import { useMediaQuery, useReducedMotion } from "@/hooks/useMediaQuery";

interface Props {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: "gold" | "outline";
}

/** CTA that leans toward the pointer. Disabled on touch and for reduced motion. */
export function MagneticButton({ href, children, className, variant = "gold" }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });
  const fine = useMediaQuery("(hover: hover) and (pointer: fine)");
  const reduced = useReducedMotion();
  const active = fine && !reduced;

  const onMove = (e: React.PointerEvent) => {
    if (!active || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.22);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.3);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x, y }}
      onPointerMove={onMove}
      onPointerLeave={reset}
      onClick={(e) => {
        if (href.startsWith("#")) {
          e.preventDefault();
          scrollToHash(href);
        }
      }}
      className={cn(
        "group relative inline-flex min-h-14 items-center justify-center gap-3 px-10 py-4 text-[0.8rem] font-medium uppercase tracking-[0.22em] transition-colors duration-500",
        variant === "gold" ? "bg-gold text-night hover:bg-champagne" : "border border-champagne/60 text-ivory hover:bg-champagne hover:text-night",
        className,
      )}
    >
      {children}
    </motion.a>
  );
}
