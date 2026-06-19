import { NextRequest, NextResponse } from "next/server";
import { requireTeacherStaff } from "@/lib/server/permissions";
import { prisma } from "@/lib/prisma";
import { getTeacherRecord } from "@/lib/server/teacher";

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
      teacherId: teacher.id,
    };

    if (classId) {
      where.classId = classId;
    }
    if (search) {
      where.title = { contains: search, mode: "insensitive" };
    }

    const [data, count] = await prisma.$transaction([
      prisma.assignment.findMany({
        where,
        include: {
          class: { select: { name: true } },
          subject: { select: { name: true } },
        },
        orderBy: { createdAt: "desc" },
        take: limit,
        skip,
      }),
      prisma.assignment.count({ where }),
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
    const assignment = await prisma.assignment.create({
      data: {
        schoolId: user.schoolId!,
        teacherId: teacher.id,
        classId: body.classId,
        subjectId: body.subjectId,
        title: body.title,
        description: body.description,
        dueDate: body.dueDate ? new Date(body.dueDate) : null,
        maxScore: parseInt(body.maxScore ?? "100"),
        status: body.status ?? "Open",
      },
    });

    return NextResponse.json({ assignment }, { status: 201 });
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
    const assignmentId = body.id;

    const existing = await prisma.assignment.findFirst({
      where: { id: assignmentId, schoolId: user.schoolId!, teacherId: teacher.id },
    });
    if (!existing) return NextResponse.json({ error: "Assignment not found" }, { status: 404 });

    const assignment = await prisma.assignment.update({
      where: { id: assignmentId },
      data: {
        classId: body.classId,
        subjectId: body.subjectId,
        title: body.title,
        description: body.description,
        dueDate: body.dueDate ? new Date(body.dueDate) : null,
        maxScore: parseInt(body.maxScore ?? "100"),
        status: body.status,
      },
    });

    return NextResponse.json({ assignment });
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
    const assignmentId = searchParams.get("id");
    if (!assignmentId) return NextResponse.json({ error: "ID required" }, { status: 400 });

    const existing = await prisma.assignment.findFirst({
      where: { id: assignmentId, schoolId: user.schoolId!, teacherId: teacher.id },
    });
    if (!existing) return NextResponse.json({ error: "Assignment not found" }, { status: 404 });

    await prisma.assignment.delete({
      where: { id: assignmentId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed" }, { status: 400 });
  }
}
