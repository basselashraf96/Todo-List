"use client";
import { TodoList } from "@lib/components";
import { getToken } from "@lib/util/jwt";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    const token = getToken(); // Get token from utility

    if (!token) {
      // If no token, redirect to login page
      router.push("/login");
    }
  }, [router]);
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">To-Do List</h1>
      <TodoList />
    </div>
  );
};

export default HomePage;
