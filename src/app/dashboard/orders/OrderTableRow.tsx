import React from "react";
import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import OrdersSheet from "./OrderSheet";

interface TableRowProps {
  orderId: string;
  date: string;
  status: "pending" | "success" | "failure";
  paymentStatus: "pending" | "done"
  supplier: string;
  amount: string;
  actions: React.ReactNode;
}

const OrderTableRow: React.FC<TableRowProps> = ({
  orderId,
  date,
  status,
  paymentStatus,
  supplier,
  amount,
  actions,
}) => {
  return (
    <TableRow>
      <TableCell>
        <OrdersSheet
          orderId={orderId}
          date={date}
          status={status}
          paymentStatus={paymentStatus}
          supplier={supplier}
          amount={amount}
        />
      </TableCell>
      <TableCell>{date}</TableCell>
      <TableCell>
        <Badge variant={status} className="text-xs ">
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      </TableCell>
      <TableCell>
        <Badge variant={paymentStatus} className="text-xs ">
          {paymentStatus.charAt(0).toUpperCase() + paymentStatus.slice(1)}
        </Badge>
      </TableCell>
      <TableCell>{supplier}</TableCell>
      <TableCell>{amount}</TableCell>
      <TableCell>{actions}</TableCell>
    </TableRow>
  );
};

export default OrderTableRow;