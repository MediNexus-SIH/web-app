import Link from "next/link";
import DropdownMenuProfile from "./DropdrownMenuProfile";
import NotificationPopup from "./NotificationPopup";

const TopBar = ({className}:{className?:string}) => {
  return (
    <>
    <header className={`flex justify-between items-center border-b-2 p-5 ${className}`}>
      <Link href="/dashboard" className="text-xl font-bold">
        MediNexus
      </Link>
      <div className="flex space-x-4 items-center">
        <DropdownMenuProfile />
        <NotificationPopup/>
      </div>
    </header>
    </>
    
  );
}

export default TopBar
