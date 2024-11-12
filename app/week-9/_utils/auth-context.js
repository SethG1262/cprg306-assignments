"use client";

import { useContext, createContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GithubAuthProvider,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "./firebase";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  // GitHub Sign-In function
  const gitHubSignIn = async () => {
    const provider = new GithubAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      // No redirect here, so the user stays on the current page
    } catch (error) {
      console.error("Error signing in with GitHub:", error);
    }
  };

  // Google Sign-In function
  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      // No redirect here, so the user stays on the current page
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  // Sign-Out function with redirect to landing page
  const firebaseSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/"); // Redirect to landing page after sign out
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, gitHubSignIn, googleSignIn, firebaseSignOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useUserAuth = () => {
  return useContext(AuthContext);
};
