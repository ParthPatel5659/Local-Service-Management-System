import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FiSearch, FiDollarSign, FiCreditCard, FiActivity, FiArrowUpRight, FiArrowDownRight, FiPlus } from 'react-icons/fi'
import { FaRupeeSign } from 'react-icons/fa'

const AllPayment = () => {
  const [payments, setPayments] = useState([])
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("All")
  const [loading, setLoading] = useState(true)

  const getallPayment = async () => {
    try {
      setLoading(true)
      const res = await axios.get("/payments/all")
      setPayments(res.data.data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { getallPayment() }, [])

  const FILTERS = ["All", "Paid", "Pending", "Refunded", "Failed"]

  const filtered = payments.filter((p) => {
    const q = search.toLowerCase()
    const matchFilter = filter === "All" || p.paymentStatus?.toLowerCase() === filter.toLowerCase()
    const matchSearch =
      !q ||
      p._id?.toLowerCase().includes(q) ||
      String(p.bookingId)?.toLowerCase().includes(q) ||
      `${p.userId?.Firstname} ${p.userId?.Lastname}`.toLowerCase().includes(q) ||
      p.paymentMethod?.toLowerCase().includes(q)
    return matchFilter && matchSearch
  })

  const totalAmount  = payments.reduce((s, p) => s + (p.amount || 0), 0)
  const paidCount    = payments.filter((p) => p.paymentStatus?.toLowerCase() === "paid").length
  const pendingCount = payments.filter((p) => p.paymentStatus?.toLowerCase() === "pending").length

  const statusThemes = {
    paid:     "bg-green-50 text-green-600 border-green-100",
    pending:  "bg-orange-50 text-orange-600 border-orange-100",
    failed:   "bg-red-50 text-red-600 border-red-100",
    refunded: "bg-blue-50 text-blue-600 border-blue-100",
    unpaid:   "bg-gray-50 text-gray-400 border-gray-100",
  }

  return (
    <div className="space-y-10">
      
      {/* ── Page Header ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-[#1a1f2e] tracking-tight">Financial Ledger</h1>
          <p className="text-gray-500 mt-1 font-medium">Tracking all platform transactions and payout flows.</p>
        </div>
        <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 px-4 py-2 bg-[#F59E0B] rounded-xl text-[10px] font-black uppercase text-white tracking-widest shadow-lg shadow-orange-100">
                <FiPlus /> New Entry
            </div>
        </div>
      </div>

      {/* ── Financial Stats ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
            title="Gross Revenue" 
            value={totalAmount} 
            isMoney={true}
            icon={<FiDollarSign />} 
            theme="bg-[#1a1f2e] text-white" 
            trend="+14% this month"
        />
        <StatCard 
            title="Successful" 
            value={paidCount} 
            icon={<FiActivity />} 
            theme="bg-orange-50 text-[#F59E0B]" 
            trend="89% Success Rate"
        />
        <StatCard 
            title="Pending" 
            value={pendingCount} 
            icon={<FiCreditCard />} 
            theme="bg-blue-50 text-blue-600" 
            trend="Needs Approval"
        />
      </div>

      {/* ── Toolbar ── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pt-4">
        <div className="relative flex-1 max-w-xl">
            <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
                type="text"
                placeholder="Search by Payment ID, customer or method..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-14 pr-6 py-4 rounded-2xl bg-white border border-gray-100 shadow-sm focus:ring-4 focus:ring-orange-50 focus:border-[#F59E0B] outline-none transition-all font-bold text-[#1a1f2e] placeholder-gray-300"
            />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 lg:pb-0">
            {FILTERS.map((f) => (
                <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all border whitespace-nowrap ${
                        filter === f ? "bg-[#F59E0B] text-white border-[#F59E0B] shadow-lg shadow-orange-100" : "bg-white text-gray-400 border-gray-100 hover:border-orange-200"
                    }`}
                >
                    {f}
                </button>
            ))}
        </div>
      </div>

      {/* ── Payments Table ── */}
      <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-50">
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[2px]">Transaction ID</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[2px]">Entities (Customer/Pro)</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[2px]">Date</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[2px]">Net Amount</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[2px]">Gateway Method</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[2px] text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                    <td colSpan={6} className="py-20 text-center">
                        <div className="animate-spin h-8 w-8 border-4 border-[#F59E0B] border-t-transparent rounded-full mx-auto"></div>
                    </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                    <td colSpan={6} className="py-20 text-center">
                        <p className="text-gray-400 font-bold italic">No financial records found in current view.</p>
                    </td>
                </tr>
              ) : (
                filtered.map((payment) => {
                  const customerName = `${payment.userId?.Firstname || ""} ${payment.userId?.Lastname || ""}`.trim() || "Independent"
                  const providerName = `${payment.providerId?.Firstname || ""} ${payment.providerId?.Lastname || ""}`.trim() || "System"
                  return (
                    <tr key={payment._id} className="group hover:bg-gray-50/30 transition-all">
                      <td className="px-8 py-6">
                        <span className="text-xs font-black text-gray-300">#</span>
                        <span className="text-xs font-black text-[#1a1f2e]">{payment._id?.slice(-8).toUpperCase()}</span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex flex-col gap-1">
                            <p className="text-sm font-black text-[#1a1f2e]">{customerName}</p>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">TO: {providerName}</p>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-xs font-bold text-gray-500">
                           {payment.patmentDate ? new Date(payment.patmentDate).toLocaleDateString("en-US", { day: '2-digit', month: 'short', year: 'numeric' }) : '—'}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <p className="text-sm font-black text-[#F59E0B] flex items-center">
                            <FaRupeeSign size={12} className="mr-0.5" />
                            {payment.amount?.toLocaleString()}
                        </p>
                      </td>
                      <td className="px-8 py-6">
                        <span className="px-3 py-1 bg-[#1a1f2e] text-white rounded-lg text-[10px] font-black uppercase tracking-widest">
                            {payment.paymentMethod || 'Online'}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-center">
                        <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border ${
                            statusThemes[payment.paymentStatus?.toLowerCase()] || "bg-gray-50 text-gray-400 border-gray-100"
                        }`}>
                            {payment.paymentStatus}
                        </span>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

const StatCard = ({ title, value, icon, theme, trend, isMoney }) => (
    <div className={`p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center justify-between group hover:shadow-xl transition-all ${theme}`}>
        <div>
            <p className="text-[10px] font-black uppercase tracking-[2px] opacity-60 mb-1">{title}</p>
            <div className="flex items-baseline gap-1">
                {isMoney && <FaRupeeSign size={18} className="opacity-60" />}
                <h2 className="text-3xl font-black tracking-tighter">{value?.toLocaleString()}</h2>
            </div>
            <p className="text-[10px] font-bold mt-2 opacity-50 uppercase tracking-widest flex items-center gap-1">
                {trend.includes('+') ? <FiArrowUpRight className="text-green-400" /> : <FiArrowDownRight className="text-red-400" />} {trend}
            </p>
        </div>
        <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform shadow-inner">
            {icon}
        </div>
    </div>
)

export default AllPayment