import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../../AuthProvider'
import { toast } from 'react-toastify'
import { Phone, Mail, ChevronDown, Send, HelpCircle } from 'lucide-react' // Optional: npm install lucide-react

export const Support = () => {
  const { userId } = useContext(AuthContext)
  const { register, handleSubmit, reset } = useForm()
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    { question: "How do I book a service?", answer: "Go to services page → select service → choose date & time → confirm booking." },
    { question: "How can I cancel or reschedule a booking?", answer: "Go to My Bookings → click cancel or reschedule option." },
    { question: "What payment methods are accepted?", answer: "We support UPI, Card, and Net Banking." },
    { question: "How do I become a service provider?", answer: "Click on 'Join as Provider' and complete registration." },
    { question: "What if I'm not satisfied?", answer: "Contact support within 48 hours. Refund or re-service will be provided." },
    { question: "How are providers verified?", answer: "All providers go through ID verification and background checks." }
  ]

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("/support/add", { ...data, userId })
      if (res.status === 201) {
        toast.success("Support request sent successfully")
        reset()
      }
    } catch (error) {
      toast.error("Failed to send request")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* HEADER */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Help Center</h1>
          <p className="mt-4 text-lg text-gray-600">Have questions? We're here to help you 24/7.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: CONTACT & FAQ */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* CONTACT CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
                <div className="bg-indigo-100 p-3 rounded-xl text-indigo-600">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Call Us</p>
                  <p className="text-base font-bold text-gray-900">+91 1800-123-4567</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
                <div className="bg-green-100 p-3 rounded-xl text-green-600">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Email Us</p>
                  <p className="text-base font-bold text-gray-900">support@localserve.com</p>
                </div>
              </div>
            </div>

            {/* FAQ SECTION */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-50">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <HelpCircle className="text-indigo-500" size={20} />
                  Frequently Asked Questions
                </h2>
              </div>
              <div className="divide-y divide-gray-100">
                {faqs.map((faq, index) => (
                  <div key={index} className="transition-all">
                    <button
                      onClick={() => setOpenIndex(openIndex === index ? null : index)}
                      className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-semibold text-gray-700">{faq.question}</span>
                      <ChevronDown 
                        size={18} 
                        className={`text-gray-400 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} 
                      />
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <p className="p-5 pt-0 text-gray-600 text-sm leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: CONTACT FORM */}
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 h-fit sticky top-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Send a Message</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                <input
                  {...register("name")}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                <input
                  {...register("email")}
                  type="email"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none"
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Subject</label>
                <input
                  {...register("subject")}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none"
                  placeholder="Booking Issue"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Message</label>
                <textarea
                  {...register("message")}
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none resize-none"
                  placeholder="How can we help?"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-indigo-100 transition-all flex items-center justify-center gap-2 group"
              >
                <span>Send Request</span>
                <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Support