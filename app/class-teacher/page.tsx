'use client'
import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import clsx from 'clsx'

const navItems = [
  { label: 'Dashboard', icon: 'dashboard', href: '/class-teacher' },
  { label: 'Class Attendance', icon: 'fact_check', href: '/class-teacher/attendance' },
  { label: 'Discipline Records', icon: 'gavel', href: '/class-teacher/discipline' },
  { label: 'Student Profiles', icon: 'person', href: '/class-teacher/students' },
  { label: 'Parent Communication', icon: 'message', href: '/class-teacher/communication' },
  { label: 'Class Performance', icon: 'bar_chart', href: '/class-teacher/performance' },
  { label: 'Report Generation', icon: 'summarize', href: '/class-teacher/reports' },
  { label: 'Announcements', icon: 'campaign', href: '/class-teacher/announcements' },
]
const bottomItems = [
  { label: 'Settings', icon: 'settings', href: '/class-teacher/settings' },
  { label: 'Support', icon: 'help', href: '/class-teacher/support' },
]

const students = [
  { name: 'Amina Odhiambo', adm: 'GW-4A-001', attendance: 98, grade: 'A', midterm: 92, status: 'Excellent' },
  { name: 'Kelvin Mwai', adm: 'GW-4A-002', attendance: 85, grade: 'B+', midterm: 78, status: 'Good' },
  { name: 'Zara Abdi', adm: 'GW-4A-003', attendance: 72, grade: 'C+', midterm: 62, status: 'Needs Attention' },
  { name: 'Brian Otieno', adm: 'GW-4A-004', attendance: 60, grade: 'C', midterm: 54, status: 'At Risk' },
  { name: 'Faith Wanjiku', adm: 'GW-4A-005', attendance: 95, grade: 'A-', midterm: 88, status: 'Excellent' },
  { name: 'Hassan Nur', adm: 'GW-4A-006', attendance: 80, grade: 'B', midterm: 71, status: 'Good' },
]

const parentMessages = [
  { parent: 'Mrs. Odhiambo', student: 'Amina', msg: "Can we discuss Amina's progress in science?", time: '9:14 AM', unread: true },
  { parent: 'Mr. Mwai', student: 'Kelvin', msg: 'Kelvin will be absent tomorrow — doctor appointment.', time: 'Yesterday', unread: false },
  { parent: 'Mr. Otieno', student: 'Brian', msg: "I'm concerned about Brian's attendance. Can we meet?", time: '2 days ago', unread: true },
]

const disciplineRecords = [
  { student: 'Brian Otieno', issue: 'Truancy — missed 3 consecutive days', date: 'Jun 14', action: 'Parent notified', severity: 'High' },
  { student: 'Hassan Nur', issue: 'Late arrival (3rd time this term)', date: 'Jun 12', action: 'Counselled', severity: 'Medium' },
  { student: 'Zara Abdi', issue: 'Incomplete homework (repeated)', date: 'Jun 10', action: 'Parent informed', severity: 'Low' },
]

const weekAttendance = [
  { day: 'Mon', pct: 94 }, { day: 'Tue', pct: 91 }, { day: 'Wed', pct: 88 }, { day: 'Thu', pct: 97 }, { day: 'Fri', pct: 84 },
]

const TABS = ['Dashboard', 'Student Profiles', 'Attendance', 'Discipline', 'Parent Messages', 'Reports']

export default function ClassTeacherPage() {
  const [tab, setTab] = useState('Dashboard')
  const [msgDraft, setMsgDraft] = useState('')
  const [msgSent, setMsgSent] = useState(false)

  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar title="MottiManager" subtitle="Class Teacher Portal" navItems={navItems} bottomItems={bottomItems} userName="Ms. Grace Njeri" userRole="Class Teacher — 4A" />
      <main className="ml-64 flex-1 flex flex-col min-h-screen">
        <div className="sticky top-0 z-10 bg-surface-container-lowest border-b border-outline-variant px-lg py-md flex items-center justify-between">
          <div>
            <h1 className="text-headline-sm font-bold text-on-surface">Class 4A Dashboard</h1>
            <p className="text-body-md text-secondary">Greenwood Academy · Term 2, 2024 · 32 students enrolled</p>
          </div>
          <div className="flex gap-sm">
            <button onClick={() => setTab('Reports')} className="flex items-center gap-xs px-md py-sm border border-outline-variant rounded-lg text-label-md text-secondary hover:bg-surface-container">
              <span className="material-symbols-outlined text-[18px]">print</span> Print Report
            </button>
            <button onClick={() => setTab('Parent Messages')} className="flex items-center gap-xs bg-primary text-on-primary px-md py-sm rounded-lg text-label-md font-semibold hover:opacity-90">
              <span className="material-symbols-outlined text-[18px]">message</span> Message Parent
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
                  { label: 'Total Students', value: '32', sub: 'Grade 4A', icon: 'groups', badge: 'Enrolled', bc: 'text-secondary bg-surface-container' },
                  { label: 'Avg Attendance', value: '88%', sub: 'This week', icon: 'fact_check', badge: 'Good', bc: 'text-primary bg-primary/10' },
                  { label: 'Discipline Cases', value: '3', sub: 'This term', icon: 'gavel', badge: 'Review', bc: 'text-error bg-error/10' },
                  { label: 'Class Avg Grade', value: 'B+', sub: 'Mid-term', icon: 'grade', badge: 'Term 2', bc: 'text-tertiary bg-tertiary/10' },
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

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg">
                <div className="tonal-card rounded-xl p-lg">
                  <h3 className="text-title-md font-bold mb-md">Weekly Attendance — Class 4A</h3>
                  <div className="flex items-end gap-sm h-32">
                    {weekAttendance.map(d => (
                      <div key={d.day} className="flex-1 flex flex-col items-center gap-xs">
                        <span className="text-label-sm text-primary font-bold">{d.pct}%</span>
                        <div className="w-full rounded-t-sm transition-all" style={{ height: `${d.pct}%`, background: d.pct >= 90 ? '#006b2c' : d.pct >= 80 ? '#00628d' : '#ba1a1a' }} />
                        <span className="text-label-sm text-secondary">{d.day}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="tonal-card rounded-xl p-lg">
                  <h3 className="text-title-md font-bold mb-md">Class Performance by Subject</h3>
                  {[
                    { subject: 'Mathematics', avg: 76, teacher: 'Mr. Ochieng' },
                    { subject: 'English Language', avg: 82, teacher: 'Mr. Kamau' },
                    { subject: 'Science', avg: 70, teacher: 'Ms. Achieng' },
                    { subject: 'Kiswahili', avg: 79, teacher: 'Ms. Wanjiku' },
                  ].map(s => (
                    <div key={s.subject} className="mb-sm">
                      <div className="flex justify-between text-label-sm mb-xs">
                        <span className="text-secondary">{s.subject} <span className="opacity-60">· {s.teacher}</span></span>
                        <span className="font-bold text-primary">{s.avg}%</span>
                      </div>
                      <div className="h-1.5 bg-surface-container rounded-full">
                        <div className="h-1.5 bg-primary rounded-full" style={{ width: `${s.avg}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="tonal-card rounded-xl p-lg">
                <div className="flex items-center justify-between mb-md">
                  <h3 className="text-title-md font-bold">Students Requiring Attention</h3>
                  <button onClick={() => setTab('Student Profiles')} className="text-label-md text-primary font-semibold hover:underline">View All</button>
                </div>
                <div className="flex flex-col divide-y divide-outline-variant">
                  {students.filter(s => s.status === 'At Risk' || s.status === 'Needs Attention').map(s => (
                    <div key={s.adm} className="flex items-center justify-between py-md gap-md">
                      <div className="flex items-center gap-sm">
                        <div className="w-8 h-8 rounded-full bg-error/10 text-error flex items-center justify-center font-bold text-label-sm">
                          {s.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <div>
                          <p className="text-label-md font-semibold">{s.name}</p>
                          <p className="text-label-sm text-secondary">Attendance: {s.attendance}% · Grade: {s.grade}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-sm">
                        <span className={clsx('text-label-sm font-bold px-sm py-xs rounded-full', s.status === 'At Risk' ? 'bg-error/10 text-error' : 'bg-yellow-100 text-yellow-700')}>{s.status}</span>
                        <button onClick={() => setTab('Parent Messages')} className="text-label-sm text-primary font-semibold hover:underline whitespace-nowrap">Contact Parent</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── STUDENT PROFILES ── */}
          {tab === 'Student Profiles' && (
            <div className="tonal-card rounded-xl overflow-hidden">
              <div className="p-md border-b border-outline-variant flex items-center gap-md">
                <div className="flex items-center gap-xs bg-surface-container border border-outline-variant rounded-lg px-md py-sm flex-1">
                  <span className="material-symbols-outlined text-[18px] text-secondary">search</span>
                  <input className="bg-transparent text-body-md outline-none w-full placeholder:text-secondary" placeholder="Search students..." />
                </div>
              </div>
              <table className="w-full">
                <thead className="bg-surface-container-low">
                  <tr>{['Adm No.', 'Student', 'Attendance', 'Mid-Term', 'Grade', 'Status', 'Actions'].map(h => (
                    <th key={h} className="text-left px-md py-sm text-label-sm font-bold text-secondary uppercase whitespace-nowrap">{h}</th>
                  ))}</tr>
                </thead>
                <tbody>
                  {students.map(s => (
                    <tr key={s.adm} className="border-t border-outline-variant hover:bg-surface-container-low transition-colors">
                      <td className="px-md py-md text-label-sm font-mono text-secondary">{s.adm}</td>
                      <td className="px-md py-md">
                        <div className="flex items-center gap-sm">
                          <div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-label-sm">
                            {s.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </div>
                          <span className="text-label-md font-semibold whitespace-nowrap">{s.name}</span>
                        </div>
                      </td>
                      <td className="px-md py-md">
                        <div className="flex items-center gap-sm">
                          <div className="w-16 h-1.5 bg-surface-container rounded-full">
                            <div className={clsx('h-1.5 rounded-full', s.attendance >= 90 ? 'bg-primary' : s.attendance >= 75 ? 'bg-yellow-400' : 'bg-error')} style={{ width: `${s.attendance}%` }} />
                          </div>
                          <span className="text-label-sm font-semibold">{s.attendance}%</span>
                        </div>
                      </td>
                      <td className="px-md py-md text-label-md font-semibold">{s.midterm}/100</td>
                      <td className="px-md py-md"><span className={clsx('text-label-md font-bold', s.midterm >= 80 ? 'text-primary' : s.midterm >= 60 ? 'text-tertiary' : 'text-error')}>{s.grade}</span></td>
                      <td className="px-md py-md">
                        <span className={clsx('text-label-sm font-bold px-sm py-xs rounded-full whitespace-nowrap', s.status === 'Excellent' ? 'bg-primary/10 text-primary' : s.status === 'Good' ? 'bg-tertiary/10 text-tertiary' : s.status === 'At Risk' ? 'bg-error/10 text-error' : 'bg-yellow-100 text-yellow-700')}>{s.status}</span>
                      </td>
                      <td className="px-md py-md">
                        <div className="flex gap-xs">
                          <button className="p-xs hover:bg-surface-container rounded"><span className="material-symbols-outlined text-[18px] text-secondary">visibility</span></button>
                          <button onClick={() => setTab('Parent Messages')} className="p-xs hover:bg-surface-container rounded"><span className="material-symbols-outlined text-[18px] text-secondary">message</span></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* ── ATTENDANCE ── */}
          {tab === 'Attendance' && (
            <div className="flex flex-col gap-lg">
              <div className="tonal-card rounded-xl overflow-hidden">
                <div className="p-md border-b border-outline-variant bg-surface-container-low flex items-center justify-between">
                  <div>
                    <h3 className="text-title-md font-bold">Daily Attendance — Grade 4A</h3>
                    <p className="text-body-sm text-secondary">Monday, June 16, 2024</p>
                  </div>
                  <button className="bg-primary text-on-primary px-md py-sm rounded-lg text-label-md font-bold hover:opacity-90">Submit Attendance</button>
                </div>
                <div className="divide-y divide-outline-variant">
                  {students.map(s => (
                    <div key={s.adm} className="flex items-center justify-between px-lg py-sm gap-md">
                      <div className="flex items-center gap-sm">
                        <div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-label-sm">
                          {s.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <p className="text-label-md font-semibold">{s.name}</p>
                      </div>
                      <div className="flex gap-xs">
                        {['Present', 'Late', 'Absent'].map(opt => (
                          <button key={opt} className={clsx('text-label-sm px-sm py-xs rounded-full font-semibold', opt === 'Present' ? 'bg-primary text-on-primary' : 'bg-surface-container text-secondary hover:bg-surface-variant')}>
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── DISCIPLINE ── */}
          {tab === 'Discipline' && (
            <div className="flex flex-col gap-md">
              <div className="flex items-center justify-between">
                <h3 className="text-title-md font-bold">Discipline Records — Term 2, 2024</h3>
                <button className="flex items-center gap-xs bg-primary text-on-primary px-md py-sm rounded-lg text-label-md font-semibold hover:opacity-90">
                  <span className="material-symbols-outlined text-[18px]">add</span> Log Incident
                </button>
              </div>
              {disciplineRecords.map((d, i) => (
                <div key={i} className="tonal-card rounded-xl p-md flex items-start gap-md">
                  <div className={clsx('w-2 h-12 rounded-full flex-shrink-0 mt-xs', d.severity === 'High' ? 'bg-error' : d.severity === 'Medium' ? 'bg-yellow-400' : 'bg-outline')} />
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-md">
                      <div>
                        <p className="text-label-md font-bold">{d.student}</p>
                        <p className="text-body-md">{d.issue}</p>
                        <p className="text-label-sm text-secondary mt-xs">Action taken: {d.action} · {d.date}</p>
                      </div>
                      <span className={clsx('text-label-sm font-bold px-sm py-xs rounded-full whitespace-nowrap flex-shrink-0', d.severity === 'High' ? 'bg-error/10 text-error' : d.severity === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-surface-container text-secondary')}>{d.severity}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── PARENT MESSAGES ── */}
          {tab === 'Parent Messages' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg">
              <div className="tonal-card rounded-xl overflow-hidden">
                <div className="p-md border-b border-outline-variant">
                  <h3 className="text-title-md font-bold">Parent Messages</h3>
                </div>
                <div className="divide-y divide-outline-variant">
                  {parentMessages.map((m, i) => (
                    <div key={i} className={clsx('flex items-start gap-md p-md cursor-pointer hover:bg-surface-container-low transition-colors', m.unread && 'bg-primary/5')}>
                      <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-label-sm flex-shrink-0">
                        {m.parent.split(' ')[1]?.[0] ?? m.parent[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-xs">
                          <p className="text-label-md font-bold">{m.parent}</p>
                          <span className="text-label-sm text-secondary whitespace-nowrap">{m.time}</span>
                        </div>
                        <p className="text-body-sm text-secondary truncate">Re: {m.student} — {m.msg}</p>
                      </div>
                      {m.unread && <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1" />}
                    </div>
                  ))}
                </div>
              </div>

              <div className="tonal-card rounded-xl p-lg">
                <h3 className="text-title-md font-bold mb-md">Send Message to Parent</h3>
                <div className="flex flex-col gap-md">
                  <div>
                    <label className="text-label-md font-semibold block mb-xs">Select Student</label>
                    <select className="w-full border border-outline-variant rounded-lg px-md py-sm text-body-md outline-none bg-white">
                      {students.map(s => <option key={s.adm}>{s.name} — {s.adm}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-label-md font-semibold block mb-xs">Message</label>
                    <textarea rows={5} value={msgDraft} onChange={e => setMsgDraft(e.target.value)} className="w-full border border-outline-variant rounded-lg px-md py-sm text-body-md outline-none focus:border-primary resize-none" placeholder="Type your message to the parent..." />
                  </div>
                  <div className="flex gap-sm">
                    <label className="flex items-center gap-xs cursor-pointer text-label-md"><input type="checkbox" defaultChecked className="accent-primary" /> Send SMS</label>
                    <label className="flex items-center gap-xs cursor-pointer text-label-md"><input type="checkbox" defaultChecked className="accent-primary" /> Portal notification</label>
                  </div>
                  <button onClick={() => { setMsgSent(true); setMsgDraft(''); setTimeout(() => setMsgSent(false), 3000) }} className={clsx('py-sm rounded-lg text-label-md font-bold transition-all flex items-center justify-center gap-xs', msgSent ? 'bg-primary/10 text-primary' : 'bg-primary text-on-primary hover:opacity-90')}>
                    <span className="material-symbols-outlined text-[18px]">{msgSent ? 'check' : 'send'}</span>
                    {msgSent ? 'Message Sent!' : 'Send Message'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ── REPORTS ── */}
          {tab === 'Reports' && (
            <div className="flex flex-col gap-lg">
              <div className="tonal-card rounded-xl p-lg">
                <h3 className="text-title-md font-bold mb-sm">Generate Class Report Cards</h3>
                <p className="text-body-md text-secondary mb-md">Generate end-term report cards for all students in Grade 4A. Report cards include attendance, grades, CBE mastery, teacher comments, and class position.</p>
                <div className="flex gap-sm">
                  <select className="border border-outline-variant rounded-lg px-md py-sm text-body-md bg-white outline-none">
                    <option>Term 2, 2024</option><option>Term 1, 2024</option>
                  </select>
                  <button className="flex items-center gap-xs bg-primary text-on-primary px-md py-sm rounded-lg text-label-md font-semibold hover:opacity-90">
                    <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span> Generate Report Cards (32)
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
                {[
                  { label: 'Report Cards Generated', value: '32', icon: 'description', color: 'text-primary' },
                  { label: 'Sent to Parent Portal', value: '32', icon: 'send', color: 'text-primary' },
                  { label: 'Downloaded by Parents', value: '28', icon: 'download', color: 'text-tertiary' },
                ].map(s => (
                  <div key={s.label} className="tonal-card rounded-xl p-lg text-center">
                    <span className={clsx('material-symbols-outlined text-[32px] mb-sm', s.color)}>{s.icon}</span>
                    <p className={clsx('text-headline-sm font-bold', s.color)}>{s.value}</p>
                    <p className="text-body-sm text-secondary">{s.label}</p>
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
