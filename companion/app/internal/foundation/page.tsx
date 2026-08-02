import type { Metadata } from "next";
import {
  Button,
  Caption,
  Card,
  Code,
  Divider,
  EmptyState,
  ErrorState,
  FocusRing,
  Heading,
  Icon,
  Label,
  Lead,
  Link,
  LoadingState,
  Muted,
  Paragraph,
  SkipLink,
  SuccessState,
  Text,
  ThemeToggle,
  VisuallyHidden,
} from "@/modules/presentation/primitives";
import {
  Center,
  Cluster,
  Container,
  Grid,
  Inline,
  Section,
  Spacer,
  Stack,
  Surface,
} from "@/modules/presentation/layout";
import styles from "./foundation.module.css";

export const metadata: Metadata = {
  title: "EOS UI Foundation Validation (Internal)",
  robots: {
    index: false,
    follow: false,
  },
};

function DemoIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect
        x="2.5"
        y="2.5"
        width="11"
        height="11"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      <path
        d="M5 8h6M8 5v6"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="square"
      />
    </svg>
  );
}

export default function FoundationValidationPage() {
  return (
    <>
      <SkipLink href="#main" />
      <Container as="main" id="main" width="wide" className={styles.main}>
        <Stack gap={8}>
          <header>
            <Stack gap={4}>
              <Caption>Internal validation · not a product surface</Caption>
              <Heading level={1}>UI foundation</Heading>
              <Lead>
                Primitives and layout abstractions for EOS. Internal validation
                only — not a public product surface.
              </Lead>
              <Cluster gap={3}>
                <ThemeToggle />
                <VisuallyHidden>
                  Theme control for foundation verification only.
                </VisuallyHidden>
              </Cluster>
            </Stack>
          </header>

          <Divider />

          <Section aria-labelledby="type-heading" gap={5}>
            <Heading level={2} id="type-heading">
              Typography
            </Heading>
            <Stack gap={4}>
              <Heading level={1}>Heading 1</Heading>
              <Heading level={2}>Heading 2</Heading>
              <Heading level={3}>Heading 3</Heading>
              <Lead>Lead text for calm supporting context.</Lead>
              <Paragraph>
                Body paragraph using the prose measure. Hierarchy comes from
                roles, not marketing scale.
              </Paragraph>
              <Muted>Muted supporting line.</Muted>
              <Caption>Caption / meta</Caption>
              <Code>const clarity = true;</Code>
              <Text size="body-sm" tone="secondary" mono>
                Secondary mono note
              </Text>
            </Stack>
          </Section>

          <Section aria-labelledby="action-heading" gap={5}>
            <Heading level={2} id="action-heading">
              Actions
            </Heading>
            <Stack gap={4}>
              <Label htmlFor="foundation-demo-label">Label</Label>
              <span id="foundation-demo-label" className={styles.srAnchor}>
                Associated control slot (input deferred)
              </span>
              <Cluster gap={3}>
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="primary" disabled>
                  Disabled
                </Button>
                <Button variant="secondary" loading>
                  Saving
                </Button>
              </Cluster>
              <Inline gap={3}>
                <Link href="/internal/foundation">Internal link</Link>
                <Link href="https://example.com" tone="secondary">
                  External link
                </Link>
                <FocusRing>
                  <button type="button" className={styles.bareControl}>
                    Focus ring host
                  </button>
                </FocusRing>
                <Icon size="md" label="Structural icon">
                  <DemoIcon />
                </Icon>
              </Inline>
            </Stack>
          </Section>

          <Section aria-labelledby="layout-heading" gap={5}>
            <Heading level={2} id="layout-heading">
              Layout
            </Heading>
            <Grid columns={2} gap={4}>
              <Card>
                <Stack gap={3}>
                  <Heading level={3}>Card</Heading>
                  <Text>Structural surface with token padding only.</Text>
                </Stack>
              </Card>
              <Surface bordered className={styles.padded}>
                <Stack gap={3}>
                  <Heading level={3}>Surface</Heading>
                  <Text>Bordered surface without card padding contract.</Text>
                </Stack>
              </Surface>
            </Grid>
            <Spacer size={4} />
            <Center text>
              <Text tone="tertiary">Centered layout primitive</Text>
            </Center>
          </Section>

          <Section aria-labelledby="state-heading" gap={5}>
            <Heading level={2} id="state-heading">
              System states
            </Heading>
            <Grid columns={2} gap={4}>
              <LoadingState />
              <EmptyState
                title="Nothing here yet"
                description="Absence is stated plainly."
              />
              <ErrorState
                title="Unable to load"
                description="The request failed. Try again."
                action={<Button variant="secondary">Retry</Button>}
              />
              <SuccessState
                title="Saved"
                description="Confirmation without celebration."
              />
            </Grid>
          </Section>
        </Stack>
      </Container>
    </>
  );
}
