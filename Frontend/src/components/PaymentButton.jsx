import axios from "axios";
import { toast } from "react-toastify";

const loadRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";

    script.onload = () => {
      resolve(true);
    };

    script.onerror = () => {
      resolve(false);
    };

    document.body.appendChild(script);
  });
};

const PaymentButton = ({ booking }) => {

  const handlePayment = async () => {

    // ✅ Load Razorpay SDK
    const res = await loadRazorpay();

    if (!res) {
      alert("Razorpay SDK failed to load ❌");
      return;
    }

    try {
      // ✅ Create order from backend
      const { data } = await axios.post("/payment/create-order", {
        amount: booking.amount
      });

      const options = {
        key: "YOUR_KEY_ID",
        amount: data.order.amount,
        currency: "INR",
        name: "Service Booking",
        description: "Booking Payment",
        order_id: data.order.id,

        handler: async function (response) {

          // ✅ Verify Payment
          await axios.post("/payment/verify", {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,

            bookingId: booking._id,
            userId: booking.userId,
            providerId: booking.providerId,
            amount: booking.amount,
            paymentMethod: "UPI"
          });

          toast.success("Payment Successful ✅");
        },

        prefill: {
          name: "User",
          email: "user@gmail.com"
        },

        theme: {
          color: "#6366f1"
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

    } catch (error) {
      console.log(error);
      toast.error("Payment Failed ❌");
    }
  };

  return (
    <button
      onClick={handlePayment}
      className="bg-indigo-600 text-white px-4 py-2 rounded"
    >
      Pay Now
    </button>
  );
};

export default PaymentButton;