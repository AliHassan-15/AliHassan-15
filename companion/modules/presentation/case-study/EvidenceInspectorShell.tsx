"use client";

import {
  useEffect,
  useState,
  type ReactNode,
  type SyntheticEvent,
} from "react";
import { useOptionalWalkthrough } from "@/modules/presentation/eos/WalkthroughContext";

type EvidenceInspectorShellProps = {
  children: ReactNode;
};

/**
 * Native details disclosure — opens when Evidence walkthrough room is active.
 * Provenance / confidence content stays unchanged.
 */
export function EvidenceInspectorShell({
  children,
}: EvidenceInspectorShellProps) {
  const walkthrough = useOptionalWalkthrough();
  const evidenceActive = walkthrough?.activeRoomId === "evidence";
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (evidenceActive) {
      setOpen(true);
    }
  }, [evidenceActive]);

  function onToggle(event: SyntheticEvent<HTMLDetailsElement>) {
    setOpen(event.currentTarget.open);
  }

  return (
    <details open={open} onToggle={onToggle}>
      {children}
    </details>
  );
}
