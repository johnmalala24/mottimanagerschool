"use client";

import { useState } from "react";

type ClassOption = { id: string; name: string; section: string };

export default function AdmitStudentForm({ classes }: { classes: ClassOption[] }) {
  const [form, setForm] = useState({
    fullName: "",
    dateOfBirth: "",
    gender: "",
    classId: classes[0]?.id ?? "",
    guardianName: "",
    guardianEmail: "",
    guardianPhone: "",
    relationship: "Guardian",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<Record<string, string> | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch("/api/school/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Admission failed");
        return;
      }
      setResult(data);
      setForm({
        fullName: "",
        dateOfBirth: "",
        gender: "",
        classId: classes[0]?.id ?? "",
        guardianName: "",
        guardianEmail: "",
        guardianPhone: "",
        relationship: "Guardian",
      });
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (classes.length === 0) {
    return <p className="text-secondary">No classes configured. Complete school setup first.</p>;
  }

  return (
    <form onSubmit={submit} className="tonal-card rounded-xl p-lg space-y-md max-w-2xl">
      <h3 className="text-title-md font-bold">Register New Student</h3>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result && (
        <div className="text-sm bg-green-50 border border-green-200 rounded-lg p-4 space-y-1">
          <p><strong>Admission #:</strong> {result.admissionNumber}</p>
          <p><strong>Parent email:</strong> {result.parentEmail}</p>
          {result.parentTemporaryPassword && <p><strong>Parent temp password:</strong> {result.parentTemporaryPassword}</p>}
          <p><strong>Student email:</strong> {result.studentEmail}</p>
          <p><strong>Student temp password:</strong> {result.studentTemporaryPassword}</p>
        </div>
      )}
      <input className="input-premium" placeholder="Student full name" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} required />
      <div className="grid grid-cols-2 gap-md">
        <input type="date" className="input-premium" value={form.dateOfBirth} onChange={(e) => setForm({ ...form, dateOfBirth: e.target.value })} />
        <select className="input-premium" value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })}>
          <option value="">Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
      <select className="input-premium" value={form.classId} onChange={(e) => setForm({ ...form, classId: e.target.value })} required>
        {classes.map((c) => (
          <option key={c.id} value={c.id}>{c.name} — Stream {c.section}</option>
        ))}
      </select>
      <input className="input-premium" placeholder="Guardian name" value={form.guardianName} onChange={(e) => setForm({ ...form, guardianName: e.target.value })} required />
      <input className="input-premium" type="email" placeholder="Guardian email" value={form.guardianEmail} onChange={(e) => setForm({ ...form, guardianEmail: e.target.value })} required />
      <input className="input-premium" placeholder="Guardian phone" value={form.guardianPhone} onChange={(e) => setForm({ ...form, guardianPhone: e.target.value })} />
      <button type="submit" disabled={loading} className="btn-primary !w-auto px-6">{loading ? "Registering..." : "Admit Student"}</button>
    </form>
  );
}
