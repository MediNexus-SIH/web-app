import React from "react";
import {
  House,
  Package,
  Truck,
  Users,
  ChartColumn,
  Settings,
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
          <SideBarComponent path="/vendor" icon={<House />} title="Dashboard" />
          <SideBarComponent
            path="/vendor/inventory"
            icon={<Package />}
            title="Inventory"
          />
          <SideBarComponent path="/vendor/orders" icon={<Truck />} title="Orders" />
          <SideBarComponent
            path="/vendor/hospitals"
            icon={<Users />}
            title="Hospitals"
          />

          <SideBarComponent
            path="/vendor/predictions"
            icon={<ChartColumn />}
            title="Predictions"
          />
        </div>
      </div>
    </div>
  );
}
