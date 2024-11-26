"use client";
import { TodoList } from "@lib/components";
import { TOKEN } from "@lib/util/config";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem(TOKEN); // Get token from utility

    if (!token) {
      // If no token, redirect to login page
      router.push("/login");
    }
  }, [router]);
  return (
    <div className="p-8">
      <TodoList />
    </div>
  );
};

export default HomePage;
