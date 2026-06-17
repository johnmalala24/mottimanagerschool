import Link from 'next/link'
import { getLandingStats } from '@/lib/server/landing'

const portals = [
  { href: '/school-admin', icon: 'school', title: 'School Admin', subtitle: 'Principal Portal', desc: 'Full school management: students, staff, classes, exams, and analytics.', gradient: 'from-[#00628d] to-[#007cb1]', badge: 'Core' },
  { href: '/finance', icon: 'payments', title: 'Bursar / Finance', subtitle: 'Finance Portal', desc: 'Fee structures, M-Pesa payments, invoices, receipts, and financial reports.', gradient: 'from-[#006b2c] to-[#44b649]', badge: 'Finance' },
  { href: '/teacher', icon: 'person_book', title: 'Teacher', subtitle: 'Teacher Portal', desc: 'Attendance, exam marks, assignments, CBE assessments, and timetable.', gradient: 'from-[#00628d] to-[#89ceff]', badge: 'Daily Use' },
  { href: '/class-teacher', icon: 'groups', title: 'Class Teacher', subtitle: 'Class Teacher Portal', desc: 'Class attendance, discipline records, parent communication, and reports.', gradient: 'from-[#006b2c] to-[#00873a]', badge: 'Extended' },
  { href: '/parent', icon: 'family_restroom', title: 'Parent', subtitle: 'Parent Portal', desc: 'View results, attendance, fees, report cards, and communicate with teachers.', gradient: 'from-[#00628d] to-[#007cb1]', badge: 'Key Portal' },
  { href: '/student', icon: 'emoji_people', title: 'Student', subtitle: 'Student Portal', desc: 'Timetable, assignments, results, learning materials, and CBE portfolios.', gradient: 'from-[#006b2c] to-[#44b649]', badge: 'Learner' },
  { href: '/admissions', icon: 'how_to_reg', title: 'Admissions', subtitle: 'Admissions Portal', desc: 'Online applications, student registration, approvals, and enrollment reports.', gradient: 'from-[#00628d] to-[#89ceff]', badge: 'Enrollment' },
  { href: '/receptionist', icon: 'support_agent', title: 'Receptionist', subtitle: 'Front Office Portal', desc: 'Visitor management, student lookup, appointments, and check-in/check-out.', gradient: 'from-[#006b2c] to-[#00873a]', badge: 'Front Office' },
  { href: '/librarian', icon: 'menu_book', title: 'Librarian', subtitle: 'Library Portal', desc: 'Book catalog, issuance, returns, fines, and student borrowing history.', gradient: 'from-[#00628d] to-[#007cb1]', badge: 'Optional' },
  { href: '/transport', icon: 'directions_bus', title: 'Transport Manager', subtitle: 'Transport Portal', desc: 'Vehicles, routes, drivers, student allocation, and transport fee tracking.', gradient: 'from-[#006b2c] to-[#44b649]', badge: 'Optional' },
  { href: '/hostel-manager', icon: 'hotel', title: 'Hostel Manager', subtitle: 'Hostel Manager Portal', desc: 'Room allocation, resident attendance, boarding fee tracking, and CBE standards monitoring.', gradient: 'from-[#00628d] to-[#89ceff]', badge: 'Optional' },
]

const steps = [
  { num: '01', icon: 'domain_add', title: 'Register Your School', desc: 'Sign up in minutes with your school details. No credit card required to start.' },
  { num: '02', icon: 'palette', title: 'Customize Branding', desc: 'Set your colors, logo, favicon, and enable only the roles your school needs.' },
  { num: '03', icon: 'group_add', title: 'Onboard Staff & Students', desc: 'Create staff accounts, admit students, and assign roles across dedicated portals.' },
  { num: '04', icon: 'monitoring', title: 'Run & Grow', desc: 'Track attendance, fees, exams, and analytics from professional dashboards with live charts.' },
]

const testimonials = [
  { quote: 'MottiManager transformed how we manage fees and parent communication. M-Pesa integration alone saved us hours every week.', name: 'Grace Wanjiku', role: 'Principal, Greenwood Academy', initials: 'GW' },
  { quote: 'We disabled roles we do not need and customized our portal colors. It finally feels like our own system, not generic software.', name: 'James Otieno', role: 'School Admin, Nairobi', initials: 'JO' },
  { quote: 'The dashboards with charts give us instant visibility into attendance and collections. Our board loves the reports.', name: 'Sarah Mwangi', role: 'Deputy Head, Mombasa', initials: 'SM' },
]

export default async function Home() {
  const landing = await getLandingStats()

  return (
    <div className="min-h-screen bg-[#f8f9ff] overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-card-elevated">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 bg-gradient-to-br from-[#006b2c] to-[#00873a] rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
              <span className="material-symbols-outlined icon-filled text-white text-[20px]">school</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-[1.05rem] font-extrabold text-[#006b2c] tracking-tight">MottiManager</span>
              <span className="block text-[0.65rem] text-[#545f73] font-medium -mt-0.5">School Management SaaS</span>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#545f73]">
            <Link href="#features" className="hover:text-[#006b2c] transition-colors">Features</Link>
            <Link href="#portals" className="hover:text-[#006b2c] transition-colors">Portals</Link>
            <Link href="#how-it-works" className="hover:text-[#006b2c] transition-colors">How It Works</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/auth/signin" className="hidden sm:inline-flex text-sm font-semibold text-[#006b2c] px-4 py-2 rounded-xl hover:bg-[#006b2c]/8 transition-colors">
              Sign In
            </Link>
            <Link href="/auth/signup" className="inline-flex items-center gap-2 bg-gradient-to-r from-[#006b2c] to-[#00873a] text-white px-5 py-2 rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-[#006b2c]/20 transition-all duration-300 hover:-translate-y-0.5">
              <span className="material-symbols-outlined text-[18px]">rocket_launch</span>
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-28 pb-24 sm:pt-32 sm:pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(98,223,125,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(137,206,255,0.12) 0%, transparent 40%)' }} />
        <div className="absolute top-32 left-[10%] w-72 h-72 bg-[#62df7d]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-[5%] w-96 h-96 bg-[#89ceff]/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 glass-dark text-white/90 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold mb-6">
              <span className="material-symbols-outlined text-[16px] icon-filled text-[#62df7d]">verified</span>
              Built for the East African CBE Landscape
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold text-white mb-6 leading-[1.1] tracking-tight">
              Modern School Management,{' '}
              <span className="bg-gradient-to-r from-[#62df7d] to-[#89ceff] bg-clip-text text-transparent">
                Fully Customizable
              </span>
            </h1>
            <p className="text-base sm:text-lg text-white/80 mb-8 max-w-xl leading-relaxed">
              Multi-tenant SaaS with M-Pesa, CBE support, role-based portals, live analytics charts, and per-school branding — colors, logo, favicon, and optional roles you control.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <Link href="/auth/signup" className="inline-flex items-center justify-center gap-2 bg-white text-[#006b2c] px-7 py-3.5 rounded-xl font-bold hover:shadow-xl transition-all hover:-translate-y-0.5">
                <span className="material-symbols-outlined text-[20px]">rocket_launch</span>
                Start Free Trial
              </Link>
              <Link href="#portals" className="inline-flex items-center justify-center gap-2 glass-dark text-white px-7 py-3.5 rounded-xl font-bold hover:bg-white/15 transition-all">
                <span className="material-symbols-outlined text-[20px]">grid_view</span>
                Explore Portals
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 text-white/70 text-sm">
              <span className="flex items-center gap-2"><span className="material-symbols-outlined text-[#62df7d] text-[18px]">check_circle</span> No setup fees</span>
              <span className="flex items-center gap-2"><span className="material-symbols-outlined text-[#62df7d] text-[18px]">check_circle</span> M-Pesa ready</span>
              <span className="flex items-center gap-2"><span className="material-symbols-outlined text-[#62df7d] text-[18px]">check_circle</span> Custom branding</span>
            </div>
          </div>

          {/* Dashboard preview mockup */}
          <div className="hidden lg:block relative">
            <div className="glass-card-elevated rounded-2xl p-6 shadow-2xl shadow-black/20 rotate-1 hover:rotate-0 transition-transform duration-500">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#006b2c] to-[#00873a] flex items-center justify-center">
                    <span className="material-symbols-outlined icon-filled text-white text-[20px]">dashboard</span>
                  </div>
                  <div>
                    <p className="font-bold text-[#0b1c30] text-sm">Admin Dashboard</p>
                    <p className="text-xs text-[#545f73]">Live analytics</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#006b2c] bg-[#006b2c]/10 px-3 py-1 rounded-full">Live</span>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {[
                  { label: 'Students', value: landing.students.toLocaleString(), color: '#006b2c' },
                  { label: 'Schools', value: landing.schools.toLocaleString(), color: '#00628d' },
                  { label: 'Revenue', value: landing.revenueFormatted, color: '#44b649' },
                  { label: 'Uptime', value: '99.9%', color: '#007cb1' },
                ].map((s) => (
                  <div key={s.label} className="bg-[#f8f9ff] rounded-xl p-4 border border-[#E2E8F0]">
                    <p className="text-xs text-[#545f73] font-medium">{s.label}</p>
                    <p className="text-lg font-extrabold mt-1" style={{ color: s.color }}>{s.value}</p>
                  </div>
                ))}
              </div>
              <div className="h-32 bg-gradient-to-t from-[#006b2c]/10 to-transparent rounded-xl border border-[#006b2c]/10 flex items-end px-4 pb-3 gap-2">
                {[40, 65, 55, 80, 70, 90, 75].map((h, i) => (
                  <div key={i} className="flex-1 bg-gradient-to-t from-[#006b2c] to-[#44b649] rounded-t-md opacity-80" style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="relative z-10 -mt-6 px-4 sm:px-6 lg:px-8 mb-20">
        <div className="max-w-5xl mx-auto glass-card-elevated rounded-2xl overflow-hidden shadow-xl shadow-[#006b2c]/5">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[#E2E8F0]">
            {[
              { value: landing.schools.toLocaleString(), label: 'Schools Registered', icon: 'domain' },
              { value: landing.students.toLocaleString(), label: 'Active Students', icon: 'groups' },
              { value: landing.revenueFormatted, label: 'Platform Revenue', icon: 'account_balance' },
              { value: '99.9%', label: 'System Uptime', icon: 'cloud_done' },
            ].map((s) => (
              <div key={s.label} className="p-6 text-center">
                <div className="w-10 h-10 bg-[#006b2c]/8 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <span className="material-symbols-outlined text-[#006b2c] text-[20px]">{s.icon}</span>
                </div>
                <p className="text-xl font-extrabold text-[#0b1c30]">{s.value}</p>
                <p className="text-xs text-[#545f73] font-medium mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 scroll-mt-24">
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 bg-[#00628d]/8 text-[#00628d] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            Enterprise Features
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0b1c30] mb-4 tracking-tight">
            Everything Your School Needs
          </h2>
          <p className="text-[#545f73] max-w-2xl mx-auto">Purpose-built for Kenyan and East African schools with local payment rails and curriculum support.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: 'smartphone', title: 'M-Pesa Integration', desc: 'STK Push, C2B payments, and real-time ledger reconciliation via Safaricom Daraja API.', gradient: 'from-[#44b649] to-[#006b2c]' },
            { icon: 'palette', title: 'Custom Branding', desc: 'School admins set theme colors, logo, favicon, and dashboard background — your portal, your identity.', gradient: 'from-[#006b2c] to-[#00873a]' },
            { icon: 'toggle_on', title: 'Flexible Roles', desc: 'Turn off any portal role your school does not need — librarian, transport, hostel, and more.', gradient: 'from-[#00628d] to-[#007cb1]' },
            { icon: 'monitoring', title: 'Live Analytics', desc: 'Professional dashboards with attendance trends, fee charts, and enrollment breakdowns.', gradient: 'from-[#006b2c] to-[#44b649]' },
            { icon: 'auto_awesome', title: 'CBE Ready', desc: 'Full Competency-Based Education support with rubrics, portfolios, and mastery tracking.', gradient: 'from-[#00628d] to-[#89ceff]' },
            { icon: 'security', title: 'Multi-Tenant SaaS', desc: 'School-isolated data, role-based access, and secure authentication for every user type.', gradient: 'from-[#006b2c] to-[#00873a]' },
          ].map((f) => (
            <div key={f.title} className="feature-card group hover:shadow-lg transition-shadow">
              <div className={`w-12 h-12 bg-gradient-to-br ${f.gradient} rounded-xl flex items-center justify-center mb-4 shadow-sm group-hover:scale-105 transition-transform`}>
                <span className="material-symbols-outlined icon-filled text-white text-[22px]">{f.icon}</span>
              </div>
              <h3 className="text-lg font-bold text-[#0b1c30] mb-2">{f.title}</h3>
              <p className="text-sm text-[#545f73] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-gradient-to-b from-[#f0f4f8] to-[#f8f9ff] py-20 px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0b1c30] mb-4">How It Works</h2>
            <p className="text-[#545f73]">From signup to a fully branded school portal in four simple steps.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s) => (
              <div key={s.num} className="relative bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow">
                <span className="text-4xl font-black text-[#006b2c]/10 absolute top-4 right-4">{s.num}</span>
                <div className="w-11 h-11 bg-[#006b2c]/10 rounded-xl flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-[#006b2c]">{s.icon}</span>
                </div>
                <h3 className="font-bold text-[#0b1c30] mb-2">{s.title}</h3>
                <p className="text-sm text-[#545f73] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portals */}
      <section id="portals" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 scroll-mt-24">
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 bg-[#006b2c]/8 text-[#006b2c] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            Role-Based Access
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0b1c30] mb-4">11 Dedicated Portals</h2>
          <p className="text-[#545f73] max-w-xl mx-auto">Enable only the roles your school needs — disable the rest from Settings.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {portals.map((p) => (
            <Link key={p.href} href={p.href} className="group portal-card p-5 hover:shadow-lg transition-all">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 bg-gradient-to-br ${p.gradient} rounded-xl flex items-center justify-center`}>
                  <span className="material-symbols-outlined icon-filled text-white text-[20px]">{p.icon}</span>
                </div>
                <span className="text-[0.65rem] font-bold text-[#006b2c] bg-[#006b2c]/10 px-2 py-0.5 rounded-full uppercase">{p.badge}</span>
              </div>
              <h3 className="font-bold text-[#0b1c30] mb-1">{p.title}</h3>
              <p className="text-xs text-[#545f73] mb-2">{p.subtitle}</p>
              <p className="text-sm text-[#3e4a3d] leading-relaxed mb-3">{p.desc}</p>
              <span className="text-[#006b2c] text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                Open Portal <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-[#0f1f2e] py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-white mb-3">Trusted by School Leaders</h2>
            <p className="text-white/60">See why administrators across Kenya choose MottiManager.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <span className="material-symbols-outlined text-[#62df7d] mb-4">format_quote</span>
                <p className="text-white/80 text-sm leading-relaxed mb-6">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#006b2c] to-[#00873a] flex items-center justify-center text-white text-sm font-bold">{t.initials}</div>
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-white/50 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto hero-gradient rounded-3xl px-8 py-14 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 30% 70%, rgba(98,223,125,0.3) 0%, transparent 50%)' }} />
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 relative z-10">Ready to Transform Your School?</h2>
          <p className="text-white/80 mb-8 max-w-lg mx-auto relative z-10">Join schools across East Africa using MottiManager to streamline administration, collect fees via M-Pesa, and deliver better outcomes.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center relative z-10">
            <Link href="/auth/signup" className="inline-flex items-center justify-center gap-2 bg-white text-[#006b2c] px-8 py-3.5 rounded-xl font-bold hover:shadow-xl transition-all hover:-translate-y-0.5">
              Get Started Free
            </Link>
            <Link href="/auth/signin" className="inline-flex items-center justify-center gap-2 glass-dark text-white px-8 py-3.5 rounded-xl font-bold hover:bg-white/15 transition-all">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a1628] text-white py-14 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-[#006b2c] to-[#00873a] rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined icon-filled text-white text-[20px]">school</span>
              </div>
              <span className="text-lg font-extrabold text-[#62df7d]">MottiManager</span>
            </div>
            <p className="text-sm text-white/50 leading-relaxed">Comprehensive school management for East Africa. M-Pesa, CBC, multi-tenancy, and custom branding at the core.</p>
          </div>
          {[
            { title: 'Platform', links: [['Get Started', '/auth/signup'], ['Sign In', '/auth/signin'], ['Portals', '#portals']] },
            { title: 'Product', links: [['Features', '#features'], ['How It Works', '#how-it-works'], ['School Admin', '/school-admin']] },
            { title: 'Legal', links: [['Privacy Policy', '#'], ['Terms of Service', '#'], ['Support', '#']] },
          ].map((col) => (
            <div key={col.title}>
              <h5 className="text-xs font-bold uppercase tracking-wider text-white/40 mb-4">{col.title}</h5>
              <div className="flex flex-col gap-2.5">
                {col.links.map(([label, href]) => (
                  <Link key={label} href={href} className="text-sm text-white/60 hover:text-[#62df7d] transition-colors">{label}</Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/40">
          <p>© {new Date().getFullYear()} MottiManager. All rights reserved.</p>
          <span className="flex items-center gap-1.5">
            <span className="relative flex h-1.5 w-1.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#44b649] opacity-75" /><span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#44b649]" /></span>
            All Systems Operational
          </span>
        </div>
      </footer>
    </div>
  )
}
