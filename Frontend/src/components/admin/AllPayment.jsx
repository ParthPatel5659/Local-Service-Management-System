import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FiSearch, FiDollarSign, FiCreditCard } from 'react-icons/fi'

const statusStyles = {
  paid:     { bg: "#f0fdf4", text: "#16a34a", dot: "#22c55e" },
  unpaid:   { bg: "#fef2f2", text: "#dc2626", dot: "#ef4444" },
  pending:  { bg: "#fffbeb", text: "#b45309", dot: "#f59e0b" },
  failed:   { bg: "#fef2f2", text: "#dc2626", dot: "#ef4444" },
  refunded: { bg: "#f5f3ff", text: "#7c3aed", dot: "#8b5cf6" },
}

const methodStyles = {
  cash:   { bg: "#f0fdf4", text: "#16a34a" },
  card:   { bg: "#eff6ff", text: "#1d4ed8" },
  upi:    { bg: "#fdf4ff", text: "#a21caf" },
  online: { bg: "#eff6ff", text: "#1d4ed8" },
}

const avatarColors = [
  "linear-gradient(135deg, #6366f1, #8b5cf6)",
  "linear-gradient(135deg, #f59e0b, #ef4444)",
  "linear-gradient(135deg, #10b981, #06b6d4)",
  "linear-gradient(135deg, #f43f5e, #ec4899)",
  "linear-gradient(135deg, #3b82f6, #6366f1)",
  "linear-gradient(135deg, #14b8a6, #22c55e)",
]
const getColor = (str = "") => avatarColors[str.charCodeAt(0) % avatarColors.length]

const Badge = ({ label, styleMap }) => {
  const key = label?.toLowerCase()
  const s = styleMap[key] || { bg: "#f1f5f9", text: "#64748b", dot: "#94a3b8" }
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold capitalize whitespace-nowrap"
      style={{ background: s.bg, color: s.text }}
    >
      {s.dot && <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: s.dot }} />}
      {label || "—"}
    </span>
  )
}

const FILTERS = ["All", "Paid", "Pending", "Refunded", "Failed"]

export const AllPayment = () => {
  const [payments, setPayments] = useState([])
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("All")

  const getallPayment = async () => {
    try {
      const res = await axios.get("/payments/all")
      setPayments(res.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => { getallPayment() }, [])

  const filtered = payments.filter((p) => {
    const q = search.toLowerCase()
    const matchFilter = filter === "All" || p.paymentStatus?.toLowerCase() === filter.toLowerCase()
    const matchSearch =
      !q ||
      p._id?.toLowerCase().includes(q) ||
      String(p.bookingId)?.toLowerCase().includes(q) ||
      `${p.userId?.Firstname} ${p.userId?.Lastname}`.toLowerCase().includes(q) ||
      `${p.providerId?.Firstname} ${p.providerId?.Lastname}`.toLowerCase().includes(q) ||
      p.paymentMethod?.toLowerCase().includes(q)
    return matchFilter && matchSearch
  })

  const totalAmount  = payments.reduce((s, p) => s + (p.amount || 0), 0)
  const paidCount    = payments.filter((p) => p.paymentStatus?.toLowerCase() === "paid").length
  const pendingCount = payments.filter((p) => p.paymentStatus?.toLowerCase() === "pending").length

  const StatCard = ({ label, value, color, bg }) => (
    <div
      className="bg-white rounded-2xl px-5 py-4 flex items-center gap-4"
      style={{ border: "1px solid #e8edf5", boxShadow: "0 2px 8px rgba(99,102,241,0.06)" }}
    >
      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: bg }}>
        <FiDollarSign size={16} style={{ color }} />
      </div>
      <div>
        <p className="text-xs text-slate-400 font-medium">{label}</p>
        <p className="text-lg font-bold" style={{ color: "#1e293b" }}>{value}</p>
      </div>
    </div>
  )

  return (
    <div
      className="min-h-screen p-6"
      style={{
        background: "linear-gradient(160deg, #f0f4ff 0%, #f8fafc 60%, #fff 100%)",
        fontFamily: "'Plus Jakarta Sans', 'Nunito', sans-serif",
      }}
    >
      {/* Page Header */}
      <div className="flex items-center gap-2 mb-6">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
        >
          <FiCreditCard className="text-white" size={15} />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight leading-none" style={{ color: "#1e293b" }}>
            All Payments
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">{payments.length} total transactions</p>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatCard label="Total Revenue" value={`₹${totalAmount.toLocaleString()}`} color="#6366f1" bg="#eef1f8" />
        <StatCard label="Paid"          value={paidCount}    color="#16a34a" bg="#f0fdf4" />
        <StatCard label="Pending"       value={pendingCount} color="#b45309" bg="#fffbeb" />
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <div className="relative">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
          <input
            type="text"
            placeholder="Search by name, method, ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2.5 rounded-xl text-sm placeholder-slate-400 outline-none focus:ring-2 focus:ring-indigo-300 transition-all duration-150 w-64"
            style={{ background: "#fff", border: "1px solid #dde3f0", color: "#334155", boxShadow: "0 1px 4px rgba(99,102,241,0.06)" }}
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {FILTERS.map((f) => {
            const active = filter === f
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-150"
                style={
                  active
                    ? { background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff", boxShadow: "0 4px 12px rgba(99,102,241,0.30)" }
                    : { background: "#fff", color: "#64748b", border: "1px solid #dde3f0" }
                }
              >
                {f}
              </button>
            )
          })}
        </div>
      </div>

      {/* Table */}
      <div
        className="bg-white rounded-2xl overflow-hidden"
        style={{ border: "1px solid #e8edf5", boxShadow: "0 2px 12px rgba(99,102,241,0.07)" }}
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr style={{ borderBottom: "1px solid #eef1f8", background: "#f8fafc" }}>
                {["Payment ID", "Booking ID", "Customer", "Provider", "Date", "Amount", "Method", "Status"].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: "#64748b" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-16">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: "#eef1f8" }}>
                        <FiCreditCard className="text-indigo-300" size={22} />
                      </div>
                      <p className="text-sm text-slate-400 font-medium">No payments found</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((payment) => {
                  const customerName = `${payment.userId?.Firstname || ""} ${payment.userId?.Lastname || ""}`.trim() || "—"
                  const providerName = `${payment.providerId?.Firstname || ""} ${payment.providerId?.Lastname || ""}`.trim() || "—"
                  return (
                    <tr
                      key={payment._id}
                      className="transition-colors duration-150"
                      style={{ borderBottom: "1px solid #f1f5f9" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#f8f9ff")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      {/* Payment ID */}
                      <td className="px-5 py-4">
                        <span className="text-xs font-mono font-bold" style={{ color: "#6366f1" }}>
                          #{payment._id?.slice(-6).toUpperCase()}
                        </span>
                      </td>

                      {/* Booking ID */}
                      <td className="px-5 py-4">
                        <span className="text-xs font-mono" style={{ color: "#8b5cf6" }}>
                          {payment.bookingId ? `#${String(payment.bookingId).slice(-6).toUpperCase()}` : "—"}
                        </span>
                      </td>

                      {/* Customer */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2.5">
                          <div
                            className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                            style={{ background: getColor(payment.userId?.Firstname || "U") }}
                          >
                            {payment.userId?.Firstname?.charAt(0)?.toUpperCase() || "U"}
                          </div>
                          <span className="text-sm font-semibold" style={{ color: "#1e293b" }}>{customerName}</span>
                        </div>
                      </td>

                      {/* Provider */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2.5">
                          <div
                            className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                            style={{ background: getColor(payment.providerId?.Firstname || "P") }}
                          >
                            {payment.providerId?.Firstname?.charAt(0)?.toUpperCase() || "P"}
                          </div>
                          <span className="text-sm" style={{ color: "#475569" }}>{providerName}</span>
                        </div>
                      </td>

                      {/* Date */}
                      <td className="px-5 py-4">
                        <span className="text-sm" style={{ color: "#334155" }}>
                          {payment.patmentDate
                            ? new Date(payment.patmentDate).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })
                            : "—"}
                        </span>
                      </td>

                      {/* Amount */}
                      <td className="px-5 py-4">
                        <span className="text-sm font-bold" style={{ color: "#1e293b" }}>
                          ₹{payment.amount?.toLocaleString() || "—"}
                        </span>
                      </td>

                      {/* Method */}
                      <td className="px-5 py-4">
                        <Badge label={payment.paymentMethod} styleMap={methodStyles} />
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        <Badge label={payment.paymentStatus} styleMap={statusStyles} />
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        {filtered.length > 0 && (
          <div
            className="px-5 py-3 flex items-center justify-between"
            style={{ borderTop: "1px solid #eef1f8", background: "#f8fafc" }}
          >
            <p className="text-xs text-slate-400">
              Showing <span className="font-semibold text-slate-600">{filtered.length}</span> of{" "}
              <span className="font-semibold text-slate-600">{payments.length}</span> payments
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AllPayment