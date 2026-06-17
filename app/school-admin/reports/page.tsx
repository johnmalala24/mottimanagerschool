import PageHeader from "@/components/portal/PageHeader";
import PortalStatCard from "@/components/portal/PortalStatCard";
import EmptyState from "@/components/portal/EmptyState";
import { getSchoolContext } from "@/lib/server/context";
import { getSchoolAdminDashboard } from "@/lib/server/school-admin";

export default async function SchoolAdminReportsPage() {
  const { schoolId } = await getSchoolContext();
  if (!schoolId) {
    return (
      <>
        <PageHeader title="Reports" />
        <div className="p-lg">
          <EmptyState icon="summarize" title="No school linked" />
        </div>
      </>
    );
  }

  const data = await getSchoolAdminDashboard(schoolId);

  return (
    <>
      <PageHeader title="School Reports" subtitle="Summary reports for administration." />
      <div className="p-lg grid grid-cols-2 lg:grid-cols-4 gap-md">
        <PortalStatCard label="Students" value={String(data.totalStudents)} icon="groups" />
        <PortalStatCard label="Teachers" value={String(data.totalTeachers)} icon="badge" />
        <PortalStatCard label="Classes" value={String(data.totalClasses)} icon="class" />
        <PortalStatCard label="Attendance Today" value={`${data.attendanceRate}%`} icon="fact_check" />
      </div>
    </>
  );
}
