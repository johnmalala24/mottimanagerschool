import PageHeader from "@/components/portal/PageHeader";
import EmptyState from "@/components/portal/EmptyState";
import SchoolReportLayout from "@/components/portal/SchoolReportLayout";
import { getSchoolContext } from "@/lib/server/context";
import { formatDate } from "@/lib/format";

export default async function Page() {
  const { branding } = await getSchoolContext();
  return (
    <>
      <PageHeader title="Reports" subtitle="Deputy administration reports." />
      <SchoolReportLayout
        branding={branding}
        reportTitle="Deputy Admin Report"
        generatedAt={formatDate(new Date())}
      >
        <EmptyState icon="construction" title="Reports" description="This section is available in your role portal." />
      </SchoolReportLayout>
    </>
  );
}
