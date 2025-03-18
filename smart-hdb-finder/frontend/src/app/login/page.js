"use client";

import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../utils/firebaseClient.js";
import { FaGoogle, FaUser } from "react-icons/fa";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Logged in:", userCredential.user);
      // Handle remember me functionality (e.g., store in localStorage)
      if (rememberMe) {
        localStorage.setItem("rememberMe", email);
      } else {
        localStorage.removeItem("rememberMe");
      }
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
    <main className="relative min-h-screen bg-[url('/hdb_landing_page.jpg')] bg-cover bg-center text-white">
      <div className="absolute inset-0 bg-black/70"></div>
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="bg-white shadow-xl p-8 rounded-2xl w-full max-w-md">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
            />
            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm text-gray-600">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                Remember me
              </label>
              <a href="/forgot-password" className="text-sm text-indigo-600 hover:underline">Forgot password?</a>
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-800 transition"
            >
              Log In
            </button>
            <div className="text-center text-sm mt-2 text-gray-600">
              Don't have an account? <a href="/signup" className="text-indigo-600 hover:underline">Sign up</a>
            </div>
          </form>
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
          
          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-600" />
            <span className="px-2 text-gray-600">or</span>
            <hr className="flex-grow  border-gray-600" />
          </div>
          
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
        </div>
      </div>
    </main>
  );
}
