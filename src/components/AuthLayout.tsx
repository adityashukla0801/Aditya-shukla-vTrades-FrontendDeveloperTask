import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-[#121216] text-white min-h-screen flex items-center justify-center p-4">
      <div className="max-w-6xl h-[720px] w-full bg-[#121216] rounded-lg overflow-hidden shadow-lg flex flex-col lg:flex-row">
        {children}
      </div>
    </div>
  );
}
