"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import AuthLoginButton from "./AuthLoginButton";
import { Eye, EyeOff } from "lucide-react";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  // Load remembered email on mount
  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Email and password are required");
      return;
    }
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (res?.ok) {
        toast.success("Login successful!");
        // Handle remember me
        if (rememberMe) {
          localStorage.setItem("rememberedEmail", email);
        } else {
          localStorage.removeItem("rememberedEmail");
        }
        setTimeout(() => {
          router.push("/"); // redirect manually
        }, 1000); // small delay so user can see the toast
      } else {
        toast.error("Invalid email or password");
      }
    } catch (error) {
      console.log("error:::", error);
    }
  };

  return (
    <div className="lg:w-1/2 w-full p-10 flex flex-col justify-center bg-[#1E1E24]">
      <h2 className="text-3xl font-bold mb-2">Sign In</h2>
      <p className="text-sm text-gray-400 mb-6">
        Manage your workspace seamlessly. Sign in to continue.
      </p>

      <form className="space-y-4" onSubmit={handleLogin}>
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
            value={email}
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
              placeholder="********"
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
          <div className="flex justify-between mt-2">
            {/* Remember me */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="remember"
                className="form-checkbox accent-purple-500"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="remember" className="text-sm">
                Remember me
              </label>
            </div>
            <div className="text-right mt-1">
              <Link
                href="/forgot-password"
                className="text-xs text-purple-400 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-[#8854C0] hover:bg-purple-700 text-white py-2 rounded-[10px] mt-6 font-medium cursor-pointer"
        >
          Sign In
        </button>

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-600"></div>
          <span className="mx-2 text-sm text-gray-400">or</span>
          <div className="flex-grow border-t border-gray-600"></div>
        </div>
        <AuthLoginButton />
        <p className="text-sm text-center mt-4 text-gray-400">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-purple-400 hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}
