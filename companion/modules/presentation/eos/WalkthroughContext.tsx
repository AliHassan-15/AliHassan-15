"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { usePrefersReducedMotion } from "@/modules/enhancement/motion/usePrefersReducedMotion";
import { useOptionalEngineeringContext } from "@/modules/presentation/engineering";
import type { WalkthroughRoom, WalkthroughRoomId } from "./walkthrough.types";
import { isWalkthroughRoomId } from "./walkthrough.types";

type SetActiveRoomOptions = {
  syncHash?: boolean;
  scrollIntoView?: boolean;
};

type WalkthroughContextValue = {
  rooms: WalkthroughRoom[];
  activeRoomId: WalkthroughRoomId;
  setActiveRoomId: (
    id: WalkthroughRoomId,
    options?: SetActiveRoomOptions,
  ) => void;
};

const WalkthroughContext = createContext<WalkthroughContextValue | null>(null);

type WalkthroughProviderProps = {
  rooms: WalkthroughRoom[];
  children: ReactNode;
};

function roomFromHash(rooms: WalkthroughRoom[]): WalkthroughRoomId | null {
  if (typeof window === "undefined") {
    return null;
  }
  let raw = window.location.hash.replace(/^#/, "");
  if (!raw) {
    return null;
  }
  if (raw === "reasoning") {
    raw = "decisions";
  }
  if (isWalkthroughRoomId(raw)) {
    return rooms.some((room) => room.id === raw) ? raw : null;
  }
  const byTarget = rooms.find((room) => room.targetId === raw);
  return byTarget?.id ?? null;
}

function scrollToRoom(
  rooms: WalkthroughRoom[],
  id: WalkthroughRoomId,
  reduced: boolean,
) {
  const room = rooms.find((entry) => entry.id === id);
  if (!room) {
    return;
  }
  const target = document.getElementById(room.targetId);
  if (!target) {
    return;
  }
  target.scrollIntoView({
    behavior: reduced ? "auto" : "smooth",
    block: "start",
  });
}

export function WalkthroughProvider({
  rooms,
  children,
}: WalkthroughProviderProps) {
  const reduced = usePrefersReducedMotion();
  const engineering = useOptionalEngineeringContext();
  const initial = rooms[0]?.id ?? ("objective" satisfies WalkthroughRoomId);
  const [activeRoomId, setActiveRoomState] =
    useState<WalkthroughRoomId>(initial);

  const setActiveRoomId = useCallback(
    (id: WalkthroughRoomId, options?: SetActiveRoomOptions) => {
      if (!rooms.some((room) => room.id === id)) {
        return;
      }
      setActiveRoomState(id);
      const room = rooms.find((entry) => entry.id === id);
      engineering?.setFocus(
        {
          kind: "walkthrough-room",
          id,
          label: room?.label ?? id,
          related: room
            ? [
                {
                  kind: "walkthrough-room",
                  id: room.targetId,
                  label: room.announce,
                },
              ]
            : [],
          source: "walkthrough",
        },
        { syncHash: false },
      );
      if (options?.syncHash !== false) {
        const next = `#${id}`;
        if (window.location.hash !== next) {
          window.history.replaceState(
            null,
            "",
            `${window.location.pathname}${next}`,
          );
        }
      }
      if (options?.scrollIntoView) {
        scrollToRoom(rooms, id, reduced);
      }
    },
    [rooms, reduced, engineering],
  );

  useEffect(() => {
    const syncFromHash = () => {
      const fromHash = roomFromHash(rooms);
      if (!fromHash) {
        return;
      }
      setActiveRoomState(fromHash);
      const room = rooms.find((entry) => entry.id === fromHash);
      engineering?.setFocus(
        {
          kind: "walkthrough-room",
          id: fromHash,
          label: room?.label ?? fromHash,
          related: room
            ? [
                {
                  kind: "walkthrough-room",
                  id: room.targetId,
                  label: room.announce,
                },
              ]
            : [],
          source: "hash",
        },
        { syncHash: false },
      );
      scrollToRoom(rooms, fromHash, reduced);
    };

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, [rooms, reduced, engineering]);

  const value = useMemo(
    () => ({
      rooms,
      activeRoomId,
      setActiveRoomId,
    }),
    [rooms, activeRoomId, setActiveRoomId],
  );

  return (
    <WalkthroughContext.Provider value={value}>
      {children}
    </WalkthroughContext.Provider>
  );
}

export function useWalkthrough(): WalkthroughContextValue {
  const value = useContext(WalkthroughContext);
  if (!value) {
    throw new Error("useWalkthrough requires WalkthroughProvider");
  }
  return value;
}

export function useOptionalWalkthrough(): WalkthroughContextValue | null {
  return useContext(WalkthroughContext);
}
