import PageHeader from "@/components/portal/PageHeader";
import UserProfileSettings from "@/components/portal/UserProfileSettings";

export default function IctSupportPage() {
  return (
    <>
      <PageHeader title="ICT Support" subtitle="Profile and technical support." />
      <div className="tonal-card rounded-xl p-lg max-w-lg">
        <UserProfileSettings />
      </div>
    </>
  );
}
