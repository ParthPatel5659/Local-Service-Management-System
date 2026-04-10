import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider";
import { toast } from "react-toastify";

const ProviderNotifications = () => {
  const { userId } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);

  // ================= GET NOTIFICATIONS =================
  const getNotifications = async () => {
    try {
      const res = await axios.get(`/notification/provider/${userId}`); // ✅ FIX URL (plural)
      setNotifications(res.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  // ================= MARK AS READ =================
  const markAsRead = async (id) => {
    try {
      await axios.put(`/notification/read/${id}`);

      // ✅ Update UI instantly
      setNotifications((prev) =>
        prev.map((n) =>
          n._id === id ? { ...n, isRead: true } : n
        )
      );

      toast.success("Marked as read");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update");
    }
  };

  useEffect(() => {
    if (userId) getNotifications();
  }, [userId]);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Provider Notifications</h1>

      {notifications.length === 0 ? (
        <p>No notifications</p>
      ) : (
        notifications.map((n) => (
          <div
            key={n._id}
            className={`border p-3 mb-2 rounded flex justify-between items-center ${
              !n.isRead ? "bg-gray-100" : ""
            }`}
          >
            <div>
              <p>{n.message}</p>
              <p className="text-sm text-gray-500">{n.type}</p>
            </div>
              <span className="text-xs text-gray-400">
                     {new Date(n.createdAt).toLocaleString()}
                </span>
            {/* ✅ BUTTON */}
            {!n.isRead && (
              <button
                onClick={() => markAsRead(n._id)}
                className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
              >
                Mark as Read
              </button>
            )}

            {/* ✅ SHOW READ STATUS */}
            {n.isRead && (
              <span className="text-green-600 text-sm font-semibold">
                Read ✓
              </span>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ProviderNotifications;