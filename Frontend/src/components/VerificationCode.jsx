import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export const VerificationCode = () => {

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
    // console.log("Generated OTP:", newCode);

    alert(`Otp ${newCode}`)
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

  // Submit
  const submithandler = (data) => {

    const userOtp = data.code.join("");

    if (userOtp === generatedOtp) {
     toast.success("OTP verified successfully!");
    } else {
     toast.error("Invalid OTP. Please try again.");
    }

    console.log("User OTP:", userOtp);
  };

  const handleResend = () => {
    generateCode();
    setTimer(60);
    toast.info("A new OTP has been sent to your email.");
    setFocus("code.0");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white shadow-lg rounded-xl p-8 w-[400px]">

        <h1 className="text-2xl font-bold text-center mb-2">
          Verification Code
        </h1>

        <p className="text-gray-500 text-center mb-6 text-sm">
          We just sent you a verification code. Check your inbox.
        </p>

        <form onSubmit={handleSubmit(submithandler)} className="space-y-4">

          {/* OTP INPUTS */}

          <div className="flex justify-center gap-3">

            {[0,1,2,3].map((index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                className="w-12 h-12 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                {...register(`code.${index}`, {
                  required: "Required",
                  pattern: {
                    value: /^[0-9]$/,
                    message: "Only numbers"
                  }
                })}
                onChange={(e) =>
                  handleInputChange(index, e.target.value)
                }
              />
            ))}

          </div>

          {errors.code && (
            <p className="text-red-500 text-sm text-center">
              Please enter all 4 digits
            </p>
          )}

          {/* TIMER */}

          <div className="text-center text-sm text-gray-500">
            {timer > 0 ? (
              <p>Resend code in {timer}s</p>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                className="text-blue-600 hover:underline"
              >
                Resend Code
              </button>
            )}
          </div>

          {/* BUTTON */}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Continue
          </button>

          {/* EDIT EMAIL */}

          <div className="text-center text-sm">
            Change your email?{" "}
            <Link
              to="/signup"
              className="text-blue-600 hover:underline"
            >
              Edit
            </Link>
          </div>

        </form>

      </div>
    </div>
  );
};