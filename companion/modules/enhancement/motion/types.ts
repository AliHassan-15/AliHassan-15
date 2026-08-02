export const MOTION_ATTRIBUTE = "data-eos-motion" as const;

export type MotionCapability = "full" | "reduce";

export function getMotionMediaQuery(): string {
  return "(prefers-reduced-motion: reduce)";
}
