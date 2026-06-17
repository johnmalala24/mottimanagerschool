import PageHeader from "@/components/portal/PageHeader";
import PortalStatCard from "@/components/portal/PortalStatCard";
import EmptyState from "@/components/portal/EmptyState";
import { getSchoolContext } from "@/lib/server/context";
import { getFinanceDashboard } from "@/lib/server/finance";

export default async function FinanceReportsPage() {
  const { schoolId } = await getSchoolContext();
  if (!schoolId) {
    return (
      <>
        <PageHeader title="Reports" />
        <div className="p-lg"><EmptyState icon="bar_chart" title="No school linked" /></div>
      </>
    );
  }

  const data = await getFinanceDashboard(schoolId);

  return (
    <>
      <PageHeader title="Financial Reports" subtitle="Summary financial metrics." />
      <div className="p-lg grid grid-cols-2 lg:grid-cols-4 gap-md">
        <PortalStatCard label="Collected Today" value={data.collectedTodayFormatted} icon="payments" />
        <PortalStatCard label="Pending Invoices" value={String(data.pendingInvoices)} icon="receipt" />
        <PortalStatCard label="Overdue" value={String(data.overdueInvoices)} icon="warning" />
        <PortalStatCard label="Expenses" value={data.totalExpensesFormatted} icon="shopping_cart" />
      </div>
    </>
  );
}
