import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../Footer'
import heroImage from '../../assets/hero_worker.png'

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* ── Navigation ── */}
      <nav className="absolute top-0 right-0 left-0 z-50 flex items-center justify-between px-6 py-4 md:px-12">
        <div className="text-2xl font-bold tracking-tight">
          <span className="text-navy">Local</span>
          <span className="text-primary">Serv</span>
        </div>
        <div className="flex items-center gap-6">
          <Link to="/login" className="text-sm font-semibold text-navy hover:text-primary transition-colors">
            Log In
          </Link>
          <Link 
            to="/signup" 
            className="btn-primary py-2 px-6 rounded-lg text-sm"
          >
            Get Started
          </Link>
        </div>
      </nav>

      <main className="flex flex-col lg:flex-row min-h-screen">
        
        {/* ── Left Panel (Hero Content) ── */}
        <div className="relative flex flex-col justify-center w-full lg:w-1/2 p-8 md:p-12 lg:p-20 overflow-hidden bg-gradient-to-br from-[#F59E0B] to-[#10b981]">
          {/* Subtle overlay for better text contrast */}
          <div className="absolute inset-0 bg-black/10"></div>
          
          <div className="relative z-10 max-w-xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              Expert Local Services, <br /> 
              <span className="text-navy/90">Delivered to You</span>
            </h1>
            
            <p className="text-lg text-white/90 mb-10 leading-relaxed max-w-md">
              Find and book top-rated professionals for all your home needs. Verified, secure, and hassle-free.
            </p>

            {/* Service + Location Search */}
            <div className="flex flex-col sm:flex-row bg-white p-2 rounded-xl shadow-lg mb-10 gap-2">
              <div className="flex-1 relative flex items-center border-b sm:border-b-0 sm:border-r border-gray-100 px-4 py-3">
                <span className="text-gray-400 mr-2">🔍</span>
                <input 
                  type="text" 
                  placeholder="What service do you need?" 
                  className="w-full bg-transparent border-none outline-none text-sm font-medium focus:ring-0"
                />
              </div>
              <div className="flex-1 relative flex items-center px-4 py-3">
                <span className="text-gray-400 mr-2">📍</span>
                <input 
                  type="text" 
                  placeholder="Your Location" 
                  className="w-full bg-transparent border-none outline-none text-sm font-medium focus:ring-0"
                />
              </div>
              <button className="btn-primary py-3 px-8 text-sm whitespace-nowrap">
                Search
              </button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-6 mt-8">
              <div className="flex items-center gap-2 text-white/90 text-xs font-semibold uppercase tracking-wider">
                <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center text-[10px]">✓</div>
                Verified Pros
              </div>
              <div className="flex items-center gap-2 text-white/90 text-xs font-semibold uppercase tracking-wider">
                <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center text-[10px]">🔒</div>
                Secure Payments
              </div>
              <div className="flex items-center gap-2 text-white/90 text-xs font-semibold uppercase tracking-wider">
                <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center text-[10px]">★</div>
                Satisfaction Guaranteed
              </div>
            </div>
          </div>
        </div>

        {/* ── Right Panel (Visual Area) ── */}
        <div className="hidden lg:flex w-1/2 bg-gray-50 items-center justify-center p-12">
          <div className="relative w-full max-w-lg aspect-square">
            {/* Background design element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-white rounded-full shadow-2xl opacity-50 blur-3xl"></div>
            
            <img 
              src={heroImage}
              alt="Professional Service Provider" 
              className="relative z-10 w-full h-full object-contain filter drop-shadow-2xl hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

      </main>

      {/* ── Secondary Content (Optionally kept or simplified) ── */}
      <section className="bg-white py-20 px-8">
        <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-navy mb-12">Popular Services</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {['Plumbing', 'Electrical', 'Cleaning', 'Salon', 'Painting', 'Pest Control'].map((service) => (
                    <Link key={service} to="/login" className="p-6 rounded-xl bg-gray-50 hover:bg-white hover:shadow-xl hover:-translate-y-1 border border-gray-100 transition-all text-sm font-bold text-gray-700">
                        {service}
                    </Link>
                ))}
            </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}