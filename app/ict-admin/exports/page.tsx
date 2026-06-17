import PageHeader from "@/components/portal/PageHeader";
import { ExportDataPanel, ImportStudentsForm } from "@/components/portal/FinanceWorkflow";
import { getSchoolContext } from "@/lib/server/context";

export default async function IctExportsPage() {
  const { schoolId } = await getSchoolContext();

  return (
    <>
      <PageHeader title="Data Exports & Import" subtitle="Download CSV spreadsheets or bulk-import students." />
      <div className="flex flex-col gap-lg">
        {schoolId ? (
          <>
            <ExportDataPanel />
            <ImportStudentsForm />
          </>
        ) : (
          <p className="text-secondary">Link your account to a school to export data.</p>
        )}
      </div>
    </>
  );
}
