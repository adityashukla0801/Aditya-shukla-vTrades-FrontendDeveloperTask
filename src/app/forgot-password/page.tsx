"use client";

import AuthLayout from "@/components/AuthLayout";
import AuthImageSection from "@/components/AuthImageSection";
import ForgotForm from "@/components/ForgotForm";

export default function SignInPage() {
  return (
    <AuthLayout>
      <AuthImageSection />
      <div className="lg:w-[640px] flex justify-center items-center">
        <ForgotForm />
      </div>
    </AuthLayout>
  );
}
