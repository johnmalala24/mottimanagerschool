'use client'
import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import clsx from 'clsx'

const navItems = [
  { label: 'Dashboard', icon: 'dashboard', href: '/school-admin' },
  { label: 'Student Mgmt', icon: 'groups', href: '/school-admin/students' },
  { label: 'Attendance', icon: 'calendar_today', href: '/school-admin/attendance' },
  { label: 'Fees & M-Pesa', icon: 'payments', href: '/school-admin/fees' },
  { label: 'Exams & CBE', icon: 'analytics', href: '/school-admin/exams' },
  { label: 'Staff', icon: 'badge', href: '/school-admin/staff' },
  { label: 'Classes', icon: 'class', href: '/school-admin/classes' },
  { label: 'Communication', icon: 'campaign', href: '/school-admin/communication' },
  { label: 'Reports', icon: 'summarize', href: '/school-admin/reports' },
]
const bottomItems = [
  { label: 'Settings', icon: 'settings', href: '/school-admin/settings' },
  { label: 'Support', icon: 'help', href: '/school-admin/support' },
]

const students = [
  { adm: 'GW-4A-001', name: 'Amina Odhiambo', grade: 'Grade 4A', parent: 'Mrs. Odhiambo', phone: '+254712345678', status: 'Active', fees: 'Paid', attendance: 98 },
  { adm: 'GW-4A-002', name: 'Kelvin Mwai', grade: 'Grade 4A', parent: 'Mr. Mwai', phone: '+254723456789', status: 'Active', fees: 'Partial', attendance: 85 },
  { adm: 'GW-6B-001', name: 'Brian Otieno', grade: 'Grade 6B', parent: 'Mr. Otieno', phone: '+254734567890', status: 'Active', fees: 'Overdue', attendance: 60 },
  { adm: 'GW-1A-001', name: 'Sarah Atieno', grade: 'Grade 1A', parent: 'Ms. Atieno', phone: '+254745678901', status: 'Active', fees: 'Paid', attendance: 92 },
  { adm: 'GW-3B-002', name: 'Faith Wanjiku', grade: 'Grade 3B', parent: 'Mr. Wanjiku', phone: '+254756789012', status: 'Active', fees: 'Paid', attendance: 95 },
]

const staff = [
  { name: 'Mr. James Ochieng', role: 'Mathematics Teacher', classes: 'Grade 4A, 5B, 6A', phone: '+254712000001', status: 'Active' },
  { name: 'Ms. Grace Njeri', role: 'Class Teacher 4A', classes: 'Grade 4A', phone: '+254712000002', status: 'Active' },
  { name: 'Mr. David Kamau', role: 'English Teacher', classes: 'Grade 1-4', phone: '+254712000003', status: 'Active' },
  { name: 'Ms. Lydia Achieng', role: 'Science Teacher', classes: 'Grade 5A, 5B, 6A', phone: '+254712000004', status: 'On Leave' },
]

const classes = [
  { name: 'Grade 1A', teacher: 'Ms. Wanjiku', students: 38, stream: 'A', subjects: 7 },
  { name: 'Grade 2A', teacher: 'Mr. Kariuki', students: 40, stream: 'A', subjects: 7 },
  { name: 'Grade 4A', teacher: 'Ms. Grace Njeri', students: 32, stream: 'A', subjects: 9 },
  { name: 'Grade 4B', teacher: 'Mr. Hassan', students: 34, stream: 'B', subjects: 9 },
  { name: 'Grade 5B', teacher: 'Mr. Odhiambo', students: 28, stream: 'B', subjects: 9 },
  { name: 'Grade 6A', teacher: 'Ms. Chebet', students: 35, stream: 'A', subjects: 9 },
]

const activities = [
  { icon: 'check_circle', iconBg: 'bg-primary/15 text-primary', title: 'M-Pesa Payment Received', desc: 'Kamau Njoroge (Grade 4B) · KES 15,000', time: '2 mins ago' },
  { icon: 'description', iconBg: 'bg-tertiary/15 text-tertiary', title: 'Exam Results Published', desc: 'Mid-Term Competency Assessment: Grade 6', time: '45 mins ago' },
  { icon: 'person_add', iconBg: 'bg-surface-container text-secondary', title: 'New Student Registered', desc: 'Sarah Atieno (Grade 1A)', time: '2 hours ago' },
  { icon: 'warning', iconBg: 'bg-error/15 text-error', title: 'Fee Balance Alert', desc: 'Brian Otieno — outstanding balance KES 32,000', time: '3 hours ago' },
  { icon: 'campaign', iconBg: 'bg-tertiary/15 text-tertiary', title: 'Announcement Sent', desc: 'End-Term exams notice sent to 1,284 parents', time: '1 day ago' },
]

const TABS = ['Dashboard', 'Students', 'Staff', 'Classes', 'Academic Setup', 'Communication']

export default function SchoolAdminPage() {
  const [tab, setTab] = useState('Dashboard')
  const [promoteStep, setPromoteStep] = useState(false)

  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar title="MottiManager" subtitle="Greenwood Academy" navItems={navItems} bottomItems={bottomItems} userName="Samuel Mwangi" userRole="Principal Admin" />
      <main className="ml-64 flex-1 flex flex-col min-h-screen">
        <div className="sticky top-0 z-10 bg-surface-container-lowest border-b border-outline-variant px-lg py-md flex items-center justify-between">
          <div>
            <h1 className="text-headline-sm font-bold text-on-surface">Admin Dashboard</h1>
            <p className="text-body-md text-secondary">Welcome back, here's what's happening at Greenwood Academy today.</p>
          </div>
          <div className="flex gap-sm">
            <button className="flex items-center gap-xs px-md py-sm border border-outline-variant rounded-lg text-label-md text-secondary hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">print</span> Print Daily Report
            </button>
            <button className="flex items-center gap-xs bg-primary text-on-primary px-md py-sm rounded-lg text-label-md font-semibold hover:opacity-90">
              <span className="material-symbols-outlined text-[18px]">person_add</span> New Registration
            </button>
          </div>
        </div>

        <div className="border-b border-outline-variant bg-surface-container-lowest px-lg flex gap-xs overflow-x-auto">
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)} className={clsx('py-md px-md text-label-md font-semibold border-b-2 whitespace-nowrap transition-colors', tab === t ? 'border-primary text-primary' : 'border-transparent text-secondary hover:text-on-surface')}>
              {t}
            </button>
          ))}
        </div>

        <div className="p-lg flex-1">

          {/* ── DASHBOARD ── */}
          {tab === 'Dashboard' && (
            <div className="flex flex-col gap-lg">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-md">
                {[
                  { label: 'Total Students', value: '1,284', sub: '+4% from last term', icon: 'groups', badge: '+4%', bc: 'text-primary bg-primary/10' },
                  { label: 'Fees Collected Today', value: 'KES 428,500', sub: 'M-Pesa live sync active', icon: 'payments', badge: 'Live', bc: 'text-tertiary bg-tertiary/10' },
                  { label: 'Attendance Rate', value: '94.2%', sub: 'Above average', icon: 'fact_check', badge: 'Good', bc: 'text-primary bg-primary/10' },
                  { label: 'Fee Alerts (>KES 50k)', value: '42 Cases', sub: 'Require follow-up', icon: 'warning', badge: 'Action', bc: 'text-error bg-error/10' },
                ].map(s => (
                  <div key={s.label} className="tonal-card rounded-xl p-md">
                    <div className="flex items-start justify-between mb-sm">
                      <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center">
                        <span className="material-symbols-outlined text-primary">{s.icon}</span>
                      </div>
                      <span className={clsx('text-label-sm font-bold px-sm py-xs rounded-full', s.bc)}>{s.badge}</span>
                    </div>
                    <p className="text-body-sm text-secondary mb-xs">{s.label}</p>
                    <p className="text-headline-sm font-bold text-on-surface">{s.value}</p>
                    <p className="text-label-sm text-secondary mt-xs">{s.sub}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
                <div className="lg:col-span-2 tonal-card rounded-xl p-lg">
                  <h3 className="text-title-md font-bold mb-md">Monthly Fee Collection — Term 2, 2024</h3>
                  <div className="flex items-end gap-sm h-32">
                    {[{ m: 'Jan', v: 68 }, { m: 'Feb', v: 82 }, { m: 'Mar', v: 75 }, { m: 'Apr', v: 90 }, { m: 'May', v: 100 }].map(b => (
                      <div key={b.m} className="flex-1 flex flex-col items-center gap-xs">
                        <span className="text-label-sm text-primary font-bold">KES {b.v}k</span>
                        <div className="w-full bg-primary rounded-t-sm transition-all" style={{ height: `${b.v}%` }} />
                        <span className="text-label-sm text-secondary">{b.m}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="tonal-card rounded-xl p-lg">
                  <h3 className="text-title-md font-bold mb-md">M-Pesa Sync Status</h3>
                  <div className="flex items-center gap-sm mb-md">
                    <div className="relative flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" /><span className="relative inline-flex rounded-full h-3 w-3 bg-primary" /></div>
                    <span className="text-label-md font-semibold text-primary">Live Sync Active</span>
                  </div>
                  <div className="flex flex-col gap-sm text-label-md">
                    <div className="flex justify-between"><span className="text-secondary">Last sync</span><span className="font-semibold">11:42 AM</span></div>
                    <div className="flex justify-between"><span className="text-secondary">Today payments</span><span className="font-semibold text-primary">KES 428,500</span></div>
                    <div className="flex justify-between"><span className="text-secondary">STK pushed today</span><span className="font-semibold">87 requests</span></div>
                    <div className="flex justify-between"><span className="text-secondary">Success rate</span><span className="font-semibold text-primary">94.2%</span></div>
                    <div className="flex justify-between"><span className="text-secondary">Paybill</span><span className="font-semibold">522522</span></div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg">
                <div className="tonal-card rounded-xl p-lg">
                  <h3 className="text-title-md font-bold mb-md">Recent Activity</h3>
                  <div className="flex flex-col divide-y divide-outline-variant">
                    {activities.map((a, i) => (
                      <div key={i} className="flex items-start gap-md py-sm">
                        <div className={clsx('w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0', a.iconBg)}>
                          <span className="material-symbols-outlined text-[18px]">{a.icon}</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-label-md font-semibold">{a.title}</p>
                          <p className="text-label-sm text-secondary">{a.desc}</p>
                        </div>
                        <span className="text-label-sm text-secondary whitespace-nowrap">{a.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="tonal-card rounded-xl p-lg">
                  <h3 className="text-title-md font-bold mb-md">CBE Mastery Index — Grade 4</h3>
                  {[
                    { subject: 'Numeracy', pct: 88, level: 'Meeting' },
                    { subject: 'Language & Communication', pct: 76, level: 'Approaching' },
                    { subject: 'Science & Technology', pct: 92, level: 'Exceeding' },
                    { subject: 'Social Studies', pct: 81, level: 'Meeting' },
                    { subject: 'Creative Arts', pct: 70, level: 'Approaching' },
                  ].map(s => (
                    <div key={s.subject} className="mb-sm">
                      <div className="flex justify-between text-label-sm mb-xs">
                        <span className="text-secondary">{s.subject}</span>
                        <span className="font-bold text-primary">{s.pct}% · {s.level}</span>
                      </div>
                      <div className="h-1.5 bg-surface-container rounded-full">
                        <div className="h-1.5 bg-primary rounded-full" style={{ width: `${s.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── STUDENTS ── */}
          {tab === 'Students' && (
            <div className="flex flex-col gap-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-xs bg-surface-container border border-outline-variant rounded-lg px-md py-sm w-72">
                  <span className="material-symbols-outlined text-[18px] text-secondary">search</span>
                  <input className="bg-transparent text-body-md outline-none w-full placeholder:text-secondary" placeholder="Search by name or admission no..." />
                </div>
                <div className="flex gap-sm">
                  <select className="border border-outline-variant rounded-lg px-md py-sm text-body-md bg-white outline-none">
                    <option>All Grades</option><option>Grade 1</option><option>Grade 4</option><option>Grade 6</option>
                  </select>
                  <button className="flex items-center gap-xs bg-primary text-on-primary px-md py-sm rounded-lg text-label-md font-semibold hover:opacity-90">
                    <span className="material-symbols-outlined text-[18px]">person_add</span> Register Student
                  </button>
                </div>
              </div>
              <div className="tonal-card rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead className="bg-surface-container-low">
                    <tr>{['Adm No.', 'Name', 'Class', 'Parent/Guardian', 'Phone', 'Fee Status', 'Attendance', 'Actions'].map(h => (
                      <th key={h} className="text-left px-md py-sm text-label-sm font-bold text-secondary uppercase whitespace-nowrap">{h}</th>
                    ))}</tr>
                  </thead>
                  <tbody>
                    {students.map(s => (
                      <tr key={s.adm} className="border-t border-outline-variant hover:bg-surface-container-low transition-colors">
                        <td className="px-md py-md text-label-sm font-mono text-secondary">{s.adm}</td>
                        <td className="px-md py-md text-label-md font-semibold whitespace-nowrap">{s.name}</td>
                        <td className="px-md py-md text-body-md text-secondary whitespace-nowrap">{s.grade}</td>
                        <td className="px-md py-md text-body-md text-secondary whitespace-nowrap">{s.parent}</td>
                        <td className="px-md py-md text-body-md text-secondary whitespace-nowrap">{s.phone}</td>
                        <td className="px-md py-md">
                          <span className={clsx('text-label-sm font-bold px-sm py-xs rounded-full whitespace-nowrap', s.fees === 'Paid' ? 'bg-primary/10 text-primary' : s.fees === 'Partial' ? 'bg-yellow-100 text-yellow-700' : 'bg-error/10 text-error')}>{s.fees}</span>
                        </td>
                        <td className="px-md py-md">
                          <div className="flex items-center gap-sm">
                            <div className="w-16 h-1.5 bg-surface-container rounded-full">
                              <div className={clsx('h-1.5 rounded-full', s.attendance >= 90 ? 'bg-primary' : s.attendance >= 75 ? 'bg-yellow-400' : 'bg-error')} style={{ width: `${s.attendance}%` }} />
                            </div>
                            <span className="text-label-sm font-semibold">{s.attendance}%</span>
                          </div>
                        </td>
                        <td className="px-md py-md">
                          <div className="flex gap-xs">
                            <button className="p-xs hover:bg-surface-container rounded"><span className="material-symbols-outlined text-[18px] text-secondary">visibility</span></button>
                            <button className="p-xs hover:bg-surface-container rounded"><span className="material-symbols-outlined text-[18px] text-secondary">edit</span></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Promotion Panel */}
              <div className="tonal-card rounded-xl p-lg border-2 border-dashed border-outline-variant">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-title-md font-bold">End-of-Year Student Promotion</h3>
                    <p className="text-body-md text-secondary">Promote qualifying students to the next grade or mark for repetition</p>
                  </div>
                  <button onClick={() => setPromoteStep(!promoteStep)} className="px-md py-sm bg-tertiary text-on-tertiary rounded-lg text-label-md font-semibold hover:opacity-90">
                    {promoteStep ? 'Close' : 'Run Promotion Wizard'}
                  </button>
                </div>
                {promoteStep && (
                  <div className="mt-lg flex flex-col gap-md">
                    <div className="grid grid-cols-3 gap-md text-center">
                      {[
                        { label: 'Eligible for Promotion', value: '1,198', color: 'text-primary' },
                        { label: 'Repeat Recommended', value: '52', color: 'text-yellow-600' },
                        { label: 'Pending Review', value: '34', color: 'text-secondary' },
                      ].map(s => (
                        <div key={s.label} className="bg-surface-container-low rounded-xl p-md">
                          <p className={clsx('text-headline-sm font-bold', s.color)}>{s.value}</p>
                          <p className="text-label-sm text-secondary">{s.label}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-sm justify-end">
                      <button className="px-md py-sm border border-outline-variant rounded-lg text-label-md text-secondary">Review Individually</button>
                      <button className="px-md py-sm bg-primary text-on-primary rounded-lg text-label-md font-bold hover:opacity-90">Confirm & Promote All Eligible</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── STAFF ── */}
          {tab === 'Staff' && (
            <div className="flex flex-col gap-md">
              <div className="flex justify-end">
                <button className="flex items-center gap-xs bg-primary text-on-primary px-md py-sm rounded-lg text-label-md font-semibold hover:opacity-90">
                  <span className="material-symbols-outlined text-[18px]">person_add</span> Add Staff Member
                </button>
              </div>
              <div className="tonal-card rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead className="bg-surface-container-low">
                    <tr>{['Name', 'Role', 'Classes', 'Phone', 'Status', 'Actions'].map(h => (
                      <th key={h} className="text-left px-md py-sm text-label-sm font-bold text-secondary uppercase">{h}</th>
                    ))}</tr>
                  </thead>
                  <tbody>
                    {staff.map(s => (
                      <tr key={s.name} className="border-t border-outline-variant hover:bg-surface-container-low transition-colors">
                        <td className="px-md py-md">
                          <div className="flex items-center gap-sm">
                            <div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-label-sm">{s.name.split(' ').slice(-1)[0][0]}</div>
                            <span className="text-label-md font-semibold whitespace-nowrap">{s.name}</span>
                          </div>
                        </td>
                        <td className="px-md py-md text-body-md text-secondary">{s.role}</td>
                        <td className="px-md py-md text-body-md text-secondary">{s.classes}</td>
                        <td className="px-md py-md text-body-md text-secondary whitespace-nowrap">{s.phone}</td>
                        <td className="px-md py-md">
                          <span className={clsx('text-label-sm font-bold px-sm py-xs rounded-full', s.status === 'Active' ? 'bg-primary/10 text-primary' : 'bg-yellow-100 text-yellow-700')}>{s.status}</span>
                        </td>
                        <td className="px-md py-md">
                          <div className="flex gap-xs">
                            <button className="p-xs hover:bg-surface-container rounded"><span className="material-symbols-outlined text-[18px] text-secondary">edit</span></button>
                            <button className="p-xs hover:bg-surface-container rounded"><span className="material-symbols-outlined text-[18px] text-secondary">message</span></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── CLASSES ── */}
          {tab === 'Classes' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
              {classes.map(c => (
                <div key={c.name} className="tonal-card rounded-xl p-lg hover:shadow-md transition-all">
                  <div className="flex items-start justify-between mb-md">
                    <div className="w-12 h-12 bg-primary text-on-primary rounded-xl flex items-center justify-center">
                      <span className="material-symbols-outlined icon-filled">class</span>
                    </div>
                    <span className="text-label-sm bg-surface-container px-sm py-xs rounded-full text-secondary font-semibold">Stream {c.stream}</span>
                  </div>
                  <h3 className="text-title-md font-bold mb-xs">{c.name}</h3>
                  <p className="text-label-sm text-secondary mb-md">{c.teacher} · {c.subjects} subjects</p>
                  <div className="flex items-center justify-between text-label-md">
                    <span className="text-secondary">{c.students} students enrolled</span>
                    <button className="text-primary font-semibold hover:underline">Manage</button>
                  </div>
                </div>
              ))}
              <button className="tonal-card rounded-xl p-lg flex flex-col items-center justify-center gap-sm text-secondary hover:border-primary border-2 border-dashed border-outline-variant transition-colors min-h-[160px]">
                <span className="material-symbols-outlined text-[32px]">add_circle</span>
                <span className="text-label-md font-semibold">Add New Class</span>
              </button>
            </div>
          )}

          {/* ── ACADEMIC SETUP ── */}
          {tab === 'Academic Setup' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg">
              <div className="tonal-card rounded-xl p-lg">
                <h3 className="text-title-md font-bold mb-md">Academic Year & Terms</h3>
                <div className="flex flex-col gap-md">
                  <div className="bg-surface-container-low rounded-xl p-md">
                    <div className="flex items-center justify-between mb-sm">
                      <span className="text-label-md font-bold">2024 Academic Year</span>
                      <span className="text-label-sm bg-primary/10 text-primary font-bold px-sm py-xs rounded-full">Current</span>
                    </div>
                    {[
                      { term: 'Term 1', dates: 'Jan 8 – Apr 5, 2024', status: 'Completed' },
                      { term: 'Term 2', dates: 'Apr 29 – Aug 2, 2024', status: 'Active' },
                      { term: 'Term 3', dates: 'Sep 2 – Nov 29, 2024', status: 'Upcoming' },
                    ].map(t => (
                      <div key={t.term} className={clsx('flex items-center justify-between py-sm border-t border-outline-variant', t.status === 'Active' && 'text-primary')}>
                        <div>
                          <p className="text-label-md font-semibold">{t.term}</p>
                          <p className="text-label-sm text-secondary">{t.dates}</p>
                        </div>
                        <span className={clsx('text-label-sm font-bold px-sm py-xs rounded-full', t.status === 'Active' ? 'bg-primary/10 text-primary' : t.status === 'Completed' ? 'bg-surface-container text-secondary' : 'bg-yellow-100 text-yellow-700')}>{t.status}</span>
                      </div>
                    ))}
                  </div>
                  <button className="w-full border-2 border-dashed border-outline-variant rounded-lg py-sm text-label-md text-secondary hover:border-primary hover:text-primary transition-colors">+ Create 2025 Academic Year</button>
                </div>
              </div>

              <div className="tonal-card rounded-xl p-lg">
                <h3 className="text-title-md font-bold mb-md">Feature Settings</h3>
                <p className="text-body-sm text-secondary mb-md">These features were enabled during school setup. Contact Super Admin to change.</p>
                {[
                  { key: 'CBE Assessment', icon: 'auto_awesome', enabled: true, desc: 'EE/ME/AE/BE rubric grading active' },
                  { key: 'SMS Notifications', icon: 'sms', enabled: true, desc: '87 SMS sent today' },
                  { key: 'Transport Management', icon: 'directions_bus', enabled: true, desc: '3 routes, 105 students allocated' },
                  { key: 'Library System', icon: 'menu_book', enabled: true, desc: '1,240 books in catalog' },
                ].map(f => (
                  <div key={f.key} className="flex items-center justify-between py-md border-b border-outline-variant last:border-0">
                    <div className="flex items-center gap-sm">
                      <span className={clsx('material-symbols-outlined', f.enabled ? 'text-primary' : 'text-secondary')}>{f.icon}</span>
                      <div>
                        <p className="text-label-md font-semibold">{f.key}</p>
                        <p className="text-label-sm text-secondary">{f.desc}</p>
                      </div>
                    </div>
                    <span className={clsx('text-label-sm font-bold px-sm py-xs rounded-full', f.enabled ? 'bg-primary/10 text-primary' : 'bg-surface-container text-secondary')}>{f.enabled ? 'ON' : 'OFF'}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── COMMUNICATION ── */}
          {tab === 'Communication' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg">
              <div className="tonal-card rounded-xl p-lg">
                <h3 className="text-title-md font-bold mb-md">Send Announcement</h3>
                <div className="flex flex-col gap-md">
                  <div>
                    <label className="text-label-md font-semibold block mb-xs">Subject</label>
                    <input className="w-full border border-outline-variant rounded-lg px-md py-sm text-body-md outline-none focus:border-primary" placeholder="e.g. End-Term Exam Schedule" defaultValue="End-Term Exams — June 25, 2024" />
                  </div>
                  <div>
                    <label className="text-label-md font-semibold block mb-xs">Send To</label>
                    <select className="w-full border border-outline-variant rounded-lg px-md py-sm text-body-md outline-none bg-white">
                      <option>All Parents (1,284 recipients)</option><option>All Teachers (42 staff)</option><option>Grade 4 Parents only</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-label-md font-semibold block mb-xs">Message</label>
                    <textarea rows={4} className="w-full border border-outline-variant rounded-lg px-md py-sm text-body-md outline-none focus:border-primary resize-none" defaultValue="Dear Parent/Guardian, End-Term examinations will begin on June 25, 2024. Students should come prepared with all stationery. Results will be shared within 7 days via this portal." />
                  </div>
                  <div className="flex gap-sm">
                    <label className="flex items-center gap-xs cursor-pointer text-label-md"><input type="checkbox" defaultChecked className="accent-primary" /> Send SMS</label>
                    <label className="flex items-center gap-xs cursor-pointer text-label-md"><input type="checkbox" defaultChecked className="accent-primary" /> Portal Notification</label>
                  </div>
                  <button className="bg-primary text-on-primary px-md py-sm rounded-lg text-label-md font-bold hover:opacity-90 flex items-center justify-center gap-xs">
                    <span className="material-symbols-outlined text-[18px]">send</span> Send Announcement
                  </button>
                </div>
              </div>
              <div className="tonal-card rounded-xl p-lg">
                <h3 className="text-title-md font-bold mb-md">Recent Announcements</h3>
                {[
                  { title: 'End-Term Exams', sent: 'Jun 15, 2024', recipients: 1284, sms: true },
                  { title: 'Sports Day — June 22', sent: 'Jun 12, 2024', recipients: 1284, sms: true },
                  { title: 'Library Books Return', sent: 'Jun 10, 2024', recipients: 342, sms: false },
                  { title: 'Fee Reminder — Balance Due', sent: 'Jun 8, 2024', recipients: 42, sms: true },
                ].map((a, i) => (
                  <div key={i} className="flex items-start justify-between py-md border-b border-outline-variant last:border-0">
                    <div>
                      <p className="text-label-md font-semibold">{a.title}</p>
                      <p className="text-label-sm text-secondary">{a.sent} · {a.recipients} recipients {a.sms ? '· SMS sent' : ''}</p>
                    </div>
                    <button className="text-label-sm text-primary font-semibold hover:underline">View</button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
