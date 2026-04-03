import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../AuthProvider";
import { toast } from "react-toastify";

export const AllServicesofprovider = () => {
  const { userId } = useContext(AuthContext);
  const [search, setSearch] = useState("");
  const [services, setServices] = useState([]);

  // ✅ Fetch services
  const fetchServices = async () => {
    try {
      const res = await axios.get(`/services/my-services/${userId}`);
      setServices(res.data.data || []);
    } catch (error) {
      console.log("Error fetching services:", error);
      setServices([]);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchServices();
    }
  }, [userId]);

  // ✅ Delete Service
  const deleteService = async (serviceId) => {
    try {
      if (!window.confirm("Are you sure to delete?")) return;

      await axios.delete(`/services/delete/${serviceId}`);
      toast.success("Service deleted");

      fetchServices(); // refresh
    } catch (error) {
      console.log(error);
    }
  };

  // ✅ Toggle Availability
  const toggleAvailability = async (serviceId) => {
    try {
      await axios.put(`/services/avalbility/${serviceId}`);
      fetchServices(); // refresh
    } catch (error) {
      console.log(error);
    }
  };

  // ✅ Search filter
  const filteredServices = services.filter((service) =>
    service.serviceName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1>All Services</h1>

      {/* Search */}
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

      {/* Add Service */}
      <Link to="/provider/addservice">
        <button style={{ marginBottom: "15px" }}>Add Service</button>
      </Link>

      {/* Service List */}
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
              Provider: {service.providerId?.Firstname}{" "}
              {service.providerId?.Lastname}
            </p>

            {/* ✅ Availability */}
            <p>
              Availability:{" "}
              <span
                style={{
                  color: service.availability ? "green" : "red",
                  fontWeight: "bold",
                }}
              >
                {service.availability ? "Available" : "Not Available"}
              </span>
            </p>

            {/* ✅ ACTION BUTTONS */}
            <div style={{ marginTop: "10px" }}>
              
              {/* Edit */}
              <Link to={`/provider/edit-service/${service._id}`}>
                <button>Edit</button>
              </Link>

              {/* Toggle Availability */}
              <button
                onClick={() => toggleAvailability(service._id)}
                style={{ marginLeft: "10px" }}
              >
                {service.availability ? "Disable" : "Enable"}
              </button>

              {/* Delete */}
              <button
                onClick={() => deleteService(service._id)}
                style={{ marginLeft: "10px", color: "red" }}
              >
                Delete
              </button>

            </div>
          </div>
        ))
      ) : (
        <p>No services found</p>
      )}
    </div>
  );
};