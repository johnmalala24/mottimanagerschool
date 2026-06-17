import PageHeader from "@/components/portal/PageHeader";
import EmptyState from "@/components/portal/EmptyState";
import { getAuditLogs } from "@/lib/server/super-admin";
import { formatDateTime } from "@/lib/format";

export default async function SuperAdminAuditPage() {
  const logs = await getAuditLogs();

  return (
    <>
      <PageHeader title="Audit Logs" subtitle="Platform activity and administrative actions." />
      <div className="p-lg">
        {logs.length === 0 ? (
          <EmptyState
            icon="receipt_long"
            title="No audit logs"
            description="Administrative actions will be recorded here."
          />
        ) : (
          <div className="tonal-card rounded-xl overflow-hidden divide-y divide-outline-variant">
            {logs.map((log) => (
              <div
                key={log.id}
                className="flex items-center gap-md px-md py-md hover:bg-surface-container-low"
              >
                <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-secondary text-[18px]">
                    {log.icon ?? "info"}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-label-md font-semibold">{log.action}</p>
                  <p className="text-label-sm text-secondary">
                    By: {log.actorName ?? "System"} · Target: {log.target ?? "—"}
                    {log.school?.name ? ` · ${log.school.name}` : ""}
                  </p>
                </div>
                <span className="text-label-sm text-secondary whitespace-nowrap">
                  {formatDateTime(log.createdAt)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
