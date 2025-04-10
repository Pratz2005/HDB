"use client"; 
import { useCallback, useState, useEffect } from "react";
import PriceRangeSlider from "./priceRange";
import { locationOptions, flatTypeOptions } from "./dropdownOptions";
import SearchResults from "./SearchResults";

export default function Sidebar({setSearchResults}) {

  ///////////////////////////////
  // COMPULSORY SEARCH FILTERS //
  ///////////////////////////////
  const [location, setLocation] = useState("");
  const [flatType, setFlatType] = useState("");
  const [priceRange, setPriceRange] = useState({ minPrice: 300000, maxPrice: 750000 });
  const [loading, setLoading] = useState(false);
  const handlePriceChange = useCallback((min, max) => {
    setPriceRange({ minPrice: min, maxPrice: max });
  }, []);
  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleFlatTypeChange = (e) => {
    setFlatType(e.target.value);
  };

  ///////////////////////////
  // TOGGLES FOR AMENITIES //
  ///////////////////////////
  const [toggles, setToggles] = useState({
    communityClub: false,
    hawkerCentre: false,
    superMarket: false,
    mrtStation: false,
    clinics: false,
    primarySchool: false,
    secondarySchool: false,
    juniorCollege: false
  });

  const toggleSwitch = (key) => {
    setToggles((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  useEffect(() => {
    console.log("Toggles updated:", toggles);
  }, [toggles]);

  /////////////////////////
  // API CALL FOR SEARCH //
  /////////////////////////
  const handleSearch = async () => {
    setLoading(true); // Start loading
    const payload = {
      location: location,
      flat_type: flatType,
      min_price: priceRange.minPrice,
      max_price: priceRange.maxPrice,
      toggles: toggles
    };
  
    try {
      const res = await fetch("http://127.0.0.1:8000/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      if (!res.ok) {
        throw new Error("Search request failed");
      }
  
      const data = await res.json();
      console.log("Search Results:", data);
      setSearchResults(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false); // Stop Loading
    }
  };

  return (
    <div className="w-[300px] bg-white shadow-md border-r p-4 h-screen overflow-y-auto" style={{ scrollbarGutter: 'stable' }}>
      {/* Location Selection */}
      <div className="mb-4">
        <label htmlFor="location" className="text-lg font-semibold text-black">
          Location
        </label>
        <select
          id="location"
          value={location}
          onChange={handleLocationChange}
          className="mt-1 block w-full p-2 border border-blue-400 rounded-md shadow-sm text-gray-600 focus:ring-blue-500 focus:border-blue-500"
        >
          {locationOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* HDB Flat Type */}
      <div className="mb-4">
        <label htmlFor="hdb-flat-type" className="text-lg font-semibold text-black">
          HDB Flat Type
        </label>
        <select
          id="hdb-flat-type"
          value={flatType}
          onChange={handleFlatTypeChange}
          className="mt-1 block w-full p-2 border border-blue-400 rounded-md shadow-sm text-gray-600 focus:ring-blue-500 focus:border-blue-500"
        >
          {flatTypeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range Filter */}
      <PriceRangeSlider onPriceChange={handlePriceChange} />

      <div className="mt-6">
        <h2 className="text-lg font-semibold text-black mb-4">Nearby Amenities</h2>
        {[
          { label: "Community Club", key: "communityClub" },
          { label: "Hawker Centre", key: "hawkerCentre" },
          { label: "Super Market", key: "superMarket" },
          { label: "MRT Station", key: "mrtStation" },
          { label: "Clinics", key: "clinics" },
          { label: "Primary Schools", key: "primarySchool" },
          { label: "Secondary Schools", key: "secondarySchool" },
          { label: "Junior Colleges", key: "juniorCollege" }
        ].map((item) => (
          <div key={item.key} className="flex justify-between items-center mb-4">
            <span className="text-gray-700">{item.label}</span>
            <button
              onClick={() => toggleSwitch(item.key)}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
                toggles[item.key] ? "bg-orange-500" : "bg-gray-300"
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

      {/* Search Button */}
      <div className="mt-6">
      <button
        onClick={handleSearch}
        disabled={loading}
        className={`w-full flex justify-center items-center bg-orange-500 hover:bg-orange-700 text-white py-2 rounded-lg transition ${
          loading ? "opacity-70 cursor-not-allowed" : ""
        }`}
      >
        {loading ? (
        <svg
          className="animate-spin h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
          ></path>
        </svg>
      ) : (
        "Search"
      )}
      </button>
      </div>
    
      {/* (Optional) Show search results in the Sidebar */}
      {/* {searchResults && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-black mb-2">Results</h2>
          <SearchResults results={searchResults} />
        </div>
      )} */}
    </div>
  );
}