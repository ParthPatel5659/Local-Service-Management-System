import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthProvider";

const UserDashboard = () => {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { userId } = useContext(AuthContext);

  const getCategories = async () => {
    try {
      const res = await axios.get("/category/all");
      setCategories(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen font-sans selection:bg-indigo-100">
      
      {/* ================= HERO SECTION ================= */}
      <div className="relative bg-indigo-700 text-white pt-20 pb-32 px-6 rounded-b-[3rem] overflow-hidden shadow-2xl">
        {/* Decorative Background Circles */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-indigo-600 rounded-full opacity-50 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-blue-500 rounded-full opacity-30 blur-3xl"></div>

        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-block bg-indigo-600/50 backdrop-blur-sm border border-indigo-400 px-4 py-1 rounded-full text-sm mb-6 animate-pulse">
            ❤️ Loved by 50,000+ happy customers
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            Your Neighborhood Helpers, <br/>
            <span className="text-blue-200">Just a Tap Away</span>
          </h1>

          <p className="text-lg text-indigo-100 mb-10 max-w-2xl mx-auto">
            Book trusted professionals for your home—electricians, plumbers, cleaners, and more.
          </p>

          {/* Search Bar */}
          <div className="flex bg-white rounded-2xl p-2 shadow-2xl max-w-2xl mx-auto items-center group transition-all focus-within:ring-4 ring-indigo-300">
            <div className="pl-4 text-gray-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="What do you need help with?"
              className="flex-1 px-4 py-4 text-gray-800 outline-none text-lg bg-transparent"
            />
            <button 
              onClick={() => navigate(`/user/services?search=${search}`)}
              className="bg-indigo-600 hover:bg-indigo-800 px-8 py-4 rounded-xl text-white font-bold transition-all active:scale-95 shadow-lg"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* ================= STATS (Floating Card) ================= */}
      <div className="max-w-5xl mx-auto -mt-16 px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
          {[
            { label: "Providers", val: "5000+" },
            { label: "Customers", val: "50K+" },
            { label: "Services", val: "20+" },
            { label: "Rating", val: "4.8⭐" }
          ].map((stat, i) => (
            <div key={i} className="text-center border-r last:border-0 border-gray-100">
              <h2 className="text-2xl md:text-3xl font-black text-indigo-600">{stat.val}</h2>
              <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ================= CATEGORY SECTION ================= */}
      <div className="max-w-6xl mx-auto py-24 px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
            How can we help you today?
          </h2>
          <div className="h-1.5 w-24 bg-indigo-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {categories.map((cat) => (
            <div
              key={cat._id}
              onClick={() => navigate("/user/services")}
              className="group bg-white p-8 rounded-[2.5rem] shadow-sm hover:shadow-2xl border border-gray-100 cursor-pointer text-center transition-all duration-500 hover:-translate-y-3"
            >
              <div className="text-5xl mb-6 transform group-hover:scale-125 transition-transform duration-500 inline-block">
                {cat.icon || "🛠️"}
              </div>
              <h3 className="font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">
                {cat.categoryName}
              </h3>
            </div>
          ))}
        </div>
      </div>

      {/* ================= HOW IT WORKS ================= */}
      <div className="bg-indigo-900 text-white py-24 rounded-[4rem] mx-4 mb-24 px-6 shadow-inner">
        <h2 className="text-3xl font-black text-center mb-16 underline decoration-indigo-400 underline-offset-8">
          Simple as 1, 2, 3
        </h2>
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-12 text-center">
          {[
            { title: "Search", desc: "Find vetted pros instantly", icon: "🔍" },
            { title: "Book", desc: "Schedule at your convenience", icon: "📅" },
            { title: "Relax", desc: "Sit back and enjoy the result", icon: "✅" }
          ].map((step, i) => (
            <div key={i} className="relative p-8 rounded-3xl bg-indigo-800/50 border border-indigo-700">
              <div className="text-4xl mb-4">{step.icon}</div>
              <h3 className="font-black text-xl mb-2">{step.title}</h3>
              <p className="text-indigo-200">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ================= TESTIMONIAL ================= */}
      <div className="max-w-6xl mx-auto px-6 mb-24">
        <h2 className="text-3xl font-black text-center mb-12">What our community says ❤️</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { text: "Great service, very fast! The electrician was super polite.", author: "Priya S." },
            { text: "Professional and affordable. Booking took less than a minute.", author: "Rahul M." },
            { text: "Highly recommended for home cleaning. Spotless work!", author: "Sonia K." }
          ].map((t, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border-l-8 border-indigo-500 italic text-gray-600">
              <p className="text-lg">"{t.text}"</p>
              <h4 className="mt-4 font-black text-gray-900 not-italic">— {t.author}</h4>
            </div>
          ))}
        </div>
      </div>

      {/* ================= CTA CARDS ================= */}
      <div className="max-w-6xl mx-auto px-6 pb-24 grid md:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-amber-400 to-orange-500 p-10 rounded-[3rem] text-white shadow-xl flex flex-col justify-between items-start hover:rotate-1 transition-transform">
          <div>
            <h3 className="text-3xl font-black mb-4">Need help right now?</h3>
            <p className="mb-8 opacity-90 text-lg font-medium">Browse our expert services and get things done today.</p>
          </div>
          <button
            onClick={() => navigate("/user/services")}
            className="bg-white text-orange-600 font-black px-8 py-3 rounded-2xl hover:bg-gray-100 transition shadow-lg"
          >
            Find Service
          </button>
        </div>

        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-10 rounded-[3rem] text-white shadow-xl flex flex-col justify-between items-start hover:-rotate-1 transition-transform">
          <div>
            <h3 className="text-3xl font-black mb-4">Want to earn more?</h3>
            <p className="mb-8 opacity-90 text-lg font-medium">Join our network of professionals and grow your business.</p>
          </div>
          <button
            onClick={() => navigate("/signup")}
            className="bg-white text-emerald-700 font-black px-8 py-3 rounded-2xl hover:bg-gray-100 transition shadow-lg"
          >
            Join as Provider
          </button>
        </div>
      </div>

    </div>
  );
};

export default UserDashboard;