import { prisma } from "@/lib/prisma";

function escapeCsv(val: string | number | null | undefined): string {
  const s = String(val ?? "");
  if (s.includes(",") || s.includes('"') || s.includes("\n")) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

export function toCsv(headers: string[], rows: (string | number | null | undefined)[][]): string {
  const lines = [headers.map(escapeCsv).join(",")];
  for (const row of rows) {
    lines.push(row.map(escapeCsv).join(","));
  }
  return lines.join("\n");
}

export async function exportStudentsCsv(schoolId: string) {
  const students = await prisma.student.findMany({
    where: { schoolId },
    include: {
      user: { select: { name: true, email: true, phone: true } },
      class: { select: { name: true, section: true } },
      parent: { include: { user: { select: { name: true, email: true, phone: true } } } },
    },
    orderBy: { registrationNumber: "asc" },
  });

  const headers = [
    "Admission No",
    "Name",
    "Class",
    "Gender",
    "Status",
    "Guardian",
    "Guardian Email",
    "Guardian Phone",
  ];
  const rows = students.map((s) => [
    s.registrationNumber,
    s.user.name,
    `${s.class.name}${s.class.section ? ` ${s.class.section}` : ""}`,
    s.gender,
    s.status,
    s.parent?.user.name ?? s.guardianName,
    s.parent?.user.email,
    s.parent?.user.phone ?? s.guardianPhone,
  ]);

  return toCsv(headers, rows);
}

export async function exportGradesCsv(schoolId: string, academicYear?: string) {
  const grades = await prisma.grade.findMany({
    where: { schoolId, ...(academicYear ? { academicYear } : {}) },
    include: {
      student: { include: { user: { select: { name: true } }, class: { select: { name: true } } } },
      subject: { select: { name: true } },
    },
    orderBy: [{ academicYear: "desc" }, { examName: "asc" }],
  });

  const headers = ["Student", "Class", "Subject", "Exam", "Marks", "Grade", "Term", "Year", "Position"];
  const rows = grades.map((g) => [
    g.student.user.name,
    g.student.class.name,
    g.subject.name,
    g.examName,
    g.marks,
    g.gradePoint,
    g.term,
    g.academicYear,
    g.position,
  ]);

  return toCsv(headers, rows);
}

export async function exportAttendanceCsv(schoolId: string, days = 30) {
  const since = new Date();
  since.setDate(since.getDate() - days);

  const records = await prisma.attendance.findMany({
    where: { schoolId, date: { gte: since } },
    include: {
      student: { include: { user: { select: { name: true } }, class: true } },
    },
    orderBy: { date: "desc" },
  });

  const headers = ["Date", "Student", "Class", "Status", "Remarks"];
  const rows = records.map((r) => [
    r.date.toISOString().slice(0, 10),
    r.student.user.name,
    r.student.class.name,
    r.status,
    r.remarks,
  ]);

  return toCsv(headers, rows);
}

export async function exportFeesCsv(schoolId: string) {
  const invoices = await prisma.feeInvoice.findMany({
    where: { schoolId },
    include: {
      student: { include: { user: { select: { name: true } }, class: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  const headers = ["Invoice", "Student", "Class", "Amount", "Paid", "Balance", "Status", "Due Date"];
  const rows = invoices.map((i) => [
    i.invoiceNumber,
    i.student.user.name,
    i.student.class.name,
    i.amount,
    i.paidAmount,
    i.balance,
    i.status,
    i.dueDate.toISOString().slice(0, 10),
  ]);

  return toCsv(headers, rows);
}

type ImportStudentRow = {
  fullName: string;
  className: string;
  gender?: string;
  guardianName: string;
  guardianEmail: string;
  guardianPhone?: string;
};

export async function importStudentsCsv(
  schoolId: string,
  rows: ImportStudentRow[],
  admitFn: (schoolId: string, input: import("@/lib/server/school-register").AdmitStudentInput) => Promise<unknown>
) {
  const classes = await prisma.class.findMany({ where: { schoolId } });
  const results: { row: number; success: boolean; error?: string }[] = [];

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const cls = classes.find(
      (c) => c.name === row.className || `${c.name} ${c.section}` === row.className
    );
    if (!cls) {
      results.push({ row: i + 1, success: false, error: `Class "${row.className}" not found` });
      continue;
    }
    try {
      await admitFn(schoolId, {
        fullName: row.fullName,
        classId: cls.id,
        gender: row.gender,
        guardianName: row.guardianName,
        guardianEmail: row.guardianEmail,
        guardianPhone: row.guardianPhone,
      });
      results.push({ row: i + 1, success: true });
    } catch (err) {
      results.push({
        row: i + 1,
        success: false,
        error: err instanceof Error ? err.message : "Failed",
      });
    }
  }

  return results;
}

export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let current = "";
  let inQuotes = false;
  let row: string[] = [];

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        current += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ",") {
      row.push(current.trim());
      current = "";
    } else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && text[i + 1] === "\n") i++;
      row.push(current.trim());
      if (row.some((c) => c)) rows.push(row);
      row = [];
      current = "";
    } else {
      current += ch;
    }
  }
  if (current || row.length) {
    row.push(current.trim());
    if (row.some((c) => c)) rows.push(row);
  }
  return rows;
}
