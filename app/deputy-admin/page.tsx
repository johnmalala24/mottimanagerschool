import PageHeader from "@/components/portal/PageHeader";
import PortalStatCard from "@/components/portal/PortalStatCard";
import { getSchoolContext } from "@/lib/server/context";
import { getSchoolAdminDashboard } from "@/lib/server/school-admin";

export default async function DeputyAdminDashboardPage() {
  const { schoolId } = await getSchoolContext();
  if (!schoolId) {
    return <PageHeader title="Deputy Admin Dashboard" />;
  }
  const stats = await getSchoolAdminDashboard(schoolId);

  return (
    <>
      <PageHeader
        title="Deputy Admin Dashboard"
        subtitle="Assist the principal with daily school operations."
      />
      <div className="p-lg grid grid-cols-2 lg:grid-cols-4 gap-md">
        <PortalStatCard label="Students" value={String(stats.totalStudents)} icon="groups" />
        <PortalStatCard label="Teachers" value={String(stats.totalTeachers)} icon="person_book" />
        <PortalStatCard label="Classes" value={String(stats.totalClasses)} icon="class" />
        <PortalStatCard label="Attendance Today" value={`${stats.attendanceRate}%`} icon="fact_check" />
      </div>
    </>
  );
}
