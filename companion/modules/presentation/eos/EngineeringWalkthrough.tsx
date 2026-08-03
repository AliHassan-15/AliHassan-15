"use client";

import { useEffect, useId, useRef, type KeyboardEvent } from "react";
import { Text } from "@/modules/presentation/primitives";
import { usePrefersReducedMotion } from "@/modules/enhancement/motion/usePrefersReducedMotion";
import type { WalkthroughRoom } from "./walkthrough.types";
import type { WalkthroughRoomId } from "./walkthrough.types";
import { isWalkthroughRoomId } from "./walkthrough.types";
import { WalkthroughProvider, useWalkthrough } from "./WalkthroughContext";
import styles from "./EngineeringWalkthrough.module.css";

type EngineeringWalkthroughProps = {
  rooms: WalkthroughRoom[];
  children: React.ReactNode;
};

function WalkthroughNav() {
  const { rooms, activeRoomId, setActiveRoomId } = useWalkthrough();
  const groupId = useId();
  const controlRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const liveRef = useRef<HTMLDivElement | null>(null);

  const activeIndex = Math.max(
    0,
    rooms.findIndex((room) => room.id === activeRoomId),
  );
  const activeRoom = rooms[activeIndex] ?? rooms[0];

  useEffect(() => {
    if (!activeRoom || !liveRef.current) {
      return;
    }
    liveRef.current.textContent = activeRoom.announce;
  }, [activeRoom]);

  function selectRoom(index: number, focus = false) {
    const room = rooms[index];
    if (!room) {
      return;
    }
    setActiveRoomId(room.id, { scrollIntoView: true });
    if (focus) {
      controlRefs.current[index]?.focus();
    }
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      selectRoom((index + 1) % rooms.length, true);
      return;
    }
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      selectRoom((index - 1 + rooms.length) % rooms.length, true);
      return;
    }
    if (event.key === "Home") {
      event.preventDefault();
      selectRoom(0, true);
      return;
    }
    if (event.key === "End") {
      event.preventDefault();
      selectRoom(rooms.length - 1, true);
    }
  }

  return (
    <nav className={styles.nav} aria-label="Engineering walkthrough">
      <Text as="p" size="caption" tone="tertiary" className={styles.navCaption}>
        Walkthrough
      </Text>
      <div
        className={styles.navGroup}
        role="radiogroup"
        aria-label="Engineering rooms"
        id={groupId}
      >
        <ol className={styles.navList}>
          {rooms.map((room, index) => {
            const selected = room.id === activeRoomId;
            return (
              <li key={room.id} className={styles.navItem}>
                <button
                  type="button"
                  role="radio"
                  className={styles.navControl}
                  aria-checked={selected}
                  tabIndex={selected ? 0 : -1}
                  ref={(node) => {
                    controlRefs.current[index] = node;
                  }}
                  onClick={() => selectRoom(index)}
                  onKeyDown={(event) => onKeyDown(event, index)}
                >
                  <span className={styles.navMark} aria-hidden="true">
                    {selected ? "●" : "○"}
                  </span>
                  <Text
                    as="span"
                    size="body-sm"
                    tone={selected ? "primary" : "tertiary"}
                  >
                    {room.label}
                  </Text>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
      <div className={styles.live} aria-live="polite" ref={liveRef} />
    </nav>
  );
}

function WalkthroughFrame({ children }: { children: React.ReactNode }) {
  const { rooms, activeRoomId, setActiveRoomId } = useWalkthrough();
  const reduced = usePrefersReducedMotion();
  const stageRef = useRef<HTMLDivElement | null>(null);
  const suppressSpyRef = useRef(false);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || rooms.length < 2) {
      return;
    }

    const targets = Array.from(
      stage.querySelectorAll<HTMLElement>("[data-eos-walkthrough-room-target]"),
    );
    if (targets.length === 0) {
      return;
    }

    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.getAttribute(
            "data-eos-walkthrough-room-target",
          );
          if (!id || !isWalkthroughRoomId(id)) {
            continue;
          }
          ratios.set(id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }

        if (suppressSpyRef.current) {
          return;
        }

        let bestId: WalkthroughRoomId | null = null;
        let bestRatio = 0;
        for (const room of rooms) {
          const ratio = ratios.get(room.id) ?? 0;
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = room.id;
          }
        }

        if (bestId && bestId !== activeRoomId && bestRatio > 0.08) {
          setActiveRoomId(bestId, {
            syncHash: true,
            scrollIntoView: false,
          });
        }
      },
      {
        root: null,
        rootMargin: "-18% 0px -52% 0px",
        threshold: [0, 0.12, 0.28, 0.45, 0.65, 1],
      },
    );

    for (const target of targets) {
      observer.observe(target);
    }

    return () => observer.disconnect();
  }, [rooms, activeRoomId, setActiveRoomId]);

  useEffect(() => {
    suppressSpyRef.current = true;
    const timer = window.setTimeout(
      () => {
        suppressSpyRef.current = false;
      },
      reduced ? 50 : 280,
    );
    return () => window.clearTimeout(timer);
  }, [activeRoomId, reduced]);

  return (
    <div
      className={styles.shell}
      data-eos-walkthrough=""
      data-eos-walkthrough-room={activeRoomId}
      data-eos-walkthrough-motion={reduced ? "reduce" : "full"}
    >
      <WalkthroughNav />
      <div className={styles.stage} ref={stageRef}>
        {children}
      </div>
    </div>
  );
}

/**
 * Flagship engineering walkthrough — guided inspection over existing rooms.
 * No new evidence. Coordinates hash, keyboard, and quiet room emphasis.
 */
export function EngineeringWalkthrough({
  rooms,
  children,
}: EngineeringWalkthroughProps) {
  if (rooms.length < 2) {
    return children;
  }

  return (
    <WalkthroughProvider rooms={rooms}>
      <WalkthroughFrame>{children}</WalkthroughFrame>
    </WalkthroughProvider>
  );
}
