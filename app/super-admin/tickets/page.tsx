import PageHeader from "@/components/portal/PageHeader";
import EmptyState from "@/components/portal/EmptyState";
import StatusBadge, { statusVariant } from "@/components/portal/StatusBadge";
import { getSupportTickets } from "@/lib/server/super-admin";
import { formatDate } from "@/lib/format";

export default async function SuperAdminTicketsPage() {
  const tickets = await getSupportTickets();
  const openCount = tickets.filter((t) =>
    ["OPEN", "IN_PROGRESS"].includes(t.status)
  ).length;

  return (
    <>
      <PageHeader
        title="Support Tickets"
        subtitle={`${openCount} open ticket${openCount !== 1 ? "s" : ""}`}
      />
      <div className="p-lg flex flex-col gap-md">
        {tickets.length === 0 ? (
          <EmptyState
            icon="support_agent"
            title="No support tickets"
            description="School support requests will appear here."
          />
        ) : (
          tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="tonal-card rounded-xl p-md flex items-center justify-between gap-md"
            >
              <div className="flex items-center gap-md">
                <div
                  className={`w-1.5 h-12 rounded-full flex-shrink-0 ${
                    ticket.priority === "HIGH"
                      ? "bg-error"
                      : ticket.priority === "MEDIUM"
                        ? "bg-yellow-400"
                        : "bg-outline"
                  }`}
                />
                <div>
                  <div className="flex items-center gap-sm mb-xs">
                    <span className="text-label-sm text-secondary font-mono">
                      {ticket.ticketNumber}
                    </span>
                    <StatusBadge label={ticket.priority} variant={statusVariant(ticket.priority)} />
                  </div>
                  <p className="text-label-md font-semibold">{ticket.subject}</p>
                  <p className="text-label-sm text-secondary">
                    {ticket.school.name} · {formatDate(ticket.createdAt)}
                  </p>
                </div>
              </div>
              <StatusBadge
                label={ticket.status.replace("_", " ")}
                variant={statusVariant(ticket.status)}
              />
            </div>
          ))
        )}
      </div>
    </>
  );
}
