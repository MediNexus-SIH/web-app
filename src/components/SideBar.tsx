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
      <div className="flex items-center w-full">
        <button
          onClick={() => handleNavigation(path)}
          className="flex h-10 w-full shrink-0 items-center justify-center  hover:bg-muted/40 transition-all duration-300 ease-in-out"
        >
          {React.cloneElement(icon as React.ReactElement, {
            className:
              "h-5 w-5 transition-transform duration-300 ease-in-out hover:scale-110",
          })}
        </button>
        <span className="ml-4 text-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100 whitespace-nowrap overflow-hidden">
          {title}
        </span>
      </div>
    );
  };

  return (
    <div
      className={`group hover:w-64 transition-all duration-300 ease-in-out mx-2 w-14 flex-col border-22 bg-background sm:flex ${className}`}
    >
      <div className="flex flex-col items-start gap-4 px-2 sm:py-5 w-full">
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
      </div>
      <div className="mt-auto flex justify-start px-2 sm:py-5 w-full">
        <SideBarComponent
          path="/dashboard/settings"
          icon={<Settings />}
          title="Settings"
        />
      </div>
    </div>
  );
}
