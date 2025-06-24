"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Image from "next/image";
import AuthLoginButton from "./AuthLoginButton";
import { Eye, EyeOff } from "lucide-react";
import Loader from "./Loader";
import Modal from "./Modal";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const newErrors: typeof errors = {};
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.ok) {
        if (rememberMe) {
          localStorage.setItem("rememberedEmail", email);
        } else {
          localStorage.removeItem("rememberedEmail");
        }

        setShowModal(true); // Show success modal
      } else {
        setErrors({ password: "Invalid email or password" });
      }
    } catch (error) {
      console.error(error);
      setErrors({ password: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    router.push("/");
  };

  return (
    <div className="lg:w-[385px] lg:mt-0 mt-8 flex flex-col justify-center">
      <Modal
        show={showModal}
        onClose={closeModal}
        iconSrc="/Vector.svg"
        title="Login Successful!"
        description="You have successfully logged in. Redirecting to your dashboard..."
        buttonLabel="Okay"
      />

      <h2 className="text-[32px] text-[#FFFFFF] font-semibold mb-2">Sign In</h2>
      <p className="text-sm text-[#DADADA] font-normal mb-8">
        Manage your workspace seamlessly. Sign in to continue.
      </p>

      <form className="space-y-4" onSubmit={handleLogin}>
        {/* Email */}
        <div className="mb-8">
          <label htmlFor="email" className="block text-xs mb-1 text-[#FFFFFF]">
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
              <Image src="/Warning.svg" alt="warning" width={18} height={18} />
              {errors.email}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
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
              placeholder="********"
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
              <Image src="/Warning.svg" alt="warning" width={18} height={18} />
              {errors.password}
            </p>
          )}

          <div className="flex justify-between mt-2">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="remember"
                className="form-checkbox accent-purple-500 w-[18px] h-[18px] rounded-[2px]"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="remember" className="text-xs text-[#FFFFFF]">
                Remember me
              </label>
            </div>
            <div className="text-right mt-1">
              <Link
                href="/forgot-password"
                className="text-xs text-[#8854C0] font-semibold hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full h-[50px] bg-[#8854C0] hover:bg-purple-700 text-base text-white py-2 rounded-[10px] mt-8 font-semibold cursor-pointer"
        >
          Sign In
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
          Don’t have an account?{" "}
          <Link
            href="/signup"
            className="text-[#8854C0] font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}
