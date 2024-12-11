"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";

export default function InventoryPreferences() {
  const [lowStockThreshold, setLowStockThreshold] = useState("10");
  const [defaultOrderQuantity, setDefaultOrderQuantity] = useState("100");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Inventory Preferences</h2>
        <p className="text-muted-foreground">
          Customize your inventory management settings.
        </p>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Threshold Alerts</h3>
          <div className="flex items-center space-x-2">
            <Label htmlFor="low-stock-threshold">Low Stock Threshold</Label>
            <Input
              id="low-stock-threshold"
              type="number"
              value={lowStockThreshold}
              onChange={(e) => setLowStockThreshold(e.target.value)}
              className="w-24"
            />
            <span className="text-muted-foreground">units</span>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Default Order Quantities</h3>
          <div className="flex items-center space-x-2">
            <Label htmlFor="default-order-quantity">
              Default Order Quantity
            </Label>
            <Input
              id="default-order-quantity"
              type="number"
              value={defaultOrderQuantity}
              onChange={(e) => setDefaultOrderQuantity(e.target.value)}
              className="w-24"
            />
            <span className="text-muted-foreground">units</span>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Critical Items</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item Name</TableHead>
                <TableHead>Current Stock</TableHead>
                <TableHead>Critical Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Paracetamol</TableCell>
                <TableCell>50</TableCell>
                <TableCell>
                  <Switch id="paracetamol-critical" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Insulin</TableCell>
                <TableCell>20</TableCell>
                <TableCell>
                  <Switch id="insulin-critical" defaultChecked />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Antibiotics</TableCell>
                <TableCell>100</TableCell>
                <TableCell>
                  <Switch id="antibiotics-critical" />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <Button>Save Inventory Preferences</Button>
      </div>
    </div>
  );
}
