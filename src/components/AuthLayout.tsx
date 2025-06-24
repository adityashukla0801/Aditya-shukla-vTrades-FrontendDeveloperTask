import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="text-white min-h-screen flex items-center justify-center bg-[#17181E]">
      <div className="w-full max-w-[1440px] h-[100vh] max-h-[1024px] bg-[#17181E] p-[40px] rounded-lg overflow-auto shadow-lg lg:flex items-stretch justify-center">
        {children}
      </div>
    </div>
  );
}
