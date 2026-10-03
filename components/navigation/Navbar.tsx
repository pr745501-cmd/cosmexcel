"use client";

import { useCallback, useState, useSyncExternalStore } from "react";
import { motion } from "motion/react";
import { navLinks, event } from "@/data/event";
import { useActiveSection } from "@/hooks/useActiveSection";
import { scrollToHash } from "@/lib/scroll";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./MobileMenu";

const subscribeScroll = (cb: () => void) => {
  window.addEventListener("scroll", cb, { passive: true });
  return () => window.removeEventListener("scroll", cb);
};
const ids = navLinks.map((l) => l.href.slice(1));

export function Navbar() {
  const scrolled = useSyncExternalStore(subscribeScroll, () => window.scrollY > 48, () => false);
  const active = useActiveSection(ids);
  const [open, setOpen] = useState(false);

  const go = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollToHash(href);
  }, []);

  return (
    <>
      <header
        className={cn(
          "on-dark fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color,padding] duration-500 ease-[var(--ease-lux)]",
          scrolled || open ? "border-b border-champagne/15 bg-night/80 py-3 backdrop-blur-xl" : "border-b border-transparent py-5 sm:py-6",
        )}
      >
        <nav aria-label="Primary" className="mx-auto flex max-w-[1500px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-12">
          <a
            href="#top"
            onClick={(e) => go(e, "#top")}
            className="flex items-baseline gap-2 text-ivory"
            aria-label={`${event.fullName} — back to top`}
          >
            <span className="font-display text-[1.65rem] font-semibold tracking-[0.14em]">COSMEXCEL</span>
            <span className="font-display text-xl italic text-champagne">2027</span>
          </a>

          <ul className="hidden items-center gap-9 lg:flex">
            {navLinks.map((link) => {
              const isActive = active === link.href.slice(1);
              return (
                <li key={link.href} className="relative">
                  <a
                    href={link.href}
                    onClick={(e) => go(e, link.href)}
                    aria-current={isActive ? "location" : undefined}
                    className={cn("py-2 text-[0.8rem] tracking-[0.08em] transition-colors duration-300", isActive ? "text-champagne" : "text-ivory/80 hover:text-ivory")}
                  >
                    {link.label}
                  </a>
                  {isActive && (
                    <motion.span layoutId="nav-indicator" className="absolute inset-x-0 -bottom-0.5 h-px bg-champagne" transition={{ type: "spring", stiffness: 380, damping: 34 }} />
                  )}
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3 sm:gap-5">
            <a
              href="#registration"
              onClick={(e) => go(e, "#registration")}
              className="hidden min-h-11 items-center bg-gold px-6 text-[0.74rem] font-medium tracking-[0.2em] text-night uppercase transition-colors duration-500 hover:bg-champagne sm:inline-flex"
            >
              Register now
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="group relative z-[60] flex h-11 items-center gap-3 pl-2 text-ivory lg:hidden"
            >
              <span className="text-[0.74rem] tracking-[0.2em] uppercase">{open ? "Close" : "Menu"}</span>
              <span className="relative block h-3 w-8" aria-hidden>
                <span className={cn("absolute left-0 h-px w-full bg-current transition-all duration-500 ease-[var(--ease-lux)]", open ? "top-1/2 rotate-45" : "top-0")} />
                <span className={cn("absolute left-0 h-px bg-current transition-all duration-500 ease-[var(--ease-lux)]", open ? "top-1/2 w-full -rotate-45" : "top-full w-2/3")} />
              </span>
            </button>
          </div>
        </nav>
      </header>
      <MobileMenu open={open} onClose={() => setOpen(false)} active={active} />
    </>
  );
}
