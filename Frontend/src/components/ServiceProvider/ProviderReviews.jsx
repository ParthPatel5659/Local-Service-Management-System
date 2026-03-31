import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";

const ProviderReviews = () => {
  const [reviews, setReviews] = useState([]);

//   const user = JSON.parse(localStorage.getItem("user"));
const token = localStorage.getItem("token");
  const decode = jwtDecode(token)
        console.log("Decoded user:", decode)

  const providerId = decode.id;
//   const providerId = user?._id;

  const getReviews = async () => {
    const res = await axios.get(`/reviews/provider/${providerId}`);
    console.log(res.data.data);
    
    setReviews(res.data.data);
  };

  useEffect(() => {
    getReviews();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">My Reviews</h1>

      {reviews.map((r) => (
        <div key={r._id} className="border p-3 mb-3 rounded">
          <p><b>User:</b> {r.userId?.Firstname} {r.userId?.Lastname}</p>
          <p><b>Service:</b> {r.serviceId?.serviceName}</p>
          <p>⭐ {r.rating}</p>
          <p>{r.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default ProviderReviews;