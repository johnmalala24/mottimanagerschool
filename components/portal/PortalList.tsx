import EmptyState from "@/components/portal/EmptyState";
import PortalStatCard from "@/components/portal/PortalStatCard";
import StatusBadge, { statusVariant } from "@/components/portal/StatusBadge";
import { formatDate, formatKES } from "@/lib/format";
import { prisma } from "@/lib/prisma";
import { getParentChildData, getParentRecord } from "@/lib/server/parent";
import { getStudentDashboardData, getStudentRecord } from "@/lib/server/student";
import { getTeacherRecord } from "@/lib/server/teacher";
import {
  getAdmissions,
  getAppointments,
  getHostels,
  getLibraryBooks,
  getLibraryIssuances,
  getTransports,
  getVisitors,
  searchParents,
  searchStudents,
} from "@/lib/server/operations";
import { getSchoolAnnouncements } from "@/lib/server/teacher";

type PortalListProps = {
  portal: string;
  page: string;
  schoolId: string | null;
};

export default async function PortalList({ portal, page, schoolId }: PortalListProps) {
  if (!schoolId) {
    return <EmptyState icon="school" title="No school linked" />;
  }

  // Parent portal pages
  if (portal === "parent") {
    const parent = await getParentRecord();
    if (!parent) return <EmptyState icon="family_restroom" title="Parent not found" />;
    const children = await getParentChildData(parent.id, schoolId);

    if (page === "profile") {
      return children.length === 0 ? (
        <EmptyState icon="person" title="No linked students" />
      ) : (
        <div className="grid gap-md">
          {children.map((c) => (
            <div key={c.id} className="tonal-card rounded-xl p-lg">
              <h3 className="text-title-md font-bold">{c.user.name}</h3>
              <p className="text-secondary">{c.class.name} · {c.registrationNumber}</p>
            </div>
          ))}
        </div>
      );
    }

    if (page === "attendance") {
      const rows = children.flatMap((c) =>
        c.attendance.map((a) => ({ student: c.user.name, date: a.date, status: a.status }))
      );
      return rows.length === 0 ? (
        <EmptyState icon="calendar_today" title="No attendance records" />
      ) : (
        <Table headers={["Student", "Date", "Status"]} rows={rows.map((r) => [r.student, formatDate(r.date), r.status])} statusCol={2} />
      );
    }

    if (page === "results" || page === "reports") {
      const rows = children.flatMap((c) =>
        c.grades.map((g) => [c.user.name!, g.subject.name, g.examName, String(g.marks ?? "—"), g.gradePoint ?? "—"])
      );
      return rows.length === 0 ? (
        <EmptyState icon="grade" title="No results" />
      ) : (
        <Table headers={["Student", "Subject", "Exam", "Marks", "Grade"]} rows={rows} />
      );
    }

    if (page === "fees") {
      const rows = children.flatMap((c) =>
        c.feeInvoices.map((inv) => [
          c.user.name!,
          inv.invoiceNumber,
          formatKES(inv.amount),
          formatKES(inv.balance),
          inv.status,
        ])
      );
      return rows.length === 0 ? (
        <EmptyState icon="payments" title="No fee records" />
      ) : (
        <Table headers={["Student", "Invoice", "Amount", "Balance", "Status"]} rows={rows} statusCol={4} />
      );
    }

    if (page === "cbe") {
      const rows = children.flatMap((c) =>
        c.cbeAssessments.map((a) => [c.user.name!, a.learningArea, a.level, a.term, a.academicYear])
      );
      return rows.length === 0 ? (
        <EmptyState icon="auto_awesome" title="No CBE reports" />
      ) : (
        <Table headers={["Student", "Area", "Level", "Term", "Year"]} rows={rows} />
      );
    }

    if (page === "announcements") {
      const items = await getSchoolAnnouncements(schoolId);
      return <AnnouncementList items={items} />;
    }

    if (page === "assignments") {
      return <EmptyState icon="assignment" title="Assignments" description="View assignments via the student portal when published." />;
    }

    if (page === "settings" || page === "support") {
      return <SupportBlock page={page} />;
    }
  }

  // Student portal
  if (portal === "student") {
    const student = await getStudentRecord();
    if (!student) return <EmptyState icon="emoji_people" title="Student not found" />;
    const data = await getStudentDashboardData(student.id, schoolId);

    if (page === "timetable") {
      return data.timetable.length === 0 ? (
        <EmptyState icon="calendar_month" title="No timetable" />
      ) : (
        <Table
          headers={["Day", "Time", "Subject", "Teacher"]}
          rows={data.timetable.map((t) => [
            t.dayOfWeek,
            `${t.startTime}–${t.endTime}`,
            t.subject.name,
            t.teacher.user.name ?? "—",
          ])}
        />
      );
    }

    if (page === "attendance") {
      return data.attendance.length === 0 ? (
        <EmptyState icon="fact_check" title="No attendance" />
      ) : (
        <Table
          headers={["Date", "Status"]}
          rows={data.attendance.map((a) => [formatDate(a.date), a.status])}
          statusCol={1}
        />
      );
    }

    if (page === "results" || page === "reports") {
      return data.grades.length === 0 ? (
        <EmptyState icon="grade" title="No results" />
      ) : (
        <Table
          headers={["Subject", "Exam", "Marks", "Grade", "Term"]}
          rows={data.grades.map((g) => [g.subject.name, g.examName, String(g.marks ?? "—"), g.gradePoint ?? "—", g.term])}
        />
      );
    }

    if (page === "assignments") {
      return data.assignments.length === 0 ? (
        <EmptyState icon="assignment" title="No assignments" />
      ) : (
        <Table
          headers={["Title", "Subject", "Due", "Status"]}
          rows={data.assignments.map((a) => [
            a.title,
            a.subject?.name ?? "—",
            a.dueDate ? formatDate(a.dueDate) : "—",
            a.status,
          ])}
        />
      );
    }

    if (page === "materials") {
      return data.materials.length === 0 ? (
        <EmptyState icon="folder_open" title="No materials" />
      ) : (
        <div className="tonal-card rounded-xl divide-y divide-outline-variant">
          {data.materials.map((m) => (
            <div key={m.id} className="p-md font-semibold">{m.title}</div>
          ))}
        </div>
      );
    }

    if (page === "cbe") {
      return data.cbe.length === 0 ? (
        <EmptyState icon="auto_awesome" title="No CBE portfolio" />
      ) : (
        <Table
          headers={["Learning Area", "Level", "Term", "Year"]}
          rows={data.cbe.map((a) => [a.learningArea, a.level, a.term, a.academicYear])}
        />
      );
    }

    if (page === "announcements") {
      const items = await getSchoolAnnouncements(schoolId);
      return <AnnouncementList items={items} />;
    }

    if (page === "settings" || page === "help") {
      return <SupportBlock page={page} />;
    }
  }

  // Admissions
  if (portal === "admissions") {
    const apps = await getAdmissions(schoolId);
    if (page === "applications" || page === "approvals") {
      const filtered =
        page === "approvals"
          ? apps.filter((a) => ["UNDER_REVIEW", "APPLIED"].includes(a.status))
          : apps;
      return filtered.length === 0 ? (
        <EmptyState icon="inbox" title="No applications" />
      ) : (
        <Table
          headers={["App No.", "Student", "Class", "Status", "Contact"]}
          rows={filtered.map((a) => [
            a.applicationNumber,
            a.studentName,
            a.applyingForClass,
            a.status,
            a.contactNumber,
          ])}
          statusCol={3}
        />
      );
    }
    if (page === "register") {
      return <EmptyState icon="person_add" title="Student registration" description="Register admitted students from approved applications." />;
    }
    if (page === "documents" || page === "letters") {
      return <EmptyState icon="upload_file" title="No documents" description="Document management coming soon." />;
    }
    if (page === "reports") {
      return (
        <div className="grid grid-cols-2 gap-md">
          <PortalStatCard label="Total Applications" value={String(apps.length)} icon="inbox" />
          <PortalStatCard label="Admitted" value={String(apps.filter((a) => a.status === "ADMITTED").length)} icon="how_to_reg" />
        </div>
      );
    }
    if (page === "settings" || page === "support") return <SupportBlock page={page} />;
  }

  // Receptionist
  if (portal === "receptionist") {
    if (page === "visitors" || page === "checkin") {
      const visitors = await getVisitors(schoolId);
      return visitors.length === 0 ? (
        <EmptyState icon="badge" title="No visitors" />
      ) : (
        <Table
          headers={["Name", "Purpose", "Check In", "Check Out"]}
          rows={visitors.map((v) => [
            v.name,
            v.purpose ?? "—",
            formatDate(v.checkIn),
            v.checkOut ? formatDate(v.checkOut) : "—",
          ])}
        />
      );
    }
    if (page === "students") {
      const students = await searchStudents(schoolId);
      return students.length === 0 ? (
        <EmptyState icon="person_search" title="No students" />
      ) : (
        <Table
          headers={["Name", "Adm No.", "Class", "Phone"]}
          rows={students.map((s) => [s.user.name!, s.registrationNumber, s.class.name, s.user.phone ?? "—"])}
        />
      );
    }
    if (page === "parents") {
      const parents = await searchParents(schoolId);
      return parents.length === 0 ? (
        <EmptyState icon="family_restroom" title="No parents" />
      ) : (
        <Table
          headers={["Name", "Phone", "Children"]}
          rows={parents.map((p) => [
            p.user.name!,
            p.user.phone ?? "—",
            p.students.map((s) => s.user.name).join(", "),
          ])}
        />
      );
    }
    if (page === "appointments") {
      const appointments = await getAppointments(schoolId);
      return appointments.length === 0 ? (
        <EmptyState icon="event" title="No appointments" />
      ) : (
        <Table
          headers={["Visitor", "Purpose", "Date", "Status"]}
          rows={appointments.map((a) => [a.visitorName, a.purpose ?? "—", formatDate(a.date), a.status])}
        />
      );
    }
    if (page === "communication") {
      const items = await getSchoolAnnouncements(schoolId);
      return <AnnouncementList items={items} />;
    }
    if (page === "settings" || page === "support") return <SupportBlock page={page} />;
  }

  // Librarian
  if (portal === "librarian") {
    const books = await getLibraryBooks(schoolId);
    const issuances = await getLibraryIssuances(schoolId);
    if (page === "catalog") {
      return books.length === 0 ? (
        <EmptyState icon="menu_book" title="No books" />
      ) : (
        <Table
          headers={["Title", "Author", "Category", "Available", "Status"]}
          rows={books.map((b) => [b.title, b.author, b.category, String(b.availableQuantity), b.status])}
        />
      );
    }
    if (page === "issue" || page === "returns" || page === "history") {
      return issuances.length === 0 ? (
        <EmptyState icon="history" title="No issuance records" />
      ) : (
        <Table
          headers={["Book", "Student", "Due", "Return", "Status", "Fine"]}
          rows={issuances.map((i) => [
            i.book.title,
            i.student?.user.name ?? "—",
            formatDate(i.dueDate),
            i.returnDate ? formatDate(i.returnDate) : "—",
            i.status,
            formatKES(i.fine),
          ])}
        />
      );
    }
    if (page === "fines") {
      const fines = issuances.filter((i) => i.fine > 0);
      return fines.length === 0 ? (
        <EmptyState icon="payments" title="No fines" />
      ) : (
        <Table
          headers={["Book", "Student", "Fine"]}
          rows={fines.map((i) => [i.book.title, i.student?.user.name ?? "—", formatKES(i.fine)])}
        />
      );
    }
    if (page === "reports") {
      return (
        <div className="grid grid-cols-2 gap-md">
          <PortalStatCard label="Books" value={String(books.length)} icon="menu_book" />
          <PortalStatCard label="Active Loans" value={String(issuances.filter((i) => i.status === "Issued").length)} icon="outbox" />
        </div>
      );
    }
    if (page === "settings" || page === "support") return <SupportBlock page={page} />;
  }

  // Transport
  if (portal === "transport") {
    const routes = await getTransports(schoolId);
    if (page === "vehicles" || page === "routes" || page === "drivers") {
      return routes.length === 0 ? (
        <EmptyState icon="directions_bus" title="No transport routes" />
      ) : (
        <Table
          headers={["Route", "Vehicle", "Driver", "Phone", "Capacity", "Fee"]}
          rows={routes.map((t) => [
            t.routeName,
            t.vehicleNumber,
            t.driverName,
            t.driverPhone ?? "—",
            String(t.capacity),
            formatKES(t.monthlyFee),
          ])}
        />
      );
    }
    if (page === "allocation") {
      const rows = routes.flatMap((r) =>
        r.allocations.map((a) => [r.routeName, a.student.user.name!, a.stopPoint, formatDate(a.allocationDate)])
      );
      return rows.length === 0 ? (
        <EmptyState icon="groups" title="No allocations" />
      ) : (
        <Table headers={["Route", "Student", "Stop", "Since"]} rows={rows} />
      );
    }
    if (page === "fees") {
      return routes.length === 0 ? (
        <EmptyState icon="payments" title="No transport fees" />
      ) : (
        <Table
          headers={["Route", "Monthly Fee", "Students"]}
          rows={routes.map((r) => [r.routeName, formatKES(r.monthlyFee), String(r.allocations.length)])}
        />
      );
    }
    if (page === "reports") {
      const students = routes.reduce((s, r) => s + r.allocations.length, 0);
      return (
        <div className="grid grid-cols-2 gap-md">
          <PortalStatCard label="Routes" value={String(routes.length)} icon="route" />
          <PortalStatCard label="Students" value={String(students)} icon="groups" />
        </div>
      );
    }
    if (page === "settings" || page === "support") return <SupportBlock page={page} />;
  }

  // Hostel manager
  if (portal === "hostel-manager") {
    const hostels = await getHostels(schoolId);
    if (page === "rooms") {
      return hostels.length === 0 ? (
        <EmptyState icon="hotel" title="No hostels" />
      ) : (
        <Table
          headers={["Name", "Type", "Capacity", "Warden", "Residents"]}
          rows={hostels.map((h) => [h.name, h.type, String(h.capacity), h.warden ?? "—", String(h.allocations.length)])}
        />
      );
    }
    if (page === "allocations") {
      const rows = hostels.flatMap((h) =>
        h.allocations.map((a) => [
          h.name,
          a.student.user.name!,
          a.roomNumber,
          a.bedNumber,
          formatDate(a.allocationDate),
        ])
      );
      return rows.length === 0 ? (
        <EmptyState icon="bed" title="No allocations" />
      ) : (
        <Table headers={["Hostel", "Student", "Room", "Bed", "Since"]} rows={rows} />
      );
    }
    if (page === "attendance" || page === "fees") {
      return <EmptyState icon="how_to_reg" title="Coming soon" description="Hostel attendance and fees tracking." />;
    }
    if (page === "reports") {
      const residents = hostels.reduce((s, h) => s + h.allocations.length, 0);
      return (
        <div className="grid grid-cols-2 gap-md">
          <PortalStatCard label="Hostels" value={String(hostels.length)} icon="hotel" />
          <PortalStatCard label="Residents" value={String(residents)} icon="bed" />
        </div>
      );
    }
    if (page === "settings" || page === "support") return <SupportBlock page={page} />;
  }

  // Class teacher
  if (portal === "class-teacher") {
    const teacher = await getTeacherRecord();
    if (!teacher) return <EmptyState icon="groups" title="Class teacher not found" />;
    const classIds = teacher.classesTeaching.map((c) => c.id);
    const students = await prisma.student.findMany({
      where: { schoolId, classId: { in: classIds } },
      include: { user: { select: { name: true } }, class: true },
    });

    if (page === "students") {
      return students.length === 0 ? (
        <EmptyState icon="person" title="No students" />
      ) : (
        <Table
          headers={["Name", "Class", "Adm No.", "Status"]}
          rows={students.map((s) => [s.user.name!, s.class.name, s.registrationNumber, s.status])}
          statusCol={3}
        />
      );
    }

    if (page === "attendance") {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const next = new Date(today);
      next.setDate(next.getDate() + 1);
      const records = await prisma.attendance.findMany({
        where: { schoolId, classId: { in: classIds }, date: { gte: today, lt: next } },
        include: { student: { include: { user: { select: { name: true } } } } },
      });
      return records.length === 0 ? (
        <EmptyState icon="fact_check" title="No attendance today" />
      ) : (
        <Table
          headers={["Student", "Status"]}
          rows={records.map((r) => [r.student.user.name!, r.status])}
          statusCol={1}
        />
      );
    }

    if (page === "discipline") {
      const records = await prisma.disciplineRecord.findMany({
        where: { schoolId, studentId: { in: students.map((s) => s.id) } },
        include: { student: { include: { user: { select: { name: true } } } } },
        orderBy: { date: "desc" },
      });
      return records.length === 0 ? (
        <EmptyState icon="gavel" title="No discipline records" />
      ) : (
        <Table
          headers={["Student", "Description", "Action", "Date"]}
          rows={records.map((r) => [r.student.user.name!, r.description, r.action ?? "—", formatDate(r.date)])}
        />
      );
    }

    if (page === "performance") {
      const grades = await prisma.grade.findMany({
        where: { schoolId, classId: { in: classIds } },
        include: { student: { include: { user: { select: { name: true } } } }, subject: true },
        take: 50,
      });
      return grades.length === 0 ? (
        <EmptyState icon="bar_chart" title="No performance data" />
      ) : (
        <Table
          headers={["Student", "Subject", "Exam", "Marks"]}
          rows={grades.map((g) => [g.student.user.name!, g.subject.name, g.examName, String(g.marks ?? "—")])}
        />
      );
    }

    if (page === "communication" || page === "announcements") {
      const items = await getSchoolAnnouncements(schoolId);
      return <AnnouncementList items={items} />;
    }

    if (page === "reports") {
      return (
        <div className="grid grid-cols-2 gap-md">
          <PortalStatCard label="Students" value={String(students.length)} icon="groups" />
          <PortalStatCard label="Classes" value={String(teacher.classesTeaching.length)} icon="class" />
        </div>
      );
    }

    if (page === "settings" || page === "support") return <SupportBlock page={page} />;
  }

  return <EmptyState icon="inbox" title="No data" />;
}

function Table({
  headers,
  rows,
  statusCol,
}: {
  headers: string[];
  rows: (string | null)[][];
  statusCol?: number;
}) {
  return (
    <div className="tonal-card rounded-xl overflow-hidden">
      <table className="w-full">
        <thead className="bg-surface-container-low">
          <tr>
            {headers.map((h) => (
              <th key={h} className="text-left px-md py-sm text-label-sm font-bold text-secondary uppercase whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t border-outline-variant">
              {row.map((cell, j) => (
                <td key={j} className="px-md py-md whitespace-nowrap">
                  {statusCol === j ? (
                    <StatusBadge label={cell ?? "—"} variant={statusVariant(cell ?? "")} />
                  ) : (
                    cell ?? "—"
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AnnouncementList({ items }: { items: { id: string; title: string; message: string; createdAt: Date }[] }) {
  if (items.length === 0) return <EmptyState icon="campaign" title="No announcements" />;
  return (
    <div className="tonal-card rounded-xl divide-y divide-outline-variant">
      {items.map((a) => (
        <div key={a.id} className="p-md">
          <p className="font-semibold">{a.title}</p>
          <p className="text-secondary mt-xs">{a.message}</p>
          <p className="text-label-sm text-secondary mt-sm">{formatDate(a.createdAt)}</p>
        </div>
      ))}
    </div>
  );
}

function SupportBlock({ page }: { page: string }) {
  if (page === "support" || page === "help") {
    return (
      <div className="tonal-card rounded-xl p-lg max-w-lg">
        <a href={`mailto:${process.env.SUPPORT_EMAIL ?? "support@mottimanager.com"}`} className="text-primary font-semibold hover:underline">
          {process.env.SUPPORT_EMAIL ?? "support@mottimanager.com"}
        </a>
      </div>
    );
  }
  return (
    <div className="tonal-card rounded-xl p-lg max-w-lg">
      <p className="text-secondary">Account settings are managed by your school administrator.</p>
    </div>
  );
}
