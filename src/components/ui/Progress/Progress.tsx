import "./Progress.css";
import { cn } from "#/utils/classname";
import { useEffect, useState } from "react";

const sizeClasses = {
  sm: "h-1", // 4px
  md: "h-2", // 8px
  lg: "h-3", // 12px
} as const;

const variantFillClasses = {
  default: "bg-surface-primary",
  success: "bg-surface-success",
  warning: "bg-surface-warning",
  error: "bg-surface-destructive",
} as const;

export interface ProgressProps {
  /** 0-100, undefined = indeterminate */
  value?: number;
  /** default: 100 */
  max?: number;
  /** default: 'md' */
  size?: "sm" | "md" | "lg";
  /** default: 'default' */
  variant?: "default" | "success" | "warning" | "error";
  /** default: false */
  showLabel?: boolean;
  className?: string;
  /** Accessible label for the progress bar */
  "aria-label"?: string;
  /** ID of element that labels the progress bar */
  "aria-labelledby"?: string;
}

export function Progress({
  value = 0,
  max = 100,
  size = "md",
  variant = "default",
  showLabel = false,
  className,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
}: ProgressProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isIndeterminate = value === undefined;
  const percentage = Math.round((value! / max) * 100);

  // Accessible text for screen readers
  const ariaValueText = isIndeterminate ? undefined : `${percentage}%`;

  return (
    <div
      className={cn("flex items-center gap-2", className)}
      role="presentation"
    >
      <div
        role="progressbar"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={isIndeterminate ? undefined : value}
        aria-valuetext={ariaValueText}
        className={cn(
          "relative w-full overflow-hidden rounded-full bg-muted",
          sizeClasses[size],
        )}
      >
        {isIndeterminate ? (
          <div
            className={cn(
              "absolute top-0 h-full rounded-full",
              variantFillClasses[variant],
              "progress-indeterminate-animate",
            )}
            style={{ left: "-40%", width: "40%" }}
          />
        ) : (
          <div
            className={cn(
              "absolute top-0 h-full rounded-full transition-all duration-300 ease-in-out",
              variantFillClasses[variant],
            )}
            style={{
              width: `${percentage}%`,
              // Only apply transition after mount to avoid animation on initial render
              transition: isMounted ? "width 300ms ease-in-out" : "none",
            }}
          />
        )}
      </div>

      {showLabel && (
        <span
          className="text-sm text-content-muted min-w-[2.5ch]"
          aria-hidden="true"
        >
          {isIndeterminate ? "..." : `${percentage}%`}
        </span>
      )}
    </div>
  );
}
