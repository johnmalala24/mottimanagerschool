import { NextRequest, NextResponse } from "next/server";
import { requireTeacherStaff, requireSchoolAdmin } from "@/lib/server/permissions";
import {
  getCbeCurriculum,
  createLearningArea,
  createStrand,
  createCompetency,
  seedDefaultCbeCurriculum,
  assessCbeCompetency,
} from "@/lib/server/cbe-curriculum";

export async function GET() {
  try {
    const user = await requireTeacherStaff();
    const curriculum = await getCbeCurriculum(user.schoolId!);
    return NextResponse.json({ curriculum });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireSchoolAdmin();
    const body = await request.json();
    const schoolId = user.schoolId!;

    switch (body.action) {
      case "seed":
        return NextResponse.json(await seedDefaultCbeCurriculum(schoolId));
      case "learning-area":
        return NextResponse.json(
          { area: await createLearningArea(schoolId, body) },
          { status: 201 }
        );
      case "strand":
        return NextResponse.json({ strand: await createStrand(schoolId, body) }, { status: 201 });
      case "competency":
        return NextResponse.json(
          { competency: await createCompetency(schoolId, body) },
          { status: 201 }
        );
      case "assess": {
        const assessUser = await requireTeacherStaff();
        const assessment = await assessCbeCompetency(assessUser.schoolId!, body);
        return NextResponse.json({ assessment }, { status: 201 });
      }
      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
