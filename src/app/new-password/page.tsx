"use client";

import AuthLayout from "@/components/AuthLayout";
import AuthImageSection from "@/components/AuthImageSection";
import CreatePasswordForm from "@/components/CreatePasswordForm";
import { Suspense } from "react";

export default function NewPasswordPage() {
  return (
    <AuthLayout>
      <AuthImageSection />
      <Suspense>
        <CreatePasswordForm />
      </Suspense>
    </AuthLayout>
  );
}
