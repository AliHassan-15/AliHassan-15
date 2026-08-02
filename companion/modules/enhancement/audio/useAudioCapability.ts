"use client";

import { useSyncExternalStore } from "react";
import { probeAudioCapability } from "./capability";
import type { AudioCapability } from "./types";

function subscribe(onStoreChange: () => void): () => void {
  const data = window.matchMedia("(prefers-reduced-data: reduce)");
  data.addEventListener("change", onStoreChange);
  return () => data.removeEventListener("change", onStoreChange);
}

function getSnapshot(): AudioCapability {
  return probeAudioCapability().capability;
}

function getServerSnapshot(): AudioCapability {
  return "unavailable";
}

export function useAudioCapability(): AudioCapability {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
