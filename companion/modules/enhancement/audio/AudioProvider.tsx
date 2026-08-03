"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import { usePrefersReducedMotion } from "@/modules/enhancement/motion/usePrefersReducedMotion";
import {
  AMBIENT_ENVIRONMENT,
  areAmbientAssetsReady,
  resolveAmbientRoom,
} from "./config";
import type { AmbientEngine } from "./ambientEngine";
import { AudioContext } from "./audio-context";
import {
  AUDIO_ATTRIBUTE,
  AUDIO_PREFERENCE_KEY,
  type AudioPreference,
} from "./types";
import { useAudioCapability } from "./useAudioCapability";

type AudioProviderProps = {
  children: ReactNode;
};

function readStoredPreference(): AudioPreference {
  if (typeof window === "undefined") {
    return "off";
  }
  try {
    const raw = window.localStorage.getItem(AUDIO_PREFERENCE_KEY);
    return raw === "on" ? "on" : "off";
  } catch {
    return "off";
  }
}

function writeStoredPreference(preference: AudioPreference): void {
  try {
    window.localStorage.setItem(AUDIO_PREFERENCE_KEY, preference);
  } catch {
    // Fail closed — preference still applies for the session.
  }
}

/**
 * Optional atmosphere only — silence default, removable, fail-closed.
 * Creates no audio / network work while preference is off.
 * Assets must be shipped under public/audio/ before enable succeeds.
 */
export function AudioProvider({ children }: AudioProviderProps) {
  const capability = useAudioCapability();
  const assetsReady = areAmbientAssetsReady();
  const available = capability === "available" && assetsReady;
  const pathname = usePathname() ?? "/";
  const reducedMotion = usePrefersReducedMotion();
  const [preference, setPreferenceState] = useState<AudioPreference>("off");
  const [hydrated, setHydrated] = useState(false);
  const engineRef = useRef<AmbientEngine | null>(null);

  const enabled = preference === "on" && available;

  useEffect(() => {
    setPreferenceState(readStoredPreference());
    setHydrated(true);
  }, []);

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
    engineRef.current?.setReducedMotion(reducedMotion);
  }, [reducedMotion]);

  useEffect(() => {
    if (!enabled) {
      return;
    }
    const room = resolveAmbientRoom(pathname);
    engineRef.current?.setRoom(room);

    const footer = document.querySelector("footer");
    if (!footer) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) {
          return;
        }
        if (entry.isIntersecting && entry.intersectionRatio > 0.35) {
          engineRef.current?.setRoom("footer");
          return;
        }
        engineRef.current?.setRoom(resolveAmbientRoom(pathname));
      },
      { threshold: [0, 0.35, 0.6] },
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, [enabled, pathname]);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

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
        engineRef.current = createAmbientEngine(AMBIENT_ENVIRONMENT);
        engineRef.current.setReducedMotion(reducedMotion);
        engineRef.current.setRoom(resolveAmbientRoom(pathname));
      }

      const started = await engineRef.current.setEnabled(true);
      if (!started && !cancelled) {
        setPreferenceState("off");
        writeStoredPreference("off");
      }
    };

    void sync();

    return () => {
      cancelled = true;
    };
  }, [enabled, hydrated, pathname, reducedMotion]);

  const setPreference = useCallback(
    (next: AudioPreference) => {
      if (next === "on" && !available) {
        setPreferenceState("off");
        writeStoredPreference("off");
        return;
      }
      setPreferenceState(next);
      writeStoredPreference(next);
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
