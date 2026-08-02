"use client";

import { Button } from "@/modules/presentation/primitives";
import { useOptionalAudio } from "./audio-context";

type SoundToggleProps = {
  className?: string;
};

/**
 * System preference control — not a media player.
 * Hidden when audio architecture is not mounted.
 */
export function SoundToggle({ className }: SoundToggleProps) {
  const audio = useOptionalAudio();

  if (!audio) {
    return null;
  }

  const { preference, available, setPreference } = audio;
  const on = preference === "on";

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className={className}
      disabled={!available && !on}
      aria-pressed={on}
      aria-label={
        available
          ? on
            ? "Sound on. Activate to mute ambient sound."
            : "Sound off. Activate to enable ambient sound."
          : "Sound unavailable"
      }
      onClick={() => {
        setPreference(on ? "off" : "on");
      }}
    >
      Sound · {on ? "On" : "Off"}
    </Button>
  );
}
