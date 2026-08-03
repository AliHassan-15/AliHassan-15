"use client";

import { useId, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { Link, Text } from "@/modules/presentation/primitives";
import {
  focusMatchesItem,
  relatedRefFromLink,
  useOptionalEngineeringContext,
} from "@/modules/presentation/engineering";
import type {
  CapabilityAtlasModel,
  CapabilityInspection,
} from "./inspectCapability";
import styles from "./CapabilityAtlas.module.css";

type CapabilityAtlasProps = {
  model: CapabilityAtlasModel;
  /** Optional controlled selection for journey / cross-surface sync. */
  selectedId?: string | null;
  onSelectedIdChange?: (id: string | null) => void;
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
  links: CapabilityInspection["projects"];
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

function TextBlock({ title, value }: { title: string; value: string }) {
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

/**
 * Engineering Capability Atlas — deterministic blueprint constellation.
 * No force simulation, badges, percentages, or decorative galaxy language.
 */
export function CapabilityAtlas({
  model,
  selectedId,
  onSelectedIdChange,
}: CapabilityAtlasProps) {
  const groupId = useId();
  const { inspections, layout, edges, viewBox } = model;
  const [internalIndex, setInternalIndex] = useState<number | null>(0);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const controlRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const engineering = useOptionalEngineeringContext();

  const selectedIndex =
    selectedId === undefined
      ? internalIndex
      : selectedId === null
        ? null
        : (() => {
            const index = inspections.findIndex(
              (entry) => entry.id === selectedId,
            );
            return index >= 0 ? index : 0;
          })();

  const layoutById = useMemo(() => {
    const map = new Map<string, { x: number; y: number }>();
    for (const entry of layout) {
      map.set(entry.id, { x: entry.x, y: entry.y });
    }
    return map;
  }, [layout]);

  if (inspections.length === 0) {
    return null;
  }

  const plateOpen = selectedIndex !== null;
  const safeIndex =
    selectedIndex === null
      ? -1
      : Math.min(selectedIndex, inspections.length - 1);
  const inspection = safeIndex >= 0 ? inspections[safeIndex] : null;

  const activeId = inspection?.id ?? hoveredId;
  const connected = new Set(
    activeId
      ? (inspections.find((entry) => entry.id === activeId)?.connectedIds ?? [])
      : [],
  );

  function publishFocus(entry: CapabilityInspection | undefined) {
    if (!entry || !engineering) {
      return;
    }
    engineering.setFocus(
      {
        kind: "capability",
        id: entry.id,
        label: entry.label,
        related: [
          ...entry.projects.map((link) =>
            relatedRefFromLink(link.href, link.label),
          ),
          ...entry.architecture.map((link) =>
            relatedRefFromLink(link.href, link.label),
          ),
          ...entry.decisions.map((link) =>
            relatedRefFromLink(link.href, link.label),
          ),
          ...entry.validation.map((link) =>
            relatedRefFromLink(link.href, link.label),
          ),
          ...entry.failures.map((link) =>
            relatedRefFromLink(link.href, link.label),
          ),
          ...entry.atlasLinks.map((link) =>
            relatedRefFromLink(link.href, link.label),
          ),
        ],
        source: "capability-atlas",
      },
      { syncHash: false },
    );
  }

  function selectCapability(index: number | null, focus = false) {
    if (selectedId !== undefined) {
      const nextId = index === null ? null : (inspections[index]?.id ?? null);
      onSelectedIdChange?.(nextId);
    } else {
      setInternalIndex(index);
    }
    if (index !== null) {
      publishFocus(inspections[index]);
    }
    if (focus && index !== null) {
      controlRefs.current[index]?.focus();
    }
  }

  function onCapabilityKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      selectCapability((index + 1) % inspections.length, true);
      return;
    }
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      selectCapability(
        (index - 1 + inspections.length) % inspections.length,
        true,
      );
      return;
    }
    if (event.key === "Home") {
      event.preventDefault();
      selectCapability(0, true);
      return;
    }
    if (event.key === "End") {
      event.preventDefault();
      selectCapability(inspections.length - 1, true);
      return;
    }
    if (event.key === "Escape") {
      event.preventDefault();
      selectCapability(null);
    }
  }

  return (
    <figure className={styles.figure}>
      <figcaption className={styles.caption}>
        <Text as="span" size="caption" tone="tertiary">
          Capability blueprint — confirmed systems, architecture, technology,
          and validation only
        </Text>
      </figcaption>

      <div className={styles.stage}>
        <svg
          className={styles.field}
          viewBox={`0 0 ${viewBox.width} ${viewBox.height}`}
          role="img"
          aria-label="Engineering capability blueprint field"
        >
          <g className={styles.grid} aria-hidden="true">
            <line x1="40" y1="24" x2="40" y2={viewBox.height - 24} />
            <line
              x1={viewBox.width - 40}
              y1="24"
              x2={viewBox.width - 40}
              y2={viewBox.height - 24}
            />
            <line x1="40" y1="24" x2={viewBox.width - 40} y2="24" />
            <line
              x1="40"
              y1={viewBox.height - 24}
              x2={viewBox.width - 40}
              y2={viewBox.height - 24}
            />
            <text x="48" y="18" className={styles.laneLabel}>
              SYSTEM
            </text>
            <text x="288" y="18" className={styles.laneLabel}>
              ARCHITECTURE
            </text>
            <text x="528" y="18" className={styles.laneLabel}>
              TECHNOLOGY
            </text>
            <text x="768" y="18" className={styles.laneLabel}>
              VALIDATION
            </text>
          </g>

          <g className={styles.edges} aria-hidden="true">
            {edges.map((edge) => {
              const from = layoutById.get(edge.fromId);
              const to = layoutById.get(edge.toId);
              if (!from || !to) {
                return null;
              }
              const lit =
                Boolean(activeId) &&
                (edge.fromId === activeId ||
                  edge.toId === activeId ||
                  (connected.has(edge.fromId) && connected.has(edge.toId)));
              return (
                <line
                  key={edge.id}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  className={lit ? styles.edgeLit : styles.edge}
                />
              );
            })}
          </g>

          <g className={styles.nodes}>
            {inspections.map((entry, index) => {
              const point = layoutById.get(entry.id);
              if (!point) {
                return null;
              }
              const selected = index === safeIndex;
              const related =
                Boolean(activeId) &&
                activeId !== entry.id &&
                connected.has(entry.id);
              const dimmed =
                Boolean(activeId) &&
                !selected &&
                !related &&
                activeId !== entry.id;
              return (
                <g
                  key={entry.id}
                  transform={`translate(${point.x} ${point.y})`}
                  className={
                    selected
                      ? styles.nodeSelected
                      : related
                        ? styles.nodeRelated
                        : dimmed
                          ? styles.nodeDimmed
                          : styles.node
                  }
                  onMouseEnter={() => setHoveredId(entry.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => selectCapability(index)}
                >
                  <title>{`${entry.kindLabel}: ${entry.label}`}</title>
                  <circle r="4.5" className={styles.nodeCore} />
                  <circle r="9" className={styles.nodeRing} />
                  <text x="14" y="4" className={styles.nodeLabel}>
                    {entry.label.length > 22
                      ? `${entry.label.slice(0, 20)}…`
                      : entry.label}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>

        <div
          className={styles.listGroup}
          role="radiogroup"
          aria-label="Confirmed engineering capabilities"
          id={groupId}
        >
          <ol className={styles.list}>
            {inspections.map((entry, index) => {
              const selected = index === safeIndex;
              const matched = focusMatchesItem(engineering?.focus ?? null, {
                kind: "capability",
                id: entry.id,
                label: entry.label,
              });
              return (
                <li
                  key={entry.id}
                  className={styles.listItem}
                  id={`capability-${entry.id}`}
                >
                  <button
                    type="button"
                    role="radio"
                    className={styles.control}
                    data-eos-eng-item=""
                    data-eos-eng-match={matched ? "true" : "false"}
                    aria-checked={selected}
                    tabIndex={
                      selected || (safeIndex < 0 && index === 0) ? 0 : -1
                    }
                    ref={(node) => {
                      controlRefs.current[index] = node;
                    }}
                    onClick={() => selectCapability(index)}
                    onKeyDown={(event) => onCapabilityKeyDown(event, index)}
                    onMouseEnter={() => setHoveredId(entry.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    <Text as="span" size="caption" tone="tertiary">
                      {entry.serial}
                    </Text>
                    <span className={styles.controlBody}>
                      <Text as="span" size="caption" tone="tertiary">
                        {entry.kindLabel}
                      </Text>
                      <Text as="span" size="body" tone="primary">
                        {entry.label}
                      </Text>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      {plateOpen && inspection ? (
        <div
          className={styles.plate}
          aria-live="polite"
          data-eos-capability-plate=""
        >
          <div className={styles.plateHeader}>
            <Text as="span" size="caption" tone="tertiary">
              Capability inspection · {inspection.serial}
            </Text>
            <button
              type="button"
              className={styles.close}
              onClick={() => selectCapability(null)}
            >
              Close
            </button>
          </div>

          <TextBlock title="Capability" value={inspection.label} />
          <PlateSeparator />
          <TextBlock title="Description" value={inspection.descriptionText} />
          <PlateSeparator />
          <LinkBlock title="Confirmed projects" links={inspection.projects} />
          <PlateSeparator />
          <LinkBlock
            title="Architecture systems"
            links={inspection.architecture}
          />
          <PlateSeparator />
          <LinkBlock title="Decision records" links={inspection.decisions} />
          <PlateSeparator />
          <LinkBlock title="Validation" links={inspection.validation} />
          <PlateSeparator />
          <TextBlock
            title="Known limitations"
            value={inspection.limitationsText}
          />
          <PlateSeparator />
          <TextBlock title="Evidence" value={inspection.evidenceText} />
          <PlateSeparator />
          <div className={styles.plateBlock}>
            <Text as="span" size="caption" tone="tertiary">
              Artifacts
            </Text>
            <ul className={styles.relatedList}>
              {inspection.artifacts.map((artifact) => (
                <li key={artifact}>
                  <Text as="span" size="body-sm" tone="secondary">
                    {artifact}
                  </Text>
                </li>
              ))}
            </ul>
          </div>
          <PlateSeparator />
          <LinkBlock
            title="Related capabilities"
            links={inspection.relatedCapabilities}
          />
          <PlateSeparator />
          <LinkBlock title="Atlas links" links={inspection.atlasLinks} />
          <PlateSeparator />
          <LinkBlock
            title="Knowledge graph links"
            links={inspection.knowledgeLinks}
          />
          <PlateSeparator />
          <div className={styles.plateBlock}>
            <Text as="span" size="caption" tone="tertiary">
              Provenance
            </Text>
            <ul className={styles.relatedList}>
              {inspection.provenance.map((item) => (
                <li key={item}>
                  <Text as="span" size="body-sm" tone="secondary">
                    {item}
                  </Text>
                </li>
              ))}
            </ul>
          </div>
          <PlateSeparator />
          <TextBlock title="Confidence" value={inspection.confidenceCaption} />
        </div>
      ) : (
        <div className={styles.plateIdle}>
          <Text as="span" size="body-sm" tone="tertiary">
            Select a capability to inspect confirmed projects, architecture,
            decisions, validation, and Atlas links.
          </Text>
        </div>
      )}
    </figure>
  );
}
