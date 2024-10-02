"use client";

import React, { useEffect, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import useInventory from "@/hooks/useInventory";

interface ExpiringItemsCardProps {
  refreshTrigger: number;
  expiryThresholdDays?: number;
}

export default function ExpiringItemsCard({
  refreshTrigger,
  expiryThresholdDays = 30,
}: ExpiringItemsCardProps) {
  const { items, loading, error, fetchItems } = useInventory();

  useEffect(() => {
    fetchItems();
  }, [fetchItems, refreshTrigger]);

  const today = useMemo(() => new Date(), []);

  const thresholdDate = useMemo(() => {
    return new Date(
      today.getTime() + expiryThresholdDays * 24 * 60 * 60 * 1000
    );
  }, [expiryThresholdDays, today]);

  const expiringItemsCount = useMemo(() => {
    return items.filter((item) => {
      const expiryDate = new Date(item.expiry_date);
      return expiryDate <= thresholdDate && expiryDate > today;
    }).length;
  }, [items, thresholdDate, today]);

  const renderContent = () => {
    if (loading) {
      return <Loader2 className="h-8 w-8 animate-spin" aria-label="Loading" />;
    }

    if (error) {
      return (
        <p className="text-destructive" role="alert">
          Error: {error}
        </p>
      );
    }

    return (
      <div className="text-4xl font-bold text-amber-500" aria-live="polite">
        {expiringItemsCount}
      </div>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle>Expiring Soon</CardTitle>
        <CardDescription>
          Total Items expiring within the next {expiryThresholdDays} days in
          your inventory.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center h-20">
        {renderContent()}
      </CardContent>
    </Card>
  );
}
