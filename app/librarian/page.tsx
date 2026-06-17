import PageHeader from "@/components/portal/PageHeader";
import PortalDashboard from "@/components/portal/PortalDashboard";
import { getSchoolContext } from "@/lib/server/context";

export default async function Page() {
  const { schoolId } = await getSchoolContext();
  return (
    <>
      <PageHeader title="Library Portal" />
      <div className="p-lg">
        <PortalDashboard portal="librarian" schoolId={schoolId} />
      </div>
    </>
  );
}
