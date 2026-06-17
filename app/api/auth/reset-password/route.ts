import { NextRequest, NextResponse } from "next/server";
import { resetPasswordWithToken } from "@/lib/server/mutations";

export async function POST(request: NextRequest) {
  try {
    const { email, token, password } = await request.json();
    if (!email || !token || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    await resetPasswordWithToken(token, email, password);
    return NextResponse.json({ message: "Password reset successfully" });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Reset failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
