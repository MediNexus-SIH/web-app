"use client";

import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const GeneralizedInput: React.FC<InputFieldProps> = ({
  label,
  error,
  id,
  type,
  ...props
}) => {
  const [localError, setLocalError] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (props.value !== undefined) {
      setValue(props.value as string);
    }
  }, [props.value]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.setAttribute("novalidate", "");
    }
  }, []);

  const validateEmail = (inputValue: string) => {
    if (type === "email" && inputValue && !inputValue.includes("@")) {
      setLocalError("Please include an '@' in the email address.");
      return false;
    } else {
      setLocalError("");
      return true;
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    validateEmail(e.target.value);
    if (props.onBlur) {
      props.onBlur(e);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    if (type === "email") {
      validateEmail(newValue);
    }
    if (props.onChange) {
      props.onChange(e);
    }
  };

  const displayError = error || localError;

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Input
          id={id}
          type={type}
          className={`${displayError ? "border-destructive" : ""}`}
          {...props}
          value={value}
          onBlur={handleBlur}
          onChange={handleChange}
          ref={inputRef}
        />
        {displayError && (
          <div className="absolute right-0 top-full mt-1 flex items-center space-x-1 text-xs text-destructive">
            <AlertCircle className="h-4 w-4" />
            <span>{displayError}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default GeneralizedInput;
