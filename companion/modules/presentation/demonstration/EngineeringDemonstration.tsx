"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { Link, Text } from "@/modules/presentation/primitives";
import { usePrefersReducedMotion } from "@/modules/enhancement/motion/usePrefersReducedMotion";
import {
  architectureStageAddress,
  relatedRefFromLink,
  useOptionalEngineeringContext,
} from "@/modules/presentation/engineering";
import type {
  DemonstrationModel,
  DemonstrationStage,
} from "./inspectDemonstration";
import styles from "./EngineeringDemonstration.module.css";

type EngineeringDemonstrationProps = {
  model: DemonstrationModel;
};

function PlateSeparator() {
  return (
    <Text as="span" size="caption" tone="tertiary" aria-hidden="true">
      ↓
    </Text>
  );
}

function TextRow({ title, value }: { title: string; value: string }) {
  return (
    <div className={styles.plateRow}>
      <Text as="span" size="caption" tone="tertiary">
        {title}
      </Text>
      <Text as="span" size="body-sm" tone="secondary">
        {value}
      </Text>
    </div>
  );
}

function LinkBlock({
  title,
  links,
}: {
  title: string;
  links: DemonstrationStage["relatedDecisions"];
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
 * Engineering Demonstration — inspect confirmed pipeline stages.
 * Synchronizes through EngineeringContext. No invented stages.
 */
export function EngineeringDemonstration({
  model,
}: EngineeringDemonstrationProps) {
  const { stages } = model;
  const groupId = useId();
  const reduced = usePrefersReducedMotion();
  const engineering = useOptionalEngineeringContext();
  const controlRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const liveRef = useRef<HTMLDivElement | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (
      !engineering?.focus ||
      engineering.focus.kind !== "architecture-stage"
    ) {
      return;
    }
    const index = stages.findIndex(
      (stage) => stage.id === engineering.focus?.id,
    );
    if (index >= 0) {
      setSelectedIndex(index);
    }
  }, [engineering?.focus, stages]);

  const safeIndex = Math.min(selectedIndex, stages.length - 1);
  const active = stages[safeIndex] ?? null;

  useEffect(() => {
    if (!active || !liveRef.current) {
      return;
    }
    liveRef.current.textContent = `Demonstration stage · ${active.label}`;
  }, [active]);

  function publishFocus(index: number) {
    const stage = stages[index];
    if (!stage || !engineering) {
      return;
    }
    engineering.setFocus({
      kind: "architecture-stage",
      id: stage.id,
      label: stage.label,
      projectSlug: model.projectSlug,
      related: [
        ...stage.relatedDecisions.map((link) =>
          relatedRefFromLink(link.href, link.label),
        ),
        ...stage.relatedValidation.map((link) =>
          relatedRefFromLink(link.href, link.label),
        ),
        ...stage.relatedFailures.map((link) =>
          relatedRefFromLink(link.href, link.label),
        ),
        ...stage.relatedSystems.map((link) =>
          relatedRefFromLink(link.href, link.label),
        ),
        ...stage.relatedKnowledge.map((link) =>
          relatedRefFromLink(link.href, link.label),
        ),
        ...stage.relatedCapabilities.map((link) =>
          relatedRefFromLink(link.href, link.label),
        ),
      ],
      source: "engineering-demonstration",
    });
  }

  function selectStage(index: number, focus = false) {
    setSelectedIndex(index);
    publishFocus(index);
    if (focus) {
      controlRefs.current[index]?.focus();
    }
  }

  function onStageKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      selectStage((index + 1) % stages.length, true);
      return;
    }
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      selectStage((index - 1 + stages.length) % stages.length, true);
      return;
    }
    if (event.key === "Home") {
      event.preventDefault();
      selectStage(0, true);
      return;
    }
    if (event.key === "End") {
      event.preventDefault();
      selectStage(stages.length - 1, true);
    }
  }

  if (stages.length === 0 || !active) {
    return null;
  }

  return (
    <div
      className={styles.root}
      data-eos-demonstration=""
      data-eos-demonstration-motion={reduced ? "reduce" : "full"}
      data-eos-demonstration-stage={active.id}
    >
      <div className={styles.live} aria-live="polite" ref={liveRef} />

      <div
        className={styles.scrubber}
        role="radiogroup"
        aria-label="Confirmed pipeline demonstration stages"
        id={groupId}
      >
        <ol className={styles.scrubberList}>
          {stages.map((stage, index) => {
            const selected = index === safeIndex;
            return (
              <li key={stage.id} className={styles.scrubberItem}>
                <button
                  type="button"
                  role="radio"
                  className={styles.scrubberControl}
                  data-eos-eng-item=""
                  data-eos-eng-match={selected ? "true" : "false"}
                  data-eos-demonstration-active={selected ? "true" : "false"}
                  aria-checked={selected}
                  tabIndex={selected ? 0 : -1}
                  id={`demonstration-${stage.id}`}
                  ref={(node) => {
                    controlRefs.current[index] = node;
                  }}
                  onClick={() => selectStage(index)}
                  onKeyDown={(event) => onStageKeyDown(event, index)}
                >
                  <Text as="span" size="caption" tone="tertiary">
                    {String(index + 1).padStart(2, "0")}
                  </Text>
                  <Text
                    as="span"
                    size="body-sm"
                    tone={selected ? "primary" : "tertiary"}
                  >
                    {stage.label}
                  </Text>
                </button>
                {index < stages.length - 1 ? (
                  <Text
                    as="span"
                    size="caption"
                    tone="tertiary"
                    className={styles.scrubberRule}
                    aria-hidden="true"
                  >
                    →
                  </Text>
                ) : null}
              </li>
            );
          })}
        </ol>
      </div>

      <div
        className={styles.plate}
        aria-live="polite"
        data-eos-demonstration-plate=""
        data-eos-demonstration-active="true"
      >
        <Text as="span" size="caption" tone="tertiary">
          Demonstration · {active.position} · {active.confidenceCaption}
        </Text>

        <TextRow title="Current stage" value={active.label} />
        <PlateSeparator />
        <TextRow title="Purpose" value={active.purposeText} />
        <PlateSeparator />
        <TextRow title="Confirmed inputs" value={active.inputsText} />
        <PlateSeparator />
        <TextRow title="Confirmed outputs" value={active.outputsText} />
        <PlateSeparator />
        <LinkBlock title="Related decision" links={active.relatedDecisions} />
        <PlateSeparator />
        <LinkBlock title="Validation" links={active.relatedValidation} />
        <PlateSeparator />
        <LinkBlock title="Failure modes" links={active.relatedFailures} />
        <PlateSeparator />
        <LinkBlock title="Atlas systems" links={active.relatedSystems} />
        <PlateSeparator />
        <LinkBlock title="Knowledge graph" links={active.relatedKnowledge} />
        <PlateSeparator />
        <LinkBlock
          title="Capability Atlas"
          links={active.relatedCapabilities}
        />
        <PlateSeparator />
        <div className={styles.plateBlock}>
          <Text as="span" size="caption" tone="tertiary">
            Artifacts
          </Text>
          {active.artifacts.length > 0 ? (
            <ol className={styles.relatedList} aria-label="Stage artifacts">
              {active.artifacts.map((label) => (
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
        <div className={styles.plateBlock}>
          <Text as="span" size="caption" tone="tertiary">
            Evidence
          </Text>
          <Text as="span" size="body-sm" tone="secondary">
            Confirmed architecture prose · address #
            {architectureStageAddress(active.label)}
          </Text>
          {model.relatedEvidence.length > 0 ? (
            <ul className={styles.relatedList}>
              {model.relatedEvidence.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} tone="secondary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <PlateSeparator />
        <div className={styles.plateBlock}>
          <Text as="span" size="caption" tone="tertiary">
            Provenance
          </Text>
          {active.provenance.length > 0 ? (
            <ol className={styles.relatedList} aria-label="Stage provenance">
              {active.provenance.map((label) => (
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
    </div>
  );
}
