import PageHeader from "@/components/portal/PageHeader";
import PortalStatCard from "@/components/portal/PortalStatCard";
import { getSchoolContext } from "@/lib/server/context";
import { getSchoolAdminDashboard } from "@/lib/server/school-admin";
import Link from "next/link";

export default async function DeputyReportsPage() {
  const { schoolId } = await getSchoolContext();
  if (!schoolId) return <PageHeader title="Reports" subtitle="No school linked" />;

  const data = await getSchoolAdminDashboard(schoolId);

  return (
    <>
      <PageHeader title="Reports Overview" subtitle="Quick school summary for deputy administration." />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-md mb-lg">
        <PortalStatCard label="Students" value={String(data.totalStudents)} icon="groups" badgeVariant="success" />
        <PortalStatCard label="Teachers" value={String(data.totalTeachers)} icon="badge" badgeVariant="info" />
        <PortalStatCard label="Attendance" value={`${data.attendanceRate}%`} icon="fact_check" badgeVariant="success" />
        <PortalStatCard label="Fee Alerts" value={String(data.overdueInvoices)} icon="warning" badgeVariant={data.overdueInvoices > 0 ? "error" : "success"} />
      </div>
      <Link href="/school-admin/reports" className="text-primary font-medium">View full analytics →</Link>
    </>
  );
}
