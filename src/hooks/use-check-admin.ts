import { useState } from "react";

interface UseCheckAdminEmailResponse {
  checkAdmin: (email: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const useCheckAdmin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkAdmin = async (email: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/hospital/check-admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ adminEmail: email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return false;
      }

      return data.existingAdmin || false; // Return true if admin exists, false otherwise
    } catch (err) {
      console.error("Error checking admin email:", err);
      setError("An error occurred while checking the email.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    checkAdmin,
    isLoading,
    error,
  };
};

export default useCheckAdmin;