import fs from "fs";
import path from "path";

const portals = {
  parent: {
    subtitle: "Parent Portal",
    role: "Parent",
    nav: [
      ["Dashboard", "dashboard", "/parent"],
      ["Student Profile", "person", "/parent/profile"],
      ["Attendance", "calendar_today", "/parent/attendance"],
      ["Exam Results", "grade", "/parent/results"],
      ["Report Cards", "summarize", "/parent/reports"],
      ["Fees", "payments", "/parent/fees"],
      ["Assignments", "assignment", "/parent/assignments"],
      ["Announcements", "campaign", "/parent/announcements"],
      ["CBE Reports", "auto_awesome", "/parent/cbe"],
    ],
    bottom: [
      ["Settings", "settings", "/parent/settings"],
      ["Support", "help", "/parent/support"],
    ],
    pages: ["profile", "attendance", "results", "reports", "fees", "assignments", "announcements", "cbe", "settings", "support"],
  },
  student: {
    subtitle: "Student Portal",
    role: "Student",
    nav: [
      ["Dashboard", "dashboard", "/student"],
      ["Timetable", "calendar_month", "/student/timetable"],
      ["Attendance", "fact_check", "/student/attendance"],
      ["Exam Results", "grade", "/student/results"],
      ["Assignments", "assignment", "/student/assignments"],
      ["Learning Materials", "folder_open", "/student/materials"],
      ["Announcements", "campaign", "/student/announcements"],
      ["Report Cards", "summarize", "/student/reports"],
      ["CBE Portfolio", "auto_awesome", "/student/cbe"],
    ],
    bottom: [
      ["Settings", "settings", "/student/settings"],
      ["Help", "help", "/student/help"],
    ],
    pages: ["timetable", "attendance", "results", "assignments", "materials", "announcements", "reports", "cbe", "settings", "help"],
  },
  admissions: {
    subtitle: "Admissions Portal",
    role: "Admissions Officer",
    nav: [
      ["Dashboard", "dashboard", "/admissions"],
      ["Applications", "inbox", "/admissions/applications"],
      ["Student Registration", "person_add", "/admissions/register"],
      ["Approvals", "approval", "/admissions/approvals"],
      ["Document Uploads", "upload_file", "/admissions/documents"],
      ["Admission Letters", "mail", "/admissions/letters"],
      ["Enrollment Reports", "bar_chart", "/admissions/reports"],
    ],
    bottom: [
      ["Settings", "settings", "/admissions/settings"],
      ["Support", "help", "/admissions/support"],
    ],
    pages: ["applications", "register", "approvals", "documents", "letters", "reports", "settings", "support"],
  },
  receptionist: {
    subtitle: "Front Office",
    role: "Receptionist",
    nav: [
      ["Dashboard", "dashboard", "/receptionist"],
      ["Visitor Management", "badge", "/receptionist/visitors"],
      ["Student Lookup", "person_search", "/receptionist/students"],
      ["Parent Lookup", "family_restroom", "/receptionist/parents"],
      ["Appointments", "event", "/receptionist/appointments"],
      ["Check-In / Out", "login", "/receptionist/checkin"],
      ["Communication", "message", "/receptionist/communication"],
    ],
    bottom: [
      ["Settings", "settings", "/receptionist/settings"],
      ["Support", "help", "/receptionist/support"],
    ],
    pages: ["visitors", "students", "parents", "appointments", "checkin", "communication", "settings", "support"],
  },
  librarian: {
    subtitle: "Library Portal",
    role: "Librarian",
    nav: [
      ["Dashboard", "dashboard", "/librarian"],
      ["Book Catalog", "menu_book", "/librarian/catalog"],
      ["Issue Book", "outbox", "/librarian/issue"],
      ["Returns", "move_to_inbox", "/librarian/returns"],
      ["Fine Management", "payments", "/librarian/fines"],
      ["Borrowing History", "history", "/librarian/history"],
      ["Library Reports", "bar_chart", "/librarian/reports"],
    ],
    bottom: [
      ["Settings", "settings", "/librarian/settings"],
      ["Support", "help", "/librarian/support"],
    ],
    pages: ["catalog", "issue", "returns", "fines", "history", "reports", "settings", "support"],
  },
  transport: {
    subtitle: "Transport Portal",
    role: "Transport Manager",
    nav: [
      ["Dashboard", "dashboard", "/transport"],
      ["Vehicles", "directions_bus", "/transport/vehicles"],
      ["Routes", "route", "/transport/routes"],
      ["Drivers", "person", "/transport/drivers"],
      ["Student Allocation", "groups", "/transport/allocation"],
      ["Transport Fees", "payments", "/transport/fees"],
      ["Route Reports", "bar_chart", "/transport/reports"],
    ],
    bottom: [
      ["Settings", "settings", "/transport/settings"],
      ["Support", "help", "/transport/support"],
    ],
    pages: ["vehicles", "routes", "drivers", "allocation", "fees", "reports", "settings", "support"],
  },
  "hostel-manager": {
    subtitle: "Hostel Manager",
    role: "Hostel Manager",
    nav: [
      ["Dashboard", "dashboard", "/hostel-manager"],
      ["Room Management", "hotel", "/hostel-manager/rooms"],
      ["Bed Allocation", "bed", "/hostel-manager/allocations"],
      ["Attendance", "how_to_reg", "/hostel-manager/attendance"],
      ["Fees", "payments", "/hostel-manager/fees"],
      ["Hostel Reports", "analytics", "/hostel-manager/reports"],
    ],
    bottom: [
      ["Settings", "settings", "/hostel-manager/settings"],
      ["Support", "help", "/hostel-manager/support"],
    ],
    pages: ["rooms", "allocations", "attendance", "fees", "reports", "settings", "support"],
  },
  "class-teacher": {
    subtitle: "Class Teacher Portal",
    role: "Class Teacher",
    nav: [
      ["Dashboard", "dashboard", "/class-teacher"],
      ["Class Attendance", "fact_check", "/class-teacher/attendance"],
      ["Discipline Records", "gavel", "/class-teacher/discipline"],
      ["Student Profiles", "person", "/class-teacher/students"],
      ["Parent Communication", "message", "/class-teacher/communication"],
      ["Class Performance", "bar_chart", "/class-teacher/performance"],
      ["Report Generation", "summarize", "/class-teacher/reports"],
      ["Announcements", "campaign", "/class-teacher/announcements"],
    ],
    bottom: [
      ["Settings", "settings", "/class-teacher/settings"],
      ["Support", "help", "/class-teacher/support"],
    ],
    pages: ["attendance", "discipline", "students", "communication", "performance", "reports", "announcements", "settings", "support"],
  },
};

function navFile(portal, config) {
  const name = portal.replace(/-/g, "");
  return `import type { NavItem } from "@/components/portal/PortalShell";

export const ${name}Nav: NavItem[] = ${JSON.stringify(
    config.nav.map(([label, icon, href]) => ({ label, icon, href })),
    null,
    2
  ).replace(/"([^"]+)":/g, "$1:")};

export const ${name}BottomNav: NavItem[] = ${JSON.stringify(
    config.bottom.map(([label, icon, href]) => ({ label, icon, href })),
    null,
    2
  ).replace(/"([^"]+)":/g, "$1:")};
`;
}

function layoutFile(portal, config) {
  const name = portal.replace(/-/g, "");
  return `import { getSchoolContext } from "@/lib/server/context";
import PortalShell from "@/components/portal/PortalShell";
import { ${name}Nav, ${name}BottomNav } from "@/lib/nav/${portal}";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const { user, school } = await getSchoolContext();
  return (
    <PortalShell
      title="MottiManager"
      subtitle={school?.name ?? "${config.subtitle}"}
      navItems={${name}Nav}
      bottomItems={${name}BottomNav}
      userName={user?.name ?? "User"}
      userRole="${config.role}"
    >
      {children}
    </PortalShell>
  );
}
`;
}

function subPage(portal, pageName, title) {
  return `import PageHeader from "@/components/portal/PageHeader";
import PortalList from "@/components/portal/PortalList";
import { getSchoolContext } from "@/lib/server/context";

export default async function Page() {
  const { schoolId } = await getSchoolContext();
  return (
    <>
      <PageHeader title="${title}" />
      <div className="p-lg">
        <PortalList portal="${portal}" page="${pageName}" schoolId={schoolId} />
      </div>
    </>
  );
}
`;
}

function dashboardPage(portal, title) {
  return `import PageHeader from "@/components/portal/PageHeader";
import PortalDashboard from "@/components/portal/PortalDashboard";
import { getSchoolContext } from "@/lib/server/context";

export default async function Page() {
  const { schoolId } = await getSchoolContext();
  return (
    <>
      <PageHeader title="${title}" />
      <div className="p-lg">
        <PortalDashboard portal="${portal}" schoolId={schoolId} />
      </div>
    </>
  );
}
`;
}

const root = process.cwd();

for (const [portal, config] of Object.entries(portals)) {
  const navPath = path.join(root, `lib/nav/${portal}.ts`);
  fs.mkdirSync(path.dirname(navPath), { recursive: true });
  fs.writeFileSync(navPath, navFile(portal, config));

  const layoutPath = path.join(root, `app/${portal}/layout.tsx`);
  fs.writeFileSync(layoutPath, layoutFile(portal, config));

  const dashPath = path.join(root, `app/${portal}/page.tsx`);
  fs.writeFileSync(dashPath, dashboardPage(portal, config.subtitle));

  for (const page of config.pages) {
    const title = page.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    const pagePath = path.join(root, `app/${portal}/${page}/page.tsx`);
    fs.mkdirSync(path.dirname(pagePath), { recursive: true });
    fs.writeFileSync(pagePath, subPage(portal, page, title));
  }
}

console.log("Generated portal pages");
