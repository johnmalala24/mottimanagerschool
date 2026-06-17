import PageHeader from "@/components/portal/PageHeader";

export default function SchoolAdminSupportPage() {
  return (
    <>
      <PageHeader title="School Support" subtitle="Get help with school administration." />
      <div className="p-lg max-w-lg tonal-card rounded-xl p-lg">
        <p className="text-body-md text-secondary mb-md">
          Contact platform support for school-level issues.
        </p>
        <a
          href={`mailto:${process.env.SUPPORT_EMAIL ?? "support@mottimanager.com"}`}
          className="text-primary font-semibold hover:underline"
        >
          {process.env.SUPPORT_EMAIL ?? "support@mottimanager.com"}
        </a>
      </div>
    </>
  );
}
