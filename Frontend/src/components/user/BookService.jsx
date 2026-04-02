// BookService.jsx

import axios from "axios";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import { toast } from "react-toastify";
import { AuthContext } from "../../AuthProvider";

const BookService = () => {
  const { serviceId,id} = useParams(); // serviceId
  const {  userId } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const submitHandler = async (data) => {
    try {
      const res = await axios.post( `/bookings/create/${userId}`,
       
        {
          serviceId: id,
          bookingDate: data.date,
          bookingTime: data.time
        }
      );
 console.log(data);
      if (res.status === 201) {
        toast.success("Booking successful");
      }

    } catch (error) {
      toast.error("Booking failed");
      console.log(error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 border rounded shadow mt-8">
      <h1 className="text-xl font-bold mb-4">Book Service</h1>

      <form onSubmit={handleSubmit(submitHandler)}>

        {/*serviceid*/ }
        <input type="hidden" value={serviceId} {...register('serviceId')} />

        {/* Date */}
        <input
          type="date"
          {...register("date", { required: "Date required" })}
          className="w-full p-2 border mb-2"
        />
        <p className="text-red-500">{errors.date?.message}</p>

        {/* Time */}
        <input
          type="time"
          {...register("time", { required: "Time required" })}
          className="w-full p-2 border mb-2"
        />
        <p className="text-red-500">{errors.time?.message}</p>

        <button className="bg-blue-500 text-white px-4 py-2 rounded w-full" type="submit">
          Confirm Booking
        </button>

      </form>
    </div>
  );
};

export default BookService;