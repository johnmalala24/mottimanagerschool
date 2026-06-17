import PageHeader from "@/components/portal/PageHeader";
import PortalDashboard from "@/components/portal/PortalDashboard";
import { getSchoolContext } from "@/lib/server/context";

export default async function Page() {
  const { schoolId } = await getSchoolContext();
  return (
    <>
      <PageHeader title="Hostel Manager" />
      <div className="p-lg">
        <PortalDashboard portal="hostel-manager" schoolId={schoolId} />
      </div>
    </>
  );
}
