"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { BellIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { NotificationList } from "./notification-list";
import useNotifications from "@/hooks/use-notification";
import { Notification } from "@/hooks/use-notification";
import { NotificationStatus } from "@/lib/NotiEnums";

export function NotificationPopup() {
  const {
    notifications,
    newNotificationsCount,
    loading,
    error,
    updateNotificationStatus,
    deleteNotification,
    fetchNotifications,
  } = useNotifications();

  const [localNotifications, setLocalNotifications] = useState<Notification[]>(
    []
  );
  const [localNewNotificationsCount, setLocalNewNotificationsCount] =
    useState(0);
  const localChangesRef = useRef<Map<string, Notification>>(new Map());

  useEffect(() => {
    if (notifications) {
      setLocalNotifications((prevNotifications) => {
        const notificationMap = new Map(
          prevNotifications.map((n) => [n.id, n])
        );

        notifications.forEach((n) => {
          if (
            !notificationMap.has(n.id) &&
            !localChangesRef.current.has(n.id)
          ) {
            notificationMap.set(n.id, n); // Add new notifications
          }
        });

        // Apply local changes
        localChangesRef.current.forEach((localNotification, id) => {
          notificationMap.set(id, localNotification);
        });

        return Array.from(notificationMap.values());
      });

      // Calculate new notifications count
      const newCount = Array.from(localChangesRef.current.values()).reduce(
        (count, n) =>
          n.status === NotificationStatus.UNREAD ? count + 1 : count,
        notifications.filter((n) => n.status === NotificationStatus.UNREAD)
          .length
      );

      setLocalNewNotificationsCount(newCount);
    }
  }, [notifications]);

  const handleStatusChange = useCallback(
    async (notification: Notification) => {
      const currentStatus = notification.status;
      const newStatus =
        currentStatus === NotificationStatus.UNREAD
          ? NotificationStatus.READ
          : NotificationStatus.UNREAD;

      try {
        // Optimistically update the local state
        const updatedNotification = { ...notification, status: newStatus };
        localChangesRef.current.set(notification.id, updatedNotification);

        setLocalNotifications((prev) =>
          prev.map((n) => (n.id === notification.id ? updatedNotification : n))
        );

        setLocalNewNotificationsCount((prev) =>
          newStatus === NotificationStatus.UNREAD
            ? prev + 1
            : Math.max(0, prev - 1)
        );

        // Make the API call
        const serverUpdatedNotification = await updateNotificationStatus(
          notification.id,
          newStatus
        );

        if (serverUpdatedNotification) {
          // If successful, remove from local changes
          localChangesRef.current.delete(notification.id);
        } else {
          // If the API call fails, revert the local changes
          localChangesRef.current.set(notification.id, notification);
          setLocalNotifications((prev) =>
            prev.map((n) => (n.id === notification.id ? notification : n))
          );
          setLocalNewNotificationsCount((prev) =>
            newStatus === NotificationStatus.UNREAD ? prev - 1 : prev + 1
          );
        }
      } catch (error) {
        console.error("Error updating notification status:", error);
        // Revert local changes on error
        localChangesRef.current.set(notification.id, notification);
        setLocalNotifications((prev) =>
          prev.map((n) => (n.id === notification.id ? notification : n))
        );
        setLocalNewNotificationsCount((prev) =>
          newStatus === NotificationStatus.UNREAD ? prev - 1 : prev + 1
        );
      }
    },
    [updateNotificationStatus]
  );

  const handleDelete = useCallback(
    async (notification: Notification) => {
      try {
        // Optimistically update local state
        localChangesRef.current.delete(notification.id);
        setLocalNotifications((prev) =>
          prev.filter((n) => n.id !== notification.id)
        );

        if (notification.status === NotificationStatus.UNREAD) {
          setLocalNewNotificationsCount((prev) => Math.max(0, prev - 1));
        }

        // Make the API call
        await deleteNotification(notification.id);
      } catch (error) {
        console.error("Error deleting notification:", error);
        // Revert local changes on error
        localChangesRef.current.set(notification.id, notification);
        setLocalNotifications((prev) => [...prev, notification]);
        if (notification.status === NotificationStatus.UNREAD) {
          setLocalNewNotificationsCount((prev) => prev + 1);
        }
      }
    },
    [deleteNotification]
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <BellIcon className="h-5 w-5" />
          {localNewNotificationsCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center bg-destructive text-destructive-foreground rounded-full text-xs font-medium">
              {localNewNotificationsCount}
            </span>
          )}
          <span className="sr-only">Open notifications</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <Card className="border-none shadow-none">
          <CardHeader className="border-b flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                You have {localNewNotificationsCount} unread message
                {localNewNotificationsCount !== 1 && "s"}.
              </CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={fetchNotifications}
              className="shrink-0"
            >
              Refresh
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <NotificationList
              notifications={localNotifications}
              onStatusChange={handleStatusChange}
              onDelete={handleDelete}
              loading={loading}
              error={error}
            />
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
}
