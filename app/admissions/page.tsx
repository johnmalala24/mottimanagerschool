'use client'
import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import clsx from 'clsx'

const navItems = [
  { label: 'Dashboard', icon: 'dashboard', href: '/admissions' },
  { label: 'Applications', icon: 'inbox', href: '/admissions/applications' },
  { label: 'Student Registration', icon: 'person_add', href: '/admissions/register' },
  { label: 'Approvals', icon: 'approval', href: '/admissions/approvals' },
  { label: 'Document Uploads', icon: 'upload_file', href: '/admissions/documents' },
  { label: 'Admission Letters', icon: 'mail', href: '/admissions/letters' },
  { label: 'Enrollment Reports', icon: 'bar_chart', href: '/admissions/reports' },
]
const bottomItems = [
  { label: 'Settings', icon: 'settings', href: '/admissions/settings' },
  { label: 'Support', icon: 'help', href: '/admissions/support' },
]

const applications = [
  { name: 'Liam Njoroge', grade: 'Grade 1', applied: 'Jun 14', status: 'Pending Review', docs: 3, required: 4, phone: '+254712000001' },
  { name: 'Aisha Odhiambo', grade: 'Grade 4', applied: 'Jun 13', status: 'Approved', docs: 4, required: 4, phone: '+254712000002' },
  { name: 'Kevin Mutua', grade: 'Grade 2', applied: 'Jun 12', status: 'Documents Missing', docs: 2, required: 4, phone: '+254712000003' },
  { name: 'Grace Wanjiru', grade: 'Grade 6', applied: 'Jun 11', status: 'Interview Scheduled', docs: 4, required: 4, phone: '+254712000004' },
  { name: 'Brian Otieno Jr', grade: 'Grade 3', applied: 'Jun 10', status: 'Approved', docs: 4, required: 4, phone: '+254712000005' },
  { name: 'Fatuma Hassan', grade: 'Grade 1', applied: 'Jun 9', status: 'Pending Review', docs: 3, required: 4, phone: '+254712000006' },
]

const pipeline = [
  { stage: 'Stage 1', label: 'Application Received', count: 124, color: 'bg-surface-container-high text-on-surface', barColor: 'bg-secondary', pct: 100 },
  { stage: 'Stage 2', label: 'Documents Verified', count: 99, color: 'bg-tertiary/10 text-tertiary', barColor: 'bg-tertiary', pct: 80 },
  { stage: 'Stage 3', label: 'Interview / Assessment', count: 72, color: 'bg-primary/10 text-primary', barColor: 'bg-primary', pct: 58 },
  { stage: 'Stage 4', label: 'Offer Issued', count: 68, color: 'bg-primary text-on-primary', barColor: 'bg-primary', pct: 55 },
]

const TABS = ['Dashboard', 'Applications', 'Register Student', 'Documents']

export default function AdmissionsPage() {
  const [tab, setTab] = useState('Dashboard')
  const [regStep, setRegStep] = useState(1)

  const statusColor = (s: string) => s === 'Approved' ? 'bg-primary/10 text-primary' : s === 'Documents Missing' ? 'bg-error/10 text-error' : s === 'Interview Scheduled' ? 'bg-tertiary/10 text-tertiary' : 'bg-yellow-100 text-yellow-700'

  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar title="MottiManager" subtitle="Admissions Portal" navItems={navItems} bottomItems={bottomItems} userName="Ms. Patricia Kamau" userRole="Admissions Officer" />
      <main className="ml-64 flex-1 flex flex-col min-h-screen">
        <div className="sticky top-0 z-10 bg-surface-container-lowest border-b border-outline-variant px-lg py-md flex items-center justify-between">
          <div>
            <h1 className="text-headline-sm font-bold text-on-surface">Admissions Portal</h1>
            <p className="text-body-md text-secondary">Greenwood Academy · 2024/2025 Academic Year</p>
          </div>
          <div className="flex gap-sm">
            <button className="flex items-center gap-xs px-md py-sm border border-outline-variant rounded-lg text-label-md text-secondary hover:bg-surface-container">
              <span className="material-symbols-outlined text-[18px]">download</span> Export Report
            </button>
            <button onClick={() => { setTab('Register Student'); setRegStep(1) }} className="flex items-center gap-xs bg-primary text-on-primary px-md py-sm rounded-lg text-label-md font-semibold hover:opacity-90">
              <span className="material-symbols-outlined text-[18px]">person_add</span> New Application
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
                  { label: 'Total Applications', value: '124', sub: 'This cycle', icon: 'inbox', bc: 'text-secondary bg-surface-container', badge: '2024/25' },
                  { label: 'Approved', value: '68', sub: '54.8% approval rate', icon: 'check_circle', bc: 'text-primary bg-primary/10', badge: '54.8%' },
                  { label: 'Pending Review', value: '31', sub: 'Action needed', icon: 'pending', bc: 'text-yellow-700 bg-yellow-100', badge: 'Review' },
                  { label: 'Documents Missing', value: '25', sub: 'Follow up required', icon: 'upload_file', bc: 'text-error bg-error/10', badge: 'Follow Up' },
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

              <div className="tonal-card rounded-xl p-lg">
                <h3 className="text-title-md font-bold mb-md">Admission Pipeline</h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-md">
                  {pipeline.map(p => (
                    <div key={p.stage} className={clsx('rounded-xl p-lg text-center', p.color)}>
                      <p className="text-label-sm font-bold opacity-70 mb-xs">{p.stage}</p>
                      <p className="text-headline-sm font-bold">{p.count}</p>
                      <p className="text-label-sm font-semibold opacity-80 mt-xs">{p.label}</p>
                      <div className="h-1 bg-black/10 rounded-full mt-md">
                        <div className={clsx('h-1 rounded-full', p.barColor)} style={{ width: `${p.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── APPLICATIONS ── */}
          {tab === 'Applications' && (
            <div className="flex flex-col gap-md">
              <div className="flex items-center justify-between gap-md">
                <div className="flex items-center gap-xs bg-surface-container border border-outline-variant rounded-lg px-md py-sm flex-1 max-w-[28rem]">
                  <span className="material-symbols-outlined text-[18px] text-secondary">search</span>
                  <input className="bg-transparent text-body-md outline-none w-full placeholder:text-secondary" placeholder="Search applications..." />
                </div>
                <div className="flex gap-sm">
                  <select className="border border-outline-variant rounded-lg px-md py-sm text-body-md bg-white outline-none">
                    <option>All Status</option><option>Pending Review</option><option>Approved</option><option>Documents Missing</option><option>Interview Scheduled</option>
                  </select>
                  <select className="border border-outline-variant rounded-lg px-md py-sm text-body-md bg-white outline-none">
                    <option>All Grades</option><option>Grade 1</option><option>Grade 2</option><option>Grade 3</option>
                  </select>
                </div>
              </div>
              <div className="tonal-card rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead className="bg-surface-container-low">
                    <tr>{['Applicant', 'Grade Applied', 'Applied', 'Documents', 'Status', 'Actions'].map(h => (
                      <th key={h} className="text-left px-md py-sm text-label-sm font-bold text-secondary uppercase whitespace-nowrap">{h}</th>
                    ))}</tr>
                  </thead>
                  <tbody>
                    {applications.map(a => (
                      <tr key={a.name} className="border-t border-outline-variant hover:bg-surface-container-low transition-colors">
                        <td className="px-md py-md">
                          <div className="flex items-center gap-sm">
                            <div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-label-sm">
                              {a.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                            </div>
                            <div>
                              <p className="text-label-md font-semibold whitespace-nowrap">{a.name}</p>
                              <p className="text-label-sm text-secondary">{a.phone}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-md py-md text-body-md text-secondary whitespace-nowrap">{a.grade}</td>
                        <td className="px-md py-md text-body-md text-secondary whitespace-nowrap">{a.applied}</td>
                        <td className="px-md py-md">
                          <div className="flex items-center gap-sm">
                            <div className="w-16 h-1.5 bg-surface-container rounded-full">
                              <div className={clsx('h-1.5 rounded-full', a.docs === a.required ? 'bg-primary' : 'bg-yellow-400')} style={{ width: `${(a.docs / a.required) * 100}%` }} />
                            </div>
                            <span className="text-label-sm font-semibold">{a.docs}/{a.required}</span>
                          </div>
                        </td>
                        <td className="px-md py-md">
                          <span className={clsx('text-label-sm font-bold px-sm py-xs rounded-full whitespace-nowrap', statusColor(a.status))}>{a.status}</span>
                        </td>
                        <td className="px-md py-md">
                          <div className="flex gap-xs">
                            <button className="text-label-sm text-primary font-semibold hover:underline">Review</button>
                            {a.status === 'Pending Review' && <button className="text-label-sm text-primary font-semibold hover:underline ml-sm">Approve</button>}
                            {a.status === 'Documents Missing' && <button className="text-label-sm text-error font-semibold hover:underline ml-sm">Remind</button>}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── REGISTER STUDENT ── */}
          {tab === 'Register Student' && (
            <div className="max-w-[42rem] mx-auto">
              <div className="tonal-card rounded-xl overflow-hidden">
                <div className="bg-primary text-on-primary p-lg">
                  <h2 className="text-title-lg font-bold">Student Registration Wizard</h2>
                  <p className="text-body-md opacity-80">Complete all 3 steps to register a new student</p>
                  <div className="flex gap-sm mt-md">
                    {['Personal Details', 'Parent/Guardian', 'Documents'].map((s, i) => (
                      <div key={s} className="flex items-center gap-xs">
                        <div className={clsx('w-7 h-7 rounded-full flex items-center justify-center text-label-sm font-bold', i + 1 <= regStep ? 'bg-white text-primary' : 'bg-white/25 text-white')}>{i + 1}</div>
                        <span className="text-label-sm hidden sm:block opacity-90">{s}</span>
                        {i < 2 && <span className="material-symbols-outlined text-[16px] opacity-40 mx-xs">chevron_right</span>}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-lg">
                  {regStep === 1 && (
                    <div className="flex flex-col gap-md">
                      <h3 className="text-title-md font-bold">Step 1: Student Details</h3>
                      <div className="grid grid-cols-2 gap-md">
                        <div>
                          <label className="text-label-md font-semibold block mb-xs">First Name</label>
                          <input className="w-full border border-outline-variant rounded-lg px-md py-sm text-body-md outline-none focus:border-primary" placeholder="e.g. Amina" />
                        </div>
                        <div>
                          <label className="text-label-md font-semibold block mb-xs">Last Name</label>
                          <input className="w-full border border-outline-variant rounded-lg px-md py-sm text-body-md outline-none focus:border-primary" placeholder="e.g. Odhiambo" />
                        </div>
                      </div>
                      <div>
                        <label className="text-label-md font-semibold block mb-xs">Date of Birth</label>
                        <input type="date" className="w-full border border-outline-variant rounded-lg px-md py-sm text-body-md outline-none focus:border-primary" />
                      </div>
                      <div>
                        <label className="text-label-md font-semibold block mb-xs">Gender</label>
                        <select className="w-full border border-outline-variant rounded-lg px-md py-sm text-body-md outline-none bg-white">
                          <option>Female</option><option>Male</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-label-md font-semibold block mb-xs">Grade Applying For</label>
                        <select className="w-full border border-outline-variant rounded-lg px-md py-sm text-body-md outline-none bg-white">
                          {['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6'].map(g => <option key={g}>{g}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="text-label-md font-semibold block mb-xs">Previous School (if any)</label>
                        <input className="w-full border border-outline-variant rounded-lg px-md py-sm text-body-md outline-none focus:border-primary" placeholder="e.g. Sunrise Primary School" />
                      </div>
                    </div>
                  )}
                  {regStep === 2 && (
                    <div className="flex flex-col gap-md">
                      <h3 className="text-title-md font-bold">Step 2: Parent / Guardian Details</h3>
                      {[['Full Name', 'text', 'e.g. Mrs. Odhiambo'], ['Relationship', 'text', 'Mother / Father / Guardian'], ['Phone Number', 'tel', '+254700000000'], ['Email', 'email', 'parent@email.com'], ['National ID Number', 'text', 'e.g. 12345678']].map(([label, type, ph]) => (
                        <div key={label as string}>
                          <label className="text-label-md font-semibold block mb-xs">{label}</label>
                          <input type={type as string} className="w-full border border-outline-variant rounded-lg px-md py-sm text-body-md outline-none focus:border-primary" placeholder={ph as string} />
                        </div>
                      ))}
                    </div>
                  )}
                  {regStep === 3 && (
                    <div className="flex flex-col gap-md">
                      <h3 className="text-title-md font-bold">Step 3: Required Documents</h3>
                      {['Birth Certificate', 'School Leaving Certificate', "Parent's National ID", 'Passport Photo (4 copies)'].map((doc, i) => (
                        <div key={doc} className="border border-dashed border-outline-variant rounded-xl p-md flex items-center justify-between hover:border-primary transition-colors cursor-pointer">
                          <div className="flex items-center gap-sm">
                            <span className={clsx('material-symbols-outlined text-[24px]', i < 2 ? 'text-primary' : 'text-secondary')}>{i < 2 ? 'check_circle' : 'upload_file'}</span>
                            <span className="text-label-md font-semibold">{doc}</span>
                          </div>
                          <span className={clsx('text-label-sm font-bold', i < 2 ? 'text-primary' : 'text-secondary')}>{i < 2 ? 'Uploaded ✓' : 'Upload'}</span>
                        </div>
                      ))}
                      <div className="bg-surface-container-low rounded-xl p-md">
                        <p className="text-label-md font-semibold mb-xs">Admission Number (auto-generated)</p>
                        <p className="text-headline-sm font-bold text-primary font-mono">GW-1A-087</p>
                        <p className="text-label-sm text-secondary">This number is assigned upon approval and payment of admission fee.</p>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between mt-lg pt-md border-t border-outline-variant">
                    <button onClick={() => setRegStep(Math.max(1, regStep - 1))} disabled={regStep === 1} className="px-md py-sm border border-outline-variant rounded-lg text-label-md disabled:opacity-40 hover:bg-surface-container transition-colors">← Back</button>
                    <button onClick={() => setRegStep(Math.min(3, regStep + 1))} className="px-lg py-sm bg-primary text-on-primary rounded-lg text-label-md font-bold hover:opacity-90 transition-opacity">
                      {regStep === 3 ? 'Submit Application' : 'Next →'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── DOCUMENTS ── */}
          {tab === 'Documents' && (
            <div className="flex flex-col gap-md">
              <h3 className="text-title-md font-bold">Pending Document Submissions</h3>
              {applications.filter(a => a.docs < a.required).map(a => (
                <div key={a.name} className="tonal-card rounded-xl p-md flex items-center justify-between gap-md">
                  <div className="flex items-center gap-sm">
                    <div className="w-9 h-9 rounded-full bg-error/10 flex items-center justify-center">
                      <span className="material-symbols-outlined text-error text-[20px]">warning</span>
                    </div>
                    <div>
                      <p className="text-label-md font-semibold">{a.name}</p>
                      <p className="text-label-sm text-secondary">{a.grade} · {a.docs}/{a.required} documents submitted</p>
                    </div>
                  </div>
                  <div className="flex gap-sm">
                    <button className="text-label-sm px-md py-sm border border-outline-variant rounded-lg text-secondary hover:bg-surface-container">Send Reminder</button>
                    <button className="text-label-sm px-md py-sm bg-primary text-on-primary rounded-lg font-semibold hover:opacity-90">Upload Docs</button>
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
