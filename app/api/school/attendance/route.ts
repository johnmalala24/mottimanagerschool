import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireTeacherStaff } from "@/lib/server/permissions";
import { markClassAttendance } from "@/lib/server/mutations";

export async function POST(request: NextRequest) {
  try {
    const user = await requireTeacherStaff();
    const body = await request.json();
    const { classId, records, date } = body;
    if (!classId || !Array.isArray(records) || records.length === 0) {
      return NextResponse.json({ error: "Missing classId or records" }, { status: 400 });
    }

    const teacher = await prisma.teacher.findUnique({ where: { userId: user.id! } });
    const teacherId = teacher?.id;

    await markClassAttendance(
      user.schoolId!,
      teacherId ?? "",
      classId,
      records,
      date ? new Date(date) : new Date()
    );
    return NextResponse.json({ message: "Attendance saved" });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to save attendance";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = await requireTeacherStaff();
    const classId = request.nextUrl.searchParams.get("classId");
    const dateParam = request.nextUrl.searchParams.get("date");
    if (!classId) return NextResponse.json({ error: "classId required" }, { status: 400 });

    const day = dateParam ? new Date(dateParam) : new Date();
    day.setHours(0, 0, 0, 0);
    const next = new Date(day);
    next.setDate(next.getDate() + 1);

    const [students, attendance] = await Promise.all([
      prisma.student.findMany({
        where: { schoolId: user.schoolId!, classId, status: "ACTIVE" },
        include: { user: { select: { name: true, image: true } } },
        orderBy: { registrationNumber: "asc" },
      }),
      prisma.attendance.findMany({
        where: { schoolId: user.schoolId!, classId, date: { gte: day, lt: next } },
      }),
    ]);

    return NextResponse.json({ students, attendance });
  } catch {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
}
