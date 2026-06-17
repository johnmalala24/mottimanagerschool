import PageHeader from "@/components/portal/PageHeader";
import PortalStatCard from "@/components/portal/PortalStatCard";
import EmptyState from "@/components/portal/EmptyState";
import StatusBadge, { statusVariant } from "@/components/portal/StatusBadge";
import { ChartCard, FinanceComparisonChart, RevenueAreaChart, StatusPieChart } from "@/components/charts/DashboardCharts";
import { getSchoolContext } from "@/lib/server/context";
import { getFinanceDashboard, getFinanceChartData } from "@/lib/server/finance";
import { formatDate, formatKES } from "@/lib/format";

export default async function FinanceDashboardPage() {
  const { schoolId } = await getSchoolContext();

  if (!schoolId) {
    return (
      <>
        <PageHeader title="Bursar Portal" />
        <div className="p-lg"><EmptyState icon="payments" title="No school linked" /></div>
      </>
    );
  }

  const [data, charts] = await Promise.all([
    getFinanceDashboard(schoolId),
    getFinanceChartData(schoolId),
  ]);

  return (
    <>
      <PageHeader title="Bursar Portal" subtitle="Finance overview for your school." />
      <div className="p-lg flex flex-col gap-lg">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-md">
          <PortalStatCard label="Collected Today" value={data.collectedTodayFormatted} icon="payments" badge="Live" badgeVariant="info" />
          <PortalStatCard label="Pending Invoices" value={String(data.pendingInvoices)} icon="receipt" />
          <PortalStatCard label="Overdue" value={String(data.overdueInvoices)} icon="warning" badgeVariant={data.overdueInvoices > 0 ? "error" : "success"} />
          <PortalStatCard label="Total Expenses" value={data.totalExpensesFormatted} icon="shopping_cart" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg">
          <ChartCard title="Collections vs Expenses" subtitle="Last 6 months">
            <FinanceComparisonChart data={charts.monthlyCollections} />
          </ChartCard>
          <ChartCard title="Payment Methods" subtitle="By total amount collected">
            <StatusPieChart data={charts.paymentMethods} />
          </ChartCard>
        </div>

        <div className="tonal-card rounded-xl p-lg">
          <h3 className="text-title-md font-bold mb-md">Recent M-Pesa Transactions</h3>
          {data.recentMpesa.length === 0 ? (
            <p className="text-secondary">No M-Pesa transactions recorded.</p>
          ) : (
            data.recentMpesa.map((m) => (
              <div key={m.id} className="flex justify-between py-sm border-b border-outline-variant last:border-0">
                <div>
                  <p className="font-semibold">{m.student?.user.name ?? m.phone ?? "—"}</p>
                  <p className="text-label-sm text-secondary">{formatDate(m.createdAt)} · {m.type.replace("_", " ")}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary">{formatKES(m.amount)}</p>
                  <StatusBadge label={m.status} variant={statusVariant(m.status)} />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
