import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { AuthContext } from "../../AuthProvider";

const ProviderDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const {userId}=useContext(AuthContext)

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`/bookings/provider/${userId}`);
      setBookings(res.data?.data || []);
      console.log(res.data.data);
      
    } catch (error) {
      console.log(error);
    }
  };

  const completed = bookings.filter(b => b.status === "completed").length;
  const pending = bookings.filter(b => b.status === "pending").length;

  const notifications = bookings.filter(b => b.status === "pending");

  const chartData = [
    { name: "Pending", value: pending },
    { name: "Completed", value: completed },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

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

      {/* 🔔 NOTIFICATIONS */}
      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <h2 className="font-bold mb-3">🔔 New Bookings</h2>

        {notifications.length === 0 ? (
          <p>No new bookings</p>
        ) : (
          notifications.map((b) => (
            <div key={b._id} className="border-b py-2 flex justify-between">
              <div>
                <p>{b.serviceName}</p>
                <p className="text-sm">{b.date}</p>
              </div>
              <span className="bg-yellow-200 px-2 py-1 rounded text-xs">
                New
              </span>
            </div>
          ))
        )}
      </div>

      {/* CHART */}
      <div className="bg-white p-4 rounded-xl shadow">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#6366f1" />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default ProviderDashboard;