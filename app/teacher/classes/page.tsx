import PageHeader from "@/components/portal/PageHeader";
import EmptyState from "@/components/portal/EmptyState";
import { getTeacherRecord, getTeacherClasses } from "@/lib/server/teacher";

export default async function TeacherClassesPage() {
  const teacher = await getTeacherRecord();
  if (!teacher) {
    return (
      <>
        <PageHeader title="My Classes" />
        <div className="p-lg"><EmptyState icon="class" title="Teacher not found" /></div>
      </>
    );
  }
  const classes = await getTeacherClasses(teacher.id);
  return (
    <>
      <PageHeader title="My Classes" subtitle="Classes you teach or lead." />
      <div className="p-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
        {classes.length === 0 ? (
          <EmptyState icon="class" title="No classes assigned" />
        ) : (
          classes.map((c) => (
            <div key={c.id} className="tonal-card rounded-xl p-lg">
              <h3 className="text-title-md font-bold">{c.name} {c.section}</h3>
              <p className="text-label-sm text-secondary mt-xs">{c.students.length} students · {c.subjects.length} subjects</p>
            </div>
          ))
        )}
      </div>
    </>
  );
}
