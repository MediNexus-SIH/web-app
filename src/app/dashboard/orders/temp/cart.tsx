"use client";

import React, { useState } from "react";
import { Minus, Plus, ShoppingCart, Trash, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface MedicalSupplyItem {
  id: string;
  quantity: number;
  unit_price: number;
  item: {
    item_id: string;
    generic_name: string;
    brand_name: string;
    dosage: string;
    form: string;
    manufacturer: string;
  };
  category: {
    id: string;
    name: string;
  };
  expiry_date: string;
  requires_refrigeration: boolean;
}

interface MedicalSupplyCartProps {
  onSubmitOrder: (items: MedicalSupplyItem[]) => Promise<void>;
}

// Hardcoded data for medical supplies
const initialMedicalSupplies: MedicalSupplyItem[] = [
  {
    id: "1",
    quantity: 100,
    unit_price: 2.99,
    item: {
      item_id: "MED001",
      generic_name: "Paracetamol",
      brand_name: "Tylenol",
      dosage: "500mg",
      form: "Tablet",
      manufacturer: "Johnson & Johnson",
    },
    category: {
      id: "CAT001",
      name: "Analgesics",
    },
    expiry_date: "2025-12-31",
    requires_refrigeration: false,
  },
  {
    id: "2",
    quantity: 50,
    unit_price: 15.99,
    item: {
      item_id: "MED002",
      generic_name: "Amoxicillin",
      brand_name: "Amoxil",
      dosage: "250mg",
      form: "Capsule",
      manufacturer: "GlaxoSmithKline",
    },
    category: {
      id: "CAT002",
      name: "Antibiotics",
    },
    expiry_date: "2024-06-30",
    requires_refrigeration: false,
  },
  {
    id: "3",
    quantity: 20,
    unit_price: 89.99,
    item: {
      item_id: "MED003",
      generic_name: "Insulin Glargine",
      brand_name: "Lantus",
      dosage: "100units/mL",
      form: "Solution",
      manufacturer: "Sanofi",
    },
    category: {
      id: "CAT003",
      name: "Diabetes",
    },
    expiry_date: "2023-12-31",
    requires_refrigeration: true,
  },
];

const MedicalSupplyCart: React.FC<MedicalSupplyCartProps> = ({
  onSubmitOrder,
}) => {
  const [cartItems, setCartItems] = useState<MedicalSupplyItem[]>(
    initialMedicalSupplies
  );
  const { toast } = useToast();

  const totalCost = cartItems.reduce(
    (total, item) => total + item.quantity * item.unit_price,
    0
  );

  const handleRemoveItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
    toast({
      title: "Item removed",
      description: "Item has been removed from your order",
    });
  };

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity > 0) {
      setCartItems(
        cartItems.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-4 w-4" />
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary text-xs text-primary-foreground flex items-center justify-center">
              {cartItems.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Medical Supply Order</SheetTitle>
          <SheetDescription>
            Review your order before submitting to the vendor.
          </SheetDescription>
        </SheetHeader>
        <div className="mt-8 space-y-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[300px] text-center">
              <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-lg font-medium text-muted-foreground">
                Your order is empty.
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Add medical supplies to your order to get started.
              </p>
            </div>
          ) : (
            <ScrollArea className="h-[400px] w-full rounded-md border p-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start space-x-4 mb-6 pb-6 border-b-2 last:border-b-0"
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium leading-5">
                      {item.item.brand_name} ({item.item.generic_name})
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {item.item.dosage} - {item.item.form}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Manufacturer: {item.item.manufacturer}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Category: {item.category.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Expires: {item.expiry_date}
                    </p>
                    <div className="flex items-center w-full mt-4 space-x-4">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          handleUpdateQuantity(item.id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="mx-2 min-w-[2rem] text-center">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          handleUpdateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      {item.requires_refrigeration && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <AlertCircle className="h-4 w-4 text-blue-500" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Requires refrigeration</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      ${(item.quantity * item.unit_price).toFixed(2)}
                    </p>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="mt-2"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <Trash className="text-red-500 h-6 w-6" />
                    </Button>
                  </div>
                </div>
              ))}
            </ScrollArea>
          )}
          {cartItems.length > 0 && (
            <>
              <Separator className="my-4" />
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium">Subtotal</p>
                  <p className="text-sm font-medium">${totalCost.toFixed(2)}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-base font-semibold">Total</p>
                  <p className="text-lg font-semibold">
                    ${totalCost.toFixed(2)}
                  </p>
                </div>
                <Button
                  className="w-full"
                  onClick={() => onSubmitOrder(cartItems)}
                >
                  Submit Order to Vendor
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MedicalSupplyCart;
