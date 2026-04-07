import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ServiceByCategory = () => {
  const { categoryId } = useParams();  // ✅ must match route
  const [services, setServices] = useState([]);

  const fetchServices = async () => {
    try {
      if (!categoryId) return;  // ✅ prevent undefined API call

      const res = await axios.get(
        `/services/category/${categoryId}`   // ✅ correct URL
      );
       console.log(res.data.data)
      setServices(res.data.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [categoryId]);

  return (
    <div className="p-6">
      <h2>Services</h2>

      {services.length === 0 ? (
        <p>No services found</p>
      ) : (
        services.map((s) => (
          <div key={s._id}>
            <h3>{s.serviceName}</h3>
            <h3>{s.providerId?.Firstname} {s.providerId?.Lastname}</h3>
             <p className="text-sm text-gray-500">{s.description}</p>
              <p className="text-indigo-600 font-bold mt-2">₹{s.price}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ServiceByCategory;