"use client";

import React, { useState, useCallback, useMemo, useEffect } from "react";
import { useOrder } from "@/hooks/use-order";
import BreadCrumb from "@/components/BreadCrumb";
import SearchInputField from "@/components/SearchInputField";
import OrderFilters from "./order-filter";
import OrderSorting from "./order-sorting";

import PaginationComponent from "@/components/PaginationComponent";
import TotalSalesChart from "@/components/Graph Charts/TotalSalesChart";
import InventoryLevelsChart from "@/components/Graph Charts/InventoryLevelsChart";
import OrderStatusChart from "@/components/Graph Charts/OrderStatusChart";
import SupplierPerformanceChart from "@/components/Graph Charts/SupplierPerformanceChart";
import OrderLoadingComponent from "@/components/Order Components/OrderLoadingComponent";
import Cart, { CartItem } from "./cart";
import MedicalSupplyCart from "./temp/cart"
import OrderSheet from "./temp/order-sheet";
import OrderTable from "./order-table";
import { useCart } from "@/hooks/use-cart";

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("date");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const { clearCart } = useCart();
  const { loading, error, orders, fetchOrders, createOrder } = useOrder();

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleSubmitOrder = async (items:any) => {
    // Implement your order submission logic here
    console.log('Submitting order with items:', items);
    // You would typically send this data to your backend API
  };
  const handleCheckout = async (cartItems: CartItem[]) => {
    const currentDate = new Date();
    const randomDays = Math.floor(Math.random() * 3) + 3;

    const submissionData = {
      order_date: currentDate.toISOString(),
      expected_delivery_date: new Date(
        currentDate.setDate(currentDate.getDate() + randomDays)
      ).toISOString(),
      orderItems: cartItems.map((item) => ({
        item_id: item.item.item_id,
        item_name: item.item.item_name,
        unit_price: item.unit_price,
        item_category: item.item.category,
        description: item.item.description,
        item_supplier: item.item.supplier,
        quantity: item.quantity,
        department: item.department.department,
      })),
      vendor: cartItems.map((item) => item.item.supplier).join(", "),
      status: "pending",
      paymentStatus: false,
      total_amount: cartItems.reduce(
        (total, item) => total + item.quantity * item.unit_price,
        0
      ),
    };

    try {
      await createOrder(submissionData);
      await clearCart();
      window.location.reload();
    } catch (error) {
      console.error("Failed to create order:", error);
    }
  };

  const filteredOrders = useMemo(() => {
    if (!orders) return [];

    return orders.filter((order) => {
      const matchesSearch = (order.id || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const matchesStatusFilter =
        selectedFilters.length === 0 ||
        selectedFilters.includes(order.status.toLowerCase());

      return matchesSearch && matchesStatusFilter;
    });
  }, [orders, searchQuery, selectedFilters]);

  const sortedFilteredOrders = useMemo(() => {
    return [...filteredOrders].sort((a, b) => {
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
  }, [filteredOrders, sortBy]);

  const totalPages = useMemo(() => {
    return Math.ceil(sortedFilteredOrders.length / pageSize);
  }, [sortedFilteredOrders, pageSize]);

  const paginatedFilteredOrders = useMemo(() => {
    const startIndex = (page - 1) * pageSize;
    return sortedFilteredOrders.slice(startIndex, startIndex + pageSize);
  }, [sortedFilteredOrders, page, pageSize]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
      setPage(1);
    },
    []
  );

  if (loading) {
    return (
      <div className="w-full bg-muted/40">
        <OrderLoadingComponent />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className="min-h-screen bg-muted/40 w-full">
      <div className="flex-1 w-full overflow-y-auto p-4 md:p-6  space-y-4">
        <BreadCrumb
          paths={[
            { pageName: "Dashboard", path: "/dashboard" },
            { pageName: "Orders", path: "/dashboard/orders" },
          ]}
        />
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Orders</h1>
          <div className="flex space-x-4 items-center">
            <div>
              <OrderSheet/>
              {/* <OrderSheet loading={loading} /> */}
            </div>
            <div>
              <MedicalSupplyCart onSubmitOrder={handleSubmitOrder} />
              {/* <Cart onCheckout={handleCheckout} /> */}
            </div>
          </div>
        </div>
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
            <OrderTable orders={paginatedFilteredOrders} />
          </div>
        </div>
        <PaginationComponent
          page={page}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
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
    </div>
  );
}
