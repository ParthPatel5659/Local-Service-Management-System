import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../AuthProvider';

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
      // Optimistically update the UI instead of a full re-fetch
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
      );
    } catch (error) {
      console.error("Error marking as read:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      getNotification();
    }
  }, [userId]);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold text-gray-800">Notifications</h1>
        <span className="bg-blue-100 text-blue-600 text-xs font-semibold px-2.5 py-0.5 rounded-full">
          {notifications.filter(n => !n.isRead).length} New
        </span>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-10 text-gray-400">Loading...</div>
        ) : notifications.length > 0 ? (
          notifications.map((n) => (
            <div
              key={n._id}
              className={`relative p-4 transition-all duration-200 border rounded-xl shadow-sm hover:shadow-md ${
                n.isRead 
                  ? "bg-gray-50 border-gray-200 opacity-75" 
                  : "bg-white border-blue-200 ring-1 ring-blue-50"
              }`}
            >
              {/* Blue dot for unread */}
              {!n.isRead && (
                <div className="absolute top-4 right-4 h-2 w-2 bg-blue-500 rounded-full"></div>
              )}

              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-500">
                  {n.type}
                </span>
                <p className={`text-gray-700 ${!n.isRead ? "font-medium" : "font-normal"}`}>
                  {n.message}
                </p>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-gray-400">
                  Just now {/* Replace with actual date formatting if available */}
                </span>
                
                {!n.isRead && (
                  <button
                    onClick={() => markRead(n._id)}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                  >
                    Mark as Read
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
            <p className="text-gray-500">All caught up! No new notifications.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserNotifications;