import axios from "axios";
import React, { useEffect, useState } from "react";

const AdminActivityLog = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= FETCH ACTIVITIES =================
  const getActivities = async () => {
    try {
      const res = await axios.get("/activity/all"); // 👈 your API
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

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Activity Logs
        </h1>

        {/* LOADING */}
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : activities.length > 0 ? (

          <div className="space-y-4">

            {activities.map((item) => (
              <div
                key={item._id}
                className="bg-white p-5 rounded-xl shadow border hover:shadow-md transition"
              >

                {/* TOP ROW */}
                <div className="flex justify-between items-center mb-2">

                  <div>
                    <p className="font-bold text-gray-800">
                      {item.userId?.Firstname} {item.userId?.Lastname}
                    </p>
                    <p className="text-xs text-gray-400 uppercase">
                      {item.role}
                    </p>
                  </div>

                  {/* ACTION BADGE */}
                  <span className={`px-3 py-1 text-xs rounded-full font-bold ${
                    item.action === "BOOKING_CREATED"
                      ? "bg-blue-100 text-blue-600"
                      : item.action === "PAYMENT_SUCCESS"
                      ? "bg-green-100 text-green-600"
                      : item.action === "BOOKING_CANCELLED"
                      ? "bg-red-100 text-red-600"
                      : "bg-gray-100 text-gray-600"
                  }`}>
                    {item.action}
                  </span>

                </div>

                {/* MESSAGE */}
                <p className="text-gray-700 mb-2">
                  {item.message}
                </p>

                {/* META */}
                {item.meta?.bookingId && (
                  <p className="text-xs text-gray-500">
                    Booking ID: {item.meta.bookingId}
                  </p>
                )}

                {/* DATE */}
                <p className="text-xs text-gray-400 mt-2">
                  {new Date(item.createdAt).toLocaleString()}
                </p>

              </div>
            ))}

          </div>

        ) : (
          <p className="text-center text-gray-400">
            No activity found
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminActivityLog;