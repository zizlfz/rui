import { cn } from "#/utils/classname";
import "./Avatar.css";

export interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: "sm" | "md" | "lg";
  isOnline?: boolean;
  className?: string;
}

export function Avatar({
  src,
  alt,
  fallback,
  size = "md",
  isOnline = false,
  className,
}: AvatarProps) {
  return (
    <div className={cn("avatar", `avatar-${size}`, className)}>
      <div className="avatar-container">
        {src ? (
          <img src={src} alt={alt} />
        ) : (
          <span className="avatar-fallback">{fallback || ""}</span>
        )}
      </div>
      {isOnline && <div className="avatar-online-indicator" />}
    </div>
  );
}
