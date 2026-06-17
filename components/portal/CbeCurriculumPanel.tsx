"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CBE_LEVELS } from "@/lib/cbe-levels";

export function CbeCurriculumPanel({
  curriculum,
  students,
  defaultTerm,
  defaultYear,
}: {
  curriculum: {
    id: string;
    name: string;
    code: string;
    strands: { id: string; name: string; competencies: { id: string; name: string; code: string }[] }[];
  }[];
  students: { id: string; name: string }[];
  defaultTerm: string;
  defaultYear: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [studentId, setStudentId] = useState(students[0]?.id ?? "");
  const [learningArea, setLearningArea] = useState(curriculum[0]?.name ?? "");
  const [level, setLevel] = useState("ME");
  const [term, setTerm] = useState(defaultTerm);
  const [year, setYear] = useState(defaultYear);

  const seed = async () => {
    setLoading(true);
    await fetch("/api/school/cbe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "seed" }),
    });
    router.refresh();
    setLoading(false);
  };

  const assess = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/school/cbe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "assess", studentId, learningArea, level, term, academicYear: year }),
    });
    router.refresh();
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-lg">
      {curriculum.length === 0 && (
        <div className="tonal-card rounded-xl p-lg text-center">
          <p className="text-secondary mb-md">No CBE curriculum configured yet.</p>
          <button type="button" onClick={seed} disabled={loading} className="btn-primary !w-auto px-8">
            Load Default CBC Curriculum
          </button>
        </div>
      )}

      {curriculum.length > 0 && (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-md">
            {curriculum.map((area) => (
              <div key={area.id} className="tonal-card rounded-xl p-lg">
                <h3 className="font-bold text-primary">{area.name}</h3>
                <p className="text-label-sm text-secondary mb-sm">{area.code}</p>
                {area.strands.map((s) => (
                  <div key={s.id} className="text-sm py-1 border-t border-outline-variant/50">
                    <span className="font-medium">{s.name}</span>
                    <span className="text-secondary ml-2">({s.competencies.length} competencies)</span>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <form onSubmit={assess} className="tonal-card rounded-xl p-lg space-y-md">
            <h3 className="text-title-md font-bold">Assess Student Competency</h3>
            <div className="grid sm:grid-cols-2 gap-md">
              <select className="input-premium" value={studentId} onChange={(e) => setStudentId(e.target.value)}>
                {students.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
              <select className="input-premium" value={learningArea} onChange={(e) => setLearningArea(e.target.value)}>
                {curriculum.map((a) => <option key={a.id} value={a.name}>{a.name}</option>)}
              </select>
              <select className="input-premium" value={level} onChange={(e) => setLevel(e.target.value)}>
                {CBE_LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
              </select>
              <input className="input-premium" value={term} onChange={(e) => setTerm(e.target.value)} placeholder="Term" />
            </div>
            <button type="submit" disabled={loading} className="btn-primary !w-auto px-8">Save Assessment</button>
          </form>
        </>
      )}
    </div>
  );
}
