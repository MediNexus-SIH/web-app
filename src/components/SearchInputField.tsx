import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchInputFieldProps {
  placeholder?: string;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInputField = ({
  placeholder,
  className,
  value,
  onChange,
}: SearchInputFieldProps) => {
  return (
    <div className={className}>
      <div className="relative ml-auto flex-1 md:grow-0">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder={placeholder}
          value={value}
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default SearchInputField;
