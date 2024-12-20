import { IndianRupee, Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

const TotalCostCard = ({
  totalPrice,
  error,
}: {
  totalPrice: number;
  error: any;
}) => {
  const renderContent = () => {
    if (error) {
      return <p className="text-destructive">Error: {error}</p>;
    }

    return (
      <div className="text-4xl flex items-center  font-bold text-blue-500">
        <IndianRupee strokeWidth={2.5} className="mr-1 h-8 w-8 " />
        <div>{totalPrice.toLocaleString()}</div>
      </div>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle>Total Items Cost</CardTitle>
        <CardDescription>
          The total cost of medical supplies in your inventory.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex  items-center h-20">
        {renderContent()}
      </CardContent>
    </Card>
  );
};

export default TotalCostCard;
