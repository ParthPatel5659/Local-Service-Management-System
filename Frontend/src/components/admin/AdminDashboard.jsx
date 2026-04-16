import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis,
  ResponsiveContainer, LineChart, Line,
  AreaChart, Area
} from "recharts";
import { FiUsers, FiUserCheck, FiCalendar, FiDollarSign, FiTrendingUp, FiArrowUpRight, FiArrowDownRight } from "react-icons/fi";
import { FaRupeeSign } from "react-icons/fa";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [providers, setProviders] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [revenues, setRevenus] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [resUsers, resProviders, resBookings, resRevenues] = await Promise.all([
        axios.get("/user/users"),
        axios.get("/user/providers"),
        axios.get("/bookings/all"),
        axios.get("/bookings/revenue")
      ]);

      setUsers(resUsers.data?.data || []);
      setProviders(resProviders.data?.data || []);
      setBookings(resBookings.data?.data || []);
      setRevenus(resRevenues.data?.totalRevenue || 0);
      
    } catch (error) {
      console.error("Dashboard Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const totalUsers = users.length;
  const totalProviders = providers.length;
  const totalBookings = bookings.length;
  const totalRevenues = revenues;

  const chartData = [
    { name: "Users", value: totalUsers, color: "#F59E0B" },
    { name: "Providers", value: totalProviders, color: "#1a1f2e" },
    { name: "Bookings", value: totalBookings, color: "#10b981" },
  ];

  const COLORS = ["#F59E0B", "#1a1f2e", "#10b981", "#3b82f6"];

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#F59E0B] border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      
      {/* ── Page Header ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-[#1a1f2e] tracking-tight">System Analytics</h1>
          <p className="text-gray-500 mt-1 font-medium">Real-time overview of LocalServ platform growth.</p>
        </div>
        <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-gray-100 shadow-sm">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#F59E0B] px-4 py-2 bg-orange-50 rounded-xl border border-orange-100">Live Updates Enabled</span>
        </div>
      </div>

      {/* ── Stats Highlight Cards ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
            title="Revenue" 
            value={totalRevenues} 
            isMoney={true}
            icon={<FiDollarSign />} 
            color="bg-orange-50 text-[#F59E0B]" 
            trend="+18.4%"
            isPositive={true}
        />
        <StatCard 
            title="Total Users" 
            value={totalUsers} 
            icon={<FiUsers />} 
            color="bg-[#1a1f2e] text-white" 
            trend="+24"
            isPositive={true}
        />
        <StatCard 
            title="Pros" 
            value={totalProviders} 
            icon={<FiUserCheck />} 
            color="bg-blue-50 text-blue-600" 
            trend="+3"
            isPositive={true}
        />
        <StatCard 
            title="Bookings" 
            value={totalBookings} 
            icon={<FiCalendar />} 
            color="bg-green-50 text-green-600" 
            trend="-2%"
            isPositive={false}
        />
      </div>

      {/* ── Analytics Visuals ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Performance Chart */}
        <div className="lg:col-span-2 bg-white p-8 md:p-10 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-xl font-black text-[#1a1f2e]">Platform Activity Breakdown</h3>
            <div className="flex items-center gap-2">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">View Method:</span>
                <select className="text-xs font-bold text-[#F59E0B] bg-orange-50 border-none rounded-lg focus:ring-0">
                    <option>Weekly View</option>
                    <option>Monthly View</option>
                </select>
            </div>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 'bold'}}
                    dy={12}
                />
                <YAxis hide />
                <Tooltip 
                    cursor={{ fill: "#f9fafb" }} 
                    contentStyle={{ borderRadius: "20px", border: "none", boxShadow: "0 10px 25px -5px rgb(0 0 0 / 0.1)", padding: '15px' }} 
                />
                <Bar dataKey="value" radius={[12, 12, 12, 12]} barSize={70}>
                    {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* User Distribution Pie */}
        <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col">
          <h3 className="text-xl font-black text-[#1a1f2e] mb-8">Role Distribution</h3>
          <div className="flex-1 min-h-[250px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={75}
                  outerRadius={95}
                  paddingAngle={10}
                  dataKey="value"
                  stroke="none"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                <p className="text-4xl font-black text-[#1a1f2e] tracking-tighter">{totalUsers + totalProviders}</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[2px]">Total Entities</p>
            </div>
          </div>
          <div className="mt-8 space-y-4">
              {chartData.map((entry, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl border border-gray-100/50">
                      <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full" style={{backgroundColor: entry.color}}></div>
                          <span className="text-xs font-bold text-gray-600 tracking-tight">{entry.name}</span>
                      </div>
                      <span className="text-xs font-black text-[#1a1f2e]">{entry.value}</span>
                  </div>
              ))}
          </div>
        </div>

        {/* Global Growth Over Time */}
        <div className="lg:col-span-3 bg-[#1a1f2e] p-8 md:p-12 rounded-[3rem] text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#F59E0B]/5 to-transparent"></div>
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-orange-500/10 blur-[100px] rounded-full"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-12">
                <div>
                    <h3 className="text-2xl font-black mb-2 tracking-tight">Growth Projection</h3>
                    <p className="text-gray-400 text-sm font-medium">Monitoring platform expansion across all metrics.</p>
                </div>
                <div className="flex gap-4">
                    <div className="text-right">
                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Avg Growth</p>
                        <p className="text-xl font-black text-[#F59E0B]">+32.4%</p>
                    </div>
                </div>
            </div>
            
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                    <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <Tooltip 
                        contentStyle={{ backgroundColor: '#1a1f2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '15px' }} 
                    />
                    <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#F59E0B" 
                        strokeWidth={4} 
                        fillOpacity={1} 
                        fill="url(#colorValue)" 
                    />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

// Internal StatCard sub-component
const StatCard = ({ title, value, icon, color, trend, isPositive, isMoney }) => (
  <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm group hover:shadow-xl hover:border-orange-100 transition-all duration-300 relative overflow-hidden">
    <div className="flex items-center justify-between mb-8">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-inner ${color}`}>
            {icon}
        </div>
        <div className={`flex items-center gap-1 text-[10px] font-black px-2.5 py-1.5 rounded-xl border ${
            isPositive ? "bg-green-50 text-green-600 border-green-100" : "bg-red-50 text-red-600 border-red-100"
        }`}>
            {isPositive ? <FiArrowUpRight /> : <FiArrowDownRight />} {trend}
        </div>
    </div>
    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[2px] mb-2">{title}</p>
    <div className="flex items-baseline gap-1">
        {isMoney && <FaRupeeSign className="text-lg font-black text-[#1a1f2e]" />}
        <h2 className="text-4xl font-black text-[#1a1f2e] tracking-tighter">{value?.toLocaleString()}</h2>
    </div>
  </div>
);

export default AdminDashboard;