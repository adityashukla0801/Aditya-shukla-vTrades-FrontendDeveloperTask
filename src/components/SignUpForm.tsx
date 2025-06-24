"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthLoginButton from "./AuthLoginButton";
import { Eye, EyeOff } from "lucide-react";
import Loader from "./Loader";
import Modal from "./Modal";
import Image from "next/image";
import VerifyOtp from "./VerifyOtp";
import { div } from "framer-motion/client";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const [step, setStep] = useState("form");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrors({}); // Reset previous errors

    const newErrors: typeof errors = {};
    if (!email) newErrors.email = "Email is required";
    if (!password || password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        const response = await fetch("/api/auth/forgot-password", {
          method: "POST",
          body: JSON.stringify({ email }),
          headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
          setShowModal(true); // Show success modal
        }
      } else {
        setErrors({ email: data.message || "Signup failed" });
      }
    } catch (error) {
      console.error(error);
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
            Sign Up
          </h2>
          <p className="text-sm text-[#DADADA] font-normal mb-8">
            Manage your workspace seamlessly. Sign up to continue.
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-8">
              <label
                htmlFor="email"
                className="block text-xs mb-1 text-[#FFFFFF]"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="navinash@workhive.com"
                className={`w-full px-4 py-2 bg-[#1D1E26] border ${
                  errors.email ? "border-red-500" : "border-[#30303D]"
                } rounded-[10px] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 mt-2 text-sm font-semibold h-[50px]`}
                value={email}
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

            {/* Password */}
            <div className="mb-8">
              <label
                htmlFor="password"
                className="block text-xs mb-1 text-[#FFFFFF]"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="***************"
                  className={`w-full px-4 py-2 bg-[#1D1E26] border ${
                    errors.password ? "border-red-500" : "border-[#30303D]"
                  } rounded-[10px] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 mt-2 text-sm font-semibold h-[50px]`}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-3 flex items-center text-[#FFFFFF] cursor-pointer"
                >
                  {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-[#D33C43] text-xs mt-2 flex gap-2 items-center">
                  <Image
                    src="/Warning.svg"
                    alt="warning"
                    width={18}
                    height={18}
                  />
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-xs mb-1 text-[#FFFFFF]"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="***************"
                  className={`w-full px-4 py-2 bg-[#1D1E26] border ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-[#30303D]"
                  } rounded-[10px] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 mt-2 text-sm font-semibold h-[50px]`}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-3 flex items-center text-[#FFFFFF] cursor-pointer"
                >
                  {showConfirmPassword ? (
                    <Eye size={20} />
                  ) : (
                    <EyeOff size={20} />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-[#D33C43] text-xs mt-2 flex gap-2 items-center">
                  <Image
                    src="/Warning.svg"
                    alt="warning"
                    width={18}
                    height={18}
                  />
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full h-[50px] bg-[#8854C0] hover:bg-purple-700 text-base text-white py-2 rounded-[10px] mt-8 font-semibold cursor-pointer"
            >
              Sign Up
            </button>
            {loading && (
              <div className="flex items-center justify-center">
                <Loader />
              </div>
            )}

            {/* Divider */}
            <div className="flex items-center my-8">
              <div className="flex-grow border-t border-[#272727]"></div>
              <span className="mx-2 text-sm text-white">or</span>
              <div className="flex-grow border-t border-[#272727]"></div>
            </div>

            <AuthLoginButton />
            <p className="text-xs text-center mt-4 text-[#DADADA]">
              Already have an account?{" "}
              <Link
                href="/signin"
                className="text-[#8854C0] font-semibold hover:underline"
              >
                Sign In
              </Link>
            </p>
          </form>
        </>
      ) : (
        <VerifyOtp
          email={email}
          setStep={setStep}
          onSuccess={() => router.push(`/signin`)}
          onResend={async () => {
            setLoading(true);
            try {
              const res = await fetch("/api/auth/forgot-password", {
                method: "POST",
                body: JSON.stringify({ email }),
                headers: { "Content-Type": "application/json" },
              });
              if (res.ok) {
                setShowModal(true);
              }
            } catch {
              setLoading(false);
            } finally {
              setLoading(false);
            }
          }}
        />
      )}
    </div>
  );
}
