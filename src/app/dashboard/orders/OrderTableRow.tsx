import React from "react";
import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import OrderSheet from "./OrderSheet";
import { OrderItem } from "@/lib/interfaces";
import toSentenceCase from "@/hooks/toSentenceCase";
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
  const orderStatusColor =
    status === "SUCCESS"
      ? "bg-green-500"
      : status === "PENDING"
      ? "bg-yellow-500"
      : "bg-red-500";

  const orderStatusTextColor =
    status === "SUCCESS"
      ? "text-green-50"
      : status === "PENDING"
      ? "text-yellow-50"
      : "text-red-50";

  const paymentStatusColor =
    paymentStatus === "Paid"
      ? "bg-blue-500" 
      : "bg-orange-700"; 

  const paymentStatusTextColor =
    paymentStatus === "Paid"
      ? "text-blue-50" 
      : "text-orange-50"; 
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
          variant="outline"
          className={`${orderStatusColor} ${orderStatusTextColor}`}
        >
          {toSentenceCase(status)}
        </Badge>
      </TableCell>
      <TableCell>
        <Badge
          variant="outline"
          className={`${paymentStatusColor} ${paymentStatusTextColor}`}
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
