"use client";

import { useState } from "react";
import { OrdersTable, Order } from "../components/orders-table";
import { Button } from "@/components/ui/button";

const initialOrders: Order[] = [
  {
    id: "ORD001",
    hospitalName: "City General Hospital",
    itemName: "Paracetamol",
    quantity: 1000,
    totalPrice: 50000,
    paymentStatus: "Paid",
    stockStatus: "Available",
    orderStatus: "Pending",
    orderDate: "2023-06-01",
  },
  {
    id: "ORD002",
    hospitalName: "St. Mary's Medical Center",
    itemName: "Endoscope",
    quantity: 2,
    totalPrice: 800000,
    paymentStatus: "Unpaid",
    stockStatus: "Available",
    orderStatus: "Pending",
    orderDate: "2023-06-02",
  },
  {
    id: "ORD003",
    hospitalName: "Sunshine Children's Hospital",
    itemName: "Antacid",
    quantity: 500,
    totalPrice: 80000,
    paymentStatus: "Paid",
    stockStatus: "Unavailable",
    orderStatus: "Pending",
    orderDate: "2023-06-03",
  },
  {
    id: "ORD004",
    hospitalName: "Veterans Memorial Hospital",
    itemName: "Barium Swallow",
    quantity: 50,
    totalPrice: 80000,
    paymentStatus: "Unpaid",
    stockStatus: "Available",
    orderStatus: "Pending",
    orderDate: "2023-06-04",
  },
  {
    id: "ORD005",
    hospitalName: "University Medical Center",
    itemName: "Colonoscope",
    quantity: 1,
    totalPrice: 640000,
    paymentStatus: "Paid",
    stockStatus: "Available",
    orderStatus: "Pending",
    orderDate: "2023-06-05",
  },
];

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  const handleAcceptOrder = (id: string) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, orderStatus: "Accepted" } : order
      )
    );
  };

  const handleDeclineOrder = (id: string) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, orderStatus: "Declined" } : order
      )
    );
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6 bg-muted/40">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
        <div className="flex items-center space-x-2">
          <Button>Create Order</Button>
        </div>
      </div>
      <OrdersTable
        data={orders}
        onAcceptOrder={handleAcceptOrder}
        onDeclineOrder={handleDeclineOrder}
      />
    </div>
  );
}
