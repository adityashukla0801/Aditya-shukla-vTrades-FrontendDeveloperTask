"use client";

import AuthLayout from "@/components/AuthLayout";
import AuthImageSection from "@/components/AuthImageSection";
import SignInForm from "@/components/SignInForm";

export default function SignInPage() {
  return (
    <AuthLayout>
      <AuthImageSection />
      <SignInForm />
    </AuthLayout>
  );
}
