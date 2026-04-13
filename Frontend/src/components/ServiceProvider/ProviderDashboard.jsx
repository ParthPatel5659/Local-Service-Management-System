import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { AuthContext } from "../../AuthProvider";
import { useNavigate } from "react-router-dom";
import { Bell, TrendingUp, CheckCircle, Clock, Wallet } from "lucide-react"; // Optional: Icons make it look pro

const ProviderDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [earning, setEarnings] = useState(0);

  const { userId } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`/bookings/provider/${userId}`);
      setBookings(res.data?.data || []);
    } catch (error) {
      console.error("Fetch bookings error:", error);
    }
  };

  const getRevenue = async () => {
    try {
      const res = await axios.get(`/bookings/provider-earnings/${userId}`);
      setEarnings(res.data?.totalEarnings || res.data?.data || 0);
    } catch (error) {
      console.error("Revenue error:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchBookings();
      getRevenue();
    }
  }, [userId]);

  const completed = bookings.filter((b) => b.status === "Completed").length;
  const pending = bookings.filter((b) => b.status === "Pending").length;
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const chartData = [
    { name: "Pending", value: pending },
    { name: "Completed", value: completed },
  ];

  const COLORS = ["#EAB308", "#22C55E"];

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      {/* --- HEADER --- */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
          <p className="text-slate-500 text-sm">Welcome back, here is your summary.</p>
        </div>

        <button
          onClick={() => navigate("/provider/notifications")}
          className="relative p-2 bg-white rounded-full shadow-sm border border-slate-200 hover:bg-slate-50 transition-colors"
        >
          <Bell className="w-6 h-6 text-slate-600" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white">
              {unreadCount}
            </span>
          )}
        </button>
      </div>

      {/* --- STAT CARDS --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Bookings" value={bookings.length} icon={<TrendingUp />} color="bg-blue-600" />
        <StatCard title="Completed" value={completed} icon={<CheckCircle />} color="bg-green-600" />
        <StatCard title="Pending" value={pending} icon={<Clock />} color="bg-yellow-500" />
        <StatCard title="Total Earnings" value={`₹${earning}`} icon={<Wallet />} color="bg-purple-600" />
      </div>

      {/* --- CHARTS --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* BAR CHART */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-700 mb-6">Activity Bar</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[...chartData, { name: "Earnings", value: earning }]}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: "#f8fafc" }} contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }} />
                <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* PIE CHART */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-700 mb-6">Status Distribution</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Sub-component for Stats
const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center space-x-4">
    <div className={`p-3 rounded-lg text-white ${color}`}>
      {React.cloneElement(icon, { size: 24 })}
    </div>
    <div>
      <p className="text-sm text-slate-500 font-medium">{title}</p>
      <h2 className="text-2xl font-bold text-slate-800">{value}</h2>
    </div>
  </div>
);

export default ProviderDashboard;