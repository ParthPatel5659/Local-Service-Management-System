import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider";
import { FiActivity, FiClock, FiCheckCircle, FiXCircle, FiPlusCircle, FiDollarSign, FiStar, FiFilter } from "react-icons/fi";

const UserActivity = () => {
  const { userId } = useContext(AuthContext);

  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  const getActivities = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/activity/user/${userId}`);
      console.log("Fetched activities:", res.data.data);
      setActivities(res.data.data || []);
    } catch (error) {
      console.log("Error fetching activity:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      getActivities();
    }
  }, [userId]);

  const getActionIcon = (action) => {
    if (action.includes("Created")) return <FiPlusCircle />;
    if (action.includes("Cancelled") || action.includes("Failed")) return <FiXCircle />;
    if (action.includes("Success") || action.includes("Confirmed")) return <FiCheckCircle />;
    if (action.includes("Payment")) return <FiDollarSign />;
    if (action.includes("Review")) return <FiStar />;
    return <FiActivity />;
  };

  const getActionTheme = (action) => {
    if (action.includes("Created")) return "bg-blue-50 text-blue-600 border-blue-100";
    if (action.includes("Cancelled")) return "bg-red-50 text-red-600 border-red-100";
    if (action.includes("Success")) return "bg-green-50 text-green-600 border-green-100";
    if (action.includes("Review")) return "bg-purple-50 text-purple-600 border-purple-100";
    return "bg-gray-50 text-gray-600 border-gray-100";
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      
      {/* ── Page Header ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="flex items-center gap-6">
            <div className="w-14 h-14 bg-[#1a1f2e] rounded-2xl flex items-center justify-center text-[#F59E0B] shadow-xl">
                <FiActivity size={28} />
            </div>
            <div>
                <h1 className="text-3xl font-black text-[#1a1f2e] tracking-tight">Personal Timeline</h1>
                <p className="text-gray-500 font-medium">Chronological audit of your platform engagements.</p>
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
            <h3 className="text-xl font-black text-[#1a1f2e] mb-2">No Engagements Yet</h3>
            <p className="text-gray-400 font-medium max-w-xs mx-auto text-sm">Your activity history will materialize here as you engage with the platform.</p>
        </div>
      ) : (
        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-7 top-0 bottom-0 w-1 bg-gradient-to-b from-gray-100 via-gray-100 to-transparent rounded-full opacity-50 hidden sm:block"></div>

          <div className="space-y-6">
            {activities.map((item) => (
              <div
                key={item._id}
                className="group relative flex flex-col sm:flex-row sm:items-center gap-6 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1"
              >
                {/* Visual Marker */}
                <div className={`w-14 h-14 shrink-0 rounded-2xl border flex items-center justify-center text-xl transition-all group-hover:scale-110 ${getActionTheme(item.action)} shadow-sm z-10`}>
                  {getActionIcon(item.action)}
                </div>

                {/* Content */}
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                        <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg border ${getActionTheme(item.action)}`}>
                            {item.action}
                        </span>
                        <div className="flex items-center gap-2 text-[10px] font-black text-gray-300 uppercase tracking-widest">
                            <FiClock className="text-[#F59E0B]" /> {new Date(item.createdAt).toLocaleDateString()}
                        </div>
                    </div>
                    <p className="font-bold text-[#1a1f2e] text-lg tracking-tight mb-1">{item.message}</p>
                    <p className="text-gray-400 text-sm font-medium italic opacity-70">Event signature confirmed by platform monitoring.</p>
                </div>

                {/* Right / Time Details */}
                <div className="text-left sm:text-right pt-4 sm:pt-0 sm:border-l sm:border-gray-50 sm:pl-8">
                    <p className="text-xl font-black text-[#1a1f2e] tracking-tighter">
                        {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                    </p>
                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Global Timestamp</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserActivity;