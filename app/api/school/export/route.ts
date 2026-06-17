import { NextRequest, NextResponse } from "next/server";
import { requireSchoolOpsStaff } from "@/lib/server/permissions";
import {
  exportStudentsCsv,
  exportGradesCsv,
  exportAttendanceCsv,
  exportFeesCsv,
  parseCsv,
  importStudentsCsv,
} from "@/lib/server/import-export";
import { admitStudent } from "@/lib/server/school-register";

export async function GET(request: NextRequest) {
  try {
    const user = await requireSchoolOpsStaff();
    const type = request.nextUrl.searchParams.get("type") ?? "students";
    const schoolId = user.schoolId!;
    const year = request.nextUrl.searchParams.get("year") ?? undefined;

    let csv: string;
    let filename: string;

    switch (type) {
      case "grades":
        csv = await exportGradesCsv(schoolId, year);
        filename = "grades-export.csv";
        break;
      case "attendance":
        csv = await exportAttendanceCsv(schoolId);
        filename = "attendance-export.csv";
        break;
      case "fees":
        csv = await exportFeesCsv(schoolId);
        filename = "fees-export.csv";
        break;
      default:
        csv = await exportStudentsCsv(schoolId);
        filename = "students-export.csv";
    }

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Export failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireSchoolOpsStaff();
    const body = await request.json();
    const schoolId = user.schoolId!;

    if (body.action === "import-students") {
      const rows = parseCsv(body.csv as string);
      if (rows.length < 2) throw new Error("CSV must have a header row and at least one data row");

      const headers = rows[0].map((h) => h.toLowerCase());
      const nameIdx = headers.findIndex((h) => h.includes("name") && !h.includes("guardian"));
      const classIdx = headers.findIndex((h) => h.includes("class"));
      const guardianIdx = headers.findIndex((h) => h.includes("guardian") && h.includes("name"));
      const emailIdx = headers.findIndex((h) => h.includes("email"));
      const phoneIdx = headers.findIndex((h) => h.includes("phone"));
      const genderIdx = headers.findIndex((h) => h.includes("gender"));

      const parsed = rows.slice(1).map((row) => ({
        fullName: row[nameIdx >= 0 ? nameIdx : 0] ?? "",
        className: row[classIdx >= 0 ? classIdx : 1] ?? "",
        gender: genderIdx >= 0 ? row[genderIdx] : undefined,
        guardianName: row[guardianIdx >= 0 ? guardianIdx : 2] ?? "Guardian",
        guardianEmail: row[emailIdx >= 0 ? emailIdx : 3] ?? "",
        guardianPhone: phoneIdx >= 0 ? row[phoneIdx] : undefined,
      }));

      const results = await importStudentsCsv(schoolId, parsed, admitStudent);
      return NextResponse.json({ results });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Import failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
