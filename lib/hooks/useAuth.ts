"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TOKEN } from "@lib/util/config";

export function useAuth() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [signedIn, setSignedIn] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    setSignedIn(!!sessionStorage.getItem(TOKEN));
  }, []);

  // Register a new user
  const registerUser = async (userData: { name: string; email: string; username: string; password: string }) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  // Login user and store JWT
  const loginUser = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      sessionStorage.setItem(TOKEN, data.token);
      location.assign("/");
      setSignedIn(true);
      setIsLoading(false);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  // Sign out user
  const signOut = () => {
    sessionStorage.removeItem(TOKEN);
    setSignedIn(false);
    router.push("/login");
  };

  return { registerUser, loginUser, signOut, isLoading, signedIn };
}
