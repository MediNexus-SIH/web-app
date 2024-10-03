import {
  Calendar,
  DollarSign,
  IndianRupee,
  Package,
  Users,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

const DashboardInventoryCard = ({
  totalStockCount,
  branches,
  totalPrice,
}: {
  totalStockCount: number;
  branches: number;
  totalPrice: number;
}) => {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle>Inventory Overview</CardTitle>
        <CardDescription>
          Quick view of your current inventory levels across all branches.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">
                {totalStockCount.toLocaleString()}
              </h3>
              <p className="text-muted-foreground">Total Items</p>
            </div>
            <Package className="h-8 w-8 text-primary" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">{branches}</h3>
              <p className="text-muted-foreground">Branches</p>
              <div className="text-xs text-gray-500">(Currently Static)</div>
            </div>
            <Users className="h-8 w-8 text-primary" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center">
                <IndianRupee strokeWidth={2.5} className="h-5 w-5" />
                <h3 className="text-2xl font-bold">
                  {totalPrice.toLocaleString()}
                </h3>
              </div>

              <p className="text-muted-foreground">Total Value</p>
            </div>
            <DollarSign className="h-8 w-8 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardInventoryCard;
