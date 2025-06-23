import React from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";

function AuthLoginButton() {
  return (
    <>
      {/* Google Auth */}
      <button
        type="button"
        className="w-full h-[54px] flex items-center justify-center bg-[#1D1E26] text-white border border-[#30303D] py-2 rounded-[10px] mb-6 cursor-pointer gap-2 text-sm"
        onClick={() => signIn("google", { callbackUrl: "/" })}
      >
        <Image
          src="https://cdn-icons-png.flaticon.com/512/300/300221.png"
          alt="Google"
          width={20}
          height={20}
          className="mr-2"
        />
        Sign In with Google
      </button>

      {/* Microsoft Auth */}
      <button
        type="button"
        className="w-full h-[54px] flex items-center justify-center bg-[#1D1E26] text-white border border-[#30303D] py-2 rounded-[10px] mb-6 cursor-pointer gap-2 text-sm"
        onClick={() => signIn("azure-ad", { callbackUrl: "/" })}
      >
        <Image
          src="https://cdn-icons-png.flaticon.com/512/732/732221.png"
          alt="Microsoft"
          width={20}
          height={20}
          className="mr-2"
        />
        Sign In with Microsoft
      </button>
    </>
  );
}

export default AuthLoginButton;
