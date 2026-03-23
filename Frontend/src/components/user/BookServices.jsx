import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const BookServices = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [services, setServices] = useState([]);

  const getAllServices = async () => {
    try {
      const findAllServices = await axios.get("/services/all");
      setServices(findAllServices.data.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch services");
    }
  };

  const validationSchema = {
    serviceNameValidate: {
      required: {
        value: true,
        message: "Service is required",
      }
    },
    dateValidate: {
      required: {
        value: true,
        message: "Date is required",
      },
    },
    timeValidate: {
      required: {
        value: true,
        message: "Time is required",
      },
    },
  };

  const submitHandler = async (data) => {
    //   const user=localStorage.getItem("user");
    //   const finalData = {
    //   ...data,
    //   userId: user?._id   // ✅ send userId

    // };

    try {
      // console.log(finalData) // ✅ log finalData before sending
      const res = await axios.post("/bookings/create", data); // ✅ send finalData
      if (res.status == 200) {
        console.log(res.data);
        toast.success("Service booked successfully");
      }
    } catch (error) {
      // res.status(500).json({message:"Failed to book service",error:error.message})
      toast.error("Failed to book service");
      console.log(error);
    }
  };
  useEffect(() => {
    getAllServices();
  }, []);
  return (
    <div>
      <h1>Book Services</h1>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="max-w-md mx-auto mt-8"
      >
        <div className="mb-4">
          <label className="block text-gray-700">Select Service</label>

          {services &&
            services.map((service) => {
              return (
                <div key={service._id}>
                  <input
                    type="checkbox"
                    {...register(
                      "serviceName",
                      validationSchema.serviceNameValidate,
                    )}
                    value={service.serviceName}
                    className="mr-2 leading-tight"
                  />
                  <span>{service.serviceName}</span>

              {errors.serviceName && (
  <p className="text-red-500">{errors.serviceName.message}</p>
)}
                </div>
              );
            })}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Date</label>
          <input
            type="date"
            {...register("date", validationSchema.dateValidate)}
            className="w-full px-3 py-2 border rounded"
          />
         {errors.date && (
  <p className="text-red-500">{errors.date.message}</p>
)}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Time</label>
          <input
            type="time"
            {...register("time", validationSchema.timeValidate)}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.time && (
  <p className="text-red-500">{errors.time.message}</p>
)}
        </div>
        <div className="mb-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Book Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookServices;
