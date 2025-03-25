"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../utils/firebaseClient.js";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setMessage("");

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("A password reset email has been sent. Please check your inbox.");
    } catch (err) {
      setError("Failed to send reset email: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen bg-[url('/hdb_landing_page.jpg')] bg-cover bg-center text-white">
    <div className="absolute inset-0 bg-black/70"></div>
    <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="bg-white shadow-xl p-8 rounded-2xl w-full max-w-md">
            <h1 className="text-3xl text-gray-800 font-bold mb-2 text-left">Forgot Password?</h1>
            <p className="text-gray-500 mb-4">No worries, we'll send you reset instructions</p>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            {message && <p className="text-green-500 mb-2">{message}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full text-black px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
                />
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-700 transition"
                >
                    {isSubmitting ? "Sending..." : "Reset Password"}
                </button>
            </form>
            <button
            onClick={() => router.push("/auth/login")}
            className="mt-4 text-indigo-600 hover:underline"
            >
            Back to Login
            </button>
        </div>
    </div>
    </main>
  );
}