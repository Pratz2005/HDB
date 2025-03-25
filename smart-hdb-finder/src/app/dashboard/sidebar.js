"use client"; 
import { useState } from "react";
import PriceRange from "./priceRange";

export default function Sidebar() {
  const [toggles, setToggles] = useState({
    communityClub: false,
    hawkerCentre: false,
    superMarket: false,
    mrtStation: false,
    clinics: false,
  });

  const toggleSwitch = (key) => {
    setToggles((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="w-[300px] bg-white shadow-md border-r p-4 h-screen overflow-y-auto"
         style={{ scrollbarGutter: 'stable' }}>
      {/* HDB Type Selection */}
      <div className="mb-4 text-black">
        <h2 className="text-lg font-semibold mb-2">HDB Type</h2>
        <div className="flex space-x-2">
          <button className="px-4 py-2 border-2 border-orange-500 text-orange-500 rounded-lg font-semibold hover:bg-blue-100 transition">Resale</button>
          <button className="px-4 py-2 border-2 border-orange-500 text-orange-500 rounded-lg font-semibold hover:bg-blue-100 transition">BTO</button>
          <button className="px-4 py-2 border-2 border-orange-500 text-orange-500 rounded-lg font-semibold hover:bg-blue-100 transition">Rental</button>
        </div>
      </div>

      {/* Price Range Filter */}
      <PriceRange />

      {/* HDB Flat Type */}
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

      <div className="mt-6">
        <h2 className="text-lg font-semibold text-black mb-4">Nearby Amenities</h2>
        {[
          { label: "Community Club", key: "communityClub" },
          { label: "Hawker Centre", key: "hawkerCentre" },
          { label: "Super Market", key: "superMarket" },
          { label: "MRT Station", key: "mrtStation" },
          { label: "Clinics", key: "clinics" },
        ].map((item) => (
          <div key={item.key} className="flex justify-between items-center mb-4">
            <span className="text-gray-700">{item.label}</span>
            <button
              onClick={() => toggleSwitch(item.key)}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
                toggles[item.key] ? "bg-green-500" : "bg-gray-300"
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                  toggles[item.key] ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
