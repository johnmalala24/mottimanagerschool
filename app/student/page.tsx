'use client'
import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import clsx from 'clsx'

const navItems = [
  { label: 'Dashboard', icon: 'dashboard', href: '/student' },
  { label: 'Timetable', icon: 'calendar_month', href: '/student/timetable' },
  { label: 'Attendance', icon: 'fact_check', href: '/student/attendance' },
  { label: 'Exam Results', icon: 'grade', href: '/student/results' },
  { label: 'Assignments', icon: 'assignment', href: '/student/assignments' },
  { label: 'Learning Materials', icon: 'folder_open', href: '/student/materials' },
  { label: 'Announcements', icon: 'campaign', href: '/student/announcements' },
  { label: 'Report Cards', icon: 'summarize', href: '/student/reports' },
  { label: 'CBE Portfolio', icon: 'auto_awesome', href: '/student/cbe' },
]
const bottomItems = [
  { label: 'Settings', icon: 'settings', href: '/student/settings' },
  { label: 'Help', icon: 'help', href: '/student/help' },
]

const timetable = [
  { time: '8:00 AM', subject: 'Mathematics', teacher: 'Mr. Ochieng', room: 'Room 4A', current: true },
  { time: '9:00 AM', subject: 'English Language', teacher: 'Mr. Kamau', room: 'Room 4A', current: false },
  { time: '10:00 AM', subject: 'Break', teacher: '', room: '', current: false },
  { time: '10:30 AM', subject: 'Science', teacher: 'Ms. Achieng', room: 'Lab 1', current: false },
  { time: '11:30 AM', subject: 'Kiswahili', teacher: 'Ms. Wanjiku', room: 'Room 4A', current: false },
  { time: '12:30 PM', subject: 'Lunch', teacher: '', room: '', current: false },
  { time: '1:15 PM', subject: 'Social Studies', teacher: 'Mr. Ochieng', room: 'Room 4A', current: false },
  { time: '2:15 PM', subject: 'Creative Arts', teacher: 'Ms. Chebet', room: 'Art Room', current: false },
]

const assignments = [
  { title: 'Fractions Worksheet', subject: 'Mathematics', due: 'Today', status: 'Due', urgent: true, submitted: false },
  { title: 'Short Story Writing', subject: 'English', due: 'Jun 19', status: 'Pending', urgent: false, submitted: false },
  { title: 'Plant Cell Diagram', subject: 'Science', due: 'Jun 20', status: 'Submitted', urgent: false, submitted: true },
  { title: 'Kiswahili Insha', subject: 'Kiswahili', due: 'Jun 22', status: 'Pending', urgent: false, submitted: false },
]

const results = [
  { subject: 'Mathematics', marks: 92, grade: 'A', rank: 1 },
  { subject: 'English Language', marks: 85, grade: 'A-', rank: 3 },
  { subject: 'Science', marks: 88, grade: 'A', rank: 2 },
  { subject: 'Kiswahili', marks: 79, grade: 'B+', rank: 5 },
  { subject: 'Social Studies', marks: 91, grade: 'A', rank: 1 },
]

const materials = [
  { title: 'Mathematics Grade 4 — Chapter 5: Fractions', type: 'PDF', size: '2.4 MB', uploaded: 'Jun 14', subject: 'Mathematics' },
  { title: 'Science Notes — Plant Life Cycle', type: 'PDF', size: '1.8 MB', uploaded: 'Jun 12', subject: 'Science' },
  { title: 'English — Short Story Examples', type: 'PDF', size: '3.1 MB', uploaded: 'Jun 10', subject: 'English' },
  { title: 'Past Paper — Term 1 Mathematics', type: 'PDF', size: '0.9 MB', uploaded: 'Jun 8', subject: 'Mathematics' },
]

const cbePortfolio = [
  { area: 'Numeracy', level: 'EE', desc: 'Exceeding Expectations', evidence: 3, color: 'bg-primary' },
  { area: 'Language & Communication', level: 'ME', desc: 'Meeting Expectations', evidence: 2, color: 'bg-tertiary' },
  { area: 'Science & Technology', level: 'EE', desc: 'Exceeding Expectations', evidence: 4, color: 'bg-primary' },
  { area: 'Social Studies', level: 'ME', desc: 'Meeting Expectations', evidence: 2, color: 'bg-tertiary' },
  { area: 'Creative Arts', level: 'ME', desc: 'Meeting Expectations', evidence: 1, color: 'bg-tertiary' },
]

const TABS = ['Dashboard', 'Timetable', 'Assignments', 'My Results', 'Learning Materials', 'CBE Portfolio']
const CBE_COLORS: Record<string, string> = { EE: 'bg-primary text-on-primary', ME: 'bg-tertiary text-on-tertiary', AE: 'bg-yellow-400 text-yellow-900', BE: 'bg-error text-on-error' }

export default function StudentPage() {
  const [tab, setTab] = useState('Dashboard')
  const [submitted, setSubmitted] = useState<Record<string, boolean>>(Object.fromEntries(assignments.map(a => [a.title, a.submitted])))
  const [submitting, setSubmitting] = useState<string | null>(null)

  const handleSubmit = (title: string) => {
    setSubmitting(title)
    setTimeout(() => { setSubmitted(s => ({ ...s, [title]: true })); setSubmitting(null) }, 1500)
  }

  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar title="MottiManager" subtitle="Student Portal" navItems={navItems} bottomItems={bottomItems} userName="Amina Odhiambo" userRole="Grade 4A · Greenwood Academy" />
      <main className="ml-64 flex-1 flex flex-col min-h-screen">
        <div className="sticky top-0 z-10 bg-surface-container-lowest border-b border-outline-variant px-lg py-md flex items-center justify-between">
          <div className="flex items-center gap-md">
            <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold">AO</div>
            <div>
              <h1 className="text-headline-sm font-bold text-on-surface">Good Morning, Amina! 👋</h1>
              <p className="text-body-md text-secondary">Grade 4A · Term 2, 2024 · June 16, 2024</p>
            </div>
          </div>
          <div className="flex gap-sm">
            <button onClick={() => setTab('Assignments')} className="flex items-center gap-xs bg-primary text-on-primary px-md py-sm rounded-lg text-label-md font-semibold hover:opacity-90">
              <span className="material-symbols-outlined text-[18px]">assignment</span> My Assignments
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
                  { label: 'Average Score', value: '88%', sub: 'Class Rank: 2nd', icon: 'grade', bc: 'text-primary bg-primary/10', badge: 'Top 3' },
                  { label: 'Attendance', value: '98%', sub: 'This term', icon: 'fact_check', bc: 'text-primary bg-primary/10', badge: 'Excellent' },
                  { label: 'Assignments Due', value: '2', sub: 'Submit today', icon: 'assignment', bc: 'text-error bg-error/10', badge: 'Urgent' },
                  { label: 'CBE Level', value: 'Level 4', sub: 'Exceeding', icon: 'auto_awesome', bc: 'text-tertiary bg-tertiary/10', badge: 'EE' },
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
                <div className="tonal-card rounded-xl p-lg">
                  <h3 className="text-title-md font-bold mb-md">Today's Timetable</h3>
                  <div className="flex flex-col gap-xs">
                    {timetable.slice(0, 5).map(t => (
                      <div key={t.time} className={clsx('flex items-center gap-sm p-sm rounded-lg transition-all', t.current ? 'bg-primary text-on-primary' : t.subject === 'Break' || t.subject === 'Lunch' ? 'text-secondary' : 'hover:bg-surface-container')}>
                        <span className="text-label-sm font-mono w-16 flex-shrink-0">{t.time}</span>
                        <div>
                          <p className={clsx('text-label-md font-semibold', t.current ? 'text-on-primary' : '')}>{t.subject}</p>
                          {t.teacher && <p className={clsx('text-label-sm', t.current ? 'opacity-80' : 'text-secondary')}>{t.teacher}</p>}
                        </div>
                        {t.current && <span className="ml-auto text-label-sm bg-white/20 px-xs py-xs rounded font-bold">Now</span>}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="tonal-card rounded-xl p-lg">
                  <div className="flex items-center justify-between mb-md">
                    <h3 className="text-title-md font-bold">Assignments</h3>
                    <button onClick={() => setTab('Assignments')} className="text-label-md text-primary font-semibold hover:underline">View All</button>
                  </div>
                  <div className="flex flex-col gap-sm">
                    {assignments.map(a => (
                      <div key={a.title} className={clsx('p-sm rounded-xl border', a.urgent && !submitted[a.title] ? 'border-error/30 bg-error/5' : 'border-outline-variant bg-surface-container-low')}>
                        <div className="flex items-start justify-between gap-sm">
                          <div>
                            <p className="text-label-md font-semibold">{a.title}</p>
                            <p className="text-label-sm text-secondary">{a.subject} · Due: {a.due}</p>
                          </div>
                          <span className={clsx('text-label-sm font-bold px-sm py-xs rounded-full whitespace-nowrap flex-shrink-0', submitted[a.title] ? 'bg-primary/10 text-primary' : a.urgent ? 'bg-error/10 text-error' : 'bg-surface-container text-secondary')}>
                            {submitted[a.title] ? 'Submitted ✓' : a.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="tonal-card rounded-xl p-lg">
                  <h3 className="text-title-md font-bold mb-md">My CBE Portfolio</h3>
                  {cbePortfolio.map(c => (
                    <div key={c.area} className="mb-sm">
                      <div className="flex justify-between text-label-sm mb-xs">
                        <span className="text-secondary truncate pr-sm">{c.area}</span>
                        <span className={clsx('text-label-sm font-bold px-xs py-xs rounded flex-shrink-0', CBE_COLORS[c.level])}>{c.level}</span>
                      </div>
                    </div>
                  ))}
                  <button onClick={() => setTab('CBE Portfolio')} className="w-full mt-sm border border-outline-variant rounded-lg py-sm text-label-md text-secondary hover:border-primary hover:text-primary transition-colors">View Full Portfolio</button>
                </div>
              </div>
            </div>
          )}

          {/* ── TIMETABLE ── */}
          {tab === 'Timetable' && (
            <div className="tonal-card rounded-xl overflow-hidden">
              <div className="p-md border-b border-outline-variant bg-surface-container-low">
                <h3 className="text-title-md font-bold">Weekly Timetable — Grade 4A</h3>
                <p className="text-body-sm text-secondary">Week of June 16–20, 2024</p>
              </div>
              <div className="divide-y divide-outline-variant">
                {timetable.map(t => (
                  <div key={t.time} className={clsx('flex items-center gap-lg px-lg py-md', t.current && 'bg-primary/5')}>
                    <span className="text-label-sm font-mono text-secondary w-20 flex-shrink-0">{t.time}</span>
                    {t.subject === 'Break' || t.subject === 'Lunch' ? (
                      <div className="flex items-center gap-sm text-secondary">
                        <span className="material-symbols-outlined text-[20px]">{t.subject === 'Break' ? 'coffee' : 'restaurant'}</span>
                        <span className="text-label-md font-semibold">{t.subject}</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-md flex-1">
                        <div className={clsx('w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0', t.current ? 'bg-primary text-on-primary' : 'bg-surface-container text-secondary')}>
                          <span className="material-symbols-outlined text-[20px]">menu_book</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-label-md font-bold">{t.subject}</p>
                          <p className="text-label-sm text-secondary">{t.teacher} · {t.room}</p>
                        </div>
                        {t.current && <span className="text-label-sm bg-primary text-on-primary font-bold px-sm py-xs rounded-full">In Progress</span>}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── ASSIGNMENTS ── */}
          {tab === 'Assignments' && (
            <div className="flex flex-col gap-md">
              {assignments.map(a => (
                <div key={a.title} className="tonal-card rounded-xl p-lg">
                  <div className="flex items-start justify-between gap-md mb-md">
                    <div>
                      <div className="flex items-center gap-sm mb-xs">
                        <h3 className="text-title-md font-bold">{a.title}</h3>
                        <span className={clsx('text-label-sm font-bold px-sm py-xs rounded-full', submitted[a.title] ? 'bg-primary/10 text-primary' : a.urgent ? 'bg-error/10 text-error' : 'bg-surface-container text-secondary')}>
                          {submitted[a.title] ? 'Submitted ✓' : a.status}
                        </span>
                      </div>
                      <p className="text-body-md text-secondary">{a.subject} · Due: {a.due}</p>
                    </div>
                    {!submitted[a.title] && (
                      <button onClick={() => handleSubmit(a.title)} disabled={submitting === a.title} className={clsx('flex items-center gap-xs px-md py-sm rounded-lg text-label-md font-semibold hover:opacity-90 transition-all flex-shrink-0', a.urgent ? 'bg-primary text-on-primary' : 'border border-outline-variant text-secondary hover:bg-surface-container')}>
                        {submitting === a.title ? (
                          <><span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span> Submitting...</>
                        ) : (
                          <><span className="material-symbols-outlined text-[18px]">upload_file</span> Submit Now</>
                        )}
                      </button>
                    )}
                  </div>
                  {submitted[a.title] && (
                    <div className="bg-primary/5 border border-primary/15 rounded-lg p-sm flex items-center gap-sm">
                      <span className="material-symbols-outlined text-primary icon-filled">check_circle</span>
                      <p className="text-label-md text-primary font-semibold">Submitted successfully! Your teacher will mark and return it.</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* ── MY RESULTS ── */}
          {tab === 'My Results' && (
            <div className="flex flex-col gap-lg">
              <div className="tonal-card rounded-xl p-md flex items-center gap-md border-l-4 border-primary">
                <span className="material-symbols-outlined text-primary icon-filled text-[32px]">emoji_events</span>
                <div>
                  <p className="text-label-md font-bold">Mid-Term Results — Term 2, 2024</p>
                  <p className="text-label-sm text-secondary">Class Position: 2nd of 32 · Overall Average: 88.3% (A)</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
                {results.map(r => (
                  <div key={r.subject} className="tonal-card rounded-xl p-lg">
                    <div className="flex items-start justify-between mb-md">
                      <h4 className="text-label-md font-bold">{r.subject}</h4>
                      <span className={clsx('text-label-md font-bold', r.marks >= 80 ? 'text-primary' : 'text-tertiary')}>{r.grade}</span>
                    </div>
                    <p className="text-headline-sm font-bold text-on-surface">{r.marks}<span className="text-body-sm text-secondary">/100</span></p>
                    <div className="h-2 bg-surface-container rounded-full mt-sm">
                      <div className="h-2 bg-primary rounded-full" style={{ width: `${r.marks}%` }} />
                    </div>
                    <p className="text-label-sm text-secondary mt-xs">Rank: #{r.rank} in class</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── LEARNING MATERIALS ── */}
          {tab === 'Learning Materials' && (
            <div className="flex flex-col gap-md">
              <div className="flex items-center gap-xs bg-surface-container border border-outline-variant rounded-lg px-md py-sm w-72">
                <span className="material-symbols-outlined text-[18px] text-secondary">search</span>
                <input className="bg-transparent text-body-md outline-none w-full placeholder:text-secondary" placeholder="Search materials..." />
              </div>
              {materials.map(m => (
                <div key={m.title} className="tonal-card rounded-xl p-md flex items-center justify-between gap-md">
                  <div className="flex items-center gap-md">
                    <div className="w-10 h-10 rounded-xl bg-error/10 flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-error">picture_as_pdf</span>
                    </div>
                    <div>
                      <p className="text-label-md font-semibold">{m.title}</p>
                      <p className="text-label-sm text-secondary">{m.subject} · {m.size} · Uploaded {m.uploaded}</p>
                    </div>
                  </div>
                  <button className="flex items-center gap-xs text-label-md text-primary font-semibold hover:underline flex-shrink-0">
                    <span className="material-symbols-outlined text-[18px]">download</span> Download
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* ── CBE PORTFOLIO ── */}
          {tab === 'CBE Portfolio' && (
            <div className="flex flex-col gap-lg">
              <div className="tonal-card rounded-xl p-lg bg-gradient-to-r from-primary/5 to-tertiary/5">
                <h3 className="text-title-md font-bold">My CBE Learning Portfolio</h3>
                <p className="text-body-md text-secondary">Your competency progress and evidence across learning areas. Build it by submitting projects, photos, and assignments.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                {cbePortfolio.map(c => (
                  <div key={c.area} className="tonal-card rounded-xl p-lg">
                    <div className="flex items-start justify-between mb-md">
                      <div>
                        <h4 className="text-label-md font-bold">{c.area}</h4>
                        <p className="text-label-sm text-secondary">{c.evidence} evidence item{c.evidence !== 1 ? 's' : ''} uploaded</p>
                      </div>
                      <span className={clsx('text-label-sm font-bold px-sm py-xs rounded-full', CBE_COLORS[c.level])}>{c.level} — {c.desc}</span>
                    </div>
                    <div className="h-2 bg-surface-container rounded-full mb-md">
                      <div className={clsx('h-2 rounded-full', c.color)} style={{ width: c.level === 'EE' ? '100%' : c.level === 'ME' ? '75%' : c.level === 'AE' ? '50%' : '25%' }} />
                    </div>
                    <button className="w-full border border-dashed border-outline-variant rounded-lg py-sm text-label-md text-secondary hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-xs">
                      <span className="material-symbols-outlined text-[18px]">add_photo_alternate</span> Add Evidence
                    </button>
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
