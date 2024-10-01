import { Menu } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";

const EditInvDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button aria-haspopup="true" size="icon" variant="ghost">
          <Menu />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>Adjust Quantity</DropdownMenuItem>
        <DropdownMenuItem>Mark as Expired</DropdownMenuItem>
        <DropdownMenuItem>Reorder</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default EditInvDropdown