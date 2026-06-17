import { NextRequest, NextResponse } from "next/server";
import { requireProfileManager } from "@/lib/server/permissions";
import { updateSchoolUserProfile } from "@/lib/server/mutations";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const admin = await requireProfileManager();
    const { userId } = await params;
    const body = await request.json();
    const updated = await updateSchoolUserProfile(admin.schoolId!, userId, {
      name: body.name,
      phone: body.phone,
      image: body.image,
      active: body.active,
    });
    return NextResponse.json({ user: updated });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Update failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
