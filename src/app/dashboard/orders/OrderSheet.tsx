"use client";

import React, { useState } from "react";
import { Calendar, Package, CreditCard, Truck, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";

type OrderStatus = "failure" | "pending" | "success";
type PaymentStatus = "pending" | "done";

interface OrderDetailsSheetProps {
  orderId: string;
  date: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  supplier: string;
  amount: string;
}

export function OrderSheet({
  orderId,
  date,
  status,
  paymentStatus,
  supplier,
  amount,
}: OrderDetailsSheetProps) {
  const [isTracking, setIsTracking] = useState(false);
  const [trackingProgress, setTrackingProgress] = useState(0);

  const handleStartTracking = () => {
    setIsTracking(true);
    // Simulate real-time updates
    const interval = setInterval(() => {
      setTrackingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 20;
      });
    }, 2000);
  };

  const handlePayment = () => {
    // Implement payment logic here
    alert(
      "Payment processing... This is where you'd integrate a payment gateway."
    );
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost">{orderId}</Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-[425px]">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold">Order Details</SheetTitle>
          <SheetDescription>
            View and manage details for order {orderId}
          </SheetDescription>
        </SheetHeader>
        <div className="py-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Order Status</h3>
            <Badge
              variant={
                paymentStatus === "done"
                  ? "done"
                  : status === "pending"
                  ? "pending"
                  : null
              }
              className="capitalize"
            >
              {status}
            </Badge>
          </div>
          <Separator />
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Order Date</p>
                <p className="text-sm text-muted-foreground">{date}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Package className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Supplier</p>
                <p className="text-sm text-muted-foreground">{supplier}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <CreditCard className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Payment</p>
                <div className="flex items-center space-x-2">
                  <p className="text-sm text-muted-foreground">{amount}</p>
                  <Badge
                    variant={paymentStatus === "done" ? "success" : null}
                    className="capitalize"
                  >
                    {paymentStatus}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Truck className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Estimated Delivery</p>
                <p className="text-sm text-muted-foreground">
                  3-5 business days
                </p>
              </div>
            </div>
          </div>
          <Separator />
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Real-time Tracking</h3>
            {!isTracking ? (
              <Button onClick={handleStartTracking}>Start Tracking</Button>
            ) : (
              <div className="space-y-4">
                <Progress value={trackingProgress} className="w-full" />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Order Placed</span>
                  <span>In Transit</span>
                  <span>Delivered</span>
                </div>
                <div className="flex items-center space-x-2 mt-4">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <p className="text-sm">
                    {trackingProgress < 50
                      ? "Order is being prepared"
                      : trackingProgress < 100
                      ? "Order is in transit"
                      : "Order has been delivered"}
                  </p>
                </div>
                <div className="relative w-full h-48 bg-muted rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg"
                    alt="Map showing order location"
                    width={383}
                    height={192}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <MapPin className="h-8 w-8 text-primary" />
                  </div>
                </div>
              </div>
            )}
          </div>
          {paymentStatus === "pending" && (
            <>
              <Separator />
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Payment Required</h3>
                <Button onClick={handlePayment} className="w-full">
                  Pay Now
                </Button>
              </div>
            </>
          )}
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
export default OrderSheet;
