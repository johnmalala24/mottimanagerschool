/** Kenyan-style letter grade from percentage marks */
export function marksToGradePoint(marks: number, maxMarks = 100): string {
  const pct = (marks / maxMarks) * 100;
  if (pct >= 80) return "A";
  if (pct >= 75) return "A-";
  if (pct >= 70) return "B+";
  if (pct >= 65) return "B";
  if (pct >= 60) return "B-";
  if (pct >= 55) return "C+";
  if (pct >= 50) return "C";
  if (pct >= 45) return "C-";
  if (pct >= 40) return "D+";
  if (pct >= 35) return "D";
  if (pct >= 30) return "D-";
  return "E";
}

export function computeMean(marks: (number | null | undefined)[]): number | null {
  const valid = marks.filter((m): m is number => m != null && !Number.isNaN(m));
  if (valid.length === 0) return null;
  return Math.round((valid.reduce((a, b) => a + b, 0) / valid.length) * 10) / 10;
}

export function rankStudents(
  totals: { studentId: string; total: number }[]
): Map<string, number> {
  const sorted = [...totals].sort((a, b) => b.total - a.total);
  const ranks = new Map<string, number>();
  let rank = 1;
  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i].total < sorted[i - 1].total) rank = i + 1;
    ranks.set(sorted[i].studentId, rank);
  }
  return ranks;
}

export const CBE_LEVELS = ["EE", "ME", "AE", "BE"] as const;
export type CbeLevel = (typeof CBE_LEVELS)[number];

export function cbeLevelLabel(level: string): string {
  const map: Record<string, string> = {
    EE: "Exceeding Expectations",
    ME: "Meeting Expectations",
    AE: "Approaching Expectations",
    BE: "Below Expectations",
  };
  return map[level] ?? level;
}
