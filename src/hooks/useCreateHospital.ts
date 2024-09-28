"use client";
import { useState } from "react";
import { FormData } from "@/lib/zodSchema/formSchema";

interface UseCreateHospitalResponse {
  createHospital: (data: FormData) => Promise<void>;
  isFormLoading: boolean;
  formError: string | null;
}

const useCreateHospital = (): UseCreateHospitalResponse => {
  const [isFormLoading, setIsLoading] = useState(false);
  const [formError, setError] = useState<string>(" ");

  const createHospital = async (data: FormData) => {
    setIsLoading(true);
    setError("");


    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();

        if (response.status === 400) {
          setError("Validation error");
        } else if (response.status === 409) {
          // Handle conflict errors
          setError("Conflict error: " + errorData.message);
        } else {
          // Handle other errors
          setError("An unknown error occurred");
        }

        throw new Error(errorData.message || "An unknown error occurred");
      }

      const result = await response.json();
    } catch (error: any) {
      console.error("Error:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createHospital,
    isFormLoading,
    formError,
  };
};

export default useCreateHospital;
