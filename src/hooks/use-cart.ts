import { useState, useEffect } from "react";
import axios from "axios";

interface Item {
  item_id: string;
  item_name: string;
  description: string;
  supplier: string;
  category: string;
}

interface Department {
  id: string;
  department: string;
}

interface CartItem {
  id: string;
  quantity: number;
  unit_price: number;
  item: Item;
  department: Department;
}

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch cart items
  const fetchCartItems = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get("/api/orders/cart");
      setCartItems(response.data as CartItem[]);
    } catch (err) {
      setError("Failed to fetch cart items");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Add item to cart
  const addToCart = async (itemData: {
    item_id: string;
    quantity: number;
    department: string;
  }) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post("/api/orders/cart", itemData);
      setCartItems((prevItems) => [...prevItems, response.data as CartItem]);
      return response.data;
    } catch (err) {
      setError("Failed to add item to cart");
      console.error(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Update cart item quantity
  const updateCartItemQuantity = async (id: string, quantity: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.put(`/api/orders/cart/${id}`, {
        quantity,
      });
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? (response.data as CartItem) : item
        )
      );
      return response.data;
    } catch (err) {
      setError("Failed to update cart item");
      console.error(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Remove item from cart
  const removeCartItem = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await axios.delete(`/api/orders/cart/${id}`);
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.id !== id)
      );
    } catch (err) {
      setError("Failed to remove cart item");
      console.error(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const clearCart = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await axios.delete("/api/orders/cart");
      setCartItems([]);
    } catch (err) {
      setError("Failed to clear cart");
      console.error(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Initial fetch when hook is used
  useEffect(() => {
    fetchCartItems();
  }, []);

  return {
    cartItems,
    addToCart,
    updateCartItemQuantity,
    removeCartItem,
    fetchCartItems,
    clearCart,
    isLoading,
    error,
  };
};
