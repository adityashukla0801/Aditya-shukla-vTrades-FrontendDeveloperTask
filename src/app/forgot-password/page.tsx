"use client";

import AuthLayout from "@/components/AuthLayout";
import AuthImageSection from "@/components/AuthImageSection";
import ForgotForm from "@/components/ForgotForm";

export default function SignInPage() {
  return (
    <AuthLayout>
      <AuthImageSection />
      <ForgotForm />
    </AuthLayout>
  );
}
