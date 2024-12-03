import { useState } from "react";

interface UseCheckAdminEmailResponse {
  checkAdmin: (email: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  adminFound: boolean | null;
}

const useCheckAdmin = (): UseCheckAdminEmailResponse => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [adminFound, setAdminFound] = useState<boolean | null>(null);

  const checkAdmin = async (email: string) => {
    setIsLoading(true);
    setError(null);
    setAdminFound(null);

    try {
      const response = await fetch("/api/hospital/check-admin-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ adminEmail: email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Something went wrong. Please try again.");
      } else {
        if (data.existingAdmin) {
          setAdminFound(true); // Admin email found
        } else {
          setAdminFound(false); // No admin found with this email
        }
      }
    } catch (err) {
      console.error("Error checking admin email:", err);
      setError("An error occurred while checking the email.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    checkAdmin,
    isLoading,
    error,
    adminFound,
  };
};

export default useCheckAdmin;
