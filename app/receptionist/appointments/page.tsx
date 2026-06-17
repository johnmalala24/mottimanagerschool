import PageHeader from "@/components/portal/PageHeader";
import PortalList from "@/components/portal/PortalList";
import { getSchoolContext } from "@/lib/server/context";

export default async function Page() {
  const { schoolId } = await getSchoolContext();
  return (
    <>
      <PageHeader title="Appointments" />
      <div className="p-lg">
        <PortalList portal="receptionist" page="appointments" schoolId={schoolId} />
      </div>
    </>
  );
}
