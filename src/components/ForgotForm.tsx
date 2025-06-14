// app/forgot-password/page.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import OtpInput from "./OtpInput";

export default function ForgotForm() {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState("send");
  const [otp, setOtp] = useState("");
  const router = useRouter();

  const sendOtp = async () => {
    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    if (res.ok) {
      setStep("verify");
      toast.success(data.message);
    } else toast.error(data.error);
  };

  const verifyOtp = async () => {
    const res = await fetch("/api/auth/verify-otp", {
      method: "POST",
      body: JSON.stringify({ email, otp }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    if (res.ok) {
      toast.success(data.message);
      setTimeout(() => {
        router.push(`/new-password?email=${encodeURIComponent(data.email)}`);
      }, 1000);
    } else toast.error(data.error);
  };

  return (
    <div className="lg:w-1/2 w-full p-10 flex flex-col justify-center bg-[#1E1E24]">
      {step === "send" ? (
        <>
          <h2 className="text-3xl font-bold mb-2">Forgot Your Password?</h2>
          <p className="text-sm text-gray-400 mb-6">
            Don’t worry! Enter your email address, and we’ll send you a link to
            reset it.
          </p>

          <div className="space-y-4">
            {/* Email */}
            <div>
              <label htmlFor="forgot-email" className="block text-sm mb-1">
                Email Address
              </label>
              <input
                id="forgot-email"
                type="email"
                placeholder="navinash@workhive.com"
                className="w-full px-4 py-2 bg-[#1D1E26] border border-[#30303D] rounded-[10px] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 mt-2"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Submit */}
            <button
              onClick={sendOtp}
              type="submit"
              className="w-full bg-[#8854C0] hover:bg-purple-700 text-white py-2 rounded-[10px] mt-6 font-medium cursor-pointer"
            >
              Submit
            </button>

            {/* Back to sign in */}
            <p className="text-sm mt-4 text-center text-gray-400">
              Remembered your password?{" "}
              <Link
                href="/signin"
                className="text-xs text-purple-400 hover:underline"
              >
                Back to Sign In
              </Link>
            </p>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-3xl font-bold mb-2">Enter OTP</h2>
          <p className="text-sm text-gray-400 mb-6">
            Enter the OTP that we have sent to your email address
            {email}
          </p>
          <div
            onClick={() => setStep("send")}
            className="text-xs text-purple-400 hover:underline mb-4 cursor-pointer"
          >
            Change Email Address
          </div>

          <OtpInput onComplete={(value) => setOtp(value)} />
          <button
            onClick={verifyOtp}
            type="submit"
            className="w-full bg-[#8854C0] hover:bg-purple-700 text-white py-2 rounded-[10px] mt-6 font-medium cursor-pointer"
          >
            Continue
          </button>
        </>
      )}
    </div>
  );
}
