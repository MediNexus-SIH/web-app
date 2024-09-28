// pages/profile.tsx
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Avatar from "@/components/Avatar"; // Assuming Avatar is in this directory
import { LogOutButton } from "./LogOutButton";
import { getServerSideProps } from "@/hooks/getServerSideProps";

const DropdownMenuProfile = async () => {
  const getInitials = (name: string) => {
    const splitName = name.split(" ");
    if (splitName.length > 1) {
      return `${splitName[0][0]}${splitName[1][0]}`.toUpperCase();
    }
    return `${splitName[0][0]}`.toUpperCase();
  };
  const sessionProps = await getServerSideProps();
  const session = sessionProps.user
  const userName =
    session?.user?.hospitalName || session?.user?.email || "User";

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
        <DropdownMenuItem>
          <LogOutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// Use getServerSideProps to fetch the session on the server

export default DropdownMenuProfile;
