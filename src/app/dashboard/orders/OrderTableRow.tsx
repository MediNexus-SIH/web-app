import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";

interface TableRowProps {
  orderId: string;
  date: string;
  status: "pending" | "success" | "failure";
  supplier: string;
  amount: string;
  actions: React.ReactNode;
}

const OrderTableRow: React.FC<TableRowProps> = ({
  orderId,
  date,
  status,
  supplier,
  amount,
  actions,
}) => {
  return (
    <TableRow >
      <TableCell className="font-medium">
        <Link href="#" className="hover:underline" prefetch={false}>
          {orderId}
        </Link>
      </TableCell>
      <TableCell>{date}</TableCell>
      <TableCell>
        <Badge variant={status} className="text-xs">
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      </TableCell>
      <TableCell>{supplier}</TableCell>
      <TableCell>{amount}</TableCell>
      <TableCell>{actions}</TableCell>
    </TableRow>
  );
};

export default OrderTableRow;