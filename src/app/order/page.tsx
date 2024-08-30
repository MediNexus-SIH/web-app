"use client";
import { useState, useMemo, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import DropdownMenuProfile from "@/components/DropdrownMenuProfile";

export default function Component() {
  const [orders, setOrders] = useState([
    {
      id: 1,
      name: "Surgical Masks",
      quantity: 500,
      status: "Pending",
      urgency: "High",
      deliveryDate: "2023-06-15",
      progress: 50,
    },
    {
      id: 2,
      name: "Nitrile Gloves",
      quantity: 1000,
      status: "Shipped",
      urgency: "Medium",
      deliveryDate: "2023-06-12",
      progress: 80,
    },
    {
      id: 3,
      name: "Infusion Pumps",
      quantity: 20,
      status: "Delivered",
      urgency: "High",
      deliveryDate: "2023-06-10",
      progress: 100,
    },
    {
      id: 4,
      name: "Surgical Gowns",
      quantity: 300,
      status: "Pending",
      urgency: "Low",
      deliveryDate: "2023-06-20",
      progress: 30,
    },
    {
      id: 5,
      name: "Ventilators",
      quantity: 10,
      status: "Shipped",
      urgency: "High",
      deliveryDate: "2023-06-18",
      progress: 70,
    },
  ]);
  const [filters, setFilters] = useState({
    date: "",
    status: "",
    urgency: "",
  });
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      if (filters.date && order.deliveryDate !== filters.date) {
        return false;
      }
      if (filters.status && order.status !== filters.status) {
        return false;
      }
      if (filters.urgency && order.urgency !== filters.urgency) {
        return false;
      }
      return true;
    });
  }, [orders, filters]);
  useEffect(() => {
    const socket = new WebSocket("wss://hospital-orders.example.com");
    socket.onmessage = (event) => {
      const updatedOrder = JSON.parse(event.data);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === updatedOrder.id ? updatedOrder : order
        )
      );
    };
    return () => {
      socket.close();
    };
  }, []);
  return (
    <div className="grid min-h-screen w-full bg-muted/40">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <h1 className="flex-1 font-semibold text-lg">Order Tracking</h1>
        <div className="relative flex-1 md:grow-0">
          <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search orders..."
            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
          />
        </div>
        <DropdownMenuProfile/>
      </header>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <Card className="grid gap-4">
            <CardHeader className="pb-3">
              <CardTitle>Order History</CardTitle>
              <CardDescription>
                View and manage your hospital&apos;s orders in real-time.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="date-filter">Date</Label>
                  <Select
                    value={filters.date}
                    onValueChange={(value) =>
                      setFilters((prev) => ({ ...prev, date: value }))
                    }
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="All Dates" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="_">All Dates</SelectItem>
                      <SelectItem value="2023-06-10">June 10, 2023</SelectItem>
                      <SelectItem value="2023-06-12">June 12, 2023</SelectItem>
                      <SelectItem value="2023-06-15">June 15, 2023</SelectItem>
                      <SelectItem value="2023-06-18">June 18, 2023</SelectItem>
                      <SelectItem value="2023-06-20">June 20, 2023</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="status-filter">Status</Label>
                  <Select
                    value={filters.status}
                    onValueChange={(value) =>
                      setFilters((prev) => ({ ...prev, status: value }))
                    }
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="All Statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="statuses">All Statuses</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Shipped">Shipped</SelectItem>
                      <SelectItem value="Delivered">Delivered</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="urgency-filter">Urgency</Label>
                  <Select
                    value={filters.urgency}
                    onValueChange={(value) =>
                      setFilters((prev) => ({ ...prev, urgency: value }))
                    }
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="All Urgencies" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="urgencies">All Urgencies</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="grid gap-4">
            <CardHeader className="pb-3">
              <CardTitle>Order Details</CardTitle>
              <CardDescription>
                View detailed information about your hospital&apos;s orders.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Urgency</TableHead>
                    <TableHead>Delivery Date</TableHead>
                    <TableHead>Progress</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>
                        <div className="font-medium">{order.name}</div>
                      </TableCell>
                      <TableCell>{order.quantity}</TableCell>
                      <TableCell>
                        <Badge
                          className="text-xs"
                          variant={
                            order.status === "Pending"
                              ? "secondary"
                              : order.status === "Shipped"
                              ? "outline"
                              : "success"
                          }
                        >
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className="text-xs"
                          variant={
                            order.urgency === "High"
                              ? "high"
                              : order.urgency === "Medium"
                              ? "warning"
                              : "secondary"
                          }
                        >
                          {order.urgency}
                        </Badge>
                      </TableCell>
                      <TableCell>{order.deliveryDate}</TableCell>
                      <TableCell>
                        <Progress
                          value={order.progress}
                          aria-label={`${order.progress}% complete`}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-start bg-muted/50">
              <div className="grid gap-0.5">
                <CardTitle className="group flex items-center gap-2 text-lg">
                  Order Summary
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <div className="h-3 w-3" />
                    <span className="sr-only">Copy Order Summary</span>
                  </Button>
                </CardTitle>
                <CardDescription>Updated: June 15, 2023</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-6 text-sm">
              <div className="grid gap-3">
                <div className="font-semibold">Order Details</div>
                <ul className="grid gap-3">
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Surgical Masks x <span>500</span>
                    </span>
                    <span>$1,250.00</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Nitrile Gloves x <span>1,000</span>
                    </span>
                    <span>$500.00</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Infusion Pumps x <span>20</span>
                    </span>
                    <span>$10,000.00</span>
                  </li>
                </ul>
                <Separator className="my-2" />
                <ul className="grid gap-3">
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>$11,750.00</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>$50.00</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span>$1,000.00</span>
                  </li>
                  <li className="flex items-center justify-between font-semibold">
                    <span className="text-muted-foreground">Total</span>
                    <span>$12,800.00</span>
                  </li>
                </ul>
              </div>
              <Separator className="my-4" />
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-3">
                  <div className="font-semibold">Shipping Information</div>
                  <address className="grid gap-0.5 not-italic text-muted-foreground">
                    <span>Acme Hospital</span>
                    <span>1234 Main St.</span>
                    <span>Anytown, CA 12345</span>
                  </address>
                </div>
                <div className="grid auto-rows-max gap-3">
                  <div className="font-semibold">Billing Information</div>
                  <div className="text-muted-foreground">
                    Same as shipping address
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
