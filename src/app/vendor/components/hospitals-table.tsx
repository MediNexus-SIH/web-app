"use client";

import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface Hospital {
  id: string;

  name: string;

  location: string;

  contactPerson: string;

  contactEmail: string;

  contactPhone: string;

  status: string;

  lastOrderDate: string;
}
export function HospitalsTable({ data }: { data: Hospital[] }) {
  return (
    <Table className="bg-background rounded-md">
      <TableHeader>
        <TableRow>
          <TableHead>Hospital Name</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Contact Person</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Last Order</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((hospital) => (
          <TableRow key={hospital.id}>
            <TableCell>{hospital.name}</TableCell>
            <TableCell>{hospital.location}</TableCell>
            <TableCell>{hospital.contactPerson}</TableCell>
            <TableCell>{hospital.contactEmail}</TableCell>
            <TableCell>{hospital.contactPhone}</TableCell>
            <TableCell>
              <Badge
                variant={hospital.status === "Active" ? "default" : "secondary"}
              >
                {hospital.status}
              </Badge>
            </TableCell>
            <TableCell>
              {new Date(hospital.lastOrderDate).toLocaleDateString()}
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
                    onClick={() => navigator.clipboard.writeText(hospital.id)}
                  >
                    Copy hospital ID
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>View details</DropdownMenuItem>
                  <DropdownMenuItem>Edit hospital</DropdownMenuItem>
                  <DropdownMenuItem>View order history</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
