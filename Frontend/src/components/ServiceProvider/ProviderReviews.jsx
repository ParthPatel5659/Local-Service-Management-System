import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider";

const ProviderReviews = () => {
  const [reviews, setReviews] = useState([]);
  const { userId } = useContext(AuthContext);


  const getReviews = async () => {
    try {
      const res = await axios.get(`/reviews/provider/${userId}`);

      setReviews(res.data.data);
    } catch (error) {
      console.log("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      getReviews();
    }
  }, [userId]);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">My Reviews</h1>

      {reviews?.length > 0 ? (
        reviews.map((r) => (
          <div key={r._id} className="border p-3 mb-3 rounded">
            <p><b>User:</b> {r.userId?.Firstname} {r.userId?.Lastname}</p>
            <p><b>Service:</b> {r.serviceId?.serviceName}</p>
            <p>⭐ {r.rating}</p>
            <p>{r.comment}</p>
          </div>
        ))
      ) : (
        <p>No reviews found</p>
      )}
    </div>
  );
};

export default ProviderReviews;