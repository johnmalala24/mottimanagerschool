export function formatKES(amount: number) {
  return `KES ${amount.toLocaleString("en-KE", { maximumFractionDigits: 0 })}`;
}

export function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString("en-KE", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatDateTime(date: Date | string) {
  return new Date(date).toLocaleString("en-KE", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function schoolLocation(school: {
  city?: string | null;
  state?: string | null;
  country?: string | null;
}) {
  const parts = [school.city, school.state, school.country].filter(Boolean);
  return parts.join(", ") || "—";
}

export function initials(name?: string | null) {
  if (!name) return "??";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
