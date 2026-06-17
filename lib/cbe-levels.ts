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
