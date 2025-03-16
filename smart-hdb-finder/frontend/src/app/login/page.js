"use client";

import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../utils/firebaseClient.js";
import { FaGoogle, FaUser } from "react-icons/fa";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Logged in:", userCredential.user);
      // Redirect user here
    } catch (error) {
      setError("Invalid email or password.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log("Logged in with Google:", result.user);
      // Redirect user here
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-200">
      <div className="bg-white shadow-xl p-8 rounded-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login
        </h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 border rounded-lg outline-none focus:border-indigo-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-800 transition"
          >
            Log In
          </button>
        </form>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        <div className="my-4 text-center">
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center bg-red-500 hover:bg-red-700 py-2 rounded-lg transition text-white"
          >
            <FaGoogle className="mr-2" /> Sign in with Google
          </button>
        </div>
        <div className="my-4 text-center">
          <button
            //onClick={continueAsGuest}
            className="w-full flex items-center justify-center bg-gray-500 hover:bg-gray-700 py-2 rounded-lg transition text-white"
          >
            <FaUser className="mr-2" /> Continue as Guest
          </button>
        </div>
        <div className="text-sm text-center text-gray-600">
          Don't have an account? <a href="/signup" className="text-indigo-600 hover:underline">Sign up</a>
        </div>
      </div>
    </div>
  );
}
