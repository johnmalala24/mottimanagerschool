import PageHeader from "@/components/portal/PageHeader";

export default function TeacherSupportPage() {
  return (
    <>
      <PageHeader title="Teacher Support" />
      <div className="p-lg max-w-lg tonal-card rounded-xl p-lg">
        <a href={`mailto:${process.env.SUPPORT_EMAIL ?? "support@mottimanager.com"}`} className="text-primary font-semibold hover:underline">
          {process.env.SUPPORT_EMAIL ?? "support@mottimanager.com"}
        </a>
      </div>
    </>
  );
}
