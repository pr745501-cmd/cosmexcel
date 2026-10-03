"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { contact, event, navLinks } from "@/data/event";
import { getLenis, scrollToHash } from "@/lib/scroll";
import { cn } from "@/lib/utils";

interface Props {
  open: boolean;
  onClose: () => void;
  active: string;
}

const FOCUSABLE = "a[href], button:not([disabled])";

export function MobileMenu({ open, onClose, active }: Props) {
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const lenis = getLenis();
    lenis?.stop();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel.current?.querySelector<HTMLElement>("a")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab" || !panel.current) return;
      const items = [
        document.querySelector<HTMLElement>("[aria-controls='mobile-menu']"),
        ...Array.from(panel.current.querySelectorAll<HTMLElement>(FOCUSABLE)),
      ].filter((el): el is HTMLElement => el !== null);
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      lenis?.start();
    };
  }, [open, onClose]);

  const navigate = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    onClose();
    window.setTimeout(() => scrollToHash(href), 420);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          ref={panel}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          initial={{ clipPath: "circle(0% at calc(100% - 2.75rem) 2.5rem)" }}
          animate={{ clipPath: "circle(150% at calc(100% - 2.75rem) 2.5rem)" }}
          exit={{ clipPath: "circle(0% at calc(100% - 2.75rem) 2.5rem)", transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="on-dark fixed inset-0 z-40 flex flex-col overflow-y-auto bg-night px-5 sm:px-8 pt-24 pb-[calc(2rem+env(safe-area-inset-bottom))] lg:hidden"
        >
          {/* Decorative rings */}
          <div aria-hidden className="pointer-events-none absolute -right-24 top-1/3 h-[28rem] w-[28rem] rounded-full border border-champagne/15" />
          <div aria-hidden className="pointer-events-none absolute -right-8 top-1/3 h-[22rem] w-[22rem] rounded-full border border-champagne/10" />

          {/* Nav links */}
          <ul className="relative flex flex-1 flex-col justify-center gap-1">
            {navLinks.map((link, i) => (
              <motion.li
                key={link.href}
                initial={{ opacity: 0, y: 34 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.25 + i * 0.06, duration: 0.7, ease: [0.22, 1, 0.36, 1] } }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
              >
                <a
                  href={link.href}
                  onClick={(e) => navigate(e, link.href)}
                  className={cn(
                    "flex min-h-14 items-baseline gap-4 font-display text-[2rem] sm:text-[2.5rem] leading-tight",
                    active === link.href.slice(1) ? "text-champagne" : "text-ivory",
                  )}
                >
                  <span className="w-6 text-xs tracking-widest text-gold">{String(i + 1).padStart(2, "0")}</span>
                  {link.label}
                </a>
              </motion.li>
            ))}
          </ul>

          {/* Footer area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.7, duration: 0.6 } }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
            className="relative mt-8 border-t border-champagne/20 pt-6"
          >
            <a
              href="#registration"
              onClick={(e) => navigate(e, "#registration")}
              className="flex min-h-14 items-center justify-center bg-gold text-[0.8rem] font-medium tracking-[0.22em] text-night uppercase"
            >
              Register now
            </a>
            <p className="mt-5 text-sm text-ivory/70">
              {event.dateLabel} · {event.venue}
            </p>
            <a href={`mailto:${contact.email}`} className="mt-1 block text-sm text-champagne break-all">
              {contact.email}
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
