import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider";

const ProviderReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userId } = useContext(AuthContext);

  const getReviews = async () => {
    try {
      const res = await axios.get(`/reviews/provider/${userId}`);
      setReviews(res.data.data);
    } catch (error) {
      console.log("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      getReviews();
    }
  }, [userId]);

  // Helper function to render stars
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <span key={i} className={i < rating ? "text-yellow-400" : "text-gray-300"}>
        ★
      </span>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8 border-b pb-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">Client Reviews</h1>
            <p className="text-gray-500 mt-1">See what users are saying about your services</p>
          </div>
          <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">
            Total: {reviews?.length || 0}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : reviews?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((r) => (
              <div 
                key={r._id} 
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
              >
                {/* User Info Header */}
                <div className="flex items-center space-x-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-lg">
                    {r.userId?.Firstname?.charAt(0)}{r.userId?.Lastname?.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">
                      {r.userId?.Firstname} {r.userId?.Lastname}
                    </h3>
                    <p className="text-xs text-blue-600 font-medium uppercase tracking-wider">
                      {r.serviceId?.serviceName || "General Service"}
                    </p>
                  </div>
                </div>

                {/* Rating Stars */}
                <div className="flex mb-3 text-xl">
                  {renderStars(r.rating)}
                </div>

                {/* Comment */}
                <div className="bg-gray-50 p-4 rounded-lg italic text-gray-600 relative">
                  <span className="text-4xl text-gray-200 absolute top-0 left-2">“</span>
                  <p className="relative z-10 pl-4">{r.comment || "No comment provided."}</p>
                </div>

                {/* Date (Optional - adds professionalism) */}
                <div className="mt-4 text-right text-xs text-gray-400">
                   Verified Review
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl shadow-inner border-2 border-dashed border-gray-200">
            <div className="text-5xl mb-4 text-gray-300">💬</div>
            <p className="text-gray-500 text-lg font-medium">No reviews found yet.</p>
            <p className="text-gray-400 text-sm">Reviews will appear here once customers rate your service.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProviderReviews;