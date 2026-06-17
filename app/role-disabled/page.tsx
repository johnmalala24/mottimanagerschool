import Link from "next/link";

export default function RoleDisabledPage() {
  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-lg">
      <div className="max-w-md text-center tonal-card rounded-2xl p-xl">
        <div className="w-16 h-16 bg-error-container rounded-2xl flex items-center justify-center mx-auto mb-md">
          <span className="material-symbols-outlined text-on-error-container text-[32px]">block</span>
        </div>
        <h1 className="text-title-lg font-bold mb-sm">Portal Access Disabled</h1>
        <p className="text-body-md text-secondary mb-lg">
          Your role portal has been turned off by your school administrator. Contact your school admin if you believe this is a mistake.
        </p>
        <div className="flex flex-col sm:flex-row gap-sm justify-center">
          <Link href="/auth/signin" className="btn-primary !w-auto px-6">
            Sign Out & Switch Account
          </Link>
        </div>
      </div>
    </div>
  );
}
