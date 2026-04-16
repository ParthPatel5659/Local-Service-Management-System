import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthProvider";
import { FiSearch, FiArrowRight } from "react-icons/fi";

const UserDashboard = () => {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);
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

  const getUser = async () => {
    try {
        const res = await axios.get(`/user/profile/${userId}`);
        setUser(res.data.data);
    } catch (error) {
        console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
    if(userId) getUser();
  }, [userId]);

  return (
    <div className="bg-[#f9fafb] min-h-screen">
      
      {/* ── Welcome Header ── */}
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-black text-[#1a1f2e] tracking-tight">
          Welcome back, <span className="text-[#F59E0B]">{user?.Firstname || "Friend"}!</span>
        </h1>
        <p className="text-gray-500 mt-2 font-medium">What can we help you with today?</p>
      </div>

      {/* ── Search Section ── */}
      <div className="relative mb-16">
        <div className="flex bg-white rounded-2xl p-2 shadow-xl shadow-gray-200/50 border border-gray-100 items-center max-w-3xl focus-within:ring-2 focus-within:ring-[#F59E0B]/20 transition-all">
          <div className="pl-5 text-gray-400">
            <FiSearch size={22} />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for plumbing, cleaning, or any service..."
            className="flex-1 px-4 py-5 text-gray-700 outline-none text-lg bg-transparent font-medium placeholder-gray-400"
          />
          <button 
            onClick={() => navigate(`/user/services?search=${search}`)}
            className="bg-[#F59E0B] hover:bg-[#D97706] text-white px-10 py-5 rounded-2xl font-bold transition-all shadow-lg shadow-orange-100 flex items-center gap-2"
          >
            Search
          </button>
        </div>
      </div>

      {/* ── Categories Grid ── */}
      <div className="mb-20">
        <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-[#1a1f2e]">Our Services</h2>
            <button onClick={() => navigate("/user/services")} className="text-[#F59E0B] font-bold text-sm flex items-center gap-1 hover:underline">
                View All <FiArrowRight />
            </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {categories.map((cat) => (
            <div
              key={cat._id}
              onClick={() => navigate(`/user/services/${cat._id}`)}
              className="group bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-orange-100 cursor-pointer transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-gray-50 text-gray-700 flex items-center justify-center text-3xl mb-4 group-hover:bg-orange-50 group-hover:text-orange-600 transition-colors">
                {cat.icon || "🛠️"}
              </div>
              <h3 className="font-bold text-gray-800 text-sm group-hover:text-orange-600 transition-colors">
                {cat.categoryName}
              </h3>
            </div>
          ))}
        </div>
      </div>

      {/* ── Feature Cards ── */}
      <div className="grid md:grid-cols-3 gap-8 mb-20">
        {[
            { title: "Verified Professionals", desc: "Every pro on LocalServ is background checked and verified for your safety.", icon: "🛡️" },
            { title: "Upfront Pricing", desc: "No hidden costs. See prices clearly and pay securely through the platform.", icon: "💳" },
            { title: "Satisfaction Guarantee", desc: "Your happiness is our priority. Not satisfied? We'll make it right.", icon: "✨" }
        ].map((item, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="font-black text-[#1a1f2e] text-lg mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
        ))}
      </div>

      {/* ── Promotion UI ── */}
      <div className="relative rounded-3xl overflow-hidden bg-[#1a1f2e] p-12 md:p-16 text-white min-h-[400px] flex flex-col justify-center">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#F59E0B]/10 blur-[100px]"></div>
        <div className="relative z-10 max-w-xl">
            <span className="text-[#F59E0B] font-black text-xs uppercase tracking-[3px] mb-4 block">Limited Offer</span>
            <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">Get 20% off your first <br /><span className="text-[#F59E0B]">Cleaning Service</span></h2>
            <p className="text-gray-400 text-lg mb-10 leading-relaxed font-medium">Use code <span className="text-white border-b-2 border-dashed border-[#F59E0B] px-1">FIRST20</span> at checkout to claim your professional home cleaning discount.</p>
            <button 
                onClick={() => navigate("/user/services")}
                className="bg-[#F59E0B] hover:bg-[#D97706] text-white px-10 py-4 rounded-xl font-bold transition-all shadow-lg"
            >
                Book a Cleaning
            </button>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;