"use client";
import BreadCrumb from "@/components/BreadCrumb";
import DashboardInventoryCard from "@/components/Dashboard Cards/DashboardInventoryCard";
import DashboardAlertCard from "@/components/Dashboard Cards/DashboardAlertCard";
import DashboardOrdersCard from "@/components/Dashboard Cards/DashboardOrderCard";
import DashboardSupplyChainCard from "@/components/Dashboard Cards/DashboardSupplyChain";
import useInventory from "@/hooks/useInventory";
import React, { useEffect, useMemo, useState } from "react";
import { DashboardLoadingComponent } from "@/components/Dashboard Cards/DashboardLoadingComponent";

export default function Component() {
  const { items, loading, error, addItems, fetchItems } = useInventory();
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    fetchItems();
  }, [fetchItems, refreshTrigger]);

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

  const LOW_STOCK_THRESHOLD = 20;
  const lowStockCount = useMemo(() => {
    return items.filter((item) => item.quantity < LOW_STOCK_THRESHOLD).length;
  }, [items]);

  return (
    <div className="flex-1 min-h-screen p-6 w-full bg-muted/40 ">
      <div className="flex flex-col sm:gap-4 ">
        {loading ? (
          <DashboardLoadingComponent />
        ) : (
          <React.Fragment>
            <BreadCrumb
              paths={[{ pageName: "Dashboard", path: "/dashboard" }]}
            />
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <main className="grid flex-1 items-start gap-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <DashboardInventoryCard
                  totalStockCount={totalStockCount}
                  totalPrice={totalPrice}
                  branches={45}
                />
                <DashboardAlertCard
                  lowStockCount={lowStockCount}
                  expiringStockCount={expiringStockCount}
                />
                <DashboardOrdersCard />
                <DashboardSupplyChainCard />
              </div>
            </main>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}
