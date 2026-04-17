import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import PaymentButton from "../PaymentButton";
import { FiCalendar, FiClock, FiTool, FiCreditCard, FiXCircle, FiCheckCircle, FiMoreHorizontal } from "react-icons/fi";
import { FaRupeeSign } from "react-icons/fa";

const MyBookings = () => {
  const { userId } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('All');

  const getBookings = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/bookings/user/${userId}`);
      setBookings(res.data.data || []);
    } catch (error) {
      console.log("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (bookingId) => {
    try {
      if (!window.confirm("Are you sure you want to cancel this booking?")) return;
      const res = await axios.put(`/bookings/cancel/${bookingId}`);
      if (res.status === 200) {
        toast.success("Booking cancelled successfully");
        getBookings();
      }
    } catch (error) {
      toast.error("Cancellation failed");
    }
  };

  useEffect(() => {
    if (userId) getBookings();
  }, [userId]);

  const statusColors = {
    Pending: "bg-orange-50 text-orange-600 border-orange-100",
    Accepted: "bg-blue-50 text-blue-600 border-blue-100",
    Completed: "bg-green-50 text-green-600 border-green-100",
    Cancelled: "bg-red-50 text-red-600 border-red-100",
  };

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      
      {/* ── Page Header ── */}
      <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-[#1a1f2e] tracking-tight">My Bookings</h1>
          <p className="text-gray-500 mt-1 font-medium">Manage and track your service history</p>
        </div>
        <div className="flex bg-white p-1 rounded-xl border border-gray-100 shadow-sm">
            {['All', 'Active', 'Completed'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                    tab === activeTab
                      ? 'bg-[#F59E0B] text-white shadow-lg shadow-orange-100'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                    {tab}
                </button>
            ))}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-[#F59E0B] border-t-transparent"></div>
        </div>
      ) : bookings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bookings
            .filter((booking) => {
              if (activeTab === 'All') return true;
              if (activeTab === 'Active') return booking.status === 'Pending' || booking.status === 'Accepted';
              if (activeTab === 'Completed') return booking.status === 'Completed' || booking.status === 'Cancelled';
              return true;
            })
            .map((booking) => {
            const service = booking.serviceId?.[0];
            return (
              <div key={booking._id} className="bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group overflow-hidden">
                
                {/* Card Header (Status & ID) */}
                <div className="px-6 py-4 flex justify-between items-center bg-gray-50/50 border-b border-gray-50">
                  <span className={`text-[9px] uppercase font-black px-3 py-1 rounded-full border tracking-widest ${statusColors[booking.status] || "bg-gray-100 text-gray-500"}`}>
                    {booking.status}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">ID #{booking._id.slice(-6)}</span>
                    <button className="text-gray-300 hover:text-gray-600"><FiMoreHorizontal /></button>
                  </div>
                </div>

                <div className="p-8 flex-grow">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-orange-50 flex items-center justify-center rounded-2xl text-[#F59E0B] text-xl font-black shadow-sm">
                        {service?.serviceName?.charAt(0) || "S"}
                    </div>
                    <div>
                        <h3 className="font-black text-[#1a1f2e] group-hover:text-[#F59E0B] transition-colors line-clamp-1">{service?.serviceName || "Local Service"}</h3>
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                            With {service?.providerId?.Firstname} {service?.providerId?.Lastname}
                        </p>
                    </div>
                  </div>

                  <div className="space-y-4 pt-6 border-t border-gray-50">
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-3">
                            <FiCalendar className="text-gray-300" />
                            <div>
                                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Date</p>
                                <p className="font-bold text-[#1a1f2e]">{booking.bookingDate}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <FiClock className="text-gray-300" />
                            <div>
                                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Time</p>
                                <p className="font-bold text-[#1a1f2e]">{booking.bookingTime}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-4">
                        <div className="flex items-center gap-3">
                            <FiCreditCard className="text-gray-300" />
                            <div>
                                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Amount</p>
                                <p className="font-black text-[#1a1f2e] flex items-center"><FaRupeeSign size={13} className="mr-0.5" />{booking.totalAmount?.toLocaleString()}</p>
                            </div>
                        </div>
                        <div className="text-right">
                             <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Payment</p>
                             <span className={`text-[11px] font-black uppercase tracking-wider ${booking.paymentStatus === "Paid" ? "text-green-600" : "text-red-500"}`}>
                                {booking.paymentStatus}
                             </span>
                        </div>
                    </div>
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="p-6 pt-0 mt-auto">
                    {booking.status === "Completed" && booking.paymentStatus === "Unpaid" && (
                        <div className="mb-3">
                            <PaymentButton booking={booking} onSuccess={getBookings} />
                        </div>
                    )}

                    {booking.status !== "Cancelled" && booking.status !== "Completed" && (
                        <button
                          onClick={() => cancelBooking(booking._id)}
                          className="w-full flex items-center justify-center gap-2 py-3.5 bg-white border border-red-100 text-red-500 hover:bg-red-50 rounded-2xl text-xs font-black uppercase tracking-widest transition-all"
                        >
                          <FiXCircle /> Cancel Booking
                        </button>
                    )}

                    {booking.status === "Completed" && booking.paymentStatus === "Paid" && (
                        <Link
                          to={`/user/add-review/${service?._id}/${service?.providerId?._id}`}
                          className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#F59E0B] text-white hover:bg-[#D97706] rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-orange-100"
                        >
                          <FiCheckCircle /> Write a Review
                        </Link>
                    )}

                    {booking.status === "Cancelled" && (
                        <div className="py-4 text-center border-t border-gray-50">
                            <p className="text-[10px] font-bold text-gray-300 uppercase tracking-[3px]">Service Cancelled</p>
                        </div>
                    )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[3rem] border border-dashed border-gray-200">
          <div className="w-24 h-24 bg-gray-50 flex items-center justify-center rounded-full text-gray-200 text-5xl mb-6">📅</div>
          <h3 className="text-2xl font-black text-[#1a1f2e]">No Bookings Yet</h3>
          <p className="text-gray-500 mt-2 font-medium max-w-sm text-center">You haven't booked any professional services on LocalServ yet. Start exploring now!</p>
          <Link to="/user/services" className="mt-8 px-10 py-4 bg-[#F59E0B] text-white rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-orange-100 hover:bg-[#D97706] active:scale-[0.98] transition-all">
            Browse Services
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyBookings;