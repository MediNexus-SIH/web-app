import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow } from "@/components/ui/table";
export const HeaderLoadingComponent = () => {
  return (
    <div className="p-4 flex flex-col space-y-4">
      <div className="h-4 bg-muted-foreground/10 rounded w-40 animate-pulse px-4 py-2 mr-2"></div>
      <div className="flex justify-between items-center">
        <div className="h-10 bg-muted-foreground/10 rounded w-32 animate-pulse px-4 py-2"></div>
        <div className="h-9 bg-muted-foreground/10 rounded w-28 animate-pulse px-4 py-2"></div>
      </div>
    </div>
  );
};
function OrderItemSkeleton() {
  return (
    <>
      <Card className="w-full">
        <CardHeader className="pb-3 space-y-2 mx-1">
          <div className="flex justify-between">
            <div className="h-10 bg-muted-foreground/20 rounded w-48 animate-pulse"></div>
            <div className="flex space-x-10">
              <div className="h-10 bg-muted-foreground/20 rounded w-24 animate-pulse"></div>
              <div className="h-10 bg-muted-foreground/20 rounded w-24 animate-pulse"></div>
            </div>
          </div>
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

function InventoryCardsSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 w-full">
      {[...Array(4)].map((_, index) => (
        <Card key={`card-${index}`} className="w-full">
          <CardContent className="p-6">
            <div className="space-y-2">
              <div className="h-6 bg-muted-foreground/20 rounded w-2/3 animate-pulse"></div>
              <div className="h-4 bg-muted-foreground/20 rounded w-full animate-pulse"></div>
              <div className="h-64 bg-muted-foreground/10 rounded w-full animate-pulse"></div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

const OrderLoadingComponent = () => {
  return (
    <div className="p-2 space-y-4">
      <HeaderLoadingComponent />
      <OrderItemSkeleton />
      <InventoryCardsSkeleton/>
    </div>
  );
};

export default OrderLoadingComponent;
