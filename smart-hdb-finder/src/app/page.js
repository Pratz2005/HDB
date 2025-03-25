// app/page.js
"use client";
import { buttonVariants } from "@/components/ui/button" //this is a shadcn component!
import Link from "next/link";

export default function Home() {
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
            <Link href="/auth/login" className={`${buttonVariants({ variant: "main" })} block`}>Login</Link>
          </div>
          <div className="w-60">
            <Link href="/auth/register" className={`${buttonVariants({ variant: "main" })} block`}>Create Account</Link>
          </div>
        </div>
        <div className="flex mt-4 -ml-12 w-60">
          <Link href="/dashboard" className={buttonVariants({ variant: "main" })}>Continue As Guest</Link>
        </div>
      </div>
    </main>
  );
}
