import React from 'react'
import { Link } from 'react-router-dom'
import { FiTwitter, FiLinkedin, FiFacebook, FiInstagram, FiHeart, FiGlobe, FiShield, FiActivity } from 'react-icons/fi'

const Footer = () => {
  const footerLinks = {
    Platform: [
      { label: 'Marketplace', href: '/user/dashboard' },
      { label: 'Top Services', href: '/user/allservices' },
      { label: 'Register as Pro', href: '/signup' },
      { label: 'Enterprise', href: '#' },
    ],
    Company: [
      { label: 'About LocalServ', href: '#' },
      { label: 'Success Stories', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Careers', href: '#' },
    ],
    Support: [
      { label: 'Help Center', href: '#' },
      { label: 'Trust & Safety', href: '#' },
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
    ],
  }

  const socials = [
    { label: 'Twitter',   href: '#', icon: <FiTwitter /> },
    { label: 'LinkedIn',  href: '#', icon: <FiLinkedin /> },
    { label: 'Facebook',  href: '#', icon: <FiFacebook /> },
    { label: 'Instagram', href: '#', icon: <FiInstagram /> },
  ]

  return (
    <footer className="bg-[#1a1f2e] text-white overflow-hidden relative">
      
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/5 blur-[100px] rounded-full"></div>
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-500/5 blur-[100px] rounded-full"></div>

      <div className="max-w-7xl mx-auto px-10 pt-20 pb-10 relative z-10">
        
        {/* Upper Section: Brand + Links */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 mb-20">
          
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-8 text-center lg:text-left">
            <Link to="/" className="text-4xl font-black tracking-tighter inline-block">
                <span className="text-white">Local</span>
                <span className="text-[#F59E0B]">Serv</span>
            </Link>
            <p className="text-gray-400 font-medium leading-relaxed max-w-sm mx-auto lg:mx-0">
                Empowering communities by connecting local professionals with those who need them most. Built for reliability, speed, and absolute quality.
            </p>
            <div className="flex items-center justify-center lg:justify-start gap-4">
                {socials.map((s) => (
                    <a
                        key={s.label}
                        href={s.href}
                        className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 hover:bg-[#F59E0B] hover:text-white transition-all duration-300"
                    >
                        {s.icon}
                    </a>
                ))}
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-12 text-center sm:text-left">
            {Object.entries(footerLinks).map(([section, links]) => (
                <div key={section} className="space-y-6">
                    <h3 className="text-[10px] font-black uppercase tracking-[3px] text-gray-500">{section}</h3>
                    <ul className="space-y-4">
                        {links.map((link) => (
                            <li key={link.label}>
                                <Link
                                    to={link.href}
                                    className="text-sm font-bold text-gray-400 hover:text-white transition-colors flex items-center justify-center sm:justify-start gap-2 group"
                                >
                                    <span className="w-1 h-1 rounded-full bg-[#F59E0B] opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
          </div>
        </div>

        {/* Global Stats Footer */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-10 border-t border-white/5 mb-10">
            <FooterBadge icon={<FiGlobe />} label="50+ Cities" />
            <FooterBadge icon={<FiShield />} label="Verified Pros" />
            <FooterBadge icon={<FiHeart />} label="5 Star Reviews" />
            <FooterBadge icon={<FiActivity />} label="24/7 Support" />
        </div>

        {/* Lower Section: Real Copyright */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                &copy; 2026 LocalServ Platform. Engineering Excellence for Your Neighborhood.
            </p>
            <div className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white transition-colors cursor-default">
                Made with <FiHeart className="text-red-500 fill-red-500 animate-pulse" /> for Local Professionals
            </div>
        </div>
      </div>
    </footer>
  )
}

const FooterBadge = ({ icon, label }) => (
    <div className="flex items-center gap-3 justify-center md:justify-start py-2">
        <span className="text-xs text-[#F59E0B]">{icon}</span>
        <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">{label}</span>
    </div>
)

export default Footer