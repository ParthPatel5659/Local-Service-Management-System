// pages/ServiceDetails.jsx

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const ServiceDetails = () => {
  const { id } = useParams();

  const [service, setService] = useState(null);
  const [reviews, setReviews] = useState([]);

  // 🔹 Fetch Service
  const getService = async () => {
    try {
      const res = await axios.get(`/services/service/${id}`);
      console.log(res.data.data);
      
      setService(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // 🔹 Fetch Reviews
  const getReviews = async () => {
    try {
      const res = await axios.get(`/reviews/service/${id}`);
      setReviews(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getService();
    getReviews();
  }, [id]);

  if (!service) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-3">
        {service.serviceName}
      </h1>

      <p className="text-gray-600 mb-2">
        {service.description}
      </p>

      <p className="text-lg font-semibold">
        Price: ₹{service.price}
      </p>

      <p>Location: {service.location}</p>
      <p>Category: {service.categoryId?.categoryName}</p>

      {/* Provider */}
      <div className="mt-4 p-3 border rounded">
        <h2 className="font-bold">Provider Info</h2>
        <p>
          {service.providerId?.Firstname}{" "}
          {service.providerId?.Lastname}
        </p>
        <p>{service.providerId?.email}</p>
        <p>{service.providerId?.phone}</p>
      </div>

      {/* Book Button */}
      <Link to={`/user/bookservices/${service._id}`}>
        <button className="bg-blue-500 text-white px-4 py-2 mt-4 rounded" disabled={!service.availability}>
           {service.availability ? "Book Now" : "Unavailable"}
        </button>
      </Link>

      {/* Reviews */}
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-2">Reviews</h2>

        {reviews.length > 0 ? (
          reviews.map((r) => (
            <div key={r._id} className="border p-2 mb-2 rounded">
              <p>
                <b>{r.userId?.Firstname}</b>
              </p>
              <p>⭐ {r.rating}</p>
              <p>{r.comment}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet</p>
        )}
      </div>

    </div>
  );
};

export default ServiceDetails;