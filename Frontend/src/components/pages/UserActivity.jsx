import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider";

const UserActivity = () => {
  const { userId } = useContext(AuthContext);

  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= FETCH ACTIVITY =================
  const getActivities = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/activity/user/${userId}`);
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

  // ================= UI =================
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <h1 className="text-2xl font-bold mb-6">📊 My Activity</h1>

        {/* LOADING */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin h-10 w-10 border-b-2 border-blue-600 rounded-full"></div>
          </div>
        ) : activities.length === 0 ? (

          /* EMPTY STATE */
          <div className="bg-white p-10 rounded-xl text-center shadow">
            <p className="text-gray-500">No activity found</p>
          </div>

        ) : (

          /* ACTIVITY LIST */
          <div className="space-y-4">
            {activities.map((item) => {

              // 🎨 Dynamic Colors
              const colorMap = {
                "Booking Created": "bg-blue-100 text-blue-700",
                "Booking Cancelled": "bg-red-100 text-red-700",
                "Payment Success": "bg-green-100 text-green-700",
                "Review Added": "bg-purple-100 text-purple-700",
              };

              return (
                <div
                  key={item._id}
                  className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
                >

                  {/* LEFT */}
                  <div>
                    <p className="font-semibold text-gray-800">
                      {item.action}
                    </p>
                    <p className="text-sm text-gray-500">
                      {item.description}
                    </p>
                  </div>

                  {/* RIGHT */}
                  <div className="text-right">
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        colorMap[item.action] || "bg-gray-100"
                      }`}
                    >
                      {item.action}
                    </span>

                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(item.createdAt).toLocaleString()}
                    </p>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserActivity;