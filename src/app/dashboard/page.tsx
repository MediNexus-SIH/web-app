import BreadCrumb from "@/components/BreadCrumb";
import DashboardInventoryCard from "@/components/Dashboard Cards/DashboardInventoryCard";
import DashboardAlertCard from "@/components/Dashboard Cards/DashboardAlertCard";
import DashboardOrdersCard from "@/components/Dashboard Cards/DashboardOrderCard";
import DashboardSupplyChainCard from "@/components/Dashboard Cards/DashboardSupplyChain";


export default async function Component() {
  return (
    <div className="flex-1 min-h-screen p-6 w-full bg-muted/40 ">
      <div className="flex flex-col sm:gap-4 ">
        <BreadCrumb paths={[{ pageName: "Dashboard", path: "/dashboard" }]} />
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <main className="grid flex-1 items-start gap-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <DashboardInventoryCard />
            <DashboardAlertCard />
            <DashboardOrdersCard />
            <DashboardSupplyChainCard />
          </div>
        </main>
      </div>
    </div>
  );
}
