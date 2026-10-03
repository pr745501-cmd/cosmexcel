"use client";

import { useSyncExternalStore } from "react";
import { useMediaQuery, useReducedMotion } from "./useMediaQuery";
import { hasWebGL } from "@/lib/webgl";

export type SceneQuality = "high" | "medium" | "low" | "none";

const noop = () => () => {};

/**
 * Chooses 3D complexity from viewport and capability:
 * desktop → high, tablet → medium, phone → low, no WebGL → none (static fallback).
 */
export function useSceneQuality(): SceneQuality {
  const webgl = useSyncExternalStore(noop, hasWebGL, () => false);
  const isDesktop = useMediaQuery("(min-width: 1100px)");
  const isTablet = useMediaQuery("(min-width: 700px)");
  const reduced = useReducedMotion();
  if (!webgl) return "none";
  if (reduced) return "low";
  if (isDesktop) return "high";
  if (isTablet) return "medium";
  return "low";
}
