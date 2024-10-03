import { CircleCheck, TriangleAlert, Truck } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

const DashboardOrdersCard = () => {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle>Orders</CardTitle>
        <CardDescription>
          Track your recent orders and their status.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">45</h3>
              <p className="text-muted-foreground">Pending</p>
              <div className="text-xs text-gray-500">(Currently Static)</div>
            </div>
            <Truck className="h-8 w-8 text-primary" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">125</h3>
              <p className="text-muted-foreground">Delivered</p>
              <div className="text-xs text-gray-500">(Currently Static)</div>
            </div>
            <CircleCheck className="h-8 w-8 text-primary" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">12</h3>
              <p className="text-muted-foreground">Delayed</p>
              <div className="text-xs text-gray-500">(Currently Static)</div>
            </div>
            <TriangleAlert className="h-8 w-8 text-yellow-500" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardOrdersCard