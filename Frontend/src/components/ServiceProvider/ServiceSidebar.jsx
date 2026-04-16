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
  FiChevronRight,
  FiBell
} from "react-icons/fi";

const ServiceSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userId, logout } = useContext(AuthContext);
  const [user, setUser] = useState({});
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const getUser = async () => {
    try {
      const res = await axios.get(`/user/profile/${userId}`);
      setUser(res.data.data || {});
    } catch (error) {
      console.log(error);
    }
  };

  const getNotifications = async () => {
    try {
      const res = await axios.get(`/notification/provider/${userId}`);
      setNotifications(res.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userId) {
      getUser();
      getNotifications();
    }
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

  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('/services/')) return "My Services";
    if (path.includes('/reviwes/')) return "Reviews";
    if (path.includes('/profile/')) return "Account Profile";
    return path.split("/").pop().replace(/-/g, ' ');
  };

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
                {getPageTitle()}
            </h2>
            <div className="flex items-center gap-6">
                <div className="relative">
                    <button 
                        onClick={() => setShowNotifications(!showNotifications)}
                        className="text-gray-400 hover:text-[#F59E0B] transition-colors relative flex items-center p-1"
                    >
                        <FiBell size={20} />
                        {notifications?.filter(n => !n.isRead)?.length > 0 && (
                            <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 bg-red-500 border border-white rounded-full flex items-center justify-center text-[9px] font-black text-white">
                                {notifications.filter(n => !n.isRead).length}
                            </span>
                        )}
                    </button>
                    {showNotifications && (
                        <div className="absolute right-0 mt-4 w-72 bg-white rounded-xl shadow-lg border border-gray-100 p-4 z-50">
                            <div className="flex justify-between items-center mb-2 border-b border-gray-100 pb-2">
                                <h3 className="text-sm font-bold text-gray-800">Notifications</h3>
                                <div className="flex items-center gap-3">
                                    <span className="text-[10px] bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full font-bold">
                                        {notifications?.filter(n => !n.isRead)?.length || 0} New
                                    </span>
                                    <Link to='/provider/notifications' onClick={() => setShowNotifications(false)} className="text-[10px] font-bold text-[#F59E0B] uppercase tracking-wider hover:underline">View All</Link>
                                </div>
                            </div>
                            <div className="max-h-64 overflow-y-auto custom-scrollbar flex flex-col gap-2">
                                {notifications?.length > 0 ? (
                                    notifications.map((notif, index) => (
                                        <div key={index} className="p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors border-b border-gray-50 last:border-0">
                                            <p className="text-xs font-bold text-gray-800">{notif?.title || 'New Notification'}</p>
                                            <p className="text-[10px] text-gray-500 mt-1 line-clamp-2">{notif?.message || notif?.notification || 'Check your provider dashboard for details.'}</p>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-xs text-gray-500 text-center py-6 font-medium">
                                        No new notifications
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
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