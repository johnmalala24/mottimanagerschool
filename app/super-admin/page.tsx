import Link from "next/link";
import PageHeader from "@/components/portal/PageHeader";
import PortalStatCard from "@/components/portal/PortalStatCard";
import EmptyState from "@/components/portal/EmptyState";
import StatusBadge, { statusVariant } from "@/components/portal/StatusBadge";
import {
  getSuperAdminDashboardStats,
  getAuditLogs,
  getSubscriptions,
  getSuperAdminChartData,
} from "@/lib/server/super-admin";
import { formatDate } from "@/lib/format";
import { ChartCard, RevenueAreaChart, StatusPieChart } from "@/components/charts/DashboardCharts";

export default async function SuperAdminDashboardPage() {
  const stats = await getSuperAdminDashboardStats();
  const [auditLogs, renewals, charts] = await Promise.all([
    getAuditLogs(),
    getSubscriptions(),
    getSuperAdminChartData(),
  ]);

  return (
    <>
      <PageHeader
        title="Super Admin Dashboard"
        subtitle="Global overview of MottiManager platform performance."
        actions={
          <Link
            href="/super-admin/schools"
            className="flex items-center gap-xs bg-primary text-on-primary px-md py-sm rounded-lg text-label-md font-semibold hover:opacity-90"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            Register New School
          </Link>
        }
      />
      <div className="p-lg flex flex-col gap-lg">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-md">
          <PortalStatCard
            label="Total Schools"
            value={String(stats.totalSchools)}
            sub={`${stats.activeSchools} active`}
            icon="school"
            badge="+Live"
            badgeVariant="success"
          />
          <PortalStatCard
            label="Active Schools"
            value={String(stats.activeSchools)}
            sub={`${stats.suspendedSchools} suspended`}
            icon="check_circle"
            badge="Active"
            badgeVariant="info"
          />
          <PortalStatCard
            label="Platform Revenue"
            value={stats.revenueFormatted}
            sub="All billing transactions"
            icon="payments"
            badge="KES"
            badgeVariant="success"
          />
          <PortalStatCard
            label="Total Students"
            value={String(stats.totalStudents)}
            sub={`${stats.openTickets} open tickets`}
            icon="groups"
            badge="Live"
            badgeVariant="neutral"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg">
          <ChartCard title="Platform Revenue" subtitle="Monthly billing trend">
            <RevenueAreaChart data={charts.revenueTrend} />
          </ChartCard>
          <ChartCard title="Subscription Status" subtitle="Schools by subscription state">
            <StatusPieChart data={charts.subscriptionBreakdown} />
          </ChartCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg">
          <div className="tonal-card rounded-xl p-lg">
            <h3 className="text-title-md font-bold mb-md">Upcoming Renewals</h3>
            {renewals.length === 0 ? (
              <p className="text-body-md text-secondary">No subscriptions on record.</p>
            ) : (
              renewals.slice(0, 6).map((sub) => (
                <div
                  key={sub.id}
                  className="flex items-center justify-between py-sm border-b border-outline-variant last:border-0"
                >
                  <div>
                    <p className="text-label-md font-semibold">{sub.school.name}</p>
                    <p className="text-label-sm text-secondary">
                      {sub.plan} · Renews{" "}
                      {sub.renewalDate ? formatDate(sub.renewalDate) : "—"}
                    </p>
                  </div>
                  <StatusBadge
                    label={sub.status.replace("_", " ")}
                    variant={statusVariant(sub.status)}
                  />
                </div>
              ))
            )}
          </div>

          <div className="tonal-card rounded-xl p-lg">
            <h3 className="text-title-md font-bold mb-md">Recent Platform Activity</h3>
            {auditLogs.length === 0 ? (
              <EmptyState
                icon="receipt_long"
                title="No audit logs yet"
                description="Platform actions will appear here as schools and admins use the system."
              />
            ) : (
              <div className="flex flex-col divide-y divide-outline-variant">
                {auditLogs.slice(0, 8).map((log) => (
                  <div key={log.id} className="flex items-center gap-md py-sm">
                    <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-secondary text-[18px]">
                        {log.icon ?? "info"}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-label-md font-semibold">{log.action}</p>
                      <p className="text-label-sm text-secondary">
                        By: {log.actorName ?? "System"}
                        {log.school?.name ? ` · ${log.school.name}` : ""}
                      </p>
                    </div>
                    <span className="text-label-sm text-secondary whitespace-nowrap">
                      {formatDate(log.createdAt)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
