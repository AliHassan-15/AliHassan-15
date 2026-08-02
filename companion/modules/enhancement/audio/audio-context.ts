"use client";

import { createContext, useContext } from "react";
import type { AudioPreference } from "./types";

export type AudioContextValue = {
  preference: AudioPreference;
  enabled: boolean;
  available: boolean;
  setPreference: (preference: AudioPreference) => void;
};

export const AudioContext = createContext<AudioContextValue | null>(null);

export function useAudio(): AudioContextValue {
  const value = useContext(AudioContext);
  if (!value) {
    throw new Error("useAudio must be used within AudioProvider");
  }
  return value;
}

/** Optional — chrome may render outside AudioProvider (e.g. root not-found). */
export function useOptionalAudio(): AudioContextValue | null {
  return useContext(AudioContext);
}
