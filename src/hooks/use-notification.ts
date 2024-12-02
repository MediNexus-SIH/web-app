import { useState, useEffect } from "react";

// Define a type for a Notification
interface Notification {
  id: string;
  hospital_id: string;
  department_id?: string;
  type: string;
  message: string;
  status: "READ" | "UNREAD";
  created_at: string;
  read_at?: string;
}

const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch notifications from the API
  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/hospital/notifications");
      if (!res.ok) {
        throw new Error("Failed to fetch notifications");
      }
      const data = await res.json();
      setNotifications(data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Create a new notification
  const createNotification = async (
    notification: Omit<Notification, "id" | "created_at" | "read_at">
  ) => {
    try {
      const res = await fetch("/api/hospital/notifications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(notification),
      });
      if (!res.ok) {
        throw new Error("Failed to create notification");
      }
      const newNotification = await res.json();
      setNotifications((prev) => [...prev, newNotification]);
    } catch (error: any) {
      setError(error.message);
    }
  };

  // Update notification status
  const updateNotificationStatus = async (
    id: string,
    status: "READ" | "UNREAD"
  ) => {
    try {
      const res = await fetch(`/api/hospital/notifications/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) {
        throw new Error("Failed to update notification status");
      }
      const updatedNotification = await res.json();
      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === id
            ? { ...notification, status: updatedNotification.status }
            : notification
        )
      );
    } catch (error: any) {
      setError(error.message);
    }
  };

  // Delete a notification
  const deleteNotification = async (id: string) => {
    try {
      const res = await fetch(`/api/hospital/notifications/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete notification");
      }
      setNotifications((prev) =>
        prev.filter((notification) => notification.id !== id)
      );
    } catch (error: any) {
      setError(error.message);
    }
  };

  // Fetch notifications when the hook is mounted
  useEffect(() => {
    fetchNotifications();
  }, []);

  return {
    notifications,
    loading,
    error,
    fetchNotifications,
    createNotification,
    updateNotificationStatus,
    deleteNotification,
  };
};

export default useNotifications;
