import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const TotalItemsCard = ({
  totalStockCount,
  error,
}: {
  totalStockCount: number;
  error: any;
}) => {
  const renderContent = () => {
    if (error) {
      return <p className="text-destructive">Error: {error}</p>;
    }

    return (
      <div className="text-4xl font-bold text-white">
        {totalStockCount.toLocaleString()}
      </div>
    );
  };
  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle>Total Items</CardTitle>
        <CardDescription>
          The total number of medical supplies in your inventory.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex  items-center h-20">
        {renderContent()}
      </CardContent>
    </Card>
  );
};

export default TotalItemsCard;
