"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProfilePhotoUpload from "@/components/portal/ProfilePhotoUpload";

type ClassOption = { id: string; name: string; section?: string };
type StudentRow = {
  id: string;
  user: { name: string | null; image: string | null };
};

const STATUSES = ["Present", "Absent", "Late", "Leave"];

export function MarkAttendanceForm({ classes }: { classes: ClassOption[] }) {
  const router = useRouter();
  const [classId, setClassId] = useState(classes[0]?.id ?? "");
  const [students, setStudents] = useState<StudentRow[]>([]);
  const [statuses, setStatuses] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!classId) return;
    fetch(`/api/school/attendance?classId=${classId}`)
      .then((r) => r.json())
      .then((data) => {
        setStudents(data.students ?? []);
        const map: Record<string, string> = {};
        for (const s of data.students ?? []) {
          const existing = (data.attendance ?? []).find(
            (a: { studentId: string; status: string }) => a.studentId === s.id
          );
          map[s.id] = existing?.status ?? "Present";
        }
        setStatuses(map);
      })
      .catch(() => setError("Could not load students"));
  }, [classId]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const res = await fetch("/api/school/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          classId,
          records: students.map((s) => ({ studentId: s.id, status: statuses[s.id] ?? "Present" })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setMessage("Attendance saved.");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed");
    } finally {
      setLoading(false);
    }
  };

  if (classes.length === 0) return null;

  return (
    <form onSubmit={submit} className="tonal-card rounded-xl p-lg space-y-md mb-lg">
      <h3 className="text-title-md font-bold">Mark Today&apos;s Attendance</h3>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {message && <p className="text-sm text-green-700">{message}</p>}
      <select className="input-premium max-w-xs" value={classId} onChange={(e) => setClassId(e.target.value)}>
        {classes.map((c) => (
          <option key={c.id} value={c.id}>{c.name}{c.section ? ` ${c.section}` : ""}</option>
        ))}
      </select>
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {students.map((s) => (
          <div key={s.id} className="flex items-center justify-between gap-md py-2 border-b border-outline-variant">
            <span className="font-medium">{s.user.name}</span>
            <select
              className="input-premium !w-auto !py-1"
              value={statuses[s.id] ?? "Present"}
              onChange={(e) => setStatuses({ ...statuses, [s.id]: e.target.value })}
            >
              {STATUSES.map((st) => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>
        ))}
      </div>
      <button type="submit" disabled={loading || students.length === 0} className="btn-primary !w-auto px-6">
        {loading ? "Saving..." : "Save Attendance"}
      </button>
    </form>
  );
}

export function CreateAnnouncementForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [sendEmail, setSendEmail] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/school/announcements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, message, sendEmail }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setTitle("");
      setMessage("");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="tonal-card rounded-xl p-lg space-y-md mb-lg">
      <h3 className="text-title-md font-bold">New Announcement</h3>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <input className="input-premium" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <textarea className="input-premium min-h-24" placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} required />
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={sendEmail} onChange={(e) => setSendEmail(e.target.checked)} className="accent-primary" />
        Send email to parents, students & teachers
      </label>
      <button type="submit" disabled={loading} className="btn-primary !w-auto px-6">{loading ? "Sending..." : "Publish"}</button>
    </form>
  );
}

export function FinanceActionForm({
  students,
  invoices,
}: {
  students: { id: string; name: string }[];
  invoices: { id: string; invoiceNumber: string; studentId: string; balance: number }[];
}) {
  const router = useRouter();
  const [action, setAction] = useState("payment");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    studentId: students[0]?.id ?? "",
    invoiceId: invoices[0]?.id ?? "",
    amount: "",
    mode: "Cash",
    academicYear: String(new Date().getFullYear()),
    className: "",
    tuitionFee: "",
    dueDate: "",
    category: "",
    description: "",
    phone: "",
    transactionId: "",
  });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const payload: Record<string, unknown> = { action };
      if (action === "payment") {
        Object.assign(payload, {
          studentId: form.studentId,
          invoiceId: form.invoiceId || undefined,
          amount: parseFloat(form.amount),
          mode: form.mode,
          academicYear: form.academicYear,
        });
      } else if (action === "mpesa") {
        Object.assign(payload, {
          studentId: form.studentId,
          invoiceId: form.invoiceId || undefined,
          amount: parseFloat(form.amount),
          phone: form.phone,
          transactionId: form.transactionId,
          academicYear: form.academicYear,
          type: "MANUAL",
        });
      } else if (action === "fee-structure") {
        Object.assign(payload, {
          className: form.className,
          academicYear: form.academicYear,
          tuitionFee: parseFloat(form.tuitionFee),
        });
      } else if (action === "generate-invoices") {
        Object.assign(payload, { academicYear: form.academicYear, dueDate: form.dueDate });
      } else if (action === "expense") {
        Object.assign(payload, {
          category: form.category,
          amount: parseFloat(form.amount),
          description: form.description,
        });
      } else if (action === "mark-overdue") {
        // no extra fields
      }

      const res = await fetch("/api/school/finance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="tonal-card rounded-xl p-lg space-y-md mb-lg">
      <h3 className="text-title-md font-bold">Finance Actions</h3>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <select className="input-premium" value={action} onChange={(e) => setAction(e.target.value)}>
        <option value="payment">Record payment</option>
        <option value="mpesa">Record M-Pesa payment</option>
        <option value="fee-structure">Add fee structure</option>
        <option value="generate-invoices">Generate term invoices</option>
        <option value="expense">Record expense</option>
        <option value="mark-overdue">Mark overdue invoices</option>
      </select>

      {(action === "payment" || action === "mpesa") && (
        <>
          <select className="input-premium" value={form.studentId} onChange={(e) => setForm({ ...form, studentId: e.target.value })}>
            {students.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
          <select className="input-premium" value={form.invoiceId} onChange={(e) => setForm({ ...form, invoiceId: e.target.value })}>
            <option value="">No invoice link</option>
            {invoices.filter((i) => i.studentId === form.studentId).map((i) => (
              <option key={i.id} value={i.id}>{i.invoiceNumber} (KES {i.balance})</option>
            ))}
          </select>
          <input className="input-premium" type="number" placeholder="Amount (KES)" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} required />
          {action === "payment" && (
            <select className="input-premium" value={form.mode} onChange={(e) => setForm({ ...form, mode: e.target.value })}>
              {["Cash", "Cheque", "Bank Transfer", "M-Pesa"].map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          )}
          {action === "mpesa" && (
            <>
              <input className="input-premium" placeholder="Phone (+254...)" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              <input className="input-premium" placeholder="M-Pesa transaction ID" value={form.transactionId} onChange={(e) => setForm({ ...form, transactionId: e.target.value })} />
            </>
          )}
          <input className="input-premium" placeholder="Academic year" value={form.academicYear} onChange={(e) => setForm({ ...form, academicYear: e.target.value })} />
        </>
      )}

      {action === "fee-structure" && (
        <>
          <input className="input-premium" placeholder="Class name (e.g. Grade 4A)" value={form.className} onChange={(e) => setForm({ ...form, className: e.target.value })} required />
          <input className="input-premium" type="number" placeholder="Tuition fee (KES)" value={form.tuitionFee} onChange={(e) => setForm({ ...form, tuitionFee: e.target.value })} required />
          <input className="input-premium" placeholder="Academic year" value={form.academicYear} onChange={(e) => setForm({ ...form, academicYear: e.target.value })} />
        </>
      )}

      {action === "generate-invoices" && (
        <>
          <input className="input-premium" placeholder="Academic year" value={form.academicYear} onChange={(e) => setForm({ ...form, academicYear: e.target.value })} />
          <input type="date" className="input-premium" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} required />
        </>
      )}

      {action === "expense" && (
        <>
          <input className="input-premium" placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required />
          <input className="input-premium" type="number" placeholder="Amount" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} required />
          <input className="input-premium" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </>
      )}

      <button type="submit" disabled={loading} className="btn-primary !w-auto px-6">{loading ? "Processing..." : "Submit"}</button>
    </form>
  );
}

export function AdmissionActions({
  applications,
  classes,
}: {
  applications: { id: string; applicationNumber: string; studentName: string; status: string }[];
  classes: ClassOption[];
}) {
  const router = useRouter();
  const pending = applications.filter((a) => ["APPLIED", "UNDER_REVIEW"].includes(a.status));

  const updateStatus = async (admissionId: string, status: string) => {
    await fetch("/api/school/admissions", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ admissionId, status }),
    });
    router.refresh();
  };

  const admit = async (admissionId: string, classId: string) => {
    const res = await fetch(`/api/school/admissions/${admissionId}/admit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ classId }),
    });
    const data = await res.json();
    if (!res.ok) alert(data.error);
    else {
      alert(`Admitted: ${data.admissionNumber}`);
      router.refresh();
    }
  };

  if (pending.length === 0) return null;

  return (
    <div className="tonal-card rounded-xl p-lg mb-lg space-y-md">
      <h3 className="text-title-md font-bold">Pending Approvals</h3>
      {pending.map((app) => (
        <div key={app.id} className="flex flex-wrap items-center gap-sm justify-between border-b border-outline-variant pb-md">
          <div>
            <p className="font-semibold">{app.studentName}</p>
            <p className="text-sm text-secondary">{app.applicationNumber} · {app.status}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => updateStatus(app.id, "UNDER_REVIEW")} className="px-3 py-1.5 rounded-lg border text-sm">Review</button>
            <button type="button" onClick={() => updateStatus(app.id, "APPROVED")} className="px-3 py-1.5 rounded-lg bg-primary text-white text-sm">Approve</button>
            <button type="button" onClick={() => updateStatus(app.id, "REJECTED")} className="px-3 py-1.5 rounded-lg text-error border border-error text-sm">Reject</button>
            {classes[0] && (
              <select
                className="input-premium !w-auto !py-1 text-sm"
                defaultValue=""
                onChange={(e) => {
                  if (e.target.value) admit(app.id, e.target.value);
                }}
              >
                <option value="">Admit to class...</option>
                {classes.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export function OperationsQuickForm({ action }: { action: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<Record<string, string>>({
    academicYear: String(new Date().getFullYear()),
  });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/school/operations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, ...form, quantity: form.quantity ? parseInt(form.quantity, 10) : undefined, capacity: form.capacity ? parseInt(form.capacity, 10) : undefined, monthlyFee: form.monthlyFee ? parseFloat(form.monthlyFee) : undefined }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error);
      }
      setForm({});
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed");
    } finally {
      setLoading(false);
    }
  };

  const fields: Record<string, string[]> = {
    "visitor-checkin": ["name", "purpose", "phone"],
    "library-book": ["title", "author", "category", "quantity"],
    "transport-route": ["routeName", "routeNumber", "vehicleNumber", "driverName", "capacity", "monthlyFee"],
    hostel: ["name", "type", "capacity", "warden"],
    class: ["name", "section", "academicYear"],
    subject: ["name", "code"],
  };

  const labels = fields[action];
  if (!labels) return null;

  return (
    <form onSubmit={submit} className="tonal-card rounded-xl p-lg space-y-md mb-lg">
      <h3 className="text-title-md font-bold">Add New</h3>
      {labels.map((key) => (
        <input
          key={key}
          className="input-premium"
          placeholder={key.replace(/([A-Z])/g, " $1")}
          value={form[key] ?? ""}
          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
          required={!["purpose", "phone", "warden"].includes(key)}
        />
      ))}
      <button type="submit" disabled={loading} className="btn-primary !w-auto px-6">{loading ? "Saving..." : "Save"}</button>
    </form>
  );
}

export function AdminUserPhotoForm({
  users,
}: {
  users: { id: string; name: string | null; email: string; image: string | null; role: string }[];
}) {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState(users[0]?.id ?? "");
  const [image, setImage] = useState<string | null>(users[0]?.image ?? null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const u = users.find((x) => x.id === selectedId);
    setImage(u?.image ?? null);
  }, [selectedId, users]);

  const save = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/school/users/${selectedId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image }),
      });
      if (!res.ok) throw new Error((await res.json()).error);
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed");
    } finally {
      setLoading(false);
    }
  };

  if (users.length === 0) return null;

  return (
    <div className="tonal-card rounded-xl p-lg mb-lg space-y-md">
      <h3 className="text-title-md font-bold">Update User Photo</h3>
      <select className="input-premium" value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
        {users.map((u) => (
          <option key={u.id} value={u.id}>{u.name} ({u.role})</option>
        ))}
      </select>
      <ProfilePhotoUpload value={image} onChange={setImage} />
      <button type="button" onClick={save} disabled={loading} className="btn-primary !w-auto px-6">
        {loading ? "Saving..." : "Save photo"}
      </button>
    </div>
  );
}

export function EnterGradeForm({
  classes,
  subjects,
  students,
}: {
  classes: ClassOption[];
  subjects: { id: string; name: string }[];
  students: { id: string; name: string; classId: string }[];
}) {
  const router = useRouter();
  const [form, setForm] = useState({
    classId: classes[0]?.id ?? "",
    studentId: "",
    subjectId: subjects[0]?.id ?? "",
    examName: "Mid-Term",
    marks: "",
    gradePoint: "A",
    term: "Term 2",
    academicYear: String(new Date().getFullYear()),
  });
  const [loading, setLoading] = useState(false);

  const classStudents = students.filter((s) => s.classId === form.classId);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/school/academics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "grade",
          ...form,
          marks: parseFloat(form.marks),
        }),
      });
      if (!res.ok) throw new Error((await res.json()).error);
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="tonal-card rounded-xl p-lg space-y-md mb-lg">
      <h3 className="text-title-md font-bold">Enter Grade</h3>
      <select className="input-premium" value={form.classId} onChange={(e) => setForm({ ...form, classId: e.target.value })}>
        {classes.map((c) => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>
      <select className="input-premium" value={form.studentId} onChange={(e) => setForm({ ...form, studentId: e.target.value })} required>
        <option value="">Select student</option>
        {classStudents.map((s) => (
          <option key={s.id} value={s.id}>{s.name}</option>
        ))}
      </select>
      <select className="input-premium" value={form.subjectId} onChange={(e) => setForm({ ...form, subjectId: e.target.value })}>
        {subjects.map((s) => (
          <option key={s.id} value={s.id}>{s.name}</option>
        ))}
      </select>
      <input className="input-premium" placeholder="Exam name" value={form.examName} onChange={(e) => setForm({ ...form, examName: e.target.value })} />
      <input className="input-premium" type="number" placeholder="Marks" value={form.marks} onChange={(e) => setForm({ ...form, marks: e.target.value })} required />
      <button type="submit" disabled={loading} className="btn-primary !w-auto px-6">{loading ? "Saving..." : "Save Grade"}</button>
    </form>
  );
}

export function PublicApplicationForm({ schoolCode }: { schoolCode?: string }) {
  const [form, setForm] = useState({
    schoolCode: schoolCode ?? "",
    studentName: "",
    dateOfBirth: "",
    gender: "Male",
    fatherName: "",
    contactNumber: "",
    email: "",
    address: "",
    applyingForClass: "",
    previousSchool: "",
  });
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admissions/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setResult(data.applicationNumber);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="tonal-card rounded-xl p-lg space-y-md max-w-xl">
      <h3 className="text-title-md font-bold">Apply for Admission</h3>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result && <p className="text-sm text-green-700">Application submitted: <strong>{result}</strong></p>}
      {!schoolCode && (
        <input className="input-premium" placeholder="School code (e.g. GW)" value={form.schoolCode} onChange={(e) => setForm({ ...form, schoolCode: e.target.value })} required />
      )}
      <input className="input-premium" placeholder="Student full name" value={form.studentName} onChange={(e) => setForm({ ...form, studentName: e.target.value })} required />
      <input type="date" className="input-premium" value={form.dateOfBirth} onChange={(e) => setForm({ ...form, dateOfBirth: e.target.value })} required />
      <input className="input-premium" placeholder="Father / guardian name" value={form.fatherName} onChange={(e) => setForm({ ...form, fatherName: e.target.value })} required />
      <input className="input-premium" placeholder="Contact phone" value={form.contactNumber} onChange={(e) => setForm({ ...form, contactNumber: e.target.value })} required />
      <input className="input-premium" type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
      <input className="input-premium" placeholder="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} required />
      <input className="input-premium" placeholder="Applying for class" value={form.applyingForClass} onChange={(e) => setForm({ ...form, applyingForClass: e.target.value })} required />
      <button type="submit" disabled={loading} className="btn-primary !w-auto px-6">{loading ? "Submitting..." : "Submit Application"}</button>
    </form>
  );
}
