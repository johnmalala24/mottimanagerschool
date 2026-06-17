import PageHeader from "@/components/portal/PageHeader";

export default function SuperAdminSupportPage() {
  return (
    <>
      <PageHeader title="Platform Support" subtitle="Internal support resources for platform operators." />
      <div className="p-lg grid grid-cols-1 md:grid-cols-2 gap-lg max-w-4xl">
        <div className="tonal-card rounded-xl p-lg">
          <span className="material-symbols-outlined text-primary text-[32px] mb-sm">mail</span>
          <h3 className="text-title-md font-bold mb-xs">Email Support</h3>
          <p className="text-body-md text-secondary mb-md">
            Contact the platform support team for escalations.
          </p>
          <a
            href={`mailto:${process.env.SUPPORT_EMAIL ?? "support@mottimanager.com"}`}
            className="text-primary font-semibold hover:underline"
          >
            {process.env.SUPPORT_EMAIL ?? "support@mottimanager.com"}
          </a>
        </div>
        <div className="tonal-card rounded-xl p-lg">
          <span className="material-symbols-outlined text-tertiary text-[32px] mb-sm">help</span>
          <h3 className="text-title-md font-bold mb-xs">Documentation</h3>
          <p className="text-body-md text-secondary">
            Platform operator guides and onboarding playbooks for school setup.
          </p>
        </div>
      </div>
    </>
  );
}
