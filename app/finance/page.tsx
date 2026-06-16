'use client'
import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import clsx from 'clsx'

const navItems = [
  { label: 'Dashboard', icon: 'dashboard', href: '/finance' },
  { label: 'Fee Structure', icon: 'account_balance_wallet', href: '/finance/fee-structure' },
  { label: 'Invoices', icon: 'receipt', href: '/finance/invoices' },
  { label: 'M-Pesa Tracking', icon: 'smartphone', href: '/finance/mpesa' },
  { label: 'Receipts', icon: 'receipt_long', href: '/finance/receipts' },
  { label: 'Balances', icon: 'account_balance', href: '/finance/balances' },
  { label: 'Expenses', icon: 'shopping_cart', href: '/finance/expenses' },
  { label: 'Reports', icon: 'bar_chart', href: '/finance/reports' },
]
const bottomItems = [
  { label: 'Settings', icon: 'settings', href: '/finance/settings' },
  { label: 'Support', icon: 'help', href: '/finance/support' },
]

const transactions = [
  { id: 'QGP4R1L4R5', name: 'Kamau Joseph', grade: 'Grade 4B', phone: '0712 *** 890', amount: 12500, status: 'STK Success', type: 'M-Pesa STK Push', time: '11:42 AM' },
  { id: 'QGP4R1L3V2', name: 'Zainab Abdi', grade: 'Grade 2A', phone: '0722 *** 112', amount: 8000, status: 'Manual Recon', type: 'Bank Transfer', time: '10:15 AM' },
  { id: 'QGP4R1L2M9', name: 'Brian Otieno', grade: 'Grade 6B', phone: '0790 *** 456', amount: 15750, status: 'Insufficient Funds', type: 'M-Pesa STK Push', time: '9:30 AM' },
  { id: 'QGP4R1L1K7', name: 'Faith Wanjiku', grade: 'Grade 3A', phone: '0701 *** 234', amount: 9000, status: 'STK Success', type: 'M-Pesa C2B', time: '8:55 AM' },
  { id: 'QGP4R0J8W3', name: 'Amina Odhiambo', grade: 'Grade 4A', phone: '0733 *** 567', amount: 18000, status: 'STK Success', type: 'M-Pesa STK Push', time: '8:20 AM' },
]

const feeStructure = [
  { class: 'Grade 1 – 3', tuition: 18000, activity: 2500, exam: 1500, transport: 3000, total: 25000 },
  { class: 'Grade 4 – 6', tuition: 22000, activity: 3000, exam: 2000, transport: 3000, total: 30000 },
  { class: 'Junior Secondary', tuition: 30000, activity: 4000, exam: 2500, transport: 3500, total: 40000 },
]

const invoices = [
  { inv: 'INV-2024-001', student: 'Amina Odhiambo', grade: 'Grade 4A', amount: 30000, paid: 30000, balance: 0, status: 'Paid' },
  { inv: 'INV-2024-002', student: 'Kelvin Mwai', grade: 'Grade 4A', amount: 30000, paid: 15000, balance: 15000, status: 'Partial' },
  { inv: 'INV-2024-003', student: 'Brian Otieno', grade: 'Grade 6B', amount: 40000, paid: 0, balance: 40000, status: 'Overdue' },
  { inv: 'INV-2024-004', student: 'Sarah Atieno', grade: 'Grade 1A', amount: 25000, paid: 25000, balance: 0, status: 'Paid' },
  { inv: 'INV-2024-005', student: 'Zara Abdi', grade: 'Grade 4A', amount: 30000, paid: 22000, balance: 8000, status: 'Partial' },
]

const TABS = ['Dashboard', 'Fee Structure', 'Invoices', 'M-Pesa', 'Expenses']

export default function FinancePage() {
  const [tab, setTab] = useState('Dashboard')
  const [stkPhone, setStkPhone] = useState('')
  const [stkAmount, setStkAmount] = useState('')
  const [stkSent, setStkSent] = useState(false)

  const sendStk = () => { if (stkPhone && stkAmount) { setStkSent(true); setTimeout(() => setStkSent(false), 4000) } }

  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar title="MottiManager" subtitle="Greenwood Academy" navItems={navItems} bottomItems={bottomItems} userName="Grace Kamau" userRole="Finance Lead" />
      <main className="ml-64 flex-1 flex flex-col min-h-screen">
        <div className="sticky top-0 z-10 bg-surface-container-lowest border-b border-outline-variant px-lg py-md flex items-center justify-between">
          <div>
            <h1 className="text-headline-sm font-bold text-on-surface">Bursar Portal</h1>
            <p className="text-body-md text-secondary">Term 2, 2024 Accounting Overview</p>
          </div>
          <div className="flex gap-sm">
            <button className="flex items-center gap-xs px-md py-sm border border-outline-variant rounded-lg text-label-md text-secondary hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">print</span> Print Report
            </button>
            <button className="flex items-center gap-xs bg-primary text-on-primary px-md py-sm rounded-lg text-label-md font-semibold hover:opacity-90">
              <span className="material-symbols-outlined text-[18px]">add</span> New Invoice
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
                  { label: 'Total Collection (Term 2)', value: 'KES 4.2M', sub: '↑ 12% vs Term 1', icon: 'payments', badge: '+12%', bc: 'text-primary bg-primary/10' },
                  { label: 'Outstanding Balances', value: 'KES 1.8M', sub: '42 students with balances', icon: 'warning', badge: 'Alert', bc: 'text-error bg-error/10' },
                  { label: 'M-Pesa Revenue (Today)', value: 'KES 124,500', sub: '● Live Sync Active', icon: 'smartphone', badge: 'Live', bc: 'text-primary bg-primary/10' },
                  { label: 'Next Disbursement', value: 'KES 450,000', sub: 'Scheduled: Jun 30', icon: 'account_balance', badge: 'Pending', bc: 'text-secondary bg-surface-container' },
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
                  <h3 className="text-title-md font-bold mb-md">Recent M-Pesa Transactions</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left">
                          {['Transaction ID', 'Student', 'Type', 'Amount', 'Status'].map(h => (
                            <th key={h} className="pb-sm text-label-sm text-secondary font-bold uppercase whitespace-nowrap pr-md">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {transactions.map(t => (
                          <tr key={t.id} className="border-t border-outline-variant">
                            <td className="py-sm pr-md text-label-sm font-mono text-secondary whitespace-nowrap">{t.id}</td>
                            <td className="py-sm pr-md whitespace-nowrap">
                              <p className="text-label-md font-semibold">{t.name}</p>
                              <p className="text-label-sm text-secondary">{t.grade}</p>
                            </td>
                            <td className="py-sm pr-md text-label-sm text-secondary whitespace-nowrap">{t.type}</td>
                            <td className="py-sm pr-md text-label-md font-bold text-on-surface whitespace-nowrap">KES {t.amount.toLocaleString()}</td>
                            <td className="py-sm">
                              <span className={clsx('text-label-sm font-bold px-sm py-xs rounded-full whitespace-nowrap', t.status === 'STK Success' ? 'bg-primary/10 text-primary' : t.status === 'Manual Recon' ? 'bg-tertiary/10 text-tertiary' : 'bg-error/10 text-error')}>
                                {t.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="flex flex-col gap-md">
                  <div className="tonal-card rounded-xl p-lg">
                    <h3 className="text-title-md font-bold mb-md">Fee Balances by Grade</h3>
                    {[
                      { grade: 'Grade 1 – 3', amount: 'KES 450,200', pct: 62 },
                      { grade: 'Grade 4 – 6', amount: 'KES 680,150', pct: 78 },
                      { grade: 'Junior Secondary', amount: 'KES 720,400', pct: 55 },
                    ].map(b => (
                      <div key={b.grade} className="mb-md">
                        <div className="flex justify-between text-label-sm mb-xs">
                          <span className="text-secondary">{b.grade}</span>
                          <span className="font-bold text-on-surface">{b.amount}</span>
                        </div>
                        <div className="h-2 bg-surface-container rounded-full">
                          <div className="h-2 bg-primary rounded-full" style={{ width: `${b.pct}%` }} />
                        </div>
                      </div>
                    ))}
                    <button className="w-full mt-sm border border-outline-variant rounded-lg py-sm text-label-md text-secondary hover:bg-surface-container transition-colors">View Defaulter List</button>
                  </div>

                  <div className="mpesa-gradient rounded-xl p-lg text-white">
                    <div className="flex items-center gap-sm mb-sm">
                      <span className="material-symbols-outlined icon-filled">smartphone</span>
                      <h3 className="text-title-md font-bold">C2B M-Pesa Portal</h3>
                    </div>
                    <p className="text-body-sm opacity-80 mb-md">Securely initiate STK Push requests directly to parents' phones via Safaricom Daraja API.</p>
                    <div className="bg-white/20 rounded-lg p-sm flex justify-between text-label-md mb-md">
                      <span>Today Success Rate</span>
                      <span className="font-bold">94.2%</span>
                    </div>
                    <button onClick={() => setTab('M-Pesa')} className="w-full bg-white text-primary rounded-lg py-sm text-label-md font-bold hover:bg-white/90 transition-colors">Send STK Push</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── FEE STRUCTURE ── */}
          {tab === 'Fee Structure' && (
            <div className="flex flex-col gap-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-title-md font-bold">Fee Structure — Term 2, 2024</h3>
                  <p className="text-body-md text-secondary">Approved by Principal · Effective Apr 29, 2024</p>
                </div>
                <button className="flex items-center gap-xs bg-primary text-on-primary px-md py-sm rounded-lg text-label-md font-semibold hover:opacity-90">
                  <span className="material-symbols-outlined text-[18px]">edit</span> Edit Structure
                </button>
              </div>
              <div className="tonal-card rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead className="bg-surface-container-low">
                    <tr>{['Class Band', 'Tuition Fee', 'Activity Fee', 'Exam Fee', 'Transport', 'Total/Term', 'Actions'].map(h => (
                      <th key={h} className="text-left px-md py-sm text-label-sm font-bold text-secondary uppercase whitespace-nowrap">{h}</th>
                    ))}</tr>
                  </thead>
                  <tbody>
                    {feeStructure.map(f => (
                      <tr key={f.class} className="border-t border-outline-variant hover:bg-surface-container-low">
                        <td className="px-md py-md text-label-md font-semibold whitespace-nowrap">{f.class}</td>
                        <td className="px-md py-md text-body-md">KES {f.tuition.toLocaleString()}</td>
                        <td className="px-md py-md text-body-md">KES {f.activity.toLocaleString()}</td>
                        <td className="px-md py-md text-body-md">KES {f.exam.toLocaleString()}</td>
                        <td className="px-md py-md text-body-md">KES {f.transport.toLocaleString()}</td>
                        <td className="px-md py-md text-label-md font-bold text-primary">KES {f.total.toLocaleString()}</td>
                        <td className="px-md py-md">
                          <button className="text-label-sm text-primary font-semibold hover:underline">Generate Invoices</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="tonal-card rounded-xl p-lg">
                <h3 className="text-title-md font-bold mb-sm">Invoice Auto-Generation</h3>
                <p className="text-body-md text-secondary mb-md">When a new term begins, the system automatically generates invoices for all enrolled students based on their grade's fee structure. Invoices are immediately visible in the parent portal.</p>
                <div className="flex gap-sm">
                  <button className="flex items-center gap-xs px-md py-sm border border-outline-variant rounded-lg text-label-md text-secondary hover:bg-surface-container">
                    <span className="material-symbols-outlined text-[18px]">preview</span> Preview Invoices
                  </button>
                  <button className="flex items-center gap-xs bg-primary text-on-primary px-md py-sm rounded-lg text-label-md font-semibold hover:opacity-90">
                    <span className="material-symbols-outlined text-[18px]">auto_fix_high</span> Auto-Generate All Invoices
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ── INVOICES ── */}
          {tab === 'Invoices' && (
            <div className="flex flex-col gap-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-xs bg-surface-container border border-outline-variant rounded-lg px-md py-sm w-72">
                  <span className="material-symbols-outlined text-[18px] text-secondary">search</span>
                  <input className="bg-transparent text-body-md outline-none w-full placeholder:text-secondary" placeholder="Search by student or invoice #..." />
                </div>
                <div className="flex gap-sm items-center">
                  <select className="border border-outline-variant rounded-lg px-md py-sm text-body-md bg-white outline-none">
                    <option>All Status</option><option>Paid</option><option>Partial</option><option>Overdue</option>
                  </select>
                  <button className="flex items-center gap-xs bg-primary text-on-primary px-md py-sm rounded-lg text-label-md font-semibold hover:opacity-90">
                    <span className="material-symbols-outlined text-[18px]">add</span> New Invoice
                  </button>
                </div>
              </div>
              <div className="tonal-card rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead className="bg-surface-container-low">
                    <tr>{['Invoice #', 'Student', 'Total Amount', 'Paid', 'Balance', 'Status', 'Actions'].map(h => (
                      <th key={h} className="text-left px-md py-sm text-label-sm font-bold text-secondary uppercase whitespace-nowrap">{h}</th>
                    ))}</tr>
                  </thead>
                  <tbody>
                    {invoices.map(inv => (
                      <tr key={inv.inv} className="border-t border-outline-variant hover:bg-surface-container-low">
                        <td className="px-md py-md text-label-sm font-mono text-secondary">{inv.inv}</td>
                        <td className="px-md py-md">
                          <p className="text-label-md font-semibold whitespace-nowrap">{inv.student}</p>
                          <p className="text-label-sm text-secondary">{inv.grade}</p>
                        </td>
                        <td className="px-md py-md text-body-md font-semibold">KES {inv.amount.toLocaleString()}</td>
                        <td className="px-md py-md text-body-md text-primary font-semibold">KES {inv.paid.toLocaleString()}</td>
                        <td className="px-md py-md">
                          <span className={clsx('text-label-md font-bold', inv.balance === 0 ? 'text-primary' : 'text-error')}>KES {inv.balance.toLocaleString()}</span>
                        </td>
                        <td className="px-md py-md">
                          <span className={clsx('text-label-sm font-bold px-sm py-xs rounded-full whitespace-nowrap', inv.status === 'Paid' ? 'bg-primary/10 text-primary' : inv.status === 'Partial' ? 'bg-yellow-100 text-yellow-700' : 'bg-error/10 text-error')}>{inv.status}</span>
                        </td>
                        <td className="px-md py-md">
                          <div className="flex gap-xs">
                            <button className="text-label-sm text-primary font-semibold hover:underline whitespace-nowrap">Receipt</button>
                            <button className="text-label-sm text-secondary font-semibold hover:underline whitespace-nowrap">STK Push</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── M-PESA ── */}
          {tab === 'M-Pesa' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg">
              {/* STK Push */}
              <div className="tonal-card rounded-xl overflow-hidden">
                <div className="mpesa-gradient p-lg text-white">
                  <div className="flex items-center gap-sm mb-xs">
                    <span className="material-symbols-outlined icon-filled text-[28px]">smartphone</span>
                    <h3 className="text-title-lg font-bold">Send STK Push Request</h3>
                  </div>
                  <p className="text-body-sm opacity-80">Parent receives a payment prompt on their phone and enters M-Pesa PIN to confirm.</p>
                </div>
                <div className="p-lg flex flex-col gap-md">
                  {stkSent && (
                    <div className="bg-primary/10 border border-primary/20 rounded-xl p-md flex items-center gap-sm">
                      <span className="material-symbols-outlined text-primary icon-filled">check_circle</span>
                      <div>
                        <p className="text-label-md font-bold text-primary">STK Push Sent!</p>
                        <p className="text-label-sm text-secondary">Request sent to {stkPhone}. Awaiting PIN entry...</p>
                      </div>
                    </div>
                  )}
                  <div>
                    <label className="text-label-md font-semibold block mb-xs">Student Name / Admission No.</label>
                    <input className="w-full border border-outline-variant rounded-lg px-md py-sm text-body-md outline-none focus:border-primary" placeholder="Search student..." />
                  </div>
                  <div>
                    <label className="text-label-md font-semibold block mb-xs">Parent Phone Number</label>
                    <input value={stkPhone} onChange={e => setStkPhone(e.target.value)} className="w-full border border-outline-variant rounded-lg px-md py-sm text-body-md outline-none focus:border-primary" placeholder="+254700000000" />
                  </div>
                  <div>
                    <label className="text-label-md font-semibold block mb-xs">Amount (KES)</label>
                    <input value={stkAmount} onChange={e => setStkAmount(e.target.value)} type="number" className="w-full border border-outline-variant rounded-lg px-md py-sm text-body-md outline-none focus:border-primary" placeholder="e.g. 15000" />
                  </div>
                  <div>
                    <label className="text-label-md font-semibold block mb-xs">Paybill / Account Ref</label>
                    <input className="w-full border border-outline-variant rounded-lg px-md py-sm text-body-md outline-none focus:border-primary bg-surface-container" defaultValue="522522 / GW-4A-001" readOnly />
                  </div>
                  <button onClick={sendStk} className="mpesa-gradient text-white py-sm rounded-lg text-label-md font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-xs">
                    <span className="material-symbols-outlined text-[18px]">send</span> Send STK Push
                  </button>
                  <p className="text-label-sm text-secondary text-center">Powered by Safaricom Daraja API · Account: Greenwood Academy</p>
                </div>
              </div>

              {/* Transaction Log */}
              <div className="tonal-card rounded-xl p-lg">
                <div className="flex items-center justify-between mb-md">
                  <h3 className="text-title-md font-bold">Today's Transactions</h3>
                  <div className="flex items-center gap-xs text-label-sm">
                    <div className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" /><span className="relative inline-flex rounded-full h-2 w-2 bg-primary" /></div>
                    <span className="text-primary font-semibold">Live</span>
                  </div>
                </div>
                <div className="flex flex-col divide-y divide-outline-variant">
                  {transactions.map(t => (
                    <div key={t.id} className="py-md">
                      <div className="flex items-center justify-between mb-xs">
                        <div className="flex items-center gap-sm">
                          <div className={clsx('w-8 h-8 rounded-full flex items-center justify-center', t.status === 'STK Success' ? 'bg-primary/10' : t.status === 'Manual Recon' ? 'bg-tertiary/10' : 'bg-error/10')}>
                            <span className={clsx('material-symbols-outlined text-[18px]', t.status === 'STK Success' ? 'text-primary' : t.status === 'Manual Recon' ? 'text-tertiary' : 'text-error')}>
                              {t.status === 'STK Success' ? 'check_circle' : t.status === 'Manual Recon' ? 'sync' : 'error'}
                            </span>
                          </div>
                          <div>
                            <p className="text-label-md font-semibold">{t.name} · {t.grade}</p>
                            <p className="text-label-sm text-secondary">{t.type} · {t.time}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-label-md font-bold">KES {t.amount.toLocaleString()}</p>
                          <span className={clsx('text-label-sm font-bold', t.status === 'STK Success' ? 'text-primary' : t.status === 'Manual Recon' ? 'text-tertiary' : 'text-error')}>{t.status}</span>
                        </div>
                      </div>
                      <p className="text-label-sm text-secondary ml-10 font-mono">{t.id}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-md pt-md border-t border-outline-variant flex justify-between text-label-md">
                  <span className="text-secondary font-semibold">Today Total</span>
                  <span className="font-bold text-primary">KES 124,500</span>
                </div>
                <div className="mt-sm flex justify-between text-label-md">
                  <span className="text-secondary">Auto-reconciled</span>
                  <span className="font-semibold">KES 98,750 ✓</span>
                </div>
              </div>
            </div>
          )}

          {/* ── EXPENSES ── */}
          {tab === 'Expenses' && (
            <div className="flex flex-col gap-md">
              <div className="flex items-center justify-between">
                <h3 className="text-title-md font-bold">School Expenses — Term 2, 2024</h3>
                <button className="flex items-center gap-xs bg-primary text-on-primary px-md py-sm rounded-lg text-label-md font-semibold hover:opacity-90">
                  <span className="material-symbols-outlined text-[18px]">add</span> Log Expense
                </button>
              </div>
              <div className="tonal-card rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead className="bg-surface-container-low">
                    <tr>{['Date', 'Description', 'Category', 'Amount', 'Approved By', 'Receipt'].map(h => (
                      <th key={h} className="text-left px-md py-sm text-label-sm font-bold text-secondary uppercase">{h}</th>
                    ))}</tr>
                  </thead>
                  <tbody>
                    {[
                      { date: 'Jun 14', desc: 'Textbooks (Grade 4)', cat: 'Academic', amount: 45000, approver: 'Principal Mwangi', receipt: true },
                      { date: 'Jun 12', desc: 'Power Bill – KPLC', cat: 'Utilities', amount: 18500, approver: 'Grace Kamau', receipt: true },
                      { date: 'Jun 10', desc: 'Cleaning Supplies', cat: 'Operations', amount: 6200, approver: 'Grace Kamau', receipt: true },
                      { date: 'Jun 8', desc: 'Sports Equipment', cat: 'Extra-Curricular', amount: 23000, approver: 'Principal Mwangi', receipt: false },
                      { date: 'Jun 5', desc: 'Internet – Safaricom', cat: 'Utilities', amount: 12000, approver: 'Grace Kamau', receipt: true },
                    ].map((e, i) => (
                      <tr key={i} className="border-t border-outline-variant hover:bg-surface-container-low">
                        <td className="px-md py-md text-body-md text-secondary whitespace-nowrap">{e.date}</td>
                        <td className="px-md py-md text-label-md font-semibold">{e.desc}</td>
                        <td className="px-md py-md"><span className="text-label-sm bg-surface-container px-sm py-xs rounded-full text-secondary">{e.cat}</span></td>
                        <td className="px-md py-md text-label-md font-bold whitespace-nowrap">KES {e.amount.toLocaleString()}</td>
                        <td className="px-md py-md text-body-md text-secondary whitespace-nowrap">{e.approver}</td>
                        <td className="px-md py-md">
                          {e.receipt
                            ? <span className="text-label-sm text-primary font-semibold flex items-center gap-xs"><span className="material-symbols-outlined text-[16px]">receipt</span>View</span>
                            : <span className="text-label-sm text-secondary">Missing</span>}
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
