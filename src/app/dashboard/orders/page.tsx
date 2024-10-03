"use client";

import React, { useState, useEffect } from "react";
import { DotIcon, Plus, ListOrdered, Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import BreadCrumb from "@/components/BreadCrumb";
import TotalSalesChart from "@/components/Graph Charts/TotalSalesChart";
import InventoryLevelsChart from "@/components/Graph Charts/InventoryLevelsChart";
import OrderStatusChart from "@/components/Graph Charts/OrderStatusChart";
import OrderTableRow from "./OrderTableRow";
import SupplierPerformanceChart from "@/components/Graph Charts/SupplierPerformanceChart";
import SearchInputField from "@/components/SearchInputField";
type OrderStatus = "failure" | "pending" | "success";
type PaymentStatus = "pending" | "done";

interface Order {
  orderId: string;
  date: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  supplier: string;
  amount: string;
}

const initialOrders: Order[] = [
  {
    orderId: "#123",
    date: "2023-04-15",
    status: "pending",
    paymentStatus: "done",
    supplier: "Acme Pharmaceuticals",
    amount: "$1,250.00",
  },
  {
    orderId: "#456",
    date: "2023-04-10",
    status: "success",
    paymentStatus: "pending",
    supplier: "Medica Supplies",
    amount: "$750.00",
  },
  {
    orderId: "#789",
    date: "2023-04-05",
    status: "failure",
    paymentStatus: "done",
    supplier: "Pharma Distributors",
    amount: "$500.00",
  },
  {
    orderId: "#321",
    date: "2023-04-01",
    status: "success",
    paymentStatus: "done",
    supplier: "Medica Supplies",
    amount: "$1,000.00",
  },
];


const OrderTable: React.FC<{ orders: Order[] }> = ({ orders }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Payment Status</TableHead>
          <TableHead>Supplier</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <OrderTableRow
            key={order.orderId}
            orderId={order.orderId}
            date={order.date}
            status={order.status}
            paymentStatus={order.paymentStatus}
            supplier={order.supplier}
            amount={order.amount}
            actions={
              <Button variant="outline" size="icon" className="h-8 w-8">
                <DotIcon className="h-4 w-4" />
              </Button>
            }
          />
        ))}
      </TableBody>
    </Table>
  );
};

const OrderFilters: React.FC<{
  selectedFilters: string[];
  setSelectedFilters: React.Dispatch<React.SetStateAction<string[]>>;
}> = ({ selectedFilters, setSelectedFilters }) => {
  const toggleFilter = (filter: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          <span>Filter</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel>Filter by</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={selectedFilters.includes("pending")}
          onCheckedChange={() => toggleFilter("pending")}
        >
          Pending
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={selectedFilters.includes("success")}
          onCheckedChange={() => toggleFilter("success")}
        >
          Approved
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={selectedFilters.includes("failure")}
          onCheckedChange={() => toggleFilter("failure")}
        >
          Cancelled
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const OrderSorting: React.FC<{
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
}> = ({ sortBy, setSortBy }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <ListOrdered className="h-4 w-4" />
          <span>Sort</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel>Sort by</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
          <DropdownMenuRadioItem value="date">Date</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="status">Status</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="amount">Amount</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("date");

  useEffect(() => {
    let filteredOrders = initialOrders;

    // Apply search
    if (searchQuery) {
      filteredOrders = filteredOrders.filter(
        (order) =>
          order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.supplier.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply filters
    if (selectedFilters.length > 0) {
      filteredOrders = filteredOrders.filter((order) =>
        selectedFilters.includes(order.status)
      );
    }

    // Apply sorting
    filteredOrders.sort((a, b) => {
      if (sortBy === "date") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (sortBy === "status") {
        return a.status.localeCompare(b.status);
      } else if (sortBy === "amount") {
        return (
          parseFloat(b.amount.replace("$", "").replace(",", "")) -
          parseFloat(a.amount.replace("$", "").replace(",", ""))
        );
      }
      return 0;
    });

    setOrders(filteredOrders);
  }, [searchQuery, selectedFilters, sortBy]);

  return (
    <div className="flex-1 w-full overflow-y-auto p-4 md:p-6 bg-muted/40 space-y-4">
      <BreadCrumb
        paths={[
          { pageName: "Dashboard", path: "/dashboard" },
          { pageName: "Orders", path: "/dashboard/orders" },
        ]}
      />
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Orders</h1>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          New Order
        </Button>
      </div>
      <div className="bg-background border rounded-lg overflow-hidden w-full">
        <div className="px-6 py-4 border-b flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <SearchInputField
            className="w-full md:w-1/2"
            placeholder="Search Orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="flex items-center gap-4 w-full md:w-auto">
            <OrderFilters
              selectedFilters={selectedFilters}
              setSelectedFilters={setSelectedFilters}
            />
            <OrderSorting sortBy={sortBy} setSortBy={setSortBy} />
          </div>
        </div>
        <div className="p-2 md:p-5">
          <OrderTable orders={orders} />
        </div>
      </div>
      <div className="grid gap-8 mt-8">
        <div className="grid md:grid-cols-2 gap-6">
          <TotalSalesChart />
          <InventoryLevelsChart />
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <OrderStatusChart />
          <SupplierPerformanceChart />
        </div>
      </div>
    </div>
  );
}
