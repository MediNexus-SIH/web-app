import Link from "next/link";
import DropdownMenuProfile from "./DropdrownMenuProfile";
import NotificationPopup from "./NotificationPopup";
import { Hospital } from "lucide-react";

const TopBar = ({ className }: { className?: string }) => {
  return (
    <header
      className={`flex justify-between items-center border-b-2 p-5 ${className}`}
    >
      <Link href="/dashboard" className="flex items-center text-2xl font-bold">
        <Hospital className="mr-2" /> {/* Added margin-right to the icon */}
        MediNexus
      </Link>
      <div className="flex space-x-4 items-center">
        <DropdownMenuProfile />
        <NotificationPopup />
      </div>
    </header>
  );
};

export default TopBar;
