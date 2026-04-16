import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiMessageSquare, FiSend, FiUser, FiClock, FiCheckCircle, FiInfo, FiActivity } from "react-icons/fi";
import { toast } from "react-toastify";

const AdminSupport = () => {
  const [supports, setSupports] = useState([]);
  const [reply, setReply] = useState({});
  const [loading, setLoading] = useState(true);

  const getSupports = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/support/all");
      setSupports(res.data.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSupports();
  }, []);

  const sendReply = async (id) => {
    if (!reply[id]?.trim()) {
        toast.warning("Please type a message before replying.");
        return;
    }
    try {
      await axios.put(`/support/reply/${id}`, {
        reply: reply[id]
      });

      setReply({ ...reply, [id]: "" });
      toast.success("Response sent successfully!");
      getSupports();
    } catch (error) {
      console.log(error);
      toast.error("Failed to send response.");
    }
  };

  return (
    <div className="space-y-10">
      
      {/* ── Page Header ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-[#1a1f2e] tracking-tight">Resolution Center</h1>
          <p className="text-gray-500 mt-1 font-medium">Addressing user inquiries and platform support tickets.</p>
        </div>
        <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 px-4 py-2 bg-[#F59E0B] rounded-xl text-[10px] font-black uppercase text-white tracking-widest shadow-lg shadow-orange-100">
                <FiActivity /> Live Support
            </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
            <div className="animate-spin h-10 w-10 border-4 border-[#F59E0B] border-t-transparent rounded-full"></div>
        </div>
      ) : supports.length > 0 ? (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {supports.map((s) => (
            <div key={s._id} className="bg-white rounded-[3rem] p-10 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group overflow-hidden relative">
                
                {/* Status Indicator Bar */}
                <div className={`absolute top-0 left-0 w-2 h-full ${s.status === 'Pending' ? 'bg-[#F59E0B]' : 'bg-green-500'}`}></div>

                {/* Header: User & Status */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 lg:pl-4">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-300 border border-gray-100 group-hover:bg-orange-50 group-hover:text-[#F59E0B] transition-colors">
                            <FiUser size={24} />
                        </div>
                        <div>
                            <p className="text-base font-black text-[#1a1f2e]">{s.name}</p>
                            <p className="text-xs font-bold text-gray-400">{s.email}</p>
                        </div>
                    </div>
                    <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border self-start md:self-center ${
                        s.status === 'Pending' ? 'bg-orange-50 text-orange-600 border-orange-100' : 'bg-green-50 text-green-600 border-green-100'
                    }`}>
                        {s.status === 'Pending' ? <FiInfo /> : <FiCheckCircle />} {s.status}
                    </div>
                </div>

                {/* Subject & Message */}
                <div className="flex-1 lg:pl-4">
                    <div className="mb-6 bg-gray-50/50 p-6 rounded-[2rem] border border-gray-50 border-dashed group-hover:border-orange-100 group-hover:bg-orange-50/10 transition-colors">
                        <p className="text-[10px] font-black text-[#F59E0B] uppercase tracking-[2px] mb-2">Subject: {s.subject}</p>
                        <p className="text-gray-600 font-medium leading-relaxed italic">
                            "{s.message}"
                        </p>
                    </div>

                    {/* Timeline / Meta */}
                    <div className="flex items-center gap-4 text-[10px] font-black text-gray-300 uppercase tracking-widest mb-10">
                        <FiClock className="text-[#F59E0B]" /> Received: {new Date(s.createdAt).toLocaleString("en-US", { hour: '2-digit', minute: '2-digit', day: '2-digit', month: 'short' })}
                    </div>
                </div>

                {/* Reply Section */}
                <div className="mt-auto lg:pl-4 flex flex-col md:flex-row gap-3">
                    <div className="flex-1 relative group">
                        <FiMessageSquare className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#F59E0B] transition-colors" />
                        <input
                            value={reply[s._id] || ""}
                            onChange={(e) => setReply({ ...reply, [s._id]: e.target.value })}
                            placeholder="Type your official response..."
                            className="w-full pl-14 pr-6 py-5 rounded-2xl bg-[#f9fafb] border border-gray-100 focus:bg-white focus:border-[#F59E0B] outline-none transition-all font-bold text-[#1a1f2e] placeholder-gray-300 text-sm shadow-inner"
                        />
                    </div>
                    <button
                        onClick={() => sendReply(s._id)}
                        className="bg-[#1a1f2e] hover:bg-[#F59E0B] text-white font-black px-8 py-5 rounded-2xl shadow-xl shadow-gray-100 transition-all active:scale-[0.98] uppercase tracking-widest text-[10px] flex items-center justify-center gap-3"
                    >
                        Send <FiSend />
                    </button>
                </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-[3rem] p-24 text-center border border-dashed border-gray-200">
          <div className="w-24 h-24 bg-gray-50 flex items-center justify-center rounded-full text-gray-200 text-5xl mx-auto mb-8 shadow-inner">✉️</div>
          <h3 className="text-2xl font-black text-[#1a1f2e]">Inbox Clear</h3>
          <p className="text-gray-500 max-w-sm mx-auto mt-2 font-medium">No active support inquiries. Your users are currently undisturbed.</p>
        </div>
      )}
    </div>
  );
};

export default AdminSupport;