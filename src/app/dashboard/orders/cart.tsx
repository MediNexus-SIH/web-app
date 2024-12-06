"use client";

import React from "react";
import { Minus, Plus, ShoppingCart, Trash, X } from "lucide-react";
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
import { useCart } from "@/hooks/use-cart";

export interface CartItem {
  id: string;
  quantity: number;
  unit_price: number;
  item: {
    item_id: string;
    item_name: string;
    description: string;
    supplier: string;
    category: string;
  };
  department: {
    id: string;
    department: string;
  };
}

interface CartProps {
  onCheckout: (items: CartItem[]) => Promise<void>;
}




const Cart: React.FC<CartProps> =  ({ onCheckout }) => {
  const { cartItems, updateCartItemQuantity, removeCartItem, isLoading } =
    useCart();
  const { toast } = useToast();

  const totalCost = cartItems.reduce(
    (total, item) => total + item.quantity * item.unit_price,
    0
  );

  const handleRemoveItem = (id: string) => {
    removeCartItem(id);
    toast({
      title: "Item removed",
      description: "Item has been removed from your cart",
    });
  };

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity > 0) {
      updateCartItemQuantity(id, newQuantity);
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
          <SheetTitle>Your Cart</SheetTitle>
          <SheetDescription>
            Review your items before checking out.
          </SheetDescription>
        </SheetHeader>
        <div className="mt-8 space-y-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[300px] text-center">
              <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-lg font-medium text-muted-foreground">
                Your cart is empty.
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Add items to your cart to get started.
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
                      {item.item.item_name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1 ">
                      {item.item.supplier} - {item.department.department}
                    </p>
                    <div className="flex items-center w-full mt-4 space-x-4">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          handleUpdateQuantity(item.id, item.quantity - 1)
                        }
                        disabled={isLoading || item.quantity <= 1}
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
                        disabled={isLoading}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
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
                      disabled={isLoading}
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
                  onClick={() => onCheckout(cartItems)}
                  disabled={isLoading}
                >
                  Proceed to Checkout
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
