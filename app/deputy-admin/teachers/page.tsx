import PageHeader from "@/components/portal/PageHeader";
import EmptyState from "@/components/portal/EmptyState";
import { getSchoolContext } from "@/lib/server/context";
import { getSchoolStaff } from "@/lib/server/school-admin";

export default async function DeputyTeachersPage() {
  const { schoolId } = await getSchoolContext();
  if (!schoolId) return <PageHeader title="Teachers" subtitle="No school linked" />;

  const teachers = await getSchoolStaff(schoolId);

  return (
    <>
      <PageHeader title="Teachers" subtitle="View teaching staff across the school." />
      {teachers.length === 0 ? (
        <EmptyState icon="badge" title="No teachers" />
      ) : (
        <div className="tonal-card rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-surface-container-low">
              <tr>
                {["Name", "Subject", "Classes", "Phone"].map((h) => (
                  <th key={h} className="text-left px-md py-sm text-label-sm font-bold text-secondary">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {teachers.map((t) => (
                <tr key={t.id} className="border-t border-outline-variant">
                  <td className="px-md py-md font-semibold">{t.user.name}</td>
                  <td className="px-md py-md">{t.subject?.name ?? "—"}</td>
                  <td className="px-md py-md">{t.classesTeaching.map((c) => c.name).join(", ") || "—"}</td>
                  <td className="px-md py-md text-secondary">{t.user.phone ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
