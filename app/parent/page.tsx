'use client'
import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import clsx from 'clsx'

const navItems = [
  { label: 'Dashboard', icon: 'dashboard', href: '/parent' },
  { label: 'Student Profile', icon: 'person', href: '/parent/profile' },
  { label: 'Attendance', icon: 'calendar_today', href: '/parent/attendance' },
  { label: 'Exam Results', icon: 'grade', href: '/parent/results' },
  { label: 'Report Cards', icon: 'summarize', href: '/parent/reports' },
  { label: 'Fees', icon: 'payments', href: '/parent/fees' },
  { label: 'Assignments', icon: 'assignment', href: '/parent/assignments' },
  { label: 'Announcements', icon: 'campaign', href: '/parent/announcements' },
  { label: 'CBE Reports', icon: 'auto_awesome', href: '/parent/cbe' },
]
const bottomItems = [
  { label: 'Settings', icon: 'settings', href: '/parent/settings' },
  { label: 'Support', icon: 'help', href: '/parent/support' },
]

const results = [
  { subject: 'Mathematics', marks: 92, max: 100, grade: 'A', teacher: 'Mr. Ochieng', trend: 'up' },
  { subject: 'English Language', marks: 85, max: 100, grade: 'A-', teacher: 'Mr. Kamau', trend: 'up' },
  { subject: 'Science', marks: 88, max: 100, grade: 'A', teacher: 'Ms. Achieng', trend: 'same' },
  { subject: 'Kiswahili', marks: 79, max: 100, grade: 'B+', teacher: 'Ms. Wanjiku', trend: 'down' },
  { subject: 'Social Studies', marks: 91, max: 100, grade: 'A', teacher: 'Mr. Ochieng', trend: 'up' },
  { subject: 'Creative Arts', marks: 75, max: 100, grade: 'B+', teacher: 'Ms. Chebet', trend: 'up' },
]

const attendance = [
  { month: 'April', present: 20, total: 22, pct: 91 },
  { month: 'May', present: 21, total: 22, pct: 95 },
  { month: 'June (to date)', present: 14, total: 14, pct: 100 },
]

const feeItems = [
  { item: 'Tuition Fee', amount: 22000, paid: true },
  { item: 'Activity Fee', amount: 3000, paid: true },
  { item: 'Exam Fee', amount: 2000, paid: true },
  { item: 'Transport', amount: 3000, paid: true },
]

const announcements = [
  { title: 'End-Term Examinations', date: 'Jun 25–28, 2024', icon: 'assignment', urgent: true },
  { title: 'Sports Day', date: 'June 22, 2024', icon: 'sports_soccer', urgent: false },
  { title: 'Library Books — Please Return', date: 'By June 20', icon: 'menu_book', urgent: false },
  { title: 'School Trip — Form Submission', date: 'By June 18', icon: 'directions_bus', urgent: true },
]

const cbeAreas = [
  { area: 'Numeracy', level: 'EE', desc: 'Exceeding Expectations', pct: 95, color: 'bg-primary' },
  { area: 'Language & Communication', level: 'ME', desc: 'Meeting Expectations', pct: 80, color: 'bg-tertiary' },
  { area: 'Science & Technology', level: 'EE', desc: 'Exceeding Expectations', pct: 92, color: 'bg-primary' },
  { area: 'Social Studies', level: 'ME', desc: 'Meeting Expectations', pct: 78, color: 'bg-tertiary' },
  { area: 'Creative Arts', level: 'ME', desc: 'Meeting Expectations', pct: 75, color: 'bg-tertiary' },
]

const TABS = ['Dashboard', 'Results', 'Attendance', 'Fees & Payment', 'CBE Report', 'Announcements']
const CBE_COLORS: Record<string, string> = { EE: 'bg-primary text-on-primary', ME: 'bg-tertiary text-on-tertiary', AE: 'bg-yellow-400 text-yellow-900', BE: 'bg-error text-on-error' }

export default function ParentPage() {
  const [tab, setTab] = useState('Dashboard')
  const [stkPhone, setStkPhone] = useState('+254712345678')
  const [stkSent, setStkSent] = useState(false)

  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar title="MottiManager" subtitle="Parent Portal" navItems={navItems} bottomItems={bottomItems} userName="Mrs. Odhiambo" userRole="Parent / Guardian" />
      <main className="ml-64 flex-1 flex flex-col min-h-screen">
        <div className="sticky top-0 z-10 bg-surface-container-lowest border-b border-outline-variant px-lg py-md flex items-center justify-between">
          <div>
            <h1 className="text-headline-sm font-bold text-on-surface">Parent Dashboard</h1>
            <p className="text-body-md text-secondary">Viewing: Amina Odhiambo · Grade 4A · Greenwood Academy</p>
          </div>
          <div className="flex gap-sm">
            <button onClick={() => setTab('Fees & Payment')} className="flex items-center gap-xs bg-primary text-on-primary px-md py-sm rounded-lg text-label-md font-semibold hover:opacity-90">
              <span className="material-symbols-outlined text-[18px]">payments</span> Pay Fees
            </button>
            <button className="flex items-center gap-xs px-md py-sm border border-outline-variant rounded-lg text-label-md text-secondary hover:bg-surface-container">
              <span className="material-symbols-outlined text-[18px]">download</span> Report Card
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
              {/* Student Card */}
              <div className="tonal-card rounded-xl p-lg bg-gradient-to-r from-primary/5 to-tertiary/5">
                <div className="flex items-start gap-lg">
                  <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center text-on-primary text-headline-sm font-bold flex-shrink-0">AO</div>
                  <div className="flex-1">
                    <h2 className="text-title-lg font-bold">Amina Odhiambo</h2>
                    <p className="text-body-md text-secondary">Adm No: GW-4A-001 · Grade 4A · Greenwood Academy</p>
                    <div className="flex flex-wrap gap-sm mt-md">
                      {[
                        { label: 'Class Position: 2nd', color: 'bg-primary/10 text-primary' },
                        { label: 'Attendance: 98%', color: 'bg-primary/10 text-primary' },
                        { label: 'Term 2, 2024', color: 'bg-surface-container text-secondary' },
                      ].map(b => (
                        <span key={b.label} className={clsx('px-md py-xs rounded-full text-label-sm font-bold', b.color)}>{b.label}</span>
                      ))}
                    </div>
                  </div>
                  <button className="flex items-center gap-xs px-md py-sm border border-outline-variant rounded-lg text-label-md text-secondary hover:bg-surface-container">
                    <span className="material-symbols-outlined text-[18px]">message</span> Message Teacher
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-md">
                {[
                  { label: 'Overall Average', value: 'A (88%)', sub: '↑ from last term', icon: 'grade', bc: 'text-primary bg-primary/10', badge: 'Top 5%' },
                  { label: 'Attendance Rate', value: '98%', sub: 'This term', icon: 'fact_check', bc: 'text-primary bg-primary/10', badge: 'Excellent' },
                  { label: 'Fee Balance', value: 'KES 0', sub: 'Fully Paid ✓', icon: 'payments', bc: 'text-primary bg-primary/10', badge: 'Paid' },
                  { label: 'Assignments Due', value: '2', sub: 'This week', icon: 'assignment', bc: 'text-error bg-error/10', badge: 'Submit' },
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
                  <div className="flex items-center justify-between mb-md">
                    <h3 className="text-title-md font-bold">Mid-Term Results</h3>
                    <button onClick={() => setTab('Results')} className="text-label-md text-primary font-semibold hover:underline">View All</button>
                  </div>
                  {results.slice(0, 4).map(r => (
                    <div key={r.subject} className="mb-sm">
                      <div className="flex justify-between text-label-sm mb-xs">
                        <span className="text-secondary">{r.subject}</span>
                        <span className="font-bold text-on-surface">{r.marks}/100 <span className={clsx('ml-xs', r.marks >= 80 ? 'text-primary' : 'text-tertiary')}>{r.grade}</span></span>
                      </div>
                      <div className="h-1.5 bg-surface-container rounded-full">
                        <div className="h-1.5 bg-primary rounded-full" style={{ width: `${r.marks}%` }} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="tonal-card rounded-xl p-lg">
                  <h3 className="text-title-md font-bold mb-md">Fee Statement — Term 2</h3>
                  {feeItems.map(f => (
                    <div key={f.item} className="flex items-center justify-between py-sm border-b border-outline-variant last:border-0">
                      <span className="text-body-md">{f.item}</span>
                      <div className="flex items-center gap-sm">
                        <span className="text-label-md font-semibold">KES {f.amount.toLocaleString()}</span>
                        <span className="material-symbols-outlined text-primary text-[20px] icon-filled">check_circle</span>
                      </div>
                    </div>
                  ))}
                  <div className="mt-md pt-sm flex justify-between text-label-md font-bold border-t-2 border-primary">
                    <span>Total Paid</span>
                    <span className="text-primary">KES {feeItems.reduce((a, f) => a + f.amount, 0).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="tonal-card rounded-xl p-lg">
                <h3 className="text-title-md font-bold mb-md">School Announcements</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                  {announcements.map(a => (
                    <div key={a.title} className={clsx('flex items-start gap-sm p-md rounded-xl border', a.urgent ? 'border-error/30 bg-error/5' : 'border-outline-variant bg-surface-container-low')}>
                      <span className={clsx('material-symbols-outlined text-[22px]', a.urgent ? 'text-error' : 'text-secondary')}>{a.icon}</span>
                      <div>
                        <p className="text-label-md font-semibold">{a.title}</p>
                        <p className="text-label-sm text-secondary">{a.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── RESULTS ── */}
          {tab === 'Results' && (
            <div className="flex flex-col gap-lg">
              <div className="tonal-card rounded-xl p-md flex items-center justify-between border-l-4 border-primary">
                <div>
                  <p className="text-label-md font-bold">Mid-Term Examination — Term 2, 2024</p>
                  <p className="text-label-sm text-secondary">Class Position: 2nd of 32 · Overall Average: A (88.3%)</p>
                </div>
                <button className="flex items-center gap-xs px-md py-sm border border-outline-variant rounded-lg text-label-md text-secondary hover:bg-surface-container">
                  <span className="material-symbols-outlined text-[18px]">download</span> Download Report Card
                </button>
              </div>
              <div className="tonal-card rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead className="bg-surface-container-low">
                    <tr>{['Subject', 'Marks', 'Grade', 'Teacher', 'Trend'].map(h => (
                      <th key={h} className="text-left px-md py-sm text-label-sm font-bold text-secondary uppercase">{h}</th>
                    ))}</tr>
                  </thead>
                  <tbody>
                    {results.map(r => (
                      <tr key={r.subject} className="border-t border-outline-variant hover:bg-surface-container-low">
                        <td className="px-md py-md text-label-md font-semibold">{r.subject}</td>
                        <td className="px-md py-md">
                          <div className="flex items-center gap-sm">
                            <div className="w-20 h-1.5 bg-surface-container rounded-full">
                              <div className="h-1.5 bg-primary rounded-full" style={{ width: `${r.marks}%` }} />
                            </div>
                            <span className="text-label-md font-bold">{r.marks}/100</span>
                          </div>
                        </td>
                        <td className="px-md py-md"><span className={clsx('text-label-md font-bold', r.marks >= 80 ? 'text-primary' : 'text-tertiary')}>{r.grade}</span></td>
                        <td className="px-md py-md text-body-md text-secondary">{r.teacher}</td>
                        <td className="px-md py-md">
                          <span className={clsx('material-symbols-outlined text-[20px]', r.trend === 'up' ? 'text-primary' : r.trend === 'down' ? 'text-error' : 'text-secondary')}>
                            {r.trend === 'up' ? 'trending_up' : r.trend === 'down' ? 'trending_down' : 'trending_flat'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── ATTENDANCE ── */}
          {tab === 'Attendance' && (
            <div className="flex flex-col gap-lg">
              <div className="grid grid-cols-3 gap-md">
                {attendance.map(a => (
                  <div key={a.month} className="tonal-card rounded-xl p-lg text-center">
                    <p className="text-headline-sm font-bold text-primary">{a.pct}%</p>
                    <p className="text-label-md font-semibold mt-xs">{a.month}</p>
                    <p className="text-label-sm text-secondary">{a.present}/{a.total} days present</p>
                  </div>
                ))}
              </div>
              <div className="tonal-card rounded-xl p-lg">
                <h3 className="text-title-md font-bold mb-md">Attendance Calendar — June 2024</h3>
                <div className="grid grid-cols-7 gap-xs text-center">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
                    <div key={d} className="text-label-sm text-secondary font-bold py-xs">{d}</div>
                  ))}
                  {Array.from({ length: 4 }, (_, i) => <div key={`empty-${i}`} />)}
                  {Array.from({ length: 28 }, (_, i) => {
                    const day = i + 1
                    const isWeekend = (day + 3) % 7 >= 5
                    const status = isWeekend ? 'weekend' : day <= 14 ? 'present' : day === 16 ? 'today' : 'upcoming'
                    return (
                      <div key={day} className={clsx('aspect-square flex items-center justify-center rounded-full text-label-sm font-semibold', status === 'present' ? 'bg-primary text-on-primary' : status === 'today' ? 'bg-primary/20 text-primary border-2 border-primary' : status === 'weekend' ? 'text-secondary opacity-40' : 'bg-surface-container text-secondary')}>
                        {day}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ── FEES & PAYMENT ── */}
          {tab === 'Fees & Payment' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg">
              <div className="tonal-card rounded-xl p-lg">
                <h3 className="text-title-md font-bold mb-md">Pay via M-Pesa STK Push</h3>
                <div className="bg-primary/5 border border-primary/15 rounded-xl p-md flex items-start gap-sm mb-md">
                  <span className="material-symbols-outlined text-primary icon-filled">check_circle</span>
                  <div>
                    <p className="text-label-md font-bold text-primary">All Fees Paid for Term 2!</p>
                    <p className="text-label-sm text-secondary">Balance: KES 0 · Paid: KES 30,000</p>
                  </div>
                </div>
                <p className="text-body-md text-secondary mb-md">To pay for an upcoming term, fill in the details below and you'll receive an M-Pesa prompt on your phone.</p>
                {stkSent && (
                  <div className="mb-md bg-primary/10 border border-primary/20 rounded-xl p-md flex items-center gap-sm">
                    <span className="material-symbols-outlined text-primary icon-filled">smartphone</span>
                    <div>
                      <p className="text-label-md font-bold text-primary">STK Push Sent!</p>
                      <p className="text-label-sm text-secondary">Check your phone ({stkPhone}) and enter M-Pesa PIN to confirm.</p>
                    </div>
                  </div>
                )}
                <div className="flex flex-col gap-md">
                  <div>
                    <label className="text-label-md font-semibold block mb-xs">Phone Number</label>
                    <input value={stkPhone} onChange={e => setStkPhone(e.target.value)} className="w-full border border-outline-variant rounded-lg px-md py-sm text-body-md outline-none focus:border-primary" />
                  </div>
                  <div>
                    <label className="text-label-md font-semibold block mb-xs">Amount (KES)</label>
                    <input type="number" className="w-full border border-outline-variant rounded-lg px-md py-sm text-body-md outline-none focus:border-primary" defaultValue="30000" />
                  </div>
                  <div>
                    <label className="text-label-md font-semibold block mb-xs">Paybill / Account</label>
                    <input readOnly className="w-full border border-outline-variant rounded-lg px-md py-sm text-body-md bg-surface-container" defaultValue="522522 / GW-4A-001" />
                  </div>
                  <button onClick={() => { setStkSent(true); setTimeout(() => setStkSent(false), 5000) }} className="mpesa-gradient text-white py-sm rounded-lg text-label-md font-bold hover:opacity-90 flex items-center justify-center gap-xs">
                    <span className="material-symbols-outlined text-[18px]">smartphone</span> Pay via M-Pesa
                  </button>
                </div>
              </div>

              <div className="tonal-card rounded-xl p-lg">
                <h3 className="text-title-md font-bold mb-md">Payment History</h3>
                <div className="flex flex-col divide-y divide-outline-variant">
                  {[
                    { date: 'May 5, 2024', amount: 30000, ref: 'QGP3R2L1K7', type: 'M-Pesa STK', status: 'Success' },
                    { date: 'Jan 8, 2024', amount: 30000, ref: 'QGP2R8T5N3', type: 'M-Pesa C2B', status: 'Success' },
                    { date: 'Sep 4, 2023', amount: 28000, ref: 'QGP1R4V2M8', type: 'M-Pesa STK', status: 'Success' },
                  ].map((p, i) => (
                    <div key={i} className="py-md flex items-center justify-between gap-md">
                      <div className="flex items-center gap-sm">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
                        </div>
                        <div>
                          <p className="text-label-md font-semibold">{p.type}</p>
                          <p className="text-label-sm text-secondary">{p.date} · Ref: {p.ref}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-label-md font-bold text-primary">KES {p.amount.toLocaleString()}</p>
                        <span className="text-label-sm text-primary">{p.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── CBE REPORT ── */}
          {tab === 'CBE Report' && (
            <div className="flex flex-col gap-lg">
              <div className="tonal-card rounded-xl p-lg bg-gradient-to-r from-primary/5 to-tertiary/5">
                <h3 className="text-title-md font-bold mb-xs">Amina's CBE Portfolio — Term 2, 2024</h3>
                <p className="text-body-md text-secondary">Competency-Based Education assessment. Rated by class teacher Ms. Grace Njeri.</p>
              </div>
              <div className="flex gap-md flex-wrap">
                {[{ code: 'EE', label: 'Exceeding Expectations' }, { code: 'ME', label: 'Meeting Expectations' }, { code: 'AE', label: 'Approaching' }, { code: 'BE', label: 'Below Expectations' }].map(({ code, label }) => (
                  <div key={code} className="flex items-center gap-xs">
                    <span className={clsx('text-label-sm font-bold px-sm py-xs rounded-full', CBE_COLORS[code])}>{code}</span>
                    <span className="text-body-sm text-secondary">{label}</span>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                {cbeAreas.map(a => (
                  <div key={a.area} className="tonal-card rounded-xl p-lg">
                    <div className="flex items-start justify-between mb-md">
                      <div>
                        <h4 className="text-label-md font-bold">{a.area}</h4>
                        <p className="text-label-sm text-secondary">{a.desc}</p>
                      </div>
                      <span className={clsx('text-label-sm font-bold px-sm py-xs rounded-full', CBE_COLORS[a.level])}>{a.level}</span>
                    </div>
                    <div className="h-2 bg-surface-container rounded-full">
                      <div className={clsx('h-2 rounded-full', a.color)} style={{ width: `${a.pct}%` }} />
                    </div>
                    <p className="text-label-sm text-secondary mt-xs">{a.pct}% mastery</p>
                  </div>
                ))}
              </div>
              <div className="tonal-card rounded-xl p-lg">
                <h3 className="text-title-md font-bold mb-sm">Teacher Comments</h3>
                <div className="bg-surface-container-low rounded-xl p-md">
                  <p className="text-body-md italic">"Amina is an exceptional learner who consistently demonstrates deep understanding across all learning areas. Her work in numeracy and science is particularly impressive. She collaborates well with peers and shows great curiosity. Keep encouraging her reading at home."</p>
                  <p className="text-label-sm text-secondary mt-sm">— Ms. Grace Njeri, Class Teacher 4A · June 2024</p>
                </div>
              </div>
            </div>
          )}

          {/* ── ANNOUNCEMENTS ── */}
          {tab === 'Announcements' && (
            <div className="flex flex-col gap-md">
              {announcements.map(a => (
                <div key={a.title} className={clsx('tonal-card rounded-xl p-lg flex items-start gap-md', a.urgent && 'border-l-4 border-error')}>
                  <div className={clsx('w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0', a.urgent ? 'bg-error/10' : 'bg-surface-container')}>
                    <span className={clsx('material-symbols-outlined', a.urgent ? 'text-error' : 'text-secondary')}>{a.icon}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-sm mb-xs">
                      <p className="text-label-md font-bold">{a.title}</p>
                      {a.urgent && <span className="text-label-sm bg-error/10 text-error font-bold px-sm py-xs rounded-full">Urgent</span>}
                    </div>
                    <p className="text-body-md text-secondary">{a.date}</p>
                    <p className="text-body-md mt-xs">Sent by: Greenwood Academy Administration</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
