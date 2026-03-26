import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FiStar, FiMessageSquare } from 'react-icons/fi'
import { FaStar, FaRegStar } from 'react-icons/fa'

const AllReview = () => {
  const [reviews, setReviews] = useState([])
  const [search, setSearch] = useState("")

  const allReview = async () => {
    try {
      const all = await axios.get("/reviews/all")
      setReviews(all.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    allReview()
  }, [])

  const filtered = reviews.filter((r) =>
    r.comment?.toLowerCase().includes(search.toLowerCase())
  )

  const avatarColors = [
    "linear-gradient(135deg, #6366f1, #8b5cf6)",
    "linear-gradient(135deg, #f59e0b, #ef4444)",
    "linear-gradient(135deg, #10b981, #06b6d4)",
    "linear-gradient(135deg, #f43f5e, #ec4899)",
    "linear-gradient(135deg, #3b82f6, #6366f1)",
    "linear-gradient(135deg, #14b8a6, #22c55e)",
  ]
  const getColor = (str = "") => avatarColors[str.charCodeAt(0) % avatarColors.length]

  const ratingColor = (rating) => {
    if (rating >= 4) return { bg: "#f0fdf4", text: "#16a34a", star: "#22c55e" }
    if (rating === 3) return { bg: "#fffbeb", text: "#b45309", star: "#f59e0b" }
    return { bg: "#fef2f2", text: "#dc2626", star: "#ef4444" }
  }

  const StarRow = ({ rating }) => {
    const { star } = ratingColor(rating)
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((i) =>
          i <= rating
            ? <FaStar key={i} size={12} style={{ color: star }} />
            : <FaRegStar key={i} size={12} style={{ color: "#cbd5e1" }} />
        )}
      </div>
    )
  }

  // Summary stats
  const avg = reviews.length
    ? (reviews.reduce((s, r) => s + (r.rating || 0), 0) / reviews.length).toFixed(1)
    : "0.0"

  const dist = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
  }))

  return (
    <div
      className="min-h-screen p-6"
      style={{
        background: "linear-gradient(160deg, #f0f4ff 0%, #f8fafc 60%, #fff 100%)",
        fontFamily: "'Plus Jakarta Sans', 'Nunito', sans-serif",
      }}
    >
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
            >
              <FiStar className="text-white" size={15} />
            </div>
            <h1 className="text-xl font-bold tracking-tight" style={{ color: "#1e293b" }}>
              All Reviews
            </h1>
          </div>
          <p className="text-sm text-slate-400 ml-10">
            {reviews.length} review{reviews.length !== 1 ? "s" : ""} total
          </p>
        </div>
      </div>

      {/* Summary Card */}
      {reviews.length > 0 && (
        <div
          className="bg-white rounded-2xl p-5 mb-6 flex flex-col sm:flex-row items-center gap-6"
          style={{ border: "1px solid #e8edf5", boxShadow: "0 2px 8px rgba(99,102,241,0.06)" }}
        >
          {/* Avg Score */}
          <div className="flex flex-col items-center gap-1 min-w-[80px]">
            <span className="text-4xl font-bold" style={{ color: "#1e293b" }}>{avg}</span>
            <StarRow rating={Math.round(parseFloat(avg))} />
            <span className="text-xs text-slate-400 mt-0.5">{reviews.length} reviews</span>
          </div>

          <div className="h-12 w-px bg-slate-100 hidden sm:block" />

          {/* Distribution */}
          <div className="flex-1 w-full space-y-1.5">
            {dist.map(({ star, count }) => {
              const pct = reviews.length ? Math.round((count / reviews.length) * 100) : 0
              return (
                <div key={star} className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 w-3">{star}</span>
                  <FaStar size={10} style={{ color: "#f59e0b" }} />
                  <div className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${pct}%`,
                        background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
                      }}
                    />
                  </div>
                  <span className="text-xs text-slate-400 w-6 text-right">{count}</span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Search */}
      <div className="relative mb-6 max-w-sm">
        <FiMessageSquare
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          size={13}
        />
        <input
          type="text"
          placeholder="Search comments..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm placeholder-slate-400 outline-none focus:ring-2 focus:ring-indigo-300 transition-all duration-150"
          style={{
            background: "#fff",
            border: "1px solid #dde3f0",
            color: "#334155",
            boxShadow: "0 1px 4px rgba(99,102,241,0.06)",
          }}
        />
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
            style={{ background: "#eef1f8" }}
          >
            <FiStar className="text-indigo-300" size={26} />
          </div>
          <p className="text-slate-500 font-medium text-sm">No reviews found</p>
          <p className="text-slate-400 text-xs mt-1">Try a different search term</p>
        </div>
      )}

      {/* Review Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((review) => {
          const rating = review.rating || 0
          const { bg, text } = ratingColor(rating)
          const name = review.userId?.Firstname || review.user?.Firstname || "User"

          return (
            <div
              key={review._id}
              className="bg-white rounded-2xl p-5 transition-all duration-200 hover:-translate-y-0.5"
              style={{
                border: "1px solid #e8edf5",
                boxShadow: "0 2px 8px rgba(99,102,241,0.06)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 8px 28px rgba(99,102,241,0.14)"
                e.currentTarget.style.borderColor = "#c7d2fe"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(99,102,241,0.06)"
                e.currentTarget.style.borderColor = "#e8edf5"
              }}
            >
              {/* Top Row: Avatar + Rating Badge */}
              <div className="flex items-start justify-between mb-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                  style={{ background: getColor(name) }}
                >
                  {name.charAt(0).toUpperCase()}
                </div>

                <div
                  className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold"
                  style={{ background: bg, color: text }}
                >
                  <FaStar size={10} style={{ color: text }} />
                  {rating} / 5
                </div>
              </div>

              {/* Star Row */}
              <StarRow rating={rating} />

              {/* Comment */}
              <p
                className="text-xs mt-2.5 leading-relaxed"
                style={{
                  color: "#64748b",
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {review.comment || "No comment provided."}
              </p>

              {/* Divider */}
              <div className="my-3 h-px" style={{ background: "#f1f5f9" }} />

              {/* User name */}
              <p className="text-xs font-semibold truncate" style={{ color: "#1e293b" }}>
                {name}
              </p>
              {review.serviceName && (
                <p className="text-xs text-slate-400 truncate mt-0.5">{review.serviceName}</p>
              )}
            </div>
          )
        })}
      </div>

    </div>
  )
}

export default AllReview