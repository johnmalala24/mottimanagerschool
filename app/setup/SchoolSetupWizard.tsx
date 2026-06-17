"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import ColorSelect from "@/components/portal/ColorSelect";
import LogoUploadField from "@/components/portal/LogoUploadField";
import { THEME_COLOR_PRESETS } from "@/lib/theme-colors";

type Step = "branding" | "academic" | "classes" | "subjects" | "modules";

const DEFAULT_CLASSES = [
  { name: "Grade 1", section: "A" },
  { name: "Grade 2", section: "A" },
  { name: "Grade 3", section: "A" },
];

const DEFAULT_SUBJECTS = [
  { name: "Mathematics", code: "MATH" },
  { name: "English", code: "ENG" },
  { name: "Kiswahili", code: "KIS" },
];

export default function SchoolSetupWizard() {
  const router = useRouter();
  const { update } = useSession();
  const [step, setStep] = useState<Step>("branding");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [themeColor, setThemeColor] = useState(THEME_COLOR_PRESETS[0].value);
  const [logo, setLogo] = useState<string | null>(null);
  const [motto, setMotto] = useState("");
  const [yearName, setYearName] = useState(String(new Date().getFullYear()));
  const [yearStart, setYearStart] = useState(`${new Date().getFullYear()}-01-08`);
  const [yearEnd, setYearEnd] = useState(`${new Date().getFullYear()}-11-29`);
  const [classes, setClasses] = useState(DEFAULT_CLASSES);
  const [subjects, setSubjects] = useState(DEFAULT_SUBJECTS);
  const [modules, setModules] = useState({
    cbeEnabled: true,
    smsEnabled: false,
    whatsappEnabled: false,
    transportEnabled: false,
    libraryEnabled: true,
    hostelEnabled: false,
    payrollEnabled: false,
  });

  const steps: Step[] = ["branding", "academic", "classes", "subjects", "modules"];
  const stepIndex = steps.indexOf(step);

  const finish = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/school/setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          themeColor,
          logo,
          motto: motto || undefined,
          academicYearName: yearName,
          academicYearStart: yearStart,
          academicYearEnd: yearEnd,
          terms: [
            { name: "Term 1", startDate: yearStart, endDate: `${yearName}-04-05` },
            { name: "Term 2", startDate: `${yearName}-04-29`, endDate: `${yearName}-08-02` },
            { name: "Term 3", startDate: `${yearName}-09-02`, endDate: yearEnd },
          ],
          classes: classes.filter((c) => c.name.trim()),
          subjects: subjects.filter((s) => s.name.trim() && s.code.trim()),
          ...modules,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Setup failed");
        return;
      }
      await update();
      router.push("/school-admin");
      router.refresh();
    } catch {
      setError("Setup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] flex flex-col">
      <header className="border-b border-[#E2E8F0] bg-white px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-[#006b2c] to-[#00873a] rounded-xl flex items-center justify-center">
            <span className="material-symbols-outlined icon-filled text-white text-[20px]">school</span>
          </div>
          <div>
            <Link href="/" className="font-extrabold text-[#006b2c]">MottiManager Setup</Link>
            <p className="text-xs text-[#545f73]">Step {stepIndex + 1} of {steps.length}</p>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl glass-card-elevated rounded-2xl p-6 sm:p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">{error}</div>
          )}

          {step === "branding" && (
            <>
              <h1 className="text-xl font-extrabold mb-1">School Branding</h1>
              <p className="text-sm text-[#545f73] mb-6">Customize how your school appears in the system.</p>
              <div className="space-y-4">
                <LogoUploadField value={logo} onChange={setLogo} />
                <ColorSelect
                  label="Theme Color"
                  value={themeColor}
                  onChange={setThemeColor}
                  hint="Choose the primary color for your school portal."
                />
                <div>
                  <label className="block text-sm font-semibold mb-1.5">School Motto (optional)</label>
                  <input value={motto} onChange={(e) => setMotto(e.target.value)} className="input-premium" placeholder="Excellence in Education" />
                </div>
              </div>
            </>
          )}

          {step === "academic" && (
            <>
              <h1 className="text-xl font-extrabold mb-1">Academic Year</h1>
              <p className="text-sm text-[#545f73] mb-6">Set your current academic calendar.</p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-1.5">Academic Year Name</label>
                  <input value={yearName} onChange={(e) => setYearName(e.target.value)} className="input-premium" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-semibold mb-1.5">Start Date</label>
                    <input type="date" value={yearStart} onChange={(e) => setYearStart(e.target.value)} className="input-premium" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1.5">End Date</label>
                    <input type="date" value={yearEnd} onChange={(e) => setYearEnd(e.target.value)} className="input-premium" />
                  </div>
                </div>
              </div>
            </>
          )}

          {step === "classes" && (
            <>
              <h1 className="text-xl font-extrabold mb-1">Classes & Streams</h1>
              <p className="text-sm text-[#545f73] mb-6">Add your classes. You can add more later in Settings.</p>
              <div className="space-y-2">
                {classes.map((cls, i) => (
                  <div key={i} className="grid grid-cols-2 gap-2">
                    <input value={cls.name} onChange={(e) => { const next = [...classes]; next[i] = { ...next[i], name: e.target.value }; setClasses(next); }} className="input-premium" placeholder="Grade 4" />
                    <input value={cls.section} onChange={(e) => { const next = [...classes]; next[i] = { ...next[i], section: e.target.value }; setClasses(next); }} className="input-premium" placeholder="Stream A" />
                  </div>
                ))}
                <button type="button" onClick={() => setClasses([...classes, { name: "", section: "A" }])} className="text-sm text-[#006b2c] font-semibold">+ Add class</button>
              </div>
            </>
          )}

          {step === "subjects" && (
            <>
              <h1 className="text-xl font-extrabold mb-1">Subjects</h1>
              <p className="text-sm text-[#545f73] mb-6">Define subjects taught at your school.</p>
              <div className="space-y-2">
                {subjects.map((sub, i) => (
                  <div key={i} className="grid grid-cols-2 gap-2">
                    <input value={sub.name} onChange={(e) => { const next = [...subjects]; next[i] = { ...next[i], name: e.target.value }; setSubjects(next); }} className="input-premium" placeholder="Mathematics" />
                    <input value={sub.code} onChange={(e) => { const next = [...subjects]; next[i] = { ...next[i], code: e.target.value }; setSubjects(next); }} className="input-premium" placeholder="MATH" />
                  </div>
                ))}
                <button type="button" onClick={() => setSubjects([...subjects, { name: "", code: "" }])} className="text-sm text-[#006b2c] font-semibold">+ Add subject</button>
              </div>
            </>
          )}

          {step === "modules" && (
            <>
              <h1 className="text-xl font-extrabold mb-1">Modules</h1>
              <p className="text-sm text-[#545f73] mb-6">Enable the features your school needs.</p>
              <div className="space-y-3">
                {(
                  [
                    ["cbeEnabled", "Competency-Based Education (CBE)"],
                    ["libraryEnabled", "Library"],
                    ["transportEnabled", "Transport"],
                    ["hostelEnabled", "Hostel / Boarding"],
                    ["smsEnabled", "SMS Notifications"],
                    ["whatsappEnabled", "WhatsApp Notifications"],
                    ["payrollEnabled", "Payroll"],
                  ] as const
                ).map(([key, label]) => (
                  <label key={key} className="flex items-center justify-between p-3 rounded-xl border border-[#E2E8F0] cursor-pointer">
                    <span className="text-sm font-medium">{label}</span>
                    <input type="checkbox" checked={modules[key]} onChange={(e) => setModules({ ...modules, [key]: e.target.checked })} className="w-4 h-4 accent-[#006b2c]" />
                  </label>
                ))}
              </div>
            </>
          )}

          <div className="flex justify-between mt-8 pt-6 border-t border-[#E2E8F0]">
            {stepIndex > 0 ? (
              <button type="button" onClick={() => setStep(steps[stepIndex - 1])} className="px-4 py-2 text-sm font-semibold text-[#545f73]">Back</button>
            ) : <div />}
            {stepIndex < steps.length - 1 ? (
              <button type="button" onClick={() => setStep(steps[stepIndex + 1])} className="btn-primary !w-auto px-6">Continue</button>
            ) : (
              <button type="button" onClick={finish} disabled={loading} className="btn-primary !w-auto px-6">{loading ? "Finishing..." : "Complete Setup"}</button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
