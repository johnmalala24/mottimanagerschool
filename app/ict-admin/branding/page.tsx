import PageHeader from "@/components/portal/PageHeader";
import { getSchoolContext, getSchoolBranding } from "@/lib/server/context";

export default async function IctBrandingPage() {
  const { schoolId, school } = await getSchoolContext();
  const branding = schoolId ? await getSchoolBranding(schoolId) : null;

  return (
    <>
      <PageHeader title="Branding Preview" subtitle="Current school visual identity." />
      {branding && (
        <div className="tonal-card rounded-xl p-xl max-w-md">
          <div className="flex items-center gap-md mb-lg">
            <div className="w-16 h-16 rounded-xl flex items-center justify-center text-white" style={{ backgroundColor: branding.themeColor }}>
              {branding.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={branding.logo} alt="" className="w-full h-full object-cover rounded-xl" />
              ) : (
                <span className="material-symbols-outlined icon-filled text-2xl">school</span>
              )}
            </div>
            <div>
              <h2 className="text-title-md font-bold">{branding.schoolName}</h2>
              {branding.motto && <p className="text-secondary text-sm">{branding.motto}</p>}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-sm">
            <div className="h-12 rounded-lg" style={{ backgroundColor: branding.themeColor }} title="Primary" />
            <div className="h-12 rounded-lg" style={{ backgroundColor: branding.accentColor }} title="Accent" />
            <div className="h-12 rounded-lg border border-outline-variant" style={{ backgroundColor: branding.dashboardBgColor }} title="Background" />
          </div>
          <p className="text-label-sm text-secondary mt-md">Edit branding in Settings.</p>
        </div>
      )}
    </>
  );
}
