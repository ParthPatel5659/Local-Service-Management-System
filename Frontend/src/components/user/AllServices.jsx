import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { FiSearch, FiMapPin, FiTag, FiUser, FiPackage, FiDollarSign } from 'react-icons/fi'
import { FaStar } from 'react-icons/fa'

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
const getCatStyle = (str = "") => categoryColors[str.charCodeAt(0) % categoryColors.length]

const AllServices = () => {
  const { register, handleSubmit } = useForm()
  const [services, setservices] = useState([])
  const [search, setSearch] = useState("")
  const [filterCat, setFilterCat] = useState("All")
  const navigate = useNavigate()

  const allService = async () => {
    try {
      const res = await axios.get('/services/all')
      setservices(res.data.data)
    } catch (err) {
      console.log(err)
    }
  }

  const submitHandle = async (data) => {
    try {
      const res = await axios.post('/bookings/create', data)
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => { allService() }, [])

  const categories = ["All", ...Array.from(new Set(services.map((s) => s.categoryId?.categoryName).filter(Boolean)))]

  const filtered = services.filter((s) => {
    const q = search.toLowerCase()
    const matchSearch =
      !q ||
      s.serviceName?.toLowerCase().includes(q) ||
      s.description?.toLowerCase().includes(q) ||
      s.categoryId?.categoryName?.toLowerCase().includes(q) ||
      `${s.providerId?.Firstname} ${s.providerId?.Lastname}`.toLowerCase().includes(q)
    const matchCat = filterCat === "All" || s.categoryId?.categoryName === filterCat
    return matchSearch && matchCat
  })

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
          <p className="text-xs text-slate-400 mt-0.5">{services.length} services available</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        {/* Search */}
        <div className="relative">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
          <input
            type="text"
            placeholder="Search services, providers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2.5 rounded-xl text-sm placeholder-slate-400 outline-none focus:ring-2 focus:ring-indigo-300 transition-all duration-150 w-72"
            style={{ background: "#fff", border: "1px solid #dde3f0", color: "#334155", boxShadow: "0 1px 4px rgba(99,102,241,0.06)" }}
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 flex-wrap">
          {categories.map((cat) => {
            const active = filterCat === cat
            return (
              <button
                key={cat}
                onClick={() => setFilterCat(cat)}
                className="px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-150"
                style={
                  active
                    ? { background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff", boxShadow: "0 4px 12px rgba(99,102,241,0.30)" }
                    : { background: "#fff", color: "#64748b", border: "1px solid #dde3f0" }
                }
              >
                {cat}
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
          <p className="text-slate-400 text-xs mt-1">Try a different search or category</p>
        </div>
      )}

      {/* Service Cards Grid */}
      <form onSubmit={handleSubmit(submitHandle)}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((service) => {
            const providerName = `${service.providerId?.Firstname || ""} ${service.providerId?.Lastname || ""}`.trim()
            const catName = service.categoryId?.categoryName || ""
            const catStyle = getCatStyle(catName)

            return (
              <div
                key={service._id}
                className="bg-white rounded-2xl p-5 flex flex-col transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  border: "1px solid #e8edf5",
                  boxShadow: "0 2px 8px rgba(99,102,241,0.06)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 8px 28px rgba(99,102,241,0.14)"
                  e.currentTarget.style.borderColor = "#c7d2fe"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 2px 8px rgba(99,102,241,0.06)"
                  e.currentTarget.style.borderColor = "#e8edf5"
                }}
              >
                {/* Hidden serviceId input */}
                <input type="hidden" value={service._id} {...register('serviceId')} />

                {/* Top: Icon + Category */}
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-white text-base font-bold flex-shrink-0"
                    style={{ background: getColor(service.serviceName || "S") }}
                  >
                    {service.serviceName?.charAt(0)?.toUpperCase() || "S"}
                  </div>
                  {catName && (
                    <span
                      className="text-xs font-semibold px-2.5 py-1 rounded-lg"
                      style={{ background: catStyle.bg, color: catStyle.text }}
                    >
                      {catName}
                    </span>
                  )}
                </div>

                {/* Service Name */}
                <h2 className="text-sm font-bold mb-1 truncate" style={{ color: "#1e293b" }}>
                  {service.serviceName}
                </h2>

                {/* Description */}
                <p
                  className="text-xs mb-3 leading-relaxed"
                  style={{
                    color: "#94a3b8",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {service.description || "No description provided."}
                </p>

                {/* Provider */}
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-6 h-6 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                    style={{ background: getColor(service.providerId?.Firstname || "P") }}
                  >
                    {service.providerId?.Firstname?.charAt(0)?.toUpperCase() || "P"}
                  </div>
                  <span className="text-xs font-medium truncate" style={{ color: "#475569" }}>
                    {providerName || "—"}
                  </span>
                  <span
                    className="ml-auto text-xs px-2 py-0.5 rounded-full flex-shrink-0"
                    style={{ background: "#ede9fe", color: "#7c3aed" }}
                  >
                    Provider
                  </span>
                </div>

                {/* Divider */}
                <div className="h-px my-2" style={{ background: "#f1f5f9" }} />

                {/* Price + Book Button */}
                <div className="flex items-center justify-between mt-auto pt-1">
                  <div className="flex items-center gap-0.5">
                    <FiDollarSign size={13} className="text-emerald-500" />
                    <span className="text-base font-bold" style={{ color: "#1e293b" }}>
                      {service.price?.toLocaleString() || "—"}
                    </span>
                    <span className="text-xs text-slate-400 ml-0.5">/hr</span>
                  </div>

                  <Link
                    to={`/user/bookservices/${service._id}`}
                    className="px-4 py-1.5 rounded-xl text-xs font-semibold text-white transition-all duration-150 hover:opacity-90 active:scale-95"
                    style={{
                      background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                      boxShadow: "0 3px 10px rgba(99,102,241,0.30)",
                    }}
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </form>
    </div>
  )
}

export default AllServices