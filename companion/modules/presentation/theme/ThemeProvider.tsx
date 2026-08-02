"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  resolveTheme,
  THEME_ATTRIBUTE,
  type Theme,
  type ThemePreference,
} from "./types";

type ThemeContextValue = {
  theme: Theme;
  preference: ThemePreference;
  setPreference: (preference: ThemePreference) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function subscribeToSystemTheme(onStoreChange: () => void): () => void {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
}

function getSystemIsDark(): boolean {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function getServerSystemIsDark(): boolean {
  return false;
}

type ThemeProviderProps = {
  children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const systemIsDark = useSyncExternalStore(
    subscribeToSystemTheme,
    getSystemIsDark,
    getServerSystemIsDark,
  );
  const [preference, setPreferenceState] = useState<ThemePreference>("system");

  const theme = useMemo(
    () => resolveTheme(preference, systemIsDark),
    [preference, systemIsDark],
  );

  useEffect(() => {
    document.documentElement.setAttribute(THEME_ATTRIBUTE, theme);
  }, [theme]);

  const setPreference = useCallback((next: ThemePreference) => {
    setPreferenceState(next);
    // Persistence deferred to a later milestone.
  }, []);

  const value = useMemo(
    () => ({
      theme,
      preference,
      setPreference,
    }),
    [theme, preference, setPreference],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const value = useContext(ThemeContext);

  if (!value) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return value;
}

export function cycleThemePreference(
  preference: ThemePreference,
  theme: Theme,
): ThemePreference {
  switch (preference) {
    case "system":
      return theme === "dark" ? "light" : "dark";
    case "light":
      return "dark";
    case "dark":
      return "light";
    default: {
      const _exhaustive: never = preference;
      return _exhaustive;
    }
  }
}
