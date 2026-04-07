import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../AuthProvider";

const BookService = () => {
  const { id } = useParams(); // serviceId
  const { userId } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serviceData, setServiceData] = useState(null); // Store full service object

  const { register, handleSubmit, formState: { errors } } = useForm();

  const fetchService = async () => {
    try {
      const res = await axios.get(`/services/service/${id}`);
      setServiceData(res.data.data); // Assuming data includes price and providerId
    } catch (err) {
      toast.error("Failed to load service");
    }
  };

  useEffect(() => {
    fetchService();
  }, [id]);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const openRazorpay = async (bookingId) => {
    const res = await loadRazorpayScript();
    if (!res) {
      toast.error("Razorpay failed to load");
      return;
    }

    try {
      // 1. Create Order - Send price in RUPEES (backend handles * 100)
      const orderRes = await axios.post("/payments/create-order", {
        amount: serviceData.price 
      });

      const { order } = orderRes.data;

      const options = {
        key: "rzp_test_SaWFv36h2JVnYU", 
        amount: order.amount,
        currency: order.currency,
        name: "Service Booking",
        description: "Payment for " + serviceData.serviceName,
        order_id: order.id,
        handler: async function (response) {
          try {
            // 2. Verify Payment - Match your backend verifyPayment expectations
            const verifyRes = await axios.post("/payments/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              bookingId: bookingId,
              userId: userId,
              providerId: serviceData.providerId, // Ensure your service object has this
              amount: serviceData.price,
              paymentMethod: "Razorpay Online"
            });

            if (verifyRes.data.success) {
              toast.success("Payment Successful 🎉");
              navigate("/user/my-bookings");
            }
          } catch (err) {
            toast.error("Payment verification failed ❌");
          }
        },
        theme: { color: "#6366f1" }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

    } catch (err) {
      toast.error("Payment initialization failed ❌");
    }
  };

  const submitHandler = async (data) => {
    try {
      setIsSubmitting(true);

      // 1. Create Booking
      const res = await axios.post(`/bookings/create/${userId}`, {
        serviceId: id,
        bookingDate: data.date,
        bookingTime: data.time
      });

      if (res.status === 201) {
        toast.success("Booking Created! Redirecting to payment...");
        // 2. Start Razorpay flow with the new booking ID
        await openRazorpay(res.data.data._id);
      }
    } catch (error) {
      toast.error("Booking failed ❌");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <form onSubmit={handleSubmit(submitHandler)} className="bg-white p-6 rounded-xl shadow w-96 space-y-4">
        <h2 className="text-xl font-bold text-center">Book Service</h2>
        
        <div className="text-center text-lg font-bold text-green-600">
          ₹ {serviceData?.price || 0}
        </div>

        <input type="date" {...register("date", { required: "Date required" })} className="w-full border p-2 rounded" />
        {errors.date && <p className="text-red-500 text-xs">{errors.date.message}</p>}

        <input type="time" {...register("time", { required: "Time required" })} className="w-full border p-2 rounded" />
        {errors.time && <p className="text-red-500 text-xs">{errors.time.message}</p>}

        <button type="submit" disabled={isSubmitting || !serviceData} className="w-full bg-indigo-600 text-white py-2 rounded">
          {isSubmitting ? "Processing..." : "Pay Now"}
        </button>
      </form>
    </div>
  );
};

export default BookService;