"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type ClassOption = { id: string; name: string };
type SubjectOption = { id: string; name: string };

type AssignmentFormProps = {
  type: "create" | "update" | "delete";
  data?: any;
  classes: ClassOption[];
  subjects: SubjectOption[];
  onClose: () => void;
};

export default function AssignmentForm({ type, data, classes, subjects, onClose }: AssignmentFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    id: data?.id ?? "",
    title: data?.title ?? "",
    description: data?.description ?? "",
    classId: data?.classId ?? classes[0]?.id ?? "",
    subjectId: data?.subjectId ?? subjects[0]?.id ?? "",
    dueDate: data?.dueDate ? new Date(data.dueDate).toISOString().slice(0, 16) : "",
    maxScore: data?.maxScore ?? 100,
    status: data?.status ?? "Open",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let res;
      if (type === "delete") {
        res = await fetch(`/api/school/teacher/assignments?id=${form.id}`, {
          method: "DELETE",
        });
      } else {
        res = await fetch("/api/school/teacher/assignments", {
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
        <h3 className="text-title-md font-bold text-error">Delete Assignment</h3>
        <p className="text-secondary">Are you sure you want to delete the assignment &ldquo;{form.title}&rdquo;? This action cannot be undone.</p>
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
      <h3 className="text-title-md font-bold">{type === "create" ? "Add Assignment" : "Edit Assignment"}</h3>
      {error && <p className="text-sm text-error">{error}</p>}
      
      <div className="space-y-xs">
        <label className="text-label-sm text-secondary">Title</label>
        <input
          className="input-premium"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Assignment title"
          required
        />
      </div>

      <div className="space-y-xs">
        <label className="text-label-sm text-secondary">Description</label>
        <textarea
          className="input-premium min-h-20"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Instructions or details..."
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
          <label className="text-label-sm text-secondary">Subject</label>
          <select
            className="input-premium"
            value={form.subjectId}
            onChange={(e) => setForm({ ...form, subjectId: e.target.value })}
          >
            {subjects.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
        <div className="space-y-xs">
          <label className="text-label-sm text-secondary">Due Date</label>
          <input
            type="datetime-local"
            className="input-premium"
            value={form.dueDate}
            onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
          />
        </div>

        <div className="space-y-xs">
          <label className="text-label-sm text-secondary">Max Marks</label>
          <input
            type="number"
            className="input-premium"
            value={form.maxScore}
            onChange={(e) => setForm({ ...form, maxScore: parseInt(e.target.value) })}
            min={1}
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
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
      )}

      <div className="flex justify-end gap-sm pt-md">
        <button type="button" onClick={onClose} className="btn-secondary !w-auto">Cancel</button>
        <button type="submit" disabled={loading} className="btn-primary !w-auto">{loading ? "Saving..." : "Save"}</button>
      </div>
    </form>
  );
}
