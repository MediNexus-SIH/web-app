"use client";

import React, { useState, useEffect } from "react";
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
import { Button } from "@/components/ui/button";
import { BellIcon, CheckIcon, Trash2Icon } from "lucide-react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import useNotifications from "@/hooks/use-notification";

const NotificationPopup = () => {
  const {
    notifications,
    loading,
    error,
    updateNotificationStatus,
    deleteNotification,
    fetchNotifications,
  } = useNotifications();
  const [unreadCount, setUnreadCount] = useState<number>(0);

  useEffect(() => {
    setUnreadCount(
      notifications.filter((notification) => notification.status === "UNREAD")
        .length
    );
  }, [notifications]);

  const handleMarkAsReadUnread = async (notification: any) => {
    try {
      const newStatus = notification.status === "UNREAD" ? "READ" : "UNREAD";
      await updateNotificationStatus(notification.id, newStatus);
      fetchNotifications();
    } catch (error) {
      console.error("Error updating notification status:", error);
    }
  };

  const handleDeleteNotification = async (notification: any) => {
    try {
      await deleteNotification(notification.id);
      fetchNotifications();
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  const renderNotifications = () =>
    notifications.map((notification) => (
      <ContextMenu key={notification.id}>
        <ContextMenuTrigger>
          <div className="flex space-x-4 ">
            <div
              className={`flex h-2 w-2 translate-y-1.5 rounded-full ${
                notification.status === "UNREAD"
                  ? "bg-blue-500"
                  : "bg-green-500"
              }`}
            ></div>
            <div className="mb-4 flex flex-col space-y-4">
              <div className="flex flex-col space-y-3">
                <div className="text-sm font-medium">
                  {notification.message}
                </div>
                <div className="text-sm text-muted-foreground">
                  {new Date(notification.created_at).toLocaleString()}
                </div>
                <div
                  className="text-sm underline-offset-4 hover:underline"
                  onClick={() => handleMarkAsReadUnread(notification)}
                ></div>
              </div>
            </div>
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onClick={() => handleMarkAsReadUnread(notification)}>
            <CheckIcon className="mr-2 h-4 w-4" />
            {notification.status === "UNREAD"
              ? "Mark as Read"
              : "Mark as Unread"}
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() => handleDeleteNotification(notification)}
          >
            <Trash2Icon className="mr-2 h-4 w-4" />
            Delete
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    ));

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <BellIcon className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full px-1.5 py-0.5 text-xs font-medium">
              {unreadCount}
            </span>
          )}
          <span className="sr-only">Open notifications</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0">
        <Card className="border-none shadow-none">
          <CardHeader className="border-b flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                You have {unreadCount} unread message{unreadCount !== 1 && "s"}.
              </CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={fetchNotifications}
              aria-label="Refresh notifications"
            >
              Refresh
            </Button>
          </CardHeader>
          <CardContent className="p-4 max-h-[300px] overflow-y-auto">
            {loading && <p>Loading notifications...</p>}
            {error && <p className="text-destructive">{error}</p>}
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
