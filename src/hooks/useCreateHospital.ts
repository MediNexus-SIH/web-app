"use client";
import { useState } from "react";
import { FormData } from "@/lib/zodSchema/formSchema";

interface UseCreateHospitalResponse {
  createHospital: (data: FormData) => Promise<any>;
  isFormLoading: boolean;
  formError: string | null;
}

const useCreateHospital = (): UseCreateHospitalResponse => {
  const [isFormLoading, setIsLoading] = useState(false);
  const [formError, setError] = useState<string | null>(null);

  const createHospital = async (data: FormData): Promise<any> => {
    setIsLoading(true);
    setError(null); // Reset error before starting the request

    try {
      const response = await fetch("/api/hospital/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // Check for response status
      if (!response.ok) {
        const errorData = await response.json();

        switch (response.status) {
          case 400:
            setError("Validation error: Please check your input.");
            break;
          case 409:
            setError(`Conflict error: ${errorData.message}`);
            break;
          default:
            setError("An unexpected error occurred. Please try again.");
        }

        // Throwing error to prevent execution of success-related logic
        throw new Error(errorData.message || "An unknown error occurred");
      }

      const result = await response.json();
      return result; // Return the result for further use if needed
    } catch (error: any) {
      console.error("Error during hospital creation:", error.message);
      setError(error.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false); // Ensure loading state is updated
    }
  };

  return {
    createHospital,
    isFormLoading,
    formError,
  };
};

export default useCreateHospital;
