"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { useAuth } from "@lib/hooks/useAuth";

export default function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const { loginUser, isLoading } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    try {
      await loginUser(formData.username, formData.password);
    } catch (error) {
      setErrorMessage("Invalid username or password");
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-xl font-semibold my-5">Sign In</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 w-full"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-5 w-full">
          <label className="w-full sm:w-32">Username</label>
          <input
            name="username"
            type="text"
            value={formData.username}
            onChange={handleInputChange}
            className="w-full sm:flex-1 border border-gray-300 p-2"
            placeholder="Enter username"
            disabled={isLoading}
          />
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-5 w-full">
          <label className="w-full sm:w-32">Password</label>
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full sm:flex-1 border border-gray-300 p-2"
            placeholder="Enter password"
            disabled={isLoading}
          />
        </div>

        {/* Display error message if login fails */}
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}

        <button
          type="submit"
          className={`mt-5 bg-blue-500 text-white p-2 rounded-md ${isLoading ? "opacity-50" : ""}`}
          disabled={isLoading}
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
