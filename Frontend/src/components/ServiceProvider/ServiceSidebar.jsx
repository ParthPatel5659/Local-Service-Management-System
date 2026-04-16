import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthProvider";
import axios from "axios";
import { 
  FiHome, 
  FiTool, 
  FiCalendar, 
  FiCreditCard, 
  FiStar, 
  FiUser, 
  FiActivity, 
  FiHelpCircle, 
  FiLogOut,
  FiChevronRight
} from "react-icons/fi";

const ServiceSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userId, logout } = useContext(AuthContext);
  const [user, setUser] = useState({});

  const getUser = async () => {
    try {
      const res = await axios.get(`/user/profile/${userId}`);
      setUser(res.data.data || {});
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userId) getUser();
  }, [userId]);

  const navItems = [
    { to: "/provider/dashboard", label: "Dashboard", icon: <FiHome /> },
    { to: `/provider/services/${userId}`, label: "My Services", icon: <FiTool /> },
    { to: "/provider/bookings", label: "Service Requests", icon: <FiCalendar /> },
    { to: "/provider/payment", label: "Earnings", icon: <FiCreditCard /> },
    { to: `/provider/reviwes/${userId}`, label: "Reviews", icon: <FiStar /> },
    { to: `/provider/profile/${userId}`, label: "Account Profile", icon: <FiUser /> },
    { to: `/provider/activity-log`, label: "Work Activity", icon: <FiActivity /> },
    { to: `/provider/support`, label: "Get Help", icon: <FiHelpCircle /> },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex min-h-screen bg-[#f9fafb] font-sans">
      
      {/* ── Sidebar ── */}
      <aside className="w-72 bg-[#1a1f2e] text-white flex flex-col fixed h-screen z-50">
        
        {/* Brand Logo */}
        <div className="p-8 pb-10">
          <Link to="/provider/dashboard" className="text-3xl font-black tracking-tighter">
            <span className="text-white">Local</span>
            <span className="text-[#F59E0B]">Serv</span>
          </Link>
          <div className="mt-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-[10px] font-black uppercase tracking-[2px] text-gray-500">Provider Portal</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center justify-between px-5 py-4 rounded-2xl text-sm font-bold transition-all duration-200 group ${
                isActive(item.to)
                  ? "bg-[#F59E0B] text-white shadow-lg shadow-orange-900/20"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <div className="flex items-center gap-4">
                <span className={`text-xl ${isActive(item.to) ? "text-white" : "text-gray-500 group-hover:text-[#F59E0B]"}`}>
                  {item.icon}
                </span>
                {item.label}
              </div>
              {isActive(item.to) && <FiChevronRight />}
            </Link>
          ))}
        </nav>

        {/* User Info & Logout */}
        <div className="p-6 bg-[#151926]">
          <div className="flex items-center gap-4 mb-6 p-2">
            <div className="relative">
                <img
                    src={user?.profilePicture || `https://ui-avatars.com/api/?name=${user?.Firstname}+${user?.Lastname}&background=F59E0B&color=fff&bold=true`}
                    alt="profile"
                    className="w-12 h-12 rounded-2xl object-cover border-2 border-white/10"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-4 border-[#151926] rounded-full"></div>
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-black truncate">{user?.Firstname} {user?.Lastname}</p>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider truncate">Verified Pro</p>
            </div>
          </div>
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-3 py-4 bg-white/5 hover:bg-red-500 text-gray-400 hover:text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all duration-300"
          >
            <FiLogOut /> Sign Out
          </button>
        </div>
      </aside>

      {/* ── Main Content Area ── */}
      <main className="flex-1 ml-72 min-h-screen">
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-10 sticky top-0 z-40 shadow-sm">
            <h2 className="text-xl font-black text-[#1a1f2e] capitalize">
                {location.pathname.split("/").pop()}
            </h2>
            <div className="flex items-center gap-6">
                <button className="text-gray-400 hover:text-[#F59E0B] transition-colors relative">
                    <FiStar size={20} />
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <div className="h-8 w-px bg-gray-100"></div>
                <div className="flex items-center gap-3">
                    <p className="text-right hidden sm:block">
                        <span className="block text-xs font-black text-[#1a1f2e]">{user?.Firstname}</span>
                        <span className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest">Available</span>
                    </p>
                </div>
            </div>
        </header>

        <div className="p-10">
          <Outlet />
        </div>
      </main>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,158,11,0.2); }
      `}</style>
    </div>
  );
};

export default ServiceSidebar;