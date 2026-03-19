import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'





const BookServices = () => {
  const { register, handleSubmit, watch, setValue, formState: { errors,isSubmitSuccessful } } = useForm()
  const [selectedService, setSelectedService] = useState(null)
  const [selectedSlot, setSelectedSlot]       = useState(null)
  const [submitted, setSubmitted]             = useState(false)

  const watchDate = watch('preferredDate')

  const onServiceSelect = (svc) => {
    setSelectedService(svc)
    setValue('serviceType', svc.value)
  }

  const onSlotSelect = (slot) => {
    setSelectedSlot(slot)
    setValue('preferredTime', slot)
  }

  const submitHandler =async (data) => {
    // console.log(data)
    // setSubmitted(true)
    try {
      const res= await axios.post("/bookings/create",data);
      if(res.status===201){
        toast.success("Service booked successfully!")
        setSubmitted(true)
      }

    } catch (err) {
      console.log(err)
     toast.error("Failed to book service. Please try again.")
    }  
    
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-md p-10 max-w-sm w-full text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
          <p className="text-sm text-gray-500 mb-6">
            Your <span className="font-semibold text-indigo-600">{selectedService?.label}</span> service
            has been booked for <span className="font-semibold text-gray-700">{watchDate}</span> at{' '}
            <span className="font-semibold text-gray-700">{selectedSlot}</span>.
          </p>
          <button
            onClick={() => { setSubmitted(false); setSelectedService(null); setSelectedSlot(null) }}
            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-lg transition-colors duration-200"
          >
            Book Another Service
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Header ── */}
      <div className="bg-gradient-to-r from-gray-900 via-indigo-900 to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white mb-2">Book a Service</h1>
          <p className="text-gray-300 text-sm sm:text-base">
            Choose a service, pick a time, and we'll handle the rest.
          </p>
        </div>
      </div>

      {/* ── Form ── */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <form onSubmit={handleSubmit(submitHandler)} className="space-y-8">

          {/* Step 1 — Service Type */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-7 h-7 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center shrink-0">1</span>
              <h2 className="text-base font-bold text-gray-900">Select a Service</h2>
            </div>

            <input type="hidden" {...register('serviceType', { required: 'Please select a service' })} />
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {services.map((svc) => (
                <button
                  type="button"
                  key={svc.value}
                  onClick={() => onServiceSelect(svc)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 text-sm font-medium transition-all duration-200
                    ${selectedService?.value === svc.value
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-sm'
                      : 'border-gray-200 text-gray-600 hover:border-indigo-300 hover:text-indigo-600'
                    }`}
                >
                  <span className={selectedService?.value === svc.value ? 'text-indigo-600' : 'text-gray-400'}>
                    {svc.icon}
                  </span>
                  <span>{svc.label}</span>
                  <span className={`text-xs font-semibold ${selectedService?.value === svc.value ? 'text-indigo-500' : 'text-gray-400'}`}>
                    {svc.price}
                  </span>
                </button>
              ))}
            </div>
            {errors.serviceType && (
              <p className="mt-2 text-xs text-red-500">{errors.serviceType.message}</p>
            )}
          </div>

          {/* Step 2 — Date & Time */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-7 h-7 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center shrink-0">2</span>
              <h2 className="text-base font-bold text-gray-900">Choose Date & Time</h2>
            </div>

            {/* Date picker */}
            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Preferred Date
              </label>
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <input
                  type="date"
                  {...register('preferredDate', { required: 'Please select a date' })}
                  className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                />
              </div>
              {errors.preferredDate && (
                <p className="mt-1 text-xs text-red-500">{errors.preferredDate.message}</p>
              )}
            </div>

            {/* Time slots */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Preferred Time Slot
              </label>
              <input type="hidden" {...register('preferredTime', { required: 'Please select a time slot' })} />
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {timeSlots.map((slot) => (
                  <button
                    type="button"
                    key={slot}
                    onClick={() => onSlotSelect(slot)}
                    className={`py-2 px-2 rounded-lg text-xs font-medium border transition-all duration-200
                      ${selectedSlot === slot
                        ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm'
                        : 'bg-white border-gray-200 text-gray-600 hover:border-indigo-300 hover:text-indigo-600'
                      }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
              {errors.preferredTime && (
                <p className="mt-2 text-xs text-red-500">{errors.preferredTime.message}</p>
              )}
            </div>
          </div>

          {/* Step 3 — Notes */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-7 h-7 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center shrink-0">3</span>
              <h2 className="text-base font-bold text-gray-900">Additional Notes</h2>
            </div>
            <textarea
              {...register('additionalNotes')}
              rows={4}
              placeholder="Any specific requirements or details about the job..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none"
            />
          </div>

          {/* Summary + Submit */}
          {(selectedService || watchDate || selectedSlot) && (
            <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-sm text-indigo-800 space-y-1">
                {selectedService && (
                  <p><span className="font-semibold">Service:</span> {selectedService.label} — {selectedService.price}</p>
                )}
                {watchDate && (
                  <p><span className="font-semibold">Date:</span> {watchDate}</p>
                )}
                {selectedSlot && (
                  <p><span className="font-semibold">Time:</span> {selectedSlot}</p>
                )}
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl shadow-md transition-colors duration-200 text-sm"
          >
            Confirm Booking
          </button>

        </form>
      </div>
    </div>
  )
}

export default BookServices