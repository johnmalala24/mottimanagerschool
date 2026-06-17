import { NextRequest, NextResponse } from "next/server";
import { getSessionUser } from "@/lib/server/session";
import { submitAssignment, gradeAssignmentSubmission } from "@/lib/server/mutations";
import { prisma } from "@/lib/prisma";
import { requireTeacherStaff } from "@/lib/server/permissions";

export async function GET(request: NextRequest) {
  try {
    const user = await getSessionUser();
    if (!user?.schoolId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const assignmentId = request.nextUrl.searchParams.get("assignmentId");

    if (user.role === "STUDENT") {
      const student = await prisma.student.findUnique({ where: { userId: user.id! } });
      if (!student) return NextResponse.json({ submissions: [] });

      const submissions = await prisma.assignmentSubmission.findMany({
        where: { studentId: student.id, schoolId: user.schoolId },
        include: { assignment: { include: { subject: true } } },
        orderBy: { submittedAt: "desc" },
      });
      return NextResponse.json({ submissions });
    }

    if (assignmentId) {
      await requireTeacherStaff();
      const submissions = await prisma.assignmentSubmission.findMany({
        where: { assignmentId, schoolId: user.schoolId },
        include: {
          student: { include: { user: { select: { name: true } } } },
          assignment: true,
        },
        orderBy: { submittedAt: "desc" },
      });
      return NextResponse.json({ submissions });
    }

    return NextResponse.json({ error: "assignmentId required for teachers" }, { status: 400 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getSessionUser();
    if (!user?.schoolId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();

    if (body.action === "grade") {
      await requireTeacherStaff();
      const submission = await gradeAssignmentSubmission(user.schoolId, body);
      return NextResponse.json({ submission });
    }

    if (user.role !== "STUDENT") {
      return NextResponse.json({ error: "Only students can submit" }, { status: 403 });
    }

    const student = await prisma.student.findUnique({ where: { userId: user.id! } });
    if (!student) return NextResponse.json({ error: "Student not found" }, { status: 404 });

    const submission = await submitAssignment(user.schoolId, student.id, body);
    return NextResponse.json({ submission }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
