import PageHeader from "@/components/portal/PageHeader";
import EmptyState from "@/components/portal/EmptyState";
import StaffCreateForm from "@/components/portal/StaffCreateForm";
import StatusBadge from "@/components/portal/StatusBadge";
import { getSchoolContext } from "@/lib/server/context";
import { getAllSchoolUsers } from "@/lib/server/school-register";
import { roleLabel } from "@/lib/roles";

export default async function SchoolAdminStaffPage() {
  const { schoolId } = await getSchoolContext();
  if (!schoolId) {
    return (
      <>
        <PageHeader title="Staff" />
        <div className="p-lg"><EmptyState icon="badge" title="No school linked" /></div>
      </>
    );
  }

  const staff = await getAllSchoolUsers(schoolId);

  return (
    <>
      <PageHeader title="Staff Management" subtitle="Create and manage school staff accounts." />
      <div className="p-lg">
        <StaffCreateForm />
        {staff.length === 0 ? (
          <EmptyState icon="badge" title="No staff yet" description="Create your first staff account above." />
        ) : (
          <div className="tonal-card rounded-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-surface-container-low">
                <tr>
                  {["Name", "Email", "Role", "Status", "Class Teacher"].map((h) => (
                    <th key={h} className="text-left px-md py-sm text-label-sm font-bold text-secondary uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {staff.map((member) => (
                  <tr key={member.id} className="border-t border-outline-variant">
                    <td className="px-md py-md font-semibold">{member.name}</td>
                    <td className="px-md py-md text-secondary">{member.email}</td>
                    <td className="px-md py-md text-secondary">{roleLabel(member.role)}</td>
                    <td className="px-md py-md">
                      <StatusBadge label={member.active ? "Active" : "Inactive"} variant={member.active ? "success" : "neutral"} />
                    </td>
                    <td className="px-md py-md text-secondary">
                      {member.teacher?.isClassTeacher ? "Yes" : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
