import React from "react";
import {
  House,
  Package,
  Truck,
  Users,
  ChartColumn,
  Settings,
  Hospital,
} from "lucide-react";
import { SideBarComponent } from "./SideBarComponent";

export default function StickySideBar2({ className }: { className?: string }) {
  return (
    <div
      className={`group hover:w-48 transition-all duration-500 ease-in-out m-2 w-12 flex-col bg-background flex ${className}`}
    >
      <div className="sticky top-0 flex flex-col w-full h-svh space-between py-4">
        {/* Top section with main navigation items */}
        <div className="flex flex-col gap-4 items-center h-full w-full">
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

        {/* Settings at the bottom */}
        <div className="mt-4">
          <SideBarComponent
            path="/settings"
            icon={<Settings />}
            title="Settings"
          />
        </div>
      </div>
    </div>
  );
}
