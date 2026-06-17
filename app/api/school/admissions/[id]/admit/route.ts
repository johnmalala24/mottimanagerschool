import { NextRequest, NextResponse } from "next/server";
import { requireAdmissionsStaff } from "@/lib/server/permissions";
import { admitFromApplication } from "@/lib/server/mutations";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireAdmissionsStaff();
    const { id } = await params;
    const body = await request.json();
    if (!body.classId) {
      return NextResponse.json({ error: "classId is required" }, { status: 400 });
    }
    const result = await admitFromApplication(user.schoolId!, id, body.classId, {
      studentImage: body.studentImage,
      parentImage: body.parentImage,
    });
    return NextResponse.json({ message: "Student admitted", ...result }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Admission failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
