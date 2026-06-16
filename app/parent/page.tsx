'use client'
import Sidebar from '@/components/Sidebar'

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

export default function ParentDashboard() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar
        title="MottiManager"
        subtitle="Parent Portal"
        navItems={navItems}
        bottomItems={bottomItems}
        userName="Mrs. Odhiambo"
        userRole="Parent / Guardian"
      />

      <main className="md:ml-64 flex-1 p-gutter pb-20 md:pb-gutter">
        {/* Header */}
        <header className="mb-xl">
          <h2 className="text-headline-lg font-bold text-on-surface">Parent Dashboard</h2>
          <p className="text-body-md text-secondary">Viewing: Amina Odhiambo · Grade 4A · Greenwood Academy</p>
        </header>

        {/* Student Card */}
        <div className="tonal-card rounded-xl p-lg mb-xl bg-gradient-to-r from-primary/5 to-tertiary/5 border-primary/10">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-lg">
            <div className="w-24 h-24 rounded-2xl bg-primary flex items-center justify-center text-on-primary text-display-lg font-bold flex-shrink-0">
              AO
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-headline-lg-mobile font-bold">Amina Odhiambo</h3>
              <p className="text-body-md text-secondary">Adm No: GW-4A-001 · Grade 4A</p>
              <div className="flex flex-wrap gap-sm mt-md justify-center md:justify-start">
                <span className="px-md py-xs bg-primary/10 text-primary rounded-full text-label-sm font-bold">Class Position: 2nd</span>
                <span className="px-md py-xs bg-tertiary/10 text-tertiary rounded-full text-label-sm font-bold">Attendance: 98%</span>
                <span className="px-md py-xs bg-primary/10 text-primary rounded-full text-label-sm font-bold">Term 2, 2024</span>
              </div>
            </div>
            <div className="flex flex-col gap-sm">
              <button className="px-md py-sm bg-primary text-on-primary rounded-lg text-label-md font-semibold flex items-center gap-xs hover:opacity-90">
                <span className="material-symbols-outlined text-[18px]">download</span>
                Download Report Card
              </button>
              <button className="px-md py-sm border border-outline text-on-surface rounded-lg text-label-md flex items-center gap-xs hover:bg-surface-variant">
                <span className="material-symbols-outlined text-[18px]">message</span>
                Message Teacher
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-lg mb-xl">
          {[
            { label: 'Overall Average', value: 'A (88%)', icon: 'grade', bg: 'bg-primary/10', color: 'text-primary', badge: '↑ from last term' },
            { label: 'Attendance Rate', value: '98%', icon: 'fact_check', bg: 'bg-tertiary/10', color: 'text-tertiary', badge: 'This term' },
            { label: 'Fee Balance', value: 'KES 0', icon: 'payments', bg: 'bg-primary/10', color: 'text-primary', badge: 'Fully Paid ✓' },
            { label: 'Assignments Due', value: '2', icon: 'assignment', bg: 'bg-error-container/40', color: 'text-error', badge: 'This week' },
          ].map((s) => (
            <div key={s.label} className="tonal-card p-lg rounded-xl">
              <div className={`w-10 h-10 ${s.bg} ${s.color} rounded-lg flex items-center justify-center mb-md`}>
                <span className="material-symbols-outlined">{s.icon}</span>
              </div>
              <p className="text-label-sm text-secondary">{s.label}</p>
              <h3 className="text-title-md font-bold mt-xs">{s.value}</h3>
              <p className={`text-label-sm mt-xs ${s.color}`}>{s.badge}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg mb-lg">
          {/* Exam Results */}
          <div className="lg:col-span-2 tonal-card rounded-xl overflow-hidden">
            <div className="p-lg border-b border-outline-variant flex justify-between items-center">
              <h3 className="text-title-md font-bold">Mid-Term Exam Results</h3>
              <span className="text-label-sm text-secondary bg-surface-container px-md py-xs rounded-full">Term 2, 2024</span>
            </div>
            <div className="p-lg space-y-md">
              {[
                { subject: 'Mathematics', score: 92, max: 100, grade: 'A', teacher: 'Mr. Ochieng' },
                { subject: 'English Language', score: 85, max: 100, grade: 'A-', teacher: 'Mr. Kamau' },
                { subject: 'Science', score: 88, max: 100, grade: 'A', teacher: 'Ms. Achieng' },
                { subject: 'Kiswahili', score: 78, max: 100, grade: 'B+', teacher: 'Ms. Wanjiku' },
                { subject: 'Social Studies', score: 83, max: 100, grade: 'A-', teacher: 'Mr. Omondi' },
              ].map((r) => (
                <div key={r.subject} className="flex items-center gap-md">
                  <div className="flex-1">
                    <div className="flex justify-between mb-xs">
                      <span className="text-label-md font-medium">{r.subject}</span>
                      <span className="text-label-md font-bold">{r.score}/{r.max} <span className={`ml-xs ${r.score >= 80 ? 'text-primary' : 'text-secondary'}`}>{r.grade}</span></span>
                    </div>
                    <div className="bg-surface-container rounded-full h-3">
                      <div className={`h-3 rounded-full ${r.score >= 80 ? 'bg-primary' : r.score >= 60 ? 'bg-tertiary' : 'bg-error'}`} style={{ width: `${r.score}%` }}></div>
                    </div>
                    <p className="text-label-sm text-secondary mt-xs">{r.teacher}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fee & Announcements */}
          <div className="flex flex-col gap-lg">
            {/* Fee Status */}
            <div className="tonal-card p-lg rounded-xl">
              <h3 className="text-title-md font-bold mb-md">Fee Statement</h3>
              <div className="space-y-sm">
                {[
                  { label: 'Tuition Fee', amount: 'KES 18,000', paid: true },
                  { label: 'Activity Fee', amount: 'KES 2,500', paid: true },
                  { label: 'Exam Fee', amount: 'KES 1,500', paid: true },
                  { label: 'Transport', amount: 'KES 3,000', paid: true },
                ].map((f) => (
                  <div key={f.label} className="flex justify-between items-center py-sm border-b border-outline-variant last:border-0">
                    <span className="text-label-md">{f.label}</span>
                    <div className="flex items-center gap-sm">
                      <span className="text-label-md font-bold">{f.amount}</span>
                      <span className="material-symbols-outlined text-primary icon-filled text-[18px]">check_circle</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-md pt-md border-t border-outline-variant flex justify-between">
                <span className="text-label-md font-bold">Balance</span>
                <span className="text-label-md font-bold text-primary">KES 0 (Fully Paid)</span>
              </div>
              <div className="mt-md p-md bg-primary/5 border border-primary/20 rounded-lg">
                <div className="flex items-center gap-sm">
                  <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center border border-outline-variant">
                    <span className="material-symbols-outlined text-primary icon-filled text-[16px]">smartphone</span>
                  </div>
                  <div>
                    <p className="text-label-sm font-bold text-primary">Last Payment via M-Pesa</p>
                    <p className="text-label-sm text-secondary">KES 25,000 · June 1, 2024</p>
                  </div>
                </div>
              </div>
            </div>

            {/* School Announcements */}
            <div className="tonal-card p-lg rounded-xl">
              <h3 className="text-title-md font-bold mb-md">School Announcements</h3>
              <div className="space-y-md">
                {[
                  { title: 'End-Term Exams', msg: 'Final exams begin June 24th. Students should revise all topics.', time: '2 days ago', priority: true },
                  { title: 'Sports Day', msg: 'Annual sports day is scheduled for June 28th. All students participate.', time: '3 days ago', priority: false },
                  { title: 'Parent Meeting', msg: 'Term 2 parent-teacher meeting on July 5th at 2 PM.', time: '1 week ago', priority: false },
                ].map((a) => (
                  <div key={a.title} className={`p-md rounded-lg border ${a.priority ? 'bg-primary/5 border-primary/20' : 'border-outline-variant'}`}>
                    <div className="flex justify-between items-start mb-xs">
                      <p className="text-label-md font-bold">{a.title}</p>
                      <span className="text-label-sm text-secondary">{a.time}</span>
                    </div>
                    <p className="text-label-sm text-secondary">{a.msg}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CBE Section */}
        <div className="tonal-card rounded-xl overflow-hidden">
          <div className="p-lg border-b border-outline-variant">
            <h3 className="text-title-md font-bold">CBE Competency Report — Term 2</h3>
            <p className="text-label-sm text-secondary">Amina's competency-based learning progress</p>
          </div>
          <div className="p-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-lg">
            {[
              { competency: 'Numeracy & Mathematics', level: 4, label: 'Exceeding Expectations', color: 'bg-primary' },
              { competency: 'Language & Communication', level: 3, label: 'Meeting Expectations', color: 'bg-primary/70' },
              { competency: 'Science & Environment', level: 4, label: 'Exceeding Expectations', color: 'bg-primary' },
              { competency: 'Social Studies', level: 3, label: 'Meeting Expectations', color: 'bg-primary/70' },
            ].map((c) => (
              <div key={c.competency} className="bg-surface-container-low rounded-xl p-md">
                <h4 className="text-label-md font-bold mb-md">{c.competency}</h4>
                <div className="flex gap-xs mb-sm">
                  {[1, 2, 3, 4].map((lvl) => (
                    <div
                      key={lvl}
                      className={`progress-step flex-1 ${lvl <= c.level ? c.color : 'bg-surface-container-high'}`}
                    ></div>
                  ))}
                </div>
                <span className={`text-label-sm font-bold ${c.level >= 3 ? 'text-primary' : 'text-secondary'}`}>Level {c.level}: {c.label}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
