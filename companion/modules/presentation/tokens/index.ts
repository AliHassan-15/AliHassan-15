/**
 * Typed semantic / contextual token references for future consumers.
 * Values are CSS custom-property references — never duplicated literals.
 * Do not export primitive tokens for product UI consumption.
 */

export const color = {
  canvas: "var(--eos-color-canvas)",
  surface: "var(--eos-color-surface)",
  surfaceElevated: "var(--eos-color-surface-elevated)",
  surfaceMuted: "var(--eos-color-surface-muted)",
  textPrimary: "var(--eos-color-text-primary)",
  textSecondary: "var(--eos-color-text-secondary)",
  textTertiary: "var(--eos-color-text-tertiary)",
  textInverse: "var(--eos-color-text-inverse)",
  textDisabled: "var(--eos-color-text-disabled)",
  borderSubtle: "var(--eos-color-border-subtle)",
  borderStrong: "var(--eos-color-border-strong)",
  focus: "var(--eos-color-focus)",
  selectionBg: "var(--eos-color-selection-bg)",
  selectionFg: "var(--eos-color-selection-fg)",
  accent: "var(--eos-color-accent)",
  accentSubtle: "var(--eos-color-accent-subtle)",
  statusSuccess: "var(--eos-color-status-success)",
  statusWarn: "var(--eos-color-status-warn)",
  statusFail: "var(--eos-color-status-fail)",
  statusInfo: "var(--eos-color-status-info)",
  overlay: "var(--eos-color-overlay)",
} as const;

export const space = {
  0: "var(--eos-space-0)",
  1: "var(--eos-space-1)",
  2: "var(--eos-space-2)",
  3: "var(--eos-space-3)",
  4: "var(--eos-space-4)",
  5: "var(--eos-space-5)",
  6: "var(--eos-space-6)",
  7: "var(--eos-space-7)",
  8: "var(--eos-space-8)",
  9: "var(--eos-space-9)",
} as const;

export const font = {
  familySans: "var(--eos-font-family-sans)",
  familyDisplay: "var(--eos-font-family-display)",
  familyMono: "var(--eos-font-family-mono)",
  sizeCaption: "var(--eos-font-size-caption)",
  sizeBodySm: "var(--eos-font-size-body-sm)",
  sizeBody: "var(--eos-font-size-body)",
  sizeBodyLg: "var(--eos-font-size-body-lg)",
  sizeHeading3: "var(--eos-font-size-heading-3)",
  sizeHeading2: "var(--eos-font-size-heading-2)",
  sizeHeading1: "var(--eos-font-size-heading-1)",
  sizeDisplay: "var(--eos-font-size-display)",
} as const;

export const radius = {
  none: "var(--eos-radius-none)",
  subtle: "var(--eos-radius-subtle)",
  standard: "var(--eos-radius-standard)",
  emphasis: "var(--eos-radius-emphasis)",
} as const;

export const elevation = {
  none: "var(--eos-elevation-none)",
  subtle: "var(--eos-elevation-subtle)",
  standard: "var(--eos-elevation-standard)",
  emphasis: "var(--eos-elevation-emphasis)",
} as const;

export const motion = {
  durationInstant: "var(--eos-duration-instant)",
  durationSwift: "var(--eos-duration-swift)",
  durationSteady: "var(--eos-duration-steady)",
  durationDeliberate: "var(--eos-duration-deliberate)",
  easeStandard: "var(--eos-ease-standard)",
  easeEmphasized: "var(--eos-ease-emphasized)",
  easeLinear: "var(--eos-ease-linear)",
  transitionColor: "var(--eos-transition-color)",
  transitionSurface: "var(--eos-transition-surface)",
  transitionOpacity: "var(--eos-transition-opacity)",
  transitionTransform: "var(--eos-transition-transform)",
  transitionInteractive: "var(--eos-transition-interactive)",
  transitionFocus: "var(--eos-transition-focus)",
  revealDistance: "var(--eos-motion-reveal-distance)",
  stagger: "var(--eos-motion-stagger)",
  pressNudge: "var(--eos-motion-press-nudge)",
} as const;

export const layer = {
  canvas: "var(--eos-layer-canvas)",
  content: "var(--eos-layer-content)",
  sticky: "var(--eos-layer-sticky)",
  overlay: "var(--eos-layer-overlay)",
  modal: "var(--eos-layer-modal)",
  transient: "var(--eos-layer-transient)",
} as const;

export const context = {
  companionCanvas: "var(--eos-context-companion-canvas)",
  companionInk: "var(--eos-context-companion-ink)",
  companionMutedInk: "var(--eos-context-companion-muted-ink)",
  companionRule: "var(--eos-context-companion-rule)",
  companionFocusRing: "var(--eos-context-companion-focus-ring)",
} as const;
