import { NextRequest, NextResponse } from "next/server";
import { requireTeacherStaff } from "@/lib/server/permissions";
import { prisma } from "@/lib/prisma";
import { getTeacherRecord } from "@/lib/server/teacher";
import { ExamStatus } from "@prisma/client";

export async function GET(request: NextRequest) {
  try {
    const user = await requireTeacherStaff();
    const teacher = await getTeacherRecord();
    if (!teacher) return NextResponse.json({ error: "Teacher not found" }, { status: 404 });

    const { searchParams } = request.nextUrl;
    const classId = searchParams.get("classId");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") ?? "1");
    const limit = 10;
    const skip = (page - 1) * limit;

    const where: any = {
      schoolId: user.schoolId!,
      // Scoped to classes teaching or created by teacher
      classId: { in: teacher.classesTeaching.map((c) => c.id) },
    };

    if (classId) {
      where.classId = classId;
    }
    if (search) {
      where.name = { contains: search, mode: "insensitive" };
    }

    const [data, count] = await prisma.$transaction([
      prisma.exam.findMany({
        where,
        include: {
          class: { select: { name: true } },
        },
        orderBy: { createdAt: "desc" },
        take: limit,
        skip,
      }),
      prisma.exam.count({ where }),
    ]);

    return NextResponse.json({ data, count, limit });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed" }, { status: 400 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireTeacherStaff();
    const teacher = await getTeacherRecord();
    if (!teacher) return NextResponse.json({ error: "Teacher not found" }, { status: 404 });

    const body = await request.json();
    const exam = await prisma.exam.create({
      data: {
        schoolId: user.schoolId!,
        name: body.name,
        classId: body.classId,
        term: body.term || "Term 1",
        academicYear: body.academicYear || String(new Date().getFullYear()),
        maxMarks: parseInt(body.maxMarks ?? "100"),
        status: (body.status as ExamStatus) ?? "DRAFT",
        subjectIds: body.subjectIds ?? [],
        createdById: user.id,
      },
    });

    return NextResponse.json({ exam }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed" }, { status: 400 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const user = await requireTeacherStaff();
    const teacher = await getTeacherRecord();
    if (!teacher) return NextResponse.json({ error: "Teacher not found" }, { status: 404 });

    const body = await request.json();
    const examId = body.id;

    // Verify ownership/scope
    const existing = await prisma.exam.findFirst({
      where: {
        id: examId,
        schoolId: user.schoolId!,
        classId: { in: teacher.classesTeaching.map((c) => c.id) },
      },
    });
    if (!existing) return NextResponse.json({ error: "Exam not found" }, { status: 404 });

    const exam = await prisma.exam.update({
      where: { id: examId },
      data: {
        name: body.name,
        classId: body.classId,
        term: body.term,
        academicYear: body.academicYear,
        maxMarks: parseInt(body.maxMarks ?? "100"),
        status: body.status as ExamStatus,
        subjectIds: body.subjectIds,
      },
    });

    return NextResponse.json({ exam });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed" }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await requireTeacherStaff();
    const teacher = await getTeacherRecord();
    if (!teacher) return NextResponse.json({ error: "Teacher not found" }, { status: 404 });

    const { searchParams } = request.nextUrl;
    const examId = searchParams.get("id");
    if (!examId) return NextResponse.json({ error: "ID required" }, { status: 400 });

    const existing = await prisma.exam.findFirst({
      where: {
        id: examId,
        schoolId: user.schoolId!,
        classId: { in: teacher.classesTeaching.map((c) => c.id) },
      },
    });
    if (!existing) return NextResponse.json({ error: "Exam not found" }, { status: 404 });

    await prisma.exam.delete({
      where: { id: examId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed" }, { status: 400 });
  }
}
