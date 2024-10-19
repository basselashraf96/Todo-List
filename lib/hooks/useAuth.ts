"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function useAuth() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

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
    } catch (error) {
      console.error("Error registering user:", error);
    } finally {
      setIsLoading(false);
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
      localStorage.setItem("token", data.token); // Store JWT token
      router.push("/");
    } catch (error) {
      console.error("Error logging in:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { registerUser, loginUser, isLoading };
}
