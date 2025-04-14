"use client";

import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../utils/firebaseClient";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function RecentlyViewedPage() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [activeDetail, setActiveDetail] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user || user.providerData.length === 0) {
        setShowLoginModal(true);
        setLoading(false);
      } else {
        fetchRecentlyViewed(user);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchRecentlyViewed = async (user) => {
    try {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const data = userSnap.data();
        const listingsWithIds = (data.recentlyViewed || []).map((listing, index) => ({
          ...listing,
          uniqueId: listing.uniqueId || `${listing.block}-${listing.street_name}-${index}`
        }));
        setListings(listingsWithIds);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching recently viewed:", error);
      setLoading(false);
    }
  };

  const toggleDetails = (id) => {
    setActiveDetail(activeDetail === id ? null : id);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading your listings...</p>
        </div>
      </div>
    );
  }

  if (showLoginModal) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-xl">
          <div className="flex justify-center mb-6">
            <Image src="/logo.png" alt="Smart HDB Finder" width={120} height={80} />
          </div>
          <h2 className="text-2xl font-bold text-center mb-3">Member-Only Feature</h2>
          <p className="text-center text-gray-600 mb-8">
            Log in or sign up to access your recently viewed HDB listings, save favorites, and get personalized recommendations.
          </p>
          <button 
            onClick={() => router.push("/auth/login")} 
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-xl mb-4 font-medium transition"
          >
            Log in
          </button>
          <button 
            onClick={() => router.push("/auth/signup")} 
            className="w-full bg-white text-gray-800 py-3 px-4 rounded-xl mb-6 border border-gray-300 font-medium hover:bg-gray-50 transition"
          >
            Create new account
          </button>
          <button 
            onClick={() => router.push("/dashboard")} 
            className="w-full text-blue-600 py-2 font-medium hover:underline"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Recently Viewed</h1>
          <div className="text-sm text-gray-500">{listings.length} properties</div>
        </div>

        {listings.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No recently viewed properties</h3>
            <p className="text-gray-600 mb-6">Start browsing to see your recently viewed HDB listings here.</p>
            <Link href="/search">
              <button className="inline-flex items-center px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl transition">
                Browse Listings
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {listings.map((listing, index) => (
              <div key={listing.uniqueId} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition duration-300">
                {/* Replaced Placeholder with Image */}
                <div className="relative h-36">
                  <Image
                    src={
                      index % 4 === 0
                        ? "/hdb_about1.jpg"
                        : index % 4 === 1
                        ? "/hdb_about2.jpg"
                        : index % 4 === 2
                        ? "/hdb_about3.jpeg"
                        : "/hdb_about1.jpg"
                    }
                    alt="HDB Listing"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-blue-500 text-white px-2 py-1 rounded-lg text-xs font-semibold">
                    {listing.flat_type}
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-bold text-blue-600 mb-1 truncate">
                    {listing.block} {listing.street_name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">{listing.town}</p>
                  <p className="text-xl font-bold text-orange-500 mb-3">${listing.resale_price?.toLocaleString()}</p>

                  <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      {listing.floor_area_sqm || "-"} sqm
                    </div>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {listing.month || "-"}
                    </div>
                  </div>

                  <button
                    onClick={() => toggleDetails(listing.uniqueId)}
                    className={`w-full text-sm py-2 px-3 rounded-xl font-medium transition ${
                      activeDetail === listing.uniqueId 
                        ? "bg-blue-100 text-blue-700" 
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {activeDetail === listing.uniqueId ? "Hide Details" : "View Details"}
                  </button>
                </div>

                {activeDetail === listing.uniqueId && (
                  <div className="px-4 pb-4 border-t border-gray-100 pt-3">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-gray-500 mb-1">Postal Code</p>
                        <p className="font-medium">{listing.postal || "Not available"}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 mb-1">Floor Area</p>
                        <p className="font-medium">{listing.floor_area_sqm || "-"} sqm</p>
                      </div>
                      <div>
                        <p className="text-gray-500 mb-1">Remaining Lease</p>
                        <p className="font-medium">{listing.remaining_lease || "Not available"}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 mb-1">Sold On</p>
                        <p className="font-medium">{listing.month || "Not available"}</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Link href={`/listing/${listing.uniqueId}`}>
                        <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-xl text-sm font-medium transition">
                          View Full Listing
                        </button>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
