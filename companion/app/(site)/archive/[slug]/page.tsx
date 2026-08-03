import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Reveal } from "@/modules/enhancement/motion";
import { COMPANION_PATHS, getCaseStudyOrientation } from "@/modules/experience";
import {
  getArchiveProjects,
  getIdentity,
  getProjectBySlug,
  getProjectNetwork,
  projectDisplayTitle,
} from "@/modules/meaning";
import { CaseStudyDocument } from "@/modules/presentation/case-study";
import { EosLocation } from "@/modules/presentation/eos";
import { Section, Stack } from "@/modules/presentation/layout";
import { Link, Text } from "@/modules/presentation/primitives";
import styles from "../../document.module.css";

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams(): Array<{ slug: string }> {
  return getArchiveProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project || !project.includeInArchive) {
    return {
      title: "Case study",
      robots: { index: false, follow: false },
    };
  }

  const identity = getIdentity();
  const title = projectDisplayTitle(project);
  const description =
    project.objective.status === "confirmed"
      ? project.objective.value
      : project.caseStudy.overview.status === "confirmed"
        ? project.caseStudy.overview.value
        : `Engineering case study — ${title}`;
  const path = COMPANION_PATHS.project(project.slug);
  const ogTitle = `${title} · EOS`;

  return {
    title,
    description,
    authors: [{ name: identity.name, url: identity.githubProfileUrl }],
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: ogTitle,
      description,
      url: path,
      type: "article",
    },
    twitter: {
      card: "summary",
      title: ogTitle,
      description,
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project || !project.includeInArchive) {
    notFound();
  }

  const orientation = getCaseStudyOrientation(project);
  const network = getProjectNetwork(project.id);
  const primarySystem = network.systems[0] ?? null;

  const locationSegments = [
    { label: "Companion", href: COMPANION_PATHS.home },
    { label: "Product Archive", href: COMPANION_PATHS.archive },
    {
      label: "Engineering Systems Atlas",
      href: primarySystem?.href ?? COMPANION_PATHS.atlas,
    },
    ...(primarySystem
      ? [{ label: primarySystem.title, href: primarySystem.href }]
      : []),
    { label: project.name },
  ];

  return (
    <div className={styles.article}>
      <Reveal step={0}>
        <nav className={styles.block} aria-label="Case study location">
          <Stack gap={4}>
            <EosLocation segments={locationSegments} />
            <Link href={COMPANION_PATHS.archive} tone="secondary">
              ← {orientation.returnLabel}
            </Link>
          </Stack>
        </nav>
      </Reveal>

      <Reveal step={1}>
        <CaseStudyDocument project={project} orientationWhy={orientation.why} />
      </Reveal>

      <Reveal step={2}>
        <Section gap={4} className={styles.block}>
          <Stack gap={3}>
            <Link href={COMPANION_PATHS.atlas} tone="secondary">
              Engineering Systems Atlas
            </Link>
            <Link href={COMPANION_PATHS.archive} tone="secondary">
              Product Archive
            </Link>
            <Link href={COMPANION_PATHS.home} tone="secondary">
              Companion
            </Link>
            <Text as="p" size="caption" tone="tertiary">
              Next: {orientation.next}
            </Text>
          </Stack>
        </Section>
      </Reveal>
    </div>
  );
}
