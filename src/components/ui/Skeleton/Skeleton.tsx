import "./Skeleton.css";
import { cn } from "#/utils/classname";

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  variant?: "text" | "circle" | "rect";
  animate?: boolean;
  className?: string;
}

export function Skeleton({
  width,
  height,
  variant = "rect",
  animate = true,
  className,
}: SkeletonProps) {
  // Convert numbers to px, strings pass through
  const widthStyle = typeof width === "number" ? `${width}px` : width;
  const heightStyle = typeof height === "number" ? `${height}px` : height;

  // Map variant to border-radius
  const borderRadiusClass = {
    text: "rounded-xs",
    circle: "rounded-full",
    rect: "rounded-sm",
  }[variant];

  return (
    <div
      aria-hidden="true"
      role="presentation"
      data-variant={variant}
      className={cn(
        "bg-muted",
        borderRadiusClass,
        animate && "skeleton-animate",
        className,
      )}
      style={{ width: widthStyle, height: heightStyle }}
    />
  );
}
