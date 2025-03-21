"use client"; 
import { useState } from "react";
import PriceRange from "./priceRange";
import Transport from "./transport";
import Lifestyle from "./lifestyle";
import Education from "./education";
import Healthcare from "./healthcare";
import Shopping from "./shopping";
import Finance from "./finance";
import Family from "./family";

export default function Sidebar() {
  const [openSections, setOpenSections] = useState({});

  // Function to toggle sections open/close
  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="w-[300px] bg-white shadow-md border-r p-4 h-screen overflow-y-auto"
      style ={{scrollbarGutter: 'stable'}}>
      {/* HDB Type Selection */}
      <div className="mb-4 text-black">
        <h2 className="text-lg font-semibold mb-2">HDB Type</h2>
        <div className="flex space-x-2">
          <button className="px-4 py-2 border-2 border-orange-500 text-orange-500 rounded-lg font-semibold hover:bg-blue-100 transition">Resale</button>
          <button className="px-4 py-2 border-2 border-orange-500 text-orange-500 rounded-lg font-semibold hover:bg-blue-100 transition">BTO</button>
          <button className="px-4 py-2 border-2 border-orange-500 text-orange-500 rounded-lg font-semibold hover:bg-blue-100 transition">Rental</button>
        </div>
      </div>

      <PriceRange/ >

      <div className="mb-4">
        <label htmlFor="hdb-flat-type" className="text-lg font-semibold text-black">
          HDB Flat Type
        </label>
        <select
          id="hdb-flat-type"
          className="mt-1 block w-full p-2 border border-blue-400 rounded-md shadow-sm text-gray-600 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select</option>
          <option value="2-room">2-Room</option>
          <option value="3-room">3-Room</option>
          <option value="4-room">4-Room</option>
          <option value="5-room">5-Room</option>
          <option value="executive-flats">Executive Flats</option>
          <option value="community-care-apartments">Community Care Apartments</option>
        </select>
      </div>

      {/* Dropdown Sections */}
      {[
        { name: "Transport", component: <Transport /> },
        { name: "Education", component: <Education /> },
        { name: "Healthcare", component: <Healthcare /> },
        { name: "Shopping & Dining", component: <Shopping /> },
        { name: "Lifestyle & Recreation", component: <Lifestyle/> },
        { name: "Financial Services", component: <Finance/> },
        { name: "Family & Elder Care", component: <Family/> },
      ].map((section) => (
        <div key={section.name} className="mb-2">
          <button
            className="w-full text-left text-gray-600 p-3 border-b border-gray-200 flex justify-between items-center bg-transparent focus:outline-none"
            onClick={() => toggleSection(section.name)}
          >
            {section.name}
            <span>{openSections[section.name] ? "▲" : "▼"}</span>
          </button>
          {openSections[section.name] && (
            <div className="p-2 text-gray-600 text-sm w-full">{section.component}</div>
          )}
        </div>
      ))}
    </div>
  );
}