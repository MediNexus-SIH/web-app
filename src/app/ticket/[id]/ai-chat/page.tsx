"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Ticket } from "@/lib/interfaces";
import AIChat from "@/components/ticket-page-components/ai-chat";

const TicketAIChatPage: React.FC = () => {
  const searchParams = useSearchParams();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTicketData = () => {
      try {
        const ticketDataString = searchParams.get("ticketData");
        const id =
          searchParams.get("id") || searchParams.toString().split("/")[1];

        if (ticketDataString) {
          try {
            const parsedTicket = JSON.parse(
              decodeURIComponent(ticketDataString)
            );

            // Validate parsed ticket has required fields
            if (!parsedTicket.id) {
              throw new Error("Invalid ticket data: Missing ID");
            }

            setTicket(parsedTicket);
          } catch (parseError) {
            console.error("Error parsing ticket data:", parseError);
            setFallbackTicket(id || "unknown");
            setError("Failed to parse ticket data. Using fallback ticket.");
          }
        } else {
          setFallbackTicket(id || "unknown");
          setError("No ticket data found. Using fallback ticket.");
        }
      } catch (error) {
        console.error("Unexpected error fetching ticket:", error);
        setFallbackTicket("unknown");
        setError("An unexpected error occurred. Using fallback ticket.");
      }
    };

    fetchTicketData();
  }, [searchParams]);

  const setFallbackTicket = (ticketId: string) => {
    setTicket({
      id: ticketId,
      title: "Sample Ticket",
      description: "This is a sample ticket description.",
      status: "open",
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
      expectedResolutionDate: new Date(),
    });
  };

  if (!ticket) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {error && (
        <div
          className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          {error}
        </div>
      )}
      <AIChat ticket={ticket} />
    </div>
  );
};

export default TicketAIChatPage;
