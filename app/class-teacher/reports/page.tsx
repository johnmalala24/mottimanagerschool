import PageHeader from "@/components/portal/PageHeader";
import PortalList from "@/components/portal/PortalList";
import SchoolReportLayout from "@/components/portal/SchoolReportLayout";
import { getSchoolContext } from "@/lib/server/context";
import { formatDate } from "@/lib/format";

export default async function Page() {
  const { schoolId, branding } = await getSchoolContext();
  return (
    <>
      <PageHeader title="Reports" subtitle="Class performance and attendance reports." />
      <SchoolReportLayout
        branding={branding}
        reportTitle="Class Report"
        generatedAt={formatDate(new Date())}
      >
        <PortalList portal="class-teacher" page="reports" schoolId={schoolId} />
      </SchoolReportLayout>
    </>
  );
}
