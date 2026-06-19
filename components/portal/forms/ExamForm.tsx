"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type ClassOption = { id: string; name: string };
type SubjectOption = { id: string; name: string };

type ExamFormProps = {
  type: "create" | "update" | "delete";
  data?: any;
  classes: ClassOption[];
  subjects: SubjectOption[];
  onClose: () => void;
};

export default function ExamForm({ type, data, classes, subjects, onClose }: ExamFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    id: data?.id ?? "",
    name: data?.name ?? "",
    classId: data?.classId ?? classes[0]?.id ?? "",
    term: data?.term ?? "Term 1",
    academicYear: data?.academicYear ?? String(new Date().getFullYear()),
    maxMarks: data?.maxMarks ?? 100,
    status: data?.status ?? "DRAFT",
    subjectIds: data?.subjectIds ?? [] as string[],
  });

  const handleSubjectChange = (subjectId: string, checked: boolean) => {
    let ids = [...form.subjectIds];
    if (checked) {
      ids.push(subjectId);
    } else {
      ids = ids.filter((id) => id !== subjectId);
    }
    setForm({ ...form, subjectIds: ids });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let res;
      if (type === "delete") {
        res = await fetch(`/api/school/teacher/exams?id=${form.id}`, {
          method: "DELETE",
        });
      } else {
        res = await fetch("/api/school/teacher/exams", {
          method: type === "create" ? "POST" : "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      }

      const resData = await res.json();
      if (!res.ok) throw new Error(resData.error || "Failed to submit request");

      router.refresh();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (type === "delete") {
    return (
      <form onSubmit={handleSubmit} className="space-y-4 p-md">
        <h3 className="text-title-md font-bold text-error">Delete Exam</h3>
        <p className="text-secondary">Are you sure you want to delete the exam &ldquo;{form.name}&rdquo;? This action cannot be undone.</p>
        {error && <p className="text-sm text-error">{error}</p>}
        <div className="flex justify-end gap-sm pt-md">
          <button type="button" onClick={onClose} className="btn-secondary !w-auto">Cancel</button>
          <button type="submit" disabled={loading} className="btn-primary !bg-red-600 !w-auto">{loading ? "Deleting..." : "Delete"}</button>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-md p-md">
      <h3 className="text-title-md font-bold">{type === "create" ? "Add Exam" : "Edit Exam"}</h3>
      {error && <p className="text-sm text-error">{error}</p>}

      <div className="space-y-xs">
        <label className="text-label-sm text-secondary">Exam Name</label>
        <input
          className="input-premium"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="e.g. End of Term 2"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
        <div className="space-y-xs">
          <label className="text-label-sm text-secondary">Class</label>
          <select
            className="input-premium"
            value={form.classId}
            onChange={(e) => setForm({ ...form, classId: e.target.value })}
          >
            {classes.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div className="space-y-xs">
          <label className="text-label-sm text-secondary">Max Marks</label>
          <input
            type="number"
            className="input-premium"
            value={form.maxMarks}
            onChange={(e) => setForm({ ...form, maxMarks: parseInt(e.target.value) })}
            min={1}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
        <div className="space-y-xs">
          <label className="text-label-sm text-secondary">Term</label>
          <select
            className="input-premium"
            value={form.term}
            onChange={(e) => setForm({ ...form, term: e.target.value })}
          >
            <option value="Term 1">Term 1</option>
            <option value="Term 2">Term 2</option>
            <option value="Term 3">Term 3</option>
          </select>
        </div>

        <div className="space-y-xs">
          <label className="text-label-sm text-secondary">Academic Year</label>
          <input
            className="input-premium"
            value={form.academicYear}
            onChange={(e) => setForm({ ...form, academicYear: e.target.value })}
            placeholder="e.g. 2026"
            required
          />
        </div>
      </div>

      {type === "update" && (
        <div className="space-y-xs">
          <label className="text-label-sm text-secondary">Status</label>
          <select
            className="input-premium"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option value="DRAFT">Draft</option>
            <option value="OPEN">Open</option>
            <option value="CLOSED">Closed</option>
            <option value="PROCESSED">Processed</option>
            <option value="PUBLISHED">Published</option>
          </select>
        </div>
      )}

      <div className="space-y-xs">
        <label className="text-label-sm text-secondary">Subjects Included</label>
        <div className="grid grid-cols-2 gap-sm border border-outline-variant rounded-lg p-sm max-h-36 overflow-y-auto bg-surface-container-low">
          {subjects.map((s) => (
            <label key={s.id} className="flex items-center gap-xs text-sm cursor-pointer select-none">
              <input
                type="checkbox"
                checked={form.subjectIds.includes(s.id)}
                onChange={(e) => handleSubjectChange(s.id, e.target.checked)}
                className="accent-primary"
              />
              {s.name}
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-sm pt-md">
        <button type="button" onClick={onClose} className="btn-secondary !w-auto">Cancel</button>
        <button type="submit" disabled={loading} className="btn-primary !w-auto">{loading ? "Saving..." : "Save"}</button>
      </div>
    </form>
  );
}
