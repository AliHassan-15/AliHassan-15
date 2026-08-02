import {
  getIdentity,
  projectDisplayTitle,
  type ProjectContent,
} from "@/modules/meaning";
import {
  COMPANION_PATHS,
  ROUTE_ORIENTATION,
  type CompanionRouteKey,
} from "./routes";

export type Orientation = {
  where: string;
  why: string;
  next: string;
  returnLabel: string;
  returnHref: string;
};

export function getOrientation(route: CompanionRouteKey = "home"): Orientation {
  const entry = ROUTE_ORIENTATION[route];
  const identity = getIdentity();

  if (route === "home") {
    return {
      where: entry.where,
      why: entry.why,
      next: entry.next,
      returnLabel: entry.returnTo.label,
      returnHref: identity.githubEntranceUrl,
    };
  }

  return {
    where: entry.where,
    why: entry.why,
    next: entry.next,
    returnLabel: entry.returnTo.label,
    returnHref: entry.returnTo.href,
  };
}

export function getCaseStudyOrientation(project: ProjectContent): Orientation {
  const title = projectDisplayTitle(project);

  return {
    where: `Companion · Case study · ${project.name}`,
    why: `Engineering review of ${title}.`,
    next: "Return to the Product Archive or Companion home when ready.",
    returnLabel: ROUTE_ORIENTATION.archive.label,
    returnHref: COMPANION_PATHS.archive,
  };
}
