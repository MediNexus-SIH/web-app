import { Card, CardHeader, CardContent } from "@/components/ui/card";

function DashboardCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
      {[...Array(4)].map((_, index) => (
        <Card key={`card-${index}`} className="w-full">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="h-5 bg-muted-foreground/20 rounded w-2/3 animate-pulse"></div>
                <div className="h-3 bg-muted-foreground/20 rounded w-full animate-pulse"></div>
                <div className="h-7 bg-muted-foreground/10 rounded w-1/2 animate-pulse"></div>
              </div>
              <div className="space-y-2">
                <div className="h-5 bg-muted-foreground/20 rounded w-2/3 animate-pulse"></div>
                <div className="h-3 bg-muted-foreground/20 rounded w-full animate-pulse"></div>
                <div className="h-7 bg-muted-foreground/10 rounded w-1/2 animate-pulse"></div>
              </div>
              <div className="space-y-2">
                <div className="h-5 bg-muted-foreground/20 rounded w-2/3 animate-pulse"></div>
                <div className="h-3 bg-muted-foreground/20 rounded w-full animate-pulse"></div>
                <div className="h-7 bg-muted-foreground/10 rounded w-1/2 animate-pulse"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export const HeaderLoadingComponent = () => {
  return (
    <>
      <div className="h-4 bg-muted-foreground/10 rounded w-40 animate-pulse px-4 py-2 mr-2 "></div>
      <div className="flex justify-between items-center my-2 ">
        <div className="h-10 bg-muted-foreground/10 rounded w-32 animate-pulse px-4 py-2"></div>
      </div>
    </>
  );
};
export const DashboardLoadingComponent = () => {
  return (
    <>
      <HeaderLoadingComponent />
      <DashboardCardsSkeleton />
    </>
  );
};
