import { NextRequest, NextResponse } from "next/server";
import { requireTeacherStaff, requireSchoolStaffManager } from "@/lib/server/permissions";
import { createAnnouncement, createDisciplineRecord } from "@/lib/server/mutations";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (body.type === "discipline") {
      const user = await requireSchoolStaffManager();
      const record = await createDisciplineRecord(user.schoolId!, body);
      return NextResponse.json({ record }, { status: 201 });
    }

    const user = await requireTeacherStaff();
    const announcement = await createAnnouncement(user.schoolId!, {
      title: body.title,
      message: body.message,
      sendEmail: body.sendEmail ?? body.sendSms,
      createdById: user.id,
    });
    return NextResponse.json({ announcement }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
