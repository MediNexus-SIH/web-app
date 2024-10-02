"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import TableInvRow from "./TableInvRow";
import { Loader2 } from "lucide-react";
import useInventory from "@/hooks/useInventory";

export default function InventoryItemsCard({
  refreshTrigger,
}: {
  refreshTrigger: number;
}) {
  const { items, loading, error, fetchItems } = useInventory();
  
  useEffect(() => {
    const fetchData = async () => {
      await fetchItems();
    };
    fetchData();
  }, [fetchItems, refreshTrigger]);


  if (loading) {
    return (
      <Card className="w-full">
        <CardContent className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full">
        <CardContent className="flex justify-center items-center h-64">
          <p className="text-destructive">Error loading inventory: {error}</p>
        </CardContent>
      </Card>
    );
  }
  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle>Inventory</CardTitle>
        <CardDescription>
          View and manage your hospital&apos;s medical supplies, equipment, and
          pharmaceuticals.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <p className="text-center text-muted-foreground py-4">
            No items in inventory. Add some items to get started.
          </p>
        ) : (
          <Table className="mb-4">
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Batch Number</TableHead>
                <TableHead>Unit Price</TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item, index) => (
                <TableInvRow
                  key={index + 1}
                  item={item.item_name}
                  department={item.department}
                  quantity={item.quantity.toString()}
                  batchNumber={item.batch_number}
                  expiration={item.expiry_date}
                  unitPrice={item.unit_price.toString()}
                />
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
