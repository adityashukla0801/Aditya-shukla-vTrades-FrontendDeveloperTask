"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";

export default function CreatePasswordForm() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const [newPassword, setNewPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newPassword || newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (!newPassword || !rePassword) {
      toast.error("Please fill out both password fields");
      return;
    }

    if (newPassword !== rePassword) {
      toast.error("Passwords do not match");
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
        toast.success(data.message || "Password updated successfully!");
        router.push("/signin");
      } else {
        toast.error(data.error || "Failed to reset password");
      }
    } catch (error) {
      console.error("Reset error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="lg:w-1/2 w-full p-10 flex flex-col justify-center bg-[#1E1E24]">
      <h2 className="text-3xl font-bold mb-2">Create New Password</h2>
      <p className="text-sm text-gray-400 mb-6">
        Choose a strong and secure password to keep your account safe. Make sure
        it’s easy for you to remember, but hard for others to guess!
      </p>

      <form className="space-y-4" onSubmit={handleReset}>
        {/* New Password */}
        <div>
          <label htmlFor="password" className="block text-sm mb-1">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={passwordVisible ? "text" : "password"}
              placeholder="Workhiveadmin"
              className="w-full px-4 py-2 bg-[#1D1E26] border border-[#30303D] rounded-[10px] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 mt-2"
              required
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setPasswordVisible((prev) => !prev)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-400 cursor-pointer"
            >
              {passwordVisible ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label htmlFor="confirmPassword" className="block text-sm mb-1">
            Re-enter your new password
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              type={confirmVisible ? "text" : "password"}
              placeholder="***************"
              className="w-full px-4 py-2 bg-[#1D1E26] border border-[#30303D] rounded-[10px] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 mt-2"
              required
              onChange={(e) => setRePassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setConfirmVisible((prev) => !prev)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-400 cursor-pointer"
            >
              {confirmVisible ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-[#8854C0] hover:bg-purple-700 text-white py-2 rounded-[10px] mt-6 font-medium cursor-pointer"
        >
          Update Password
        </button>
      </form>
    </div>
  );
}
