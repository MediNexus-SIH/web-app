import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import BreadCrumb from "@/components/BreadCrumb";
import ReorderReqCard from "@/components/Inventory Components/ReorderReqCard";
import ExpiryCard from "@/components/Inventory Components/ExpiryCard";
import LowStockCard from "@/components/Inventory Components/LowStockCard";
import TotalItemsCard from "@/components/Inventory Components/TotalItemsCard";
import InventoryItemsCard from "@/components/Inventory Components/InventoryItemsCard";

export default function Component() {
  return (
    <div className="flex-1 min-h-screen bg-muted/40 p-6 overflow-auto">
      <div className="flex flex-col gap-4">
        <BreadCrumb
          paths={[
            { pageName: "Dashboard", path: "/dashboard" },
            { pageName: "Inventory", path: "/dashboard/inventory" },
          ]}
        />
        <h1 className="text-2xl font-bold">Inventory</h1>
        <main className="flex-1 flex flex-col items-start gap-4">
          <div className="flex flex-wrap gap-4 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <TotalItemsCard />
            <LowStockCard />
            <ExpiryCard />
            <ReorderReqCard />
          </div>
          <InventoryItemsCard />
          <PaginationInv />
        </main>
      </div>
    </div>
  );
}

const PaginationInv = () => {
  return (
    <Pagination className="mb-2">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">
            <Button variant={"outline"}>1</Button>
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};



