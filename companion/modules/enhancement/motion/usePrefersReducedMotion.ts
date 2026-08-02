"use client";

import { useSyncExternalStore } from "react";
import { getMotionMediaQuery } from "./types";

function subscribe(onStoreChange: () => void): () => void {
  const media = window.matchMedia(getMotionMediaQuery());
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
}

function getSnapshot(): boolean {
  return window.matchMedia(getMotionMediaQuery()).matches;
}

function getServerSnapshot(): boolean {
  return false;
}

/** True when the visitor prefers reduced motion. */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
