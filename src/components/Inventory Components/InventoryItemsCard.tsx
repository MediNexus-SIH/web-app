import { Item } from "@/lib/interfaces";
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

export default function InventoryItemsCard({
  items,
  error,
}: {
  items: Item[];
  error: any;
}) {
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
        <Table className="mb-4">
          <TableHeader>
            <TableRow>
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
            {items.map((item) => (
              <TableInvRow
                id={item.item_id || ""}
                key={item.item_id}
                category={item.category}
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
      </CardContent>
    </Card>
  );
}
