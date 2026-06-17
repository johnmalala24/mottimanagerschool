import PageHeader from "@/components/portal/PageHeader";
import PortalDashboard from "@/components/portal/PortalDashboard";
import { getSchoolContext } from "@/lib/server/context";

export default async function Page() {
  const { schoolId } = await getSchoolContext();
  return (
    <>
      <PageHeader title="Front Office" />
      <div className="p-lg">
        <PortalDashboard portal="receptionist" schoolId={schoolId} />
      </div>
    </>
  );
}
