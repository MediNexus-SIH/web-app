import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { redirect } from "next/navigation";
import { getServerSideProps } from "@/hooks/getServerSideProps";
import { useEffect } from "react";

const DashboardBreadCrumb = () => {
  return (
    <header className="sticky flex  items-center gap-4 h-auto bg-transparent ">
      <Breadcrumb className="flex">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="#" prefetch={false}>
                Dashboard
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  );
};

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
            <PackageIcon className="h-8 w-8 text-primary" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">45</h3>
              <p className="text-muted-foreground">Branches</p>
            </div>
            <UsersIcon className="h-8 w-8 text-primary" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">$1.2M</h3>
              <p className="text-muted-foreground">Total Value</p>
            </div>
            <DollarSignIcon className="h-8 w-8 text-primary" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">125</h3>
              <p className="text-muted-foreground">Expiring Soon</p>
            </div>
            <CalendarIcon className="h-8 w-8 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const DashboardAlertsCard = () => {
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
              <h3 className="text-2xl font-bold text-red-500">15</h3>
              <p className="text-muted-foreground">Low Stock</p>
            </div>
            <TriangleAlertIcon className="h-8 w-8 text-red-500" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-yellow-500">125</h3>
              <p className="text-muted-foreground">Expiring Soon</p>
            </div>
            <CalendarIcon className="h-8 w-8 text-yellow-500" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

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
            </div>
            <TruckIcon className="h-8 w-8 text-primary" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">125</h3>
              <p className="text-muted-foreground">Delivered</p>
            </div>
            <CircleCheckIcon className="h-8 w-8 text-primary" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">12</h3>
              <p className="text-muted-foreground">Delayed</p>
            </div>
            <TriangleAlertIcon className="h-8 w-8 text-yellow-500" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const DashboardSupplyChainCard = async () => {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle>Supply Chain</CardTitle>
        <CardDescription>
          View the overall health of your supply chain.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">95%</h3>
              <p className="text-muted-foreground">On-Time Delivery</p>
            </div>
            <TruckIcon className="h-8 w-8 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default async function Component() {

  const session = await getServerSideProps()
  if(!session.sessionStatus){
    redirect("/auth/signin")
  }
  return (
    <div className="flex min-h-screen p-6 w-full flex-col bg-muted/40 ">
      
      <div className="flex flex-col sm:gap-4 ">
        <DashboardBreadCrumb />
        <main className="grid flex-1 items-start gap-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <DashboardInventoryCard />
            <DashboardAlertsCard />
            <DashboardOrdersCard />
            <DashboardSupplyChainCard />
          </div>
        </main>
      </div>
    </div>
  );
}

function CalendarIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function CircleCheckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function DollarSignIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function PackageIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );
}

function TriangleAlertIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  );
}

function TruckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
      <path d="M15 18H9" />
      <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
      <circle cx="17" cy="18" r="2" />
      <circle cx="7" cy="18" r="2" />
    </svg>
  );
}

function UsersIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
