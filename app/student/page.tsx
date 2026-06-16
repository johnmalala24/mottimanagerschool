'use client'
import Sidebar from '@/components/Sidebar'

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
]

const assignments = [
  { title: 'Fractions Worksheet', subject: 'Mathematics', due: 'Today', status: 'Due', urgent: true },
  { title: 'Short Story Writing', subject: 'English', due: 'Jun 19', status: 'Pending', urgent: false },
  { title: 'Plant Cell Diagram', subject: 'Science', due: 'Jun 20', status: 'Submitted', urgent: false },
]

export default function StudentDashboard() {
  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar
        title="EduSmart"
        subtitle="Student Portal"
        navItems={navItems}
        bottomItems={bottomItems}
        userName="Amina Odhiambo"
        userRole="Grade 4A · Greenwood Academy"
      />

      <main className="md:ml-64 flex-1 p-gutter pb-20 md:pb-gutter">
        {/* Welcome Header */}
        <header className="mb-xl">
          <div className="flex items-center gap-md mb-sm">
            <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-on-primary text-xl font-bold">
              AO
            </div>
            <div>
              <h2 className="text-headline-lg font-bold text-on-surface">Good Morning, Amina! 👋</h2>
              <p className="text-body-md text-secondary">Grade 4A · Term 2, 2024 · June 16, 2024</p>
            </div>
          </div>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-lg mb-xl">
          {[
            { label: 'Average Score', value: '88%', icon: 'grade', bg: 'bg-primary/10', color: 'text-primary', sub: 'Class Rank: 2nd' },
            { label: 'Attendance', value: '98%', icon: 'fact_check', bg: 'bg-tertiary/10', color: 'text-tertiary', sub: 'This term' },
            { label: 'Assignments Due', value: '2', icon: 'assignment', bg: 'bg-error-container/40', color: 'text-error', sub: 'Submit today' },
            { label: 'CBE Level', value: 'Level 4', icon: 'auto_awesome', bg: 'bg-primary/10', color: 'text-primary', sub: 'Exceeding' },
          ].map((s) => (
            <div key={s.label} className="glass-card p-lg rounded-xl">
              <div className={`w-10 h-10 ${s.bg} ${s.color} rounded-xl flex items-center justify-center mb-md`}>
                <span className="material-symbols-outlined">{s.icon}</span>
              </div>
              <p className="text-label-sm text-secondary">{s.label}</p>
              <h3 className="text-title-md font-bold mt-xs">{s.value}</h3>
              <p className={`text-label-sm mt-xs ${s.color}`}>{s.sub}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg mb-lg">
          {/* Today's Timetable */}
          <div className="tonal-card rounded-xl overflow-hidden">
            <div className="p-lg border-b border-outline-variant flex justify-between items-center">
              <h3 className="text-title-md font-bold">Today's Timetable</h3>
              <span className="text-label-sm text-secondary">Monday</span>
            </div>
            <div className="divide-y divide-outline-variant">
              {timetable.map((t) => (
                <div key={t.time} className={`p-md flex items-center gap-md ${t.current ? 'bg-primary/5 border-l-4 border-l-primary' : ''}`}>
                  <div className="text-right min-w-[60px]">
                    <p className={`text-label-sm font-bold ${t.current ? 'text-primary' : 'text-secondary'}`}>{t.time}</p>
                  </div>
                  {t.subject === 'Break' ? (
                    <div className="flex-1">
                      <p className="text-label-md text-secondary italic">Break Time</p>
                    </div>
                  ) : (
                    <div className="flex-1">
                      <p className={`text-label-md font-bold ${t.current ? 'text-primary' : ''}`}>{t.subject}</p>
                      <p className="text-label-sm text-secondary">{t.teacher} · {t.room}</p>
                    </div>
                  )}
                  {t.current && <span className="text-label-sm font-bold text-primary bg-primary/10 px-sm py-xs rounded-full">Now</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Assignments */}
          <div className="tonal-card rounded-xl overflow-hidden">
            <div className="p-lg border-b border-outline-variant flex justify-between items-center">
              <h3 className="text-title-md font-bold">My Assignments</h3>
              <button className="text-primary text-label-md font-medium hover:underline">View All</button>
            </div>
            <div className="divide-y divide-outline-variant">
              {assignments.map((a) => (
                <div key={a.title} className={`p-lg ${a.urgent ? 'bg-error-container/10' : ''}`}>
                  <div className="flex justify-between items-start mb-sm">
                    <div>
                      <p className="text-label-md font-bold">{a.title}</p>
                      <p className="text-label-sm text-secondary">{a.subject}</p>
                    </div>
                    <span className={`text-label-sm font-bold px-sm py-xs rounded-full ${a.status === 'Submitted' ? 'bg-primary/10 text-primary' : a.urgent ? 'bg-error-container text-on-error-container' : 'bg-secondary-container text-secondary'}`}>
                      {a.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-label-sm text-secondary">Due: {a.due}</span>
                    {a.status !== 'Submitted' && (
                      <button className="text-primary text-label-sm font-medium hover:underline">Submit Now</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CBE Portfolio */}
          <div className="tonal-card rounded-xl overflow-hidden">
            <div className="p-lg border-b border-outline-variant">
              <h3 className="text-title-md font-bold">My CBE Portfolio</h3>
              <p className="text-label-sm text-secondary">Competency mastery progress</p>
            </div>
            <div className="p-lg space-y-md">
              {[
                { name: 'Numeracy', level: 4, pct: 100 },
                { name: 'Communication', level: 3, pct: 75 },
                { name: 'Science & Tech', level: 4, pct: 100 },
                { name: 'Life Skills', level: 3, pct: 75 },
                { name: 'Creative Arts', level: 2, pct: 50 },
              ].map((c) => (
                <div key={c.name}>
                  <div className="flex justify-between mb-xs">
                    <span className="text-label-md">{c.name}</span>
                    <span className={`text-label-sm font-bold ${c.level >= 3 ? 'text-primary' : 'text-secondary'}`}>Level {c.level}</span>
                  </div>
                  <div className="flex gap-xs">
                    {[1, 2, 3, 4].map((lvl) => (
                      <div
                        key={lvl}
                        className={`progress-step flex-1 ${lvl <= c.level ? (c.level === 4 ? 'bg-primary' : c.level === 3 ? 'bg-primary/70' : 'bg-primary/40') : 'bg-surface-container-high'}`}
                      ></div>
                    ))}
                  </div>
                </div>
              ))}
              <button className="w-full mt-md py-sm border border-primary/30 text-primary rounded-lg text-label-md font-medium hover:bg-primary/5 transition-colors">
                View Full Portfolio
              </button>
            </div>
          </div>
        </div>

        {/* Recent Results & Announcements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg">
          <div className="tonal-card rounded-xl overflow-hidden">
            <div className="p-lg border-b border-outline-variant">
              <h3 className="text-title-md font-bold">Recent Exam Results</h3>
            </div>
            <div className="p-lg space-y-md">
              {[
                { subject: 'Mathematics', exam: 'Mid-Term', score: 92, max: 100 },
                { subject: 'English', exam: 'Mid-Term', score: 85, max: 100 },
                { subject: 'Science', exam: 'Mid-Term', score: 88, max: 100 },
                { subject: 'Kiswahili', exam: 'Mid-Term', score: 78, max: 100 },
              ].map((r) => (
                <div key={r.subject} className="flex items-center gap-md">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${r.score >= 80 ? 'bg-primary text-on-primary' : 'bg-secondary-container text-on-secondary-container'}`}>
                    {r.score >= 80 ? 'A' : 'B'}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between mb-xs">
                      <span className="text-label-md font-medium">{r.subject}</span>
                      <span className="text-label-md font-bold">{r.score}/{r.max}</span>
                    </div>
                    <div className="bg-surface-container rounded-full h-2">
                      <div className={`h-2 rounded-full ${r.score >= 80 ? 'bg-primary' : 'bg-tertiary'}`} style={{ width: `${r.score}%` }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="tonal-card rounded-xl overflow-hidden">
            <div className="p-lg border-b border-outline-variant">
              <h3 className="text-title-md font-bold">School Announcements</h3>
            </div>
            <div className="divide-y divide-outline-variant">
              {[
                { title: 'End-Term Exams', msg: 'Final exams start June 24th. Revise all topics!', time: 'Today', icon: 'campaign', color: 'text-error' },
                { title: 'Sports Day', msg: 'Annual sports day June 28th. Register for events by Friday.', time: '2 days ago', icon: 'sports_soccer', color: 'text-tertiary' },
                { title: 'Library Books Due', msg: 'Return all library books by June 20th to avoid fines.', time: '3 days ago', icon: 'menu_book', color: 'text-secondary' },
              ].map((a) => (
                <div key={a.title} className="p-lg flex gap-md">
                  <div className={`w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center ${a.color} flex-shrink-0`}>
                    <span className="material-symbols-outlined text-[20px]">{a.icon}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <p className="text-label-md font-bold">{a.title}</p>
                      <span className="text-label-sm text-secondary">{a.time}</span>
                    </div>
                    <p className="text-label-sm text-secondary mt-xs">{a.msg}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
