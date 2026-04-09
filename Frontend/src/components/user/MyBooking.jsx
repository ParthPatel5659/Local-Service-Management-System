// import axios from "axios";
// import React, { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../../AuthProvider";
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";

// const MyBookings = () => {
//   const { userId } = useContext(AuthContext);
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // ✅ Fetch bookings
//   const getBookings = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(`/bookings/user/${userId}`);
//       setBookings(res.data.data || []);
//     } catch (error) {
//       console.log("Error fetching bookings:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Cancel booking
//   const cancelBooking = async (bookingId) => {
//     try {
//       if (!window.confirm("Are you sure you want to cancel this booking?")) return;

//       const res = await axios.put(`/bookings/cancel/${bookingId}`);

//       if (res.status === 200) {
//         toast.success("Booking cancelled successfully");
//         getBookings(); // refresh
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Cancellation failed");
//     }
//   };

//   useEffect(() => {
//     if (userId) {
//       getBookings();
//     }
//   }, [userId]);

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-6xl mx-auto">
        
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
//           <p className="text-gray-500 mt-1">Track your service requests and history</p>
//         </div>

//         {loading ? (
//           <div className="flex justify-center py-20">
//             <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
//           </div>
//         ) : bookings.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {bookings.map((booking) => {
//               const service = booking.serviceId?.[0];
              
//               // Status Styling logic
//               const statusColors = {
//                 pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
//                 accepted: "bg-blue-100 text-blue-700 border-blue-200",
//                 Completed: "bg-green-100 text-green-700 border-green-200",
//                 Cancelled: "bg-red-100 text-red-700 border-red-200",
//               };

//               return (
//                 <div key={booking._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
                  
//                   {/* Status Ribbon */}
//                   <div className="px-4 py-2 flex justify-between items-center border-b border-gray-50 bg-gray-50/50">
//                     <span className={`text-[10px] uppercase font-black px-2 py-0.5 rounded-full border ${statusColors[booking.status] || "bg-gray-100 text-gray-600"}`}>
//                       {booking.status}
//                     </span>
//                     <span className="text-xs text-gray-400 font-medium">ID: #{booking._id.slice(-6)}</span>
//                   </div>

//                   <div className="p-6 flex-grow">
//                     {/* Service Name */}
//                     <h3 className="text-lg font-bold text-gray-800 mb-1 line-clamp-1">
//                       {service?.serviceName || "Unknown Service"}
//                     </h3>
                    
//                     {/* Provider Name */}
//                     <p className="text-sm text-blue-600 font-medium mb-4">
//                       By {service?.providerId?.Firstname} {service?.providerId?.Lastname}
//                     </p>

//                     {/* Details Grid */}
//                     <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-dashed border-gray-100">
//                       <div>
//                         <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Date</p>
//                         <p className="text-sm font-semibold text-gray-700">{booking.bookingDate}</p>
//                       </div>
//                       <div>
//                         <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Time</p>
//                         <p className="text-sm font-semibold text-gray-700">{booking.bookingTime}</p>
//                       </div>
//                     </div>

//                     {/* Payment Status */}
//                     <div className="mt-4 flex items-center justify-between">
//                       <p className="text-sm text-gray-500">Payment Status:</p>
//                       <span className={`text-sm font-bold ${booking.paymentStatus === "Unpaid" ? "text-red-500" : "text-green-600"}`}>
//                         {booking.paymentStatus}
//                       </span>
//                     </div>
//                   </div>

//                   {/* Actions Footer */}
//                   <div className="p-4 bg-gray-50 border-t border-gray-100">
//                     {booking.status !== "Cancelled" && booking.status !== "Completed" && (
//                       <button
//                         onClick={() => cancelBooking(booking._id)}
//                         className="w-full bg-white border border-red-200 text-red-600 hover:bg-red-50 py-2 rounded-xl text-sm font-bold transition-colors"
//                       >
//                         Cancel Booking
//                       </button>
//                     )}

//                     {booking.status === "Completed" && service?._id && (
//                       <Link
//                         to={`/user/add-review/${service._id}/${service.providerId?._id}`}
//                         className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl text-sm font-bold shadow-sm transition-all"
//                       >
//                         Write a Review
//                       </Link>
//                     )}
                    
//                     {(booking.status === "Cancelled") && (
//                       <p className="text-center text-xs text-gray-400 italic py-2">No further actions available</p>
//                     )}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         ) : (
//           <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200 shadow-inner">
//             <div className="text-6xl mb-4">📭</div>
//             <h3 className="text-xl font-bold text-gray-800">No Bookings Found</h3>
//             <p className="text-gray-500 mt-2">You haven't booked any services yet.</p>
//             <Link to="/" className="mt-6 inline-block bg-blue-600 text-white px-6 py-2 rounded-full font-bold hover:bg-blue-700 transition-colors">
//               Explore Services
//             </Link>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MyBookings;



import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import PaymentButton from "../PaymentButton"; // ✅ IMPORT

const MyBookings = () => {
  const { userId } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= FETCH BOOKINGS =================
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

  // ================= CANCEL BOOKING =================
  const cancelBooking = async (bookingId) => {
    try {
      if (!window.confirm("Are you sure you want to cancel this booking?")) return;

      const res = await axios.put(`/bookings/cancel/${bookingId}`);

      if (res.status === 200) {
        toast.success("Booking cancelled successfully");
        getBookings(); // refresh
      }
    } catch (error) {
      console.error(error);
      toast.error("Cancellation failed");
    }
  };

  useEffect(() => {
    if (userId) {
      getBookings();
    }
  }, [userId]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
          <p className="text-gray-500 mt-1">
            Track your service requests and history
          </p>
        </div>

        {/* LOADING */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
          </div>
        ) : bookings.length > 0 ? (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {bookings.map((booking) => {
              const service = booking.serviceId?.[0];

              const statusColors = {
                Pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
                Accepted: "bg-blue-100 text-blue-700 border-blue-200",
                Completed: "bg-green-100 text-green-700 border-green-200",
                Cancelled: "bg-red-100 text-red-700 border-red-200",
              };

              return (
                <div
                  key={booking._id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition flex flex-col"
                >

                  {/* STATUS */}
                  <div className="px-4 py-2 flex justify-between items-center border-b bg-gray-50">
                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${statusColors[booking.status]}`}>
                      {booking.status}
                    </span>
                    <span className="text-xs text-gray-400">
                      #{booking._id.slice(-6)}
                    </span>
                  </div>

                  {/* BODY */}
                  <div className="p-6 flex-grow">

                    <h3 className="text-lg font-bold text-gray-800">
                      {service?.serviceName || "Unknown Service"}
                    </h3>

                    <p className="text-sm text-blue-600 mb-3">
                      By {service?.providerId?.Firstname}{" "}
                      {service?.providerId?.Lastname}
                    </p>

                    <div className="grid grid-cols-2 gap-4 py-3 border-t border-b">
                      <div>
                        <p className="text-xs text-gray-400">Date</p>
                        <p className="font-semibold">{booking.bookingDate}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Time</p>
                        <p className="font-semibold">{booking.bookingTime}</p>
                      </div>
                    </div>

                    <div className="mt-3 flex justify-between">
                      <p className="text-sm text-gray-500">Payment:</p>
                      <span
                        className={`font-bold ${
                          booking.paymentStatus === "Paid"
                            ? "text-green-600"
                            : "text-red-500"
                        }`}
                      >
                        {booking.paymentStatus}
                      </span>
                    </div>

                    <div className="mt-2 flex justify-between">
                      <p className="text-sm text-gray-500">Amount:</p>
                      <span className="font-bold text-gray-800">
                        ₹{booking.totalAmount}
                      </span>
                    </div>
                  </div>

                  {/* ACTIONS */}
                  <div className="p-4 bg-gray-50 border-t">

                    {/* 💳 PAY NOW (RAZORPAY) */}
                    {booking.status === "Completed" &&
                      booking.paymentStatus === "Unpaid" && (
                        <PaymentButton
                          booking={booking}
                          onSuccess={getBookings} // ✅ refresh after payment
                        />
                      )}

                    {/* ❌ CANCEL */}
                    {booking.status !== "Cancelled" &&
                      booking.status !== "Completed" && (
                        <button
                          onClick={() => cancelBooking(booking._id)}
                          className="w-full border border-red-300 text-red-600 py-2 rounded-xl font-bold mt-2"
                        >
                          Cancel Booking
                        </button>
                      )}

                    {/* ⭐ REVIEW */}
                    {booking.status === "Completed" &&
                      booking.paymentStatus === "Paid" && (
                        <Link
                          to={`/user/add-review/${service?._id}/${service?.providerId?._id}`}
                          className="block text-center bg-blue-600 text-white py-2 rounded-xl font-bold mt-2"
                        >
                          Write Review
                        </Link>
                      )}

                    {/* 🚫 CANCELLED */}
                    {booking.status === "Cancelled" && (
                      <p className="text-center text-xs text-gray-400">
                        No further actions
                      </p>
                    )}

                  </div>
                </div>
              );
            })}
          </div>

        ) : (
          <div className="text-center py-20">
            <h3 className="text-xl font-bold">No Bookings Found</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;