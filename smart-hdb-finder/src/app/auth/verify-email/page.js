"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { sendEmailVerification } from "firebase/auth";
import { auth } from "../../utils/firebaseClient.js";

export default function VerifyEmail() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [displayName, setDisplayName] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (auth.currentUser) {
      setDisplayName(auth.currentUser.displayName || "User");
    }
  }, []);

  const handleResendVerification = async () => {
    setIsSubmitting(true);
    setError("");
    setMessage("");

    try {
      await sendEmailVerification(auth.currentUser);
      setMessage("Verification email resent. Please check your inbox.");
    } catch (err) {
      setError("Failed to resend verification email: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen bg-[url('/hdb_landing_page.jpg')] bg-cover bg-center text-white">
      <div className="absolute inset-0 bg-black/70"></div>
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="bg-white shadow-xl p-8 rounded-2xl w-full max-w-md text-center">
          <div className="mb-6">
            <img src="/email_icon.png" alt="Email Verification Icon" className="h-auto max-w-[100px] mx-auto" />
          </div>
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Check your inbox, please!</h1>
          
          <p className="mb-6 text-gray-600 text-sm">
            Hey {displayName}, we need to verify your email. We've already sent out the verification link. Please check it and confirm it's really you.
          </p>
          {error && <p className="text-red-500 mb-2">{error}</p>}
          {message && <p className="text-green-500 mb-2">{message}</p>}

          <button
            onClick={() => router.push("/dashboard")}
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-700 transition mb-4 mx-auto"
          >
            Sure!
          </button>
          <p className="text-gray-600">
            Didn't get e-mail?{" "}
            <button
              onClick={handleResendVerification}
              className="text-blue-500 hover:underline mx-auto"
              disabled={isSubmitting}
            >
              Send it again
            </button>
          </p>
        </div>
      </div>
    </main>
  );
}