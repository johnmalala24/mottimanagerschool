"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import StatusBadge, { statusVariant } from "@/components/portal/StatusBadge";

type Exam = {
  id: string;
  name: string;
  term: string;
  academicYear: string;
  maxMarks: number;
  status: string;
  class: { name: string; section: string };
  _count: { grades: number };
};

const STATUS_STEPS = ["DRAFT", "OPEN", "CLOSED", "PROCESSED", "PUBLISHED"];

export function ExamListPanel({ exams }: { exams: Exam[] }) {
  if (exams.length === 0) {
    return (
      <div className="tonal-card rounded-xl p-xl text-center">
        <span className="material-symbols-outlined text-4xl text-secondary mb-md block">analytics</span>
        <p className="text-secondary">No exams yet. Create your first exam to get started.</p>
      </div>
    );
  }

  return (
    <div className="space-y-md">
      {exams.map((exam) => (
        <a
          key={exam.id}
          href={`/school-admin/exams/${exam.id}`}
          className="tonal-card rounded-xl p-lg flex flex-col sm:flex-row sm:items-center justify-between gap-md hover:border-primary/40 transition-colors block"
        >
          <div>
            <h3 className="text-title-md font-bold">{exam.name}</h3>
            <p className="text-label-sm text-secondary mt-1">
              {exam.class.name}{exam.class.section ? ` ${exam.class.section}` : ""} · {exam.term} · {exam.academicYear}
            </p>
            <p className="text-label-sm text-secondary">{exam._count.grades} marks entered · Max {exam.maxMarks}</p>
          </div>
          <div className="flex items-center gap-md">
            <ExamProgress status={exam.status} />
            <StatusBadge label={exam.status} variant={statusVariant(exam.status)} />
          </div>
        </a>
      ))}
    </div>
  );
}

function ExamProgress({ status }: { status: string }) {
  const idx = STATUS_STEPS.indexOf(status);
  return (
    <div className="flex gap-1">
      {STATUS_STEPS.map((s, i) => (
        <div
          key={s}
          className={`progress-step w-8 ${i <= idx ? "bg-primary" : "bg-outline-variant/40"}`}
          title={s}
        />
      ))}
    </div>
  );
}

export function CreateExamForm({
  classes,
  subjects,
  defaultYear,
}: {
  classes: { id: string; name: string; section: string }[];
  subjects: { id: string; name: string; code: string }[];
  defaultYear: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [classId, setClassId] = useState(classes[0]?.id ?? "");
  const [term, setTerm] = useState("Term 1");
  const [academicYear, setAcademicYear] = useState(defaultYear);
  const [maxMarks, setMaxMarks] = useState(100);
  const [subjectIds, setSubjectIds] = useState<string[]>(subjects.slice(0, 3).map((s) => s.id));

  const toggleSubject = (id: string) => {
    setSubjectIds((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/school/exams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, classId, term, academicYear, maxMarks, subjectIds }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      router.push(`/school-admin/exams/${data.exam.id}`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="tonal-card rounded-xl p-lg space-y-md">
      <h3 className="text-title-md font-bold flex items-center gap-sm">
        <span className="material-symbols-outlined text-primary">add_circle</span>
        Create New Exam
      </h3>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="grid sm:grid-cols-2 gap-md">
        <label className="block">
          <span className="text-label-sm font-semibold text-secondary">Exam Name</span>
          <input className="input-premium mt-1" value={name} onChange={(e) => setName(e.target.value)} placeholder="Mid-Term Exam" required />
        </label>
        <label className="block">
          <span className="text-label-sm font-semibold text-secondary">Class</span>
          <select className="input-premium mt-1" value={classId} onChange={(e) => setClassId(e.target.value)}>
            {classes.map((c) => (
              <option key={c.id} value={c.id}>{c.name}{c.section ? ` ${c.section}` : ""}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-label-sm font-semibold text-secondary">Term</span>
          <select className="input-premium mt-1" value={term} onChange={(e) => setTerm(e.target.value)}>
            {["Term 1", "Term 2", "Term 3"].map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-label-sm font-semibold text-secondary">Academic Year</span>
          <input className="input-premium mt-1" value={academicYear} onChange={(e) => setAcademicYear(e.target.value)} required />
        </label>
        <label className="block">
          <span className="text-label-sm font-semibold text-secondary">Max Marks</span>
          <input type="number" className="input-premium mt-1" value={maxMarks} onChange={(e) => setMaxMarks(Number(e.target.value))} min={1} />
        </label>
      </div>
      <div>
        <span className="text-label-sm font-semibold text-secondary">Subjects</span>
        <div className="flex flex-wrap gap-sm mt-2">
          {subjects.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => toggleSubject(s.id)}
              className={`px-md py-sm rounded-lg text-label-sm font-medium border transition-colors ${
                subjectIds.includes(s.id)
                  ? "bg-primary text-on-primary border-primary"
                  : "bg-white border-outline-variant text-secondary hover:border-primary/40"
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>
      </div>
      <button type="submit" disabled={loading || !name || subjectIds.length === 0} className="btn-primary !w-auto px-8">
        {loading ? "Creating..." : "Create Exam"}
      </button>
    </form>
  );
}

export function ExamMarksGrid({
  examId,
  examStatus,
  maxMarks,
  subjects,
  students,
  initialGrades,
}: {
  examId: string;
  examStatus: string;
  maxMarks: number;
  subjects: { id: string; name: string }[];
  students: { id: string; user: { name: string | null } }[];
  initialGrades: Record<string, { marks?: number | null; teacherComment?: string | null }>;
}) {
  const router = useRouter();
  const [marks, setMarks] = useState<Record<string, string>>(() => {
    const m: Record<string, string> = {};
    for (const s of students) {
      for (const sub of subjects) {
        const key = `${s.id}:${sub.id}`;
        const g = initialGrades[key];
        if (g?.marks != null) m[key] = String(g.marks);
      }
    }
    return m;
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const canEdit = examStatus === "OPEN";

  const save = async () => {
    setLoading(true);
    setError("");
    setMessage("");
    const payload = [];
    for (const s of students) {
      for (const sub of subjects) {
        const key = `${s.id}:${sub.id}`;
        const val = marks[key];
        if (val !== undefined && val !== "") {
          payload.push({ studentId: s.id, subjectId: sub.id, marks: Number(val) });
        }
      }
    }
    try {
      const res = await fetch("/api/school/exams", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ examId, action: "marks", marks: payload }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setMessage(`${data.grades?.length ?? payload.length} marks saved.`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed");
    } finally {
      setLoading(false);
    }
  };

  if (!canEdit) {
    return (
      <p className="text-secondary text-sm mb-md">
        Marks entry is closed. Change exam status to OPEN to edit marks.
      </p>
    );
  }

  return (
    <div className="space-y-md">
      {error && <p className="text-sm text-red-600">{error}</p>}
      {message && <p className="text-sm text-green-700">{message}</p>}
      <div className="tonal-card rounded-xl overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead className="bg-surface-container-low">
            <tr>
              <th className="text-left px-md py-sm text-label-sm font-bold text-secondary sticky left-0 bg-surface-container-low">Student</th>
              {subjects.map((sub) => (
                <th key={sub.id} className="text-center px-sm py-sm text-label-sm font-bold text-secondary whitespace-nowrap">{sub.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id} className="border-t border-outline-variant">
                <td className="px-md py-sm font-medium sticky left-0 bg-white whitespace-nowrap">{s.user.name}</td>
                {subjects.map((sub) => {
                  const key = `${s.id}:${sub.id}`;
                  return (
                    <td key={sub.id} className="px-sm py-sm text-center">
                      <input
                        type="number"
                        min={0}
                        max={maxMarks}
                        className="input-premium !w-16 !py-1 text-center mx-auto"
                        value={marks[key] ?? ""}
                        onChange={(e) => setMarks({ ...marks, [key]: e.target.value })}
                        placeholder="—"
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button type="button" onClick={save} disabled={loading} className="btn-primary !w-auto px-8">
        {loading ? "Saving..." : "Save All Marks"}
      </button>
    </div>
  );
}

export function ExamActions({ examId, status }: { examId: string; status: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const act = async (action: string, extra?: Record<string, unknown>) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/school/exams", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ examId, action, ...extra }),
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

  const actions: { label: string; action: string; status?: string; variant?: string; confirm?: string }[] = [];
  if (status === "DRAFT") actions.push({ label: "Open for Entry", action: "status", status: "OPEN", variant: "primary" });
  if (status === "OPEN") {
    actions.push({ label: "Close Entry", action: "status", status: "CLOSED", variant: "secondary" });
  }
  if (status === "CLOSED") actions.push({ label: "Process Results", action: "process", variant: "primary" });
  if (status === "PROCESSED") actions.push({ label: "Publish to Parents", action: "publish", variant: "primary", confirm: "Publish results? Parents will be notified by email." });

  return (
    <div className="flex flex-wrap gap-sm items-center">
      {error && <p className="text-sm text-red-600 w-full">{error}</p>}
      {actions.map((a) => (
        <button
          key={a.label}
          type="button"
          disabled={loading}
          onClick={() => {
            if (a.confirm && !window.confirm(a.confirm)) return;
            act(a.action, a.status ? { status: a.status } : undefined);
          }}
          className={a.variant === "primary" ? "btn-primary !w-auto px-6" : "inline-flex items-center px-6 py-sm rounded-lg border border-outline-variant font-medium text-secondary hover:bg-surface-container transition-colors"}
        >
          {a.label}
        </button>
      ))}
    </div>
  );
}
