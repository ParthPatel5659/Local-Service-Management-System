import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider";
import { toast } from "react-toastify";
import { FiCalendar, FiClock, FiUser, FiMapPin, FiPhone, FiCheckCircle, FiMoreVertical, FiXCircle } from "react-icons/fi";

const ProviderBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userId, token } = useContext(AuthContext);

  const getBookings = async () => {
    try {
      if (!userId) return;
      setLoading(true);
      const res = await axios.get(`/bookings/provider/${userId}`);
      setBookings(res.data.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBookings();
  }, [userId]);

  const updateStatus = async (id, status) => {
    try {
      const res = await axios.put(
        `/bookings/update/${id}`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.status === 200) {
        toast.success(`Booking ${status}`);
        getBookings();
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Status update failed");
    }
  };

  const statusThemes = {
    Pending: "bg-orange-50 text-orange-600 border-orange-100",
    Accepted: "bg-blue-50 text-blue-600 border-blue-100",
    Completed: "bg-green-50 text-green-600 border-green-100",
    Cancelled: "bg-red-50 text-red-600 border-red-100",
  };

  return (
    <div className="space-y-10">
      
      {/* ── Page Header ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-[#1a1f2e] tracking-tight">Service Requests</h1>
          <p className="text-gray-500 mt-1 font-medium">Review and manage your incoming professional appointments.</p>
        </div>
        <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-xl text-[10px] font-black uppercase text-[#F59E0B] tracking-widest border border-orange-100">
                Active: {bookings.filter(b => b.status === "Pending" || b.status === "Accepted").length}
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl text-[10px] font-black uppercase text-gray-400 tracking-widest border border-gray-100">
                Lifetime: {bookings.length}
            </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#F59E0B] border-t-transparent"></div>
        </div>
      ) : bookings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {bookings.map((booking) => (
            <div 
              key={booking._id} 
              className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group overflow-hidden"
            >
              {/* Card Header */}
              <div className="px-8 py-5 flex justify-between items-center bg-gray-50/30 border-b border-gray-50">
                <span className={`text-[9px] font-black uppercase tracking-[2px] px-3 py-1 rounded-lg border ${statusThemes[booking.status] || "bg-gray-100 text-gray-500"}`}>
                  {booking.status}
                </span>
                <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">#{booking._id.slice(-6)}</span>
              </div>

              {/* Main Info */}
              <div className="p-8 pb-4 flex-grow">
                <h3 className="text-xl font-black text-[#1a1f2e] mb-2 group-hover:text-[#F59E0B] transition-colors line-clamp-1">
                  {booking.serviceId?.[0]?.serviceName || "Premium Service"}
                </h3>
                
                <div className="flex items-center gap-4 py-6">
                    <img 
                        src={`https://ui-avatars.com/api/?name=${booking.userId?.Firstname}+${booking.userId?.Lastname}&background=F59E0B&color=fff&bold=true`} 
                        alt="client" 
                        className="w-14 h-14 rounded-2xl border-4 border-gray-50 shadow-sm"
                    />
                    <div>
                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Requested By</p>
                        <p className="text-base font-black text-[#1a1f2e] leading-tight mt-0.5">{booking.userId?.Firstname} {booking.userId?.Lastname}</p>
                        <div className="flex items-center gap-2 text-gray-400 text-xs mt-1 font-medium">
                            <FiPhone className="text-[#F59E0B]" /> {booking.userId?.phone}
                        </div>
                    </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-gray-50">
                    <div className="flex items-center gap-3 text-sm">
                        <FiCalendar className="text-gray-300" />
                        <span className="font-bold text-[#1a1f2e]">{booking.bookingDate}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                        <FiClock className="text-gray-300" />
                        <span className="font-bold text-[#1a1f2e]">{booking.bookingTime}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                        <FiMapPin className="text-gray-300" />
                        <span className="font-medium text-gray-500 leading-snug">{booking.userId?.address || "On-site Service"}</span>
                    </div>
                </div>
              </div>

              {/* Action Area */}
              {(booking.status === "Pending" || booking.status === "Accepted") && (
                <div className="p-8 pt-4 pb-10">
                  {booking.status === "Pending" && (
                    <div className="flex gap-3">
                        <button
                          onClick={() => updateStatus(booking._id, "Accepted")}
                          className="flex-1 bg-[#F59E0B] hover:bg-[#D97706] text-white font-black py-4 rounded-2xl text-xs uppercase tracking-widest transition-all shadow-lg shadow-orange-100 flex items-center justify-center gap-2"
                        >
                          <FiCheckCircle /> Accept
                        </button>
                        <button
                          onClick={() => updateStatus(booking._id, "Cancelled")}
                          className="p-4 bg-gray-50 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all border border-gray-100"
                        >
                          <FiXCircle size={18} />
                        </button>
                    </div>
                  )}

                  {booking.status === "Accepted" && (
                    <button
                      onClick={() => updateStatus(booking._id, "Completed")}
                      className="w-full bg-[#10b981] hover:bg-[#059669] text-white font-black py-4 rounded-2xl text-xs uppercase tracking-widest transition-all shadow-lg shadow-green-100 flex items-center justify-center gap-2"
                    >
                      <FiCheckCircle /> Mark as Completed
                    </button>
                  )}
                </div>
              )}

              {booking.status === "Completed" && (
                <div className="p-8 pt-0 pb-10 text-center">
                    <div className="p-4 bg-green-50 rounded-2xl border border-green-100">
                        <p className="text-[10px] font-black text-green-600 uppercase tracking-[3px]">Service Finished</p>
                    </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-[3rem] p-24 text-center border border-dashed border-gray-200">
          <div className="w-24 h-24 bg-gray-50 flex items-center justify-center rounded-full text-gray-200 text-5xl mx-auto mb-8 shadow-inner">📅</div>
          <h3 className="text-2xl font-black text-[#1a1f2e]">No Active Requests</h3>
          <p className="text-gray-500 max-w-sm mx-auto mt-2 font-medium">When clients book your professional services, they will appear here for your instant approval.</p>
        </div>
      )}
    </div>
  );
};

export default ProviderBookings;