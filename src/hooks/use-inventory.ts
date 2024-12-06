"use client";
import { Item } from "@/lib/interfaces";
import { useCallback, useState } from "react";

const useInventory = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/hospital/inventory");
      if (!response.ok) {
        throw new Error("Failed to fetch items");
      }
      const data = await response.json();

      // Sort items before setting state
      const sortedItems = data.sort((a: Item, b: Item) =>
        a.item_id?.localeCompare(b.item_id || "")
      );
      setItems(sortedItems);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const addItems = async (newItems: Item[]) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/hospital/inventory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItems),
      });

      if (!response.ok) {
        throw new Error("Failed to add items");
      }

      // Update items locally
      setItems((prevItems) => {
        const updatedItems = [...prevItems, ...newItems];
        return updatedItems.sort(
          (a, b) => a.item_id?.localeCompare(b.item_id || "") || 0
        );
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateItem = async (id: string, updates: Partial<Item>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/hospital/inventory`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, ...updates }),
      });

      if (!response.ok) {
        throw new Error("Failed to update item");
      }

      // Update item locally
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.item_id === id ? { ...item, ...updates } : item
        )
      );
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/hospital/inventory?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete item");
      }

      // Remove the item locally
      setItems((prevItems) => prevItems.filter((item) => item.item_id !== id));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  return {
    items,
    loading,
    error,
    fetchItems,
    addItems,
    updateItem,
    deleteItem,
  };
};

export default useInventory;
