import { Notification } from "@/hooks/use-notification";
import { NotificationItem } from "./notification-item";
import { ScrollArea } from "@/components/ui/scroll-area";

interface NotificationListProps {
  notifications: Notification[];
  onStatusChange: (notification: Notification) => void;
  onDelete: (notification: Notification) => void;
  loading: boolean;
  error: string | null;
}

export function NotificationList({
  notifications,
  onStatusChange,
  onDelete,
  loading,
  error,
}: NotificationListProps) {
  if (loading) {
    return (
      <p className="p-4 text-sm text-muted-foreground">
        Loading notifications...
      </p>
    );
  }

  if (error) {
    return <p className="p-4 text-sm text-destructive">{error}</p>;
  }

  if (notifications.length === 0) {
    return (
      <p className="p-4 text-sm text-muted-foreground">
        No notifications found.
      </p>
    );
  }

  return (
    <ScrollArea className="h-[300px]">
      <div className="space-y-2 p-2">
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onStatusChange={onStatusChange}
            onDelete={onDelete}
          />
        ))}
      </div>
    </ScrollArea>
  );
}
