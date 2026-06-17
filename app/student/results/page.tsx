import PageHeader from "@/components/portal/PageHeader";
import PortalList from "@/components/portal/PortalList";
import { getSchoolContext } from "@/lib/server/context";

export default async function Page() {
  const { schoolId } = await getSchoolContext();
  return (
    <>
      <PageHeader title="Results" />
      <div className="p-lg">
        <PortalList portal="student" page="results" schoolId={schoolId} />
      </div>
    </>
  );
}
