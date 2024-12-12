"use client";

import { useState } from "react";
import { ArrowUpDown, MoreHorizontal, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type Order = {
  id: string;
  hospitalName: string;
  itemName: string;
  quantity: number;
  totalPrice: number;
  paymentStatus: "Paid" | "Unpaid";
  stockStatus: "Available" | "Unavailable";
  orderStatus: "Pending" | "Accepted" | "Declined";
  orderDate: string;
};

export function OrdersTable({
  data,
  onAcceptOrder,
  onDeclineOrder,
}: {
  data: Order[];
  onAcceptOrder: (id: string) => void;
  onDeclineOrder: (id: string) => void;
}) {
  const [sortColumn, setSortColumn] = useState<keyof Order>("totalPrice");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const sortedData = [...data].sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const toggleSort = (column: keyof Order) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  return (
    <div className="rounded-md border">
      <Table className="bg-background rounded-md">
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Hospital Name</TableHead>
            <TableHead>Item</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => toggleSort("totalPrice")}>
                Total Price
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>Payment Status</TableHead>
            <TableHead>Stock Status</TableHead>
            <TableHead>Order Status</TableHead>
            <TableHead>Order Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.hospitalName}</TableCell>
              <TableCell>{order.itemName}</TableCell>
              <TableCell>{order.quantity}</TableCell>
              <TableCell className="font-medium">
                {new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                }).format(order.totalPrice)}
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    order.paymentStatus === "Paid" ? "default" : "destructive"
                  }
                >
                  {order.paymentStatus}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    order.stockStatus === "Available"
                      ? "default"
                      : "destructive"
                  }
                >
                  {order.stockStatus}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    order.orderStatus === "Accepted"
                      ? "default"
                      : order.orderStatus === "Declined"
                      ? "destructive"
                      : "secondary"
                  }
                >
                  {order.orderStatus}
                </Badge>
              </TableCell>
              <TableCell>
                {new Date(order.orderDate).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                      onClick={() => navigator.clipboard.writeText(order.id)}
                    >
                      Copy order ID
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>View details</DropdownMenuItem>
                    {order.orderStatus === "Pending" && (
                      <>
                        <DropdownMenuItem
                          onClick={() => onAcceptOrder(order.id)}
                        >
                          <Check className="mr-2 h-4 w-4" /> Accept order
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onDeclineOrder(order.id)}
                        >
                          <X className="mr-2 h-4 w-4" /> Decline order
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
