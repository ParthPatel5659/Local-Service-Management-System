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
import { FiTrendingUp, FiCheckCircle, FiClock, FiDollarSign, FiCalendar, FiArrowRight } from "react-icons/fi";
import { FaRupeeSign } from "react-icons/fa";

const ProviderDashboard = () => {
  const [bookings, setBookings] = useState([]);
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

  const chartData = [
    { name: "Pending", value: pending, color: "#F59E0B" },
    { name: "Completed", value: completed, color: "#10b981" },
  ];

  const COLORS = ["#F59E0B", "#10b981"];

  return (
    <div className="space-y-10">
      
      {/* ── Welcome Header ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-[#1a1f2e] tracking-tight">System Status</h1>
          <p className="text-gray-500 mt-1 font-medium">Monitoring your service performance and earnings.</p>
        </div>
        <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-gray-100 shadow-sm">
            {/* <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-3">Quick Actions</span> */}
            <button 
                onClick={() => navigate("/provider/addservice")}
                className="bg-[#F59E0B] hover:bg-[#D97706] text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-lg shadow-orange-100 transition-all"
            >
                + New Service
            </button>
        </div>
      </div>

      {/* ── Stat Cards Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
            title="Revenue" 
            value={earning} 
            isMoney={true}
            icon={<FiDollarSign />} 
            color="bg-orange-50 text-[#F59E0B]" 
            trend="+12%"
        />
        <StatCard 
            title="Requests" 
            value={bookings.length} 
            icon={<FiCalendar />} 
            color="bg-blue-50 text-blue-600" 
            trend="+5"
        />
        <StatCard 
            title="Completed" 
            value={completed} 
            icon={<FiCheckCircle />} 
            color="bg-green-50 text-green-600" 
            trend="92%"
        />
        <StatCard 
            title="Pending" 
            value={pending} 
            icon={<FiClock />} 
            color="bg-yellow-50 text-yellow-600" 
            trend="Act now"
        />
      </div>

      {/* ── Charts Section ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Activity Summary Bar Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-xl font-black text-[#1a1f2e]">Performance Metrics</h3>
            <select className="text-xs font-bold text-gray-400 bg-gray-50 border-none rounded-lg focus:ring-0">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 'bold'}}
                    dy={10}
                />
                <YAxis hide />
                <Tooltip 
                    cursor={{ fill: "#f9fafb" }} 
                    contentStyle={{ borderRadius: "16px", border: "none", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)", fontWeight: 'bold' }} 
                />
                <Bar dataKey="value" fill="#F59E0B" radius={[10, 10, 10, 10]} barSize={60}>
                    {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Distribution Pie Chart */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col">
          <h3 className="text-xl font-black text-[#1a1f2e] mb-6">Order Status</h3>
          <div className="flex-1 min-h-[250px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  innerRadius={70}
                  outerRadius={90}
                  paddingAngle={8}
                  stroke="none"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                <p className="text-3xl font-black text-[#1a1f2e]">{bookings.length}</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total</p>
            </div>
          </div>
          <div className="mt-6 space-y-3">
              {chartData.map((entry, i) => (
                  <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{backgroundColor: entry.color}}></div>
                          <span className="text-sm font-bold text-gray-600">{entry.name}</span>
                      </div>
                      <span className="text-sm font-black text-[#1a1f2e]">{entry.value}</span>
                  </div>
              ))}
          </div>
        </div>
      </div>

      {/* ── Recent Requests ── */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black text-[#1a1f2e]">Recent Requests</h3>
            <button onClick={() => navigate("/provider/bookings")} className="text-xs font-black text-[#F59E0B] uppercase tracking-widest hover:underline flex items-center gap-1">
                View All <FiArrowRight />
            </button>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="text-left border-b border-gray-50 pb-4">
                        <th className="text-[10px] font-black text-gray-400 uppercase tracking-widest pb-4">Customer</th>
                        <th className="text-[10px] font-black text-gray-400 uppercase tracking-widest pb-4">Service</th>
                        <th className="text-[10px] font-black text-gray-400 uppercase tracking-widest pb-4">Amount</th>
                        <th className="text-[10px] font-black text-gray-400 uppercase tracking-widest pb-4">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {bookings.slice(0, 5).map((booking) => (
                        <tr key={booking._id} className="group hover:bg-gray-50/50 transition-colors">
                            <td className="py-4 font-bold text-sm text-[#1a1f2e]">{booking.userId?.Firstname} {booking.userId?.Lastname}</td>
                            <td className="py-4 text-sm font-medium text-gray-500">{booking.serviceId?.[0]?.serviceName}</td>
                            <td className="py-4 text-sm font-black text-[#1a1f2e]">₹{booking.totalAmount}</td>
                            <td className="py-4">
                                <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-lg border ${
                                    booking.status === 'Completed' ? 'bg-green-50 text-green-600 border-green-100' : 
                                    booking.status === 'Pending' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                                    'bg-gray-50 text-gray-400 border-gray-100'
                                }`}>
                                    {booking.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

// Internal StatCard component with premium styling
const StatCard = ({ title, value, icon, color, trend, isMoney }) => (
  <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm group hover:shadow-xl hover:border-orange-100 transition-all duration-300">
    <div className="flex items-center justify-between mb-6">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-inner ${color}`}>
            {icon}
        </div>
        <span className="text-[10px] font-black text-[#10b981] bg-green-50 px-2.5 py-1 rounded-lg">
            {trend}
        </span>
    </div>
    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[2px] mb-1">{title}</p>
    <div className="flex items-baseline gap-1">
        {isMoney && <FaRupeeSign className="text-lg font-black text-[#1a1f2e]" />}
        <h2 className="text-3xl font-black text-[#1a1f2e] tracking-tighter">{value}</h2>
    </div>
  </div>
);

export default ProviderDashboard;