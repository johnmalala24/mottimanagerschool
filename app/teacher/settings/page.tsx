import PageHeader from "@/components/portal/PageHeader";
import { getTeacherRecord } from "@/lib/server/teacher";

export default async function TeacherSettingsPage() {
  const teacher = await getTeacherRecord();
  return (
    <>
      <PageHeader title="Teacher Settings" />
      <div className="p-lg max-w-lg tonal-card rounded-xl p-lg">
        <p className="text-label-md font-semibold">Name</p>
        <p className="text-body-lg mb-md">{teacher?.user.name ?? "—"}</p>
        <p className="text-label-md font-semibold">Employee ID</p>
        <p className="text-body-lg">{teacher?.employeeId ?? "—"}</p>
      </div>
    </>
  );
}
