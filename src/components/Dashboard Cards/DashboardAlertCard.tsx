import { Calendar, TriangleAlert } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

const DashboardAlertCard = ({
  lowStockCount,
  expiringStockCount,
}: {
  lowStockCount:number;
  expiringStockCount:number;
}) => {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle>Alerts</CardTitle>
        <CardDescription>
          Critical alerts for low stock and expiring batches.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-red-500">
                {lowStockCount.toLocaleString()}
              </h3>
              <p className="text-muted-foreground">Low Stock</p>
            </div>
            <TriangleAlert className="h-8 w-8 text-red-500" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-yellow-500">
                {expiringStockCount.toLocaleString()}
              </h3>
              <p className="text-muted-foreground">Expiring Soon</p>
            </div>
            <Calendar className="h-8 w-8 text-yellow-500" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardAlertCard;
