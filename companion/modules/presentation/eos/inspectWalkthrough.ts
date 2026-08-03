import { discloseEvidenceString, type ProjectContent } from "@/modules/meaning";
import { confirmedDecisionLineages } from "@/modules/presentation/eos/inspectDecision";
import type { WalkthroughRoom } from "./walkthrough.types";

export type { WalkthroughRoom, WalkthroughRoomId } from "./walkthrough.types";
export { isWalkthroughRoomId } from "./walkthrough.types";

/**
 * Build confirmed walkthrough stops for a flagship case study.
 * Non-flagship projects return []. Never invents rooms.
 * Server-only — do not import from client components.
 */
export function buildWalkthroughRooms(
  project: ProjectContent,
): WalkthroughRoom[] {
  if (project.tier !== "flagship") {
    return [];
  }

  const rooms: WalkthroughRoom[] = [
    {
      id: "objective",
      label: "Objective",
      targetId: "case-study-title",
      announce: "Objective room",
    },
  ];

  const architecture = discloseEvidenceString(project.caseStudy.architecture);
  if (architecture.status === "confirmed" && architecture.text) {
    rooms.push({
      id: "architecture",
      label: "Architecture",
      targetId: "section-architecture-section",
      announce: "Architecture room",
    });
  }

  if (
    confirmedDecisionLineages(project.engineeringCaseFile.decisionLineages)
      .length > 0
  ) {
    rooms.push({
      id: "decisions",
      label: "Decisions",
      targetId: "decision-explorer-heading",
      announce: "Decisions room",
    });
  }

  rooms.push({
    id: "validation",
    label: "Validation",
    targetId: "engineering-validation",
    announce: "Validation room",
  });

  rooms.push({
    id: "failures",
    label: "Failures",
    targetId: "failure-resilience",
    announce: "Failures room",
  });

  rooms.push({
    id: "evidence",
    label: "Evidence",
    targetId: "evidence-heading",
    announce: "Evidence room",
  });

  rooms.push({
    id: "references",
    label: "References",
    targetId: "engineering-references-heading",
    announce: "References room",
  });

  return rooms;
}
