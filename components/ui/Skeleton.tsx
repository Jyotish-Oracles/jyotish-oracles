interface SkeletonProps {
  className?: string;
}

export default function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-surface-alt ${className}`}
      role="status"
      aria-label="Loading"
    />
  );
}
