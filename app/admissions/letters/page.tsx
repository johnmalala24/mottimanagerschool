import PageHeader from "@/components/portal/PageHeader";
import PortalList from "@/components/portal/PortalList";
import { getSchoolContext } from "@/lib/server/context";

export default async function Page() {
  const { schoolId } = await getSchoolContext();
  return (
    <>
      <PageHeader title="Letters" />
      <div className="p-lg">
        <PortalList portal="admissions" page="letters" schoolId={schoolId} />
      </div>
    </>
  );
}
