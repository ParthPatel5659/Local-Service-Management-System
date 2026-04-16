import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiActivity, FiUser, FiClock, FiCheckCircle, FiXCircle, FiPlusCircle, FiDollarSign } from "react-icons/fi";

const ActivityLog = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  const getActivities = async () => {
    try {
      setLoading(true);
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
    switch(action) {
        case "BOOKING_CREATED": return <FiPlusCircle />;
        case "PAYMENT_SUCCESS": return <FiDollarSign />;
        case "BOOKING_CANCELLED": return <FiXCircle />;
        case "BOOKING_COMPLETED": return <FiCheckCircle />;
        default: return <FiActivity />;
    }
  };

  const getActionColor = (action) => {
    switch(action) {
        case "BOOKING_CREATED": return "bg-blue-50 text-blue-600 border-blue-100";
        case "PAYMENT_SUCCESS": return "bg-green-50 text-green-600 border-green-100";
        case "BOOKING_CANCELLED": return "bg-red-50 text-red-600 border-red-100";
        case "BOOKING_COMPLETED": return "bg-emerald-50 text-emerald-600 border-emerald-100";
        default: return "bg-gray-50 text-gray-500 border-gray-100";
    }
  };

  return (
    <div className="space-y-10">
      
      {/* ── Page Header ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-[#1a1f2e] tracking-tight">System Audit Log</h1>
          <p className="text-gray-500 mt-1 font-medium">Monitoring all operational events across the LocalServ network.</p>
        </div>
        <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 px-4 py-2 bg-[#1a1f2e] rounded-xl text-[10px] font-black uppercase text-white tracking-widest border border-white/10">
                <FiActivity /> Live Audit
            </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
            <div className="animate-spin h-10 w-10 border-4 border-[#F59E0B] border-t-transparent rounded-full"></div>
        </div>
      ) : activities.length > 0 ? (
        <div className="space-y-4 relative before:absolute before:left-8 before:top-4 before:bottom-4 before:w-px before:bg-gray-100">
          {activities.map((item) => (
            <div key={item._id} className="relative pl-16 group">
                {/* Timeline Node */}
                <div className={`absolute left-5 top-8 -translate-y-1/2 w-6 h-6 rounded-full border-4 border-white shadow-sm transition-transform group-hover:scale-125 z-10 ${
                    item.action === "BOOKING_CANCELLED" ? "bg-red-500" :
                    item.action === "PAYMENT_SUCCESS" ? "bg-green-500" : "bg-[#F59E0B]"
                }`}></div>

                {/* Log Card */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-xl text-gray-300 group-hover:bg-orange-50 group-hover:text-[#F59E0B] transition-colors border border-gray-50">
                                <FiUser />
                            </div>
                            <div>
                                <p className="text-sm font-black text-[#1a1f2e]">
                                    {item.userId?.Firstname || "Anonymous"} {item.userId?.Lastname || ""}
                                </p>
                                <span className="text-[10px] font-black text-[#F59E0B] uppercase tracking-widest">{item.role || 'Member'}</span>
                            </div>
                        </div>

                        <div className={`flex items-center gap-2 px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border ${getActionColor(item.action)}`}>
                            {getActionIcon(item.action)} {item.action?.replace(/_/g, ' ')}
                        </div>
                    </div>

                    <p className="text-gray-600 font-medium leading-relaxed mb-6 bg-gray-50/50 p-4 rounded-2xl border border-gray-50 italic">
                        "{item.message}"
                    </p>

                    <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-gray-50">
                        {item.meta?.bookingId && (
                            <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                <span className="text-blue-500">ID:</span> {item.meta.bookingId.slice(-8).toUpperCase()}
                            </div>
                        )}
                        <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest ml-auto">
                            <FiClock className="text-[#F59E0B]" /> {new Date(item.createdAt).toLocaleString("en-US", { hour: '2-digit', minute: '2-digit', day: '2-digit', month: 'short' })}
                        </div>
                    </div>
                </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-[3rem] p-24 text-center border border-dashed border-gray-200">
          <div className="w-24 h-24 bg-gray-50 flex items-center justify-center rounded-full text-gray-200 text-5xl mx-auto mb-8 shadow-inner">📜</div>
          <h3 className="text-2xl font-black text-[#1a1f2e]">Log Empty</h3>
          <p className="text-gray-500 max-w-sm mx-auto mt-2 font-medium">Audit data will appear here as users and professionals interact with the platform.</p>
        </div>
      )}
    </div>
  );
};

export default ActivityLog;