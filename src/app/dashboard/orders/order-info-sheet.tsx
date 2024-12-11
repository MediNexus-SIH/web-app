"use client";
import React, { useState, useEffect } from "react";
import {
  Calendar,
  Package,
  CreditCard,
  Truck,
  MapPin,
  ChevronDown,
  ChevronUp,
  IndianRupee,
} from "lucide-react";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import dynamic from "next/dynamic";
import { OrderItem } from "@/lib/interfaces";
import toSentenceCase from "@/hooks/toSentenceCase";
import IndicatorLabel from "@/components/indicator-label";

interface OrderInfoSheetProps {
  orderId: string;
  date: string;
  status: string;
  paymentStatus: string;
  amount: string;
  orderItems: OrderItem[];
}

const LocationTracker = dynamic(() => import("./location-tracker"), {
  ssr: false,
  loading: () => <p>Loading map...</p>,
});

const OrderInfoSheet = ({
  orderId,
  date,
  status,
  paymentStatus: initialPaymentStatus,
  amount,
  orderItems,
}: OrderInfoSheetProps) => {
  const [paymentStatus, setPaymentStatus] = useState(initialPaymentStatus);
  const [isTracking, setIsTracking] = useState(false);
  const [trackingProgress, setTrackingProgress] = useState(0);
  const [expandedItems, setExpandedItems] = useState<{
    [key: number]: boolean;
  }>({});
  const orderStatusColor =
    status === "SUCCESS"
      ? "bg-green-500"
      : status === "PENDING"
      ? "bg-yellow-500"
      : "bg-red-500";

  const orderStatusTextColor =
    status === "SUCCESS"
      ? "text-green-50"
      : status === "PENDING"
      ? "text-yellow-50"
      : "text-red-50";

  const paymentStatusColor =
    paymentStatus === "Paid" ? "bg-blue-500" : "bg-orange-700";

  const paymentStatusTextColor =
    paymentStatus === "Paid" ? "text-blue-50" : "text-orange-50";
  // Refresh effect to simulate state updates after payment
  useEffect(() => {
    if (paymentStatus === "Paid") {
    }
  }, [paymentStatus]);

  const handleStartTracking = () => {
    setIsTracking(true);
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
    alert(
      "Payment processing... This is where you'd integrate a payment gateway."
    );
    setPaymentStatus("Paid");
  };

  const handlePopoverOpenChange = (open: boolean, index: number) => {
    setExpandedItems((prev) => ({
      ...prev,
      [index]: open,
    }));
  };

  const displayId = orderId.length > 10 ? `${orderId.slice(0, 7)}...` : orderId;
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="px-2 py-1 h-auto text-left truncate max-w-[120px]"
          title={orderId}
        >
          {displayId}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col h-full p-0 max-w-[425px]">
        <SheetHeader className="px-6 py-4">
          <SheetTitle className="text-2xl font-bold">Order Details</SheetTitle>
          <SheetDescription>
            View and manage details for order <br />
            {orderId}
          </SheetDescription>
        </SheetHeader>
        <div className="flex-grow overflow-y-auto px-6">
          <div className="py-6 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Order Status</h3>
              <IndicatorLabel color={orderStatusColor} attribute={toSentenceCase(status)}/>
              {/* <Badge
                variant="outline"
                className={`${orderStatusColor} ${orderStatusTextColor}`}
              >
                {toSentenceCase(status)}
              </Badge> */}
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
              <div className="flex items-center w-full space-x-4">
                <CreditCard className="h-5 w-5 text-muted-foreground" />
                <div className="flex flex-col w-full">
                  <div className="text-sm font-medium">Payment</div>
                  <div className="flex items-center justify-between w-full">
                    <div className="text-sm text-muted-foreground">
                      {amount}
                    </div>
                    <div>
                      <IndicatorLabel color={paymentStatusColor} attribute={toSentenceCase(paymentStatus)}/>
                      {/* <Badge
                        variant="outline"
                        className={`${paymentStatusColor} ${paymentStatusTextColor}`}
                      >
                        {paymentStatus}
                      </Badge> */}
                    </div>
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
              <h3 className="text-lg font-semibold">Order Items</h3>
              {orderItems.map((item, index) => (
                <div key={index} className="space-y-2">
                  <Popover
                    onOpenChange={(open) =>
                      handlePopoverOpenChange(open, index)
                    }
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-between text-left font-normal"
                      >
                        <span>{item.item_name}</span>
                        <span className="flex items-center">
                          {item.quantity} x ₹ {(item.unit_price ?? 0).toFixed(2)}
                          {expandedItems[index] ? (
                            <ChevronUp className="ml-2 h-4 w-4" />
                          ) : (
                            <ChevronDown className="ml-2 h-4 w-4" />
                          )}
                        </span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="grid gap-4">
                        <div className="space-y-2">
                          <h4 className="font-medium leading-none">Details</h4>
                          <p className="text-sm text-muted-foreground">
                            Category: {item.item_category}
                          </p>
                        
                          <p className="text-sm text-muted-foreground">
                            Department {item.department}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Supplier: {item.item_supplier}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            <div className="flex space-x-2">
                              <div>Unit Price:</div>
                              <div className="flex items-center">
                                <IndianRupee className="h-3 w-3 items-center" />
                                <div>{item.unit_price}</div>
                              </div>
                            </div>
                          </p>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              ))}
            </div>
            <Separator />
            {paymentStatus == "Paid" ? (
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
                    <div className="relative w-full h-[400px] bg-muted rounded-lg overflow-hidden">
                      <LocationTracker />
                      <div className="absolute top-1/2 left-1/2 z-10 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                        <MapPin className="h-8 w-8 text-primary" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : null}

            {paymentStatus === "Unpaid" && (
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
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default OrderInfoSheet;
