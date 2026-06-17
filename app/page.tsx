import Link from 'next/link'
import { getLandingStats } from '@/lib/server/landing'

const features = [
  {
    title: 'M-Pesa Integration',
    desc: 'Collect school fees with STK Push and C2B payments. Reconcile transactions in real time.',
  },
  {
    title: 'CBE Ready',
    desc: 'Competency-Based Education workflows for rubrics, portfolios, and mastery tracking.',
  },
  {
    title: 'Role-Based Portals',
    desc: 'Dedicated portals for admin, finance, teachers, parents, students, and optional modules.',
  },
  {
    title: 'Custom Branding',
    desc: 'Set your school colors, logo, and motto. Branded reports and dashboards for every user.',
  },
  {
    title: 'Live Analytics',
    desc: 'Attendance trends, fee collections, and enrollment charts on clean admin dashboards.',
  },
  {
    title: 'Multi-Tenant SaaS',
    desc: 'Isolated school data, secure authentication, and configurable modules per institution.',
  },
]

const portals = [
  { href: '/school-admin', title: 'School Admin', desc: 'Students, staff, classes, exams, analytics' },
  { href: '/finance', title: 'Finance', desc: 'Fees, M-Pesa, invoices, receipts, reports' },
  { href: '/teacher', title: 'Teacher', desc: 'Attendance, marks, assignments, CBE' },
  { href: '/parent', title: 'Parent', desc: 'Results, fees, attendance, communication' },
  { href: '/student', title: 'Student', desc: 'Timetable, assignments, results, CBE' },
  { href: '/admissions', title: 'Admissions', desc: 'Applications, registration, approvals' },
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
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <span className="material-symbols-outlined icon-filled text-white text-[18px]">school</span>
            </div>
            <span className="text-lg font-bold text-primary tracking-tight">MottiManager</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-secondary">
            <Link href="#features" className="hover:text-primary transition-colors">Features</Link>
            <Link href="#portals" className="hover:text-primary transition-colors">Portals</Link>
            <Link href="#how-it-works" className="hover:text-primary transition-colors">How it works</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href="/auth/signin"
              className="hidden sm:inline-flex text-sm font-semibold text-secondary px-4 py-2 rounded-lg hover:bg-[#f8f9ff] transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/auth/signup"
              className="inline-flex items-center bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Get started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b border-[#E2E8F0] bg-[#fafcfb]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-primary mb-4 tracking-wide uppercase">
              School Management Platform
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-on-surface leading-tight tracking-tight mb-6">
              Manage your school with clarity, control, and confidence.
            </h1>
            <p className="text-lg text-secondary leading-relaxed mb-8 max-w-2xl">
              MottiManager is a multi-tenant platform built for East African schools — fees via M-Pesa,
              CBE support, branded portals, and role-based access in one professional system.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/auth/signup"
                className="inline-flex items-center justify-center bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Register your school
              </Link>
              <Link
                href="/auth/signin"
                className="inline-flex items-center justify-center border border-[#E2E8F0] bg-white text-on-surface px-6 py-3 rounded-lg font-semibold hover:bg-[#f8f9ff] transition-colors"
              >
                Sign in to portal
              </Link>
            </div>
          </div>

          {/* Stats strip */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-px bg-[#E2E8F0] border border-[#E2E8F0] rounded-xl overflow-hidden">
            {[
              { value: landing.schools.toLocaleString(), label: 'Schools' },
              { value: landing.students.toLocaleString(), label: 'Students' },
              { value: landing.revenueFormatted, label: 'Fees processed' },
              { value: '99.9%', label: 'Uptime' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white px-6 py-5">
                <p className="text-2xl font-bold text-on-surface">{stat.value}</p>
                <p className="text-sm text-secondary mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* API-style highlight — Daraja-inspired */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-on-surface mb-4">
              Built for real school operations
            </h2>
            <p className="text-secondary leading-relaxed mb-6">
              From fee collection to exam reporting, every module is designed for clarity.
              Finance teams reconcile M-Pesa payments. Administrators get live dashboards.
              Parents receive branded report cards with your school identity.
            </p>
            <ul className="space-y-3 text-sm text-on-surface-variant">
              {[
                'STK Push and C2B M-Pesa payment flows',
                'Branded reports with your school logo',
                'Configurable roles — enable only what you need',
                'Secure, school-isolated data',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-[#E2E8F0] bg-[#0b1c30] overflow-hidden shadow-sm">
            <div className="px-4 py-3 border-b border-white/10 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#eab308]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e]" />
              <span className="ml-2 text-xs text-white/50 font-mono">fee-payment.json</span>
            </div>
            <pre className="p-5 text-sm text-[#62df7d] font-mono leading-relaxed overflow-x-auto">
{`{
  "school": "Greenwood Academy",
  "student": "ADM-2026-0042",
  "amount": 15000,
  "currency": "KES",
  "channel": "M-Pesa STK Push",
  "status": "COMPLETED",
  "receipt": "QAB1CD2EFG"
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-[#f8f9ff] border-y border-[#E2E8F0] scroll-mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-on-surface mb-3">Platform features</h2>
            <p className="text-secondary max-w-2xl">
              Everything your school needs — without unnecessary complexity.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-white border border-[#E2E8F0] rounded-xl p-6 hover:border-primary/30 transition-colors"
              >
                <h3 className="font-semibold text-on-surface mb-2">{f.title}</h3>
                <p className="text-sm text-secondary leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 scroll-mt-16">
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-on-surface mb-3">How it works</h2>
          <p className="text-secondary">From registration to a fully configured school portal in four steps.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s) => (
            <div key={s.num} className="border border-[#E2E8F0] rounded-xl p-6">
              <span className="inline-flex w-8 h-8 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold mb-4">
                {s.num}
              </span>
              <h3 className="font-semibold text-on-surface mb-2">{s.title}</h3>
              <p className="text-sm text-secondary leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Portals */}
      <section id="portals" className="bg-[#f8f9ff] border-y border-[#E2E8F0] scroll-mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-on-surface mb-3">Role-based portals</h2>
            <p className="text-secondary max-w-2xl">
              Each role gets a focused workspace. Disable modules you do not need from Settings.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {portals.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="group bg-white border border-[#E2E8F0] rounded-xl p-5 hover:border-primary transition-colors"
              >
                <h3 className="font-semibold text-on-surface group-hover:text-primary transition-colors mb-1">
                  {p.title}
                </h3>
                <p className="text-sm text-secondary">{p.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="border border-[#E2E8F0] rounded-2xl p-8 sm:p-12 text-center bg-white">
          <h2 className="text-2xl sm:text-3xl font-bold text-on-surface mb-4">
            Ready to get started?
          </h2>
          <p className="text-secondary mb-8 max-w-lg mx-auto">
            Register your school in minutes. No credit card required to begin setup.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/auth/signup"
              className="inline-flex items-center justify-center bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Create school account
            </Link>
            <Link
              href="/auth/signin"
              className="inline-flex items-center justify-center border border-[#E2E8F0] px-8 py-3 rounded-lg font-semibold text-secondary hover:bg-[#f8f9ff] transition-colors"
            >
              Sign in
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#E2E8F0] bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 bg-primary rounded-md flex items-center justify-center">
                  <span className="material-symbols-outlined icon-filled text-white text-[16px]">school</span>
                </div>
                <span className="font-bold text-primary">MottiManager</span>
              </div>
              <p className="text-sm text-secondary leading-relaxed">
                School management for East Africa. M-Pesa, CBE, and multi-portal access.
              </p>
            </div>
            {[
              { title: 'Platform', links: [['Get started', '/auth/signup'], ['Sign in', '/auth/signin']] },
              { title: 'Product', links: [['Features', '#features'], ['Portals', '#portals'], ['How it works', '#how-it-works']] },
              { title: 'Support', links: [['Documentation', '#'], ['Contact', '#']] },
            ].map((col) => (
              <div key={col.title}>
                <h5 className="text-xs font-semibold uppercase tracking-wider text-secondary mb-3">{col.title}</h5>
                <div className="flex flex-col gap-2">
                  {col.links.map(([label, href]) => (
                    <Link key={label} href={href} className="text-sm text-secondary hover:text-primary transition-colors">
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="pt-8 border-t border-[#E2E8F0] text-xs text-secondary">
            © {new Date().getFullYear()} MottiManager. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
