import { NextRequest, NextResponse } from "next/server";
import { requireSchoolAdmin, requireTeacherStaff } from "@/lib/server/permissions";
import {
  createExam,
  getSchoolExams,
  getExamById,
  updateExamStatus,
  saveExamMarks,
  processExamResults,
  publishExamResults,
  getExamMarksGrid,
} from "@/lib/server/exams";
import type { ExamStatus } from "@prisma/client";

export async function GET(request: NextRequest) {
  try {
    const user = await requireTeacherStaff();
    const examId = request.nextUrl.searchParams.get("examId");

    if (examId) {
      const grid = await getExamMarksGrid(user.schoolId!, examId);
      if (!grid) return NextResponse.json({ error: "Exam not found" }, { status: 404 });
      return NextResponse.json(grid);
    }

    const exams = await getSchoolExams(user.schoolId!);
    return NextResponse.json({ exams });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireSchoolAdmin();
    const body = await request.json();
    const exam = await createExam(user.schoolId!, {
      name: body.name,
      classId: body.classId,
      term: body.term,
      academicYear: body.academicYear,
      maxMarks: body.maxMarks,
      subjectIds: body.subjectIds ?? [],
      createdById: user.id,
    });
    return NextResponse.json({ exam }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const user = await requireTeacherStaff();
    const body = await request.json();
    const { examId, action } = body;

    if (!examId) return NextResponse.json({ error: "examId required" }, { status: 400 });

    switch (action) {
      case "status": {
        const exam = await updateExamStatus(user.schoolId!, examId, body.status as ExamStatus);
        return NextResponse.json({ exam });
      }
      case "marks": {
        const grades = await saveExamMarks(user.schoolId!, examId, body.marks ?? []);
        return NextResponse.json({ grades });
      }
      case "process": {
        const result = await processExamResults(user.schoolId!, examId);
        return NextResponse.json(result);
      }
      case "publish": {
        const result = await publishExamResults(user.schoolId!, examId);
        return NextResponse.json(result);
      }
      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
