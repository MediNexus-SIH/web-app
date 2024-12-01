"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BreadCrumb from "@/components/BreadCrumb";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  AlertTriangle,
  Ambulance,
  ArrowLeftRight,
  Check,
  X,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/components/ui/use-toast";
import SearchInputField from "@/components/SearchInputField";

interface Medicine {
  id: number;
  name: string;
  stock: number;
  branchId: number;
  capacity: number;
  critical: number;
}

interface Branch {
  id: number;
  name: string;
  city: string;
}

// Mock data for demonstration
const branches: Branch[] = [
  { id: 1, name: "Central Hospital", city: "New York" },
  { id: 2, name: "Mercy Medical Center", city: "Los Angeles" },
  { id: 3, name: "St. John's Hospital", city: "Chicago" },
];

export default function BranchesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("all");
  const [alertsOpen, setAlertsOpen] = useState(false);
  const [transferDialogOpen, setTransferDialogOpen] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(
    null
  );

  const inventory = [
    {
      id: 1,
      name: "Aspirin",
      branchId: 1,
      stock: 500,
      capacity: 1000,
      critical: 100,
    },
    {
      id: 2,
      name: "Ibuprofen",
      branchId: 1,
      stock: 30,
      capacity: 500,
      critical: 50,
    },
    {
      id: 3,
      name: "Amoxicillin",
      branchId: 2,
      stock: 200,
      capacity: 400,
      critical: 30,
    },
    {
      id: 4,
      name: "Lisinopril",
      branchId: 2,
      stock: 40,
      capacity: 200,
      critical: 50,
    },
    {
      id: 5,
      name: "Metformin",
      branchId: 3,
      stock: 150,
      capacity: 300,
      critical: 100,
    },
    {
      id: 6,
      name: "Amlodipine",
      branchId: 3,
      stock: 20,
      capacity: 150,
      critical: 50,
    },
  ];

  const transferHistory = [
    {
      id: 1,
      from: "Central Hospital",
      to: "Mercy Medical Center",
      medicine: "Ibuprofen",
      quantity: 100,
      status: "Approved",
      date: "2023-06-01",
    },
    {
      id: 2,
      from: "St. John's Hospital",
      to: "Central Hospital",
      medicine: "Aspirin",
      quantity: 200,
      status: "Pending",
      date: "2023-06-02",
    },
    {
      id: 3,
      from: "Mercy Medical Center",
      to: "St. John's Hospital",
      medicine: "Amlodipine",
      quantity: 50,
      status: "Rejected",
      date: "2023-06-03",
    },
  ];

  const filteredInventory = inventory.filter(
    (item) =>
      (selectedBranch === "all" ||
        item.branchId === parseInt(selectedBranch)) &&
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStockLevelColor = (
    stock: number,
    capacity: number,
    critical: number
  ) => {
    const percentage = (stock / capacity) * 100;
    if (stock <= critical) return "bg-red-500";
    if (percentage < 50) return "bg-yellow-500";
    return "bg-green-500";
  };

  const emergencyAlerts = inventory.filter(
    (item) => item.stock <= item.critical
  );

  const pendingTransfers = transferHistory.filter(
    (transfer) => transfer.status === "Pending"
  );

  const handleTransferRequest = (medicine: Medicine) => {
    setSelectedMedicine(medicine);
    setTransferDialogOpen(true);
  };

  const handleTransferSubmit = (
    fromBranch: number,
    toBranch: number,
    quantity: number
  ) => {
    // Here you would typically make an API call to submit the transfer request
    console.log(
      `Transfer request submitted: ${quantity} units from branch ${fromBranch} to branch ${toBranch}`
    );
    toast({
      title: "Transfer Request Submitted",
      description: `${quantity} units of ${selectedMedicine?.name} requested for transfer.`,
    });
    // Update the local state to reflect the transfer
    const updatedInventory = inventory.map((item) => {
      if (item.id === selectedMedicine?.id) {
        return { ...item, stock: item.stock - quantity };
      }
      return item;
    });
    // You would update your state here, e.g.:
    // setInventory(updatedInventory);
  };

  const handleApproveTransfer = (transferId: number) => {
    // Logic to approve transfer
    console.log(`Approved transfer ${transferId}`);
  };


  const handleRejectTransfer = (transferId: number) => {
    // Logic to reject transfer
    console.log(`Rejected transfer ${transferId}`);
  };

  interface Branch {
    id: number;
    name: string;
  }

  return (
    <div className="p-4 w-full min-h-screen flex-1 overflow-y-auto space-y-4 md:p-6 bg-muted/40">
      <BreadCrumb
        paths={[
          { pageName: "Dashboard", path: "/dashboard" },
          { pageName: "Branches", path: "/dashboard/branches" },
        ]}
      />
      <h1 className="text-2xl font-bold mb-4">
        Hospital Branches Inventory Management
      </h1>

      <div className="flex justify-between items-center mb-4 ">
        <div className="flex items-center  space-x-2">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <SearchInputField
              placeholder="Search Medicines..."
              value={searchTerm}
              onChange={(e: any) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={selectedBranch} onValueChange={setSelectedBranch}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select branch" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Branches</SelectItem>
              {branches.map((branch) => (
                <SelectItem key={branch.id} value={branch.id.toString()}>
                  {branch.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Dialog open={alertsOpen} onOpenChange={setAlertsOpen}>
          <DialogTrigger asChild>
            <div className="relative">
              <Button variant="outline" size="icon">
                <Ambulance className="h-4 w-4" />
              </Button>
              {(emergencyAlerts.length > 0 || pendingTransfers.length > 0) && (
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
              )}
            </div>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Emergency Alerts & Pending Transfers</DialogTitle>
            </DialogHeader>
            <Tabs defaultValue="alerts" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="alerts">Emergency Alerts</TabsTrigger>
                <TabsTrigger value="transfers">Pending Transfers</TabsTrigger>
              </TabsList>
              <TabsContent value="alerts">
                <ScrollArea className="h-[300px]">
                  {emergencyAlerts.length > 0 ? (
                    emergencyAlerts.map((alert) => (
                      <div
                        key={alert.id}
                        className="mb-4 p-2 bg-muted/40 rounded"
                      >
                        <p className="font-semibold">{alert.name}</p>
                        <p>
                          Branch:{" "}
                          {branches.find((b) => b.id === alert.branchId)?.name}
                        </p>
                        <p>
                          Current Stock: {alert.stock} (Critical level:{" "}
                          {alert.critical})
                        </p>
                      </div>
                    ))
                  ) : (
                    <p>No emergency alerts at this time.</p>
                  )}
                </ScrollArea>
              </TabsContent>
              <TabsContent value="transfers">
                <ScrollArea className="h-[300px]">
                  {pendingTransfers.length > 0 ? (
                    pendingTransfers.map((transfer) => (
                      <div
                        key={transfer.id}
                        className="mb-4 p-2 bg-muted/40 rounded flex justify-between items-center"
                      >
                        <div>
                          <p className="font-semibold">{transfer.medicine}</p>
                          <p>From: {transfer.from}</p>
                          <p>To: {transfer.to}</p>
                          <p>Quantity: {transfer.quantity}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            onClick={() => handleApproveTransfer(transfer.id)}
                          >
                            <Check className="h-4 w-4 mr-1" /> Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleRejectTransfer(transfer.id)}
                          >
                            <X className="h-4 w-4 mr-1" /> Reject
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No pending transfers at this time.</p>
                  )}
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="inventory" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="history">Transfer History</TabsTrigger>
        </TabsList>

        <TabsContent value="inventory">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredInventory.map((item) => {
              const branch = branches.find((b) => b.id === item.branchId);
              const stockPercentage = (item.stock / item.capacity) * 100;
              const stockLevelColor = getStockLevelColor(
                item.stock,
                item.capacity,
                item.critical
              );

              return (
                <Card
                  key={item.id}
                  className="overflow-hidden transition-transform transform hover:scale-105 duration-300"
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="flex justify-between items-center">
                      <span>{item.name}</span>
                      {item.stock <= item.critical && (
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                      )}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {branch?.name}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Stock Level</span>
                        <span>
                          {item.stock} / {item.capacity}
                        </span>
                      </div>
                      <Progress
                        value={stockPercentage}
                        className={`h-2 ${stockLevelColor}`}
                        indicatorColor="#D0D0D0"
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">
                        {stockPercentage < 25
                          ? "Low Stock"
                          : stockPercentage > 75
                          ? "Well Stocked"
                          : "Adequate"}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleTransferRequest(item)}
                      >
                        <ArrowLeftRight className="h-4 w-4 mr-2" />
                        Transfer
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Transfer History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>From</TableHead>
                    <TableHead>To</TableHead>
                    <TableHead>Medicine</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transferHistory.map((transfer) => (
                    <TableRow key={transfer.id}>
                      <TableCell>{transfer.date}</TableCell>
                      <TableCell>{transfer.from}</TableCell>
                      <TableCell>{transfer.to}</TableCell>
                      <TableCell>{transfer.medicine}</TableCell>
                      <TableCell>{transfer.quantity}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            transfer.status === "Approved"
                              ? "success"
                              : transfer.status === "Pending"
                              ? "pending"
                              : "destructive"
                          }
                        >
                          {transfer.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <TransferDialog
        isOpen={transferDialogOpen}
        onClose={() => setTransferDialogOpen(false)}
        selectedMedicine={selectedMedicine}
        branches={branches}
        onTransferSubmit={handleTransferSubmit}
      />
    </div>
  );
}
interface TransferDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedMedicine: Medicine | null;
  branches: Branch[];
  onTransferSubmit: (
    fromBranch: number,
    toBranch: number,
    quantity: number
  ) => void;
}

const TransferDialog: React.FC<TransferDialogProps> = ({
  isOpen,
  onClose,
  selectedMedicine,
  branches,
  onTransferSubmit,
}) => {
  const [destinationBranch, setDestinationBranch] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");

  const handleSubmit = () => {
    if (selectedMedicine && destinationBranch && quantity) {
      onTransferSubmit(
        selectedMedicine.branchId,
        parseInt(destinationBranch),
        parseInt(quantity)
      );
      onClose();
    } else {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Request Transfer</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {selectedMedicine ? (
            <>
              <div className="flex justify-between items-center">
                <span className="font-semibold">Medicine:</span>
                <span>{selectedMedicine.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold">Current stock:</span>
                <span>{selectedMedicine.stock}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold">From:</span>
                <span>
                  {
                    branches.find((b) => b.id === selectedMedicine.branchId)
                      ?.name
                  }
                </span>
              </div>
              <Select onValueChange={setDestinationBranch}>
                <SelectTrigger>
                  <SelectValue placeholder="Select destination branch" />
                </SelectTrigger>
                <SelectContent>
                  {branches
                    .filter((b) => b.id !== selectedMedicine.branchId)
                    .map((branch) => (
                      <SelectItem key={branch.id} value={branch.id.toString()}>
                        {branch.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <Input
                type="number"
                placeholder="Quantity to transfer"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                max={selectedMedicine.stock}
              />
            </>
          ) : (
            <p>No medicine selected</p>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Submit Request</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
