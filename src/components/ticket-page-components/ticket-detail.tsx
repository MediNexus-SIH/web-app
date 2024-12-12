"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MessageSquare } from "lucide-react";
import Link from "next/link";
import { Ticket } from "@/lib/interfaces";

interface TicketDetailProps {
  ticket: Ticket;
}

const TicketDetail: React.FC<TicketDetailProps> = ({ ticket }) => {
  const router = useRouter();

  const encodedTicketData = encodeURIComponent(JSON.stringify(ticket));

  return (
    <div className="container mx-auto p-4">
      <Button onClick={() => router.back()} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Tickets
      </Button>
      <h1 className="text-3xl font-bold mb-4">{ticket.title}</h1>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="font-semibold">Status:</p>
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
        </div>
        <div>
          <p className="font-semibold">Priority:</p>
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
        </div>
        <div>
          <p className="font-semibold">Type:</p>
          <Badge variant="outline" className="text-base">
            {ticket.type}
          </Badge>
        </div>
        <div>
          <p className="font-semibold">Category:</p>
          <p>{ticket.category}</p>
        </div>
        <div>
          <p className="font-semibold">Department:</p>
          <p>{ticket.department || "N/A"}</p>
        </div>
        <div>
          <p className="font-semibold">Location:</p>
          <p>{ticket.location || "N/A"}</p>
        </div>
        <div>
          <p className="font-semibold">Created By:</p>
          <p>{ticket.createdBy}</p>
        </div>
        <div>
          <p className="font-semibold">Created At:</p>
          <p>{ticket.createdAt?.toLocaleString() || "Date not available"}</p>
        </div>
        <div>
          <p className="font-semibold">Urgent Care:</p>
          <p>{ticket.urgentCare ? "Yes" : "No"}</p>
        </div>
        <div>
          <p className="font-semibold">Expected Resolution Date:</p>
          <p>
            {ticket.expectedResolutionDate?.toLocaleDateString() ||
              "Not specified"}
          </p>
        </div>
      </div>
      <div className="mb-4">
        <p className="font-semibold">Description:</p>
        <p>{ticket.description}</p>
      </div>
      {ticket.attachments && ticket.attachments.length > 0 && (
        <div>
          <p className="font-semibold">Attachments:</p>
          <ul>
            {ticket.attachments.map((attachment, index) => (
              <li key={index}>
                <a
                  href={attachment}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Attachment {index + 1}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="mt-4">
        <Link
          href={`/ticket/${ticket.id}/ai-chat?ticketData=${encodedTicketData}`}
          passHref
        >
          <Button>
            <MessageSquare className="mr-2 h-4 w-4" />
            AI Chat for this Ticket
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default TicketDetail;
