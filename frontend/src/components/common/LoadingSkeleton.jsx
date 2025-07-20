import { twMerge } from "tailwind-merge";

const LoadingSkeleton = ({ className }) => {
  return (
    <div
      className={twMerge(
        "relative h-full w-full animate-pulse overflow-hidden rounded bg-neutral-200 dark:bg-neutral-600",
        className,
      )}
    />
  );
};

export default LoadingSkeleton;
