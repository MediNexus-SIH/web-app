import { useState } from "react";

const usePredictNextPurchase = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const predictNextPurchase = async (itemName:string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://check-fast.onrender.com/predict-next-purchase/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ item_name: itemName }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
    } catch (err:any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, predictNextPurchase };
};

export default usePredictNextPurchase;
