"use client";

import { useSyncExternalStore } from "react";
import { probeSpatialCapability } from "./capability";
import type { SpatialCapability } from "./types";

function subscribe(onStoreChange: () => void): () => void {
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const data = window.matchMedia("(prefers-reduced-data: reduce)");
  motion.addEventListener("change", onStoreChange);
  data.addEventListener("change", onStoreChange);
  return () => {
    motion.removeEventListener("change", onStoreChange);
    data.removeEventListener("change", onStoreChange);
  };
}

function getSnapshot(): SpatialCapability {
  return probeSpatialCapability().capability;
}

function getServerSnapshot(): SpatialCapability {
  return "off";
}

/** Current spatial capability — defaults to off until client probe. */
export function useSpatialCapability(): SpatialCapability {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
