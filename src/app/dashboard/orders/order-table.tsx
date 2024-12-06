import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
} from "@/components/ui/table";
import OrderTableRow from "./order-table-row";
import { Order } from "@/lib/interfaces";

import OrderActionsDropdown from "@/components/Order Components/order-actions";

const OrderTable: React.FC<{ orders: Order[] }> = ({ orders }) => {
  return (
    <Table className="w-full ">
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Payment Status</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <OrderTableRow
            key={order.id}
            orderId={order.id || ""}
            order_date={new Date(order.order_date).toLocaleDateString("en-GB", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}
            status={order.status}
            paymentStatus={order.paymentStatus ? "Paid" : "Unpaid"}
            amount={`₹${order.total_amount.toFixed(2)}`}
            actions={
              <OrderActionsDropdown
                order={{
                  id: order.id || "",
                  status: order.status,
                  orderItems: order.orderItems || [],
                }}
              />
            }
            orderItems={order.orderItems}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default OrderTable;
