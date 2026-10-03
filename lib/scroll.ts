import type Lenis from "lenis";

/** Module-level handle so any component can scroll without prop drilling. */
let instance: Lenis | null = null;

export function setLenis(lenis: Lenis | null) {
  instance = lenis;
}

export function getLenis() {
  return instance;
}

export function scrollToHash(hash: string) {
  if (typeof window === "undefined") return;
  const target = document.querySelector<HTMLElement>(hash);
  if (!target) return;
  if (instance) {
    instance.scrollTo(target, { offset: -72, duration: 1.4 });
  } else {
    target.scrollIntoView({ behavior: "auto", block: "start" });
  }
  history.replaceState(null, "", hash);
}

/** Shared, mutable scene inputs. Read inside useFrame — never trigger React renders. */
export const sceneState = { scroll: 0, pointerX: 0, pointerY: 0 };
