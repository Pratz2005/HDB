"use client";

import Image from "next/image";
import Link from "next/link";
import HamburgerMenu from "../../components/Hamburger";

export default function Header() {
  return (
    <header className="w-full flex items-center justify-between px-6 py-2 shadow-sm bg-orange-500">
      {/* LEFT SIDE: Logo + Buttons */}
      <div className="flex items-center gap-4">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Smart HDB Finder Logo"
            width={60}
            height={60}
            className="object-contain"
          />
        </Link>
        <button className="border-2 border-white text-white px-3 py-1 rounded-lg font-semibold hover:bg-orange-300 hover:text-white transition">
          Find myHDB!
        </button>
        <Link href="/insights">
        <div className="cursor-pointer border-2 border-white text-white px-3 py-1 rounded-lg font-semibold hover:bg-orange-300 hover:text-white transition">
          HDB Market Watch
        </div>
        </Link>
      </div>

      {/* RIGHT SIDE: Hamburger */}
      <HamburgerMenu />
    </header>
  );
}