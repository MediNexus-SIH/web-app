"use client";
import { useRouter } from "next/navigation";
import React, { ReactNode } from "react";
import {
  House,
  Package,
  Truck,
  Users,
  ChartColumn,
  Settings,
} from "lucide-react";


export default function Sidebar({ className }: { className?: string }) {
  const router = useRouter();
  const handleNavigation = (path: string) => {
    router.push(path);
  };

  interface SideBarComponentProps {
    path: string;
    icon: ReactNode;
    title: string;
  }

  const SideBarComponent: React.FC<SideBarComponentProps> = ({
    path,
    icon,
    title,
  }) => {
    return (
      <button
        onClick={() => handleNavigation(path)}
        className="group flex items-center justify-center group-hover:justify-start w-full transition-all duration-500 ease-in-out hover:bg-muted/40 rounded-lg h-10 overflow-hidden"
      >
        <div className="flex items-center justify-center w-10 h-10 transition-all duration-500 ease-in-out group-hover:mr-2">
          {React.cloneElement(icon as React.ReactElement, {
            className:
              "h-5 w-5 transition-all duration-500 ease-in-out group-hover:scale-110",
          })}
        </div>
        <span className="opacity-0 w-0 text-sm transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:w-auto whitespace-nowrap overflow-hidden">
          {title}
        </span>
      </button>
    );
  };

  return (
    <div
      className={`group hover:w-64 transition-all duration-500 ease-in-out m-2 w-14 flex-col border-22 bg-background flex ${className}`}
    >
      <div className="flex flex-col gap-4 items-center w-full py-4">
        <SideBarComponent
          path="/dashboard"
          icon={<House />}
          title="Dashboard"
        />
        <SideBarComponent
          path="/dashboard/inventory"
          icon={<Package />}
          title="Inventory"
        />
        <SideBarComponent
          path="/dashboard/orders"
          icon={<Truck />}
          title="Orders"
        />
        <SideBarComponent
          path="/dashboard/branches"
          icon={<Users />}
          title="Branches"
        />
        <SideBarComponent
          path="/dashboard/reports"
          icon={<ChartColumn />}
          title="Reports"
        />
        <SideBarComponent
          path="/settings"
          icon={<Settings />}
          title="Settings"
        />
      </div>
    </div>
  );
}

