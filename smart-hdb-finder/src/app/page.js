// app/page.js
"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { continueAsGuest } from "./utils/authUtil.js"; // Import from new file

export default function Home() {
  const router = useRouter();
  return (
    <main className="relative min-h-screen bg-[url('/hdb_landing_page.jpg')] bg-cover bg-center text-white">
      {/* Semi-transparent overlay for readability */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Hero / Landing Section */}
      <div className="relative z-10 flex flex-col items-center justify-center h-[calc(100vh-64px)] text-center px-4">
        <h1 className="text-7xl sm:text-8xl font-bold mb-4 leading-tight text-left tracking-tight leading-[0.9]">
          Discover 
          <br />
          <span className="text-orange-500">Homes</span> Near
          <br />
          What Matters
          <br />
          <span className="text-orange-500">Most.</span>
        </h1>

        <div className="flex gap-10 -ml-12">
          <div className="w-60">
            <Link href="/auth/login" className="w-full bg-white border border-orange-500 text-orange-500 px-4 py-2 rounded font-semibold hover:bg-orange-500 hover:text-white hover:shadow-md transition text-center block">Login</Link>
          </div>
          <div className="w-60">
            <Link href="/auth/register" className="w-full bg-white border border-orange-500 text-orange-500 px-4 py-2 rounded font-semibold hover:bg-orange-500 hover:text-white hover:shadow-md transition text-center block">Create Account</Link>
          </div>
        </div>
        <div className="flex mt-4 -ml-12 w-60">
          <button
            onClick={() => continueAsGuest(router)}
            className="w-full bg-white border border-orange-500 text-orange-500 px-4 py-2 rounded font-semibold hover:bg-orange-500 hover:text-white hover:shadow-md transition text-center"
          >
            Continue As Guest
          </button>
        </div>
      </div>
    </main>
  );
}
