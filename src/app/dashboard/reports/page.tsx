"use client"
import React from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function ReportAnalytics() {
  // Mock data for charts
  const inventoryStatusData = {
    labels: ["In Stock", "Low Stock", "Out of Stock"],
    datasets: [
      {
        data: [300, 50, 10],
        backgroundColor: ["#10B981", "#FBBF24", "#EF4444"],
      },
    ],
  };

  const trendData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Stock Usage",
        data: [65, 59, 80, 81, 56, 55],
        borderColor: "#3B82F6",
        tension: 0.1,
      },
    ],
  };

  const demandData = {
    labels: ["Item A", "Item B", "Item C", "Item D", "Item E"],
    datasets: [
      {
        label: "Demand",
        data: [12, 19, 3, 5, 2],
        backgroundColor: "#8B5CF6",
      },
    ],
  };

  return (
    <div className=" mx-auto p-4 bg-muted/40 w-full">
      <h1 className="text-3xl font-bold mb-6">Report Analytics</h1>

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Inventory Status
            </CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Pie data={inventoryStatusData} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stock Levels</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Bar
              data={{
                labels: ["Medical Devices", "Consumables", "Pharmaceuticals"],
                datasets: [
                  {
                    label: "Current Stock",
                    data: [300, 450, 200],
                    backgroundColor: "#3B82F6",
                  },
                ],
              }}
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
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

      {/* Trend Graphs */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Stock Usage Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <Line data={trendData} />
        </CardContent>
      </Card>

      {/* Expiry Analytics */}
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

      {/* Demand Analytics */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Demand Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <Bar data={demandData} />
        </CardContent>
      </Card>

      {/* Order History and Efficiency */}
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

      {/* Export and Sharing */}
      <div className="flex justify-end space-x-4">
        <Button variant="outline">
          <Calendar className="mr-2 h-4 w-4" />
          Schedule Report
        </Button>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>
    </div>
  );
}
