import Link from "next/link";

import { Bell, Hospital } from "lucide-react";

const TopBar = async ({ className }: { className?: string }) => {
  return (
    <div
      className={`flex justify-between items-center border-b-2 p-5 ${className}`}
    >
      <Link href="/dashboard" className="flex items-center text-2xl font-bold">
        <Hospital className="mr-4" />
        MediNexus
      </Link>
      <div className="flex space-x-4 items-center">
        <Bell />
      </div>
    </div>
  );
};

export default TopBar;
