"use client";
import React from "react";
import { DotIcon, X, Plus, ListOrdered, Filter } from "lucide-react";
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

import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
} from "@/components/ui/sheet";

import SearchInputField from "@/components/SearchInputField";
import InventoryLevelsChart from "./graphCharts/InventoryLevelsChart";
import OrderTableRow from "./OrderTableRow";
import OrderStatusChart from "./graphCharts/OrderStatusChart";
import SupplierPerformanceChart from "./graphCharts/SupplierPerformanceChart";
import TotalSalesChart from "./graphCharts/TotalSalesChart";

const OrderTable = () => {
  type OrderStatus = "failure" | "pending" | "success";
  const orders = [
    {
      orderId: "#123",
      date: "2023-04-15",
      status: "pending" as OrderStatus,
      supplier: "Acme Pharmaceuticals",
      amount: "$1,250.00",
    },
    {
      orderId: "#456",
      date: "2023-04-10",
      status: "success" as OrderStatus,
      supplier: "Medica Supplies",
      amount: "$750.00",
    },
    {
      orderId: "#789",
      date: "2023-04-05",
      status: "failure" as OrderStatus,
      supplier: "Pharma Distributors",
      amount: "$500.00",
    },
    {
      orderId: "#321",
      date: "2023-04-01",
      status: "success" as OrderStatus,
      supplier: "Medica Supplies",
      amount: "$1,000.00",
    },
  ];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
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

const OrderFilters = () => {
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
        <DropdownMenuCheckboxItem checked>Pending</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem>Approved</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem>Fulfilled</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem>Cancelled</DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const OrderSorting = () => {
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
        <DropdownMenuRadioGroup value="date">
          <DropdownMenuRadioItem value="date">Date</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="status">Status</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="amount">Amount</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const page = () => {
  return (
    <main className="container px-4 md:px-6 py-8 flex-1 bg-muted/40">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Orders</h1>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          New Order
        </Button>
      </div>
      <div className="bg-background border rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <SearchInputField className="w-full" placeholder="Search Orders..." />
          <div className="flex items-center gap-4">
            <OrderFilters />
            <OrderSorting />
          </div>
        </div>
        <div className="mx-5 my-2">
          <OrderTable />
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
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="fixed bottom-4 right-4 md:hidden"
          >
            Hello
            <span className="sr-only">Order Tracker</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-full max-w-[400px]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Order Tracker</h2>
            <SheetClose asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <X className="h-5 w-5" />
              </Button>
            </SheetClose>
          </div>
          <div className="grid gap-6">
            <div className="grid gap-2">
              <h3 className="text-lg font-medium">Order #123</h3>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  Pending
                </Badge>
                <span className="text-sm text-muted-foreground">
                  Placed on 2023-04-15
                </span>
              </div>
            </div>
            <div className="grid gap-2">
              <h3 className="text-lg font-medium">Delivery Status</h3>
              <div className="grid gap-4">
                <div className="flex items-center gap-2">
                  <div className="" />
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </main>
  );
};

export default page;
