import PageHeader from "@/components/portal/PageHeader";
import UserProfileSettings from "@/components/portal/UserProfileSettings";

export default function DeputySupportPage() {
  return (
    <>
      <PageHeader title="Support" subtitle="Get help or update your profile." />
      <div className="tonal-card rounded-xl p-lg space-y-lg max-w-lg">
        <UserProfileSettings />
        <div>
          <h3 className="font-bold mb-sm">Need assistance?</h3>
          <p className="text-sm text-secondary">Contact your school ICT admin or email support@mottimanager.com</p>
        </div>
      </div>
    </>
  );
}
