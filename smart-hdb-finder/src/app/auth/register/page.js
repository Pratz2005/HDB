"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { auth } from "../../utils/firebaseClient.js";

export default function RegisterPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const passwordPattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (password && !passwordPattern.test(password)) {
            setError("Password must be at least 8 characters, include upper and lowercase letters, and a number.");
        } else if (confirmPassword && password !== confirmPassword) {
            setError("Passwords do not match.");
        } else {
            setError(null);
        }
    }, [email, password, confirmPassword]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (error) return;

        setIsSubmitting(true);  // disable the button immediately

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, {
                displayName: username,
            });
            console.log("User registered:", userCredential.user);
            await sendEmailVerification(userCredential.user);
            router.push("/auth/verify-email");
        } catch (err) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);  // allow resubmission if an error occurred
        }
    };

    return (
        <main className="relative min-h-screen bg-[url('/hdb_landing_page.jpg')] bg-cover bg-center text-white">
            <div className="absolute inset-0 bg-black/70"></div>
            <div className="relative z-10 min-h-screen flex items-center justify-center">
                <div className="bg-white shadow-xl p-8 rounded-2xl w-full max-w-md">
                    <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Register</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            placeholder="Display Name"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full text-black px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
                        />
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
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="w-full text-black px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
                        />
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? "Submitting..." : "Create Account"}
                        </button>
                    </form>
                    {error && <p className="text-red-500 text-center mt-4">{error}</p>}
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