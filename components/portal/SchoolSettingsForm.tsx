"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { TOGGLEABLE_PORTAL_ROLES } from "@/lib/roles";
import type { UserRole } from "@prisma/client";
import ColorSelect from "@/components/portal/ColorSelect";
import LogoUploadField from "@/components/portal/LogoUploadField";
import { ACCENT_COLOR_PRESETS, BACKGROUND_COLOR_PRESETS, THEME_COLOR_PRESETS } from "@/lib/theme-colors";

type SettingsData = {
  themeColor: string;
  accentColor: string;
  dashboardBgColor: string;
  favicon: string | null;
  motto: string | null;
  logo: string | null;
  disabledRoles: UserRole[];
  cbeEnabled: boolean;
  smsEnabled: boolean;
  whatsappEnabled: boolean;
  transportEnabled: boolean;
  libraryEnabled: boolean;
  hostelEnabled: boolean;
  payrollEnabled: boolean;
  mpesaPaybill: string | null;
};

type SchoolSettingsFormProps = {
  initial: SettingsData;
};

export default function SchoolSettingsForm({ initial }: SchoolSettingsFormProps) {
  const router = useRouter();
  const { update } = useSession();
  const [form, setForm] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const toggleRole = (role: UserRole) => {
    setForm((prev) => ({
      ...prev,
      disabledRoles: prev.disabledRoles.includes(role)
        ? prev.disabledRoles.filter((r) => r !== role)
        : [...prev.disabledRoles, role],
    }));
  };

  const save = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/api/school/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to save settings");
        return;
      }
      setSuccess("Settings saved successfully. Portal theme and roles updated.");
      await update();
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-lg">
      {error && <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">{error}</p>}
      {success && <p className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg p-3">{success}</p>}

      {/* Branding */}
      <div className="tonal-card rounded-xl p-lg">
        <h3 className="text-title-md font-bold mb-1">Branding & Appearance</h3>
        <p className="text-label-sm text-secondary mb-md">Customize how your school portal looks for all users.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
          <ColorSelect
            label="Primary Theme Color"
            value={form.themeColor}
            onChange={(themeColor) => setForm({ ...form, themeColor })}
            presets={THEME_COLOR_PRESETS}
          />
          <ColorSelect
            label="Accent Color"
            value={form.accentColor}
            onChange={(accentColor) => setForm({ ...form, accentColor })}
            presets={ACCENT_COLOR_PRESETS}
          />
          <ColorSelect
            label="Dashboard Background"
            value={form.dashboardBgColor}
            onChange={(dashboardBgColor) => setForm({ ...form, dashboardBgColor })}
            presets={BACKGROUND_COLOR_PRESETS}
          />
          <label className="flex flex-col gap-1">
            <span className="text-label-sm font-semibold">School Motto</span>
            <input
              className="input-premium"
              placeholder="Excellence in Education"
              value={form.motto ?? ""}
              onChange={(e) => setForm({ ...form, motto: e.target.value || null })}
            />
          </label>
          <div className="md:col-span-2">
            <LogoUploadField
              value={form.logo}
              onChange={(logo) => setForm({ ...form, logo })}
            />
          </div>
          <label className="flex flex-col gap-1">
            <span className="text-label-sm font-semibold">Favicon URL</span>
            <input
              className="input-premium"
              placeholder="https://yourschool.ac.ke/favicon.ico"
              value={form.favicon ?? ""}
              onChange={(e) => setForm({ ...form, favicon: e.target.value || null })}
            />
          </label>
        </div>

        <div
          className="mt-md rounded-xl p-md border border-outline-variant flex items-center gap-md"
          style={{ backgroundColor: form.dashboardBgColor }}
        >
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold"
            style={{ backgroundColor: form.themeColor }}
          >
            {form.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={form.logo} alt="" className="w-full h-full object-cover rounded-xl" />
            ) : (
              "S"
            )}
          </div>
          <div>
            <p className="font-bold" style={{ color: form.themeColor }}>Live Preview</p>
            <p className="text-sm text-secondary">{form.motto || "Your school motto appears here"}</p>
          </div>
          <div className="ml-auto px-4 py-2 rounded-lg text-white text-sm font-semibold" style={{ backgroundColor: form.accentColor }}>
            Accent Button
          </div>
        </div>
      </div>

      {/* Role toggles */}
      <div className="tonal-card rounded-xl p-lg">
        <h3 className="text-title-md font-bold mb-1">Portal Roles</h3>
        <p className="text-label-sm text-secondary mb-md">
          Turn off roles your school does not need. Disabled roles cannot access their portal or be assigned to new staff.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-sm">
          {TOGGLEABLE_PORTAL_ROLES.map((role) => {
            const enabled = !form.disabledRoles.includes(role.value);
            return (
              <button
                key={role.value}
                type="button"
                onClick={() => toggleRole(role.value)}
                className={`flex items-center justify-between p-md rounded-xl border transition-all text-left ${
                  enabled
                    ? "border-primary/30 bg-primary/5"
                    : "border-outline-variant bg-surface-container-low opacity-70"
                }`}
              >
                <div>
                  <p className="font-semibold text-label-md">{role.label}</p>
                  <p className="text-label-sm text-secondary">{role.description}</p>
                </div>
                <span
                  className={`material-symbols-outlined text-[22px] ${
                    enabled ? "text-primary" : "text-secondary"
                  }`}
                >
                  {enabled ? "toggle_on" : "toggle_off"}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Feature modules */}
      <div className="tonal-card rounded-xl p-lg">
        <h3 className="text-title-md font-bold mb-1">Feature Modules</h3>
        <p className="text-label-sm text-secondary mb-md">Enable or disable optional modules for your school.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
          {(
            [
              ["cbeEnabled", "CBE / Competency-Based Education"],
              ["smsEnabled", "SMS Notifications"],
              ["whatsappEnabled", "WhatsApp Alerts"],
              ["transportEnabled", "Transport Module"],
              ["libraryEnabled", "Library Module"],
              ["hostelEnabled", "Hostel / Boarding"],
              ["payrollEnabled", "Payroll"],
            ] as const
          ).map(([key, label]) => (
            <label key={key} className="flex items-center justify-between p-sm rounded-lg border border-outline-variant">
              <span className="text-label-md font-medium">{label}</span>
              <input
                type="checkbox"
                checked={form[key]}
                onChange={(e) => setForm({ ...form, [key]: e.target.checked })}
                className="w-5 h-5 accent-primary"
              />
            </label>
          ))}
          <label className="flex flex-col gap-1 sm:col-span-2">
            <span className="text-label-sm font-semibold">M-Pesa Paybill Number</span>
            <input
              className="input-premium"
              placeholder="123456"
              value={form.mpesaPaybill ?? ""}
              onChange={(e) => setForm({ ...form, mpesaPaybill: e.target.value || null })}
            />
          </label>
        </div>
      </div>

      <button type="button" onClick={save} disabled={loading} className="btn-primary !w-auto px-8 self-start">
        {loading ? "Saving..." : "Save All Settings"}
      </button>
    </div>
  );
}
