import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { FiSearch, FiPlus, FiGrid, FiCheckCircle, FiXCircle } from 'react-icons/fi'

export const AllCategory = () => {
  const [search, setSearch] = useState("")
  const [categorys, setCategorys] = useState([])

  const getAll = async () => {
    try {
      const res = await axios.get("/category/all")
      setCategorys(res.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAll()
  }, [])

  const filtered = categorys.filter((c) =>
    c.categoryName?.toLowerCase().includes(search.toLowerCase())
  )

  const iconColors = [
    "linear-gradient(135deg, #6366f1, #8b5cf6)",
    "linear-gradient(135deg, #f59e0b, #ef4444)",
    "linear-gradient(135deg, #10b981, #06b6d4)",
    "linear-gradient(135deg, #f43f5e, #ec4899)",
    "linear-gradient(135deg, #3b82f6, #6366f1)",
    "linear-gradient(135deg, #14b8a6, #22c55e)",
  ]
  const getColor = (name = "") => iconColors[name.charCodeAt(0) % iconColors.length]

  return (
    <div
      className="min-h-screen p-6"
      style={{
        background: "linear-gradient(160deg, #f0f4ff 0%, #f8fafc 60%, #fff 100%)",
        fontFamily: "'Plus Jakarta Sans', 'Nunito', sans-serif",
      }}
    >
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
            >
              <FiGrid className="text-white" size={15} />
            </div>
            <h1 className="text-xl font-bold tracking-tight" style={{ color: "#1e293b" }}>
              All Categories
            </h1>
          </div>
          <p className="text-sm text-slate-400 ml-10">
            {categorys.length} categor{categorys.length !== 1 ? "ies" : "y"} total
          </p>
        </div>

        <Link
          to="/admin/addcategory"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-95"
          style={{
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            boxShadow: "0 4px 15px rgba(99,102,241,0.35)",
          }}
        >
          <FiPlus size={15} />
          Add Category
        </Link>
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-sm">
        <FiSearch
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          size={14}
        />
        <input
          type="text"
          placeholder="Search categories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm placeholder-slate-400 outline-none focus:ring-2 focus:ring-indigo-300 transition-all duration-150"
          style={{
            background: "#fff",
            border: "1px solid #dde3f0",
            color: "#334155",
            boxShadow: "0 1px 4px rgba(99,102,241,0.06)",
          }}
        />
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
            style={{ background: "#eef1f8" }}
          >
            <FiGrid className="text-indigo-300" size={26} />
          </div>
          <p className="text-slate-500 font-medium text-sm">No categories found</p>
          <p className="text-slate-400 text-xs mt-1">Try a different search term</p>
        </div>
      )}

      {/* Category Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((category) => {
          const isActive = category.isActive !== false

          return (
            <div
              key={category._id}
              className="bg-white rounded-2xl p-5 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
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
              {/* Top Row: Icon + Active Badge */}
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-white text-base font-bold flex-shrink-0"
                  style={{ background: getColor(category.categoryName) }}
                >
                  {category.categoryName?.charAt(0)?.toUpperCase()}
                </div>

                {/* Active / Inactive Badge */}
                <div
                  className="flex items-center gap-1.5 px-2 py-1 rounded-full"
                  style={{ background: isActive ? "#f0fdf4" : "#fef2f2" }}
                >
                  {isActive
                    ? <FiCheckCircle size={11} style={{ color: "#22c55e" }} />
                    : <FiXCircle size={11} style={{ color: "#ef4444" }} />
                  }
                  <span
                    className="text-xs font-medium"
                    style={{ color: isActive ? "#16a34a" : "#dc2626" }}
                  >
                    {isActive ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>

              {/* Category Name */}
              <h2 className="font-semibold text-sm truncate" style={{ color: "#1e293b" }}>
                {category.categoryName}
              </h2>

              {/* Description */}
              <p
                className="text-xs mt-1.5 leading-relaxed"
                style={{
                  color: "#94a3b8",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {category.description || "No description provided."}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default AllCategory