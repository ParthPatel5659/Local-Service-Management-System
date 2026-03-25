import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiSearch, FiUserPlus, FiMail, FiUsers } from 'react-icons/fi'
import { FaCircle } from 'react-icons/fa'

export const AllProvider = () => {
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState("")

  const getAllProvider = async () => {
    try {
      const res = await axios.get(`/user/providers`)
      setUsers(res.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllProvider()
  }, [])

  const filtered = users.filter((u) =>
    `${u.Firstname} ${u.Lastname} ${u.email}`
      .toLowerCase()
      .includes(search.toLowerCase())
  )

  // Consistent avatar color per user based on first letter
  const avatarColors = [
    "linear-gradient(135deg, #6366f1, #8b5cf6)",
    "linear-gradient(135deg, #f59e0b, #ef4444)",
    "linear-gradient(135deg, #10b981, #06b6d4)",
    "linear-gradient(135deg, #f43f5e, #ec4899)",
    "linear-gradient(135deg, #3b82f6, #6366f1)",
    "linear-gradient(135deg, #14b8a6, #22c55e)",
  ]
  const getColor = (name = "") =>
    avatarColors[name.charCodeAt(0) % avatarColors.length]

  const roleColors = {
    user: { bg: "#ede9fe", text: "#7c3aed" },
    provider: { bg: "#dbeafe", text: "#1d4ed8" },
    admin: { bg: "#fef3c7", text: "#b45309" },
  }

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
              <FiUsers className="text-white" size={15} />
            </div>
            <h1 className="text-xl font-bold tracking-tight" style={{ color: "#1e293b" }}>
              All Providers
            </h1>
          </div>
          <p className="text-sm text-slate-400 ml-10">
            {users.length} total member{users.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Add User Button */}
        <Link
          to="/admin/addUser"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-95"
          style={{
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            boxShadow: "0 4px 15px rgba(99,102,241,0.35)",
          }}
        >
          <FiUserPlus size={15} />
          Add Provider
        </Link>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6 max-w-sm">
        <FiSearch
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          size={14}
        />
        <input
          type="text"
          placeholder="Search by name or email..."
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
            <FiUsers className="text-indigo-300" size={26} />
          </div>
          <p className="text-slate-500 font-medium text-sm">No providers found</p>
          <p className="text-slate-400 text-xs mt-1">Try a different search term</p>
        </div>
      )}

      {/* User Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((user) => {
          const role = (user.role || "user").toLowerCase()
          const roleStyle = roleColors[role] || roleColors["user"]

          return (
            <div
              key={user._id}
              className="group bg-white rounded-2xl p-5 transition-all duration-250 hover:-translate-y-0.5"
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
              {/* Top Row: Avatar + Status dot */}
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-white text-base font-bold flex-shrink-0"
                  style={{ background: getColor(user.Firstname) }}
                >
                  {user.Firstname?.charAt(0)?.toUpperCase()}
                </div>

                {/* Online / status dot */}
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-full" style={{ background: "#f0fdf4" }}>
                  <FaCircle size={6} style={{ color: "#22c55e" }} />
                  <span className="text-xs font-medium" style={{ color: "#16a34a" }}>
                    {user.status || "Active"}
                  </span>
                </div>
              </div>

              {/* Name */}
              <h2 className="font-semibold text-sm truncate" style={{ color: "#1e293b" }}>
                {user.Firstname} {user.Lastname}
              </h2>

              {/* Email */}
              <div className="flex items-center gap-1.5 mt-1">
                <FiMail size={11} className="text-slate-400 flex-shrink-0" />
                <p className="text-xs truncate text-slate-400">{user.email}</p>
              </div>

              {/* Divider */}
              <div className="my-3 h-px" style={{ background: "#f1f5f9" }} />

            </div>
          )
        })}
      </div>
    </div>
  )
}

export default AllProvider