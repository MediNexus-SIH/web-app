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

const LOW_STOCK_THRESHOLD = 20; // Define the threshold for low stock

const LowStockCard = ({ refreshTrigger }: { refreshTrigger: any }) => {
  const { items, loading, error, fetchItems } = useInventory();

  useEffect(() => {
    fetchItems();
  }, [fetchItems, refreshTrigger]);
  const lowStockCount = useMemo(() => {
    return items.filter((item) => item.quantity <= LOW_STOCK_THRESHOLD).length
  }, [items]);

  const renderContent = () => {
    if (loading) {
      return <Loader2 className="h-8 w-8 animate-spin" />;
    }

    if (error) {
      return <p className="text-destructive">Error: {error}</p>;
    }

    return (
      <div className="text-4xl font-bold text-red-500">{lowStockCount}</div>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle>Low Stock</CardTitle>
        <CardDescription>
          Items with quantity below {LOW_STOCK_THRESHOLD} that need to be
          reordered.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex  items-center h-20">
        {renderContent()}
      </CardContent>
    </Card>
  );
};

export default LowStockCard;
