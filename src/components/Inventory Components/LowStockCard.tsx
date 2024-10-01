import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

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

export default LowStockCard