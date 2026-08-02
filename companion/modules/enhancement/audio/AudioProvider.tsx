"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AMBIENT_TRACK } from "./config";
import type { AmbientEngine } from "./ambientEngine";
import { AudioContext } from "./audio-context";
import { AUDIO_ATTRIBUTE, type AudioPreference } from "./types";
import { useAudioCapability } from "./useAudioCapability";

type AudioProviderProps = {
  children: ReactNode;
};

/**
 * Optional atmosphere only — silence default, removable, fail-closed.
 * Creates no audio work while preference is off.
 */
export function AudioProvider({ children }: AudioProviderProps) {
  const capability = useAudioCapability();
  const available = capability === "available";
  const [preference, setPreferenceState] = useState<AudioPreference>("off");
  const engineRef = useRef<AmbientEngine | null>(null);

  const enabled = preference === "on" && available;

  useEffect(() => {
    document.documentElement.setAttribute(
      AUDIO_ATTRIBUTE,
      enabled ? "on" : "off",
    );
  }, [enabled]);

  useEffect(() => {
    const onVisibility = () => {
      engineRef.current?.setPageVisible(document.visibilityState === "visible");
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      engineRef.current?.dispose();
      engineRef.current = null;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    const sync = async () => {
      if (!enabled) {
        if (engineRef.current) {
          await engineRef.current.setEnabled(false);
          engineRef.current.dispose();
          engineRef.current = null;
        }
        return;
      }

      if (!engineRef.current) {
        const { createAmbientEngine } = await import("./ambientEngine");
        if (cancelled) {
          return;
        }
        engineRef.current = createAmbientEngine(AMBIENT_TRACK);
      }

      const started = await engineRef.current.setEnabled(true);
      if (!started && !cancelled) {
        setPreferenceState("off");
      }
    };

    void sync();

    return () => {
      cancelled = true;
    };
  }, [enabled]);

  const setPreference = useCallback(
    (next: AudioPreference) => {
      if (next === "on" && !available) {
        setPreferenceState("off");
        return;
      }
      setPreferenceState(next);
    },
    [available],
  );

  const value = useMemo(
    () => ({
      preference: available ? preference : "off",
      enabled,
      available,
      setPreference,
    }),
    [preference, enabled, available, setPreference],
  );

  return (
    <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
  );
}

export { useAudio, useOptionalAudio } from "./audio-context";
