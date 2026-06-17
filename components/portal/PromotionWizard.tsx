"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type ClassOption = { id: string; name: string; section: string };

export default function PromotionWizard({
  classes,
  currentYear,
}: {
  classes: ClassOption[];
  currentYear: string;
}) {
  const router = useRouter();
  const [toYear, setToYear] = useState(String(Number(currentYear) + 1));
  const [mappings, setMappings] = useState<
    { fromClassId: string; toClassId: string; action: "promote" | "repeat" | "graduate" }[]
  >(
    classes.map((c) => ({
      fromClassId: c.id,
      toClassId: classes[classes.indexOf(c) + 1]?.id ?? c.id,
      action: "promote" as const,
    }))
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState("");

  const updateMapping = (idx: number, field: string, value: string) => {
    setMappings((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], [field]: value };
      return next;
    });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!window.confirm("Run end-of-year promotion? This will move students to new classes.")) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/school/promotion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fromAcademicYear: currentYear,
          toAcademicYear: toYear,
          mappings,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setResult(`${data.promoted} promoted, ${data.repeated} repeated, ${data.graduated} graduated.`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="tonal-card rounded-xl p-lg space-y-md">
      <h3 className="text-title-md font-bold">End-of-Year Promotion</h3>
      <p className="text-label-sm text-secondary">
        Promote students to the next class, repeat, or graduate. All staff will be notified in-app.
      </p>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result && <p className="text-sm text-green-700">{result}</p>}

      <div className="grid sm:grid-cols-2 gap-md">
        <label className="block">
          <span className="text-label-sm font-semibold text-secondary">From Year</span>
          <input className="input-premium mt-1" value={currentYear} readOnly />
        </label>
        <label className="block">
          <span className="text-label-sm font-semibold text-secondary">To Year</span>
          <input className="input-premium mt-1" value={toYear} onChange={(e) => setToYear(e.target.value)} required />
        </label>
      </div>

      <div className="space-y-sm">
        {classes.map((c, i) => (
          <div key={c.id} className="flex flex-wrap items-center gap-md py-sm border-b border-outline-variant">
            <span className="font-medium min-w-[120px]">{c.name}{c.section ? ` ${c.section}` : ""}</span>
            <select
              className="input-premium !w-auto"
              value={mappings[i]?.action ?? "promote"}
              onChange={(e) => updateMapping(i, "action", e.target.value)}
            >
              <option value="promote">Promote</option>
              <option value="repeat">Repeat</option>
              <option value="graduate">Graduate</option>
            </select>
            {mappings[i]?.action === "promote" && (
              <select
                className="input-premium !w-auto"
                value={mappings[i]?.toClassId ?? ""}
                onChange={(e) => updateMapping(i, "toClassId", e.target.value)}
              >
                {classes.map((tc) => (
                  <option key={tc.id} value={tc.id}>{tc.name}{tc.section ? ` ${tc.section}` : ""}</option>
                ))}
              </select>
            )}
          </div>
        ))}
      </div>

      <button type="submit" disabled={loading} className="btn-primary !w-auto px-8">
        {loading ? "Processing..." : "Run Promotion"}
      </button>
    </form>
  );
}
