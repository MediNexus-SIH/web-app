// import { Layout } from "@/components/layout"
"use client";
import { HospitalsTable, Hospital } from "../components/hospitals-table";
import { Button } from "@/components/ui/button";
import useFetchHospitals from "@/hooks/use-fetch-hospital";
import axios from "axios";

const sampleHospitals: Hospital[] = [
  {
    id: "H001",
    name: "City General Hospital",
    location: "New York, NY",
    contactPerson: "Dr. John Smith",
    contactEmail: "john.smith@citygeneral.com",
    contactPhone: "+1 (555) 123-4567",
    status: "Active",
    lastOrderDate: "2023-06-01",
  },
  {
    id: "H002",
    name: "St. Mary's Medical Center",
    location: "Los Angeles, CA",
    contactPerson: "Dr. Sarah Johnson",
    contactEmail: "sarah.johnson@stmarys.com",
    contactPhone: "+1 (555) 987-6543",
    status: "Active",
    lastOrderDate: "2023-06-02",
  },
  {
    id: "H003",
    name: "Sunshine Children's Hospital",
    location: "Miami, FL",
    contactPerson: "Dr. Michael Brown",
    contactEmail: "michael.brown@sunshinechildren.com",
    contactPhone: "+1 (555) 246-8135",
    status: "Active",
    lastOrderDate: "2023-06-03",
  },
  {
    id: "H004",
    name: "Veterans Memorial Hospital",
    location: "Chicago, IL",
    contactPerson: "Dr. Emily Davis",
    contactEmail: "emily.davis@veteransmemorial.com",
    contactPhone: "+1 (555) 369-2580",
    status: "Inactive",

    lastOrderDate: "2023-05-15",
  },
  {
    id: "H005",
    name: "University Medical Center",
    location: "Boston, MA",
    contactPerson: "Dr. Robert Wilson",
    contactEmail: "robert.wilson@umc.edu",
    contactPhone: "+1 (555) 159-7531",
    status: "Active",
    lastOrderDate: "2023-06-05",
  },
];

export default function HospitalsPage() {
  const { hospitals, loading, error } = useFetchHospitals();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex-1 space-y-4 p-8 pt-6 bg-muted/40">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Hospitals</h2>
        <div className="flex items-center space-x-2">
          <Button>Add Hospital</Button>
        </div>
      </div>
      <HospitalsTable data={sampleHospitals} />
    </div>
  );
}
