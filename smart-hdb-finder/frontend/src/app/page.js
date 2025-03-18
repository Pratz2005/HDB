// app/page.js
"use client";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[url(/hdb_landing_page.jpg)] bg-cover bg-center text-white">
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
          <Link
            href="/auth/login"
            className="bg-white border border-orange-500 text-orange-500 px-4 py-2 rounded font-semibold w-60
            hover:bg-orange-500 hover:text-white hover:shadow-md transition text-center"
          >
            Login
          </Link>
          <Link
            href="/auth/register"
            className="bg-white border border-orange-500 text-orange-500 px-4 py-2 rounded font-semibold w-60
            hover:bg-orange-500 hover:text-white hover:shadow-md transition text-center"
          >
            Create Account
          </Link>
        </div>

          <Link
            href="/dashboard"
            className="bg-white border border-orange-500 text-orange-500 px-4 py-2 rounded font-semibold w-60
            hover:bg-orange-500 hover:text-white hover:shadow-md transition text-center -ml-12 mt-8"
          >
            Continue as Guest
          </Link>
      </div>
    </main>
  );
}
