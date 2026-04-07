import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider";
import { toast } from "react-toastify";

const ProviderPayments = () => {
  const { userId } = useContext(AuthContext);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const getPayments = async () => {
    if (!userId) return;
    try {
      setLoading(true);
      const res = await axios.get(`/payments/provider/${userId}`);
      setPayments(res.data.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch payments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPayments();
  }, [userId]);

  const updateStatus = async (id) => {
    try {
      const res = await axios.put(`/payments/update/${id}`, {
        paymentStatus: "Completed",
      });
      if (res.status === 200) {
        toast.success("Payment marked as completed");
        getPayments();
      }
    } catch (error) {
      console.error(error);
      toast.error("Status update failed");
    }
  };

  // Calculate totals
  const totalEarnings = payments
    .filter((p) => p.paymentStatus === "Completed")
    .reduce((sum, p) => sum + Number(p.amount), 0);

  const pendingAmount = payments
    .filter((p) => p.paymentStatus === "Pending")
    .reduce((sum, p) => sum + Number(p.amount), 0);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header & Stats Summary */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Payment History</h1>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500">
              <p className="text-sm text-gray-500 uppercase font-bold tracking-wider">Total Earned</p>
              <p className="text-2xl font-black text-gray-800">₹{totalEarnings}</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-yellow-500">
              <p className="text-sm text-gray-500 uppercase font-bold tracking-wider">Pending</p>
              <p className="text-2xl font-black text-gray-800">₹{pendingAmount}</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500">
              <p className="text-sm text-gray-500 uppercase font-bold tracking-wider">Transactions</p>
              <p className="text-2xl font-black text-gray-800">{payments.length}</p>
            </div>
          </div>
        </div>

        {/* Desktop Table / Mobile Cards */}
        {loading ? (
          <div className="text-center py-10 text-gray-500">Loading payments...</div>
        ) : payments.length > 0 ? (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
            {/* Table for Desktop */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-600">Client</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-600">Amount</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-600">Method</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-600">Status</th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {payments.map((payment) => (
                    <tr key={payment._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-800">
                        {payment.userId?.Firstname} {payment.userId?.Lastname}
                      </td>
                      <td className="px-6 py-4 text-gray-700 font-bold">₹{payment.amount}</td>
                      <td className="px-6 py-4 text-gray-500 text-sm">{payment.paymentMethod}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          payment.paymentStatus === "Pending" 
                            ? "bg-yellow-100 text-yellow-700" 
                            : "bg-green-100 text-green-700"
                        }`}>
                          {payment.paymentStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        {payment.paymentStatus === "Pending" && (
                          <button
                            onClick={() => updateStatus(payment._id)}
                            className="bg-green-600 hover:bg-green-700 text-white text-xs px-4 py-2 rounded-lg transition shadow-sm"
                          >
                            Mark as Paid
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Grid for Mobile */}
            <div className="md:hidden grid grid-cols-1 gap-4 p-4 bg-gray-50">
              {payments.map((payment) => (
                <div key={payment._id} className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-xs text-gray-400 uppercase font-bold">Client</p>
                      <p className="font-bold text-gray-800">{payment.userId?.Firstname} {payment.userId?.Lastname}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-[10px] font-black uppercase ${
                      payment.paymentStatus === "Pending" ? "bg-yellow-100 text-yellow-600" : "bg-green-100 text-green-600"
                    }`}>
                      {payment.paymentStatus}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-400 uppercase font-bold">Amount</p>
                      <p className="text-lg font-black text-blue-600">₹{payment.amount}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase font-bold">Method</p>
                      <p className="text-sm text-gray-600">{payment.paymentMethod}</p>
                    </div>
                  </div>
                  {payment.paymentStatus === "Pending" && (
                    <button
                      onClick={() => updateStatus(payment._id)}
                      className="w-full bg-green-600 text-white py-2 rounded-lg font-bold text-sm active:scale-95 transition-transform"
                    >
                      Mark as Paid
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white p-12 text-center rounded-xl shadow-sm border border-dashed border-gray-300">
            <p className="text-gray-400 text-lg">No payment records found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProviderPayments;