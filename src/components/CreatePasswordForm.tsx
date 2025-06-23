"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Loader from "./Loader";
import Modal from "./Modal";
import Image from "next/image";

export default function CreatePasswordForm() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState<{ password?: string; confirm?: string }>(
    {}
  );
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const [newPassword, setNewPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    const newErrors: typeof errors = {};

    if (!newPassword || newPassword.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!newPassword || !rePassword) {
      newErrors.confirm = "Please fill out both password fields";
    } else if (newPassword !== rePassword) {
      newErrors.confirm = "Oops! Passwords don’t match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        setShowModal(true);
      } else {
        setErrors({ confirm: data.error || "Failed to reset password" });
      }
    } catch (error) {
      console.error("Reset error:", error);
      setErrors({ confirm: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    router.push("/signin");
  };

  return (
    <div className="lg:w-[385px] lg:mt-0 mt-8 flex flex-col justify-center">
      <Modal
        show={showModal}
        onClose={closeModal}
        iconSrc="/Vector.svg"
        title="Password Created!"
        description="Your password has been successfully updated. You can now use your new password to log in."
        buttonLabel="Okay"
      />
      {loading && <Loader />}
      <h2 className="text-[32px] text-[#FFFFFF] font-semibold mb-2">
        Create New Password
      </h2>
      <p className="text-sm text-[#DADADA] font-normal mb-10">
        Choose a strong and secure password to keep your account safe. Make sure
        it’s easy for you to remember, but hard for others to guess!
      </p>

      <form className="space-y-4" onSubmit={handleReset}>
        {/* New Password */}
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
              type={passwordVisible ? "text" : "password"}
              placeholder="Workhiveadmin"
              className={`w-full px-4 py-2 bg-[#1D1E26] border ${
                errors.password ? "border-[#D33C43]" : "border-[#30303D]"
              } rounded-[10px] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 mt-2 text-sm font-semibold h-[50px]`}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setPasswordVisible((prev) => !prev)}
              className="absolute inset-y-0 right-3 flex items-center text-[#FFFFFF] cursor-pointer"
            >
              {passwordVisible ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-[#D33C43] text-xs mt-2 flex gap-2 items-center">
              <Image
                src="/Warning.svg"
                alt="modal icon"
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
            Re-enter your new password
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              type={confirmVisible ? "text" : "password"}
              placeholder="***************"
              className={`w-full px-4 py-2 bg-[#1D1E26] border ${
                errors.confirm ? "border-[#D33C43]" : "border-[#30303D]"
              } rounded-[10px] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 mt-2 text-sm font-semibold h-[50px]`}
              onChange={(e) => setRePassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setConfirmVisible((prev) => !prev)}
              className="absolute inset-y-0 right-3 flex items-center text-[#FFFFFF] cursor-pointer"
            >
              {confirmVisible ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>
          {errors.confirm && (
            <p className="text-[#D33C43] text-xs mt-2 flex gap-2 items-center">
              <Image
                src="/Warning.svg"
                alt="modal icon"
                width={18}
                height={18}
              />
              {errors.confirm}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full h-[50px] bg-[#8854C0] hover:bg-purple-700 text-base text-white py-2 rounded-[10px] mt-8 font-semibold cursor-pointer"
        >
          Update Password
        </button>
      </form>
    </div>
  );
}
