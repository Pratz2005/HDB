"use client";
import React from "react";
import Image from "next/image";
import { ArrowRight, Home, Filter, Clock, MapPin } from "lucide-react";
import Link from "next/link"

export default function AboutUsPage() {
  const features = [
    {
      icon: <Filter className="text-orange-500" />,
      title: "Smart Filtering",
      description: "Filter by price, location, flat type and more to find your perfect home"
    },
    {
      icon: <Clock className="text-orange-500" />,
      title: "Historical Data",
      description: "Access past HDB resale prices to make informed decisions"
    },
    {
      icon: <MapPin className="text-orange-500" />,
      title: "Location Intelligence",
      description: "Find properties near amenities that matter to you and your family"
    },
    {
      icon: <Home className="text-orange-500" />,
      title: "Property Insights",
      description: "Get detailed information on flat features, nearby facilities and market trends"
    }
  ];

  return (
    <div className="bg-gradient-to-b from-orange-50 to-white min-h-screen">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Left Content */}
          <div className="md:w-1/2 space-y-6">
            <span className="inline-block px-4 py-1 bg-orange-100 text-orange-600 font-medium rounded-full text-sm">OUR MISSION</span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Making HDB Hunting <span className="text-orange-500">Smarter</span>
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed">
              Smart HDB Finder helps you navigate Singapore's public housing market with confidence. 
              Access comprehensive data, intelligent filtering, and market insights to find your 
              ideal home at the best price.
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <Link href='/'>
                <button className="px-6 py-3 bg-orange-500 text-white font-medium rounded-lg shadow-lg hover:bg-orange-600 transition flex items-center gap-2">
                  Try it now <ArrowRight size={16} />
                </button>
              </Link>
            </div>
          </div>

          {/* Right Image Grid */}
          <div className="md:w-1/2 relative">
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-4 md:space-y-6 pt-8">
                <div className="rounded-2xl overflow-hidden shadow-lg h-48 md:h-64 relative">
                  <Image
                    src="/hdb_about1.jpg"
                    alt="HDB Building"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-lg h-40 md:h-48 relative">
                  <Image
                    src="/hdb_about3.jpeg"
                    alt="HDB Building"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 md:space-y-6">
                <div className="rounded-2xl overflow-hidden shadow-lg h-40 md:h-48 relative">
                  <Image
                    src="/hdb_about2.jpg"
                    alt="HDB Building"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-lg h-48 md:h-64 relative bg-orange-500 flex items-center justify-center">
                  <div className="text-white text-center p-4">
                    <h3 className="font-bold text-xl md:text-2xl"> 2 Years</h3>
                    <p className="text-sm md:text-base">of HDB resale data</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16 bg-white">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">How We Help You Find Your Dream Home</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Our platform offers powerful tools to make your HDB hunting experience smooth and efficient
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <div className="bg-orange-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="font-bold text-xl mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="bg-white p-8 md:p-12 rounded-2xl shadow-lg max-w-4xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="flex mb-6">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-xl md:text-2xl font-medium text-gray-800 mb-6">
                "Smart HDB Finder helped us find our dream flat in Tampines at a price we could afford. The historical data was invaluable in our decision-making process."
              </p>
              <div>
                <p className="font-bold">The Tan Family</p>
                <p className="text-gray-500 text-sm">First-time HDB buyers</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to find your perfect HDB flat?</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          Join thousands of Singaporeans who have used Smart HDB Finder to make informed property decisions
        </p>
        <Link href = "/">
          <button className="px-8 py-4 bg-orange-500 text-white font-medium rounded-lg shadow-lg hover:bg-orange-600 transition text-lg">
            Get Started Today
          </button>
        </Link>
      </div>
    </div>
  );
}