"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { Link, Text } from "@/modules/presentation/primitives";
import { useOptionalWalkthrough } from "@/modules/presentation/eos/WalkthroughContext";
import {
  focusMatchesItem,
  relatedRefFromLink,
  useOptionalEngineeringContext,
} from "@/modules/presentation/engineering";
import type { DecisionInspection } from "./inspectDecision";
import styles from "./DecisionExplorer.module.css";

type DecisionExplorerProps = {
  /** Precomputed inspections — server-built from confirmed lineages only. */
  inspections: DecisionInspection[];
};

function PlateSeparator() {
  return (
    <Text as="span" size="caption" tone="tertiary" aria-hidden="true">
      ↓
    </Text>
  );
}

/**
 * Engineering Decision Explorer — inspect why systems became the way they are.
 * Receives server-built inspections only (no Node loaders on the client).
 * Missing stays Missing. Deferred stays Deferred.
 */
export function DecisionExplorer({ inspections }: DecisionExplorerProps) {
  const groupId = useId();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const controlRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const walkthrough = useOptionalWalkthrough();
  const engineering = useOptionalEngineeringContext();

  useEffect(() => {
    if (walkthrough?.activeRoomId === "decisions") {
      setSelectedIndex(0);
    }
  }, [walkthrough?.activeRoomId]);

  useEffect(() => {
    if (!engineering?.focus || inspections.length === 0) {
      return;
    }
    const index = inspections.findIndex((entry) =>
      focusMatchesItem(engineering.focus, {
        kind: "decision",
        id: entry.id,
        label: entry.label,
      }),
    );
    if (index >= 0) {
      setSelectedIndex(index);
    }
  }, [engineering?.focus, inspections]);

  if (inspections.length === 0) {
    return null;
  }

  const safeIndex = Math.min(selectedIndex, inspections.length - 1);
  const inspection = inspections[safeIndex];
  if (!inspection) {
    return null;
  }

  function publishFocus(index: number) {
    const entry = inspections[index];
    if (!entry || !engineering) {
      return;
    }
    engineering.setFocus(
      {
        kind: "decision",
        id: entry.id,
        label: entry.label,
        related: [
          ...entry.relatedArchitecture.map((link) =>
            relatedRefFromLink(link.href, link.label),
          ),
          ...entry.relatedSystems.map((link) =>
            relatedRefFromLink(link.href, link.label),
          ),
        ],
        source: "decision-explorer",
      },
      { syncHash: false },
    );
  }

  function selectDecision(index: number, focus = false) {
    setSelectedIndex(index);
    publishFocus(index);
    if (focus) {
      controlRefs.current[index]?.focus();
    }
  }

  function onDecisionKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      selectDecision((index + 1) % inspections.length, true);
      return;
    }
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      selectDecision(
        (index - 1 + inspections.length) % inspections.length,
        true,
      );
      return;
    }
    if (event.key === "Home") {
      event.preventDefault();
      selectDecision(0, true);
      return;
    }
    if (event.key === "End") {
      event.preventDefault();
      selectDecision(inspections.length - 1, true);
    }
  }

  return (
    <figure className={styles.figure}>
      <figcaption className={styles.caption}>
        <Text as="span" size="caption" tone="tertiary">
          Decision inspection — ADRs from confirmed engineering case file
        </Text>
      </figcaption>

      <div
        className={styles.decisionGroup}
        role="radiogroup"
        aria-label="Confirmed engineering decisions"
        id={groupId}
      >
        <ol className={styles.list}>
          {inspections.map((entry, index) => {
            const selectedControl = index === safeIndex;
            const matched = focusMatchesItem(engineering?.focus ?? null, {
              kind: "decision",
              id: entry.id,
              label: entry.label,
            });
            return (
              <li key={entry.id} className={styles.listItem}>
                <button
                  type="button"
                  role="radio"
                  className={styles.decisionControl}
                  data-eos-eng-item=""
                  data-eos-eng-match={matched ? "true" : "false"}
                  aria-checked={selectedControl}
                  tabIndex={selectedControl ? 0 : -1}
                  ref={(node) => {
                    controlRefs.current[index] = node;
                  }}
                  onClick={() => selectDecision(index)}
                  onKeyDown={(event) => onDecisionKeyDown(event, index)}
                >
                  <Text as="span" size="caption" tone="tertiary">
                    {entry.id}
                  </Text>
                  <Text as="span" size="body" tone="primary">
                    {entry.label}
                  </Text>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      <div
        className={styles.plate}
        aria-live="polite"
        data-eos-decision-plate=""
      >
        <Text as="span" size="caption" tone="tertiary">
          Decision inspection · {inspection.id}
        </Text>

        <div className={styles.plateRow}>
          <Text as="span" size="caption" tone="tertiary">
            Decision
          </Text>
          <Text as="span" size="body-sm" tone="secondary">
            {inspection.decisionText}
          </Text>
        </div>

        <PlateSeparator />

        <div className={styles.plateRow}>
          <Text as="span" size="caption" tone="tertiary">
            Reason
          </Text>
          <Text as="span" size="body-sm" tone="secondary">
            {inspection.reasonText}
          </Text>
        </div>

        <PlateSeparator />

        <div className={styles.plateRow}>
          <Text as="span" size="caption" tone="tertiary">
            Trade-offs
          </Text>
          <Text as="span" size="body-sm" tone="secondary">
            {inspection.tradeoffsText}
          </Text>
        </div>

        <PlateSeparator />

        <div className={styles.plateRow}>
          <Text as="span" size="caption" tone="tertiary">
            Constraints
          </Text>
          <Text as="span" size="body-sm" tone="secondary">
            {inspection.constraintsText}
          </Text>
        </div>

        <PlateSeparator />

        <div className={styles.plateRow}>
          <Text as="span" size="caption" tone="tertiary">
            Validation
          </Text>
          <Text as="span" size="body-sm" tone="secondary">
            {inspection.validationText}
          </Text>
        </div>

        <PlateSeparator />

        <div className={styles.plateBlock}>
          <Text as="span" size="caption" tone="tertiary">
            Related architecture
          </Text>
          {inspection.relatedArchitecture.length > 0 ? (
            <ul className={styles.relatedList}>
              {inspection.relatedArchitecture.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} tone="secondary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <Text as="span" size="body-sm" tone="tertiary">
              Missing
            </Text>
          )}
        </div>

        <PlateSeparator />

        <div className={styles.plateBlock}>
          <Text as="span" size="caption" tone="tertiary">
            Related systems
          </Text>
          {inspection.relatedSystems.length > 0 ? (
            <ul className={styles.relatedList}>
              {inspection.relatedSystems.map((link) => (
                <li key={`${link.href}-${link.label}`}>
                  <Link href={link.href} tone="secondary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <Text as="span" size="body-sm" tone="tertiary">
              Missing
            </Text>
          )}
        </div>

        <PlateSeparator />

        <div className={styles.plateRow}>
          <Text as="span" size="caption" tone="tertiary">
            Evidence
          </Text>
          <Text as="span" size="body-sm" tone="secondary">
            {inspection.evidenceCaption}
          </Text>
        </div>

        <PlateSeparator />

        <div className={styles.plateBlock}>
          <Text as="span" size="caption" tone="tertiary">
            Artifacts
          </Text>
          {inspection.artifacts.length > 0 ? (
            <ol
              className={styles.artifactChain}
              aria-label={`Artifacts for ${inspection.id}`}
            >
              {inspection.artifacts.map((label) => (
                <li key={label}>
                  <Text as="span" size="body-sm" tone="secondary">
                    {label}
                  </Text>
                </li>
              ))}
            </ol>
          ) : (
            <Text as="span" size="body-sm" tone="tertiary">
              Missing
            </Text>
          )}
        </div>
      </div>
    </figure>
  );
}
