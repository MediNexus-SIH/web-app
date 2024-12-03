import { useState } from "react";

const useCheckExistingHospital = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkExistingHospital = async (
    hospitalName: string,
    addressLine1: string,
    contact_number: string
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/hospital/check-hospital", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          hospitalName,
          addressLine1,
          contact_number,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to check for existing hospital.");
      }

      const data = await response.json();
      return data.existingHospital;
    } catch (err: any) {
      console.error("Error in checkExistingHospital:", err);
      setError(err.message || "Something went wrong.");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    checkExistingHospital,
    isLoading,
    error,
  };
};

export default useCheckExistingHospital;
