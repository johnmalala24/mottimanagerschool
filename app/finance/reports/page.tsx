import PageHeader from "@/components/portal/PageHeader";
import PortalStatCard from "@/components/portal/PortalStatCard";
import EmptyState from "@/components/portal/EmptyState";
import SchoolReportLayout from "@/components/portal/SchoolReportLayout";
import { getSchoolContext } from "@/lib/server/context";
import { getFinanceDashboard } from "@/lib/server/finance";
import { formatDate } from "@/lib/format";

export default async function FinanceReportsPage() {
  const { schoolId, branding } = await getSchoolContext();
  if (!schoolId) {
    return (
      <>
        <PageHeader title="Reports" />
        <EmptyState icon="bar_chart" title="No school linked" />
      </>
    );
  }

  const data = await getFinanceDashboard(schoolId);

  return (
    <>
      <PageHeader title="Financial Reports" subtitle="Summary financial metrics." />
      <SchoolReportLayout
        branding={branding}
        reportTitle="Financial Summary"
        reportSubtitle="Collections, invoices, and expenses"
        generatedAt={formatDate(new Date())}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-md">
          <PortalStatCard label="Collected Today" value={data.collectedTodayFormatted} icon="payments" highlight badgeVariant="success" />
          <PortalStatCard label="Pending Invoices" value={String(data.pendingInvoices)} icon="receipt" badgeVariant="info" />
          <PortalStatCard label="Overdue" value={String(data.overdueInvoices)} icon="warning" badgeVariant="error" />
          <PortalStatCard label="Expenses" value={data.totalExpensesFormatted} icon="shopping_cart" badgeVariant="neutral" />
        </div>
      </SchoolReportLayout>
    </>
  );
}
