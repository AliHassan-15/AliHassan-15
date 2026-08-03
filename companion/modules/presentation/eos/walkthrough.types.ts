export type WalkthroughRoomId =
  | "objective"
  | "architecture"
  | "decisions"
  | "validation"
  | "failures"
  | "evidence"
  | "references";

export type WalkthroughRoom = {
  id: WalkthroughRoomId;
  label: string;
  /** Element id to scroll into view / hash target. */
  targetId: string;
  /** Screen-reader announcement when the room becomes active. */
  announce: string;
};

export function isWalkthroughRoomId(value: string): value is WalkthroughRoomId {
  return (
    value === "objective" ||
    value === "architecture" ||
    value === "decisions" ||
    value === "validation" ||
    value === "failures" ||
    value === "evidence" ||
    value === "references"
  );
}
