"use client";

import AuthImageSection from "@/components/AuthImageSection";
import AuthLayout from "@/components/AuthLayout";
import SignUpForm from "@/components/SignUpForm";

export default function SignUpPage() {
  return (
    <AuthLayout>
      <AuthImageSection />
      <SignUpForm />
    </AuthLayout>
  );
}
