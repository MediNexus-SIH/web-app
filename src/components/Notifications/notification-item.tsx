import { Notification } from "@/hooks/use-notification";
import { CheckIcon, Trash2Icon } from "lucide-react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

interface NotificationItemProps {
  notification: Notification;
  onStatusChange: (notification: Notification) => void;
  onDelete: (notification: Notification) => void;
}

export function NotificationItem({
  notification,
  onStatusChange,
  onDelete,
}: NotificationItemProps) {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="flex space-x-4 group hover:bg-muted/50 p-2 rounded-md transition-colors">
          <div
            className={`flex h-2 w-2 translate-y-1.5 rounded-full ${
              notification.status === "UNREAD" ? "bg-blue-500" : "bg-green-500"
            }`}
          />
          <div className="flex flex-col space-y-1 flex-1">
            <p className="text-sm font-medium leading-none">
              {notification.message}
            </p>
            <p className="text-sm text-muted-foreground">
              {new Date(notification.created_at).toLocaleDateString("en-GB", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
            </p>
            <button
              className="text-sm text-primary underline-offset-4 hover:underline w-fit"
              onClick={() => onStatusChange(notification)}
            >
              {notification.status === "UNREAD"
                ? "Mark as Read"
                : "Mark as Unread"}
            </button>
          </div>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={() => onStatusChange(notification)}>
          <CheckIcon className="mr-2 h-4 w-4" />
          {notification.status === "UNREAD" ? "Mark as Read" : "Mark as Unread"}
        </ContextMenuItem>
        <ContextMenuItem onClick={() => onDelete(notification)}>
          <Trash2Icon className="mr-2 h-4 w-4" />
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
