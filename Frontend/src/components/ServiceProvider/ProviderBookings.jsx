import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider";
import { toast } from "react-toastify";

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

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Booking Requests</h1>
            <p className="text-gray-500 text-sm mt-1">Manage your service appointments and schedules</p>
          </div>
          <div className="flex gap-2">
            <span className="bg-white px-3 py-1 rounded-lg border text-xs font-medium text-gray-600 shadow-sm">
              Pending: {bookings.filter(b => b.status === "Pending").length}
            </span>
            <span className="bg-white px-3 py-1 rounded-lg border text-xs font-medium text-gray-600 shadow-sm">
              Total: {bookings.length}
            </span>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : bookings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.map((booking) => (
              <div 
                key={booking._id} 
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col"
              >
                {/* Top Status Bar */}
                <div className={`h-2 w-full ${
                  booking.status === "Pending" ? "bg-yellow-400" : 
                  booking.status === "Accepted" ? "bg-blue-500" : "bg-green-500"
                }`} />

                <div className="p-6 flex-grow">
                  {/* Service & Status */}
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-bold text-gray-800 line-clamp-1">
                      {booking.serviceId?.[0]?.serviceName || "Service Request"}
                    </h3>
                    <span className={`text-[10px] uppercase font-black px-2 py-1 rounded ${
                      booking.status === "Pending" ? "bg-yellow-100 text-yellow-700" : 
                      booking.status === "Accepted" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"
                    }`}>
                      {booking.status}
                    </span>
                  </div>

                  {/* Client Info */}
                  <div className="flex items-center space-x-3 mb-6 bg-gray-50 p-3 rounded-xl">
                    <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                      {booking.userId?.Firstname?.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase">Client</p>
                      <p className="text-sm font-semibold text-gray-700">
                        {booking.userId?.Firstname} {booking.userId?.Lastname}
                      </p>
                    </div>
                  </div>

                  {/* Date & Time */}
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-gray-600 text-sm">
                      <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      {booking.bookingDate}
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      {booking.bookingTime}
                    </div>
                  </div>
                </div>

                {/* Actions Footer */}
                {(booking.status === "Pending" || booking.status === "Accepted") && (
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                    {booking.status === "Pending" && (
                      <button
                        onClick={() => updateStatus(booking._id, "Accepted")}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition-colors shadow-sm"
                      >
                        Accept Booking
                      </button>
                    )}

                    {booking.status === "Accepted" && (
                      <button
                        onClick={() => updateStatus(booking._id, "Completed")}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-lg transition-colors shadow-sm"
                      >
                        Mark as Completed
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-16 text-center shadow-sm border border-dashed border-gray-300">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-xl font-bold text-gray-800">No Bookings Yet</h3>
            <p className="text-gray-500 max-w-xs mx-auto mt-2">When clients book your services, they will appear here for your approval.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProviderBookings;