import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiActivity, FiUser, FiClock, FiCheckCircle, FiXCircle, FiPlusCircle, FiDollarSign, FiFilter } from "react-icons/fi";

const AdminActivityLog = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  const getActivities = async () => {
    try {
      const res = await axios.get("/activity/all");
      setActivities(res.data.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getActivities();
  }, []);

  const getActionIcon = (action) => {
    if (action?.includes("CREATED")) return <FiPlusCircle />;
    if (action?.includes("CANCELLED") || action?.includes("FAILED")) return <FiXCircle />;
    if (action?.includes("SUCCESS") || action?.includes("CONFIRMED")) return <FiCheckCircle />;
    if (action?.includes("PAYMENT")) return <FiDollarSign />;
    return <FiActivity />;
  };

  const getActionTheme = (action) => {
    if (action?.includes("CREATED")) return "bg-blue-50 text-blue-600 border-blue-100";
    if (action?.includes("CANCELLED")) return "bg-red-50 text-red-600 border-red-100";
    if (action?.includes("SUCCESS")) return "bg-green-50 text-green-600 border-green-100";
    if (action?.includes("PAYMENT")) return "bg-emerald-50 text-emerald-600 border-emerald-100";
    return "bg-gray-50 text-gray-600 border-gray-100";
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-6">

      {/* ── Page Header ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="flex items-center gap-6">
          <div className="w-14 h-14 bg-[#1a1f2e] rounded-2xl flex items-center justify-center text-[#F59E0B] shadow-xl">
            <FiActivity size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-[#1a1f2e] tracking-tight">System Event Log</h1>
            <p className="text-gray-500 font-medium">Full administrative audit trail for all platform events.</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 text-[10px] font-black uppercase tracking-widest text-gray-400">
          <FiFilter className="text-[#F59E0B]" /> All Events
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-24">
          <div className="animate-spin h-12 w-12 border-4 border-[#F59E0B] border-t-transparent rounded-full shadow-lg"></div>
        </div>
      ) : activities.length === 0 ? (
        <div className="bg-white p-20 rounded-[3rem] text-center border border-dashed border-gray-200">
          <FiActivity size={48} className="mx-auto text-gray-200 mb-6" />
          <h3 className="text-xl font-black text-[#1a1f2e] mb-2">No Events Recorded</h3>
          <p className="text-gray-400 font-medium max-w-xs mx-auto text-sm">Platform events will appear here as users interact with the system.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {activities.map((item) => (
            <div
              key={item._id}
              className="group bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col sm:flex-row sm:items-center gap-6"
            >
              {/* Icon Marker */}
              <div className={`w-14 h-14 shrink-0 rounded-2xl border flex items-center justify-center text-xl transition-all group-hover:scale-110 ${getActionTheme(item.action)} shadow-sm`}>
                {getActionIcon(item.action)}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className="font-black text-[#1a1f2e] text-lg tracking-tight">
                    {item.userId?.Firstname} {item.userId?.Lastname}
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 bg-gray-50 px-3 py-1 rounded-lg border border-gray-100">
                    {item.role}
                  </span>
                  <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg border ${getActionTheme(item.action)}`}>
                    {item.action}
                  </span>
                </div>
                <p className="text-gray-500 font-medium text-sm leading-relaxed">{item.message}</p>
                {item.meta?.bookingId && (
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-2 flex items-center gap-2">
                    <FiActivity className="text-[#F59E0B]" /> Booking Reference: <span className="font-mono text-[#1a1f2e]">{item.meta.bookingId}</span>
                  </p>
                )}
              </div>

              {/* Timestamp */}
              <div className="text-left sm:text-right sm:border-l sm:border-gray-50 sm:pl-8 shrink-0">
                <p className="text-xl font-black text-[#1a1f2e] tracking-tighter">
                  {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                </p>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1 justify-start sm:justify-end">
                  <FiClock className="text-[#F59E0B]" /> {new Date(item.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminActivityLog;