import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow } from "@/components/ui/table";

function DashboardCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
      {[...Array(4)].map((_, index) => (
        <Card key={`card-${index}`} className="w-full">
          <CardContent className="p-6">
            <div className="space-y-2">
              <div className="h-6 bg-muted-foreground/20 rounded w-2/3 animate-pulse"></div>
              <div className="h-4 bg-muted-foreground/20 rounded w-full animate-pulse"></div>
              <div className="h-8 bg-muted-foreground/10 rounded w-1/2 animate-pulse"></div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
function InventoryItemSkeleton() {
  return (
    <>
      <Card className="w-full">
        <CardHeader className="pb-3 space-y-2 mx-1">
          <div className="h-4 bg-muted-foreground/20 rounded w-1/2 animate-pulse "></div>
          <div className="h-4 bg-muted-foreground/20 rounded w-full animate-pulse"></div>
          <div className="h-4 bg-muted-foreground/20 rounded w-3/4 animate-pulse"></div>
        </CardHeader>
        <CardContent>
          <Table className="mb-4">
            <TableHeader>
              <TableRow className="hover:bg-transparent ">
                <div className="h-8 bg-muted-foreground/10 rounded animate-pulse mb-2 mx-1"></div>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                <TableRow className="hover:bg-transparent">
                  {[...Array(6)].map((_, colIndex) => (
                    <div
                      key={`cell-${colIndex}`}
                      className="h-12 bg-muted-foreground/5 rounded animate-pulse mx-1 my-2"
                    ></div>
                  ))}
                </TableRow>
              }
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}

export const LoadingComponent = () => {
  return (
    <>
      <DashboardCardsSkeleton />
      <InventoryItemSkeleton />
    </>
  );
};
