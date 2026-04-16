import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiSearch, FiEye, FiActivity, FiFilter, FiCalendar, FiClock } from "react-icons/fi";
import { FaRupeeSign } from "react-icons/fa";

const AllBookings = () => {
  const [search, setSearch]   = useState("");
  const [filter, setFilter]   = useState("All");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllBooking = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/bookings/all");
      setBookings(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { getAllBooking(); }, []);

  const FILTERS = ["All", "Pending", "Accepted", "Completed", "Cancelled"];

  const statusThemes = {
    Pending: "bg-orange-50 text-orange-600 border-orange-100",
    Accepted: "bg-blue-50 text-blue-600 border-blue-100",
    Completed: "bg-green-50 text-green-600 border-green-100",
    Cancelled: "bg-red-50 text-red-600 border-red-100",
  };

  const paymentThemes = {
    Paid: "bg-green-50 text-green-600 border-green-100",
    Unpaid: "bg-red-50 text-red-600 border-red-100",
  };

  const rows = bookings.flatMap((booking, bIdx) =>
    (booking.serviceId || []).map((service, sIdx) => ({
      _id: booking._id,
      displayId: booking._id.slice(-6).toUpperCase(),
      customer: `${booking.userId?.Firstname || ""} ${booking.userId?.Lastname || ""}`.trim(),
      customerEmail: booking.userId?.email,
      provider: `${service.providerId?.Firstname || ""} ${service.providerId?.Lastname || ""}`.trim(),
      serviceName: service.serviceName || "—",
      date: booking.bookingDate || "—",
      time: booking.bookingTime || "—",
      amount: booking.totalAmount || 0,
      status: booking.status || "Pending",
      paymentStatus: booking.paymentStatus || "Unpaid",
    }))
  );

  const filtered = rows.filter((r) => {
    const matchFilter = filter === "All" || r.status.toLowerCase() === filter.toLowerCase();
    const q = search.toLowerCase();
    return matchFilter && (
        r.displayId.toLowerCase().includes(q) ||
        r.customer.toLowerCase().includes(q) ||
        r.serviceName.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-10">
      
      {/* ── Page Header ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-[#1a1f2e] tracking-tight">Booking Inventory</h1>
          <p className="text-gray-500 mt-1 font-medium">Global tracking of all service appointments and revenue flow.</p>
        </div>
        <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-xl text-[10px] font-black uppercase text-blue-600 tracking-widest border border-blue-100">
                <FiActivity /> Live Ledger
            </div>
        </div>
      </div>

      {/* ── Toolbar ── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="relative flex-1 max-w-xl">
            <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
                type="text"
                placeholder="Search by ID, customer or service..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-14 pr-6 py-4 rounded-2xl bg-white border border-gray-100 shadow-sm focus:ring-4 focus:ring-orange-50 focus:border-[#F59E0B] outline-none transition-all font-bold text-[#1a1f2e] placeholder-gray-300"
            />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 lg:pb-0">
            {FILTERS.map((f) => (
                <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap border ${
                        filter === f ? "bg-[#F59E0B] text-white border-[#F59E0B] shadow-lg shadow-orange-100" : "bg-white text-gray-400 border-gray-100 hover:border-orange-200 hover:text-orange-500"
                    }`}
                >
                    {f}
                </button>
            ))}
        </div>
      </div>

      {/* ── Bookings Table ── */}
      <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-50">
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[2px]">ID</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[2px]">Client / Service</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[2px]">Provider</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[2px]">Schedule</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[2px]">Revenue</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[2px]">Status</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[2px] text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                    <td colSpan={7} className="py-20 text-center">
                        <div className="animate-spin h-8 w-8 border-4 border-[#F59E0B] border-t-transparent rounded-full mx-auto"></div>
                    </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                    <td colSpan={7} className="py-20 text-center">
                        <p className="text-gray-400 font-bold">No matching records found.</p>
                    </td>
                </tr>
              ) : (
                filtered.map((row) => (
                  <tr key={row._id + row.serviceName} className="group hover:bg-gray-50/30 transition-all">
                    <td className="px-8 py-6">
                      <span className="text-xs font-black text-[#1a1f2e] bg-[#f9fafb] px-3 py-1.5 rounded-lg border border-gray-100">#{row.displayId}</span>
                    </td>
                    <td className="px-8 py-6">
                      <div>
                        <p className="text-sm font-black text-[#1a1f2e]">{row.customer}</p>
                        <p className="text-[11px] font-bold text-[#F59E0B] uppercase tracking-wider mt-1">{row.serviceName}</p>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                        <div className="flex items-center gap-3">
                            <img 
                                src={`https://ui-avatars.com/api/?name=${row.provider}&background=f9fafb&color=1a1f2e&bold=true`} 
                                alt="pro" 
                                className="w-8 h-8 rounded-lg shadow-sm"
                            />
                            <span className="text-xs font-bold text-gray-500">{row.provider}</span>
                        </div>
                    </td>
                    <td className="px-8 py-6">
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2 text-xs font-bold text-[#1a1f2e]">
                                <FiCalendar className="text-gray-300" /> {row.date}
                            </div>
                            <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400">
                                <FiClock className="text-gray-300" /> {row.time}
                            </div>
                        </div>
                    </td>
                    <td className="px-8 py-6">
                        <div className="flex flex-col gap-1">
                            <p className="text-sm font-black text-[#1a1f2e] flex items-center"><FaRupeeSign size={13} className="mr-0.5" />{row.amount?.toLocaleString()}</p>
                            <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-md border self-start ${paymentThemes[row.paymentStatus] || "bg-gray-100 text-gray-400"}`}>
                                {row.paymentStatus}
                            </span>
                        </div>
                    </td>
                    <td className="px-8 py-6">
                        <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-lg border ${statusThemes[row.status] || "bg-gray-100"}`}>
                            {row.status}
                        </span>
                    </td>
                    <td className="px-8 py-6 text-center">
                        <button className="p-3 bg-gray-50 text-gray-400 hover:bg-[#1a1f2e] hover:text-white rounded-xl transition-all shadow-sm border border-gray-100">
                            <FiEye size={16} />
                        </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Table Footer */}
        <div className="px-8 py-6 bg-gray-50/50 flex items-center justify-between border-t border-gray-50">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                Showing <span className="text-[#1a1f2e]">{filtered.length}</span> results out of total <span className="text-[#1a1f2e]">{rows.length}</span>
            </p>
            <div className="flex gap-2">
                <button className="px-4 py-2 bg-white border border-gray-100 rounded-lg text-xs font-black text-gray-400 disabled:opacity-50" disabled tabIndex="-1">PREV</button>
                <button className="px-4 py-2 bg-white border border-gray-100 rounded-lg text-xs font-black text-gray-400 disabled:opacity-50" disabled tabIndex="-1">NEXT</button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AllBookings;