"use client";
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-orange-500 text-white px-4 py-6">
      <div className="max-w-screen-xl mx-auto flex flex-col justify-center items-center">
        <div className="flex flex-col md:flex-row md:space-x-8 text-base text-white text-center">
          <a href="/about-us" target="_blank" rel="noopener noreferrer" className="hover:text-white mb-2 md:mb-0">
            About Us
          </a>
          <a href="https://github.com/softwarelab3/2006-SCMA-U2" target="_blank" rel="noopener noreferrer" className="hover:text-white mb-2 md:mb-0">
            Github
          </a>
          <Link href="/contact-us" className="hover:text-white">
            Contact Us
          </Link>
        </div>
      </div>
      <hr className="my-4 border-gray-700" />
      <div className="text-center text-white text-base">
        © 2025 Smart HDB Finder
      </div>
    </footer>
  );
}