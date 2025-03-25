"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaGoogle, FaUser } from "react-icons/fa";
import { loginWithEmail, loginWithGoogle, continueAsGuest } from "../../utils/authUtil.js";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginWithEmail(email, password, router);
    } catch (err) {
      setError("Invalid email or password.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle(router);
    } catch (err) {
      // Optionally handle error here
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
              className="w-full text-black px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full text-black px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
            />
            <div className="w-full flex items-center">
              {error && <p className="text-sm text-red-500">{error}</p>}
              <a href="/auth/forgot-password" className="ml-auto text-sm text-indigo-600 hover:underline">
                Forgot password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-700 transition"
            >
              Log In
            </button>
            <div className="text-center text-sm mt-2 text-gray-600">
              Don't have an account? <a href="/auth/register" className="text-indigo-600 hover:underline">Sign up</a>
            </div>
          </form>
          
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
              <FaGoogle className="mr-2" /> Continue with Google
            </button>
          </div>
          <div className="my-4 text-center">
            <button
              onClick={() => continueAsGuest(router)}
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
