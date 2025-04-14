"use client";
import React from "react";
import Image from "next/image";

export default function AboutUsPage() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-6 bg-gray-50 min-h-screen -ml-6">
      
      {/* Left Section: Compact Grid Images Flush to Right */}
      <div className="grid grid-cols-1 gap-3 md:w-1/2 justify-items-end">
        <Image
          src="/hdb_about1.jpg"
          alt="HDB 1"
          width={250}
          height={300}
          className="rounded-xl object-cover"
        />
        <Image
          src="/hdb_about2.jpg"
          alt="HDB 2"
          width={250}
          height={200}
          className="rounded-xl object-cover"
        />
        <Image
          src="/hdb_about3.jpeg"
          alt="HDB 3"
          width={250}
          height={250}
          className="rounded-xl object-cover"
        />
      </div>

      {/* Right Section: Text */}
      <div className="flex flex-col space-y-5 md:w-1/2">
        <h2 className="text-orange-500 text-sm font-medium uppercase tracking-wide">A Bit</h2>
        <h1 className="text-3xl font-bold text-gray-900">About Us</h1>
        <p className="text-gray-700 leading-relaxed">
          Smart HDB Finder helps you easily view past HDB resale data
          so you can make more informed purchases. Filter by affordability,
          location, flat type, and amenities that matter most to you and your family.
        </p>
        <button className="self-start px-5 py-2.5 bg-orange-500 text-white font-medium rounded-md shadow hover:bg-orange-600 transition">
          Try it
        </button>
      </div>
    </div>
  );
}