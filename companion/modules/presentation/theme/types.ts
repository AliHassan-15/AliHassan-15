export const THEME_ATTRIBUTE = "data-theme" as const;

export const themes = ["light", "dark"] as const;

export type Theme = (typeof themes)[number];

export type ThemePreference = Theme | "system";

export function isTheme(value: string): value is Theme {
  return value === "light" || value === "dark";
}

export function resolveTheme(
  preference: ThemePreference,
  systemIsDark: boolean,
): Theme {
  if (preference === "system") {
    return systemIsDark ? "dark" : "light";
  }

  return preference;
}
