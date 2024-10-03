import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const LOW_STOCK_THRESHOLD = 20;
const LowStockCard = ({
  lowStockCount,

  error,
}: {
  lowStockCount: number;

  error: any;
}) => {
  const renderContent = () => {
    if (error) {
      return <p className="text-destructive">Error: {error}</p>;
    }

    return (
      <div className="text-4xl font-bold text-red-500">{lowStockCount}</div>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle>Low Stock</CardTitle>
        <CardDescription>
          Items with quantity below {LOW_STOCK_THRESHOLD} that need to be
          reordered.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex r items-center h-20">
        {renderContent()}
      </CardContent>
    </Card>
  );
};

export default LowStockCard;
