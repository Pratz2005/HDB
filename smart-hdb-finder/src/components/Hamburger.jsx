"use client";

import { useState } from "react";
import { X, Menu } from "lucide-react";
import Link from "next/link";

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X className="text-white" /> : <Menu className="text-white" />}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-md z-[9999]">
          <ul className="text-base text-gray-700 p-3">
          <Link href="/recently-viewed">
            <li className="hover:bg-gray-100 px-4 py-2 cursor-pointer">Recently Viewed</li>
          </Link>
          <Link href="/">
            <li className="hover:bg-gray-100 px-5 py-3 cursor-pointer">Logout</li>
          </Link>
          </ul>
        </div>
      )}
    </div>
  );
}