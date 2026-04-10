// pages/ServiceDetails.jsx

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MapPin, Tag, User, Star, Phone, Mail, CheckCircle, XCircle } from "lucide-react"; // npm install lucide-react

const ServiceDetails = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const getService = async () => {
    try {
      const res = await axios.get(`/services/service/${id}`);
      setService(res.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getReviews = async () => {
    try {
      const res = await axios.get(`/reviews/service/${id}`);
      setReviews(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getService();
    getReviews();
  }, [id]);

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin h-10 w-10 border-4 border-indigo-600 border-t-transparent rounded-full"></div>
    </div>
  );

  if (!service) return <div className="text-center py-20 text-gray-500">Service not found.</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT: Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-3xl font-extrabold text-gray-900 leading-tight">
                {service.serviceName}
              </h1>
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 ${
                service.availability ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              }`}>
                {service.availability ? <CheckCircle size={14} /> : <XCircle size={14} />}
                {service.availability ? "Available" : "Full"}
              </span>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-6">
              <span className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-lg">
                <MapPin size={16} /> {service.location}
              </span>
              <span className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-lg">
                <Tag size={16} /> {service.categoryId?.categoryName}
              </span>
            </div>

            <h3 className="text-lg font-bold text-gray-800 mb-2">About this service</h3>
            <p className="text-gray-600 leading-relaxed">
              {service.description}
            </p>
          </div>

          {/* Provider Card (Mobile friendly) */}
          <div className="bg-indigo-50 p-6 rounded-3xl border border-indigo-100">
            <h2 className="text-lg font-bold text-indigo-900 mb-4 flex items-center gap-2">
              <User size={20} /> Provider Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-white p-2 rounded-lg shadow-sm">
                  <User className="text-indigo-600" size={18} />
                </div>
                <p className="font-semibold text-gray-800">
                  {service.providerId?.Firstname} {service.providerId?.Lastname}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-white p-2 rounded-lg shadow-sm">
                  <Mail className="text-indigo-600" size={18} />
                </div>
                <p className="text-gray-600 text-sm">{service.providerId?.email}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-white p-2 rounded-lg shadow-sm">
                  <Phone className="text-indigo-600" size={18} />
                </div>
                <p className="text-gray-600 text-sm">{service.providerId?.phone}</p>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Star className="text-yellow-500 fill-yellow-500" size={22} /> 
              Reviews ({reviews.length})
            </h2>

            {reviews.length > 0 ? (
              <div className="space-y-4">
                {reviews.map((r) => (
                  <div key={r._id} className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-gray-800">{r.userId?.Firstname}</span>
                      <div className="flex text-yellow-500">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} fill={i < r.rating ? "currentColor" : "none"} />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{r.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                 <p className="text-gray-400">No reviews yet. Be the first to book!</p>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: Booking Action Card (Sticky) */}
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 sticky top-10">
            <p className="text-gray-500 text-sm font-medium uppercase tracking-widest mb-1">Price</p>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-extrabold text-gray-900">₹{service.price}</span>
              <span className="text-gray-500">/service</span>
            </div>

            <Link to={`/user/bookservices/${service._id}`} className="block">
              <button 
                className={`w-full py-4 rounded-2xl font-bold text-lg transition-all shadow-lg ${
                  service.availability 
                    ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200" 
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
                disabled={!service.availability}
              >
                {service.availability ? "Book Service Now" : "Currently Unavailable"}
              </button>
            </Link>

            <ul className="mt-6 space-y-3 text-sm text-gray-500">
              <li className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-500" /> Secure payment processing
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-500" /> Verified service provider
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ServiceDetails;