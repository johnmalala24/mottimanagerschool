import { NextRequest, NextResponse } from "next/server";
import { requireSchoolAdmin } from "@/lib/server/permissions";
import { getSchoolSettings, updateSchoolSettings } from "@/lib/server/school-admin";
import { TOGGLEABLE_PORTAL_ROLES } from "@/lib/roles";
import type { UserRole } from "@prisma/client";

const VALID_ROLES = new Set(TOGGLEABLE_PORTAL_ROLES.map((r) => r.value));

export async function GET() {
  try {
    const user = await requireSchoolAdmin();
    const settings = await getSchoolSettings(user.schoolId!);
    return NextResponse.json({ settings });
  } catch {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const user = await requireSchoolAdmin();
    const body = await request.json();

    const disabledRoles = Array.isArray(body.disabledRoles)
      ? (body.disabledRoles as UserRole[]).filter((r) => VALID_ROLES.has(r))
      : undefined;

    const settings = await updateSchoolSettings(user.schoolId!, {
      themeColor: body.themeColor,
      accentColor: body.accentColor,
      dashboardBgColor: body.dashboardBgColor,
      favicon: body.favicon,
      motto: body.motto,
      logo: body.logo,
      disabledRoles,
      cbeEnabled: body.cbeEnabled,
      smsEnabled: body.smsEnabled,
      whatsappEnabled: body.whatsappEnabled,
      transportEnabled: body.transportEnabled,
      libraryEnabled: body.libraryEnabled,
      hostelEnabled: body.hostelEnabled,
      payrollEnabled: body.payrollEnabled,
      mpesaPaybill: body.mpesaPaybill,
    });

    return NextResponse.json({ settings, message: "Settings updated" });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update settings";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
