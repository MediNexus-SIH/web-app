import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "../ui/table";
import TableInvRow from "./TableInvRow";

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

export default InventoryItemsCard