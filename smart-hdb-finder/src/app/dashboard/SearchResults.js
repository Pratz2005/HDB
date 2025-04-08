"use client";
import { useState } from "react";

export default function SearchResults({ results }) {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  if (!results || !results.records || results.records.length === 0) {
    return (
      <div className="text-gray-500 mt-4 text-sm">
        No results found. Try changing your filters.
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-4">
      {results.records.map((record, index) => (
        <div
          key={index}
          className="border border-gray-300 rounded-lg shadow hover:shadow-lg transition duration-300"
        >
          <button
            className="w-full text-left px-4 py-3 flex justify-between items-center bg-gray-100 rounded-t-lg"
            onClick={() => toggleExpand(index)}
          >
            <div>
              <p className="text-lg font-semibold text-blue-700">
                {record.block} {record.street_name}
              </p>
              <p className="text-sm text-gray-600">
                {record.town} | {record.flat_type}
              </p>
            </div>
            <p className="text-lg text-orange-500 font-bold">${record.resale_price.toLocaleString()}</p>
          </button>

          {expandedIndex === index && (
            <div className="px-4 py-3 bg-white border-t border-gray-200 rounded-b-lg text-sm text-gray-700 space-y-2">
              <p><strong>Postal Code:</strong> {record.postal}</p>
              <p><strong>Floor Area (sqm):</strong> {record.floor_area_sqm}</p>
              <p><strong>Remaining Lease:</strong> {record.remaining_lease}</p>
              <p><strong>Date Sold:</strong> {record.month}</p>
              <p><strong>Nearby Amenities:</strong></p>
              <ul className="list-disc list-inside ml-4">
                {record.nearby_amenities.map((amenity, i) => (
                  <li key={i}>{amenity}</li>
                ))}
              </ul>
              <div>
                <a href="www.example.com" className="text-blue-500">View HDB</a>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
