import Link from 'next/link'
import { getLandingStats } from '@/lib/server/landing'

const services = [
  {
    icon: 'groups',
    title: 'Student & Staff Management',
    desc: 'Admit students, manage staff roles, class assignments, and end-of-year promotion workflows.',
  },
  {
    icon: 'calendar_today',
    title: 'Attendance Tracking',
    desc: 'Mark daily attendance from any device. Parents get email alerts and in-app notifications for absences.',
  },
  {
    icon: 'analytics',
    title: 'Exams & Report Cards',
    desc: 'Zeraki-style exam workflow: create → enter marks → process → publish. Branded PDF report cards.',
  },
  {
    icon: 'payments',
    title: 'Fees & Manual M-Pesa',
    desc: 'Fee structures, invoices, manual payment recording, email receipts, and automated fee reminders.',
  },
  {
    icon: 'mail',
    title: 'Email Communication',
    desc: 'Send announcements to parents and staff via Resend. In-app notification bell on every portal.',
  },
  {
    icon: 'auto_awesome',
    title: 'CBE / CBC Curriculum',
    desc: 'Learning areas, strands, competencies, and EE/ME/AE/BE assessments with portfolio tracking.',
  },
  {
    icon: 'assignment',
    title: 'Assignments',
    desc: 'Teachers post assignments; students submit online; teachers grade with feedback and email alerts.',
  },
  {
    icon: 'summarize',
    title: 'Analytics & Exports',
    desc: 'Performance dashboards, at-risk student flags, and CSV export for students, grades, fees, attendance.',
  },
  {
    icon: 'local_library',
    title: 'Library Module',
    desc: 'Book catalog, issue and return tracking, overdue fines — toggle on per school.',
  },
  {
    icon: 'directions_bus',
    title: 'Transport & Hostel',
    desc: 'Route management, student allocations, boarding rooms — optional modules for your school.',
  },
  {
    icon: 'how_to_reg',
    title: 'Admissions Portal',
    desc: 'Online applications, review workflow, and one-click admission with parent account creation.',
  },
  {
    icon: 'palette',
    title: 'Custom Branding',
    desc: 'Your logo, theme colors, and motto on every portal, report card, and email notification.',
  },
]

const features = [
  {
    title: 'Email Notifications',
    desc: 'Parents receive fee receipts, absence alerts, exam results, and announcements via professional branded emails.',
  },
  {
    title: 'CBE Ready',
    desc: 'Full competency-based curriculum structure with learning areas, strands, and rubric assessments.',
  },
  {
    title: '14 Role-Based Portals',
    desc: 'Admin, finance, teachers, parents, students, admissions, library, transport, hostel, and more.',
  },
  {
    title: 'Exam Workflow',
    desc: 'Draft → Open → Close → Process rankings → Publish to parents with one click.',
  },
  {
    title: 'Live Analytics',
    desc: 'Fee collection trends, subject performance, attendance rates, and at-risk student identification.',
  },
  {
    title: 'Multi-Tenant SaaS',
    desc: 'Each school is fully isolated with its own data, branding, users, and configurable modules.',
  },
]

const portals = [
  { href: '/school-admin', title: 'School Admin', desc: 'Students, exams, promotion, analytics, settings' },
  { href: '/finance', title: 'Finance / Bursar', desc: 'Fees, manual M-Pesa, invoices, reminders, exports' },
  { href: '/teacher', title: 'Teacher', desc: 'Attendance, marks grid, assignments, CBE assessments' },
  { href: '/parent', title: 'Parent', desc: 'Report cards, fees, attendance, email alerts' },
  { href: '/student', title: 'Student', desc: 'Timetable, assignments, results, CBE portfolio' },
  { href: '/admissions', title: 'Admissions', desc: 'Applications, review, enrollment' },
]

const steps = [
  { num: '1', title: 'Register your school', desc: 'Create an account with your school details. The principal becomes School Admin.' },
  { num: '2', title: 'Configure branding', desc: 'Choose your theme color, upload a logo, and enable the modules you need.' },
  { num: '3', title: 'Onboard your team', desc: 'Add staff, admit students, and assign roles across dedicated portals.' },
  { num: '4', title: 'Run daily operations', desc: 'Track attendance, fees, exams, and reports from one platform.' },
]

export default async function Home() {
  const landing = await getLandingStats()

  return (
    <div className="min-h-screen bg-white text-on-surface">
      <header className="sticky top-0 z-50 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <span className="material-symbols-outlined icon-filled text-white text-[18px]">school</span>
            </div>
            <span className="text-lg font-bold text-primary tracking-tight">MottiManager</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-secondary">
            <Link href="#services" className="hover:text-primary transition-colors">Services</Link>
            <Link href="#features" className="hover:text-primary transition-colors">Features</Link>
            <Link href="#portals" className="hover:text-primary transition-colors">Portals</Link>
            <Link href="#how-it-works" className="hover:text-primary transition-colors">How it works</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/auth/signin" className="hidden sm:inline-flex text-sm font-semibold text-secondary px-4 py-2 rounded-lg hover:bg-[#f8f9ff] transition-colors">
              Sign in
            </Link>
            <Link href="/auth/signup" className="inline-flex items-center bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
              Get started
            </Link>
          </div>
        </div>
      </header>

      <section className="border-b border-[#E2E8F0] bg-[#fafcfb]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-primary mb-4 tracking-wide uppercase">School Management Platform</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-on-surface leading-tight tracking-tight mb-6">
              Manage your school with clarity, control, and confidence.
            </h1>
            <p className="text-lg text-secondary leading-relaxed mb-8 max-w-2xl">
              MottiManager is a multi-tenant platform built for East African schools — exams like Zeraki,
              email notifications, CBE support, branded portals, and role-based access in one professional system.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/auth/signup" className="inline-flex items-center justify-center bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
                Register your school
              </Link>
              <Link href="/auth/signin" className="inline-flex items-center justify-center border border-[#E2E8F0] bg-white text-on-surface px-6 py-3 rounded-lg font-semibold hover:bg-[#f8f9ff] transition-colors">
                Sign in to portal
              </Link>
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-px bg-[#E2E8F0] border border-[#E2E8F0] rounded-xl overflow-hidden">
            {[
              { value: landing.schools.toLocaleString(), label: 'Schools' },
              { value: landing.students.toLocaleString(), label: 'Students' },
              { value: landing.revenueFormatted, label: 'Fees processed' },
              { value: '14', label: 'Role portals' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white px-6 py-5">
                <p className="text-2xl font-bold text-on-surface">{stat.value}</p>
                <p className="text-sm text-secondary mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 scroll-mt-16">
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-on-surface mb-3">What MottiManager offers</h2>
          <p className="text-secondary max-w-2xl">Everything your school needs to run day-to-day — from admission to graduation.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <div key={s.title} className="bg-white border border-[#E2E8F0] rounded-xl p-6 hover:border-primary/30 transition-colors">
              <span className="material-symbols-outlined text-primary text-2xl mb-3 block">{s.icon}</span>
              <h3 className="font-semibold text-on-surface mb-2">{s.title}</h3>
              <p className="text-sm text-secondary leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="features" className="bg-[#f8f9ff] border-y border-[#E2E8F0] scroll-mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-on-surface mb-3">Platform features</h2>
            <p className="text-secondary max-w-2xl">Built for real school operations — professional, clean, and user-friendly.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="bg-white border border-[#E2E8F0] rounded-xl p-6 hover:border-primary/30 transition-colors">
                <h3 className="font-semibold text-on-surface mb-2">{f.title}</h3>
                <p className="text-sm text-secondary leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 scroll-mt-16">
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-on-surface mb-3">How it works</h2>
          <p className="text-secondary">From registration to a fully configured school portal in four steps.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s) => (
            <div key={s.num} className="border border-[#E2E8F0] rounded-xl p-6">
              <span className="inline-flex w-8 h-8 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold mb-4">{s.num}</span>
              <h3 className="font-semibold text-on-surface mb-2">{s.title}</h3>
              <p className="text-sm text-secondary leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="portals" className="bg-[#f8f9ff] border-y border-[#E2E8F0] scroll-mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-on-surface mb-3">Role-based portals</h2>
            <p className="text-secondary max-w-2xl">Each role gets a focused workspace. Disable modules you do not need from Settings.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {portals.map((p) => (
              <Link key={p.href} href={p.href} className="group bg-white border border-[#E2E8F0] rounded-xl p-5 hover:border-primary transition-colors">
                <h3 className="font-semibold text-on-surface group-hover:text-primary transition-colors mb-1">{p.title}</h3>
                <p className="text-sm text-secondary">{p.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="border border-[#E2E8F0] rounded-2xl p-8 sm:p-12 text-center bg-white">
          <h2 className="text-2xl sm:text-3xl font-bold text-on-surface mb-4">Ready to get started?</h2>
          <p className="text-secondary mb-8 max-w-lg mx-auto">Register your school in minutes. No credit card required to begin setup.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/auth/signup" className="inline-flex items-center justify-center bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
              Create school account
            </Link>
            <Link href="/auth/signin" className="inline-flex items-center justify-center border border-[#E2E8F0] px-8 py-3 rounded-lg font-semibold text-secondary hover:bg-[#f8f9ff] transition-colors">
              Sign in
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#E2E8F0] bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 bg-primary rounded-md flex items-center justify-center">
              <span className="material-symbols-outlined icon-filled text-white text-[16px]">school</span>
            </div>
            <span className="font-bold text-primary">MottiManager</span>
          </div>
          <p className="text-sm text-secondary">© {new Date().getFullYear()} MottiManager. School management for East Africa.</p>
        </div>
      </footer>
    </div>
  )
}
