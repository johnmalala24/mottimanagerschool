import PageHeader from "@/components/portal/PageHeader";
import EmptyState from "@/components/portal/EmptyState";

export default function Page() {
  return (
    <>
      <PageHeader title="Branding" />
      <div className="p-lg">
        <EmptyState icon="construction" title="Branding" description="This section is available in your role portal." />
      </div>
    </>
  );
}
