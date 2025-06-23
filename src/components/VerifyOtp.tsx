import { useEffect, useState } from "react";
import Image from "next/image";
import OtpInput from "./OtpInput";
import Loader from "./Loader";

interface VerifyOtpProps {
  email: string;
  setStep: (step: string) => void;
  onSuccess: (email: string) => void;
  onResend?: () => void;
}

export default function VerifyOtp({
  email,
  setStep,
  onSuccess,
  onResend,
}: VerifyOtpProps) {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const [error, setError] = useState<string | null>(null);

  const verifyOtp = async () => {
    setError(null);
    if (!otp || otp.length !== 6) {
      setError("OTP must be 6 digits");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        body: JSON.stringify({ email, otp }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (res.ok) {
        onSuccess(data.email);
      } else {
        setError(data.error || "Invalid OTP");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    if (onResend) {
      await onResend();
    }
    setTimer(30);
  };

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  return (
    <div>
      {loading && <Loader />}
      <h2 className="text-[32px] text-[#FFFFFF] font-semibold mb-2">
        Enter OTP
      </h2>
      <p className="text-sm text-[#DADADA] font-normal mb-10">
        Enter the OTP that we have sent to your email address {email}
      </p>
      <div
        onClick={() => setStep("form")}
        className="text-base text-[#8854C0] font-normal hover:underline mb-10 cursor-pointer"
      >
        Change Email Address
      </div>

      <OtpInput onComplete={setOtp} />
      {error && (
        <p className="text-[#D33C43] text-xs mt-2 flex gap-2 items-center">
          <Image src="/Warning.svg" alt="warning" width={18} height={18} />
          {error}
        </p>
      )}

      {timer > 0 ? (
        <div className="text-[#A0A0A0] text-sm font-[500] flex gap-2 mt-10">
          <Image width={18} height={18} src={"/Timer.svg"} alt="timer" />
          {timer} Sec
        </div>
      ) : (
        <div
          onClick={resendOtp}
          className="text-sm text-[#8A2BE2] mt-6 cursor-pointer hover:underline"
        >
          Resend OTP
        </div>
      )}

      <button
        onClick={verifyOtp}
        type="submit"
        className="w-full h-[50px] bg-[#8854C0] hover:bg-purple-700 text-base text-white py-2 rounded-[10px] mt-10 font-semibold cursor-pointer"
      >
        Continue
      </button>
    </div>
  );
}
