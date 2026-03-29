import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FiSearch, FiMapPin, FiDollarSign, FiPackage, FiCheckCircle, FiXCircle } from 'react-icons/fi'

const avatarColors = [
  "linear-gradient(135deg, #6366f1, #8b5cf6)",
  "linear-gradient(135deg, #f59e0b, #ef4444)",
  "linear-gradient(135deg, #10b981, #06b6d4)",
  "linear-gradient(135deg, #f43f5e, #ec4899)",
  "linear-gradient(135deg, #3b82f6, #6366f1)",
  "linear-gradient(135deg, #14b8a6, #22c55e)",
]
const getColor = (str = "") => avatarColors[str.charCodeAt(0) % avatarColors.length]

const categoryColors = [
  { bg: "#ede9fe", text: "#7c3aed" },
  { bg: "#dbeafe", text: "#1d4ed8" },
  { bg: "#d1fae5", text: "#065f46" },
  { bg: "#fce7f3", text: "#be185d" },
  { bg: "#fef3c7", text: "#b45309" },
  { bg: "#e0f2fe", text: "#0369a1" },
]
const getCategoryStyle = (str = "") => categoryColors[str.charCodeAt(0) % categoryColors.length]

const AllServicesshow = () => {
  const [search, setSearch] = useState("")
  const [services, setServices] = useState([])
  const [filterCategory, setFilterCategory] = useState("All")

  const getallSrvices = async () => {
    try {
      const res = await axios.get("/services/all")
      setServices(res.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => { getallSrvices() }, [])

  const filtered = services.filter((s) => {
    const q = search.toLowerCase()
    const matchSearch =
      !q ||
      s.serviceName?.toLowerCase().includes(q) ||
      s.categoryId?.categoryName?.toLowerCase().includes(q) ||
      s.location?.toLowerCase().includes(q) ||
      `${s.providerId?.Firstname} ${s.providerId?.Lastname}`.toLowerCase().includes(q)
    const matchCategory =
      filterCategory === "All" || s.categoryId?.categoryName === filterCategory
    return matchSearch && matchCategory
  })

  const availCount = services.filter((s) => s.availability).length
  const unavailCount = services.filter((s) => !s.availability).length
  const categories = ["All", ...Array.from(new Set(services.map((s) => s.categoryId?.categoryName).filter(Boolean)))]

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
          <FiPackage className="text-white" size={15} />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight leading-none" style={{ color: "#1e293b" }}>
            All Services
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">{services.length} services listed</p>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {[
          { label: "Total Services", value: services.length, color: "#6366f1", bg: "#eef1f8" },
          { label: "Available",      value: availCount,      color: "#16a34a", bg: "#f0fdf4" },
          { label: "Unavailable",    value: unavailCount,    color: "#dc2626", bg: "#fef2f2" },
        ].map(({ label, value, color, bg }) => (
          <div
            key={label}
            className="bg-white rounded-2xl px-5 py-4 flex items-center gap-4"
            style={{ border: "1px solid #e8edf5", boxShadow: "0 2px 8px rgba(99,102,241,0.06)" }}
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: bg }}>
              <FiPackage size={16} style={{ color }} />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium">{label}</p>
              <p className="text-lg font-bold" style={{ color: "#1e293b" }}>{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <div className="relative">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
          <input
            type="text"
            placeholder="Search by name, category, location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2.5 rounded-xl text-sm placeholder-slate-400 outline-none focus:ring-2 focus:ring-indigo-300 transition-all duration-150 w-72"
            style={{ background: "#fff", border: "1px solid #dde3f0", color: "#334155", boxShadow: "0 1px 4px rgba(99,102,241,0.06)" }}
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {categories.map((f) => {
            const active = filterCategory === f
            return (
              <button
                key={f}
                onClick={() => setFilterCategory(f)}
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

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4" style={{ background: "#eef1f8" }}>
            <FiPackage className="text-indigo-300" size={26} />
          </div>
          <p className="text-slate-500 font-medium text-sm">No services found</p>
          <p className="text-slate-400 text-xs mt-1">Try a different search or filter</p>
        </div>
      )}

      {/* Table */}
      {filtered.length > 0 && (
        <div
          className="bg-white rounded-2xl overflow-hidden"
          style={{ border: "1px solid #e8edf5", boxShadow: "0 2px 12px rgba(99,102,241,0.07)" }}
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px]">
              <thead>
                <tr style={{ borderBottom: "1px solid #eef1f8", background: "#f8fafc" }}>
                  {["Service", "Category", "Provider", "Price", "Location", "Availability"].map((h) => (
                    <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: "#64748b" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((service) => {
                  const providerName = `${service.providerId?.Firstname || ""} ${service.providerId?.Lastname || ""}`.trim() || "—"
                  const catName = service.categoryId?.categoryName || "—"
                  const catStyle = getCategoryStyle(catName)

                  return (
                    <tr
                      key={service._id}
                      className="transition-colors duration-150"
                      style={{ borderBottom: "1px solid #f1f5f9" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#f8f9ff")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      {/* Service Name */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2.5">
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                            style={{ background: getColor(service.serviceName || "S") }}
                          >
                            {service.serviceName?.charAt(0)?.toUpperCase() || "S"}
                          </div>
                          <span className="text-sm font-semibold" style={{ color: "#1e293b" }}>
                            {service.serviceName}
                          </span>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-5 py-4">
                        <span
                          className="inline-block px-2.5 py-1 rounded-lg text-xs font-semibold"
                          style={{ background: catStyle.bg, color: catStyle.text }}
                        >
                          {catName}
                        </span>
                      </td>

                      {/* Provider */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                            style={{ background: getColor(service.providerId?.Firstname || "P") }}
                          >
                            {service.providerId?.Firstname?.charAt(0)?.toUpperCase() || "P"}
                          </div>
                          <span className="text-sm" style={{ color: "#475569" }}>{providerName}</span>
                        </div>
                      </td>

                      {/* Price */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1">
                          <FiDollarSign size={13} className="text-emerald-500" />
                          <span className="text-sm font-bold" style={{ color: "#1e293b" }}>
                            {service.price?.toLocaleString() || "—"}
                          </span>
                        </div>
                      </td>

                      {/* Location */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5">
                          <FiMapPin size={12} className="text-slate-400 flex-shrink-0" />
                          <span className="text-sm text-slate-500">{service.location || "—"}</span>
                        </div>
                      </td>

                      {/* Availability */}
                      <td className="px-5 py-4">
                        {service.availability ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold" style={{ background: "#f0fdf4", color: "#16a34a" }}>
                            <FiCheckCircle size={11} />
                            Available
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold" style={{ background: "#fef2f2", color: "#dc2626" }}>
                            <FiXCircle size={11} />
                            Not Available
                          </span>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div
            className="px-5 py-3"
            style={{ borderTop: "1px solid #eef1f8", background: "#f8fafc" }}
          >
            <p className="text-xs text-slate-400">
              Showing <span className="font-semibold text-slate-600">{filtered.length}</span> of{" "}
              <span className="font-semibold text-slate-600">{services.length}</span> services
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default AllServicesshow