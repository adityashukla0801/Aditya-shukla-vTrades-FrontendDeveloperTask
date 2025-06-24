"use client";

import AuthImageSection from "@/components/AuthImageSection";
import AuthLayout from "@/components/AuthLayout";
import SignUpForm from "@/components/SignUpForm";

export default function SignUpPage() {
  return (
    <AuthLayout>
      <AuthImageSection />
      <div className="lg:w-[640px] flex justify-center items-center lg:min-h-[720px] lg:h-full h-full lg:max-h-[944px]">
        <SignUpForm />
      </div>
    </AuthLayout>
  );
}
