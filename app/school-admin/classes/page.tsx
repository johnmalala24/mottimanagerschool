import PageHeader from "@/components/portal/PageHeader";
import EmptyState from "@/components/portal/EmptyState";
import { getSchoolContext } from "@/lib/server/context";
import { getSchoolClasses } from "@/lib/server/school-admin";

export default async function SchoolAdminClassesPage() {
  const { schoolId } = await getSchoolContext();
  if (!schoolId) {
    return (
      <>
        <PageHeader title="Classes" />
        <div className="p-lg"><EmptyState icon="class" title="No school linked" /></div>
      </>
    );
  }

  const classes = await getSchoolClasses(schoolId);

  return (
    <>
      <PageHeader title="Classes & Streams" subtitle="Academic class structure." />
      <div className="p-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
        {classes.length === 0 ? (
          <EmptyState icon="class" title="No classes" description="Create classes for your academic year." />
        ) : (
          classes.map((c) => (
            <div key={c.id} className="tonal-card rounded-xl p-lg">
              <div className="flex items-start justify-between mb-md">
                <div className="w-12 h-12 bg-primary text-on-primary rounded-xl flex items-center justify-center">
                  <span className="material-symbols-outlined icon-filled">class</span>
                </div>
                <span className="text-label-sm bg-surface-container px-sm py-xs rounded-full text-secondary font-semibold">
                  Stream {c.section}
                </span>
              </div>
              <h3 className="text-title-md font-bold mb-xs">{c.name}</h3>
              <p className="text-label-sm text-secondary mb-md">
                {c.classTeacher?.user.name ?? "No class teacher"} · {c.subjects.length} subjects
              </p>
              <p className="text-label-md text-secondary">{c.students.length} students enrolled</p>
            </div>
          ))
        )}
      </div>
    </>
  );
}
