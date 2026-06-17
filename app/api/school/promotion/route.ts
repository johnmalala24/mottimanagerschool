import { NextRequest, NextResponse } from "next/server";
import { requireSchoolStaffManager } from "@/lib/server/permissions";
import { runPromotion } from "@/lib/server/promotion";

export async function POST(request: NextRequest) {
  try {
    const user = await requireSchoolStaffManager();
    const body = await request.json();
    const result = await runPromotion(user.schoolId!, {
      fromAcademicYear: body.fromAcademicYear,
      toAcademicYear: body.toAcademicYear,
      mappings: body.mappings ?? [],
      notes: body.notes,
      createdById: user.id,
    });
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
