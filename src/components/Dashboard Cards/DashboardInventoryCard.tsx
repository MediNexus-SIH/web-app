import { Calendar, DollarSign, Package, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

const DashboardInventoryCard = () => {
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
              <h3 className="text-2xl font-bold">12,345</h3>
              <p className="text-muted-foreground">Total Items</p>
            </div>
            <Package className="h-8 w-8 text-primary" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">45</h3>
              <p className="text-muted-foreground">Branches</p>
            </div>
            <Users className="h-8 w-8 text-primary" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">$1.2M</h3>
              <p className="text-muted-foreground">Total Value</p>
            </div>
            <DollarSign className="h-8 w-8 text-primary" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">125</h3>
              <p className="text-muted-foreground">Expiring Soon</p>
            </div>
            <Calendar className="h-8 w-8 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardInventoryCard;