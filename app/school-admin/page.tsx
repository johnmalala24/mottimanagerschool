import PageHeader from "@/components/portal/PageHeader";
import PortalStatCard from "@/components/portal/PortalStatCard";
import EmptyState from "@/components/portal/EmptyState";
import {
  AttendanceTrendChart,
  ChartCard,
  FeesTrendChart,
  StatusPieChart,
  StudentsByClassChart,
} from "@/components/charts/DashboardCharts";
import { getSchoolContext } from "@/lib/server/context";
import { getSchoolAdminDashboard, getSchoolAdminChartData } from "@/lib/server/school-admin";
import { formatDate } from "@/lib/format";

export default async function SchoolAdminDashboardPage() {
  const { schoolId } = await getSchoolContext();

  if (!schoolId) {
    return (
      <>
        <PageHeader title="Admin Dashboard" subtitle="School administration" />
        <div className="p-lg">
          <EmptyState
            icon="school"
            title="No school linked"
            description="Your account is not linked to a school. Contact the platform administrator."
          />
        </div>
      </>
    );
  }

  const [data, charts] = await Promise.all([
    getSchoolAdminDashboard(schoolId),
    getSchoolAdminChartData(schoolId),
  ]);

  return (
    <>
      <PageHeader
        title="Admin Dashboard"
        subtitle={`Welcome back — ${data.schoolName} overview for today.`}
      />
      <div className="flex flex-col gap-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-lg">
          <PortalStatCard
            label="Total Students"
            value={String(data.totalStudents)}
            sub={`${data.totalClasses} classes · ${data.totalTeachers} teachers`}
            icon="groups"
            badge="+ Active"
            badgeVariant="success"
          />
          <PortalStatCard
            label="Fees Collected Today"
            value={data.feesTodayFormatted}
            sub="From fee payments"
            icon="payments"
            badge="Live"
            badgeVariant="success"
            highlight
          />
          <PortalStatCard
            label="Attendance Rate"
            value={`${data.attendanceRate}%`}
            sub="Today's marked attendance"
            icon="fact_check"
            badge="Today"
            badgeVariant="info"
          />
          <PortalStatCard
            label="Fee Alerts"
            value={`${data.overdueInvoices} Cases`}
            sub="Overdue or partial invoices"
            icon="warning"
            badgeVariant={data.overdueInvoices > 0 ? "error" : "success"}
            badge={data.overdueInvoices > 0 ? "Action Required" : "OK"}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg">
          <ChartCard title="Attendance Trend" subtitle="Last 7 days attendance rate">
            <AttendanceTrendChart data={charts.attendanceTrend} />
          </ChartCard>
          <ChartCard title="Daily Fee Collections" subtitle="Last 7 days">
            <FeesTrendChart data={charts.feesTrend} />
          </ChartCard>
          <ChartCard title="Students by Class" subtitle="Enrollment distribution">
            <StudentsByClassChart data={charts.studentsByClass} />
          </ChartCard>
          <ChartCard title="Invoice Status" subtitle="Fee invoice breakdown">
            <StatusPieChart
              data={charts.invoiceStatus.map((s) => ({ name: s.status, count: s.count }))}
            />
          </ChartCard>
        </div>

        <div className="tonal-card rounded-xl p-lg">
          <h3 className="text-title-md font-bold mb-md">Recent Announcements</h3>
          {data.recentAnnouncements.length === 0 ? (
            <p className="text-body-md text-secondary">No announcements yet.</p>
          ) : (
            data.recentAnnouncements.map((a) => (
              <div
                key={a.id}
                className="flex justify-between py-sm border-b border-outline-variant last:border-0"
              >
                <div>
                  <p className="text-label-md font-semibold">{a.title}</p>
                  <p className="text-label-sm text-secondary">
                    {a.recipientCount} recipients · {formatDate(a.createdAt)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
