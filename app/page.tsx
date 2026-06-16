import Link from 'next/link'

const portals = [
  {
    href: '/super-admin',
    icon: 'admin_panel_settings',
    title: 'Super Admin',
    subtitle: 'Platform Owner Portal',
    desc: 'Manage all schools, subscriptions, billing, and platform-wide settings.',
    color: 'bg-primary text-on-primary',
    badge: 'MottiManager',
  },
  {
    href: '/school-admin',
    icon: 'school',
    title: 'School Admin',
    subtitle: 'Principal Portal',
    desc: 'Full school management: students, staff, classes, exams, and analytics.',
    color: 'bg-tertiary text-on-tertiary',
    badge: 'Core',
  },
  {
    href: '/finance',
    icon: 'payments',
    title: 'Bursar / Finance',
    subtitle: 'Finance Portal',
    desc: 'Fee structures, M-Pesa payments, invoices, receipts, and financial reports.',
    color: 'bg-primary text-on-primary',
    badge: 'Finance',
  },
  {
    href: '/teacher',
    icon: 'person_book',
    title: 'Teacher',
    subtitle: 'Teacher Portal',
    desc: 'Attendance, exam marks, assignments, CBE assessments, and timetable.',
    color: 'bg-tertiary text-on-tertiary',
    badge: 'Daily Use',
  },
  {
    href: '/class-teacher',
    icon: 'groups',
    title: 'Class Teacher',
    subtitle: 'Class Teacher Portal',
    desc: 'Class attendance, discipline records, parent communication, and reports.',
    color: 'bg-primary text-on-primary',
    badge: 'Extended',
  },
  {
    href: '/parent',
    icon: 'family_restroom',
    title: 'Parent',
    subtitle: 'Parent Portal',
    desc: 'View results, attendance, fees, report cards, and communicate with teachers.',
    color: 'bg-tertiary text-on-tertiary',
    badge: 'Key Portal',
  },
  {
    href: '/student',
    icon: 'emoji_people',
    title: 'Student',
    subtitle: 'Student Portal',
    desc: 'Timetable, assignments, results, learning materials, and CBE portfolios.',
    color: 'bg-primary text-on-primary',
    badge: 'Learner',
  },
  {
    href: '/admissions',
    icon: 'how_to_reg',
    title: 'Admissions',
    subtitle: 'Admissions Portal',
    desc: 'Online applications, student registration, approvals, and enrollment reports.',
    color: 'bg-tertiary text-on-tertiary',
    badge: 'Enrollment',
  },
  {
    href: '/receptionist',
    icon: 'support_agent',
    title: 'Receptionist',
    subtitle: 'Front Office Portal',
    desc: 'Visitor management, student lookup, appointments, and check-in/check-out.',
    color: 'bg-primary text-on-primary',
    badge: 'Front Office',
  },
  {
    href: '/librarian',
    icon: 'menu_book',
    title: 'Librarian',
    subtitle: 'Library Portal',
    desc: 'Book catalog, issuance, returns, fines, and student borrowing history.',
    color: 'bg-tertiary text-on-tertiary',
    badge: 'Optional',
  },
  {
    href: '/transport',
    icon: 'directions_bus',
    title: 'Transport Manager',
    subtitle: 'Transport Portal',
    desc: 'Vehicles, routes, drivers, student allocation, and transport fee tracking.',
    color: 'bg-primary text-on-primary',
    badge: 'Optional',
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <header className="bg-surface-container-lowest border-b border-outline-variant sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-gutter py-md flex items-center justify-between">
          <div className="flex items-center gap-sm">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined icon-filled text-on-primary">school</span>
            </div>
            <div>
              <h1 className="text-headline-lg-mobile font-bold text-primary leading-tight">MottiManager</h1>
              <p className="text-label-sm text-secondary">Multi-School SaaS Platform</p>
            </div>
          </div>
          <div className="flex items-center gap-sm">
            <span className="hidden md:flex items-center gap-xs text-label-sm text-secondary bg-surface-container px-md py-sm rounded-full border border-outline-variant">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              All Systems Operational
            </span>
            <Link href="/super-admin" className="bg-primary text-on-primary px-md py-sm rounded-lg text-label-md font-semibold hover:opacity-90 transition-opacity">
              Sign In
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-tertiary text-on-primary py-3xl px-gutter">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-xs bg-white/20 text-white px-md py-sm rounded-full text-label-sm font-semibold mb-lg">
            <span className="material-symbols-outlined text-[16px] icon-filled">verified</span>
            Built for the East African CBE Landscape
          </div>
          <h2 className="text-display-lg font-bold mb-lg leading-tight">
            One Platform.<br />Every School Portal.
          </h2>
          <p className="text-body-lg opacity-90 mb-xl max-w-2xl mx-auto">
            MottiManager is a comprehensive multi-school management SaaS with M-Pesa integration, CBE support, and dedicated portals for every stakeholder in the education ecosystem.
          </p>
          <div className="flex flex-wrap gap-md justify-center">
            <Link href="/super-admin" className="bg-white text-primary px-xl py-md rounded-lg font-bold text-body-md hover:shadow-lg transition-shadow">
              Explore Portals
            </Link>
            <Link href="/school-admin" className="border-2 border-white/60 text-white px-xl py-md rounded-lg font-bold text-body-md hover:bg-white/10 transition-colors">
              School Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-surface-container-lowest border-b border-outline-variant py-lg px-gutter">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-lg text-center">
          {[
            { value: '1,482', label: 'Schools Registered' },
            { value: '94.2%', label: 'Avg Attendance Rate' },
            { value: 'KES 4.2M', label: 'Platform Revenue (MTD)' },
            { value: '99.9%', label: 'System Uptime' },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-headline-lg font-bold text-primary">{s.value}</p>
              <p className="text-label-md text-secondary">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Portals Grid */}
      <section className="max-w-7xl mx-auto py-3xl px-gutter">
        <div className="text-center mb-2xl">
          <h3 className="text-headline-lg font-bold text-on-surface mb-md">11 Dedicated Portals</h3>
          <p className="text-body-lg text-secondary max-w-2xl mx-auto">
            Every stakeholder gets a purpose-built interface designed for their specific workflow and daily needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
          {portals.map((portal) => (
            <Link
              key={portal.href}
              href={portal.href}
              className="group tonal-card rounded-xl p-lg hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between mb-md">
                <div className={`w-12 h-12 ${portal.color} rounded-xl flex items-center justify-center`}>
                  <span className="material-symbols-outlined icon-filled text-[24px]">{portal.icon}</span>
                </div>
                <span className="text-label-sm font-bold text-secondary bg-surface-container px-sm py-xs rounded-full border border-outline-variant">
                  {portal.badge}
                </span>
              </div>
              <h4 className="text-title-md font-bold text-on-surface mb-xs">{portal.title}</h4>
              <p className="text-label-sm text-secondary mb-md">{portal.subtitle}</p>
              <p className="text-body-md text-on-surface-variant leading-relaxed mb-lg">{portal.desc}</p>
              <div className="flex items-center gap-xs text-primary font-semibold text-label-md group-hover:gap-sm transition-all">
                <span>Open Portal</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Features strip */}
      <section className="bg-surface-container-low border-t border-outline-variant py-3xl px-gutter">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-2xl">
            <h3 className="text-headline-lg font-bold text-on-surface mb-md">Built for Kenyan Schools</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-xl">
            {[
              { icon: 'smartphone', title: 'M-Pesa Integration', desc: 'STK Push, C2B payments, and real-time ledger reconciliation via Safaricom Daraja API.' },
              { icon: 'auto_awesome', title: 'CBE Ready', desc: 'Full Competency-Based Education support with rubrics, portfolios, and mastery tracking.' },
              { icon: 'security', title: 'Multi-Tenant SaaS', desc: 'School-isolated data, custom branding, and role-based access for every user type.' },
            ].map((f) => (
              <div key={f.title} className="text-center">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-md">
                  <span className="material-symbols-outlined text-primary text-[28px]">{f.icon}</span>
                </div>
                <h4 className="text-title-md font-bold mb-sm">{f.title}</h4>
                <p className="text-body-md text-secondary">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-inverse-surface text-inverse-on-surface py-2xl px-gutter">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-md">
          <div className="flex items-center gap-sm">
            <div className="w-8 h-8 bg-primary-container rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined icon-filled text-on-primary-container text-[18px]">school</span>
            </div>
            <span className="font-bold text-inverse-primary">MottiManager</span>
          </div>
          <p className="text-label-sm opacity-70 text-center">© 2024 MottiManager. Built for the Kenyan CBE Landscape.</p>
          <div className="flex gap-md text-label-sm opacity-70">
            <Link href="#" className="hover:opacity-100 transition-opacity">Privacy</Link>
            <Link href="#" className="hover:opacity-100 transition-opacity">Terms</Link>
            <Link href="#" className="hover:opacity-100 transition-opacity">Support</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
