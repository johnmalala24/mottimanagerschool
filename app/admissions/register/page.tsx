import PageHeader from "@/components/portal/PageHeader";
import AdmitStudentForm from "@/components/portal/AdmitStudentForm";
import { getSchoolContext } from "@/lib/server/context";
import { getSchoolClasses } from "@/lib/server/school-admin";

export default async function AdmissionsRegisterPage() {
  const { schoolId } = await getSchoolContext();
  const classes = schoolId ? await getSchoolClasses(schoolId) : [];

  return (
    <>
      <PageHeader title="Student Registration" subtitle="Admit a student and auto-provision parent & student accounts." />
      <div className="p-lg">
        <AdmitStudentForm
          classes={classes.map((c) => ({ id: c.id, name: c.name, section: c.section }))}
        />
      </div>
    </>
  );
}
