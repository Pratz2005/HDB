"use client";

import { useState } from "react";
import { auth } from "../utils/firebaseClient";
import { db } from "../utils/firebaseClient";
import {
  doc,
  getDoc,
  updateDoc,
  setDoc,
  serverTimestamp
} from "firebase/firestore";

export default function SearchResults({ results, onClick }) {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = async (index, record) => {
    const newIndex = expandedIndex === index ? null : index;
    setExpandedIndex(newIndex);
  
    if (newIndex !== null) {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const listing = {
          block: record.block,
          street_name: record.street_name,
          town: record.town,
          flat_type: record.flat_type,
          resale_price: record.resale_price,
          postal: record.postal,
          floor_area_sqm: record.floor_area_sqm,
          remaining_lease: record.remaining_lease,
          month: record.month,
          nearby_amenities: record.nearby_amenities,
          viewedAt: Date.now(), // keeps track of time viewed
        };
  
        try {
          const userDoc = await getDoc(userRef);
          let prev = [];
  
          if (userDoc.exists()) {
            const data = userDoc.data();
            prev = data.recentlyViewed || [];
          }
  
          // remove duplicate if same block & street name
          const filtered = prev.filter(
            (item) =>
              !(
                item.block === listing.block &&
                item.street_name === listing.street_name
              )
          );
  
          // add new listing to top & keep only 15
          const updated = [listing, ...filtered].slice(0, 15);
  
          await setDoc(userRef, { recentlyViewed: updated }, { merge: true });
        } catch (error) {
          console.error("Error saving recently viewed:", error);
        }
      }
    }
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
          onMouseEnter={() => onClick(record)}
          className="border border-gray-300 rounded-lg shadow hover:shadow-lg transition duration-300"
        >
          <button
            className="w-full text-left px-4 py-3 flex justify-between items-center bg-gray-100 rounded-t-lg"
            onClick={() => toggleExpand(index, record)}
          >
            <div>
              <p className="text-lg font-semibold text-blue-700">
                {record.block} {record.street_name}
              </p>
              <p className="text-sm text-gray-600">
                {record.town} | {record.flat_type}
              </p>
            </div>
            <p className="text-lg text-orange-500 font-bold">
              ${record.resale_price.toLocaleString()}
            </p>
          </button>

          {expandedIndex === index && (
            <div 
              className="px-4 py-3 bg-white border-t border-gray-200 rounded-b-lg text-sm text-gray-700 space-y-2">
              <p><strong>Postal Code:</strong> {record.postal}</p>
              <p><strong>Floor Area (sqm):</strong> {record.floor_area_sqm}</p>
              <p><strong>Remaining Lease:</strong> {record.remaining_lease}</p>
              <p><strong>Date Sold:</strong> {record.month}</p>
              <p><strong>Nearby Amenities:</strong></p>
              <ul className="list-disc list-inside ml-4">
                {record.nearby_amenities.map((amenity, i) => (
                  <li key={i}>{amenity.name} -  <strong>{(amenity.distance * 1000).toFixed(0)} m</strong></li>
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