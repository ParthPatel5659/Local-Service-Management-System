import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../../AuthProvider'
import { toast } from 'react-toastify'
import { FiPhone, FiMail, FiChevronDown, FiSend, FiHelpCircle, FiActivity, FiGlobe } from 'react-icons/fi'

export const Support = () => {
  const { userId } = useContext(AuthContext)
  const { register, handleSubmit, reset } = useForm()
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    { question: "How do I book a service?", answer: "Navigate to the marketplace, select your desired professional service, choose a convenient date and time slot, and confirm your request." },
    { question: "How can I cancel or reschedule a booking?", answer: "Visit 'My Bookings' in your dashboard. You can modify or cancel any pending or accepted requests from there." },
    { question: "What payment methods are accepted?", answer: "We support all major payment gateways including UPI, Credit/Debit cards, and Net Banking for secure transactions." },
    { question: "How do I become a service provider?", answer: "Click 'Register as Pro' in the navigational menu, complete your business profile, and wait for our verification team to approve your credentials." },
    { question: "What if I'm not satisfied with a service?", answer: "Our Satisfaction Guarantee ensures quality. If you have any issues, raise a ticket within 48 hours and we will facilitate a resolution." }
  ]

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("/support/add", { ...data, userId })
      if (res.status === 201) {
        toast.success("Support ticket dispatched. We'll reach out shortly.");
        reset()
      }
    } catch (error) {
      toast.error("Failed to connect to support nodes. Please try again.")
    }
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-6">
      
      {/* ── Page Header ── */}
      <div className="text-center mb-20">
          <h1 className="text-5xl font-black text-[#1a1f2e] tracking-tight mb-4">Resolution Center</h1>
          <p className="text-gray-500 font-medium max-w-2xl mx-auto text-lg">Looking for answers? Our concierge team is standing by to assist your journey on LocalServ.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* ── Left Side: Knowledge & Contacts ── */}
        <div className="lg:col-span-7 space-y-12">
            
            {/* Quick Contacts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <ContactCard 
                    icon={<FiPhone size={24} />} 
                    label="Voice Support" 
                    value="+91 1800-419-0000" 
                    theme="bg-blue-50 text-blue-600 border-blue-100"
                />
                <ContactCard 
                    icon={<FiMail size={24} />} 
                    label="Official Correspondence" 
                    value="connect@localserv.com" 
                    theme="bg-orange-50 text-[#F59E0B] border-orange-100"
                />
            </div>

            {/* FAQ Accordion */}
            <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-10 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
                    <h2 className="text-2xl font-black text-[#1a1f2e] flex items-center gap-3">
                        <FiHelpCircle className="text-[#F59E0B]" /> Standard Knowledge Base
                    </h2>
                    <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest bg-white px-4 py-1.5 rounded-xl border border-gray-100 shadow-sm">Updated Today</span>
                </div>
                <div className="divide-y divide-gray-50">
                    {faqs.map((faq, index) => (
                        <div key={index} className="group">
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-8 text-left hover:bg-gray-50/50 transition-all"
                            >
                                <span className={`text-lg font-bold transition-colors ${openIndex === index ? 'text-[#F59E0B]' : 'text-gray-700 hover:text-[#1a1f2e]'}`}>{faq.question}</span>
                                <FiChevronDown 
                                    size={20} 
                                    className={`text-gray-300 transition-transform duration-500 ${openIndex === index ? 'rotate-180 text-[#F59E0B]' : 'group-hover:text-gray-500'}`} 
                                />
                            </button>
                            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <p className="px-10 pb-10 text-gray-500 font-medium leading-relaxed italic border-l-4 border-[#F59E0B] ml-8 mb-4">
                                    "{faq.answer}"
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Social Trust Line */}
            <div className="flex items-center gap-6 p-8 bg-[#1a1f2e] rounded-[2.5rem] text-white overflow-hidden relative group">
                <div className="absolute top-0 right-0 w-32 h-full bg-[#F59E0B]/10 skew-x-12 translate-x-10"></div>
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-[#F59E0B] text-2xl group-hover:scale-110 transition-transform">
                    <FiGlobe />
                </div>
                <div>
                    <h4 className="font-black text-xl mb-1">Join the LocalServ Ecosystem</h4>
                    <p className="text-gray-400 text-sm font-medium">Connect with millions of verified professionals worldwide.</p>
                </div>
            </div>
        </div>

        {/* ── Right Side: Discourse Form ── */}
        <div className="lg:col-span-5">
            <div className="bg-white p-10 rounded-[3rem] shadow-2xl shadow-gray-200/50 border border-gray-100 sticky top-10">
                <div className="mb-10">
                    <h2 className="text-3xl font-black text-[#1a1f2e] tracking-tight mb-2">Message Center</h2>
                    <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Direct line to management</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-[2px] ml-1">Identity Label</label>
                        <input
                            {...register("name")}
                            className="w-full px-6 py-4 rounded-2xl bg-[#f9fafb] border border-gray-100 focus:bg-white focus:border-[#F59E0B] outline-none transition-all font-bold text-[#1a1f2e] placeholder-gray-300 shadow-inner"
                            placeholder="Full Name"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-[2px] ml-1">Digital Correspondence</label>
                        <input
                            {...register("email")}
                            type="email"
                            className="w-full px-6 py-4 rounded-2xl bg-[#f9fafb] border border-gray-100 focus:bg-white focus:border-[#F59E0B] outline-none transition-all font-bold text-[#1a1f2e] placeholder-gray-300 shadow-inner"
                            placeholder="Email Address"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-[2px] ml-1">Context / Subject</label>
                        <input
                            {...register("subject")}
                            className="w-full px-6 py-4 rounded-2xl bg-[#f9fafb] border border-gray-100 focus:bg-white focus:border-[#F59E0B] outline-none transition-all font-bold text-[#1a1f2e] placeholder-gray-300 shadow-inner"
                            placeholder="What can we solve?"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-[2px] ml-1">Detail Narrative</label>
                        <textarea
                            {...register("message")}
                            rows={5}
                            className="w-full px-6 py-4 rounded-2xl bg-[#f9fafb] border border-gray-100 focus:bg-white focus:border-[#F59E0B] outline-none transition-all font-medium text-gray-600 leading-relaxed shadow-inner resize-none placeholder-gray-300"
                            placeholder="Provide any relevant details..."
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#1a1f2e] hover:bg-[#F59E0B] text-white font-black py-5 rounded-2xl shadow-xl shadow-gray-100 transition-all flex items-center justify-center gap-3 active:scale-[0.98] uppercase tracking-widest text-xs"
                    >
                        Dispatch Ticket <FiSend />
                    </button>
                    
                    <div className="flex items-center gap-3 justify-center text-gray-300 text-[10px] font-black uppercase tracking-widest pt-4">
                        <FiActivity className="text-[#F59E0B]" /> Response within 4-6 hours
                    </div>
                </form>
            </div>
        </div>
      </div>
    </div>
  )
}

const ContactCard = ({ icon, label, value, theme }) => (
    <div className={`p-8 rounded-[2.5rem] border flex items-center gap-6 shadow-sm hover:shadow-xl transition-all group ${theme}`}>
        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
            {icon}
        </div>
        <div>
            <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">{label}</p>
            <p className="text-sm font-black tracking-tight">{value}</p>
        </div>
    </div>
)

export default Support