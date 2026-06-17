"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function SubmitAssignmentForm({ assignmentId, title }: { assignmentId: string; title: string }) {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/school/assignments/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assignmentId, content }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setMessage("Assignment submitted successfully!");
      router.refresh();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="tonal-card rounded-xl p-lg space-y-md mt-md">
      <h4 className="font-bold">{title}</h4>
      <textarea
        className="input-premium min-h-[100px]"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your answer or paste a link to your work..."
        required
      />
      <button type="submit" disabled={loading} className="btn-primary !w-auto px-6">
        {loading ? "Submitting..." : "Submit Assignment"}
      </button>
      {message && <p className="text-sm text-secondary">{message}</p>}
    </form>
  );
}

export function GradeSubmissionForm({
  submissionId,
  maxScore,
  studentName,
}: {
  submissionId: string;
  maxScore: number;
  studentName: string;
}) {
  const router = useRouter();
  const [score, setScore] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/school/assignments/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "grade", submissionId, score: Number(score), feedback }),
    });
    router.refresh();
    setLoading(false);
  };

  return (
    <form onSubmit={submit} className="flex flex-wrap items-end gap-sm mt-2">
      <span className="text-sm font-medium w-full">{studentName}</span>
      <input type="number" min={0} max={maxScore} className="input-premium !w-20" value={score} onChange={(e) => setScore(e.target.value)} placeholder="Score" required />
      <input className="input-premium flex-1 min-w-[120px]" value={feedback} onChange={(e) => setFeedback(e.target.value)} placeholder="Feedback" />
      <button type="submit" disabled={loading} className="btn-primary !w-auto !py-2 px-4 text-sm">{loading ? "..." : "Grade"}</button>
    </form>
  );
}
