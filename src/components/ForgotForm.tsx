"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Loader from "./Loader";
import Image from "next/image";
import Modal from "./Modal";
import VerifyOtp from "./VerifyOtp";

export default function ForgotForm() {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState("form");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; otp?: string }>({});
  const router = useRouter();

  const sendOtp = async () => {
    setErrors({});
    if (!email) {
      setErrors({ email: "Email is required" });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (res.ok) {
        setShowModal(true);
      } else {
        setErrors({ email: data.error || "Failed to send OTP" });
      }
    } catch {
      setErrors({ email: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setStep("verify");
  };

  return (
    <div className="lg:w-[385px] lg:mt-0 mt-8 flex flex-col justify-center">
      <Modal
        show={showModal}
        onClose={closeModal}
        iconSrc="/Frame.svg"
        title="Link Sent Successfully!"
        description="Check your inbox! We’ve sent you an email with instructions to reset your password."
        buttonLabel="Okay"
      />

      {step === "form" ? (
        <>
          <h2 className="text-[32px] text-[#FFFFFF] font-semibold mb-2">
            Forgot Your Password?
          </h2>
          <p className="text-sm text-[#DADADA] font-normal mb-10">
            Don’t worry! Enter your email address, and we’ll send you a link to
            reset it.
          </p>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="forgot-email"
                className="block text-xs mb-1 text-[#FFFFFF]"
              >
                Email Address
              </label>
              <input
                id="forgot-email"
                type="email"
                placeholder="navinash@workhive.com"
                value={email}
                className={`w-full px-4 py-2 bg-[#1D1E26] border ${
                  errors.email ? "border-[#D33C43]" : "border-[#30303D]"
                } rounded-[10px] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 mt-2 text-sm font-semibold h-[50px]`}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <p className="text-[#D33C43] text-xs mt-2 flex gap-2 items-center">
                  <Image
                    src="/Warning.svg"
                    alt="warning"
                    width={18}
                    height={18}
                  />
                  {errors.email}
                </p>
              )}
            </div>

            <button
              onClick={sendOtp}
              type="button"
              className="w-full h-[50px] bg-[#8854C0] hover:bg-purple-700 text-base text-white py-2 rounded-[10px] mt-8 font-semibold cursor-pointer"
            >
              Submit
            </button>
            {loading && (
              <div className="flex items-center justify-center">
                <Loader />
              </div>
            )}

            <p className="text-xs text-center mt-4 text-[#DADADA]">
              Remembered your password?{" "}
              <Link
                href="/signin"
                className="text-[#8854C0] font-semibold hover:underline"
              >
                Back to Sign In
              </Link>
            </p>
          </div>
        </>
      ) : (
        <VerifyOtp
          email={email}
          setStep={setStep}
          onSuccess={(verifiedEmail) =>
            router.push(
              `/new-password?email=${encodeURIComponent(verifiedEmail)}`
            )
          }
          onResend={sendOtp}
        />
      )}
    </div>
  );
}
