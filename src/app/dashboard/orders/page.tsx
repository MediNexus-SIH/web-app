"use client";

import React, { useState, useEffect, useCallback } from "react";
import { DotIcon, Plus, ListOrdered, Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import BreadCrumb from "@/components/BreadCrumb";
import TotalSalesChart from "@/components/Graph Charts/TotalSalesChart";
import InventoryLevelsChart from "@/components/Graph Charts/InventoryLevelsChart";
import OrderStatusChart from "@/components/Graph Charts/OrderStatusChart";
import OrderTableRow from "./OrderTableRow";
import SupplierPerformanceChart from "@/components/Graph Charts/SupplierPerformanceChart";
import SearchInputField from "@/components/SearchInputField";
import { useItems } from "@/hooks/use-items";
import { Option, SelectDropdown } from "@/components/SelectDropdown";
import { useOrder } from "@/hooks/use-order";
import { Order, OrderItem } from "@/lib/interfaces";
import { OrderLoadingComponent } from "@/components/Order Components/OrderLoadingComponent";

const OrderTable: React.FC<{ orders: Order[] }> = ({ orders }) => {
  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Payment Status</TableHead>
          <TableHead>Hospital</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <OrderTableRow
            key={order.id}
            orderId={order.id}
            order_date={new Date(order.order_date).toLocaleDateString()}
            status={order.status}
            paymentStatus={order.paymentStatus ? "Paid" : "Unpaid"}
            hospital={order.hospital.hospitalName}
            // amount={`$${order.totalAmount.toFixed(2)}`}
            amount={`$${order.total_amount}`}
            actions={
              <Button variant="outline" size="icon" className="h-8 w-8">
                <DotIcon className="h-4 w-4" />
              </Button>
            }
            orderItems={order.orderItems}
          />
        ))}
      </TableBody>
    </Table>
  );
};
const OrderFilters: React.FC<{
  selectedFilters: string[];
  setSelectedFilters: React.Dispatch<React.SetStateAction<string[]>>;
}> = ({ selectedFilters, setSelectedFilters }) => {
  const toggleFilter = useCallback(
    (filter: string) => {
      setSelectedFilters((prev) =>
        prev.includes(filter)
          ? prev.filter((f) => f !== filter)
          : [...prev, filter]
      );
    },
    [setSelectedFilters]
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          <span>Filter</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel>Filter by</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={selectedFilters.includes("pending")}
          onCheckedChange={() => toggleFilter("pending")}
        >
          Pending
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={selectedFilters.includes("success")}
          onCheckedChange={() => toggleFilter("success")}
        >
          Approved
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={selectedFilters.includes("failure")}
          onCheckedChange={() => toggleFilter("failure")}
        >
          Cancelled
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const OrderSorting: React.FC<{
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
}> = ({ sortBy, setSortBy }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <ListOrdered className="h-4 w-4" />
          <span>Sort</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel>Sort by</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
          <DropdownMenuRadioItem value="date">Date</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="status">Status</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="amount">Amount</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
interface NewOrderDialogProps {
  loading: boolean;
}
const NewOrderDialog: React.FC<NewOrderDialogProps> = ({ loading }) => {
  const { items } = useItems();
  const { createOrder } = useOrder();

  const itemOptions: Option[] = items.map((item) => ({
    value: item.item_name.toLowerCase().replace(/\s+/g, ""),
    label: item.item_name,
  }));

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    item_name: "",
    quantity: "",
    expected_delivery_date: "",
  });

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

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      const currentDate = new Date();
      const randomDays = Math.floor(Math.random() * 3) + 3;

      // Find the selected item based on formData.item_id
      const selectedItem = items.find(
        (item) => item.item_name === formData.item_name
      );

      if (!selectedItem) {
        console.error("Item not found");
        return;
      }

      console.log("hulel form data", formData);
      // Construct submissionData with all necessary fields
      const submissionData = {
        id: "generated-id", // Generate or assign an ID
        order_id: "generated-order-id", // Generate or assign an Order ID
        order_date: currentDate.toISOString(),
        expected_delivery_date: new Date(
          currentDate.setDate(currentDate.getDate() + randomDays)
        ).toISOString(),
        orderItems: [
          {
            item: {
              item_id: selectedItem.item_id,
              item_name: selectedItem.item_name,
              unit_price: selectedItem.unit_price,
              category: selectedItem.category || "default category", // Provide a default value if undefined
              description: selectedItem.description, // This can be undefined
              supplier: selectedItem.supplier || "default supplier", // Provide a default value if undefined
            },
            quantity: parseInt(formData.quantity, 10),
            unit_price: selectedItem.unit_price,
          },
        ],
        status: "pending",
        paymentStatus: false,
        total_amount: selectedItem.unit_price * parseInt(formData.quantity, 10),
        hospital: {
          hospitalName: "Sample Hospital", // Replace with actual hospital info
        },
      };
      console.log("Submission data:", submissionData);
      try {
        await createOrder(submissionData);

        setOpen(false);
      } catch (error) {
        console.error("Failed to create order:", error);
      }
    },
    [formData, items, createOrder]
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          New Order
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        {loading ? (
          <div>Loading....</div>
        ) : (
          <React.Fragment>
            <DialogHeader>
              <DialogTitle>Create New Order</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="item_id" className="text-right">
                  Item
                </Label>
                <div className="col-span-3">
                  <SelectDropdown
                    name="item_name"
                    value={formData.item_name}
                    options={itemOptions}
                    onValueChange={(value) =>
                      handleSelectChange("item_name", value)
                    }
                    placeholder="Select an item"
                  />
                </div>
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
                    // Regex allows only positive integers (no leading zeros unless it's "0")
                    if (/^(0|[1-9]\d*)$/.test(value) || value === "") {
                      handleInputChange(e);
                    }
                  }}
                />
              </div>
              <Button type="submit" className="ml-auto">
                Create Order
              </Button>
            </form>
          </React.Fragment>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("date");
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const { loading, error, orders, fetchOrders } = useOrder();

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  useEffect(() => {
    if (orders) {
      let result = [...orders];

      // Apply search
      if (searchQuery) {
        result = result.filter(
          (order) =>
            order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.hospital.hospitalName
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
        );
      }

      // Apply filters
      if (selectedFilters.length > 0) {
        result = result.filter((order) =>
          selectedFilters.includes(order.status.toLowerCase())
        );
      }

      // Apply sorting
      result.sort((a, b) => {
        if (sortBy === "date") {
          return (
            new Date(b.order_date).getTime() - new Date(a.order_date).getTime()
          );
        } else if (sortBy === "status") {
          return a.status.localeCompare(b.status);
        } else if (sortBy === "amount") {
          return b.total_amount - a.total_amount;
        }
        return 0;
      });

      setFilteredOrders(result);
    }
  }, [orders, searchQuery, selectedFilters, sortBy]);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
    },
    []
  );

  if (!loading) {
    return (
      <div>
        <OrderLoadingComponent />
      </div>
    );
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex-1 w-full overflow-y-auto p-4 md:p-6 bg-muted/40 space-y-4">
      <BreadCrumb
        paths={[
          { pageName: "Dashboard", path: "/dashboard" },
          { pageName: "Orders", path: "/dashboard/orders" },
        ]}
      />
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Orders</h1>
        <NewOrderDialog loading={loading} />
      </div>
      <div className="text-sm text-gray-500">(Click on the order id) </div>
      <div className="bg-background border rounded-lg overflow-hidden w-full">
        <div className="px-6 py-4 border-b flex flex-row items-start md:items-center justify-between gap-4">
          <SearchInputField
            className="w-full md:w-1/2"
            placeholder="Search Orders..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <div className="flex items-center gap-4 w-full md:w-auto">
            <OrderFilters
              selectedFilters={selectedFilters}
              setSelectedFilters={setSelectedFilters}
            />
            <OrderSorting sortBy={sortBy} setSortBy={setSortBy} />
          </div>
        </div>
        <div className="p-2 md:p-5">
          <OrderTable orders={filteredOrders} />
        </div>
      </div>
      <div className="grid gap-8 mt-8">
        <div className="grid md:grid-cols-2 gap-6">
          <TotalSalesChart />
          <InventoryLevelsChart />
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <OrderStatusChart />
          <SupplierPerformanceChart />
        </div>
      </div>
    </div>
  );
}
