import {
  discloseEvidenceStringList,
  projectDisplayTitle,
  projectTierLabel,
  type ProjectContent,
} from "@/modules/meaning";
import { COMPANION_PATHS } from "@/modules/experience/routes";
import { Heading, Link, Text } from "@/modules/presentation/primitives";
import styles from "./ArchiveList.module.css";

type ArchiveListProps = {
  projects: ProjectContent[];
};

/**
 * Engineering library index — reading hierarchy, not marketing cards.
 */
export function ArchiveList({ projects }: ArchiveListProps) {
  const groups: Array<{
    tier: ProjectContent["tier"];
    items: ProjectContent[];
  }> = [
    {
      tier: "flagship",
      items: projects.filter((project) => project.tier === "flagship"),
    },
    {
      tier: "supporting",
      items: projects.filter((project) => project.tier === "supporting"),
    },
    {
      tier: "archive",
      items: projects.filter((project) => project.tier === "archive"),
    },
  ];

  return (
    <div className={styles.root}>
      {groups.map((group) =>
        group.items.length === 0 ? null : (
          <section
            key={group.tier}
            className={styles.group}
            aria-labelledby={`tier-${group.tier}`}
          >
            <Heading
              level={2}
              id={`tier-${group.tier}`}
              className={styles.tier}
            >
              {projectTierLabel(group.tier)}
            </Heading>
            <ul className={styles.list}>
              {group.items.map((project) => {
                const types = discloseEvidenceStringList(project.typeLabels);
                return (
                  <li key={project.id} className={styles.item}>
                    <Link
                      href={COMPANION_PATHS.project(project.slug)}
                      tone="secondary"
                      className={styles.title}
                    >
                      {projectDisplayTitle(project)}
                    </Link>
                    {types.status === "confirmed" && types.text ? (
                      <Text
                        as="p"
                        size="body-sm"
                        tone="tertiary"
                        className={styles.summary}
                      >
                        {types.text}
                      </Text>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </section>
        ),
      )}
    </div>
  );
}
