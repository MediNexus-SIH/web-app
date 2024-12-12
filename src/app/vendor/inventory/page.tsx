
import { InventoryTable, InventoryItem } from "../components/inventory-table";

const sampleItems: InventoryItem[] = [
  {
    id: "1",
    name: "Paracetamol",
    category: "Medicine",
    department: "Emergency",
    quantity: 105,
    batchNumber: "BF6969",
    unitPrice: 50,
    expiryDate: "2024-12-04",
  },
  {
    id: "2",
    name: "Endoscope",
    category: "Medical Devices",
    department: "Gastroenterology",
    quantity: 10,
    batchNumber: "E12345",
    unitPrice: 400000,
    expiryDate: "2027-04-16",
  },
  {
    id: "3",
    name: "Antacid",
    category: "Medicine",
    department: "Gastroenterology",
    quantity: 500,
    batchNumber: "AC789456",
    unitPrice: 160,
    expiryDate: "2025-03-20",
  },
  {
    id: "4",
    name: "Barium Swallow",
    category: "Medicine",
    department: "Gastroenterology",
    quantity: 100,
    batchNumber: "BS654987",
    unitPrice: 1600,
    expiryDate: "2025-09-30",
  },
  {
    id: "5",
    name: "Colonoscope",
    category: "Medical Devices",
    department: "Gastroenterology",
    quantity: 5,
    batchNumber: "CS567890",
    unitPrice: 640000,
    expiryDate: "2029-01-06",
  },
]

export default function InventoryPage() {
  return (
    <div className="container mx-auto py-10 bg-muted/40">
      <h1 className="text-2xl font-bold mb-5">Inventory</h1>
      <InventoryTable data={sampleItems} />
    </div>
  );
}