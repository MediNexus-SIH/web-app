"use client";

import React from "react";
import { Textarea } from "@/components/ui/textarea"; // Replace with your own textarea component
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

const GeneralizedTextArea: React.FC<TextAreaProps> = ({
  label,
  error,
  id,
  ...props
}) => {
  return (
    <div className="space-y-2 mb-4">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Textarea
          id={id}
          className={`${error ? "border-destructive" : ""}`}
          {...props}
        />
        {error && (
          <div className="absolute right-0 top-full mt-1 flex items-center space-x-1 text-xs text-destructive">
            <AlertCircle className="h-4 w-4" />
            <span>{error}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default GeneralizedTextArea;
