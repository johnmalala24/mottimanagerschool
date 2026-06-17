import PageHeader from "@/components/portal/PageHeader";
import { PublicApplicationForm } from "@/components/portal/forms/OperationForms";

export default function PublicApplyPage() {
  return (
    <div className="min-h-screen bg-[#f8f9ff] py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <PageHeader
          title="School Admission Application"
          subtitle="Submit an application using your school's code (ask the school office if unsure)."
        />
        <div className="mt-lg">
          <PublicApplicationForm />
        </div>
      </div>
    </div>
  );
}
