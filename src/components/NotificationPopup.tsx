"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { BellIcon } from "lucide-react";
import useNotifications from "@/hooks/use-notification";

const NotificationPopup = () => {
  const {
    notifications,
    loading,
    error,
    updateNotificationStatus,
    fetchNotifications,
  } = useNotifications();
  const [unreadCount, setUnreadCount] = useState<number>(0);

  // Calculate unread notifications count
  useEffect(() => {
    setUnreadCount(
      notifications.filter((notification) => notification.status === "UNREAD")
        .length
    );
  }, [notifications]);

  // Render the notification content dynamically
  const renderNotifications = () => {
    return notifications.map((notification) => (
      <div
        key={notification.id}
        className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
      >
        <span
          className={`flex h-2 w-2 translate-y-1.5 rounded-full ${
            notification.status === "UNREAD" ? "bg-blue-500" : "bg-green-500"
          }`}
        />
        <div className="grid gap-1">
          <div className="text-sm font-medium">{notification.message}</div>
          <div className="text-sm text-muted-foreground">
            {new Date(notification.created_at).toLocaleString()}
          </div>
          <Button
            variant="link"
            onClick={() => handleMarkAsReadUnread(notification)}
          >
            {notification.status === "UNREAD"
              ? "Mark as Read"
              : "Mark as Unread"}
          </Button>
        </div>
      </div>
    ));
  };

  // Handle Mark as Read/Unread
  const handleMarkAsReadUnread = async (notification: any) => {
    try {
      // Update notification status instantly in the state
      const updatedNotifications = notifications.map((notif) =>
        notif.id === notification.id
          ? { ...notif, status: notif.status === "UNREAD" ? "READ" : "UNREAD" }
          : notif
      );

      // Update local state for unread count
      setUnreadCount(
        updatedNotifications.filter((notif) => notif.status === "UNREAD").length
      );

      // Call API to update the status
      await updateNotificationStatus(
        notification.id,
        notification.status === "UNREAD" ? "READ" : "UNREAD"
      );
    } catch (error) {
      console.error("Error updating notification status:", error);
    }
  };

  // Refresh the notifications list
  const handleRefresh = async () => {
    await fetchNotifications();
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <BellIcon className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full px-1.5 py-0.5 text-xs font-medium">
            {unreadCount}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Card className="shadow-none border-0">
          <CardHeader className="border-b">
            <CardTitle>Notifications</CardTitle>
            <CardDescription>
              You have {unreadCount} unread messages.
            </CardDescription>
            <Button onClick={handleRefresh} className="mt-2">
              Refresh
            </Button>
          </CardHeader>
          <CardContent className="p-6">
            {loading && <p>Loading notifications...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {notifications.length > 0 ? (
              renderNotifications()
            ) : (
              <p>No notifications found.</p>
            )}
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationPopup;
