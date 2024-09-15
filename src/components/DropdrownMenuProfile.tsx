"use client"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Avatar from "./Avatar";
import { signOut, useSession } from "next-auth/react";

const DropdownMenuProfile = () => {
  const { data: session } = useSession();
    const getInitials = (name: string) => {
      const splitName = name.split(" ");
      if (splitName.length > 1) {
        return `${splitName[0][0]}${splitName[1][0]}`.toUpperCase();
      }
      return `${splitName[0][0]}`.toUpperCase();
    };

    const userName = session?.user?.hospitalName || session?.user?.email || "User";
    const initials = getInitials(userName);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-full"
        >
          <Avatar initials={initials} backgroundColor="#FF5733" size={36} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Hospital Admin</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={()=>{signOut()}}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownMenuProfile;
