"use client";

import { useLenis } from "@/hooks/useLenis";
import { ScrollProgress } from "./ScrollProgress";
import { CustomCursor } from "./CustomCursor";

/** Mounts global scroll + pointer behaviours once, at the root. */
export function SmoothScroll() {
  useLenis();
  return (
    <>
      <ScrollProgress />
      <CustomCursor />
    </>
  );
}
