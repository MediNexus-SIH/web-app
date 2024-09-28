"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRef, useState } from "react";

export const OTPDiv = () => {
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtpValues = [...otpValues];
      newOtpValues[index] = value;
      setOtpValues(newOtpValues);

      if (value && index < 5) {
        otpRefs.current[index + 1]?.focus();
      }
    }
  };
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const handleOtpKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };
  return (
    <div className="space-y-2">
      <Label>Enter OTP</Label>
      <div className="flex justify-between">
        {otpValues.map((value, index) => (
          <Input
            key={index}
            type="text"
            inputMode="numeric"
            maxLength={1}
            className="w-12 h-12 text-center text-lg"
            value={value}
            onChange={(e) => handleOtpChange(index, e.target.value)}
            onKeyDown={(e) => handleOtpKeyDown(index, e)}
            ref={(el) => {
              otpRefs.current[index] = el as HTMLInputElement | null;
            }}
            required
          />
        ))}
      </div>
    </div>
  );
};
