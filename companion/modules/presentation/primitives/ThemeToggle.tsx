"use client";

import { runViewTransition } from "@/modules/enhancement/motion";
import { cycleThemePreference, useTheme } from "@/modules/presentation/theme";
import { Button } from "./Button";

type ThemeToggleProps = {
  className?: string;
};

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, preference, setPreference } = useTheme();

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className={className}
      aria-label={`Theme ${theme}${preference === "system" ? ", following system" : ""}. Activate to switch.`}
      onClick={() => {
        runViewTransition(() => {
          setPreference(cycleThemePreference(preference, theme));
        });
      }}
    >
      Theme
    </Button>
  );
}
