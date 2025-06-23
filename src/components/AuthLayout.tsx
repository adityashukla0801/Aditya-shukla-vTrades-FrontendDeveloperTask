import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="text-white min-h-screen flex items-center justify-center bg-[#17181E]">
      <div className="w-[1440px] h-[1024px] bg-[#17181E] p-[40px] rounded-lg overflow-hidden shadow-lg items-center justify-center flex flex-col lg:flex-row">
        {children}
      </div>
    </div>
  );
}
