import PageHeader from "@/components/portal/PageHeader";

export default function FinanceSupportPage() {
  return (
    <>
      <PageHeader title="Finance Support" />
      <div className="p-lg max-w-lg tonal-card rounded-xl p-lg">
        <p className="text-body-md text-secondary mb-md">Billing and payment support.</p>
        <a href={`mailto:${process.env.BILLING_EMAIL ?? "billing@mottimanager.com"}`} className="text-primary font-semibold hover:underline">
          {process.env.BILLING_EMAIL ?? "billing@mottimanager.com"}
        </a>
      </div>
    </>
  );
}
