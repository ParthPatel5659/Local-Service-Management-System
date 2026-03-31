import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../AuthProvider";

export const AllServicesofprovider = () => {
  const {userId} = useContext(AuthContext)
  const [search, setSearch] = useState("");
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(`/services/my-services/${userId}`);

        setServices(res.data.data || []);
      } catch (error) {
        console.log("Error fetching services:", error);
        setServices([]);
      }
    };

    if (userId) {
      fetchServices();
    }
  }, [userId]);

  const filteredServices = services.filter((service) =>
    service.serviceName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1>All Services</h1>

      <div style={{ marginBottom: "10px" }}>
        <label>Search:</label>
        <input
          type="text"
          placeholder="Search service..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginLeft: "10px", padding: "5px" }}
        />
      </div>

      <Link to="/provider/addservice">
        <button style={{ marginBottom: "15px" }}>Add Service</button>
      </Link>

      {filteredServices?.length > 0 ? (
        filteredServices.map((service) => (
          <div
            key={service._id}
            style={{
              border: "1px solid black",
              margin: "10px",
              padding: "10px",
            }}
          >
            <h3>Service Name: {service.serviceName}</h3>
            <p>Description: {service.description}</p>
            <p>Price: ₹{service.price}</p>
            <p>Location: {service.location}</p>

            <p>
              Category: {service.categoryId?.categoryName || "No Category"}
            </p>

            <p>
              Provider: {service.providerId?.Firstname} {service.providerId?.Lastname}
            </p>

            <p>
              Availability: {service.availability ? "Available" : "Not Available"}
            </p>
          </div>
        ))
      ) : (
        <p>No services found</p>
      )}
    </div>
  );
};