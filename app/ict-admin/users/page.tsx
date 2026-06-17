import PageHeader from "@/components/portal/PageHeader";
import EmptyState from "@/components/portal/EmptyState";
import StatusBadge from "@/components/portal/StatusBadge";
import { getSchoolContext } from "@/lib/server/context";
import { getAllSchoolUsers } from "@/lib/server/school-register";
import { roleLabel } from "@/lib/roles";

export default async function IctAdminUsersPage() {
  const { schoolId } = await getSchoolContext();
  if (!schoolId) {
    return (
      <>
        <PageHeader title="User Accounts" />
        <div className="p-lg"><EmptyState icon="manage_accounts" title="No school linked" /></div>
      </>
    );
  }

  const users = await getAllSchoolUsers(schoolId);

  return (
    <>
      <PageHeader title="User Accounts" subtitle="Manage staff login accounts and access." />
      <div className="p-lg tonal-card rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-surface-container-low">
            <tr>
              {["Name", "Email", "Role", "Phone", "Status"].map((h) => (
                <th key={h} className="text-left px-md py-sm text-label-sm font-bold text-secondary uppercase">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t border-outline-variant">
                <td className="px-md py-md font-semibold">{u.name}</td>
                <td className="px-md py-md text-secondary">{u.email}</td>
                <td className="px-md py-md text-secondary">{roleLabel(u.role)}</td>
                <td className="px-md py-md text-secondary">{u.phone ?? "—"}</td>
                <td className="px-md py-md">
                  <StatusBadge label={u.active ? "Active" : "Inactive"} variant={u.active ? "success" : "neutral"} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
