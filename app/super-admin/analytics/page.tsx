import PageHeader from "@/components/portal/PageHeader";
import PortalStatCard from "@/components/portal/PortalStatCard";
import {
  getSuperAdminDashboardStats,
  getSubscriptionPlanBreakdown,
} from "@/lib/server/super-admin";
import { formatKES } from "@/lib/format";

export default async function SuperAdminAnalyticsPage() {
  const stats = await getSuperAdminDashboardStats();
  const planBreakdown = await getSubscriptionPlanBreakdown();

  return (
    <>
      <PageHeader title="Platform Analytics" subtitle="High-level metrics across all schools." />
      <div className="p-lg flex flex-col gap-lg">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-md">
          <PortalStatCard
            label="Schools"
            value={String(stats.totalSchools)}
            icon="school"
          />
          <PortalStatCard
            label="Students"
            value={String(stats.totalStudents)}
            icon="groups"
          />
          <PortalStatCard
            label="Revenue"
            value={stats.revenueFormatted}
            icon="payments"
          />
          <PortalStatCard
            label="Open Tickets"
            value={String(stats.openTickets)}
            icon="support_agent"
          />
        </div>

        <div className="tonal-card rounded-xl p-lg">
          <h3 className="text-title-md font-bold mb-md">Subscription Revenue by Plan</h3>
          {planBreakdown.length === 0 ? (
            <p className="text-body-md text-secondary">No subscription data yet.</p>
          ) : (
            planBreakdown.map((row) => (
              <div key={row.plan} className="mb-md">
                <div className="flex justify-between text-label-md mb-xs">
                  <span className="font-semibold">
                    {row.plan}{" "}
                    <span className="text-secondary font-normal">
                      ({row._count.plan} schools)
                    </span>
                  </span>
                  <span className="font-bold text-primary">
                    {formatKES(row._sum.monthlyAmount ?? 0)}/mo
                  </span>
                </div>
                <div className="h-2 bg-surface-container rounded-full">
                  <div
                    className="h-2 bg-primary rounded-full"
                    style={{
                      width: `${Math.min(100, row._count.plan * 10)}%`,
                    }}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
