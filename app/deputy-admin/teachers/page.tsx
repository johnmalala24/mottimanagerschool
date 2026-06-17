import PageHeader from "@/components/portal/PageHeader";
import EmptyState from "@/components/portal/EmptyState";

export default function Page() {
  return (
    <>
      <PageHeader title="Teachers" />
      <div className="p-lg">
        <EmptyState icon="construction" title="Teachers" description="This section is available in your role portal." />
      </div>
    </>
  );
}
