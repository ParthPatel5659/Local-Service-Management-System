import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  ResponsiveContainer, LineChart, Line
} from "recharts";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [providers, setProviders] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [revenues,setRevenus]=useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [resUsers, resProviders, resBookings,resRevenues] = await Promise.all([
        axios.get("/user/users"),
        axios.get("/user/providers"),
        axios.get("/bookings/all"),
        axios.get("/bookings/revenue")
      ]);

      setUsers(resUsers.data?.data || []);
      setProviders(resProviders.data?.data || []);
      setBookings(resBookings.data?.data || []);
      setRevenus(resRevenues.data?.totalRevenue ||[])
      console.log(resRevenues.data?.totalRevenue );
      
    } catch (error) {
      console.error("Dashboard Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Counts
  const totalUsers = users.length;
  const totalProviders = providers.length;
  const totalBookings = bookings.length;
  const totalRevenues= revenues.length;

  const chartData = [
    { name: "Users", value: totalUsers, color: "#6366f1" },
    { name: "Providers", value: totalProviders, color: "#10b981" },
    { name: "Bookings", value: totalBookings, color: "#f59e0b" },
    { name:"Revenues", value:totalRevenues,color: "#109cb8" }
  ];

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Admin Dashboard</h1>
          <p className="text-slate-500">Real-time overview of your platform's performance.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="relative overflow-hidden bg-gradient-to-br from-indigo-500 to-indigo-700 p-6 rounded-2xl shadow-lg shadow-indigo-200 transition-transform hover:scale-[1.02]">
            <p className="text-indigo-100 font-semibold uppercase text-xs tracking-wider">Total Users</p>
            <h2 className="text-4xl font-black text-white mt-2">{totalUsers}</h2>
            <div className="absolute -right-4 -bottom-4 opacity-20 text-white transform rotate-12">
               <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 015.25-2.094z" /></svg>
            </div>
          </div>

          <div className="relative overflow-hidden bg-gradient-to-br from-emerald-500 to-emerald-700 p-6 rounded-2xl shadow-lg shadow-emerald-200 transition-transform hover:scale-[1.02]">
            <p className="text-emerald-100 font-semibold uppercase text-xs tracking-wider">Providers</p>
            <h2 className="text-4xl font-black text-white mt-2">{totalProviders}</h2>
            <div className="absolute -right-4 -bottom-4 opacity-20 text-white transform rotate-12">
               <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57a8.991 8.991 0 01-1.655.106l-1.134-.089a8.99 8.99 0 01-4.211-1.478v4.881l1.134.089c.753.059 1.488.243 2.164.542V17h-9v-3.414c.676-.299 1.411-.483 2.164-.542l1.134-.089V8.013A8.99 8.99 0 016.345 9.49l-1.134.09A8.991 8.991 0 013.558 9.48V8a2 2 0 012-2h2zM9 5V6h2V5a1 1 0 00-1-1H9a1 1 0 00-1 1z" clipRule="evenodd" /></svg>
            </div>
          </div>

          <div className="relative overflow-hidden bg-gradient-to-br from-amber-500 to-amber-700 p-6 rounded-2xl shadow-lg shadow-amber-200 transition-transform hover:scale-[1.02]">
            <p className="text-amber-100 font-semibold uppercase text-xs tracking-wider">Bookings</p>
            <h2 className="text-4xl font-black text-white mt-2">{totalBookings}</h2>
            <div className="absolute -right-4 -bottom-4 opacity-20 text-white transform rotate-12">
               <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 20 20"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" /><path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" /></svg>
            </div>
          </div>

           <div className="relative overflow-hidden bg-gradient-to-br from-amber-500 to-amber-700 p-6 rounded-2xl shadow-lg shadow-amber-200 transition-transform hover:scale-[1.02]">
            <p className="text-amber-100 font-semibold uppercase text-xs tracking-wider">Revenues</p>
            <h2 className="text-4xl font-black text-white mt-2">{totalRevenues}</h2>
            <div className="absolute -right-4 -bottom-4 opacity-20 text-white transform rotate-12">
               <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 20 20"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" /><path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" /></svg>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Distribution Pie */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800 mb-6">User Distribution</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie 
                    data={chartData} 
                    innerRadius={60} 
                    outerRadius={100} 
                    paddingAngle={5} 
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Comparison Bar */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800 mb-6">Entity Comparison</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '15px' }} />
                  <Bar dataKey="value" fill="#6366f1" radius={[10, 10, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Full Width Line Chart */}
          <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800 mb-6">Platform Growth Overview</h2>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: '15px' }} />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#6366f1" 
                    strokeWidth={4} 
                    dot={{ r: 6, fill: '#6366f1', strokeWidth: 3, stroke: '#fff' }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;