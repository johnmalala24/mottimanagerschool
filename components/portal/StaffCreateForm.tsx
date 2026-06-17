"use client";

import { useEffect, useState } from "react";
import { STAFF_CREATABLE_ROLES } from "@/lib/roles";
import type { UserRole } from "@prisma/client";

export default function StaffCreateForm() {
  const [availableRoles, setAvailableRoles] = useState(STAFF_CREATABLE_ROLES);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "TEACHER",
    isClassTeacher: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [tempPassword, setTempPassword] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/school/settings")
      .then((r) => r.json())
      .then((data) => {
        const disabled: UserRole[] = data.settings?.disabledRoles ?? [];
        const roles = STAFF_CREATABLE_ROLES.filter((r) => !disabled.includes(r.value));
        setAvailableRoles(roles);
        if (roles.length > 0 && disabled.includes(form.role as UserRole)) {
          setForm((prev) => ({ ...prev, role: roles[0].value }));
        }
      })
      .catch(() => {});
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    setTempPassword(null);
    try {
      const res = await fetch("/api/school/staff", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to create staff");
        return;
      }
      setSuccess(`Created ${data.user.name} (${data.user.role})`);
      if (data.temporaryPassword) setTempPassword(data.temporaryPassword);
      setForm({ name: "", email: "", phone: "", role: "TEACHER", isClassTeacher: false });
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tonal-card rounded-xl p-lg mb-lg">
      <h3 className="text-title-md font-bold mb-md">Add Staff Member</h3>
      {availableRoles.length === 0 ? (
        <p className="text-sm text-secondary">All staff roles are currently disabled. Enable roles in Settings first.</p>
      ) : (
        <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-md">
          {error && <p className="md:col-span-2 text-sm text-red-600">{error}</p>}
          {success && <p className="md:col-span-2 text-sm text-green-700">{success}</p>}
          {tempPassword && (
            <p className="md:col-span-2 text-sm bg-green-50 border border-green-200 rounded-lg p-3">
              Temporary password: <strong>{tempPassword}</strong> — share securely with the staff member.
            </p>
          )}
          <input className="input-premium" placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <input className="input-premium" type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <input className="input-premium" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          <select className="input-premium" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
            {availableRoles.map((r) => (
              <option key={r.value} value={r.value}>{r.label}</option>
            ))}
          </select>
          {form.role === "TEACHER" && (
            <label className="md:col-span-2 flex items-center gap-2 text-sm font-medium">
              <input type="checkbox" checked={form.isClassTeacher} onChange={(e) => setForm({ ...form, isClassTeacher: e.target.checked })} className="accent-primary" />
              Also assign as Class Teacher (grants class-teacher portal access)
            </label>
          )}
          <button type="submit" disabled={loading} className="btn-primary md:col-span-2 !w-auto px-6">
            {loading ? "Creating..." : "Create Staff Account"}
          </button>
        </form>
      )}
    </div>
  );
}
