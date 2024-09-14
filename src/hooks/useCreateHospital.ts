"use client";
import { useState } from "react";
import { FormData } from "@/lib/zodSchema/formSchema";
import axios from "axios";
interface UseCreateHospitalResponse {
  createHospital: (data: FormData) => Promise<void>;
  isFormLoading: boolean;
  formError: string | null;
}

const useCreateHospital = (): UseCreateHospitalResponse => {
  const [isFormLoading, setIsLoading] = useState(false);
  const [formError, setError] = useState<string | null>(null);

  const createHospital = async (data: FormData) => {
    setIsLoading(true);
    setError(null);
    console.log(data);
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "An unknown error occurred");
      }

      const result = await response.json();
      console.log(result.message);
    } 
    catch (error: any) {
      if (error.response) {
        console.error("Error:", error.response.data.message);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error in request setup:", error.message);
      }
      setError(error.message || "An unknown error occurred");
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
