"use client"
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Filter } from "lucide-react";
import { useCallback } from "react";

const OrderFilters: React.FC<{
  selectedFilters: string[];
  setSelectedFilters: React.Dispatch<React.SetStateAction<string[]>>;
}> = ({ selectedFilters, setSelectedFilters }) => {
  const toggleFilter = useCallback(
    (filter: string) => {
      setSelectedFilters((prev) =>
        prev.includes(filter)
          ? prev.filter((f) => f !== filter)
          : [...prev, filter]
      );
    },
    [setSelectedFilters]
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          <span>Filter</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel>Filter by</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={selectedFilters.includes("pending")}
          onCheckedChange={() => toggleFilter("pending")}
        >
          Pending
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={selectedFilters.includes("success")}
          onCheckedChange={() => toggleFilter("success")}
        >
          Approved
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={selectedFilters.includes("failure")}
          onCheckedChange={() => toggleFilter("failure")}
        >
          Cancelled
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default OrderFilters;