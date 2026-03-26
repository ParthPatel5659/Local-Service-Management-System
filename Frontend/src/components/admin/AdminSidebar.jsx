import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaUserTie,
  FaServicestack,
  FaCalendarCheck,
  FaMoneyBill,
  FaStar,
  FaList,
  FaChartBar,
  FaClipboardList,
  FaSearch,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";

const menu = [
  { name: "Dashboard",  path: "/admin/dashboard",  icon: <FaTachometerAlt /> },
  { name: "Users",      path: "/admin/users",       icon: <FaUsers /> },
  { name: "Providers",  path: "/admin/providers",   icon: <FaUserTie /> },
  { name: "Services",   path: "/admin/services",    icon: <FaServicestack /> },
  { name: "Bookings",   path: "/admin/bookings",    icon: <FaCalendarCheck /> },
  { name: "Payments",   path: "/admin/payments",    icon: <FaMoneyBill /> },
  { name: "Reviews",    path: "/admin/reviews",     icon: <FaStar /> },
  { name: "Categories", path: "/admin/category",  icon: <FaList /> },
  { name: "Reports",    path: "/admin/reports",     icon: <FaChartBar /> },
  { name: "Admin Logs", path: "/admin/logs",        icon: <FaClipboardList /> },
];

const AdminSidebar = () => {
  const location = useLocation();
  const [search, setSearch] = useState("");

  const filtered = menu.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-screen">
    <div
      className=" w-64  flex-col"
      style={{
        background: "linear-gradient(180deg, #f0f4ff 0%, #ffffff 100%)",
        fontFamily: "'Plus Jakarta Sans', 'Nunito', sans-serif",
        borderRight: "1px solid #e8edf5",
      }}
    >
      {/* Brand */}
      <div className="flex items-center justify-between px-5 py-5">
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold"
            style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
          >
            L
          </div>
          <span className="font-bold text-base tracking-tight" style={{ color: "#1e293b" }}>
            Local Service
          </span>
        </div>
        <button className="text-slate-400 hover:text-indigo-500 transition-colors duration-150">
          <FaBars className="text-sm" />
        </button>
      </div>

      {/* Search */}
      <div className="px-4 pb-4">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs pointer-events-none" />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-2 rounded-xl text-sm placeholder-slate-400 outline-none focus:ring-2 focus:ring-indigo-300 transition-all duration-150"
            style={{
              background: "#eef1f8",
              border: "1px solid #dde3f0",
              color: "#334155",
            }}
          />
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 pb-3">
        <ul className="space-y-0.5">
          {filtered.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={[
                    "group flex items-center gap-3 py-2.5 rounded-xl text-sm transition-all duration-200 relative overflow-hidden",
                    isActive ? "px-4 font-semibold" : "px-3 hover:px-4",
                  ].join(" ")}
                  style={
                    isActive
                      ? {
                          background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                          color: "#ffffff",
                          boxShadow: "0 4px 15px rgba(99,102,241,0.35)",
                        }
                      : { color: "#64748b" }
                  }
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = "#eef1fb";
                      e.currentTarget.style.color = "#6366f1";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "#64748b";
                    }
                  }}
                >
                  {/* Active left accent pill */}
                  {isActive && (
                    <span
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-full bg-white opacity-60"
                    />
                  )}

                  <span
                    className="flex-shrink-0 text-sm"
                    style={isActive ? { color: "rgba(255,255,255,0.9)" } : {}}
                  >
                    {item.icon}
                  </span>

                  <span className="truncate">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile Footer */}
      <div
        className="mx-3 mb-4 px-3 py-3 rounded-xl flex items-center gap-3"
        style={{
          background: "#eef1f8",
          border: "1px solid #dde3f0",
        }}
      >
        <div
          className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs font-bold"
          style={{ background: "linear-gradient(135deg, #f59e0b, #ef4444)" }}
        >
          A
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold truncate" style={{ color: "#1e293b" }}>Admin User</p>
          <p className="text-xs truncate text-slate-400">Administrator</p>
        </div>

        <button className="text-slate-400 hover:text-red-400 transition-colors duration-150 flex-shrink-0">
          <FaSignOutAlt className="text-sm" />
        </button>
      </div>
      
    </div>
    {/* Main Content */}
    <div className="flex-1 bg-gray-100 overflow-y-auto p-6">
      <Outlet />
    </div>
    </div>
  );
};

export default AdminSidebar;