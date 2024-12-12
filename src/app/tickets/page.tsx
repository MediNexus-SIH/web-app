import UnifiedTicketSystem from "@/components/ticket-page-components/unified-ticket-page";

export default function TicketsPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Ticket Management</h1>
      <UnifiedTicketSystem />
    </div>
  );
}
