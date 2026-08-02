import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../lib/cx";
import { Heading } from "./Heading";
import { Text } from "./Text";
import styles from "./SystemState.module.css";

type StateFrameProps = HTMLAttributes<HTMLDivElement> & {
  title: string;
  description?: string;
  action?: ReactNode;
  children?: ReactNode;
};

function StateFrame({
  title,
  description,
  action,
  children,
  className,
  ...rest
}: StateFrameProps) {
  return (
    <div className={cx(styles.root, className)} {...rest}>
      <Heading level={3}>{title}</Heading>
      {description ? <Text tone="secondary">{description}</Text> : null}
      {children}
      {action ? <div className={styles.action}>{action}</div> : null}
    </div>
  );
}

type EmptyStateProps = StateFrameProps;

export function EmptyState(props: EmptyStateProps) {
  return <StateFrame role="status" {...props} />;
}

type LoadingStateProps = Omit<StateFrameProps, "title"> & {
  title?: string;
};

export function LoadingState({
  title = "Loading",
  description = "Preparing content.",
  ...rest
}: LoadingStateProps) {
  return (
    <StateFrame
      role="status"
      aria-live="polite"
      title={title}
      description={description}
      {...rest}
    />
  );
}

type ErrorStateProps = StateFrameProps;

export function ErrorState({
  title = "Something went wrong",
  ...rest
}: ErrorStateProps) {
  return <StateFrame role="alert" title={title} {...rest} />;
}

type SuccessStateProps = StateFrameProps;

export function SuccessState({
  title = "Complete",
  ...rest
}: SuccessStateProps) {
  return <StateFrame role="status" title={title} {...rest} />;
}
