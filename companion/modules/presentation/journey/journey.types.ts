export type JourneyLink = {
  href: string;
  label: string;
};

export type JourneyConnection = {
  /** Target station hash id. */
  toStationId: string;
  /** Confirmed engineering relation — never decorative. */
  relation: string;
  /** Optional shared entity that justifies the connection. */
  via?: JourneyLink;
};

export type JourneyStation = {
  /** Hash id without # — stable deep link. */
  id: string;
  /** Atlas evolution id for provenance. */
  evolutionId: string;
  title: string;
  /** Confirmed “what changed” summary. */
  summary: string;
  year: string;
  announce: string;
  projects: JourneyLink[];
  capabilities: JourneyLink[];
  /** Capability atlas node ids for synchronization. */
  capabilityIds: string[];
  architecture: JourneyLink[];
  decisions: JourneyLink[];
  validation: JourneyLink[];
  atlasSystems: JourneyLink[];
  knowledge: JourneyLink[];
  evidence: JourneyLink[];
  connections: JourneyConnection[];
  confidenceCaption: string;
};

export type JourneyModel = {
  stations: JourneyStation[];
};

export function isJourneyStationId(
  value: string,
  stations: JourneyStation[],
): boolean {
  return stations.some((station) => station.id === value);
}
