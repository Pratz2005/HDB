"use client";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signInAnonymously } from "firebase/auth";
import { auth } from "./firebaseClient.js";

export async function loginWithEmail(email, password, router) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("Logged in:", userCredential.user);
    router.push("/dashboard");
  } catch (error) {
    console.error("Email login error:", error);
    throw error;
  }
}

export async function loginWithGoogle(router) {
  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    console.log("Logged in with Google:", userCredential.user);
    router.push("/dashboard");
  } catch (error) {
    console.error("Google login error:", error);
    throw error;
  }
}

export async function continueAsGuest(router) {
    console.log("continueAsGuest function was called");
    console.log("Firebase Auth Instance:", auth);
    try {
      const userCredential = await signInAnonymously(auth);
      
      if (!userCredential || !userCredential.user) {
        console.error("Anonymous sign-in failed: No user credential returned.");
        return;
      }
  
      console.log("Logged in as a guest:", userCredential.user);
      router.push("/dashboard");
    } catch (error) {
      console.error("Guest login error:", error);
    }
  }
