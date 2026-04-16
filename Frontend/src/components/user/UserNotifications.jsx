import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../AuthProvider';
import { FiCheck, FiInfo, FiBell, FiAlertCircle, FiCheckCircle, FiClock, FiTrash2 } from 'react-icons/fi';

const UserNotifications = () => {
  const { userId } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const getNotification = async () => {
    try {
      const res = await axios.get(`/notification/user/${userId}`);
      setNotifications(res.data.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const markRead = async (id) => {
    try {
      await axios.put(`/notification/read/${id}`);
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
      );
    } catch (error) {
      console.error("Error marking as read:", error);
    }
  };

  const markAllRead = async () => {
    try {
        const unreadIds = notifications.filter(n => !n.isRead).map(n => n._id);
        if(unreadIds.length === 0) return;
        
        await Promise.all(unreadIds.map(id => axios.put(`/notification/read/${id}`)));
        
        setNotifications((prev) =>
            prev.map((n) => ({ ...n, isRead: true }))
        );
    } catch (error) {
        console.error("Error marking all as read:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      getNotification();
    }
  }, [userId]);

  const getIconAndStyle = (type) => {
    const defaultStyle = { icon: <FiBell size={20} />, bg: "bg-gray-100", text: "text-gray-600", border: "border-gray-200" };
    if (!type) return defaultStyle;

    const lowerType = type.toLowerCase();
    if (lowerType.includes('success') || lowerType.includes('booking')) {
        return { icon: <FiCheckCircle size={20} />, bg: "bg-green-50", text: "text-green-600", border: "border-green-100" };
    }
    if (lowerType.includes('warning') || lowerType.includes('alert')) {
        return { icon: <FiAlertCircle size={20} />, bg: "bg-red-50", text: "text-red-500", border: "border-red-100" };
    }
    if (lowerType.includes('update') || lowerType.includes('info')) {
        return { icon: <FiInfo size={20} />, bg: "bg-blue-50", text: "text-blue-500", border: "border-blue-100" };
    }
    // Default fallback to brand colors
    return { icon: <FiBell size={20} />, bg: "bg-orange-50", text: "text-[#F59E0B]", border: "border-orange-100" };
  };

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
            <h1 className="text-3xl font-black text-[#1a1f2e] tracking-tight">Notifications</h1>
            <p className="text-gray-500 mt-1 font-medium text-sm">Stay updated with your activities and alerts.</p>
        </div>
        
        <div className="flex flex-col md:flex-row items-center gap-3">
            {notifications.filter(n => !n.isRead).length > 0 && (
            <button 
                onClick={markAllRead}
                className="text-sm font-bold text-gray-500 hover:text-[#1a1f2e] transition-colors flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 shadow-sm"
            >
                <FiCheck size={16} /> Mark all as read
            </button>
            )}
            <span className="bg-orange-50 border border-orange-100 text-[#F59E0B] text-sm font-black px-4 py-2 rounded-xl shadow-sm flex items-center gap-2">
                <FiBell className="animate-pulse" />
                {notifications.filter(n => !n.isRead).length} New
            </span>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/40 border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="text-center py-24 flex flex-col items-center justify-center">
             <div className="w-10 h-10 border-4 border-gray-100 border-t-[#F59E0B] rounded-full animate-spin mb-4"></div>
             <p className="text-gray-400 font-medium">Loading your notifications...</p>
          </div>
        ) : notifications.length > 0 ? (
          <div className="divide-y divide-gray-50">
          {notifications.map((n) => {
            const ui = getIconAndStyle(n.type);
            return (
                <div
                key={n._id}
                className={`relative p-5 sm:p-6 transition-all duration-300 flex gap-4 sm:gap-6 group hover:bg-gray-50/80 ${
                    n.isRead ? "opacity-75" : "bg-white"
                }`}
                >
                {!n.isRead && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#F59E0B] rounded-r-md"></div>
                )}

                <div className={`shrink-0 flex items-center justify-center w-12 h-12 rounded-2xl border ${ui.border} ${ui.bg} ${ui.text} shadow-sm group-hover:scale-105 transition-transform`}>
                    {ui.icon}
                </div>

                <div className="flex-1 flex flex-col justify-center">
                    <div className="flex items-center justify-between gap-4 mb-1">
                        <span className={`text-[11px] font-black uppercase tracking-widest ${n.isRead ? "text-gray-400" : "text-[#F59E0B]"}`}>
                            {n.type || 'Alert'}
                        </span>
                        <span className="text-xs font-semibold text-gray-400 flex items-center gap-1 shrink-0">
                            <FiClock size={12} /> {new Date(n.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </span>
                    </div>
                    
                    <p className={`text-[15px] leading-relaxed ${!n.isRead ? "font-bold text-[#1a1f2e]" : "font-medium text-gray-600"}`}>
                        {n.message}
                    </p>

                    {!n.isRead && (
                        <div className="mt-3 flex">
                            <button
                                onClick={() => markRead(n._id)}
                                className="text-xs font-bold text-[#F59E0B] hover:text-[#d97706] bg-orange-50 hover:bg-orange-100 px-3 py-1.5 rounded-lg transition-colors border border-orange-100/50"
                            >
                                Mark as Read
                            </button>
                        </div>
                    )}
                </div>
                </div>
            );
          })}
          </div>
        ) : (
          <div className="text-center py-24 flex flex-col items-center justify-center">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-6">
                <FiBell size={32} />
            </div>
            <h3 className="text-xl font-bold text-[#1a1f2e] mb-2">All caught up!</h3>
            <p className="text-gray-500 font-medium">You don't have any new notifications at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserNotifications;