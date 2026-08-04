"use client";

import { Button } from "@/modules/presentation/primitives";
import { useOptionalAudio } from "./audio-context";
import { areAmbientAssetsReady } from "./config";

type SoundToggleProps = {
  className?: string;
};

/**
 * System preference control — not a media player.
 * Hidden when audio architecture is not mounted.
 * Hairline engineering language only — no equalizer theater.
 */
export function SoundToggle({ className }: SoundToggleProps) {
  const audio = useOptionalAudio();
  const assetsReady = areAmbientAssetsReady();

  if (!audio) {
    return null;
  }

  const { preference, available, setPreference } = audio;
  const on = preference === "on";
  const canEnable = available && assetsReady;

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className={className}
      disabled={!canEnable && !on}
      aria-pressed={on}
      aria-label={
        canEnable
          ? on
            ? "Ambient on. Activate to mute environmental sound."
            : "Ambient off. Activate to enable environmental sound."
          : assetsReady
            ? "Ambient unavailable"
            : "Ambient assets not installed"
      }
      onClick={() => {
        setPreference(on ? "off" : "on");
      }}
    >
      Ambient
    </Button>
  );
}
