import { useState } from "react";

interface OrderItem {
  item_id: string;
  quantity: number;
  unit_price?: number;
  id?: string; // For updating existing order items
}

interface Order {
  expected_delivery_date: string;
  orderItems: OrderItem[];
  total_amount?: number;
  status?: string;
  payment_status?: boolean;
  id?: string; // For updating or deleting orders
}

export const useOrder = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orders, setOrders] = useState<Order[] | null>(null);

  // POST: Create a new order
  const createOrder = async (order: Order) => {
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
  };

  // GET: Fetch all orders for the hospital
  const fetchOrders = async () => {
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
  };

  // PUT: Update an existing order
  const updateOrder = async (id: string, updatedOrder: Order) => {
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
  };

  // DELETE: Remove an existing order
  const deleteOrder = async (id: string) => {
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
  };

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
