import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

const TotalItemsCard = () => {
  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle>Total Items</CardTitle>
        <CardDescription>
          The total number of medical supplies, equipment, and pharmaceuticals
          in your inventory.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold">1,234</div>
      </CardContent>
    </Card>
  );
};

export default TotalItemsCard