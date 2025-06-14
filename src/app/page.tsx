"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function HomePage() {
  const { data, data: session } = useSession();

  return (
    <main className="min-h-screen bg-gray-800 text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-8">Welcome to WorkHive</h1>
      {session ? (
        <div className="w-[400px] p-8 h-auto bg-gray-900 rounded-lg overflow-hidden shadow-lg">
          <h1 className="text-3xl font-bold mb-6">Successfully Login</h1>
          <h3 className="text-xl font-bold mb-6">{data.user?.email}</h3>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="bg-[#8854C0] w-full cursor-pointer hover:bg-purple-700 px-4 py-2 rounded-[10px] text-white cursor-pointer"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="space-x-4">
          <Link
            href="/signin"
            className="bg-[#8854C0] hover:bg-purple-700 px-8 py-4 rounded-[10px] text-white"
          >
            Sign In
          </Link>

          <Link
            href="/signup"
            className="bg-gray-700 hover:bg-gray-800 px-8 py-4 rounded-[10px] text-white"
          >
            Sign Up
          </Link>
        </div>
      )}
    </main>
  );
}
