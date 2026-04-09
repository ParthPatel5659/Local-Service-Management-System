import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { AuthContext } from "../../AuthProvider";
import { useNavigate } from "react-router-dom";

const ProviderDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const { userId } = useContext(AuthContext);
  const navigate = useNavigate();

  // ================= BOOKINGS =================
  const fetchBookings = async () => {
    try {
      const res = await axios.get(`/bookings/provider/${userId}`);
      setBookings(res.data?.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  // ================= NOTIFICATIONS =================
  const getNotifications = async () => {
    try {
      const res = await axios.get(`/notifications/provider/${userId}`);
      setNotifications(res.data?.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchBookings();
      getNotifications();
    }
  }, [userId]);

  const completed = bookings.filter(b => b.status === "Completed").length;
  const pending = bookings.filter(b => b.status === "Pending").length;

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const chartData = [
    { name: "Pending", value: pending },
    { name: "Completed", value: completed },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* 🔔 ONLY BELL */}
      <div className="flex justify-end mb-4">
        <div
          className="cursor-pointer relative text-2xl"
          onClick={() => navigate("/provider/notifications")}
        >
          🔔

          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-500 text-white p-4 rounded-xl">
          <p>Total</p>
          <h2>{bookings.length}</h2>
        </div>

        <div className="bg-green-500 text-white p-4 rounded-xl">
          <p>Completed</p>
          <h2>{completed}</h2>
        </div>

        <div className="bg-yellow-500 text-white p-4 rounded-xl">
          <p>Pending</p>
          <h2>{pending}</h2>
        </div>
      </div>

      {/* CHART */}
      <div className="bg-white p-4 rounded-xl shadow">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProviderDashboard;