import { NextRequest, NextResponse } from "next/server";
import { requireTeacherStaff } from "@/lib/server/permissions";
import { createGrade, createAssignment, createCbeAssessment } from "@/lib/server/mutations";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const user = await requireTeacherStaff();
    const body = await request.json();
    const { type } = body;

    if (type === "grade") {
      const grade = await createGrade(user.schoolId!, body);
      return NextResponse.json({ grade }, { status: 201 });
    }

    if (type === "assignment") {
      const teacher = await prisma.teacher.findUnique({ where: { userId: user.id! } });
      const assignment = await createAssignment(user.schoolId!, {
        ...body,
        teacherId: body.teacherId ?? teacher?.id,
      });
      return NextResponse.json({ assignment }, { status: 201 });
    }

    if (type === "cbe") {
      const cbe = await createCbeAssessment(user.schoolId!, body);
      return NextResponse.json({ cbe }, { status: 201 });
    }

    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
