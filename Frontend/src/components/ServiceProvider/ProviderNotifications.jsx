import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider";
import { toast } from "react-toastify";
import { FiBell, FiCheckCircle, FiClock, FiInfo, FiAlertCircle } from "react-icons/fi";

const ProviderNotifications = () => {
  const { userId } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const getNotifications = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/notification/provider/${userId}`);
      setNotifications(res.data.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      await axios.put(`/notification/read/${id}`);
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
      );
      toast.success("Notification archived");
    } catch (error) {
      console.error(error);
      toast.error("Failed to archive notification");
    }
  };

  useEffect(() => {
    if (userId) getNotifications();
  }, [userId]);

  const getTypeTheme = (type) => {
    const t = type?.toUpperCase() || "";
    if (t.includes("BOOKING") || t.includes("ORDER")) return { icon: <FiClock />, color: "bg-blue-50 text-blue-600 border-blue-100" };
    if (t.includes("PAYMENT") || t.includes("EARN")) return { icon: <FiCheckCircle />, color: "bg-green-50 text-green-600 border-green-100" };
    if (t.includes("ALERT") || t.includes("CANCEL")) return { icon: <FiAlertCircle />, color: "bg-red-50 text-red-600 border-red-100" };
    return { icon: <FiInfo />, color: "bg-orange-50 text-[#F59E0B] border-orange-100" };
  };

  return (
    <div className="space-y-10">
      {/* ── Page Header ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-[#1a1f2e] tracking-tight">System Alerts</h1>
          <p className="text-gray-500 mt-1 font-medium">Platform notices, booking updates, and administrative alerts.</p>
        </div>
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-gray-100 shadow-sm text-[10px] font-black uppercase tracking-widest text-[#1a1f2e]">
            <span className="text-gray-400">Unread Logs:</span> 
            <span className="bg-orange-50 text-[#F59E0B] px-2 py-0.5 rounded-md border border-orange-100">
                {notifications.filter(n => !n.isRead).length}
            </span>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#F59E0B] border-t-transparent shadow-lg"></div>
        </div>
      ) : notifications.length === 0 ? (
        <div className="bg-white p-24 rounded-[3rem] text-center border border-dashed border-gray-200 shadow-sm">
          <div className="w-20 h-20 bg-gray-50 flex items-center justify-center rounded-2xl text-gray-300 mx-auto mb-6 shadow-inner">
              <FiBell size={32} />
          </div>
          <h3 className="text-2xl font-black text-[#1a1f2e] mb-2">Zero Active Alerts</h3>
          <p className="text-gray-500 max-w-sm mx-auto font-medium">Your notification pipeline is currently empty. We'll alert you when critical events occur.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.map((n) => {
            const theme = getTypeTheme(n.type);
            
            return (
              <div
                key={n._id}
                className={`group transition-all duration-300 border p-6 flex flex-col sm:flex-row sm:items-center gap-6 shadow-sm rounded-[2rem] ${
                  !n.isRead
                    ? "bg-white border-[#F59E0B]/30 hover:border-[#F59E0B] hover:shadow-xl hover:-translate-y-1 relative overflow-hidden"
                    : "bg-gray-50/50 border-gray-100 opacity-80"
                }`}
              >
                {/* Unread Accent Line */}
                {!n.isRead && <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#F59E0B]"></div>}

                {/* Icon Wrapper */}
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl flex-shrink-0 ${theme.color}`}>
                    {theme.icon}
                </div>

                <div className="flex-1 min-w-0 pr-4">
                  <div className="flex items-center flex-wrap gap-2 mb-2">
                    <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-[2px] border ${
                      !n.isRead ? theme.color : "bg-white text-gray-400 border-gray-100"
                    }`}>
                      {n.type || "System Log"}
                    </span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                      <FiClock /> {new Date(n.createdAt).toLocaleString(undefined, {
                        month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                      })}
                    </span>
                  </div>
                  <p className={`text-base leading-snug mt-1 ${
                    !n.isRead ? "text-[#1a1f2e] font-black" : "text-gray-500 font-bold"
                  }`}>
                    {n.message}
                  </p>
                </div>

                <div className="flex items-center justify-start sm:justify-end flex-shrink-0 pt-4 sm:pt-0 sm:border-l sm:border-transparent sm:pl-4">
                  {!n.isRead ? (
                    <button
                      onClick={() => markAsRead(n._id)}
                      className="bg-white hover:bg-[#1a1f2e] hover:text-white text-[#1a1f2e] border border-gray-200 hover:border-[#1a1f2e] px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all w-full sm:w-auto shadow-sm"
                    >
                      Archive Log
                    </button>
                  ) : (
                    <div className="flex items-center gap-1.5 text-gray-400 bg-white border border-gray-100 px-4 py-2 rounded-xl">
                      <FiCheckCircle size={14} />
                      <span className="text-[9px] font-black uppercase tracking-[2px]">Archived</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProviderNotifications;