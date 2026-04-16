import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { FiSearch, FiMapPin, FiStar, FiFilter, FiArrowRight } from 'react-icons/fi'
import { FaRupeeSign } from 'react-icons/fa'

const AllServices = () => {
  const { handleSubmit } = useForm()
  const [services, setservices] = useState([])
  const [search, setSearch] = useState("")
  const [filterCat, setFilterCat] = useState("All")
  const navigate = useNavigate()

  const allService = async () => {
    try {
      const res = await axios.get('/services/all')
      setservices(res.data.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => { allService() }, [])

  const categories = ["All", ...Array.from(new Set(services.map((s) => s.categoryId?.categoryName).filter(Boolean)))]

  const filtered = services.filter((s) => {
    const q = search.toLowerCase()
    const matchSearch =
      !q ||
      s.serviceName?.toLowerCase().includes(q) ||
      s.description?.toLowerCase().includes(q) ||
      s.categoryId?.categoryName?.toLowerCase().includes(q) ||
      `${s.providerId?.Firstname} ${s.providerId?.Lastname}`.toLowerCase().includes(q)
    const matchCat = filterCat === "All" || s.categoryId?.categoryName === filterCat
    return matchSearch && matchCat
  })

  return (
    <div className="bg-[#f9fafb] min-h-screen">
      
      {/* ── Page Header & Search ── */}
      <div className="mb-10">
        <h1 className="text-3xl font-black text-[#1a1f2e] mb-6">Explore Services</h1>
        
        <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                    type="text"
                    placeholder="Search for any service, provider or category..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white border border-gray-100 rounded-2xl shadow-sm focus:ring-2 focus:ring-[#F59E0B]/20 focus:border-[#F59E0B] outline-none transition-all text-sm font-medium"
                />
            </div>
            <button className="flex items-center gap-2 px-6 py-4 bg-white border border-gray-100 rounded-2xl text-gray-600 font-bold text-sm shadow-sm hover:bg-gray-50 transition-all">
                <FiFilter /> Filters
            </button>
        </div>
      </div>

      {/* ── Category Pills ── */}
      <div className="flex items-center gap-3 overflow-x-auto pb-4 no-scrollbar mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCat(cat)}
            className={`px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-200 ${
              filterCat === cat
                ? "bg-[#F59E0B] text-white shadow-lg shadow-orange-100"
                : "bg-white text-gray-500 border border-gray-100 hover:border-orange-200 hover:text-orange-500"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ── Services Grid ── */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-3xl border border-dashed border-gray-200">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-4 text-4xl">🔍</div>
          <h3 className="text-xl font-bold text-gray-900">No services found</h3>
          <p className="text-gray-500 mt-2">Try adjusting your search or filters to find what you're looking for.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((service) => (
            <div
              key={service._id}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              {/* Card Image Holder (Simulated with a gradient if no image) */}
              <div className="h-48 bg-gradient-to-br from-gray-50 to-gray-100 relative group-hover:scale-105 transition-transform duration-500">
                 <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-[10px] font-black uppercase text-[#F59E0B] tracking-wider shadow-sm">
                        {service.categoryId?.categoryName || "Service"}
                    </span>
                 </div>
                 {/* Placeholder for service image */}
                 <div className="w-full h-full flex items-center justify-center text-4xl opacity-20">
                    {service.serviceName?.charAt(0)}
                 </div>
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-[#1a1f2e] group-hover:text-[#F59E0B] transition-colors">{service.serviceName}</h3>
                    <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400">
                        <FiStar className="fill-yellow-400 text-yellow-400" /> 4.9 (120)
                    </div>
                </div>

                <p className="text-gray-500 text-xs mb-4 line-clamp-2 leading-relaxed">
                  {service.description || "Top-quality professional service for your home needs."}
                </p>

                {/* Provider Info */}
                <div className="flex items-center gap-2 mb-6 mt-auto">
                    <img 
                        src={`https://ui-avatars.com/api/?name=${service.providerId?.Firstname}+${service.providerId?.Lastname}&background=f9fafb&color=F59E0B&font-size=0.35&bold=true`} 
                        alt="provider" 
                        className="w-6 h-6 rounded-full border border-gray-100"
                    />
                    <span className="text-[11px] font-bold text-gray-500">{service.providerId?.Firstname} {service.providerId?.Lastname}</span>
                </div>

                <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                    <div className="flex items-center text-lg font-black text-[#1a1f2e]">
                        <FaRupeeSign size={14} className="text-[#F59E0B]" />
                        {service.price?.toLocaleString()}
                        <span className="text-[10px] text-gray-400 ml-1 font-medium">/visit</span>
                    </div>
                    <button 
                        onClick={() => navigate(`/user/servicedetail/${service._id}`)}
                        className="p-2.5 bg-gray-50 text-[#F59E0B] rounded-xl hover:bg-[#F59E0B] hover:text-white transition-all shadow-sm"
                    >
                        <FiArrowRight size={18} />
                    </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Call to Action ── */}
      <div className="mt-20 bg-white p-8 md:p-12 rounded-3xl border border-gray-100 text-center shadow-sm">
        <h2 className="text-2xl font-black text-[#1a1f2e] mb-4">Don't see what you need?</h2>
        <p className="text-gray-500 mb-8 max-w-xl mx-auto font-medium">Our network is growing every day. Let us know what service you're looking for and we'll notify you when a pro is available.</p>
        <Link to="/user/support" className="inline-flex items-center bg-[#F59E0B] text-white font-bold px-8 py-3 rounded-xl hover:bg-[#D97706] transition-all shadow-lg shadow-orange-100">
            Request a Service
        </Link>
      </div>
    </div>
  )
}

export default AllServices