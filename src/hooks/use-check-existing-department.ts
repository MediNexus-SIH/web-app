import { useState } from "react";

const useCheckExistingDepartments = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkExistingDepartments = async (hodEmails: string[]) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/hospital/check-department", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ hodEmails }),
      });

      if (!response.ok) {
        throw new Error("Failed to check for existing departments.");
      }
      const data = await response.json();

      return data.existingDepartments || [];

    } catch (err: any) {
      console.error("Error in checkExistingDepartments:", err);

      setError(err.message || "Something went wrong.");

      return [];
    } finally {
      setIsLoading(false);
    }
  };

  return { checkExistingDepartments, isLoading, error };
};

export default useCheckExistingDepartments;
