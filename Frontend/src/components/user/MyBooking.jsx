import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider";
import { Link } from "react-router-dom";

const MyBookings = () => {
  const { userId } = useContext(AuthContext); // ✅ FIX
  const [bookings, setBookings] = useState([]);

  const getBookings = async () => {
    try {
      const res = await axios.get(`/bookings/user/${userId}`);
      console.log(res.data.data);

      setBookings(res.data.data || []);
    } catch (error) {
      console.log("Error fetching bookings:", error);
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
            const service = booking.serviceId?.[0]; // ✅ FIX ARRAY

            return (
              <div
                key={booking._id}
                className="border p-4 rounded shadow"
              >
                {/* Service */}
                <p>
                  <b>Service:</b> {service?.serviceName || "N/A"}
                </p>

                {/* Provider */}
                <p>
                  <b>Provider:</b>{" "}
                  {service?.providerId?.Firstname || ""}{" "}
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
                        : "text-green-500"
                    }`}
                  >
                    {booking.status === "Completed" && (
                        <Link to={`/user/add-review/${service._id}/${service.providerId._id}`}>Add Review</Link>
                    )}
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