"use client";

import React from "react";
import BreadCrumb from "@/components/BreadCrumb"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  BarChart,
  PieChart,
  Activity,
  Calendar,
  Clock,
  Download,
  Filter,
} from "lucide-react";
import { BlobProvider, PDFDownloadLink } from "@react-pdf/renderer";

import {
  InventoryStatusChart,
  DemandAnalyticsChart,
  StockUsageTrendsChart,
} from "./ChartImages";
import PDFReport from "./PDFReport";

export default function ReportAnalytics() {
  // Data for PDF
  const reportData = {
    inventoryStatus: {
      inStock: 300,
      lowStock: 50,
      outOfStock: 10,
    },
    criticalItems: [
      { name: "Item A", status: "Low Stock" },
      { name: "Item B", status: "Expiring Soon" },
      { name: "Item C", status: "Out of Stock" },
    ],
  };

  interface DownloadButtonProps {
    url: string | null;
    loading: boolean;
    error: Error | null;
  }

  const DownloadButton: React.FC<DownloadButtonProps> = ({
    url,
    loading,
    error,
  }) => (
    <Button
      disabled={loading}
      onClick={() => {
        if (url) {
          const link = document.createElement("a");
          link.href = url;
          link.download = "MediNexus_Inventory_Report.pdf";
          link.click();
        }
      }}
    >
      {loading ? (
        "Generating PDF..."
      ) : (
        <>
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </>
      )}
    </Button>
  );

  const RTCGraphs = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Inventory Status
            </CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <InventoryStatusChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stock Levels</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <DemandAnalyticsChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Critical Items
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex justify-between items-center">
                <span>Item A</span>
                <span className="text-red-500 font-semibold">Low Stock</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Item B</span>
                <span className="text-yellow-500 font-semibold">
                  Expiring Soon
                </span>
              </li>
              <li className="flex justify-between items-center">
                <span>Item C</span>
                <span className="text-red-500 font-semibold">Out of Stock</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    );
  };

  const TrendsGraphs = () => {
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Stock Usage Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <StockUsageTrendsChart />
        </CardContent>
      </Card>
    );
  };

  const ExpiryAnalytics = () => {
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Expiry Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Item X</TableCell>
                <TableCell>Pharmaceuticals</TableCell>
                <TableCell>2023-08-15</TableCell>
                <TableCell>
                  <span className="text-yellow-500">●</span> Expiring Soon
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Item Y</TableCell>
                <TableCell>Medical Devices</TableCell>
                <TableCell>2023-09-30</TableCell>
                <TableCell>
                  <span className="text-green-500">●</span> Good
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Item Z</TableCell>
                <TableCell>Consumables</TableCell>
                <TableCell>2023-07-31</TableCell>
                <TableCell>
                  <span className="text-red-500">●</span> Critical
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  };

  const DemandAnalytics = () => {
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Demand Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <DemandAnalyticsChart />
        </CardContent>
      </Card>
    );
  };

  const OrderHistory = () => {
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Order History and Efficiency</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Recent Orders</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>#1234</TableCell>
                    <TableCell>2023-07-01</TableCell>
                    <TableCell>Completed</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>#1235</TableCell>
                    <TableCell>2023-07-02</TableCell>
                    <TableCell>Processing</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Processing Time</h3>
              <div className="flex items-center space-x-4">
                <Clock className="h-8 w-8 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">2.5 days</p>
                  <p className="text-sm text-gray-500">
                    Average processing time
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="flex-1 mx-auto p-4 bg-muted/40 space-y-4 min-h-screen">
      <BreadCrumb
        paths={[
          { pageName: "Dashboard", path: "/dashboard" },
          { pageName: "Reports", path: "/dashboard/reports" },
        ]}
      />
      <h1 className="text-2xl font-bold mb-4">Reports Analytics</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            <SelectItem value="emergency">Emergency</SelectItem>
            <SelectItem value="surgery">Surgery</SelectItem>
            <SelectItem value="pediatrics">Pediatrics</SelectItem>
          </SelectContent>
        </Select>
        <Input type="date" className="w-[180px]" />
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" /> More Filters
        </Button>
      </div>

      {/* Real-time Inventory Status Overview */}
      <RTCGraphs />

      {/* Trend Graphs */}
      <TrendsGraphs />

      {/* Expiry Analytics */}
      <ExpiryAnalytics />

      {/* Demand Analytics */}
      <DemandAnalytics />

      {/* Order History and Efficiency */}
      <OrderHistory />

      {/* Export and Sharing */}
      <div className="flex justify-end space-x-4">
        <Button variant="outline">
          <Calendar className="mr-2 h-4 w-4" />
          Schedule Report
        </Button>

        <BlobProvider document={<PDFReport data={reportData} />}>
          {({ url, loading, error }) => (
            <DownloadButton url={url} loading={loading} error={error} />
          )}
        </BlobProvider>
      </div>
    </div>
  );
}
