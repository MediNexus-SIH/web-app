import { useState, useEffect } from "react";

interface Item {
  item_id: string;
  item_name: string;
  description?: string;
  quantity_in_stock: number;
  unit_price: number;
  supplier: string;
  category: string;
}

export function useItems() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchItems() {
      try {
        const response = await fetch("/api/items"); 
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setItems(data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An error occurred"));
        setLoading(false);
      }
    }

    fetchItems();
  }, []);

  return { items, loading, error };
}
