"use client";

import React, { useState, useCallback, useMemo } from "react";
import { Loader, Plus } from "lucide-react";
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
import { useItems } from "@/hooks/use-items";
import useDepartments from "@/hooks/useDepartments";
import { useCart } from "@/hooks/use-cart";
import Loading from "@/components/Loaders/loading";

const OrderSheet = ({ loading }: { loading: boolean }) => {
  const { items } = useItems();
  const { dropdownDepartments, loading: departmentsLoading } = useDepartments();
  const { addToCart, isLoading } = useCart();

  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    item_name: "",
    quantity: "",
    vendor: "",
    department: "",
  });

  const uniqueItems = useMemo(() => {
    return Array.from(
      new Map(items.map((item) => [item.item_name, item])).values()
    );
  }, [items]);

  const itemOptions = useMemo(() => {
    return uniqueItems.map((item) => ({
      value: item.item_name,
      label: item.item_name,
    }));
  }, [uniqueItems]);

  const vendorOptions = useMemo(() => {
    const selectedItem = items.filter(
      (item) => item.item_name === formData.item_name
    );
    return selectedItem.map((item) => ({
      value: item.supplier,
      label: item.supplier,
    }));
  }, [items, formData.item_name]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleSelectChange = useCallback((name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleAddToCart = useCallback(async () => {
    console.log("Form Data", formData);
    const selectedItem = items.find(
      (item) =>
        item.item_name === formData.item_name &&
        item.supplier === formData.vendor
    );

    const selectedDepartment = dropdownDepartments.find(
      (dept) => dept.label === formData.department
    );

    if (selectedItem && selectedDepartment && formData.quantity) {
      const newItem = {
        item_id: selectedItem.item_id,
        quantity: parseInt(formData.quantity),
        department: selectedDepartment.label,
      };

      await addToCart(newItem);
      setFormData({ item_name: "", quantity: "", vendor: "", department: "" });
      setOpen(false);
      window.location.reload();
    }
  }, [formData, items, dropdownDepartments, addToCart]);

  console.log("Depart", dropdownDepartments);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </SheetTrigger>

      <React.Fragment>
        <SheetContent
          className={
            isLoading
              ? `h-full flex justify-center items-center sm:max-w-[500px] w-[90vw]`
              : `sm:max-w-[500px] w-[90vw]`
          }
        >
          {isLoading ? (
            <Loading w={"40"} h={"40"} />
          ) : (
            <div className="flex flex-col h-full">
              <SheetHeader>
                <SheetTitle>Add Item to Cart</SheetTitle>
                <SheetDescription>
                  Select an item, vendor, quantity, and department to add to
                  your cart.
                </SheetDescription>
              </SheetHeader>
              <Card className="flex-grow mt-4">
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
                          {itemOptions.map((option) => (
                            <SelectItem key={option.value} value={option.label}>
                              {option.label}
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
                        onValueChange={(value) =>
                          handleSelectChange("vendor", value)
                        }
                        disabled={!formData.item_name}
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select a vendor" />
                        </SelectTrigger>
                        <SelectContent>
                          {vendorOptions.map((option) => (
                            <SelectItem key={option.value} value={option.label}>
                              {option.label}
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
                        type="text"
                        placeholder="Enter Quantity"
                        value={formData.quantity}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (/^(0|[1-9]\d*)$/.test(value) || value === "") {
                            handleInputChange(e);
                          }
                        }}
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
                          {dropdownDepartments.map((option) => (
                            <SelectItem key={option.value} value={option.label}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

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
            </div>
          )}
        </SheetContent>
      </React.Fragment>
    </Sheet>
  );
};

export default OrderSheet;
