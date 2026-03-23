import { cn } from "#/utils/classname";
import { Skeleton } from "./Skeleton";

interface SkeletonRectProps {
  width?: string | number;
  height?: string | number;
  animate?: boolean;
  className?: string;
}

export function SkeletonRect({
  width,
  height,
  animate = true,
  className,
}: SkeletonRectProps) {
  return (
    <Skeleton
      variant="rect"
      width={width}
      height={height}
      animate={animate}
      className={cn(className)}
    />
  );
}
