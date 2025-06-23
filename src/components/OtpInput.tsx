import { useRef, useState } from "react";

function OtpInput({ onComplete }: { onComplete?: (otp: string) => void }) {
  const inputLength = 6;
  const inputsRef = useRef<HTMLInputElement[]>([]);
  const [otp, setOtp] = useState<string[]>(Array(inputLength).fill(""));

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < inputLength - 1) {
      inputsRef.current[index + 1]?.focus();
    }

    if (value && index === inputLength - 1 && onComplete) {
      onComplete(newOtp.join(""));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = "";
      setOtp(newOtp);
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex justify-between gap-2 my-4">
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            if (el) inputsRef.current[index] = el;
          }}
          type="text"
          placeholder="0"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className="w-[46px] h-[48px] text-center text-[#85898B80] text-[24px] font-[500] bg-[#1D1E26] border border-[#30303D] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      ))}
    </div>
  );
}

export default OtpInput;
