import { Avatar } from "#/components/ui/Avatar";
import { Box } from "#/components/ui/Box";
import { Button } from "#/components/ui/Button";

interface UserProfileBlockProps {
  name: string;
  email: string;
  avatar?: string;
  isOnline?: boolean;
  onEdit?: () => void;
  onMessage?: () => void;
}

export function UserProfileBlock({
  name,
  email,
  avatar,
  isOnline = false,
  onEdit,
  onMessage,
}: UserProfileBlockProps) {
  return (
    <Box className="flex items-center gap-4">
      <Avatar
        src={avatar}
        alt={name}
        fallback={name.charAt(0).toUpperCase()}
        isOnline={isOnline}
        size="lg"
      />
      <div className="flex-1">
        <h3 className="font-semibold">{name}</h3>
        <p className="text-sm text-muted-foreground">{email}</p>
      </div>
      <div className="flex gap-2">
        {onEdit && (
          <Button variant="secondary" onClick={onEdit}>
            Edit
          </Button>
        )}
        {onMessage && (
          <Button variant="quiet" onClick={onMessage}>
            Message
          </Button>
        )}
      </div>
    </Box>
  );
}
