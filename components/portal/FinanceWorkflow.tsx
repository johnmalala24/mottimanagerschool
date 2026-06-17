"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function ManualMpesaForm({
  students,
  invoices,
}: {
  students: { id: string; name: string }[];
  invoices: { id: string; studentId: string; invoiceNumber: string; balance: number; academicYear: string }[];
}) {
  const router = useRouter();
  const [studentId, setStudentId] = useState(students[0]?.id ?? "");
  const [amount, setAmount] = useState("");
  const [phone, setPhone] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [type, setType] = useState<"MANUAL" | "STK_PUSH" | "C2B">("MANUAL");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const studentInvoices = invoices.filter((i) => i.studentId === studentId);
  const [invoiceId, setInvoiceId] = useState(studentInvoices[0]?.id ?? "");

  const onStudentChange = (id: string) => {
    setStudentId(id);
    const inv = invoices.find((i) => i.studentId === id);
    setInvoiceId(inv?.id ?? "");
    if (inv) setAmount(String(inv.balance));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const inv = invoices.find((i) => i.id === invoiceId);
      const res = await fetch("/api/school/finance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "mpesa",
          studentId,
          amount: Number(amount),
          phone: phone || undefined,
          transactionId: transactionId || undefined,
          type,
          invoiceId: invoiceId || undefined,
          academicYear: inv?.academicYear ?? new Date().getFullYear().toString(),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setSuccess("Payment recorded. Parent notified by email.");
      setTransactionId("");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="tonal-card rounded-xl p-lg space-y-md">
      <div className="flex items-center gap-sm mb-sm">
        <span className="material-symbols-outlined text-primary text-2xl">payments</span>
        <div>
          <h3 className="text-title-md font-bold">Record Manual Payment</h3>
          <p className="text-label-sm text-secondary">M-Pesa API not connected — record payments manually with receipt details.</p>
        </div>
      </div>

      {error && <p className="text-sm text-red-600 bg-error-container/30 px-md py-sm rounded-lg">{error}</p>}
      {success && <p className="text-sm text-green-700 bg-green-50 px-md py-sm rounded-lg">{success}</p>}

      <div className="grid sm:grid-cols-2 gap-md">
        <label className="block">
          <span className="text-label-sm font-semibold text-secondary">Student</span>
          <select className="input-premium mt-1" value={studentId} onChange={(e) => onStudentChange(e.target.value)} required>
            {students.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-label-sm font-semibold text-secondary">Invoice</span>
          <select className="input-premium mt-1" value={invoiceId} onChange={(e) => setInvoiceId(e.target.value)}>
            <option value="">No invoice</option>
            {studentInvoices.map((i) => (
              <option key={i.id} value={i.id}>{i.invoiceNumber} — KES {i.balance.toLocaleString()}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-label-sm font-semibold text-secondary">Amount (KES)</span>
          <input type="number" className="input-premium mt-1 mpesa-slot" value={amount} onChange={(e) => setAmount(e.target.value)} required min={1} />
        </label>
        <label className="block">
          <span className="text-label-sm font-semibold text-secondary">Payment Type</span>
          <select className="input-premium mt-1" value={type} onChange={(e) => setType(e.target.value as typeof type)}>
            <option value="MANUAL">Manual / Cash</option>
            <option value="STK_PUSH">M-Pesa STK (manual entry)</option>
            <option value="C2B">M-Pesa Paybill (manual entry)</option>
          </select>
        </label>
        <label className="block">
          <span className="text-label-sm font-semibold text-secondary">M-Pesa Phone</span>
          <input className="input-premium mt-1" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="254712345678" />
        </label>
        <label className="block">
          <span className="text-label-sm font-semibold text-secondary">Transaction / Receipt Code</span>
          <input className="input-premium mt-1" value={transactionId} onChange={(e) => setTransactionId(e.target.value)} placeholder="QAB1CD2EFG" />
        </label>
      </div>

      <button type="submit" disabled={loading} className="btn-primary !w-auto px-8">
        {loading ? "Recording..." : "Record Payment & Notify Parent"}
      </button>
    </form>
  );
}

export function SendRemindersButton() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const run = async () => {
    if (!window.confirm("Send fee reminder emails to all parents with overdue balances?")) return;
    setLoading(true);
    try {
      const res = await fetch("/api/school/automation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "fee-reminders" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setResult(`Sent ${data.emails} emails, ${data.notifications} in-app alerts for ${data.overdue} overdue accounts.`);
    } catch (err) {
      setResult(err instanceof Error ? err.message : "Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button type="button" onClick={run} disabled={loading} className="inline-flex items-center gap-xs px-lg py-sm rounded-lg border border-primary text-primary font-medium hover:bg-primary/5 transition-colors">
        <span className="material-symbols-outlined text-[18px]">mail</span>
        {loading ? "Sending..." : "Send Fee Reminders"}
      </button>
      {result && <p className="text-sm text-secondary mt-2">{result}</p>}
    </div>
  );
}

export function ExportDataPanel() {
  const types = [
    { type: "students", label: "Students", icon: "groups" },
    { type: "grades", label: "Grades", icon: "grade" },
    { type: "attendance", label: "Attendance", icon: "calendar_today" },
    { type: "fees", label: "Fees", icon: "payments" },
  ];

  return (
    <div className="grid sm:grid-cols-2 gap-md">
      {types.map((t) => (
        <a
          key={t.type}
          href={`/api/school/export?type=${t.type}`}
          className="tonal-card rounded-xl p-lg flex items-center gap-md hover:border-primary/40 transition-colors"
        >
          <span className="material-symbols-outlined text-primary text-2xl">{t.icon}</span>
          <div>
            <p className="font-bold">Export {t.label}</p>
            <p className="text-label-sm text-secondary">Download CSV spreadsheet</p>
          </div>
        </a>
      ))}
    </div>
  );
}

export function ImportStudentsForm() {
  const [csv, setCsv] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{ row: number; success: boolean; error?: string }[]>([]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/school/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "import-students", csv }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setResults(data.results ?? []);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Import failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="tonal-card rounded-xl p-lg space-y-md">
      <h3 className="text-title-md font-bold">Import Students (CSV)</h3>
      <p className="text-label-sm text-secondary">
        Columns: Name, Class, Guardian Name, Guardian Email, Phone (optional), Gender (optional)
      </p>
      <textarea
        className="input-premium min-h-[120px] font-mono text-sm"
        value={csv}
        onChange={(e) => setCsv(e.target.value)}
        placeholder="Name,Class,Guardian Name,Guardian Email&#10;John Doe,Grade 1,Jane Doe,jane@email.com"
      />
      <button type="submit" disabled={loading || !csv.trim()} className="btn-primary !w-auto px-8">
        {loading ? "Importing..." : "Import Students"}
      </button>
      {results.length > 0 && (
        <div className="text-sm space-y-1 max-h-40 overflow-y-auto">
          {results.map((r) => (
            <p key={r.row} className={r.success ? "text-green-700" : "text-red-600"}>
              Row {r.row}: {r.success ? "OK" : r.error}
            </p>
          ))}
        </div>
      )}
    </form>
  );
}
