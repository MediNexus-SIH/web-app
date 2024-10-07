import React from "react";
import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import OrderSheet from "./OrderSheet";
import { OrderItem } from "@/lib/interfaces";
import toSentenceCase from "@/lib/toSentenceCase";

interface TableRowProps {
  orderId: string;
  order_date: string;
  status: string;
  paymentStatus: string;
  hospital: string;
  amount: string;
  actions: React.ReactNode;
  orderItems: OrderItem[];
}

const OrderTableRow: React.FC<TableRowProps> = ({
  orderId,
  order_date,
  status,
  paymentStatus,
  hospital,
  amount,
  actions,
  orderItems,
}) => {

  return (
    <TableRow>
      <TableCell>
        <OrderSheet
          orderId={orderId}
          date={order_date}
          status={status}
          paymentStatus={paymentStatus}
          hospital={hospital}
          amount={amount}
          orderItems={orderItems}
        />
      </TableCell>
      <TableCell>{order_date}</TableCell>
      <TableCell>
        <Badge
          variant={
            status.toLowerCase() as
              | "default"
              | "pending"
              | "success"
              | "done"
              | "destructive"
          }
          className="text-xs"
        >
          {toSentenceCase(status)}
        </Badge>
      </TableCell>
      <TableCell>
        <Badge
          variant={
            paymentStatus.toLowerCase() as
              | "default"
              | "pending"
              | "success"
              | "destructive"
              | "done"
          }
          className="text-xs"
        >
          {paymentStatus}
        </Badge>
      </TableCell>
      <TableCell>{hospital}</TableCell>
      <TableCell>{amount}</TableCell>
      <TableCell>{actions}</TableCell>
    </TableRow>
  );
};

export default OrderTableRow;
