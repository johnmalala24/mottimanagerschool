import { NextRequest, NextResponse } from "next/server";
import { getSessionUser } from "@/lib/server/session";
import { updateUserProfile } from "@/lib/server/mutations";

export async function GET() {
  const user = await getSessionUser();
  if (!user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
      role: user.role,
      schoolId: user.schoolId,
    },
  });
}

export async function PATCH(request: NextRequest) {
  try {
    const sessionUser = await getSessionUser();
    if (!sessionUser?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = await request.json();
    const updated = await updateUserProfile(sessionUser.id, {
      name: body.name,
      phone: body.phone,
      image: body.image,
      password: body.password,
    });
    return NextResponse.json({
      message: "Profile updated",
      user: {
        id: updated.id,
        name: updated.name,
        email: updated.email,
        image: updated.image,
        phone: updated.phone,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Update failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
