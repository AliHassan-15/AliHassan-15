"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { Link, Text } from "@/modules/presentation/primitives";
import { usePrefersReducedMotion } from "@/modules/enhancement/motion/usePrefersReducedMotion";
import { CapabilityAtlas } from "@/modules/presentation/capability/CapabilityAtlas";
import type { CapabilityAtlasModel } from "@/modules/presentation/capability/inspectCapability";
import {
  focusMatchesItem,
  relatedRefFromLink,
  useOptionalEngineeringContext,
} from "@/modules/presentation/engineering";
import type { JourneyModel, JourneyStation } from "./journey.types";
import styles from "./EngineeringJourney.module.css";

type EngineeringJourneyProps = {
  model: JourneyModel;
  capabilityModel: CapabilityAtlasModel;
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
  emphasize,
}: {
  title: string;
  links: JourneyStation["projects"];
  emphasize: boolean;
}) {
  return (
    <div
      className={styles.plateBlock}
      data-eos-journey-sync={emphasize ? "true" : "false"}
    >
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
 * Engineering Journey — causal stations from confirmed Atlas evolution.
 * Horizontal on desktop, stacked on mobile. Synchronizes Capability Atlas.
 */
export function EngineeringJourney({
  model,
  capabilityModel,
}: EngineeringJourneyProps) {
  const { stations } = model;
  const groupId = useId();
  const reduced = usePrefersReducedMotion();
  const controlRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const liveRef = useRef<HTMLDivElement | null>(null);
  const [activeId, setActiveId] = useState(stations[0]?.id ?? "");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const engineering = useOptionalEngineeringContext();

  const activeIndex = Math.max(
    0,
    stations.findIndex((station) => station.id === activeId),
  );
  const activeStation = stations[activeIndex] ?? stations[0] ?? null;
  const highlightId = hoveredId ?? activeId;

  const syncedCapabilityId =
    activeStation?.capabilityIds[0] ??
    capabilityModel.inspections[0]?.id ??
    null;

  useEffect(() => {
    if (
      engineering?.focus?.kind === "journey-station" &&
      stations.some((station) => station.id === engineering.focus?.id)
    ) {
      setActiveId(engineering.focus.id);
    }
  }, [engineering?.focus, stations]);

  useEffect(() => {
    if (!activeStation || !liveRef.current) {
      return;
    }
    liveRef.current.textContent = activeStation.announce;
  }, [activeStation]);

  useEffect(() => {
    if (!activeStation || !trackRef.current) {
      return;
    }
    const node = trackRef.current.querySelector<HTMLElement>(
      `[data-eos-journey-station="${activeStation.id}"]`,
    );
    if (!node) {
      return;
    }
    node.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [activeStation, reduced]);

  function selectStation(index: number, focus = false) {
    const station = stations[index];
    if (!station) {
      return;
    }
    setActiveId(station.id);
    engineering?.setFocus({
      kind: "journey-station",
      id: station.id,
      label: station.title,
      related: [
        ...station.projects.map((link) =>
          relatedRefFromLink(link.href, link.label),
        ),
        ...station.architecture.map((link) =>
          relatedRefFromLink(link.href, link.label),
        ),
        ...station.decisions.map((link) =>
          relatedRefFromLink(link.href, link.label),
        ),
        ...station.validation.map((link) =>
          relatedRefFromLink(link.href, link.label),
        ),
        ...station.atlasSystems.map((link) =>
          relatedRefFromLink(link.href, link.label),
        ),
        ...station.capabilities.map((link) =>
          relatedRefFromLink(link.href, link.label),
        ),
      ],
      source: "journey",
    });
    if (focus) {
      controlRefs.current[index]?.focus();
    }
  }

  function onStationKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      selectStation((index + 1) % stations.length, true);
      return;
    }
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      selectStation((index - 1 + stations.length) % stations.length, true);
      return;
    }
    if (event.key === "Home") {
      event.preventDefault();
      selectStation(0, true);
      return;
    }
    if (event.key === "End") {
      event.preventDefault();
      selectStation(stations.length - 1, true);
    }
  }

  if (stations.length === 0) {
    return (
      <div className={styles.missing}>
        <Text as="span" size="body-sm" tone="tertiary">
          Missing — no confirmed journey stations.
        </Text>
      </div>
    );
  }

  return (
    <div
      className={styles.root}
      data-eos-journey=""
      data-eos-journey-motion={reduced ? "reduce" : "full"}
      data-eos-journey-station-active={activeId}
    >
      <div className={styles.live} aria-live="polite" ref={liveRef} />

      <div
        className={styles.track}
        ref={trackRef}
        role="radiogroup"
        aria-label="Engineering journey stations"
        id={groupId}
      >
        {stations.map((station, index) => {
          const selected = station.id === activeId;
          const dimmed = highlightId !== station.id;
          return (
            <div key={station.id} className={styles.stationWrap}>
              <button
                type="button"
                role="radio"
                className={styles.station}
                data-eos-journey-station={station.id}
                data-eos-station-active={selected ? "true" : "false"}
                data-eos-station-dimmed={dimmed ? "true" : "false"}
                data-eos-eng-item=""
                data-eos-eng-match={
                  focusMatchesItem(engineering?.focus ?? null, {
                    kind: "journey-station",
                    id: station.id,
                    label: station.title,
                  })
                    ? "true"
                    : "false"
                }
                aria-checked={selected}
                tabIndex={selected ? 0 : -1}
                id={station.id}
                ref={(node) => {
                  controlRefs.current[index] = node;
                }}
                onClick={() => selectStation(index)}
                onKeyDown={(event) => onStationKeyDown(event, index)}
                onMouseEnter={() => setHoveredId(station.id)}
                onMouseLeave={() => setHoveredId(null)}
                onFocus={() => setHoveredId(station.id)}
                onBlur={() => setHoveredId(null)}
              >
                <Text as="span" size="caption" tone="tertiary">
                  {station.year}
                </Text>
                <Text as="span" size="body" tone="primary">
                  {station.title}
                </Text>
                <Text as="span" size="body-sm" tone="secondary">
                  {station.summary}
                </Text>
              </button>
              {index < stations.length - 1 ? (
                <Text
                  as="span"
                  size="caption"
                  tone="tertiary"
                  className={styles.connector}
                  aria-hidden="true"
                >
                  →
                </Text>
              ) : null}
            </div>
          );
        })}
      </div>

      {activeStation ? (
        <div
          className={styles.plate}
          aria-live="polite"
          data-eos-journey-plate=""
        >
          <Text as="span" size="caption" tone="tertiary">
            Journey inspection · {activeStation.year} ·{" "}
            {activeStation.confidenceCaption}
          </Text>

          <div className={styles.plateRow}>
            <Text as="span" size="caption" tone="tertiary">
              Station
            </Text>
            <Text as="span" size="body-sm" tone="secondary">
              {activeStation.title}
            </Text>
          </div>

          <PlateSeparator />

          <div className={styles.plateRow}>
            <Text as="span" size="caption" tone="tertiary">
              What changed
            </Text>
            <Text as="span" size="body-sm" tone="secondary">
              {activeStation.summary}
            </Text>
          </div>

          <PlateSeparator />

          <LinkBlock
            title="Projects introduced"
            links={activeStation.projects}
            emphasize={Boolean(highlightId)}
          />
          <PlateSeparator />
          <LinkBlock
            title="Capabilities introduced"
            links={activeStation.capabilities}
            emphasize={Boolean(highlightId)}
          />
          <PlateSeparator />
          <LinkBlock
            title="Architecture patterns"
            links={activeStation.architecture}
            emphasize={Boolean(highlightId)}
          />
          <PlateSeparator />
          <LinkBlock
            title="Decision records"
            links={activeStation.decisions}
            emphasize={Boolean(highlightId)}
          />
          <PlateSeparator />
          <LinkBlock
            title="Validation methods"
            links={activeStation.validation}
            emphasize={Boolean(highlightId)}
          />
          <PlateSeparator />
          <LinkBlock
            title="Atlas systems"
            links={activeStation.atlasSystems}
            emphasize={Boolean(highlightId)}
          />
          <PlateSeparator />
          <LinkBlock
            title="Knowledge graph"
            links={activeStation.knowledge}
            emphasize={Boolean(highlightId)}
          />
          <PlateSeparator />
          <LinkBlock
            title="Evidence"
            links={activeStation.evidence}
            emphasize={Boolean(highlightId)}
          />

          <PlateSeparator />

          <div className={styles.plateBlock}>
            <Text as="span" size="caption" tone="tertiary">
              Connections
            </Text>
            {activeStation.connections.length > 0 ? (
              <ul className={styles.relatedList}>
                {activeStation.connections.map((connection) => {
                  const target = stations.find(
                    (station) => station.id === connection.toStationId,
                  );
                  return (
                    <li
                      key={`${connection.toStationId}-${connection.relation}-${connection.via?.href ?? ""}`}
                    >
                      <button
                        type="button"
                        className={styles.connectionControl}
                        onClick={() => {
                          const index = stations.findIndex(
                            (station) => station.id === connection.toStationId,
                          );
                          if (index >= 0) {
                            selectStation(index);
                          }
                        }}
                      >
                        <Text as="span" size="body-sm" tone="secondary">
                          {connection.relation}
                          {target ? ` → ${target.title}` : null}
                          {connection.via ? ` · ${connection.via.label}` : null}
                        </Text>
                      </button>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <Text as="span" size="body-sm" tone="tertiary">
                Missing
              </Text>
            )}
          </div>
        </div>
      ) : null}

      {capabilityModel.inspections.length > 0 ? (
        <div className={styles.capabilitySync} id="systems">
          <Text
            as="p"
            size="caption"
            tone="tertiary"
            className={styles.syncCaption}
          >
            Capability Atlas · synchronized to active station
          </Text>
          <CapabilityAtlas
            model={capabilityModel}
            selectedId={syncedCapabilityId}
            onSelectedIdChange={(id) => {
              if (!id) {
                return;
              }
              const match = stations.find((station) =>
                station.capabilityIds.includes(id),
              );
              if (match) {
                const index = stations.findIndex(
                  (station) => station.id === match.id,
                );
                if (index >= 0) {
                  selectStation(index);
                }
              }
            }}
          />
        </div>
      ) : null}
    </div>
  );
}
