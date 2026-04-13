import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider";
import { toast } from "react-toastify";
import { Bell, CheckCircle, Clock } from "lucide-react"; // Optional: Icons for better UX

const ProviderNotifications = () => {
  const { userId } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);

  const getNotifications = async () => {
    try {
      const res = await axios.get(`/notification/provider/${userId}`);
      setNotifications(res.data.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const markAsRead = async (id) => {
    try {
      await axios.put(`/notification/read/${id}`);
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
      );
      toast.success("Marked as read");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update");
    }
  };

  useEffect(() => {
    if (userId) getNotifications();
  }, [userId]);

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        {/* --- HEADER --- */}
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <Bell className="text-white w-5 h-5" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Notifications</h1>
        </div>

        {/* --- NOTIFICATION LIST --- */}
        <div className="space-y-3">
          {notifications.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
              <p className="text-slate-500 font-medium">Your inbox is empty</p>
            </div>
          ) : (
            notifications.map((n) => (
              <div
                key={n._id}
                className={`transition-all duration-200 border rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  !n.isRead
                    ? "bg-blue-50 border-blue-200 shadow-sm"
                    : "bg-white border-slate-200 opacity-80"
                }`}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      !n.isRead ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-600"
                    }`}>
                      {n.type}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(n.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className={`text-sm md:text-base ${!n.isRead ? "text-slate-900 font-semibold" : "text-slate-600"}`}>
                    {n.message}
                  </p>
                </div>

                <div className="flex items-center justify-end">
                  {!n.isRead ? (
                    <button
                      onClick={() => markAsRead(n._id)}
                      className="w-full sm:w-auto bg-white hover:bg-blue-600 hover:text-white text-blue-600 border border-blue-600 px-4 py-1.5 rounded-lg text-sm font-medium transition-colors"
                    >
                      Mark as Read
                    </button>
                  ) : (
                    <div className="flex items-center gap-1 text-green-600 bg-green-50 px-3 py-1 rounded-full">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase tracking-tighter">Seen</span>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProviderNotifications;