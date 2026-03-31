import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider";

const ProviderPayments = () => {
  const { userId } = useContext(AuthContext)
  const [payments, setPayments] = useState([]);


//   const user = JSON.parse(localStorage.getItem("user"));
  

  // 🔹 Fetch payments
  const getPayments = async () => {
    try {
      const res = await axios.get(
        `/payments/provider/${userId}`);

      setPayments(res.data.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPayments();
  }, [userId]);

  // 🔹 Update status
  const updateStatus = async (id) => {
    try {
      await axios.put(
        `/payments/update/${id}`,
        { paymentStatus: "Completed" },
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