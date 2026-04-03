import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider";
import { Link } from "react-router-dom";

const MyBookings = () => {
  const { userId } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);

  // ✅ Fetch bookings
  const getBookings = async () => {
    try {
      const res = await axios.get(`/bookings/user/${userId}`);
      setBookings(res.data.data || []);
    } catch (error) {
      console.log("Error fetching bookings:", error);
    }
  };

  // ✅ Cancel booking
  const cancelBooking = async (bookingId) => {
    try {
      if (!window.confirm("Are you sure you want to cancel?")) return;

      const res = await axios.put(`/bookings/cancel/${bookingId}`);

      if (res.status === 200) {
        alert("Booking cancelled successfully");
        getBookings(); // refresh
      }
    } catch (error) {
      console.log(error);
      alert("Cancel failed");
    }
  };

  useEffect(() => {
    if (userId) {
      getBookings();
    }
  }, [userId]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Bookings</h1>

      <div className="grid grid-cols-3 gap-4">
        {bookings.length > 0 ? (
          bookings.map((booking) => {
            const service = booking.serviceId?.[0];

            return (
              <div key={booking._id} className="border p-4 rounded shadow">
                {/* Service */}
                <p>
                  <b>Service:</b> {service?.serviceName || "N/A"}
                </p>

                {/* Provider */}
                <p>
                  <b>Provider:</b> {service?.providerId?.Firstname || ""}{" "}
                  {service?.providerId?.Lastname || ""}
                </p>

                {/* Date & Time */}
                <p>Date: {booking.bookingDate}</p>
                <p>Time: {booking.bookingTime}</p>

                {/* Status */}
                <p>
                  Status:{" "}
                  <span
                    className={`font-bold ${
                      booking.status === "pending"
                        ? "text-yellow-500"
                        : booking.status === "accepted"
                          ? "text-blue-500"
                          : booking.status === "Completed"
                            ? "text-green-500"
                            : "text-red-500"
                    }`}
                  >
                    {booking.status}
                  </span>
                </p>

                {/* Payment */}
                <p>
                  Payment:{" "}
                  <span
                    className={`font-bold ${
                      booking.paymentStatus === "Unpaid"
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {booking.paymentStatus}
                  </span>
                </p>

                {/* ✅ Cancel Button */}
                {booking.status !== "Cancelled" &&
                  booking.status !== "Completed" && (
                    <button
                      onClick={() => cancelBooking(booking._id)}
                      className="mt-2 bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Cancel Booking
                    </button>
                  )}

                {/* ✅ Add Review (SAFE FIX) */}
                {booking.status === "Completed" &&
                  service?._id &&
                  service?.providerId?._id && (
                    <Link
                      to={`/user/add-review/${service._id}/${service.providerId._id}`}
                      className="block mt-2 text-blue-500 underline"
                    >
                      Add Review
                    </Link>
                  )}
              </div>
            );
          })
        ) : (
          <p>No bookings found</p>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
