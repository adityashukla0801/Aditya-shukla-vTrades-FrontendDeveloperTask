"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import AuthLoginButton from "./AuthLoginButton";
import { Eye, EyeOff } from "lucide-react";
import Loader from "./Loader";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // Start loader

    if (!email) {
      toast.error("Email is required");
      setLoading(false);
      return;
    }

    if (!password || password.length < 6) {
      toast.error("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res?.ok) {
        toast.success("Signup successful!");
        setTimeout(() => {
          router.push("/signin");
        }, 1000);
      } else {
        toast.error(data.message || "Signup failed");
      }
    } catch (error) {
      console.log("error::", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false); // Always stop loading at the end
    }
  };

  return (
    <div className="lg:w-1/2 w-full p-10 flex flex-col justify-center bg-[#1E1E24]">
      {loading && <Loader />}
      <h2 className="text-3xl font-bold mb-2">Sign Up</h2>
      <p className="text-sm text-gray-400 mb-6">
        Manage your workspace seamlessly. Create an account to continue.
      </p>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm mb-1">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="navinash@workhive.com"
            className="w-full px-4 py-2 bg-[#1D1E26] border border-[#30303D] rounded-[10px] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 mt-2"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm mb-1">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="***************"
              className="w-full px-4 py-2 bg-[#1D1E26] border border-[#30303D] rounded-[10px] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 mt-2"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-400 cursor-pointer"
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label htmlFor="confirmPassword" className="block text-sm mb-1">
            Confirm Password
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="***************"
              className="w-full px-4 py-2 bg-[#1D1E26] border border-[#30303D] rounded-[10px] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 mt-2"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-400 cursor-pointer"
            >
              {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-[#8854C0] hover:bg-purple-700 text-white py-2 rounded-[10px] mt-4 font-medium cursor-pointer"
        >
          Sign Up
        </button>

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-600"></div>
          <span className="mx-2 text-sm text-gray-400">or</span>
          <div className="flex-grow border-t border-gray-600"></div>
        </div>
        <AuthLoginButton />
        <p className="text-sm text-center mt-4 text-gray-400">
          Already have an account?{" "}
          <Link href="/signin" className="text-purple-400 hover:underline">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
}
