import { Order } from "@/lib/interfaces";
import { useState, useCallback } from "react";

export const useOrder = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orders, setOrders] = useState<Order[] | null>(null);

  const createOrder = useCallback(async (order: Order) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });

      if (!response.ok) {
        throw new Error(`Error creating order: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/orders", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`Error fetching orders: ${response.statusText}`);
      }

      const data = await response.json();
      setOrders(data);
      return data;
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateOrder = useCallback(async (id: string, updatedOrder: Order) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/orders/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedOrder),
      });

      if (!response.ok) {
        throw new Error(`Error updating order: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteOrder = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/orders/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Error deleting order: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    orders,
    createOrder,
    fetchOrders,
    updateOrder,
    deleteOrder,
  };
};
