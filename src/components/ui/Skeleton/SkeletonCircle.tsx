import { cn } from "#/utils/classname";
import { Skeleton } from "./Skeleton";

interface SkeletonCircleProps {
  size?: string | number;
  animate?: boolean;
  className?: string;
}

export function SkeletonCircle({
  size = 40,
  animate = true,
  className,
}: SkeletonCircleProps) {
  return (
    <Skeleton
      variant="circle"
      width={size}
      height={size}
      animate={animate}
      className={cn(className)}
    />
  );
}
