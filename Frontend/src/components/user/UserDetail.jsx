import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FiArrowLeft, FiUser, FiMail, FiPhone, FiTrash2, FiShield, FiActivity, FiBriefcase } from "react-icons/fi";

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const getUser = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/user/detail/${id}`);
      setUser(res.data.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to retrieve entity specifications.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getUser();
    }
  }, [id]);

  const deleteUser = async (id) => {
    try {
      if (!window.confirm("CRITICAL: Are you sure you want to terminate this identity record? This action is irreversible.")) return;
      const res = await axios.delete(`/user/delete/${id}`);
      if (res.status === 200) {
        toast.success("Identity record terminated successfully.");
        navigate(-1);
      }
    } catch (error) {
      console.log(error);
      toast.error("Termination protocol failed.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin h-12 w-12 border-4 border-[#F59E0B] border-t-transparent rounded-full shadow-lg"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      
      {/* ── Top Navigation ── */}
      <button 
        onClick={() => navigate(-1)}
        className="mb-8 flex items-center gap-2 text-[10px] font-black uppercase text-gray-400 hover:text-[#1a1f2e] tracking-widest transition-all"
      >
        <FiArrowLeft /> Return to Identity Directory
      </button>

      <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden border-t-8 border-t-[#F59E0B]">
        
        {/* Cover Segment */}
        <div className="h-40 bg-[#1a1f2e] relative">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-[#F59E0B]/10 blur-[100px] rounded-full"></div>
            <div className="absolute -bottom-12 left-12 flex items-end gap-6">
                <div className="h-32 w-32 rounded-[2rem] bg-white p-2 shadow-2xl">
                    <div className="w-full h-full bg-orange-50 rounded-[1.5rem] flex items-center justify-center text-3xl font-black text-[#F59E0B] border border-orange-100">
                        {user.Firstname?.charAt(0)}{user.Lastname?.charAt(0)}
                    </div>
                </div>
            </div>
        </div>

        <div className="px-12 pt-20 pb-12">
            
            {/* Header Info */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                    <h1 className="text-4xl font-black text-[#1a1f2e] tracking-tight">{user.Firstname} {user.Lastname}</h1>
                    <div className="flex items-center gap-2 mt-2">
                        <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${user.role === 'admin' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : user.role === 'provider' ? 'bg-orange-50 text-[#F59E0B] border-orange-100' : 'bg-green-50 text-green-600 border-green-100'}`}>
                            {user.role || "User"}
                        </span>
                        <span className="bg-gray-50 text-gray-400 px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border border-gray-100">Verified identity</span>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => deleteUser(user._id)}
                        className="p-4 bg-red-50 text-red-600 rounded-2xl border border-red-100 hover:bg-red-600 hover:text-white transition-all shadow-sm flex items-center gap-2 text-xs font-black uppercase tracking-widest"
                    >
                        <FiTrash2 size={18} /> Terminate Record
                    </button>
                </div>
            </div>

            {/* Entity Data Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-gray-50 pt-12">
                
                <DetailItem 
                    icon={<FiMail className="text-[#F59E0B]" />} 
                    label="Digital Correspondence" 
                    value={user.email} 
                />
                
                <DetailItem 
                    icon={<FiPhone className="text-[#F59E0B]" />} 
                    label="Voice Contact" 
                    value={user.phone || "N/A"} 
                />

                <DetailItem 
                    icon={<FiShield className="text-[#F59E0B]" />} 
                    label="Identity Status" 
                    value="Operational / Active" 
                    customValue={<span className="text-green-600 flex items-center gap-2 font-black uppercase text-[10px] tracking-widest"><span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> Active Presence</span>}
                />

                <DetailItem 
                    icon={<FiBriefcase className="text-[#F59E0B]" />} 
                    label="Platform Context" 
                    value={user.role?.toUpperCase() || "General Access"} 
                />

            </div>

            {/* System Metadata Footer */}
            <div className="mt-16 p-8 bg-[#1a1f2e] rounded-[2.5rem] flex flex-col md:flex-row md:items-center justify-between gap-6 border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-full bg-[#F59E0B]/5 skew-x-12 translate-x-10"></div>
                <div className="relative z-10 flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-[#F59E0B]">
                        <FiActivity size={24} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-white uppercase tracking-[2px]">Unique Entity UUID</p>
                        <p className="font-mono text-gray-400 text-sm tracking-tight">{user._id}</p>
                    </div>
                </div>
                <div className="relative z-10 text-right">
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Database Node</p>
                    <p className="text-white font-bold text-sm tracking-tight uppercase">Cluster-A / Primary</p>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};

const DetailItem = ({ icon, label, value, customValue }) => (
    <div className="space-y-2 group">
        <p className="text-[10px] font-black uppercase text-gray-400 tracking-[2px] ml-1 flex items-center gap-2 group-hover:text-[#F59E0B] transition-colors">
            {icon} {label}
        </p>
        <div className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100 group-hover:border-[#F59E0B]/20 transition-all">
            {customValue ? customValue : <p className="text-lg font-black text-[#1a1f2e] tracking-tight">{value}</p>}
        </div>
    </div>
)

export default UserDetail;