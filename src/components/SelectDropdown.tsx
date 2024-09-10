import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface Option {
  value: string;
  label: string;
}

interface SelectDropdownProps {
  name?:string
  options: Option[];
  onValueChange: (value: string) => void;
  placeholder: string;
}

export const SelectDropdown: React.FC<SelectDropdownProps> = ({
  name,
  options,
  onValueChange,
  placeholder,
}) => {
  return (
    <Select name={name} onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
