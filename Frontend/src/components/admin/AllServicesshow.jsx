import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FiSearch, FiMapPin, FiPackage, FiCheckCircle, FiXCircle, FiTrendingUp, FiActivity, FiFilter } from 'react-icons/fi'
import { FaRupeeSign } from 'react-icons/fa'

const AllServicesshow = () => {
  const [search, setSearch] = useState("")
  const [services, setServices] = useState([])
  const [filterCategory, setFilterCategory] = useState("All")
  const [loading, setLoading] = useState(true)

  const getallSrvices = async () => {
    try {
      setLoading(true)
      const res = await axios.get("/services/all")
      setServices(res.data.data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { getallSrvices() }, [])

  const filtered = services.filter((s) => {
    const q = search.toLowerCase()
    const matchSearch =
      !q ||
      s.serviceName?.toLowerCase().includes(q) ||
      s.categoryId?.categoryName?.toLowerCase().includes(q) ||
      s.location?.toLowerCase().includes(q) ||
      `${s.providerId?.Firstname} ${s.providerId?.Lastname}`.toLowerCase().includes(q)
    const matchCategory =
      filterCategory === "All" || s.categoryId?.categoryName === filterCategory
    return matchSearch && matchCategory
  })

  const availCount = services.filter((s) => s.availability).length
  const unavailCount = services.filter((s) => !s.availability).length
  const categories = ["All", ...Array.from(new Set(services.map((s) => s.categoryId?.categoryName).filter(Boolean)))]

  return (
    <div className="space-y-10">
      
      {/* ── Page Header ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-[#1a1f2e] tracking-tight">Service Directory</h1>
          <p className="text-gray-500 mt-1 font-medium">Monitoring all active professional listings across categories.</p>
        </div>
        <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-xl text-[10px] font-black uppercase text-green-600 tracking-widest border border-green-100">
                <FiActivity /> Active Network
            </div>
        </div>
      </div>

      {/* ── Stats Overview ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
            title="Total Listings" 
            value={services.length} 
            icon={<FiPackage />} 
            theme="bg-[#1a1f2e] text-white" 
            trend="+12 this week"
        />
        <StatCard 
            title="Available" 
            value={availCount} 
            icon={<FiCheckCircle />} 
            theme="bg-orange-50 text-[#F59E0B]" 
            trend="High Demand"
        />
        <StatCard 
            title="Inactive" 
            value={unavailCount} 
            icon={<FiXCircle />} 
            theme="bg-red-50 text-red-600" 
            trend="Needs Attention"
        />
      </div>

      {/* ── Toolbar ── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pt-4">
        <div className="relative flex-1 max-w-xl">
            <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
                type="text"
                placeholder="Search by name, category or region..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-14 pr-6 py-4 rounded-2xl bg-white border border-gray-100 shadow-sm focus:ring-4 focus:ring-orange-50 focus:border-[#F59E0B] outline-none transition-all font-bold text-[#1a1f2e] placeholder-gray-300"
            />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 lg:pb-0">
            {categories.map((f) => (
                <button
                    key={f}
                    onClick={() => setFilterCategory(f)}
                    className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all border whitespace-nowrap ${
                        filterCategory === f ? "bg-[#F59E0B] text-white border-[#F59E0B] shadow-lg shadow-orange-100" : "bg-white text-gray-400 border-gray-100 hover:border-orange-200"
                    }`}
                >
                    {f}
                </button>
            ))}
        </div>
      </div>

      {/* ── Services Table ── */}
      <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-50">
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[2px]">Service / Provider</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[2px]">Category</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[2px]">Pricing</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[2px]">Location</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[2px] text-center">Availability</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[2px] text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                    <td colSpan={6} className="py-20 text-center">
                        <div className="animate-spin h-8 w-8 border-4 border-[#F59E0B] border-t-transparent rounded-full mx-auto"></div>
                    </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                    <td colSpan={6} className="py-20 text-center">
                        <p className="text-gray-400 font-bold italic">No matching services found in current directory.</p>
                    </td>
                </tr>
              ) : (
                filtered.map((service) => {
                  const providerName = `${service.providerId?.Firstname || ""} ${service.providerId?.Lastname || ""}`.trim() || "Independent"
                  return (
                    <tr key={service._id} className="group hover:bg-gray-50/30 transition-all">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-2xl border border-gray-100 group-hover:bg-orange-50 group-hover:text-[#F59E0B] transition-colors shadow-inner font-bold">
                                {service.serviceName?.charAt(0)}
                            </div>
                            <div>
                                <p className="text-sm font-black text-[#1a1f2e] group-hover:text-[#F59E0B] transition-colors">{service.serviceName}</p>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">PRO: {providerName}</p>
                            </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="px-4 py-1.5 bg-[#1a1f2e] text-white rounded-lg text-[9px] font-black uppercase tracking-widest">
                            {service.categoryId?.categoryName || 'General'}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <p className="text-sm font-black text-[#1a1f2e] flex items-center">
                            <FaRupeeSign size={12} className="mr-0.5" />
                            {service.price?.toLocaleString()}
                        </p>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
                            <FiMapPin className="text-[#F59E0B]" /> {service.location || 'Multi-zone'}
                        </div>
                      </td>
                      <td className="px-8 py-6 text-center">
                        <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border ${
                            service.availability ? 'bg-green-50 text-green-600 border-green-100' : 'bg-red-50 text-red-600 border-red-100'
                        }`}>
                            {service.availability ? <FiCheckCircle size={12} /> : <FiXCircle size={12} />}
                            {service.availability ? 'Available' : 'Paused'}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-center">
                        <button className="p-3 bg-gray-50 text-gray-400 hover:bg-[#1a1f2e] hover:text-white rounded-xl transition-all shadow-sm border border-gray-100">
                            <FiActivity size={16} />
                        </button>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

const StatCard = ({ title, value, icon, theme, trend }) => (
    <div className={`p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center justify-between group hover:shadow-xl transition-all ${theme}`}>
        <div>
            <p className="text-[10px] font-black uppercase tracking-[2px] opacity-60 mb-1">{title}</p>
            <h2 className="text-3xl font-black tracking-tighter">{value}</h2>
            <p className="text-[10px] font-bold mt-2 opacity-40 uppercase tracking-widest">{trend}</p>
        </div>
        <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
            {icon}
        </div>
    </div>
)

export default AllServicesshow