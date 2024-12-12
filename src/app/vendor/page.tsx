import { OverviewCards } from "./components/overview-cards";

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 bg-muted/40 ">
      <div className="m-4">
        <div className="flex items-center justify-between space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        </div>
        <OverviewCards />
      </div>
    </div>
  );
}
