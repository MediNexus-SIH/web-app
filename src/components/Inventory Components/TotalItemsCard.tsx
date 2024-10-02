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

const LowStockCard = ({ refreshTrigger }: { refreshTrigger: any }) => {
  const { items, loading, error, fetchItems } = useInventory();

  useEffect(() => {
    fetchItems();
  }, [fetchItems, refreshTrigger]);

  const totalStockCount = useMemo(() => {
    let count = 0;
    items.map((value) => {
      count += value.quantity;
    });
    return count
  }, [items]);

  const renderContent = () => {
    if (loading) {
      return <Loader2 className="h-8 w-8 animate-spin" />;
    }

    if (error) {
      return <p className="text-destructive">Error: {error}</p>;
    }

    return <div className="text-4xl font-bold text-white">{totalStockCount.toLocaleString()}</div>;
  };
  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle>Total Items</CardTitle>
        <CardDescription>
          The total number of medical supplies in your inventory.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex  items-center h-20">
        {renderContent()}
      </CardContent>
    </Card>
  );
};

export default LowStockCard;
