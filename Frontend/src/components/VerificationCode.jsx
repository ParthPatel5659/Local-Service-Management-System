import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FiShield, FiArrowLeft, FiClock, FiRefreshCw, FiCheck } from "react-icons/fi";

export const VerificationCode = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm();

  const [generatedOtp, setGeneratedOtp] = useState("");
  const [timer, setTimer] = useState(60);

  // Generate OTP
  const generateCode = () => {
    const newCode = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(newCode);
    alert(`LocalServ Verification Code: ${newCode}`);
  };

  // Timer
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  // Initial setup
  useEffect(() => {
    generateCode();
    setFocus("code.0");
  }, []);

  // Handle OTP input
  const handleInputChange = (index, value) => {
    if (/^\d*$/.test(value)) {
      if (value && index < 3) {
        setFocus(`code.${index + 1}`);
      }
    }
  };

  const submithandler = (data) => {
    const userOtp = data.code.join("");
    if (userOtp === generatedOtp) {
      toast.success("Identity verified successfully!");
      navigate("/user/home"); // Or wherever appropriate
    } else {
      toast.error("Invalid verification code. Please check again.");
    }
  };

  const handleResend = () => {
    generateCode();
    setTimer(60);
    toast.info("A new security code has been dispatched.");
    setFocus("code.0");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-sm">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
            <div className="text-3xl font-black tracking-tighter">
                <span className="text-[#1a1f2e]">Local</span>
                <span className="text-[#F59E0B]">Serv</span>
            </div>
        </div>

        {/* Verification Card */}
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
          <div className="p-10 text-center">
            
            <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center text-[#F59E0B] mx-auto mb-6 shadow-inner border border-orange-100">
                <FiShield size={32} />
            </div>

            <h1 className="text-2xl font-black text-[#1a1f2e] mb-2">Secure Verification</h1>
            <p className="text-gray-500 font-medium text-sm leading-relaxed mb-10 px-4">
                We've sent a 4-digit security code to your registered device.
            </p>

            <form onSubmit={handleSubmit(submithandler)} className="space-y-8">
              
              {/* Digit Inputs */}
              <div className="flex justify-center gap-4">
                {[0, 1, 2, 3].map((index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    autoComplete="off"
                    className="w-14 h-16 text-center text-2xl font-black bg-[#f9fafb] border border-gray-100 rounded-2xl outline-none focus:bg-white focus:border-[#F59E0B] focus:ring-4 focus:ring-orange-50 transition-all text-[#1a1f2e] shadow-inner"
                    {...register(`code.${index}`, {
                      required: true,
                      pattern: /^[0-9]$/
                    })}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                  />
                ))}
              </div>

              {/* Status/Timer */}
              <div className="flex items-center justify-center gap-2">
                {timer > 0 ? (
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-400 tracking-widest">
                    <FiClock className="text-[#F59E0B]" /> Resend in {timer}s
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleResend}
                    className="flex items-center gap-2 text-[10px] font-black uppercase text-[#F59E0B] tracking-widest hover:underline"
                  >
                    <FiRefreshCw /> Request New Code
                  </button>
                )}
              </div>

              {/* Action Button */}
              <button
                type="submit"
                className="w-full bg-[#1a1f2e] hover:bg-[#F59E0B] text-white font-black py-5 rounded-2xl shadow-xl shadow-gray-100 transition-all flex items-center justify-center gap-3 active:scale-[0.98] uppercase tracking-widest text-xs"
              >
                Verify Identity <FiCheck size={18} />
              </button>

              <Link to="/signup" className="flex items-center justify-center gap-2 text-[10px] font-black uppercase text-gray-400 hover:text-[#1a1f2e] tracking-widest transition-all">
                <FiArrowLeft /> Edit Registration Email
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationCode;