import { getSchoolContext } from "@/lib/server/context";
import { redirect } from "next/navigation";
import SchoolSetupWizard from "./SchoolSetupWizard";

export default async function SetupPage() {
  const { user, schoolId } = await getSchoolContext();

  if (!user || user.role !== "SCHOOL_ADMIN" || !schoolId) {
    redirect("/auth/signin");
  }

  return <SchoolSetupWizard />;
}
