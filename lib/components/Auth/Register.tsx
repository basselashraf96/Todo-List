"use client";
import { useAuth } from "@lib/hooks/useAuth";
import { useState, ChangeEvent, FormEvent } from "react";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
    const { registerUser } = useAuth();

  const [errorMessage, setErrorMessage] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setPasswordsMatch(false);
      setErrorMessage("Passwords do not match");
      return;
    }

    setPasswordsMatch(true);
    setErrorMessage("");


    registerUser(formData);
  };

  return (
    <div className="p-5">
      <h1 className="text-xl font-semibold my-5">Register</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 w-full"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-5 w-full">
          <label className="w-full sm:w-32 whitespace-nowrap">Name</label>
          <input
            name="name"
            type="text"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full sm:flex-1 border border-gray-300 p-2"
            placeholder="Enter name"
          />
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-5 w-full">
          <label className="w-full sm:w-32 whitespace-nowrap">Email</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full sm:flex-1 border border-gray-300 p-2"
            placeholder="Enter email"
          />
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-5 w-full">
          <label className="w-full sm:w-32 whitespace-nowrap">Username</label>
          <input
            name="username"
            type="text"
            value={formData.username}
            onChange={handleInputChange}
            className="w-full sm:flex-1 border border-gray-300 p-2"
            placeholder="Enter username"
          />
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-5 w-full">
          <label className="w-full sm:w-32 whitespace-nowrap">Password</label>
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            className={`w-full sm:flex-1 border ${passwordsMatch ? "border-gray-300" : "border-red-500"} p-2`}
            placeholder="Enter password"
          />
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-5 w-full">
          <label className="w-full sm:w-32 whitespace-nowrap">Confirm Password</label>
          <input
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className={`w-full sm:flex-1 border ${passwordsMatch ? "border-gray-300" : "border-red-500"} p-2`}
            placeholder="Confirm Password"
          />
        </div>

        {/* Show error message if passwords don't match */}
        {!passwordsMatch && <p className="text-red-500">{errorMessage}</p>}

        <button
          type="submit"
          className="mt-5 bg-blue-500 text-white p-2 rounded-md"
        >
          Register
        </button>
      </form>
    </div>
  );
}
