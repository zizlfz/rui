"use client";
import { AlertCircle, CheckCircle, Info, X, XCircle } from "lucide-react";
import { type ReactNode, useState } from "react";
import "./Alert.css";
import { Button } from "#/components/ui/Button";
import { cn } from "#/utils/classname";

interface AlertProps {
  /**
   * The variant of the alert.
   * @default 'info'
   */
  variant?: "info" | "success" | "warning" | "error";
  /**
   * The title of the alert.
   */
  title?: ReactNode;
  /**
   * The description/content of the alert.
   */
  children?: ReactNode;
  /**
   * Whether the alert can be dismissed.
   * @default false
   */
  dismissible?: boolean;
  /**
   * Callback when the alert is dismissed.
   */
  onDismiss?: () => void;
  /**
   * Additional CSS classes.
   */
  className?: string;
}

const variantIcons = {
  info: Info,
  success: CheckCircle,
  warning: AlertCircle,
  error: XCircle,
};

export function Alert({
  variant = "info",
  title,
  children,
  dismissible = false,
  onDismiss,
  className,
}: AlertProps) {
  const [isDismissed, setIsDismissed] = useState(false);
  const Icon = variantIcons[variant];

  const handleDismiss = () => {
    setIsDismissed(true);
    onDismiss?.();
  };

  if (isDismissed) {
    return null;
  }

  return (
    <div className={cn("alert", className)} data-variant={variant}>
      <div className="alert-icon">
        <Icon size={20} />
      </div>
      <div className="alert-content">
        {title && <div className="alert-title">{title}</div>}
        {children && <div className="alert-description">{children}</div>}
      </div>
      {dismissible && (
        <Button
          variant="quiet"
          className="alert-close"
          onPress={handleDismiss}
          aria-label="Dismiss"
        >
          <X size={16} />
        </Button>
      )}
    </div>
  );
}
