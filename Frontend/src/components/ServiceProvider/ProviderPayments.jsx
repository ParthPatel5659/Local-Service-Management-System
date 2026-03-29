import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";

const ProviderPayments = () => {
  const [payments, setPayments] = useState([]);

//   const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const decode = jwtDecode(token)
        console.log("Decoded user:", decode)

  const providerId = decode.id;

  // 🔹 Fetch payments
  const getPayments = async () => {
    try {
      const res = await axios.get(
        `/payments/provider/${providerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPayments(res.data.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPayments();
  }, []);

  // 🔹 Update status
  const updateStatus = async (id) => {
    try {
      await axios.put(
        `/payments/update/${id}`,
        { paymentStatus: "Completed" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      getPayments();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Payments</h1>

      <div className="grid grid-cols-3 gap-4">
        {payments.map((payment) => (
          <div key={payment._id} className="border p-4 rounded">

            <p><b>User:</b> {payment.userId?.Firstname} {payment.userId?.Lastname}</p>
            <p><b>Amount:</b> ₹{payment.amount}</p>
            <p><b>Method:</b> {payment.paymentMethod}</p>

            <p>
              Status:{" "}
              <span className={
                payment.paymentStatus === "Pending"
                  ? "text-yellow-500"
                  : "text-green-500"
              }>
                {payment.paymentStatus}
              </span>
            </p>

            {payment.paymentStatus === "Pending" && (
              <button
                onClick={() => updateStatus(payment._id)}
                className="bg-green-500 text-white px-3 py-1 mt-2 rounded"
              >
                Mark as Paid
              </button>
            )}

          </div>
        ))}
      </div>
    </div>
  );
};

export default ProviderPayments;