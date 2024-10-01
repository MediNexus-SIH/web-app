import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Menu } from "lucide-react";
import BreadCrumb from "@/components/BreadCrumb";

export default function Component() {
  return (
    <div className="flex-1 min-h-screen bg-muted/40 p-6 overflow-auto">
      <div className="flex flex-col gap-4">
        <BreadCrumb
          paths={[
            { pageName: "Dashboard", path: "/dashboard" },
            { pageName: "Inventory", path: "/dashboard/inventory" },
          ]}
        />
        <h1 className="text-2xl font-bold">Inventory</h1>
        <main className="flex-1 flex flex-col items-start gap-4">
          <div className="flex flex-wrap gap-4 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <TotalItemsCard />
            <LowStockCard />
            <ExpiryCard />
            <ReorderReqCard />
          </div>
          <InventoryItemsCard />
          <PaginationInv />
        </main>
      </div>
    </div>
  );
}

const EditInvDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button aria-haspopup="true" size="icon" variant="ghost">
          <Menu />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>Adjust Quantity</DropdownMenuItem>
        <DropdownMenuItem>Mark as Expired</DropdownMenuItem>
        <DropdownMenuItem>Reorder</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const TotalItemsCard = () => {
  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle>Total Items</CardTitle>
        <CardDescription>
          The total number of medical supplies, equipment, and pharmaceuticals
          in your inventory.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold">1,234</div>
      </CardContent>
    </Card>
  );
};

const LowStockCard = () => {
  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle>Low Stock</CardTitle>
        <CardDescription>
          Items that have fallen below the minimum stock level and need to be
          reordered.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold text-red-500">47</div>
      </CardContent>
    </Card>
  );
};

const ExpiryCard = () => {
  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle>Expiring Soon</CardTitle>
        <CardDescription>
          Items that will expire within the next 30 days.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold text-yellow-500">12</div>
      </CardContent>
    </Card>
  );
};

const ReorderReqCard = () => {
  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle>Reorder Requests</CardTitle>
        <CardDescription>
          Pending requests to reorder items that have fallen below the minimum
          stock level.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold text-blue-500">8</div>
      </CardContent>
    </Card>
  );
};

const PaginationInv = () => {
  return (
    <Pagination className="mb-2">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">
            <Button variant={"outline"}>1</Button>
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

const TableInvRow = ({
  item,
  itemCategory,
  quantity,
  location,
  expiration,
}: {
  item: string;
  itemCategory: string;
  quantity: string;
  location: string;
  expiration: string;
}) => {
  // Determine color based on quantity

  const quantityOfItem = parseInt(quantity);
  const quantityColor =
    quantityOfItem > 50
      ? "bg-green-500"
      : quantityOfItem > 20
      ? "bg-yellow-500"
      : "bg-red-500";
  const quantityTextColor =
    quantityOfItem > 50
      ? "text-green-50"
      : quantityOfItem > 20
      ? "text-yellow-50"
      : "text-red-50";

  // Determine color based on expiration (example logic)

  const expirationDate = new Date(expiration);
  const currentDate = new Date();
  const daysUntilExpiration =
    (expirationDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24);

  let expirationColor, expirationTextColor;
  if (daysUntilExpiration <= 30) {
    expirationColor = "bg-red-500";
    expirationTextColor = "text-red-50";
  } else if (daysUntilExpiration <= 60) {
    expirationColor = "bg-yellow-500";
    expirationTextColor = "text-yellow-50";
  } else {
    expirationColor = "bg-green-500";
    expirationTextColor = "text-green-50";
  }

  return (
    <TableRow>
      <TableCell>
        <div className="font-medium">{item}</div>
      </TableCell>
      <TableCell>{itemCategory}</TableCell>
      <TableCell>
        <Badge
          variant="outline"
          className={`${quantityColor} ${quantityTextColor}`}
        >
          {quantity}
        </Badge>
      </TableCell>
      <TableCell>{location}</TableCell>
      <TableCell>
        <Badge
          variant="outline"
          className={`${expirationColor} ${expirationTextColor}`}
        >
          {expiration}
        </Badge>
      </TableCell>
      <TableCell>
        <EditInvDropdown />
      </TableCell>
    </TableRow>
  );
};

const InventoryItemsCard = () => {
  const inventory = [
    {
      id: 1,
      item: "Surgical Masks",
      category: "Medical Supplies",
      quantity: "12",
      location: "Hospital Storeroom",
      expiration: "2025-06-30",
    },
    {
      id: 2,
      item: "Nitrile Gloves",
      category: "Medical Supplies",
      quantity: "35",
      location: "Hospital Stockroom",
      expiration: "2024-11-15",
    },
    {
      id: 3,
      item: "Ibuprofen 200mg",
      category: "Pharmaceuticals",
      quantity: "35",
      location: "Pharmacy Stockroom",
      expiration: "2024-10-15",
    },
    {
      id: 4,
      item: "Oxygen Tanks",
      category: "Medical Equipment",
      quantity: "78",
      location: "Biomedical Storeroom",
      expiration: "2025-06-30",
    },
    {
      id: 5,
      item: "Saline Solution",
      category: "Pharmaceuticals",
      quantity: "68",
      location: "Pharmacy Stockroom",
      expiration: "2024-09-20",
    },
  ];
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
        <Table className="mb-4">
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Expiration</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inventory.map((value) => {
              return (
                <TableInvRow
                  key={value.id}
                  item={value.item}
                  itemCategory={value.category}
                  quantity={value.quantity}
                  location={value.location}
                  expiration={value.expiration}
                />
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
