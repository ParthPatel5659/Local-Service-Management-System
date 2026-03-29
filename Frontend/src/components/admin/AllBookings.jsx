import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiSearch, FiEye, FiList } from "react-icons/fi";

const statusStyles = {
  pending:   { bg: "#fffbeb", text: "#b45309",  dot: "#f59e0b" },
  confirmed: { bg: "#eff6ff", text: "#1d4ed8",  dot: "#3b82f6" },
  completed: { bg: "#f0fdf4", text: "#16a34a",  dot: "#22c55e" },
  cancelled: { bg: "#fef2f2", text: "#dc2626",  dot: "#ef4444" },
};

const paymentStyles = {
  paid:     { bg: "#f0fdf4", text: "#16a34a" },
  unpaid:   { bg: "#fef2f2", text: "#dc2626" },
  pending:  { bg: "#fffbeb", text: "#b45309" },
  refunded: { bg: "#f5f3ff", text: "#7c3aed" },
};

const FILTERS = ["All", "Pending", "Confirmed", "Completed", "Cancelled"];

const Badge = ({ label, styleMap }) => {
  const key = label?.toLowerCase();
  const s = styleMap[key] || { bg: "#f1f5f9", text: "#64748b", dot: "#94a3b8" };
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold capitalize whitespace-nowrap"
      style={{ background: s.bg, color: s.text }}
    >
      {s.dot && <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: s.dot }} />}
      {label || "—"}
    </span>
  );
};

const AllBookings = () => {
  const [search, setSearch]   = useState("");
  const [filter, setFilter]   = useState("All");
  const [bookings, setBookings] = useState([]);

  const getAllBooking = async () => {
    try {
      const res = await axios.get("/bookings/all");
      console.log(res.data.data);
      
      setBookings(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => { getAllBooking(); }, []);

  // Flatten booking + service into rows
  const rows = bookings.flatMap((booking, bIdx) =>
    (booking.serviceId || []).map((service, sIdx) => ({
      bookingId: `BK${String(bIdx + 1).padStart(3, "0")}`,
      _bookingRef: booking._id,
      customer: booking.userId
        ? `${booking.userId.Firstname || ""} ${booking.userId.Lastname || ""}`.trim()
        : "—",
      provider: service.providerId
        ? `${service.providerId.Firstname || ""} ${service.providerId.Lastname || ""}`.trim()
        : "—",
      serviceName: service.serviceName || "—",
      date: booking.bookingDate
        ? new Date(booking.bookingDate).toLocaleDateString("en-CA")
        : "—",
      time: booking.bookingTime || "—",
      amount: service.price ? `₹${service.price}` : "—",
      status: booking.status || "pending",
      paymentStatus: booking.paymentStatus || "pending",
    }))
  );

  const filtered = rows.filter((r) => {
    const matchFilter = filter === "All" || r.status.toLowerCase() === filter.toLowerCase();
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      r.bookingId.toLowerCase().includes(q) ||
      r.customer.toLowerCase().includes(q) ||
      r.provider.toLowerCase().includes(q) ||
      r.serviceName.toLowerCase().includes(q);
    return matchFilter && matchSearch;
  });

  return (
    <div
      className="min-h-screen p-6"
      style={{
        background: "linear-gradient(160deg, #f0f4ff 0%, #f8fafc 60%, #fff 100%)",
        fontFamily: "'Plus Jakarta Sans', 'Nunito', sans-serif",
      }}
    >
      {/* Page Header */}
      <div className="flex items-center gap-2 mb-6">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
        >
          <FiList className="text-white" size={15} />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight leading-none" style={{ color: "#1e293b" }}>
            All Bookings
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">{bookings.length} total bookings</p>
        </div>
      </div>

      {/* Toolbar: Search + Filter Tabs */}
      <div className="flex flex-wrap items-center gap-3 mb-5">
        {/* Search */}
        <div className="relative">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
          <input
            type="text"
            placeholder="Search bookings..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2.5 rounded-xl text-sm placeholder-slate-400 outline-none focus:ring-2 focus:ring-indigo-300 transition-all duration-150 w-64"
            style={{ background: "#fff", border: "1px solid #dde3f0", color: "#334155", boxShadow: "0 1px 4px rgba(99,102,241,0.06)" }}
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 flex-wrap">
          {FILTERS.map((f) => {
            const active = filter === f;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-150"
                style={
                  active
                    ? { background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff", boxShadow: "0 4px 12px rgba(99,102,241,0.30)" }
                    : { background: "#fff", color: "#64748b", border: "1px solid #dde3f0" }
                }
              >
                {f}
              </button>
            );
          })}
        </div>
      </div>

      {/* Table Card */}
      <div
        className="bg-white rounded-2xl overflow-hidden"
        style={{ border: "1px solid #e8edf5", boxShadow: "0 2px 12px rgba(99,102,241,0.07)" }}
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px]">
            {/* Head */}
            <thead>
              <tr style={{ borderBottom: "1px solid #eef1f8", background: "#f8fafc" }}>
                {["Booking ID", "Customer", "Provider", "Service", "Date & Time", "Amount", "Status", "Payment", "Actions"].map((h) => (
                  <th
                    key={h}
                    className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider"
                    style={{ color: "#64748b" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-16">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: "#eef1f8" }}>
                        <FiList className="text-indigo-300" size={22} />
                      </div>
                      <p className="text-sm text-slate-400 font-medium">No bookings found</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((row, i) => (
                  <tr
                    key={`${row._bookingRef}-${i}`}
                    className="transition-colors duration-150"
                    style={{ borderBottom: "1px solid #f1f5f9" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#f8f9ff")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    {/* Booking ID */}
                    <td className="px-5 py-4">
                      <span className="text-sm font-bold" style={{ color: "#6366f1" }}>
                        {row.bookingId}
                      </span>
                    </td>

                    {/* Customer */}
                    <td className="px-5 py-4">
                      <span className="text-sm font-semibold" style={{ color: "#1e293b" }}>
                        {row.customer}
                      </span>
                    </td>

                    {/* Provider */}
                    <td className="px-5 py-4">
                      <span className="text-sm" style={{ color: "#475569" }}>
                        {row.provider}
                      </span>
                    </td>

                    {/* Service */}
                    <td className="px-5 py-4">
                      <span className="text-sm" style={{ color: "#94a3b8" }}>
                        {row.serviceName}
                      </span>
                    </td>

                    {/* Date & Time */}
                    <td className="px-5 py-4">
                      <p className="text-sm" style={{ color: "#334155" }}>{row.date}</p>
                      <p className="text-xs text-slate-400">{row.time}</p>
                    </td>

                    {/* Amount */}
                    <td className="px-5 py-4">
                      <span className="text-sm font-bold" style={{ color: "#1e293b" }}>
                        {row.amount}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <Badge label={row.status} styleMap={statusStyles} />
                    </td>

                    {/* Payment */}
                    <td className="px-5 py-4">
                      <Badge label={row.paymentStatus} styleMap={paymentStyles} />
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">
                      <button
                        className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-150 hover:scale-110"
                        style={{ background: "#eef1f8", color: "#6366f1" }}
                        title="View Details"
                      >
                        <FiEye size={14} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer count */}
        {filtered.length > 0 && (
          <div
            className="px-5 py-3 flex items-center justify-between"
            style={{ borderTop: "1px solid #eef1f8", background: "#f8fafc" }}
          >
            <p className="text-xs text-slate-400">
              Showing <span className="font-semibold text-slate-600">{filtered.length}</span> of{" "}
              <span className="font-semibold text-slate-600">{rows.length}</span> bookings
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBookings;