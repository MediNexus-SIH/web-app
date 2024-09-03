import Link from "next/link";
import SearchInputField from "./SearchInputField";
import DropdownMenuProfile from "./DropdrownMenuProfile";

const TopBar = ({className}:{className?:string}) => {
  return (
    <>
    <header className={`flex justify-between items-center border-b-2 p-5 ${className}`}>
      <Link href="/dashboard" className="text-xl font-bold">
        MediNexus
      </Link>
      <div className="flex space-x-4 items-center">
        <DropdownMenuProfile />
      </div>
    </header>
    </>
    
  );
}

export default TopBar
