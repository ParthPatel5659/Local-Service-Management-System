import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider";
import { toast } from "react-toastify";
import { FiDollarSign, FiClock, FiPercent, FiActivity, FiCheckCircle } from "react-icons/fi";
import { FaRupeeSign } from "react-icons/fa";

const ProviderPayments = () => {
  const { userId } = useContext(AuthContext);

  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [earnings, setEarnings] = useState(0);
  const [pending, setPending] = useState(0);
  const [commission, setCommission] = useState(0);

  const getPayments = async () => {
    if (!userId) return;
    try {
      const res = await axios.get(`/payments/provider/${userId}`);
      setPayments(res.data.data || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch payments");
    }
  };

  const getSummary = async () => {
    try {
      const [earnRes, pendRes, commRes] = await Promise.all([
        axios.get(`/bookings/provider-earnings/${userId}`),
        axios.get(`/bookings/provider-pending/${userId}`),
        axios.get(`/bookings/provider-commission/${userId}`),
      ]);

      setEarnings(earnRes.data.totalEarnings || 0);
      setPending(pendRes.data.totalPending || 0);
      setCommission(commRes.data.totalCommission || 0);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userId) {
      const fetchData = async () => {
        setLoading(true);
        await getPayments();
        await getSummary();
        setLoading(false);
      };
      fetchData();
    }
  }, [userId]);

  const updateStatus = async (id) => {
    try {
      const res = await axios.put(`/payments/update/${id}`, {
        paymentStatus: "Completed",
      });

      if (res.status === 200) {
        toast.success("Transaction marked as completed");
        getPayments();
        getSummary(); 
      }
    } catch (error) {
      console.error(error);
      toast.error("Status update failed");
    }
  };

  return (
    <div className="space-y-10">
      
      {/* ── Page Header ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-[#1a1f2e] tracking-tight">Financial Ledger</h1>
          <p className="text-gray-500 mt-1 font-medium">Track transactions, pending balances, and total disbursements.</p>
        </div>
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-gray-100 shadow-sm text-[10px] font-black uppercase tracking-widest text-[#1a1f2e]">
            <span className="text-gray-400">Total Entries:</span> 
            <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-md border border-blue-100">
                {payments.length}
            </span>
        </div>
      </div>

      {/* ── Summary Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
            title="Total Revenue" 
            value={earnings} 
            icon={<FiDollarSign />} 
            colorTheme="bg-green-50 text-green-600 border-green-100 shadow-green-100/30" 
        />
        <StatCard 
            title="Pending Disbursement" 
            value={pending} 
            icon={<FiClock />} 
            colorTheme="bg-orange-50 text-[#F59E0B] border-orange-100 shadow-orange-100/30" 
        />
        <StatCard 
            title="Platform Commission" 
            value={commission} 
            icon={<FiPercent />} 
            colorTheme="bg-red-50 text-red-600 border-red-100 shadow-red-100/30" 
        />
        <StatCard 
            title="Transactions" 
            value={payments.length} 
            icon={<FiActivity />} 
            colorTheme="bg-blue-50 text-blue-600 border-blue-100 shadow-blue-100/30"
            isCount={true} 
        />
      </div>

      {/* ── Ledger Data ── */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#F59E0B] border-t-transparent shadow-lg"></div>
        </div>
      ) : payments.length > 0 ? (
        <div className="bg-white rounded-[3rem] shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
              <h2 className="text-xl font-black text-[#1a1f2e]">Transaction History</h2>
              <div className="text-[10px] font-black uppercase text-gray-400 tracking-widest px-4 py-2 bg-white rounded-xl border border-gray-100 shadow-sm flex items-center gap-2">
                  <FiClock className="text-[#F59E0B]" /> Live Sync
              </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-white">
                <tr className="border-b border-gray-50">
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Client / Sender</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Gross Amount</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Net Earning</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Platform Fee</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                  <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {payments.map((p) => (
                  <tr key={p._id} className="group hover:bg-gray-50/30 transition-colors">
                    
                    <td className="px-8 py-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center font-black text-[#1a1f2e] text-xs">
                                {p.userId?.Firstname?.charAt(0)}{p.userId?.Lastname?.charAt(0)}
                            </div>
                            <div>
                                <p className="font-bold text-sm text-[#1a1f2e] line-clamp-1">{p.userId?.Firstname} {p.userId?.Lastname}</p>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">#{p._id.slice(-6)}</p>
                            </div>
                        </div>
                    </td>

                    <td className="px-8 py-6">
                        <div className="flex items-center gap-1 font-black text-[#1a1f2e] text-lg">
                            <FaRupeeSign className="text-gray-300 text-sm" />{p.amount?.toLocaleString()}
                        </div>
                    </td>

                    <td className="px-8 py-6">
                        <div className="flex items-center gap-1 font-black text-green-600 bg-green-50 px-3 py-1.5 rounded-lg border border-green-100 w-fit">
                            <FaRupeeSign className="text-green-400 text-xs" />{(p.bookingId?.providerEarning || 0).toLocaleString()}
                        </div>
                    </td>

                    <td className="px-8 py-6">
                        <div className="flex items-center gap-1 font-bold text-red-500 text-sm">
                            <FaRupeeSign size={10} className="text-red-300" />{(p.bookingId?.commission || 0).toLocaleString()}
                        </div>
                    </td>

                    <td className="px-8 py-6">
                        <span className={`text-[9px] font-black uppercase tracking-[2px] px-3 py-1.5 rounded-lg border flex items-center gap-1.5 w-fit ${
                            p.paymentStatus === 'Completed' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-orange-50 text-orange-600 border-orange-100'
                        }`}>
                            {p.paymentStatus === 'Completed' && <FiCheckCircle />}
                            {p.paymentStatus}
                        </span>
                    </td>

                    <td className="px-8 py-6">
                      {p.paymentStatus === "Pending" ? (
                        <button
                          onClick={() => updateStatus(p._id)}
                          className="bg-[#1a1f2e] hover:bg-[#F59E0B] text-white px-5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all shadow-md flex items-center gap-2 whitespace-nowrap"
                        >
                          Mark Paid
                        </button>
                      ) : (
                        <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">
                            Processed
                        </span>
                      )}
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white p-24 rounded-[3rem] text-center border border-dashed border-gray-200 shadow-sm">
          <div className="w-20 h-20 bg-gray-50 flex items-center justify-center rounded-2xl text-gray-300 mx-auto mb-6 shadow-inner">
              <FiDollarSign size={32} />
          </div>
          <h3 className="text-2xl font-black text-[#1a1f2e] mb-2">No Transactions Detected</h3>
          <p className="text-gray-500 max-w-sm mx-auto font-medium">Financial records will be generated here once you complete services.</p>
        </div>
      )}
    </div>
  );
};

// Internal StatCard Component
const StatCard = ({ title, value, icon, colorTheme, isCount }) => (
    <div className={`p-8 rounded-[2.5rem] border bg-white shadow-lg ${colorTheme} hover:-translate-y-1 transition-transform duration-300`}>
        <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-xl border border-current/10">
                {icon}
            </div>
        </div>
        <p className="text-[10px] font-black uppercase tracking-[2px] opacity-70 mb-1">{title}</p>
        <div className="flex items-center gap-1">
            {!isCount && <FaRupeeSign className="text-lg opacity-50" />}
            <h2 className="text-4xl font-black tracking-tighter opacity-90">{isCount ? value : value?.toLocaleString()}</h2>
        </div>
    </div>
)

export default ProviderPayments;