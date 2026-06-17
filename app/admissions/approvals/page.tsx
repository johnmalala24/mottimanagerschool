import PageHeader from "@/components/portal/PageHeader";
import PortalList from "@/components/portal/PortalList";
import { AdmissionActions } from "@/components/portal/forms/OperationForms";
import { getSchoolContext } from "@/lib/server/context";
import { getAdmissions } from "@/lib/server/operations";
import { getSchoolClasses } from "@/lib/server/school-admin";

export default async function AdmissionsApprovalsPage() {
  const { schoolId } = await getSchoolContext();
  const applications = schoolId ? await getAdmissions(schoolId) : [];
  const classes = schoolId ? await getSchoolClasses(schoolId) : [];

  return (
    <>
      <PageHeader title="Approvals" subtitle="Review and admit pending applications." />
      <div className="p-lg">
        <AdmissionActions
          applications={applications}
          classes={classes.map((c) => ({ id: c.id, name: c.name, section: c.section }))}
        />
        <PortalList portal="admissions" page="approvals" schoolId={schoolId} />
      </div>
    </>
  );
}
