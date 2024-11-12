// page.js
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserAuth } from "./_utils/auth-context";

export default function LandingPage() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    try {
      setLoading(true);
      await gitHubSignIn();
    } catch (error) {
      console.error("Error signing in:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      setLoading(true);
      await firebaseSignOut();
      router.push("/week-9");
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
    <h1 className="text-4xl font-bold mb-6">Shopping List App</h1>
    {loading ? (
      <p>Loading...</p>
    ) : user ? (
      <div className="text-lg">
        <p className="mb-4">
          Welcome, {user.displayName} ({user.email})
        </p>
        <p>
        <button
          onClick={handleSignOut}
          className="transition"
        >
          Sign Out
        </button>
        </p>
        <p>
        <button
          onClick={() => router.push("/week-9/shopping-list")}
        >
          Go to Shopping List
        </button>
        </p>
      </div>
    ) : (
      <button
        onClick={handleSignIn}
      >
        Sign in with GitHub
      </button>
    )}
  </div>  
  );
}
