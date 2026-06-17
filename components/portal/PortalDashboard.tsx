import EmptyState from "@/components/portal/EmptyState";
import PortalStatCard from "@/components/portal/PortalStatCard";
import { getTeacherRecord } from "@/lib/server/teacher";
import {
  getAdmissions,
  getAppointments,
  getHostels,
  getLibraryBooks,
  getTransports,
  getVisitors,
} from "@/lib/server/operations";
import { getParentChildData, getParentRecord } from "@/lib/server/parent";
import { getStudentRecord } from "@/lib/server/student";

type PortalDashboardProps = {
  portal: string;
  schoolId: string | null;
};

export default async function PortalDashboard({ portal, schoolId }: PortalDashboardProps) {
  if (!schoolId) {
    return (
      <EmptyState
        icon="school"
        title="No school linked"
        description="Contact your school administrator."
      />
    );
  }

  if (portal === "parent") {
    const parent = await getParentRecord();
    if (!parent) return <EmptyState icon="family_restroom" title="Parent profile not found" />;
    const children = await getParentChildData(parent.id, schoolId);
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-md">
        <PortalStatCard label="Children" value={String(children.length)} icon="family_restroom" />
        <PortalStatCard label="Relationship" value={parent.relationship ?? "—"} icon="person" />
      </div>
    );
  }

  if (portal === "student") {
    const student = await getStudentRecord();
    if (!student) return <EmptyState icon="emoji_people" title="Student profile not found" />;
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-md">
        <PortalStatCard label="Name" value={student.user.name ?? "—"} icon="person" />
        <PortalStatCard label="Class" value={student.class.name} icon="class" />
        <PortalStatCard label="Adm No." value={student.registrationNumber} icon="badge" />
        <PortalStatCard label="Status" value={student.status} icon="check_circle" />
      </div>
    );
  }

  if (portal === "admissions") {
    const apps = await getAdmissions(schoolId);
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-md">
        <PortalStatCard label="Applications" value={String(apps.length)} icon="inbox" />
        <PortalStatCard
          label="Pending"
          value={String(apps.filter((a) => a.status === "APPLIED" || a.status === "UNDER_REVIEW").length)}
          icon="pending"
        />
      </div>
    );
  }

  if (portal === "receptionist") {
    const [visitors, appointments] = await Promise.all([
      getVisitors(schoolId),
      getAppointments(schoolId),
    ]);
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-md">
        <PortalStatCard label="Visitors" value={String(visitors.length)} icon="badge" />
        <PortalStatCard label="Appointments" value={String(appointments.length)} icon="event" />
      </div>
    );
  }

  if (portal === "librarian") {
    const books = await getLibraryBooks(schoolId);
    const total = books.reduce((s, b) => s + b.quantity, 0);
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-md">
        <PortalStatCard label="Books in Catalog" value={String(books.length)} icon="menu_book" />
        <PortalStatCard label="Total Copies" value={String(total)} icon="library_books" />
      </div>
    );
  }

  if (portal === "transport") {
    const routes = await getTransports(schoolId);
    const students = routes.reduce((s, r) => s + r.allocations.length, 0);
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-md">
        <PortalStatCard label="Routes" value={String(routes.length)} icon="route" />
        <PortalStatCard label="Students on Transport" value={String(students)} icon="groups" />
      </div>
    );
  }

  if (portal === "hostel-manager") {
    const hostels = await getHostels(schoolId);
    const residents = hostels.reduce((s, h) => s + h.allocations.length, 0);
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-md">
        <PortalStatCard label="Hostels" value={String(hostels.length)} icon="hotel" />
        <PortalStatCard label="Residents" value={String(residents)} icon="bed" />
      </div>
    );
  }

  if (portal === "class-teacher") {
    const teacher = await getTeacherRecord();
    if (!teacher) return <EmptyState icon="groups" title="Class teacher profile not found" />;
    const students = teacher.classesTeaching.reduce((s, c) => s + c.students.length, 0);
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-md">
        <PortalStatCard label="Classes" value={String(teacher.classesTeaching.length)} icon="class" />
        <PortalStatCard label="Students" value={String(students)} icon="groups" />
      </div>
    );
  }

  return <EmptyState icon="dashboard" title="Dashboard" />;
}
