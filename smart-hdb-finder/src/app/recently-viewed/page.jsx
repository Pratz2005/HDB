"use client";

import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../utils/firebaseClient"; // adjust path if needed
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function RecentlyViewedPage() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth();
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // User is not logged in, show modal
        setShowLoginModal(true);
        setLoading(false);
      } else {
        // User is logged in, fetch data
        fetchRecentlyViewed(user);
      }
    });
    
    return () => unsubscribe(); // Clean up the listener
  }, []);

  const fetchRecentlyViewed = async (user) => {
    try {
      // Block anonymous guest users
      if (user.providerData.length === 0) {
        setShowLoginModal(true);
        setLoading(false);
        return;
      }

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const data = userSnap.data();
        setListings(data.recentlyViewed || []);
      }
      
      setLoading(false);
    } catch (error) {
      console.error("Error fetching recently viewed:", error);
      setLoading(false);
    }
  };

  const handleLogin = () => {
    router.push("/auth/login");
  };

  const handleCreateAccount = () => {
    router.push("/auth/signup");
  };

  const handleStayLoggedOut = () => {
    router.push("/dashboard");
  };

  if (loading) return <div className="p-4">Loading...</div>;
  
  if (showLoginModal) {
    return (
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-6 max-w-md w-full">
          <h2 className="text-2xl font-bold text-center mb-2">Member-Only Feature</h2>
          <p className="text-center text-gray-600 mb-8">
            Log in or sign up to access your recently viewed HDB listings, save favorites, and get personalized recommendations.
          </p>
          
          <button 
            onClick={handleLogin}
            className="w-full bg-orange-500 text-white py-3 px-4 rounded-full mb-4 font-medium"
          >
            Log in
          </button>
          
          <button 
            onClick={handleCreateAccount}
            className="w-full bg-white text-black py-3 px-4 rounded-full mb-4 border border-gray-300 font-medium"
          >
            Create new account
          </button>
          
          <button 
            onClick={handleStayLoggedOut}
            className="w-full text-gray-700 py-2 font-medium"
          >
            Stay logged out
          </button>
        </div>
      </div>
    );
  }

  if (!listings.length) return <div className="p-4 text-gray-500">No recently viewed listings found.</div>;

  return (
    <div className="pt-32 relative p-4 space-y-4">
      {/* Logo that links to dashboard */}
      <div className="absolute top-4 left-4">
        <Link href="/dashboard">
          <Image
            src="/logo.png"
            alt="Back to Dashboard"
            width={150}
            height={120}
            className="cursor-pointer hover:opacity-80 transition"
          />
        </Link>
      </div>

      <h1 className="text-2xl font-semibold mb-4">Recently Viewed</h1>

      {listings.map((listing, index) => (
        <div key={index} className="border rounded-lg p-4 shadow bg-white">
          <p className="text-lg font-bold">{listing.block} {listing.street_name}</p>
          <p>{listing.town} | {listing.flat_type}</p>
          <p>Resale Price: ${listing.resale_price.toLocaleString()}</p>
          <p>Postal Code: {listing.postal}</p>
          <p>Floor Area: {listing.floor_area_sqm} sqm</p>
          <p>Remaining Lease: {listing.remaining_lease}</p>
          <p>Sold On: {listing.month}</p>
        </div>
      ))}
    </div>
  );
}