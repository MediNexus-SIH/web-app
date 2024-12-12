"use client";

import * as React from "react";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export type InventoryItem = {
  id: string;
  name: string;
  category: string;
  department: string;
  quantity: number;
  batchNumber: string;
  unitPrice: number;
  expiryDate: string;
};

export function InventoryTable({ data }: { data: InventoryItem[] }) {
  const [selectedRows, setSelectedRows] = React.useState<Set<string>>(
    new Set()
  );

  const toggleAllRows = (checked: boolean) => {
    if (checked) {
      setSelectedRows(new Set(data.map((item) => item.id)));
    } else {
      setSelectedRows(new Set());
    }
  };

  const toggleRow = (id: string) => {
    const newSelectedRows = new Set(selectedRows);
    if (newSelectedRows.has(id)) {
      newSelectedRows.delete(id);
    } else {
      newSelectedRows.add(id);
    }
    setSelectedRows(newSelectedRows);
  };

  return (
    <div className="w-full rounded-md">
      <div className="rounded-md border">
        <Table className="bg-background rounded-md">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={selectedRows.size === data.length}
                  onCheckedChange={(checked) =>
                    toggleAllRows(checked as boolean)
                  }
                  aria-label="Select all"
                />
              </TableHead>
              <TableHead>Item</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Batch Number</TableHead>
              <TableHead>Unit Price</TableHead>
              <TableHead>Expiry Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow
                key={item.id}
                data-state={selectedRows.has(item.id) && "selected"}
              >
                <TableCell>
                  <Checkbox
                    checked={selectedRows.has(item.id)}
                    onCheckedChange={() => toggleRow(item.id)}
                    aria-label="Select row"
                  />
                </TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.department}</TableCell>
                <TableCell>
                  <Badge
                    variant={item.quantity < 20 ? "destructive" : "default"}
                    className="w-16 justify-center"
                  >
                    {item.quantity}
                  </Badge>
                </TableCell>
                <TableCell>{item.batchNumber}</TableCell>
                <TableCell className="font-medium">
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                  }).format(item.unitPrice)}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      new Date(item.expiryDate) <
                      new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                        ? "destructive"
                        : "default"
                    }
                  >
                    {new Date(item.expiryDate).toLocaleDateString()}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={() => navigator.clipboard.writeText(item.id)}
                      >
                        Copy item ID
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>View details</DropdownMenuItem>
                      <DropdownMenuItem>Edit item</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {selectedRows.size} of {data.length} row(s) selected.
        </div>
      </div>
    </div>
  );
}
