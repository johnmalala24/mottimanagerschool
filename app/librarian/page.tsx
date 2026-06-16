'use client'
import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import clsx from 'clsx'

const navItems = [
  { label: 'Dashboard', icon: 'dashboard', href: '/librarian' },
  { label: 'Book Catalog', icon: 'menu_book', href: '/librarian/catalog' },
  { label: 'Issue Book', icon: 'outbox', href: '/librarian/issue' },
  { label: 'Returns', icon: 'move_to_inbox', href: '/librarian/returns' },
  { label: 'Fine Management', icon: 'payments', href: '/librarian/fines' },
  { label: 'Borrowing History', icon: 'history', href: '/librarian/history' },
  { label: 'Library Reports', icon: 'bar_chart', href: '/librarian/reports' },
]
const bottomItems = [
  { label: 'Settings', icon: 'settings', href: '/librarian/settings' },
  { label: 'Support', icon: 'help', href: '/librarian/support' },
]

const books = [
  { isbn: '978-9966-57-001-3', title: 'Mathematics Grade 4', author: 'KIE Publishers', category: 'Textbook', copies: 45, available: 32, status: 'Available' },
  { isbn: '978-9966-08-123-5', title: 'Adventures in English', author: 'Longhorn', category: 'Literature', copies: 20, available: 8, status: 'Available' },
  { isbn: '978-0-19-845621-0', title: 'Kenya: Our Country', author: 'OUP East Africa', category: 'Social Studies', copies: 30, available: 0, status: 'All Issued' },
  { isbn: '978-9966-57-044-0', title: 'Science Alive Grade 5', author: 'Mentor Publishers', category: 'Textbook', copies: 35, available: 21, status: 'Available' },
  { isbn: '978-1-4231-0533-8', title: 'Our Environment', author: 'Storymoja', category: 'Environmental', copies: 15, available: 12, status: 'Available' },
]

const recentIssues = [
  { student: 'Amina Odhiambo', class: '4A', adm: 'GW-4A-001', book: 'Adventures in English', issued: 'Jun 10', due: 'Jun 24', status: 'Active', fine: 0 },
  { student: 'Brian Otieno', class: '4A', adm: 'GW-4A-004', book: 'Kenya: Our Country', issued: 'Jun 5', due: 'Jun 16', status: 'Overdue', fine: 150 },
  { student: 'Faith Wanjiku', class: '4A', adm: 'GW-4A-005', book: 'Mathematics Grade 4', issued: 'Jun 12', due: 'Jun 26', status: 'Active', fine: 0 },
  { student: 'Hassan Nur', class: '4A', adm: 'GW-4A-006', book: 'Science Alive Grade 5', issued: 'Jun 8', due: 'Jun 22', status: 'Active', fine: 0 },
]

const TABS = ['Dashboard', 'Book Catalog', 'Issue / Return', 'Fine Management']

export default function LibrarianPage() {
  const [tab, setTab] = useState('Dashboard')
  const [studentSearch, setStudentSearch] = useState('')
  const [bookSearch, setBookSearch] = useState('')
  const [issued, setIssued] = useState(false)
  const [returned, setReturned] = useState(false)

  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar title="MottiManager" subtitle="Library Portal" navItems={navItems} bottomItems={bottomItems} userName="Mr. Samuel Ochieng" userRole="Head Librarian" />
      <main className="ml-64 flex-1 flex flex-col min-h-screen">
        <div className="sticky top-0 z-10 bg-surface-container-lowest border-b border-outline-variant px-lg py-md flex items-center justify-between">
          <div>
            <h1 className="text-headline-sm font-bold text-on-surface">Library Management</h1>
            <p className="text-body-md text-secondary">Greenwood Academy Library · Term 2, 2024</p>
          </div>
          <div className="flex gap-sm">
            <button onClick={() => setTab('Issue / Return')} className="flex items-center gap-xs px-md py-sm border border-outline-variant rounded-lg text-label-md text-secondary hover:bg-surface-container">
              <span className="material-symbols-outlined text-[18px]">download</span> Export
            </button>
            <button onClick={() => setTab('Book Catalog')} className="flex items-center gap-xs bg-primary text-on-primary px-md py-sm rounded-lg text-label-md font-semibold hover:opacity-90">
              <span className="material-symbols-outlined text-[18px]">add</span> Add Book
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
                  { label: 'Total Books', value: '1,240', sub: '48 categories', icon: 'menu_book', bc: 'text-secondary bg-surface-container', badge: 'Catalog' },
                  { label: 'Books Issued', value: '342', sub: 'This term', icon: 'outbox', bc: 'text-tertiary bg-tertiary/10', badge: 'Active' },
                  { label: 'Overdue Returns', value: '18', sub: 'Fine pending', icon: 'schedule', bc: 'text-error bg-error/10', badge: 'Overdue' },
                  { label: 'Fines Collected', value: 'KES 4,200', sub: 'This term', icon: 'payments', bc: 'text-primary bg-primary/10', badge: 'Collected' },
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

              {/* Quick Issue/Return */}
              <div className="tonal-card rounded-xl p-lg">
                <h3 className="text-title-md font-bold mb-md">Quick Issue / Return</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
                  <div className="flex items-center gap-xs bg-surface-container border border-outline-variant rounded-lg px-md py-sm">
                    <span className="material-symbols-outlined text-secondary">person_search</span>
                    <input value={studentSearch} onChange={e => setStudentSearch(e.target.value)} className="bg-transparent text-body-md outline-none flex-1 placeholder:text-secondary" placeholder="Search student..." />
                  </div>
                  <div className="flex items-center gap-xs bg-surface-container border border-outline-variant rounded-lg px-md py-sm">
                    <span className="material-symbols-outlined text-secondary">search</span>
                    <input value={bookSearch} onChange={e => setBookSearch(e.target.value)} className="bg-transparent text-body-md outline-none flex-1 placeholder:text-secondary" placeholder="Search book / ISBN..." />
                  </div>
                  <div className="flex gap-sm">
                    <button onClick={() => { setIssued(true); setTimeout(() => setIssued(false), 3000) }} className={clsx('flex-1 py-sm rounded-lg text-label-md font-bold transition-all', issued ? 'bg-primary/10 text-primary' : 'bg-primary text-on-primary hover:opacity-90')}>
                      {issued ? '✓ Issued!' : 'Issue Book'}
                    </button>
                    <button onClick={() => { setReturned(true); setTimeout(() => setReturned(false), 3000) }} className={clsx('flex-1 py-sm rounded-lg text-label-md font-bold border transition-all', returned ? 'bg-tertiary/10 text-tertiary border-tertiary/30' : 'border-outline-variant text-secondary hover:bg-surface-container')}>
                      {returned ? '✓ Returned!' : 'Return Book'}
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg">
                <div className="tonal-card rounded-xl p-lg">
                  <h3 className="text-title-md font-bold mb-md">Recent Issues</h3>
                  <div className="flex flex-col divide-y divide-outline-variant">
                    {recentIssues.map(r => (
                      <div key={r.student + r.book} className="py-md flex items-center justify-between gap-md">
                        <div>
                          <p className="text-label-md font-semibold">{r.student} <span className="text-secondary font-normal">({r.class})</span></p>
                          <p className="text-label-sm text-secondary">{r.book}</p>
                          <p className="text-label-sm text-secondary">Issued: {r.issued} · Due: {r.due}</p>
                        </div>
                        <div className="flex flex-col items-end gap-xs flex-shrink-0">
                          <span className={clsx('text-label-sm font-bold px-sm py-xs rounded-full whitespace-nowrap', r.status === 'Overdue' ? 'bg-error/10 text-error' : 'bg-primary/10 text-primary')}>{r.status}</span>
                          {r.status === 'Overdue' && <button className="text-label-sm text-error font-semibold hover:underline whitespace-nowrap">Send Reminder</button>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="tonal-card rounded-xl p-lg">
                  <h3 className="text-title-md font-bold mb-md">Outstanding Fines</h3>
                  {recentIssues.filter(r => r.fine > 0).map(r => (
                    <div key={r.student} className="flex items-center justify-between py-md border-b border-outline-variant last:border-0">
                      <div>
                        <p className="text-label-md font-semibold">{r.student}</p>
                        <p className="text-label-sm text-secondary">{r.book} · Overdue {Math.ceil((new Date('2024-06-16').getTime() - new Date('2024-' + r.due.replace('Jun ', '06-').padStart(5, '0')).getTime()) / 86400000)} days</p>
                      </div>
                      <div className="flex items-center gap-sm">
                        <span className="text-label-md font-bold text-error">KES {r.fine}</span>
                        <button className="text-label-sm bg-primary text-on-primary px-sm py-xs rounded font-semibold">Collect</button>
                      </div>
                    </div>
                  ))}
                  <div className="mt-md pt-md border-t border-outline-variant flex justify-between text-label-md">
                    <span className="text-secondary">Total Outstanding</span>
                    <span className="font-bold text-error">KES {recentIssues.reduce((a, r) => a + r.fine, 0)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── BOOK CATALOG ── */}
          {tab === 'Book Catalog' && (
            <div className="flex flex-col gap-md">
              <div className="flex items-center justify-between gap-md">
                <div className="flex items-center gap-xs bg-surface-container border border-outline-variant rounded-lg px-md py-sm flex-1 max-w-[28rem]">
                  <span className="material-symbols-outlined text-[18px] text-secondary">search</span>
                  <input className="bg-transparent text-body-md outline-none w-full placeholder:text-secondary" placeholder="Search by title, author, or ISBN..." />
                </div>
                <div className="flex gap-sm">
                  <select className="border border-outline-variant rounded-lg px-md py-sm text-body-md bg-white outline-none">
                    <option>All Categories</option><option>Textbook</option><option>Literature</option><option>Social Studies</option>
                  </select>
                  <button className="flex items-center gap-xs bg-primary text-on-primary px-md py-sm rounded-lg text-label-md font-semibold hover:opacity-90">
                    <span className="material-symbols-outlined text-[18px]">add</span> Add Book
                  </button>
                </div>
              </div>
              <div className="tonal-card rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead className="bg-surface-container-low">
                    <tr>{['ISBN', 'Title', 'Author', 'Category', 'Copies', 'Available', 'Status'].map(h => (
                      <th key={h} className="text-left px-md py-sm text-label-sm font-bold text-secondary uppercase whitespace-nowrap">{h}</th>
                    ))}</tr>
                  </thead>
                  <tbody>
                    {books.map(b => (
                      <tr key={b.isbn} className="border-t border-outline-variant hover:bg-surface-container-low transition-colors">
                        <td className="px-md py-md text-label-sm font-mono text-secondary whitespace-nowrap">{b.isbn}</td>
                        <td className="px-md py-md text-label-md font-semibold">{b.title}</td>
                        <td className="px-md py-md text-body-md text-secondary whitespace-nowrap">{b.author}</td>
                        <td className="px-md py-md"><span className="text-label-sm bg-surface-container px-sm py-xs rounded-full text-secondary">{b.category}</span></td>
                        <td className="px-md py-md text-body-md text-center">{b.copies}</td>
                        <td className="px-md py-md">
                          <div className="flex items-center gap-sm">
                            <div className="w-12 h-1.5 bg-surface-container rounded-full">
                              <div className={clsx('h-1.5 rounded-full', b.available > 0 ? 'bg-primary' : 'bg-error')} style={{ width: `${(b.available / b.copies) * 100}%` }} />
                            </div>
                            <span className="text-label-sm font-semibold">{b.available}/{b.copies}</span>
                          </div>
                        </td>
                        <td className="px-md py-md">
                          <span className={clsx('text-label-sm font-bold px-sm py-xs rounded-full whitespace-nowrap', b.status === 'Available' ? 'bg-primary/10 text-primary' : 'bg-error/10 text-error')}>{b.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── ISSUE / RETURN ── */}
          {tab === 'Issue / Return' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg">
              <div className="tonal-card rounded-xl p-lg">
                <h3 className="text-title-md font-bold mb-md flex items-center gap-sm">
                  <span className="material-symbols-outlined text-primary">outbox</span> Issue Book
                </h3>
                {issued && (
                  <div className="mb-md bg-primary/10 border border-primary/20 rounded-xl p-md flex items-center gap-sm">
                    <span className="material-symbols-outlined text-primary icon-filled">check_circle</span>
                    <p className="text-label-md font-bold text-primary">Book issued successfully! Return date: Jun 30, 2024</p>
                  </div>
                )}
                <div className="flex flex-col gap-md">
                  <div>
                    <label className="text-label-md font-semibold block mb-xs">Student (Admission No.)</label>
                    <div className="flex items-center gap-xs bg-surface-container border border-outline-variant rounded-lg px-md py-sm">
                      <span className="material-symbols-outlined text-secondary">person_search</span>
                      <input className="bg-transparent text-body-md outline-none flex-1 placeholder:text-secondary" placeholder="Search student..." />
                    </div>
                  </div>
                  <div>
                    <label className="text-label-md font-semibold block mb-xs">Book (Title or ISBN)</label>
                    <div className="flex items-center gap-xs bg-surface-container border border-outline-variant rounded-lg px-md py-sm">
                      <span className="material-symbols-outlined text-secondary">search</span>
                      <input className="bg-transparent text-body-md outline-none flex-1 placeholder:text-secondary" placeholder="Search book..." />
                    </div>
                  </div>
                  <div>
                    <label className="text-label-md font-semibold block mb-xs">Return Date</label>
                    <input type="date" className="w-full border border-outline-variant rounded-lg px-md py-sm text-body-md outline-none" defaultValue="2024-06-30" />
                  </div>
                  <button onClick={() => { setIssued(true); setTimeout(() => setIssued(false), 3000) }} className={clsx('py-sm rounded-lg text-label-md font-bold transition-all flex items-center justify-center gap-xs', issued ? 'bg-primary/10 text-primary' : 'bg-primary text-on-primary hover:opacity-90')}>
                    <span className="material-symbols-outlined text-[18px]">{issued ? 'check' : 'outbox'}</span>
                    {issued ? 'Issued!' : 'Issue Book'}
                  </button>
                </div>
              </div>

              <div className="tonal-card rounded-xl p-lg">
                <h3 className="text-title-md font-bold mb-md flex items-center gap-sm">
                  <span className="material-symbols-outlined text-tertiary">move_to_inbox</span> Return Book
                </h3>
                {returned && (
                  <div className="mb-md bg-tertiary/10 border border-tertiary/20 rounded-xl p-md flex items-center gap-sm">
                    <span className="material-symbols-outlined text-tertiary icon-filled">check_circle</span>
                    <p className="text-label-md font-bold text-tertiary">Book returned! Library records updated.</p>
                  </div>
                )}
                <div className="flex flex-col gap-md">
                  <div>
                    <label className="text-label-md font-semibold block mb-xs">Active Issues — Scan or Select</label>
                    <div className="flex flex-col gap-sm">
                      {recentIssues.map(r => (
                        <label key={r.student + r.book} className="flex items-start gap-sm p-sm bg-surface-container-low rounded-lg cursor-pointer hover:bg-surface-container transition-colors">
                          <input type="radio" name="return" className="mt-xs accent-primary" />
                          <div>
                            <p className="text-label-md font-semibold">{r.student} · {r.book}</p>
                            <p className="text-label-sm text-secondary">Due: {r.due}</p>
                            {r.status === 'Overdue' && <p className="text-label-sm text-error font-bold">⚠ Overdue — Fine: KES {r.fine}</p>}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                  <button onClick={() => { setReturned(true); setTimeout(() => setReturned(false), 3000) }} className={clsx('py-sm rounded-lg text-label-md font-bold transition-all border flex items-center justify-center gap-xs', returned ? 'bg-tertiary/10 text-tertiary border-tertiary/30' : 'bg-tertiary text-on-tertiary border-transparent hover:opacity-90')}>
                    <span className="material-symbols-outlined text-[18px]">{returned ? 'check' : 'move_to_inbox'}</span>
                    {returned ? 'Returned!' : 'Confirm Return'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ── FINE MANAGEMENT ── */}
          {tab === 'Fine Management' && (
            <div className="flex flex-col gap-md">
              <div className="grid grid-cols-3 gap-md">
                {[
                  { label: 'Outstanding Fines', value: 'KES 2,850', color: 'text-error', bc: 'bg-error/10' },
                  { label: 'Collected This Term', value: 'KES 4,200', color: 'text-primary', bc: 'bg-primary/10' },
                  { label: 'Students with Fines', value: '8', color: 'text-secondary', bc: 'bg-surface-container' },
                ].map(s => (
                  <div key={s.label} className="tonal-card rounded-xl p-lg text-center">
                    <p className={clsx('text-headline-sm font-bold', s.color)}>{s.value}</p>
                    <p className="text-label-md text-secondary mt-xs">{s.label}</p>
                  </div>
                ))}
              </div>
              <div className="tonal-card rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead className="bg-surface-container-low">
                    <tr>{['Student', 'Book', 'Days Overdue', 'Fine (KES 10/day)', 'Status', 'Actions'].map(h => (
                      <th key={h} className="text-left px-md py-sm text-label-sm font-bold text-secondary uppercase whitespace-nowrap">{h}</th>
                    ))}</tr>
                  </thead>
                  <tbody>
                    {recentIssues.filter(r => r.status === 'Overdue').map(r => (
                      <tr key={r.student} className="border-t border-outline-variant hover:bg-surface-container-low">
                        <td className="px-md py-md text-label-md font-semibold whitespace-nowrap">{r.student}</td>
                        <td className="px-md py-md text-body-md text-secondary">{r.book}</td>
                        <td className="px-md py-md text-label-md font-bold text-error">15 days</td>
                        <td className="px-md py-md text-label-md font-bold text-error">KES 150</td>
                        <td className="px-md py-md"><span className="text-label-sm font-bold bg-error/10 text-error px-sm py-xs rounded-full">Unpaid</span></td>
                        <td className="px-md py-md">
                          <div className="flex gap-sm">
                            <button className="text-label-sm text-primary font-semibold hover:underline">Collect</button>
                            <button className="text-label-sm text-secondary font-semibold hover:underline">Waive</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
