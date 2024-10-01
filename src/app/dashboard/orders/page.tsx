"use client"
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

import SearchInputField from "@/components/SearchInputField";
import InventoryLevelsChart from "./graphCharts/InventoryLevelsChart";
import OrderTableRow from "./OrderTableRow";
import OrderStatusChart from "./graphCharts/OrderStatusChart";
import SupplierPerformanceChart from "./graphCharts/SupplierPerformanceChart";
import TotalSalesChart from "./graphCharts/TotalSalesChart";
import BreadCrumb from "@/components/BreadCrumb";

const OrderTable = () => {
  type OrderStatus = "failure" | "pending" | "success";
  type PaymentStatus = "pending" | "done";
  const orders = [
    {
      orderId: "#123",
      date: "2023-04-15",
      status: "pending" as OrderStatus,
      paymentStatus: "done" as PaymentStatus,
      supplier: "Acme Pharmaceuticals",
      amount: "$1,250.00",
    },
    {
      orderId: "#456",
      date: "2023-04-10",
      status: "success" as OrderStatus,
      paymentStatus: "pending" as PaymentStatus,
      supplier: "Medica Supplies",
      amount: "$750.00",
    },
    {
      orderId: "#789",
      date: "2023-04-05",
      status: "failure" as OrderStatus,
      paymentStatus: "done" as PaymentStatus,
      supplier: "Pharma Distributors",
      amount: "$500.00",
    },
    {
      orderId: "#321",
      date: "2023-04-01",
      status: "success" as OrderStatus,
      paymentStatus: "done" as PaymentStatus,
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
          />
          <div className="flex items-center gap-4 w-full md:w-auto">
            <OrderFilters />
            <OrderSorting />
          </div>
        </div>
        <div className="p-2 md:p-5">
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
    </div>
  );
};

export default page;
