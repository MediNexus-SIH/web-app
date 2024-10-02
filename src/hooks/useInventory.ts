import { useCallback, useEffect, useState } from "react";

interface Item {
  department: string;
  item_name: string;
  batch_number: string;
  expiry_date: string;
  quantity: number;
  unit_price: number;
}

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
      setItems(data);
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

      // Fetch updated items after successful addition
      await fetchItems();
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
    addItems
  };
};

export default useInventory;
