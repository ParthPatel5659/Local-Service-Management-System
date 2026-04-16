import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FiStar, FiMessageSquare, FiActivity, FiSearch, FiTrendingUp } from 'react-icons/fi'
import { FaStar, FaRegStar } from 'react-icons/fa'

const AllReview = () => {
  const [reviews, setReviews] = useState([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)

  const allReview = async () => {
    try {
      setLoading(true)
      const all = await axios.get("/reviews/all")
      setReviews(all.data.data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    allReview()
  }, [])

  const filtered = reviews.filter((r) =>
    r.comment?.toLowerCase().includes(search.toLowerCase()) ||
    r.serviceId?.serviceName?.toLowerCase().includes(search.toLowerCase())
  )

  const avg = reviews.length
    ? (reviews.reduce((s, r) => s + (r.rating || 0), 0) / reviews.length).toFixed(1)
    : "0.0"

  const dist = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
  }))

  const StarRow = ({ rating }) => (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) =>
        i <= rating
          ? <FaStar key={i} size={14} className="text-[#F59E0B]" />
          : <FaRegStar key={i} size={14} className="text-gray-200" />
      )}
    </div>
  )

  return (
    <div className="space-y-10">
      
      {/* ── Page Header ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-[#1a1f2e] tracking-tight">Community Feedback</h1>
          <p className="text-gray-500 mt-1 font-medium">Monitoring service satisfaction and platform reputation.</p>
        </div>
        <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-xl text-[10px] font-black uppercase text-[#F59E0B] tracking-widest border border-orange-100">
                <FiTrendingUp /> Top Quality
            </div>
        </div>
      </div>

      {/* ── Reputation Summary ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Score Card */}
        <div className="bg-[#1a1f2e] p-10 rounded-[3rem] text-white flex flex-col items-center justify-center text-center shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 blur-[60px] rounded-full"></div>
            <p className="text-[10px] font-black uppercase tracking-[3px] text-gray-500 mb-4">Aggregate Score</p>
            <h2 className="text-7xl font-black tracking-tighter text-white mb-4">{avg}</h2>
            <div className="scale-150 mb-6">
                <StarRow rating={Math.round(parseFloat(avg))} />
            </div>
            <p className="text-xs font-bold text-gray-400">Based on {reviews.length} professional reviews</p>
        </div>

        {/* Rating Bars */}
        <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm flex flex-col justify-center">
            <h3 className="text-xl font-black text-[#1a1f2e] mb-8 flex items-center gap-2">
                <FiActivity className="text-[#F59E0B]" /> Satisfaction Spread
            </h3>
            <div className="space-y-4">
                {dist.map(({ star, count }) => {
                    const pct = reviews.length ? Math.round((count / reviews.length) * 100) : 0
                    return (
                        <div key={star} className="flex items-center gap-6 group">
                            <div className="flex items-center gap-1 w-8">
                                <span className="text-sm font-black text-[#1a1f2e]">{star}</span>
                                <FaStar size={12} className="text-[#F59E0B]" />
                            </div>
                            <div className="flex-1 h-3 rounded-full bg-gray-50 overflow-hidden border border-gray-100 shadow-inner">
                                <div
                                    className="h-full rounded-full transition-all duration-1000 shadow-sm"
                                    style={{
                                        width: `${pct}%`,
                                        background: star >= 4 ? "#10b981" : star === 3 ? "#F59E0B" : "#ef4444",
                                    }}
                                />
                            </div>
                            <span className="text-[10px] font-black text-gray-400 w-12 text-right uppercase">{pct}%</span>
                        </div>
                    )
                })}
            </div>
        </div>
      </div>

      {/* ── Search Area ── */}
      <div className="relative max-w-xl">
        <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Filter by comment content or service name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-14 pr-6 py-5 rounded-2xl bg-white border border-gray-100 shadow-sm focus:ring-4 focus:ring-orange-50 focus:border-[#F59E0B] outline-none transition-all font-bold text-[#1a1f2e] placeholder-gray-300"
        />
      </div>

      {/* ── Review Feed ── */}
      {loading ? (
        <div className="flex justify-center py-20">
            <div className="animate-spin h-10 w-10 border-4 border-[#F59E0B] border-t-transparent rounded-full"></div>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-[3rem] p-24 text-center border border-dashed border-gray-200">
          <div className="w-24 h-24 bg-gray-50 flex items-center justify-center rounded-full text-gray-200 text-5xl mx-auto mb-8 shadow-inner">💬</div>
          <h3 className="text-2xl font-black text-[#1a1f2e]">No Context Found</h3>
          <p className="text-gray-500 max-w-sm mx-auto mt-2 font-medium">We couldn't find any reviews matching your current filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filtered.map((review) => {
            const customerName = `${review.userId?.Firstname || ""} ${review.userId?.Lastname || ""}`.trim() || "Local Customer"
            return (
              <div
                key={review._id}
                className="group bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <img 
                            src={`https://ui-avatars.com/api/?name=${customerName}&background=f9fafb&color=F59E0B&bold=true`} 
                            alt="user" 
                            className="w-12 h-12 rounded-2xl border border-gray-100 shadow-sm"
                        />
                        <div>
                            <p className="text-sm font-black text-[#1a1f2e]">{customerName}</p>
                            <span className="text-[10px] font-bold text-[#F59E0B] uppercase tracking-widest">{review.serviceId?.serviceName || 'Verified Service'}</span>
                        </div>
                    </div>
                    <div className="px-3 py-1 bg-gray-50 border border-gray-100 rounded-lg text-xs font-black text-[#1a1f2e]">
                        #{review.rating}.0
                    </div>
                </div>

                <div className="mb-6">
                    <StarRow rating={review.rating} />
                </div>

                <div className="flex-1 relative">
                    <FiMessageSquare className="absolute -left-2 -top-2 text-gray-50 opacity-0 group-hover:opacity-100 transition-opacity" size={40} />
                    <p className="text-gray-600 font-medium leading-relaxed italic relative z-10 line-clamp-4">
                        "{review.comment || 'No detailed feedback provided for this professional service.'}"
                    </p>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-50 flex items-center justify-between">
                    <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest">Global Review</span>
                    <button className="text-[10px] font-black text-[#F59E0B] uppercase tracking-widest hover:underline">Flag Content</button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default AllReview