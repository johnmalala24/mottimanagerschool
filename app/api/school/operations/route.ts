import { NextRequest, NextResponse } from "next/server";
import { requireSchoolOpsStaff } from "@/lib/server/permissions";
import {
  checkInVisitor,
  checkOutVisitor,
  createAppointment,
  createLibraryBook,
  issueLibraryBook,
  returnLibraryBook,
  createTransportRoute,
  allocateTransport,
  createHostel,
  allocateHostel,
  createClass,
  createSubject,
  createTimetableEntry,
} from "@/lib/server/mutations";

export async function POST(request: NextRequest) {
  try {
    const user = await requireSchoolOpsStaff();
    const body = await request.json();
    const schoolId = user.schoolId!;
    const { action } = body;

    switch (action) {
      case "visitor-checkin":
        return NextResponse.json({ visitor: await checkInVisitor(schoolId, body) }, { status: 201 });
      case "visitor-checkout":
        await checkOutVisitor(schoolId, body.visitorId);
        return NextResponse.json({ message: "Checked out" });
      case "appointment":
        return NextResponse.json({ appointment: await createAppointment(schoolId, body) }, { status: 201 });
      case "library-book":
        return NextResponse.json({ book: await createLibraryBook(schoolId, body) }, { status: 201 });
      case "library-issue":
        return NextResponse.json({ issuance: await issueLibraryBook(schoolId, body) }, { status: 201 });
      case "library-return":
        await returnLibraryBook(schoolId, body.issuanceId, body.fine ?? 0);
        return NextResponse.json({ message: "Book returned" });
      case "transport-route":
        return NextResponse.json({ transport: await createTransportRoute(schoolId, body) }, { status: 201 });
      case "transport-allocate":
        return NextResponse.json({ allocation: await allocateTransport(schoolId, body) }, { status: 201 });
      case "hostel":
        return NextResponse.json({ hostel: await createHostel(schoolId, body) }, { status: 201 });
      case "hostel-allocate":
        return NextResponse.json({ allocation: await allocateHostel(schoolId, body) }, { status: 201 });
      case "class":
        return NextResponse.json({ class: await createClass(schoolId, body) }, { status: 201 });
      case "subject":
        return NextResponse.json({ subject: await createSubject(schoolId, body) }, { status: 201 });
      case "timetable":
        return NextResponse.json({ entry: await createTimetableEntry(schoolId, body) }, { status: 201 });
      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
