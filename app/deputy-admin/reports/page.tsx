import PageHeader from "@/components/portal/PageHeader";
import EmptyState from "@/components/portal/EmptyState";

export default function Page() {
  return (
    <>
      <PageHeader title="Reports" />
      <div className="p-lg">
        <EmptyState icon="construction" title="Reports" description="This section is available in your role portal." />
      </div>
    </>
  );
}
