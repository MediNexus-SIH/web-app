"use client";

import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  PointElement,
  LineElement,
} from "chart.js";
import { Pie, Bar, Line } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  PointElement,
  LineElement
);

export function InventoryStatusChart() {
  const data = {
    labels: ["In Stock", "Low Stock", "Out of Stock"],
    datasets: [
      {
        data: [300, 50, 10],
        backgroundColor: ["#10B981", "#FBBF24", "#EF4444"],
      },
    ],
  };

  return <Pie data={data} />;
}

export function DemandAnalyticsChart() {
  const data = {
    labels: ["Paracetamol", "Ibuprofen", "Cough Syrup", "Disprin", "Oximeter"],
    datasets: [
      {
        label: "Demand",
        data: [12, 19, 3, 5, 2],
        backgroundColor: "#8B5CF6",
      },
    ],
  };

  return <Bar data={data} />;
}

export function StockUsageTrendsChart() {
  const data = {
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

  return <Line data={data} />;
}
