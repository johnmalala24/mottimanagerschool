import PageHeader from "@/components/portal/PageHeader";
import PortalStatCard from "@/components/portal/PortalStatCard";
import {
  ChartCard,
  AttendanceTrendChart,
  FeesTrendChart,
  StudentsByClassChart,
  StatusPieChart,
} from "@/components/charts/DashboardCharts";
import { getSchoolContext } from "@/lib/server/context";
import { getAdvancedAnalytics } from "@/lib/server/analytics";
import { getSchoolAdminChartData } from "@/lib/server/school-admin";
import { SendRemindersButton } from "@/components/portal/FinanceWorkflow";

export default async function SchoolAdminReportsPage() {
  const { schoolId } = await getSchoolContext();
  if (!schoolId) return <PageHeader title="Analytics" subtitle="No school linked" />;

  const [analytics, charts] = await Promise.all([
    getAdvancedAnalytics(schoolId),
    getSchoolAdminChartData(schoolId),
  ]);

  return (
    <>
      <PageHeader
        title="Analytics & Reports"
        subtitle="Performance insights, fee collection trends, and at-risk student flags."
        actions={<SendRemindersButton />}
      />

      <div className="flex flex-col gap-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-md">
          <PortalStatCard label="Students" value={String(analytics.summary.totalStudents)} icon="groups" badgeVariant="success" />
          <PortalStatCard label="Fee Collection" value={`${analytics.summary.collectionRate}%`} icon="payments" badgeVariant="info" />
          <PortalStatCard label="Avg Attendance" value={`${analytics.summary.avgAttendance}%`} icon="fact_check" badgeVariant="success" />
          <PortalStatCard label="At-Risk Students" value={String(analytics.summary.atRiskCount)} icon="warning" badgeVariant={analytics.summary.atRiskCount > 0 ? "error" : "success"} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg">
          <ChartCard title="Fee Collection (6 months)" subtitle="Collected vs invoiced">
            <FeesTrendChart data={analytics.feeCollectionTrend.map((f) => ({ day: f.month, amount: f.collected }))} />
          </ChartCard>
          <ChartCard title="Attendance Trend" subtitle="Last 7 days">
            <AttendanceTrendChart data={charts.attendanceTrend} />
          </ChartCard>
          <ChartCard title="Students by Class" subtitle="Enrollment">
            <StudentsByClassChart data={charts.studentsByClass} />
          </ChartCard>
          <ChartCard title="Invoice Status" subtitle="Fee breakdown">
            <StatusPieChart data={charts.invoiceStatus.map((s) => ({ name: s.status, count: s.count }))} />
          </ChartCard>
        </div>

        {analytics.examPerformance.length > 0 && (
          <div className="tonal-card rounded-xl p-lg">
            <h3 className="text-title-md font-bold mb-md">Exam Performance</h3>
            <div className="space-y-sm">
              {analytics.examPerformance.map((e) => (
                <div key={e.exam} className="flex items-center justify-between py-sm border-b border-outline-variant last:border-0">
                  <span className="font-medium">{e.exam}</span>
                  <span className="text-secondary">{e.students} students · Avg <strong>{e.average}</strong></span>
                </div>
              ))}
            </div>
          </div>
        )}

        {analytics.subjectPerformance.length > 0 && (
          <div className="tonal-card rounded-xl p-lg">
            <h3 className="text-title-md font-bold mb-md">Subject Performance</h3>
            <div className="grid sm:grid-cols-2 gap-sm">
              {analytics.subjectPerformance.map((s) => (
                <div key={s.subject} className="flex justify-between py-2 px-md bg-surface-container-low rounded-lg">
                  <span>{s.subject}</span>
                  <span className="font-bold text-primary">{s.average}%</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {analytics.atRiskStudents.length > 0 && (
          <div className="tonal-card rounded-xl p-lg border-l-4 border-error">
            <h3 className="text-title-md font-bold mb-md text-error">Students Needing Attention</h3>
            <div className="space-y-sm">
              {analytics.atRiskStudents.map((s, i) => (
                <div key={i} className="flex justify-between text-sm py-1">
                  <span className="font-medium">{s.name} <span className="text-secondary">({s.class})</span></span>
                  <span className="text-secondary">{s.reason}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
