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

export default function ExpiringItemsCard({
  expiryStockCount,
  error,
}: {
  expiryStockCount: number;

  error: any;
}) {
  const renderContent = () => {
    if (error) {
      return (
        <p className="text-destructive" role="alert">
          Error: {error}
        </p>
      );
    }

    return (
      <div className="text-4xl font-bold text-amber-500" aria-live="polite">
        {expiryStockCount}
      </div>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle>Expiring Soon</CardTitle>
        <CardDescription>
          Total Items expiring or expired within the next 30 days in your
          inventory.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center h-20">
        {renderContent()}
      </CardContent>
    </Card>
  );
}
