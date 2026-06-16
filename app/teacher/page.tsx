'use client'
import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import clsx from 'clsx'

const navItems = [
  { label: 'Dashboard', icon: 'dashboard', href: '/teacher' },
  { label: 'My Classes', icon: 'class', href: '/teacher/classes' },
  { label: 'My Subjects', icon: 'book', href: '/teacher/subjects' },
  { label: 'Attendance', icon: 'fact_check', href: '/teacher/attendance' },
  { label: 'Exam Marks', icon: 'grade', href: '/teacher/marks' },
  { label: 'Assignments', icon: 'assignment', href: '/teacher/assignments' },
  { label: 'CBE Assessment', icon: 'auto_awesome', href: '/teacher/cbe' },
  { label: 'Timetable', icon: 'calendar_month', href: '/teacher/timetable' },
  { label: 'Announcements', icon: 'campaign', href: '/teacher/announcements' },
]
const bottomItems = [
  { label: 'Settings', icon: 'settings', href: '/teacher/settings' },
  { label: 'Support', icon: 'help', href: '/teacher/support' },
]

const myClasses = [
  { grade: 'Grade 4A', subject: 'Mathematics', students: 32, attendance: 94, next: 'Today 10:00 AM' },
  { grade: 'Grade 5B', subject: 'Science', students: 28, attendance: 89, next: 'Today 1:00 PM' },
  { grade: 'Grade 6A', subject: 'Mathematics', students: 35, attendance: 97, next: 'Tomorrow 8:00 AM' },
]

const attendanceStudents = [
  { name: 'Amina Odhiambo', adm: 'GW-4A-001', status: 'Present' },
  { name: 'Kelvin Mwai', adm: 'GW-4A-002', status: 'Present' },
  { name: 'Zara Abdi', adm: 'GW-4A-003', status: 'Absent' },
  { name: 'Brian Otieno', adm: 'GW-4A-004', status: 'Late' },
  { name: 'Faith Wanjiku', adm: 'GW-4A-005', status: 'Present' },
  { name: 'Hassan Nur', adm: 'GW-4A-006', status: 'Present' },
  { name: 'Grace Chebet', adm: 'GW-4A-007', status: 'Absent' },
]

const marksStudents = [
  { name: 'Amina Odhiambo', adm: 'GW-4A-001', marks: 92 },
  { name: 'Kelvin Mwai', adm: 'GW-4A-002', marks: 78 },
  { name: 'Zara Abdi', adm: 'GW-4A-003', marks: 65 },
  { name: 'Brian Otieno', adm: 'GW-4A-004', marks: 54 },
  { name: 'Faith Wanjiku', adm: 'GW-4A-005', marks: 88 },
  { name: 'Hassan Nur', adm: 'GW-4A-006', marks: 73 },
]

const cbeStudents = [
  { name: 'Amina Odhiambo', adm: 'GW-4A-001', numeracy: 'EE', language: 'ME', science: 'EE', social: 'ME' },
  { name: 'Kelvin Mwai', adm: 'GW-4A-002', numeracy: 'ME', language: 'ME', science: 'AE', social: 'ME' },
  { name: 'Zara Abdi', adm: 'GW-4A-003', numeracy: 'AE', language: 'AE', science: 'BE', social: 'AE' },
  { name: 'Brian Otieno', adm: 'GW-4A-004', numeracy: 'BE', language: 'AE', science: 'BE', social: 'BE' },
  { name: 'Faith Wanjiku', adm: 'GW-4A-005', numeracy: 'ME', language: 'EE', science: 'ME', social: 'EE' },
]

const assignments = [
  { title: 'Fractions & Decimals', class: 'Grade 4A', due: 'Jun 18, 2024', submitted: 24, total: 32, status: 'Open' },
  { title: 'Plant Biology Quiz', class: 'Grade 5B', due: 'Jun 15, 2024', submitted: 28, total: 28, status: 'Closed' },
  { title: 'Algebra Basics', class: 'Grade 6A', due: 'Jun 20, 2024', submitted: 10, total: 35, status: 'Open' },
]

const TABS = ['Dashboard', 'Mark Attendance', 'Enter Marks', 'CBE Assessment', 'Assignments']
const CBE_COLORS: Record<string, string> = { EE: 'bg-primary text-on-primary', ME: 'bg-tertiary text-on-tertiary', AE: 'bg-yellow-400 text-yellow-900', BE: 'bg-error text-on-error' }
const CBE_LABELS: Record<string, string> = { EE: 'Exceeding Expectations', ME: 'Meeting Expectations', AE: 'Approaching Expectations', BE: 'Below Expectations' }

export default function TeacherPage() {
  const [tab, setTab] = useState('Dashboard')
  const [attendance, setAttendance] = useState<Record<string, string>>(Object.fromEntries(attendanceStudents.map(s => [s.adm, s.status])))
  const [marks, setMarks] = useState<Record<string, number>>(Object.fromEntries(marksStudents.map(s => [s.adm, s.marks])))
  const [cbe, setCbe] = useState<Record<string, Record<string, string>>>(Object.fromEntries(cbeStudents.map(s => [s.adm, { numeracy: s.numeracy, language: s.language, science: s.science, social: s.social }])))
  const [attSaved, setAttSaved] = useState(false)
  const [marksSaved, setMarksSaved] = useState(false)
  const [cbeSaved, setCbeSaved] = useState(false)

  const saveAtt = () => { setAttSaved(true); setTimeout(() => setAttSaved(false), 3000) }
  const saveMarks = () => { setMarksSaved(true); setTimeout(() => setMarksSaved(false), 3000) }
  const saveCbe = () => { setCbeSaved(true); setTimeout(() => setCbeSaved(false), 3000) }

  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar title="MottiManager" subtitle="Teacher Portal" navItems={navItems} bottomItems={bottomItems} userName="Mr. James Ochieng" userRole="Mathematics Teacher" />
      <main className="ml-64 flex-1 flex flex-col min-h-screen">
        <div className="sticky top-0 z-10 bg-surface-container-lowest border-b border-outline-variant px-lg py-md flex items-center justify-between">
          <div>
            <h1 className="text-headline-sm font-bold text-on-surface">Teacher Dashboard</h1>
            <p className="text-body-md text-secondary">Good morning, James! You have 3 classes today.</p>
          </div>
          <div className="flex gap-sm">
            <button className="flex items-center gap-xs px-md py-sm border border-outline-variant rounded-lg text-label-md text-secondary hover:bg-surface-container">
              <span className="material-symbols-outlined text-[18px]">download</span> Download Report
            </button>
            <button onClick={() => setTab('Assignments')} className="flex items-center gap-xs bg-primary text-on-primary px-md py-sm rounded-lg text-label-md font-semibold hover:opacity-90">
              <span className="material-symbols-outlined text-[18px]">add</span> New Assignment
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
                  { label: 'My Classes', value: '3', sub: 'This term', icon: 'class', badge: 'Term 2', bc: 'text-secondary bg-surface-container' },
                  { label: 'Total Students', value: '95', sub: 'Across all classes', icon: 'groups', badge: '3 classes', bc: 'text-tertiary bg-tertiary/10' },
                  { label: 'Avg Attendance', value: '93.3%', sub: 'This week', icon: 'fact_check', badge: 'Good', bc: 'text-primary bg-primary/10' },
                  { label: 'Pending Marking', value: '34', sub: 'Assignments to mark', icon: 'pending_actions', badge: 'Urgent', bc: 'text-error bg-error/10' },
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
                  <h3 className="text-title-md font-bold mb-md flex items-center justify-between">My Classes Today <button className="text-label-md text-primary font-semibold">View Full Timetable</button></h3>
                  <div className="flex flex-col divide-y divide-outline-variant">
                    {myClasses.map(c => (
                      <div key={c.grade} className="py-md flex items-center justify-between gap-md">
                        <div className="flex items-center gap-md">
                          <div className="w-12 h-12 bg-primary text-on-primary rounded-xl flex items-center justify-center flex-shrink-0">
                            <span className="material-symbols-outlined icon-filled">menu_book</span>
                          </div>
                          <div>
                            <p className="text-label-md font-bold">{c.grade}</p>
                            <p className="text-body-sm text-secondary">{c.subject} · {c.students} students</p>
                            <p className="text-label-sm text-secondary">{c.next}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-md">
                          <div className="text-right">
                            <p className="text-label-sm text-secondary">Attendance</p>
                            <p className={clsx('text-label-md font-bold', c.attendance >= 90 ? 'text-primary' : 'text-error')}>{c.attendance}%</p>
                          </div>
                          <div className="flex gap-xs">
                            <button onClick={() => setTab('Mark Attendance')} className="p-sm bg-surface-container rounded-lg hover:bg-surface-variant transition-colors" title="Mark Attendance">
                              <span className="material-symbols-outlined text-[20px] text-primary">fact_check</span>
                            </button>
                            <button onClick={() => setTab('Enter Marks')} className="p-sm bg-surface-container rounded-lg hover:bg-surface-variant transition-colors" title="Enter Marks">
                              <span className="material-symbols-outlined text-[20px] text-tertiary">grade</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-md">
                  <div className="tonal-card rounded-xl p-lg">
                    <h3 className="text-title-md font-bold mb-md">Quick Actions</h3>
                    <div className="flex flex-col gap-sm">
                      {[
                        { label: 'Mark Attendance', icon: 'fact_check', tab: 'Mark Attendance', color: 'bg-primary text-on-primary' },
                        { label: 'Enter Exam Marks', icon: 'grade', tab: 'Enter Marks', color: 'bg-tertiary text-on-tertiary' },
                        { label: 'CBE Assessment', icon: 'auto_awesome', tab: 'CBE Assessment', color: 'bg-surface-container text-on-surface' },
                        { label: 'Create Assignment', icon: 'assignment_add', tab: 'Assignments', color: 'bg-surface-container text-on-surface' },
                      ].map(a => (
                        <button key={a.label} onClick={() => setTab(a.tab)} className={clsx('flex items-center gap-md px-md py-sm rounded-lg text-label-md font-semibold hover:opacity-90 transition-opacity', a.color)}>
                          <span className="material-symbols-outlined text-[20px]">{a.icon}</span>
                          {a.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="tonal-card rounded-xl p-lg">
                    <h3 className="text-title-md font-bold mb-sm">School Announcements</h3>
                    {['Mid-term exams start June 20', 'Submit all marks by June 22', 'Staff meeting Friday 3 PM'].map((a, i) => (
                      <div key={i} className="flex items-start gap-sm py-sm border-b border-outline-variant last:border-0">
                        <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">campaign</span>
                        <p className="text-body-sm">{a}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="tonal-card rounded-xl p-lg">
                <h3 className="text-title-md font-bold mb-md">Recent Assignments</h3>
                <div className="flex flex-col divide-y divide-outline-variant">
                  {assignments.map(a => (
                    <div key={a.title} className="py-md flex items-center justify-between gap-md">
                      <div>
                        <p className="text-label-md font-semibold">{a.title}</p>
                        <p className="text-label-sm text-secondary">{a.class} · Due: {a.due}</p>
                      </div>
                      <div className="flex items-center gap-md">
                        <div className="text-right">
                          <p className="text-label-sm text-secondary">Submitted</p>
                          <p className="text-label-md font-bold">{a.submitted}/{a.total}</p>
                        </div>
                        <div className="w-16 h-2 bg-surface-container rounded-full">
                          <div className="h-2 bg-primary rounded-full" style={{ width: `${(a.submitted / a.total) * 100}%` }} />
                        </div>
                        <span className={clsx('text-label-sm font-bold px-sm py-xs rounded-full whitespace-nowrap', a.status === 'Open' ? 'bg-primary/10 text-primary' : 'bg-surface-container text-secondary')}>{a.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── MARK ATTENDANCE ── */}
          {tab === 'Mark Attendance' && (
            <div className="max-w-[42rem]">
              <div className="tonal-card rounded-xl overflow-hidden">
                <div className="bg-primary text-on-primary p-md flex items-center justify-between">
                  <div>
                    <h3 className="text-title-md font-bold">Mark Attendance — Grade 4A</h3>
                    <p className="text-body-sm opacity-80">Monday, June 16, 2024 · Mathematics</p>
                  </div>
                  <span className="text-label-sm bg-white/20 px-sm py-xs rounded-full">32 students</span>
                </div>

                <div className="p-md flex gap-sm border-b border-outline-variant">
                  <button onClick={() => setAttendance(Object.fromEntries(attendanceStudents.map(s => [s.adm, 'Present'])))} className="text-label-sm px-md py-xs rounded-full bg-primary/10 text-primary font-bold">Mark All Present</button>
                  <button onClick={() => setAttendance(Object.fromEntries(attendanceStudents.map(s => [s.adm, 'Absent'])))} className="text-label-sm px-md py-xs rounded-full bg-error/10 text-error font-bold">Mark All Absent</button>
                </div>

                <div className="divide-y divide-outline-variant">
                  {attendanceStudents.map(s => (
                    <div key={s.adm} className="flex items-center justify-between px-lg py-sm">
                      <div className="flex items-center gap-sm">
                        <div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-label-sm">
                          {s.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <div>
                          <p className="text-label-md font-semibold">{s.name}</p>
                          <p className="text-label-sm text-secondary">{s.adm}</p>
                        </div>
                      </div>
                      <div className="flex gap-xs">
                        {['Present', 'Late', 'Absent'].map(opt => (
                          <button key={opt} onClick={() => setAttendance(a => ({ ...a, [s.adm]: opt }))} className={clsx('text-label-sm px-sm py-xs rounded-full font-semibold transition-all', attendance[s.adm] === opt ? opt === 'Present' ? 'bg-primary text-on-primary' : opt === 'Late' ? 'bg-yellow-400 text-yellow-900' : 'bg-error text-on-error' : 'bg-surface-container text-secondary hover:bg-surface-variant')}>
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-md border-t border-outline-variant flex items-center justify-between">
                  <div className="text-label-md text-secondary">
                    <span className="text-primary font-bold">{Object.values(attendance).filter(v => v === 'Present').length} Present</span>
                    {' · '}<span className="text-yellow-600 font-bold">{Object.values(attendance).filter(v => v === 'Late').length} Late</span>
                    {' · '}<span className="text-error font-bold">{Object.values(attendance).filter(v => v === 'Absent').length} Absent</span>
                  </div>
                  <button onClick={saveAtt} className={clsx('px-md py-sm rounded-lg text-label-md font-bold transition-all', attSaved ? 'bg-primary/10 text-primary' : 'bg-primary text-on-primary hover:opacity-90')}>
                    {attSaved ? '✓ Saved!' : 'Submit Attendance'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ── ENTER MARKS ── */}
          {tab === 'Enter Marks' && (
            <div className="max-w-[42rem]">
              <div className="tonal-card rounded-xl overflow-hidden">
                <div className="p-md border-b border-outline-variant bg-surface-container-low">
                  <h3 className="text-title-md font-bold">Enter Exam Marks — Grade 4A</h3>
                  <div className="flex gap-md mt-sm">
                    <div>
                      <label className="text-label-sm text-secondary">Exam Name</label>
                      <select className="block border border-outline-variant rounded-lg px-md py-xs text-body-md outline-none bg-white text-sm mt-xs">
                        <option>Mid-Term Mathematics</option><option>End-Term Mathematics</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-label-sm text-secondary">Out of</label>
                      <select className="block border border-outline-variant rounded-lg px-md py-xs text-body-md outline-none bg-white text-sm mt-xs">
                        <option>100</option><option>50</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="divide-y divide-outline-variant">
                  {marksStudents.map(s => {
                    const m = marks[s.adm]
                    const grade = m >= 80 ? 'A' : m >= 70 ? 'B+' : m >= 60 ? 'B' : m >= 50 ? 'C' : 'D'
                    return (
                      <div key={s.adm} className="flex items-center justify-between px-lg py-sm gap-md">
                        <div className="flex items-center gap-sm">
                          <div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-label-sm">
                            {s.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </div>
                          <div>
                            <p className="text-label-md font-semibold">{s.name}</p>
                            <p className="text-label-sm text-secondary">{s.adm}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-md">
                          <input
                            type="number" min={0} max={100} value={m}
                            onChange={e => setMarks(mk => ({ ...mk, [s.adm]: Number(e.target.value) }))}
                            className="w-16 border border-outline-variant rounded-lg px-sm py-xs text-body-md text-center outline-none focus:border-primary font-bold"
                          />
                          <span className={clsx('text-label-md font-bold w-8', m >= 70 ? 'text-primary' : m >= 50 ? 'text-yellow-600' : 'text-error')}>{grade}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
                <div className="p-md border-t border-outline-variant flex items-center justify-between bg-surface-container-low">
                  <div className="text-label-md text-secondary">
                    Class Avg: <span className="font-bold text-primary">{Math.round(Object.values(marks).reduce((a, b) => a + b, 0) / Object.values(marks).length)}/100</span>
                  </div>
                  <button onClick={saveMarks} className={clsx('px-md py-sm rounded-lg text-label-md font-bold transition-all', marksSaved ? 'bg-primary/10 text-primary' : 'bg-primary text-on-primary hover:opacity-90')}>
                    {marksSaved ? '✓ Marks Saved!' : 'Publish Marks'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ── CBE ASSESSMENT ── */}
          {tab === 'CBE Assessment' && (
            <div className="flex flex-col gap-lg">
              <div className="bg-primary/5 border border-primary/15 rounded-xl p-md flex items-start gap-sm">
                <span className="material-symbols-outlined text-primary">auto_awesome</span>
                <div>
                  <p className="text-label-md font-bold text-primary">CBE Assessment Mode — Grade 4A</p>
                  <p className="text-body-sm text-secondary">Rate each student per learning area using the 4-level rubric: EE (Exceeding) · ME (Meeting) · AE (Approaching) · BE (Below Expectations)</p>
                </div>
              </div>

              <div className="flex gap-md flex-wrap">
                {Object.entries(CBE_LABELS).map(([code, label]) => (
                  <div key={code} className="flex items-center gap-sm">
                    <span className={clsx('text-label-sm font-bold px-sm py-xs rounded-full', CBE_COLORS[code])}>{code}</span>
                    <span className="text-body-sm text-secondary">{label}</span>
                  </div>
                ))}
              </div>

              <div className="tonal-card rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-surface-container-low">
                      <tr>
                        <th className="text-left px-md py-sm text-label-sm font-bold text-secondary uppercase whitespace-nowrap">Student</th>
                        {['Numeracy', 'Language', 'Science', 'Social Studies'].map(h => (
                          <th key={h} className="text-center px-md py-sm text-label-sm font-bold text-secondary uppercase whitespace-nowrap">{h}</th>
                        ))}
                        <th className="px-md py-sm text-label-sm font-bold text-secondary uppercase">Evidence</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cbeStudents.map(s => (
                        <tr key={s.adm} className="border-t border-outline-variant hover:bg-surface-container-low transition-colors">
                          <td className="px-md py-md">
                            <div className="flex items-center gap-sm">
                              <div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-label-sm flex-shrink-0">
                                {s.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                              </div>
                              <div>
                                <p className="text-label-md font-semibold whitespace-nowrap">{s.name}</p>
                                <p className="text-label-sm text-secondary">{s.adm}</p>
                              </div>
                            </div>
                          </td>
                          {(['numeracy', 'language', 'science', 'social'] as const).map(area => (
                            <td key={area} className="px-md py-md text-center">
                              <div className="flex gap-xs justify-center">
                                {['EE', 'ME', 'AE', 'BE'].map(opt => (
                                  <button key={opt} onClick={() => setCbe(c => ({ ...c, [s.adm]: { ...c[s.adm], [area]: opt } }))} className={clsx('text-label-sm px-xs py-xs rounded font-bold transition-all min-w-[28px]', cbe[s.adm]?.[area] === opt ? CBE_COLORS[opt] : 'bg-surface-container text-secondary hover:bg-surface-variant')}>
                                    {opt}
                                  </button>
                                ))}
                              </div>
                            </td>
                          ))}
                          <td className="px-md py-md">
                            <button className="flex items-center gap-xs text-label-sm text-tertiary font-semibold hover:underline whitespace-nowrap">
                              <span className="material-symbols-outlined text-[16px]">upload_file</span> Upload
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="p-md border-t border-outline-variant flex justify-end">
                  <button onClick={saveCbe} className={clsx('px-md py-sm rounded-lg text-label-md font-bold transition-all', cbeSaved ? 'bg-primary/10 text-primary' : 'bg-primary text-on-primary hover:opacity-90')}>
                    {cbeSaved ? '✓ CBE Saved & Published!' : 'Save CBE Assessment'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ── ASSIGNMENTS ── */}
          {tab === 'Assignments' && (
            <div className="flex flex-col gap-lg">
              <div className="tonal-card rounded-xl p-lg">
                <h3 className="text-title-md font-bold mb-md">Create New Assignment</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                  <div>
                    <label className="text-label-md font-semibold block mb-xs">Title</label>
                    <input className="w-full border border-outline-variant rounded-lg px-md py-sm text-body-md outline-none focus:border-primary" placeholder="e.g. Fractions Worksheet" />
                  </div>
                  <div>
                    <label className="text-label-md font-semibold block mb-xs">Class</label>
                    <select className="w-full border border-outline-variant rounded-lg px-md py-sm text-body-md outline-none bg-white">
                      <option>Grade 4A</option><option>Grade 5B</option><option>Grade 6A</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-label-md font-semibold block mb-xs">Due Date</label>
                    <input type="date" className="w-full border border-outline-variant rounded-lg px-md py-sm text-body-md outline-none focus:border-primary" defaultValue="2024-06-20" />
                  </div>
                  <div>
                    <label className="text-label-md font-semibold block mb-xs">Max Marks</label>
                    <input type="number" className="w-full border border-outline-variant rounded-lg px-md py-sm text-body-md outline-none focus:border-primary" defaultValue="20" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-label-md font-semibold block mb-xs">Instructions</label>
                    <textarea rows={3} className="w-full border border-outline-variant rounded-lg px-md py-sm text-body-md outline-none focus:border-primary resize-none" placeholder="Describe the assignment..." />
                  </div>
                </div>
                <button className="mt-md bg-primary text-on-primary px-md py-sm rounded-lg text-label-md font-bold hover:opacity-90">Create & Publish Assignment</button>
              </div>

              <div className="tonal-card rounded-xl overflow-hidden">
                <div className="p-md border-b border-outline-variant">
                  <h3 className="text-title-md font-bold">Active Assignments</h3>
                </div>
                {assignments.map(a => (
                  <div key={a.title} className="flex items-center justify-between px-lg py-md border-b border-outline-variant last:border-0 gap-md">
                    <div>
                      <p className="text-label-md font-semibold">{a.title}</p>
                      <p className="text-label-sm text-secondary">{a.class} · Due: {a.due}</p>
                    </div>
                    <div className="flex items-center gap-md">
                      <div className="text-right">
                        <p className="text-label-sm text-secondary">Submitted</p>
                        <p className="text-label-md font-bold text-primary">{a.submitted}/{a.total}</p>
                      </div>
                      <span className={clsx('text-label-sm font-bold px-sm py-xs rounded-full whitespace-nowrap', a.status === 'Open' ? 'bg-primary/10 text-primary' : 'bg-surface-container text-secondary')}>{a.status}</span>
                      <button className="text-label-sm text-primary font-semibold hover:underline">View Submissions</button>
                    </div>
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
