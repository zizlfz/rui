import "./Skeleton.css";
import { cn } from "#/utils/classname";
import { Skeleton } from "./Skeleton";

interface SkeletonTextProps {
  lines?: number;
  animate?: boolean;
  className?: string;
}

export function SkeletonText({
  lines = 3,
  animate = true,
  className,
}: SkeletonTextProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {Array.from({ length: lines }).map((_, index) => {
        const isLastLine = index === lines - 1;
        const isSecondToLast = index === lines - 2;

        // Determine line width based on position
        let width = "100%";
        if (lines > 3) {
          if (isLastLine) {
            width = "60%";
          } else if (isSecondToLast) {
            width = "75%";
          }
        } else {
          if (isLastLine) {
            width = "60%";
          }
        }

        return (
          <Skeleton
            key={index}
            variant="text"
            height="var(--text-base)"
            width={width}
            animate={animate}
          />
        );
      })}
    </div>
  );
}
