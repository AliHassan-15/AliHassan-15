import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Reveal } from "@/modules/enhancement/motion";
import { COMPANION_PATHS, getCaseStudyOrientation } from "@/modules/experience";
import {
  getArchiveProjects,
  getIdentity,
  getProjectBySlug,
  projectDisplayTitle,
} from "@/modules/meaning";
import { CaseStudyDocument } from "@/modules/presentation/case-study";
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

  return (
    <div className={styles.article}>
      <Reveal step={0}>
        <nav className={styles.block} aria-label="Case study location">
          <Stack gap={2}>
            <Text as="p" size="caption" tone="tertiary">
              {orientation.where}
            </Text>
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
            <Link href={COMPANION_PATHS.archive} tone="secondary">
              Return to Product Archive
            </Link>
            <Link href={COMPANION_PATHS.home} tone="secondary">
              Return to Companion home
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
