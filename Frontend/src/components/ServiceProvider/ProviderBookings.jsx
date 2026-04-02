import axios from "axios";

import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider";

const ProviderBookings = () => {
  const [bookings, setBookings] = useState([]);
const {userId,token}=useContext(AuthContext)



  // 🔹 Fetch provider bookings
  const getBookings = async () => {
    try {
      // ✅ safety check
      if (!userId) {
        console.log("Provider ID not found");
        return;
      }

      const res = await axios.get(
        `/bookings/provider/${userId}`,
      );

      console.log(res.data.data);
      setBookings(res.data.data);

    } catch (error) {
      console.log("Error fetching bookings:", error);
    }
  };

  useEffect(() => {
    getBookings();
  }, []);

  // 🔹 Update booking status
  const updateStatus = async (id, status) => {
    try {
      const res = await axios.put(
        `/bookings/update/${id}`,
        { status }, // ✅ FIX (match backend field)
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ FIX
          },
        }
      );

      if (res.status === 200) {
        getBookings();
      }
    } catch (error) {
      console.log("Error updating status:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Bookings</h1>

      <div className="grid grid-cols-3 gap-4">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <div key={booking._id} className="border p-4 rounded shadow">

              {/* User */}
              <p>
                <b>User:</b> {booking.userId?.Firstname} {booking.userId?.Lastname}
              </p>

              {/* Service */}
              <p>
                <b>Service:</b> {booking.serviceId?.[0]?.serviceName}
              </p>

              {/* Date & Time */}
              <p>Date: {booking.bookingDate}</p>
              <p>Time: {booking.bookingTime}</p>

              {/* Status */}
              <p>
                Status:{" "}
                <span
                  className={`font-bold ${
                    booking.status === "Pending"
                      ? "text-yellow-500"
                      : booking.status === "Accepted"
                      ? "text-blue-500"
                      : "text-green-500"
                  }`}
                >
                  {booking.status}
                </span>
              </p>

              {/* Actions */}
              <div className="mt-3 flex gap-2">

                {booking.status === "Pending" && (
                  <button
                    onClick={() =>
                      updateStatus(booking._id, "Accepted")
                    }
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Accept
                  </button>
                )}

                {booking.status === "Accepted" && (
                  <button
                    onClick={() =>
                      updateStatus(booking._id, "Completed")
                    }
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    Complete
                  </button>
                )}

              </div>

            </div>
          ))
        ) : (
          <p>No bookings found</p>
        )}
      </div>
    </div>
  );
};

export default ProviderBookings;