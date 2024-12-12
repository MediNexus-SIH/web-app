"use client";

import React, { useState } from "react";
import { Plus, Filter, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";
import TicketDetail from "./ticket-detail";
import AIChat from "./ai-chat";

interface Ticket {
  id: string;
  title: string;
  description: string;
  status: "open" | "in-progress" | "resolved";
  priority: "low" | "medium" | "high";
  createdBy: string;
  createdAt: Date;
  assignedTo?: string;
  type: "hospital" | "vendor";
  department?: string;
  location?: string;
  contactInfo: string;
  category: string;
  attachments: string[];
  urgentCare: boolean;
  expectedResolutionDate?: Date;
}

const departments = [
  "Emergency",
  "Surgery",
  "Pediatrics",
  "Cardiology",
  "Oncology",
  "Radiology",
  "Laboratory",
  "Pharmacy",
  "IT",
  "Facilities",
];

const categories = [
  "Equipment Malfunction",
  "Software Issue",
  "Supply Shortage",
  "Maintenance Request",
  "Patient Care Concern",
  "Billing Inquiry",
  "Security Incident",
  "Training Request",
  "Policy Question",
  "Other",
];

const simplifiedCategories = [
  "Technical",
  "Administrative",
  "Clinical",
  "Facility",
  "Other",
];

const UnifiedTicketSystem: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [newTicket, setNewTicket] = useState<Partial<Ticket>>({
    status: "open",
    priority: "medium",
    type: "hospital",
    urgentCare: false,
  });
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterType, setFilterType] = useState<string>("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const router = useRouter();

  const handleCreateTicket = () => {
    if (
      newTicket.title &&
      newTicket.description &&
      newTicket.category &&
      newTicket.contactInfo
    ) {
      const ticket: Ticket = {
        id: Date.now().toString(),
        title: newTicket.title,
        description: newTicket.description,
        status: newTicket.status as "open" | "in-progress" | "resolved",
        priority: newTicket.priority as "low" | "medium" | "high",
        createdBy: "Current User", // Replace with actual user info
        createdAt: new Date(),
        type: newTicket.type as "hospital" | "vendor",
        department: newTicket.department,
        location: newTicket.location,
        contactInfo: newTicket.contactInfo,
        category: newTicket.category,
        attachments: newTicket.attachments || [],
        urgentCare: newTicket.urgentCare || false,
        expectedResolutionDate: newTicket.expectedResolutionDate,
      };
      setTickets([...tickets, ticket]);
      setNewTicket({
        status: "open",
        priority: "medium",
        type: "hospital",
        urgentCare: false,
      });
      setIsDialogOpen(false);
    }
  };

  const filteredTickets = tickets.filter(
    (ticket) =>
      (filterStatus === "all" || ticket.status === filterStatus) &&
      (filterType === "all" || ticket.type === filterType)
  );

  const handleRowClick = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    router.push(`/ticket/${ticket.id}`);
  };

  return (
    <div className="container mx-auto p-4 h-[100%]">
      <h1 className="text-3xl font-bold mb-4">Unified Ticket System</h1>
      <div className="flex justify-between items-center mb-4">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Create New Ticket
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Ticket</DialogTitle>
              <DialogDescription>
                Fill in the details to create a new ticket. Fields marked with *
                are required.
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="max-h-[600px] pr-4">
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title *
                  </Label>
                  <Input
                    id="title"
                    className="col-span-3"
                    value={newTicket.title || ""}
                    onChange={(e) =>
                      setNewTicket({ ...newTicket, title: e.target.value })
                    }
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description *
                  </Label>
                  <Textarea
                    id="description"
                    className="col-span-3"
                    value={newTicket.description || ""}
                    onChange={(e) =>
                      setNewTicket({
                        ...newTicket,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="type" className="text-right">
                    Type *
                  </Label>
                  <Select
                    value={newTicket.type}
                    onValueChange={(value) =>
                      setNewTicket({
                        ...newTicket,
                        type: value as "hospital" | "vendor",
                      })
                    }
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hospital">Hospital</SelectItem>
                      <SelectItem value="vendor">Vendor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="priority" className="text-right">
                    Priority *
                  </Label>
                  <Select
                    value={newTicket.priority}
                    onValueChange={(value) =>
                      setNewTicket({
                        ...newTicket,
                        priority: value as "low" | "medium" | "high",
                      })
                    }
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="department" className="text-right">
                    Department
                  </Label>
                  <Select
                    value={newTicket.department}
                    onValueChange={(value) =>
                      setNewTicket({ ...newTicket, department: value })
                    }
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="location" className="text-right">
                    Location
                  </Label>
                  <Input
                    id="location"
                    className="col-span-3"
                    value={newTicket.location || ""}
                    onChange={(e) =>
                      setNewTicket({ ...newTicket, location: e.target.value })
                    }
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="contactInfo" className="text-right">
                    Contact Info *
                  </Label>
                  <Input
                    id="contactInfo"
                    className="col-span-3"
                    value={newTicket.contactInfo || ""}
                    onChange={(e) =>
                      setNewTicket({
                        ...newTicket,
                        contactInfo: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">
                    Category *
                  </Label>
                  <Select
                    value={newTicket.category}
                    onValueChange={(value) =>
                      setNewTicket({ ...newTicket, category: value })
                    }
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="urgentCare" className="text-right">
                    Urgent Care
                  </Label>
                  <div className="col-span-3">
                    <Checkbox
                      id="urgentCare"
                      checked={newTicket.urgentCare}
                      onCheckedChange={(checked) =>
                        setNewTicket({
                          ...newTicket,
                          urgentCare: checked as boolean,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label
                    htmlFor="expectedResolutionDate"
                    className="text-right"
                  >
                    Expected Resolution Date
                  </Label>
                  <Input
                    id="expectedResolutionDate"
                    type="date"
                    className="col-span-3"
                    value={
                      newTicket.expectedResolutionDate
                        ?.toISOString()
                        .split("T")[0] || ""
                    }
                    onChange={(e) =>
                      setNewTicket({
                        ...newTicket,
                        expectedResolutionDate: new Date(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="attachments" className="text-right">
                    Attachments
                  </Label>
                  <Input
                    id="attachments"
                    type="file"
                    className="col-span-3"
                    multiple
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []).map(
                        (file) => URL.createObjectURL(file)
                      );
                      setNewTicket({ ...newTicket, attachments: files });
                    }}
                  />
                </div>
              </div>
            </ScrollArea>
            <DialogFooter>
              <Button onClick={handleCreateTicket}>Create Ticket</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <div className="flex items-center space-x-2">
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="hospital">Hospital</SelectItem>
              <SelectItem value="vendor">Vendor</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="mb-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] text-lg">ID</TableHead>
              <TableHead className="text-lg">Title</TableHead>
              <TableHead className="text-lg">Status</TableHead>
              <TableHead className="text-lg">Priority</TableHead>
              <TableHead className="text-lg">Type</TableHead>
              <TableHead className="text-lg">Category</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTickets.map((ticket) => (
              <TableRow
                key={ticket.id}
                onClick={() => handleRowClick(ticket)}
                className="cursor-pointer hover:bg-gray-muted/40"
              >
                <TableCell className="font-medium text-base">
                  {ticket.id}
                </TableCell>
                <TableCell className="text-base">{ticket.title}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      ticket.status === "open"
                        ? "default"
                        : ticket.status === "in-progress"
                        ? "secondary"
                        : "success"
                    }
                    className="text-base"
                  >
                    {ticket.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      ticket.priority === "low"
                        ? "outline"
                        : ticket.priority === "medium"
                        ? "default"
                        : "destructive"
                    }
                    className="text-base"
                  >
                    {ticket.priority}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-base">
                    {ticket.type}
                  </Badge>
                </TableCell>
                <TableCell className="text-base">{ticket.category}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UnifiedTicketSystem;
