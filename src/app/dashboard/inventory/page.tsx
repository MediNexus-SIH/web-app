"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useShowToast } from "@/hooks/useShowToast";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import BreadCrumb from "@/components/BreadCrumb";
import ExpiryCard from "@/components/Inventory Components/ExpiryCard";
import LowStockCard from "@/components/Inventory Components/LowStockCard";
import TotalItemsCard from "@/components/Inventory Components/TotalItemsCard";
import InventoryItemsCard from "@/components/Inventory Components/InventoryItemsCard";
import { Loader2, ClipboardList, QrCode, X, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DatePicker } from "@/components/ui/date-picker";
import { SelectDropdown } from "@/components/SelectDropdown";
import useDepartments from "@/hooks/useDepartments";
import useInventory from "@/hooks/useInventory";
import LoadingComponents from "@/components/LoadingComponents";
import TotalCostCard from "@/components/Inventory Components/TotalCostCard";
import NoItemComponent from "@/components/Inventory Components/NoItemComponent";
import {
  HeaderLoadingComponent,
  InvLoadingComponent,
} from "@/components/Inventory Components/InvLoadingComponent";

export default function Component() {
  const [addMethod, setAddMethod] = useState<"manual" | "qr" | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [manualItems, setManualItems] = useState<
    Array<{
      department: string;
      item_name: string;
      batch_number: string;
      expiry_date: string;
      quantity: number;
      unit_price: number;
    }>
  >([]);

  const { items, loading, error, addItems, fetchItems } = useInventory();
  const { showToast } = useShowToast();

  const [currentItem, setCurrentItem] = useState<{
    department: string;
    item_name: string;
    batch_number: string;
    expiry_date: string;
    quantity: number;
    unit_price: number;
  }>({
    department: "",
    item_name: "",
    batch_number: "",
    expiry_date: "",
    quantity: 0,
    unit_price: 0,
  });

  const [qrItems, setQrItems] = useState<
    Array<{ name: string; quantity: string }>
  >([]);

  const [isScanning, setIsScanning] = useState(false);

  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    undefined
  );

  const handleValueChange = (value: string) => {
    setSelectedValue(value);
    setCurrentItem((prev) => ({ ...prev, department: value }));
  };

  useEffect(() => {
    fetchItems();
  }, [fetchItems, refreshTrigger]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isScanning) {
      intervalId = setInterval(() => {
        fetch("https://xyz-backend.com/scanned-items")
          .then((response) => response.json())
          .then((data) => {
            setQrItems((prevItems) => [...prevItems, ...data]);
          })
          .catch((error) =>
            console.error("Error fetching scanned items:", error)
          );
      }, 5000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isScanning]);

  const handleAddItem = (method: "manual" | "qr") => {
    setAddMethod(method);
    if (method === "manual") {
      setIsDialogOpen(true);
    } else {
      setIsSheetOpen(true);
      setIsScanning(true);
    }
  };

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dharmeshwar and Kallu")
    if (
      !currentItem.item_name ||
      !currentItem.quantity ||
      !currentItem.batch_number ||
      !currentItem.department ||
      !currentItem.expiry_date ||
      !currentItem.unit_price
    ) {
      showToast(
        "Incomplete Item Details",
        "Please provide all required item details before submitting.",
        "destructive"
      );
      return;
    }

    let itemsToSubmit = manualItems.length > 0 ? manualItems : [currentItem];

    try {
      await addItems(itemsToSubmit);
      await fetchItems();
      showToast(
        "Items Added Successfully",
        "The items have been added to the inventory.",
        "default"
      );
      setRefreshTrigger((prev) => prev + 1);
    } catch (err: any) {
      showToast(
        "Error Adding Items",
        "An error occurred while adding items. Please try again.",
        "destructive"
      );
    }

    setIsDialogOpen(false);
    setManualItems([]);
    setCurrentItem({
      item_name: "",
      quantity: 0,
      expiry_date: "",
      batch_number: "",
      unit_price: 0,
      department: "",
    });
    setSelectedValue("");
  };

  const handleCurrentItemChange = (
    field:
      | "item_name"
      | "quantity"
      | "batch_number"
      | "unit_price"
      | "expiry_date",
    value: string | number
  ) => {
    setCurrentItem((prev) => ({ ...prev, [field]: value }));
  };

  const addManualItem = () => {
    console.log("hulalla")
    console.log("current item ",currentItem)
    if (
      currentItem.item_name &&
      currentItem.quantity &&
      currentItem.batch_number &&
      currentItem.expiry_date &&
      currentItem.unit_price &&
      currentItem.department
    ) {
      console.log("Enteredfghnhnjhn")
      setManualItems((prev) => [...prev, currentItem]);
      setCurrentItem({
        item_name: "",
        quantity: 0,
        expiry_date: "",
        batch_number: "",
        unit_price: 0,
        department: "",
      });
      setSelectedValue("");
    }
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
    setManualItems([]);
    setCurrentItem({
      item_name: "",
      quantity: 0,
      expiry_date: "",
      batch_number: "",
      unit_price: 0,
      department: "",
    });
    setSelectedValue("");
  };
  const LOW_STOCK_THRESHOLD = 20;
  const { dropdownDepartments } = useDepartments();

  const removeManualItem = (index: number) => {
    setManualItems((prev) => prev.filter((_, i) => i !== index));
  };

  const totalPrice = useMemo(() => {
    let totalPrice = 0;
    items.map((value) => {
      totalPrice += value.quantity * value.unit_price;
    });
    return totalPrice;
  }, [items]);

  const totalStockCount = useMemo(() => {
    let count = 0;
    items.map((value) => {
      count += value.quantity;
    });
    return count;
  }, [items]);

  const lowStockCount = useMemo(() => {
    return items.filter((item) => item.quantity < LOW_STOCK_THRESHOLD).length;
  }, [items]);

  const today = useMemo(() => new Date(), []);

  const thresholdDate = useMemo(() => {
    return new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
  }, [today]);

  const expiringStockCount = useMemo(() => {
    return items.filter((item) => {
      const expiryDate = new Date(item.expiry_date);
      return expiryDate <= thresholdDate;
    }).length;
  }, [items, thresholdDate]);

  return (
    <React.Fragment>
      <Toaster />
      <div className="flex-1 min-h-screen bg-muted/40 p-6 overflow-auto">
        <div className="flex flex-col gap-4">
          {loading ? (
            <InvLoadingComponent />
          ) : items.length > 0 ? (
            <React.Fragment>
              <BreadCrumb
                paths={[
                  { pageName: "Dashboard", path: "/dashboard" },
                  { pageName: "Inventory", path: "/dashboard/inventory" },
                ]}
              />
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Inventory</h1>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" /> Add Item
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-48 mx-2">
                    <div className="grid gap-4">
                      <Button
                        variant="ghost"
                        onClick={() => handleAddItem("manual")}
                        className="w-full justify-start"
                      >
                        <ClipboardList className="mr-2 h-4 w-4" />
                        Manual Entry
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => handleAddItem("qr")}
                        className="w-full justify-start"
                      >
                        <QrCode className="mr-2 h-4 w-4" />
                        Scan QR Code
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex-1 flex flex-col items-start gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
                  <TotalItemsCard
                    totalStockCount={totalStockCount}
                    error={error}
                  />
                  <LowStockCard lowStockCount={lowStockCount} error={error} />
                  <ExpiryCard
                    expiryStockCount={expiringStockCount}
                    error={error}
                  />
                  <TotalCostCard totalPrice={totalPrice} error={error} />
                </div>
                <InventoryItemsCard items={items} error={error} />
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Popover>
                <PopoverTrigger asChild >
                  <div className="flex items-center justify-end ml-auto space-x-2">
                    <Button className="flex space-x-2">
                      <Plus className="flex h-4 w-4 space-x-2" />
                      <span>Add Item</span>
                    </Button>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-48 mx-2 right-0">
                  <div className="grid gap-4">
                    <Button
                      variant="ghost"
                      onClick={() => handleAddItem("manual")}
                      className="w-full justify-start"
                    >
                      <ClipboardList className="mr-2 h-4 w-4" />
                      Manual Entry
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => handleAddItem("qr")}
                      className="w-full justify-start"
                    >
                      <QrCode className="mr-2 h-4 w-4" />
                      Scan QR Code
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
              <NoItemComponent />
            </React.Fragment>
          )}
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          {loading ? (
            <DialogContent className="flex justify-center items-center">
              <LoadingComponents />
            </DialogContent>
          ) : (
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add Inventory Items Manually</DialogTitle>
                <DialogDescription>
                  Enter the details of the items you want to add to the
                  inventory.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="department">Select Department</Label>
                      <SelectDropdown
                        value={selectedValue}
                        name="departments"
                        options={dropdownDepartments}
                        onValueChange={handleValueChange}
                        placeholder="Select an option..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="item-name">Item Name</Label>
                      <Input
                        id="item-name"
                        value={currentItem.item_name}
                        onChange={(e) =>
                          handleCurrentItemChange("item_name", e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="item-quantity">Quantity</Label>
                      <Input
                        id="item-quantity"
                        type="text"
                        value={currentItem.quantity}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (/^\d*$/.test(value)) {
                            handleCurrentItemChange(
                              "quantity",
                              parseInt(value) || 0
                            );
                          }
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="batch-number">Batch Number</Label>
                      <Input
                        id="batch-number"
                        value={currentItem.batch_number}
                        onChange={(e) =>
                          handleCurrentItemChange(
                            "batch_number",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="expiry-date">Expiry Date</Label>
                      <DatePicker
                        selected={
                          currentItem.expiry_date
                            ? new Date(currentItem.expiry_date)
                            : null!
                        }
                        onChange={(date: any) =>
                          handleCurrentItemChange(
                            "expiry_date",
                            date ? date.toISOString() : ""
                          )
                        }
                        placeholder="Select a date"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="unit-price">Unit Price</Label>
                      <Input
                        id="unit-price"
                        type="text"
                        value={currentItem.unit_price}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (/^\d*\.?\d*$/.test(value)) {
                            handleCurrentItemChange(
                              "unit_price",
                              parseFloat(value) || 0
                            );
                          }
                        }}
                        placeholder="Enter unit price"
                      />
                    </div>
                    <Button
                      type="button"
                      onClick={addManualItem}
                      variant="outline"
                      className="w-full"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Item
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <Label>Added Items</Label>
                    <div className="border rounded-md p-4 max-h-[60vh] overflow-y-auto space-y-3 bg-muted/20">
                      {manualItems.length > 0 ? (
                        manualItems.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-start justify-between p-3 bg-muted/40 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                          >
                            <div className="flex flex-col">
                              <div className="font-semibold text-primary text-lg">
                                {item.item_name}
                              </div>
                              <div className="text-sm text-muted-foreground mt-1">
                                <span className="font-medium">Qty:</span>{" "}
                                {item.quantity} |
                                <span className="font-medium ml-2">Batch:</span>{" "}
                                {item.batch_number}
                              </div>
                              <div className="text-sm text-muted-foreground mt-1">
                                <span className="font-medium">Exp:</span>{" "}
                                {new Date(
                                  item.expiry_date
                                ).toLocaleDateString()}{" "}
                                |
                                <span className="font-medium ml-2">Price:</span>{" "}
                                ${item.unit_price}
                              </div>
                              <div className="text-sm text-muted-foreground mt-1">
                                <span className="font-medium">Dept:</span>{" "}
                                {item.department}
                              </div>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeManualItem(index)}
                              className="text-destructive hover:bg-red-600 transition-colors p-1"
                            >
                              <X className="h-5 w-5" />
                            </Button>
                          </div>
                        ))
                      ) : (
                        <div className="text-muted-foreground text-center">
                          No items added yet.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 justify-between">
                  <Button variant="destructive" onClick={handleCancel}>
                    Cancel Adding
                  </Button>
                  <Button onClick={handleManualSubmit}>Submit All Items</Button>
                </div>
              </div>
            </DialogContent>
          )}
        </Dialog>

        <Sheet
          open={isSheetOpen}
          onOpenChange={(open) => {
            setIsSheetOpen(open);
            if (!open) setIsScanning(false);
          }}
        >
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Scan QR Code</SheetTitle>
              <SheetDescription>
                Open your app and scan the QR code on the medicine. The scanned
                items will appear here.
              </SheetDescription>
            </SheetHeader>
            <div className="mt-4">
              {isScanning ? (
                <div className="flex items-center justify-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Scanning...</span>
                </div>
              ) : (
                <Button onClick={() => setIsScanning(true)}>
                  Start Scanning
                </Button>
              )}
            </div>
            <div className="mt-4 space-y-2">
              {qrItems.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span>Item Name: {item.name}</span>
                  <span>Quantity: {item.quantity}</span>
                </div>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </React.Fragment>
  );
}
