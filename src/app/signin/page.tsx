"use client";

import AuthLayout from "@/components/AuthLayout";
import AuthImageSection from "@/components/AuthImageSection";
import SignInForm from "@/components/SignInForm";

export default function SignInPage() {
  return (
    <AuthLayout>
      <AuthImageSection />
      <div className="lg:w-[640px] flex justify-center items-center">
        <SignInForm />
      </div>
    </AuthLayout>
  );
}
