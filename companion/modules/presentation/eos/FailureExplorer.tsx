"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { Link, Text } from "@/modules/presentation/primitives";
import { useOptionalWalkthrough } from "@/modules/presentation/eos/WalkthroughContext";
import {
  focusMatchesItem,
  relatedRefFromLink,
  useOptionalEngineeringContext,
} from "@/modules/presentation/engineering";
import type { FailureInspection } from "./inspectFailure";
import styles from "./DecisionExplorer.module.css";

type FailureExplorerProps = {
  /** Precomputed inspections — server-built from confirmed failure evidence only. */
  inspections: FailureInspection[];
};

function PlateSeparator() {
  return (
    <Text as="span" size="caption" tone="tertiary" aria-hidden="true">
      ↓
    </Text>
  );
}

function LinkBlock({
  title,
  links,
}: {
  title: string;
  links: FailureInspection["relatedArchitecture"];
}) {
  return (
    <div className={styles.plateBlock}>
      <Text as="span" size="caption" tone="tertiary">
        {title}
      </Text>
      {links.length > 0 ? (
        <ul className={styles.relatedList}>
          {links.map((link) => (
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
  );
}

/**
 * Failure & Resilience Explorer — inspect how systems behave when things go wrong.
 * Receives server-built inspections only (no Node loaders on the client).
 * Missing stays Missing. Deferred stays Deferred.
 */
export function FailureExplorer({ inspections }: FailureExplorerProps) {
  const groupId = useId();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const controlRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const walkthrough = useOptionalWalkthrough();
  const engineering = useOptionalEngineeringContext();

  useEffect(() => {
    if (
      walkthrough?.activeRoomId === "failures" ||
      walkthrough?.activeRoomId === "validation"
    ) {
      setSelectedIndex(0);
    }
  }, [walkthrough?.activeRoomId]);

  useEffect(() => {
    if (!engineering?.focus || inspections.length === 0) {
      return;
    }
    const index = inspections.findIndex((entry) =>
      focusMatchesItem(engineering.focus, {
        kind: "failure",
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
        kind: "failure",
        id: entry.id,
        label: entry.label,
        related: [
          ...entry.relatedArchitecture.map((link) =>
            relatedRefFromLink(link.href, link.label),
          ),
          ...entry.relatedDecision.map((link) =>
            relatedRefFromLink(link.href, link.label),
          ),
          ...entry.relatedValidation.map((link) =>
            relatedRefFromLink(link.href, link.label),
          ),
          ...entry.relatedSystems.map((link) =>
            relatedRefFromLink(link.href, link.label),
          ),
        ],
        source: "failure-explorer",
      },
      { syncHash: false },
    );
  }

  function selectFailure(index: number, focus = false) {
    setSelectedIndex(index);
    publishFocus(index);
    if (focus) {
      controlRefs.current[index]?.focus();
    }
  }

  function onFailureKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      selectFailure((index + 1) % inspections.length, true);
      return;
    }
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      selectFailure(
        (index - 1 + inspections.length) % inspections.length,
        true,
      );
      return;
    }
    if (event.key === "Home") {
      event.preventDefault();
      selectFailure(0, true);
      return;
    }
    if (event.key === "End") {
      event.preventDefault();
      selectFailure(inspections.length - 1, true);
    }
  }

  return (
    <figure className={styles.figure}>
      <figcaption className={styles.caption}>
        <Text as="span" size="caption" tone="tertiary">
          Failure inspection — scenarios from confirmed engineering evidence
        </Text>
      </figcaption>

      <div
        className={styles.decisionGroup}
        role="radiogroup"
        aria-label="Confirmed failure scenarios"
        id={groupId}
      >
        <ol className={styles.list}>
          {inspections.map((entry, index) => {
            const selectedControl = index === safeIndex;
            const matched = focusMatchesItem(engineering?.focus ?? null, {
              kind: "failure",
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
                  onClick={() => selectFailure(index)}
                  onKeyDown={(event) => onFailureKeyDown(event, index)}
                >
                  <Text as="span" size="caption" tone="tertiary">
                    {String(index + 1).padStart(2, "0")}
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
        data-eos-failure-plate=""
      >
        <Text as="span" size="caption" tone="tertiary">
          Failure inspection · {inspection.label}
        </Text>

        <div className={styles.plateRow}>
          <Text as="span" size="caption" tone="tertiary">
            Failure
          </Text>
          <Text as="span" size="body-sm" tone="secondary">
            {inspection.failureText}
          </Text>
        </div>

        <PlateSeparator />

        <div className={styles.plateRow}>
          <Text as="span" size="caption" tone="tertiary">
            Why it occurs
          </Text>
          <Text as="span" size="body-sm" tone="secondary">
            {inspection.whyText}
          </Text>
        </div>

        <PlateSeparator />

        <div className={styles.plateRow}>
          <Text as="span" size="caption" tone="tertiary">
            Detection
          </Text>
          <Text as="span" size="body-sm" tone="secondary">
            {inspection.detectionText}
          </Text>
        </div>

        <PlateSeparator />

        <div className={styles.plateRow}>
          <Text as="span" size="caption" tone="tertiary">
            Mitigation
          </Text>
          <Text as="span" size="body-sm" tone="secondary">
            {inspection.mitigationText}
          </Text>
        </div>

        <PlateSeparator />

        <div className={styles.plateRow}>
          <Text as="span" size="caption" tone="tertiary">
            Recovery behavior
          </Text>
          <Text as="span" size="body-sm" tone="secondary">
            {inspection.recoveryText}
          </Text>
        </div>

        <PlateSeparator />

        <div className={styles.plateRow}>
          <Text as="span" size="caption" tone="tertiary">
            Remaining limitation
          </Text>
          <Text as="span" size="body-sm" tone="secondary">
            {inspection.limitationText}
          </Text>
        </div>

        <PlateSeparator />

        <LinkBlock
          title="Related architecture"
          links={inspection.relatedArchitecture}
        />

        <PlateSeparator />

        <LinkBlock
          title="Related decision"
          links={inspection.relatedDecision}
        />

        <PlateSeparator />

        <LinkBlock
          title="Related validation"
          links={inspection.relatedValidation}
        />

        <PlateSeparator />

        <LinkBlock
          title="Related Atlas systems"
          links={inspection.relatedSystems}
        />

        <PlateSeparator />

        <div className={styles.plateRow}>
          <Text as="span" size="caption" tone="tertiary">
            Evidence
          </Text>
          <Text as="span" size="body-sm" tone="secondary">
            {inspection.evidenceText}
          </Text>
        </div>

        <PlateSeparator />

        <div className={styles.plateBlock}>
          <Text as="span" size="caption" tone="tertiary">
            Provenance
          </Text>
          {inspection.provenance.length > 0 &&
          inspection.provenance[0] !== "Missing" ? (
            <ol
              className={styles.artifactChain}
              aria-label={`Provenance for ${inspection.id}`}
            >
              {inspection.provenance.map((label) => (
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

        <PlateSeparator />

        <div className={styles.plateRow}>
          <Text as="span" size="caption" tone="tertiary">
            Confidence
          </Text>
          <Text as="span" size="body-sm" tone="secondary">
            {inspection.confidenceCaption}
          </Text>
        </div>
      </div>
    </figure>
  );
}
