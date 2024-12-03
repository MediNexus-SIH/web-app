import { useState, useEffect } from "react";
import { NotificationStatus, NotificationType } from "@/lib/NotiEnums";

export interface Notification {
  id: string;
  hospital_id: string;
  department_id?: string;
  type: string;
  message: string;
  status: "READ" | "UNREAD";
  created_at: string;
  read_at?: string;
  inventory_id?: string;
  item_name?: string;
  current_quantity?: number;
  threshold_quantity?: number;
  expiry_date?: string;
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [newNotificationsCount, setNewNotificationsCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

const fetchNotifications = async () => {
  setLoading(true);
  try {
    const res = await fetch("/api/hospital/notifications");
    if (!res.ok) throw new Error("Failed to fetch notifications");

    const data = await res.json();

    // Update notifications
    setNotifications(data.notifications);

    // Calculate unread notifications count
    const unreadCount = data.notifications.reduce(
      (count:number, noti:Notification) => (noti.status === "UNREAD" ? count + 1 : count),
      0
    );
    setNewNotificationsCount(unreadCount);

    setError(null);
  } catch (error) {
    setError(error instanceof Error ? error.message : "An error occurred");
  } finally {
    setLoading(false);
  }
};

  const createNotification = async (
    notification: Omit<Notification, "id" | "created_at" | "read_at">
  ): Promise<Notification> => {
    try {
      const res = await fetch("/api/hospital/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(notification),
      });

      if (!res.ok) throw new Error("Failed to create notification");

      const newNotification = await res.json();
      setNotifications((prev) => [...prev, newNotification]);
      setError(null);
      return newNotification;
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
      throw error;
    }
  };

  const updateNotificationStatus = async (
    id: string,
    status: NotificationStatus
  ): Promise<Notification> => {
    try {
      const res = await fetch(`/api/hospital/notifications/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) throw new Error("Failed to update notification status");

      const updatedNotification: Notification = await res.json();
      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === id ? updatedNotification : notification
        )
      );
      setError(null);
      return updatedNotification;
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
      throw error;
    }
  };

  const deleteNotification = async (id: string): Promise<void> => {
    try {
      const res = await fetch(`/api/hospital/notifications/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete notification");

      setNotifications((prev) =>
        prev.filter((notification) => notification.id !== id)
      );
      setError(null);
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
      throw error;
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return {
    notifications,
    newNotificationsCount,
    loading,
    error,
    fetchNotifications,
    createNotification,
    updateNotificationStatus,
    deleteNotification,
  };
}

export default useNotifications;
