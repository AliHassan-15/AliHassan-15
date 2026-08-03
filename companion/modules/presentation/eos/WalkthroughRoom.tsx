"use client";

import type { ReactNode } from "react";
import type { WalkthroughRoomId } from "./walkthrough.types";
import { useOptionalWalkthrough } from "./WalkthroughContext";

type WalkthroughRoomProps = {
  roomId: WalkthroughRoomId;
  children: ReactNode;
  className?: string;
};

/**
 * Marks a case-study region as a walkthrough room target.
 * Harmless when walkthrough provider is absent.
 */
export function WalkthroughRoom({
  roomId,
  children,
  className,
}: WalkthroughRoomProps) {
  const walkthrough = useOptionalWalkthrough();
  const active = walkthrough?.activeRoomId === roomId;

  return (
    <div
      className={className}
      data-eos-walkthrough-room-target={roomId}
      data-eos-room-active={active ? "true" : "false"}
    >
      {children}
    </div>
  );
}
