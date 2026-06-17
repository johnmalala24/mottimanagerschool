import PageHeader from "@/components/portal/PageHeader";
import PortalList from "@/components/portal/PortalList";
import { getSchoolContext } from "@/lib/server/context";

export default async function DeputyDisciplinePage() {
  const { schoolId } = await getSchoolContext();
  return (
    <>
      <PageHeader title="Discipline" subtitle="Student discipline records." />
      <PortalList portal="class-teacher" page="discipline" schoolId={schoolId} />
    </>
  );
}
