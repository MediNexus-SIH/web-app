"use client";

import React, { useState, useMemo } from "react";
import { Plus, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Hardcoded data with vendor ratings
const items = [
  {
    id: 1,
    name: "Paracetamol",
    vendors: [
      { name: "PharmaCorp", rating: 4 },
      { name: "MediSupply", rating: 3 },
    ],
  },
  {
    id: 2,
    name: "Ibuprofen",
    vendors: [
      { name: "HealthPharm", rating: 5 },
      { name: "MediSupply", rating: 3 },
    ],
  },
  {
    id: 3,
    name: "Amoxicillin",
    vendors: [
      { name: "PharmaCorp", rating: 4 },
      { name: "HealthPharm", rating: 5 },
    ],
  },
];

const departments = [
  { id: 1, name: "Emergency" },
  { id: 2, name: "Pediatrics" },
  { id: 3, name: "Surgery" },
];

const OrderSheet = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    item_name: "",
    quantity: "",
    vendor: "",
    department: "",
  });
  const [cartItems, setCartItems] = useState<
    Array<{
      item_name: string;
      quantity: number;
      vendor: string;
      department: string;
    }>
  >([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddToCart = () => {
    setCartItems([
      ...cartItems,
      { ...formData, quantity: Number(formData.quantity) },
    ]);
    setFormData({ item_name: "", quantity: "", vendor: "", department: "" });
    setOpen(false);
  };

  const selectedItem = items.find((item) => item.name === formData.item_name);

  const vendorOptions = useMemo(() => {
    return selectedItem?.vendors.sort((a, b) => b.rating - a.rating) || [];
  }, [selectedItem]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </SheetTrigger>

      <SheetContent className="sm:max-w-[500px] w-[90vw]">
        <SheetHeader>
          <SheetTitle>Add Item to Cart</SheetTitle>
          <SheetDescription>
            Select an item, vendor, quantity, and department to add to your
            cart.
          </SheetDescription>
        </SheetHeader>
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Item Details</CardTitle>
            <CardDescription>
              Fill in the details of the item you want to add.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="item_name" className="text-right">
                  Item
                </Label>
                <Select
                  name="item_name"
                  value={formData.item_name}
                  onValueChange={(value) =>
                    handleSelectChange("item_name", value)
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select an item" />
                  </SelectTrigger>
                  <SelectContent>
                    {items.map((item) => (
                      <SelectItem key={item.id} value={item.name}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="vendor" className="text-right">
                  Vendor
                </Label>
                <Select
                  name="vendor"
                  value={formData.vendor}
                  onValueChange={(value) => handleSelectChange("vendor", value)}
                  disabled={!formData.item_name}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a vendor" />
                  </SelectTrigger>
                  <SelectContent>
                    {vendorOptions.map((vendor) => (
                      <SelectItem key={vendor.name} value={vendor.name}>
                        <div className="flex items-center space-x-3 w-full">
                          <span>{vendor.name}</span>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="flex items-center">
                                  <span className="mr-1">{vendor.rating}</span>
                                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                </div>
                              </TooltipTrigger>
                              <TooltipContent side="left">
                                <div className="flex">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                      key={star}
                                      className={`h-4 w-4 ${
                                        star <= vendor.rating
                                          ? "text-yellow-400 fill-yellow-400"
                                          : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="quantity" className="text-right">
                  Quantity
                </Label>
                <Input
                  className="col-span-3"
                  id="item-quantity"
                  name="quantity"
                  type="number"
                  placeholder="Enter Quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  min="1"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="department" className="text-right">
                  Department
                </Label>
                <Select
                  name="department"
                  value={formData.department}
                  onValueChange={(value) =>
                    handleSelectChange("department", value)
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept.id} value={dept.name}>
                        {dept.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Cart Items</h3>
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ul className="space-y-2">
              {cartItems.map((item, index) => (
                <li key={index} className="border-b pb-2">
                  <p>
                    <strong>{item.item_name}</strong> - {item.quantity} units
                  </p>
                  <p>Vendor: {item.vendor}</p>
                  <p>Department: {item.department}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <SheetFooter className="mt-6">
          <Button
            onClick={handleAddToCart}
            disabled={
              !formData.item_name ||
              !formData.vendor ||
              !formData.quantity ||
              !formData.department
            }
            className="w-full"
          >
            Add to Cart
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default OrderSheet;
