import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type DatePickerProps = {
  selected?: Date;
  onChange?: (date: Date) => void;
  placeholder?: string;
};

export function DatePicker({
  selected,
  onChange,
  placeholder = "Pick a date",
}: DatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(selected);
  const [open, setOpen] = React.useState(false); // Local state to control the popover

  React.useEffect(() => {
    if (selected) {
      setDate(selected);
    }
  }, [selected]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      {" "}
      {/* Control popover open state */}
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(selectedDate) => {
            setDate(selectedDate);
            onChange && onChange(selectedDate!);
            setOpen(false); // Close the popover when a date is selected
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
