import PageHeader from "@/components/portal/PageHeader";
import PortalStatCard from "@/components/portal/PortalStatCard";
import { getSchoolContext } from "@/lib/server/context";
import { getAllSchoolUsers } from "@/lib/server/school-register";

export default async function IctAdminDashboardPage() {
  const { schoolId } = await getSchoolContext();
  if (!schoolId) {
    return <PageHeader title="ICT Admin Dashboard" />;
  }
  const users = await getAllSchoolUsers(schoolId);
  const active = users.filter((u) => u.active).length;

  return (
    <>
      <PageHeader
        title="ICT Admin Dashboard"
        subtitle="User accounts, branding, and technical support."
      />
      <div className="p-lg grid grid-cols-2 lg:grid-cols-3 gap-md">
        <PortalStatCard label="Staff Accounts" value={String(users.length)} icon="manage_accounts" />
        <PortalStatCard label="Active Users" value={String(active)} icon="check_circle" />
        <PortalStatCard label="Inactive Users" value={String(users.length - active)} icon="person_off" />
      </div>
    </>
  );
}
