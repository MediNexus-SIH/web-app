"use client";

import React from "react";
import { useParams } from "next/navigation";
import TicketDetail from "@/components/ticket-page-components/ticket-detail";

const TicketDetailPage: React.FC = () => {
  const params = useParams();
  const ticketId = Array.isArray(params.id) ? params.id[0] : params.id;

  // In a real application, you would fetch the ticket data here
  // For this example, we'll use a dummy ticket
  const dummyTicket = {
    id: ticketId,
    title: "Sample Ticket",
    description: "This is a sample ticket description.",
    expectedResolutionDate: new Date("2025-10-05T14:48:00.000Z"),
    status: "open" as "open" | "in-progress" | "resolved",
    priority: "medium",
    createdBy: "John Doe",
    createdAt: new Date(),
    type: "hospital",
    department: "IT",
    location: "Main Building",
    contactInfo: "john.doe@example.com",
    category: "Technical",
    attachments: [],
    urgentCare: false,
  };

  return <TicketDetail ticket={dummyTicket} />;
};

export default TicketDetailPage;
