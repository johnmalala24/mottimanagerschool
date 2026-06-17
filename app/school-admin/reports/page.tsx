import PageHeader from "@/components/portal/PageHeader";
import PortalStatCard from "@/components/portal/PortalStatCard";
import EmptyState from "@/components/portal/EmptyState";
import SchoolReportLayout from "@/components/portal/SchoolReportLayout";
import { getSchoolContext } from "@/lib/server/context";
import { getSchoolAdminDashboard } from "@/lib/server/school-admin";
import { formatDate } from "@/lib/format";

export default async function SchoolAdminReportsPage() {
  const { schoolId, branding } = await getSchoolContext();
  if (!schoolId) {
    return (
      <>
        <PageHeader title="Reports" />
        <EmptyState icon="summarize" title="No school linked" />
      </>
    );
  }

  const data = await getSchoolAdminDashboard(schoolId);

  return (
    <>
      <PageHeader title="School Reports" subtitle="Summary reports for administration." />
      <SchoolReportLayout
        branding={branding}
        reportTitle="Administrative Summary"
        reportSubtitle="Enrollment, staff, and attendance overview"
        generatedAt={formatDate(new Date())}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-md">
          <PortalStatCard label="Students" value={String(data.totalStudents)} icon="groups" badgeVariant="success" />
          <PortalStatCard label="Teachers" value={String(data.totalTeachers)} icon="badge" badgeVariant="info" />
          <PortalStatCard label="Classes" value={String(data.totalClasses)} icon="class" badgeVariant="neutral" />
          <PortalStatCard label="Attendance Today" value={`${data.attendanceRate}%`} icon="fact_check" badgeVariant="success" />
        </div>
      </SchoolReportLayout>
    </>
  );
}
