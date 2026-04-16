import React, { useContext, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { 
  FiHome, 
  FiUsers, 
  FiUserCheck, 
  FiTool, 
  FiCalendar, 
  FiCreditCard, 
  FiStar, 
  FiLayers, 
  FiMessageSquare, 
  FiActivity, 
  FiSearch, 
  FiLogOut,
  FiMenu,
  FiChevronRight
} from "react-icons/fi";
import { AuthContext } from "../../AuthProvider";

const menu = [
  { name: "Dashboard",  path: "/admin/dashboard",  icon: <FiHome /> },
  { name: "Users",      path: "/admin/users",       icon: <FiUsers /> },
  { name: "Providers",  path: "/admin/providers",   icon: <FiUserCheck /> },
  { name: "Services",   path: "/admin/services",    icon: <FiTool /> },
  { name: "Bookings",   path: "/admin/bookings",    icon: <FiCalendar /> },
  { name: "Payments",   path: "/admin/payments",    icon: <FiCreditCard /> },
  { name: "Reviews",    path: "/admin/reviews",     icon: <FiStar /> },
  { name: "Categories", path: "/admin/category",  icon: <FiLayers /> },
  { name: "Supports",   path: "/admin/support",     icon: <FiMessageSquare /> },
  { name: "Activity",   path: "/admin/activity",    icon: <FiActivity /> },
];

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const [search, setSearch] = useState("");
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login"); 
  };

  const filtered = menu.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex h-screen bg-[#f9fafb] font-sans overflow-hidden">
      
      {/* ── Sidebar ── */}
      <aside className={`bg-[#1a1f2e] text-white flex flex-col transition-all duration-300 ${collapsed ? "w-20" : "w-72"}`}>
        
        {/* Brand */}
        <div className="p-8 pb-10 flex items-center justify-between">
          {!collapsed && (
            <Link to="/admin/dashboard" className="text-3xl font-black tracking-tighter">
                <span className="text-white">Local</span>
                <span className="text-[#F59E0B]">Serv</span>
            </Link>
          )}
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 transition-colors"
          >
            <FiMenu size={20} />
          </button>
        </div>

        {/* Global Search */}
        {!collapsed && (
            <div className="px-6 mb-8">
                <div className="relative group">
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#F59E0B] transition-colors" />
                    <input
                        type="text"
                        placeholder="Search modules..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/5 rounded-2xl text-xs font-bold text-white placeholder-gray-500 outline-none focus:border-[#F59E0B]/30 transition-all font-sans"
                    />
                </div>
            </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto no-scrollbar pb-10">
          {filtered.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center justify-between px-5 py-4 rounded-2xl text-sm font-bold transition-all duration-200 group ${
                isActive(item.path)
                  ? "bg-[#F59E0B] text-white shadow-lg shadow-orange-900/20"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <div className="flex items-center gap-4">
                <span className={`text-xl ${isActive(item.path) ? "text-white" : "text-gray-500 group-hover:text-[#F59E0B]"}`}>
                  {item.icon}
                </span>
                {!collapsed && <span>{item.name}</span>}
              </div>
              {isActive(item.path) && !collapsed && <FiChevronRight />}
            </Link>
          ))}
        </nav>

        {/* Admin Meta */}
        <div className="p-6 bg-[#151926]">
            {!collapsed ? (
                <div className="flex items-center gap-4 mb-6 p-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center text-white font-black">
                        Ad
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-black truncate">Main Administrator</p>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">System Root</p>
                    </div>
                </div>
            ) : (
                <div className="flex justify-center mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center text-white font-black">Ad</div>
                </div>
            )}
            
            <button
                onClick={handleLogout}
                className={`w-full flex items-center justify-center gap-3 py-4 bg-white/5 hover:bg-red-500 text-gray-400 hover:text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${collapsed ? "px-0" : "px-4"}`}
            >
                <FiLogOut /> {!collapsed && "Logout"}
            </button>
        </div>
      </aside>

      {/* ── Main Content Area ── */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-10 shrink-0 shadow-sm z-10">
            <h2 className="text-xl font-black text-[#1a1f2e] capitalize">
                {location.pathname.split("/").pop() || "Control Center"}
            </h2>
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    System Live
                </div>
            </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
          <Outlet />
        </div>
      </main>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

export default AdminSidebar;