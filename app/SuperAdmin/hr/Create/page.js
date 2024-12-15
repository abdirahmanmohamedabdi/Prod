"use client";

import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../../../components/Sidebar";

export default function CreateUserPage() {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form submitted");
    console.log("Username:", username);
    console.log("Password:", password);
    console.log("Role:", role);

    try {
      console.log("Attempting to create user via API");
      const response = await fetch('/api/create-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, role }),
      });

      // Log the raw response for debugging
      console.log("Response received:", response);

      const data = await response.json();

      if (response.ok) {
        console.log("User created:", data.user);
        setUsers([...users, data.user]);
        toast.success("User created successfully");
        // Reset form fields
        setUsername("");
        setRole("");
        setPassword("");
      } else {
        console.error("Error creating user:", data.error);
        toast.error(data.error || "Failed to create user");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to create user");
    }
  };

  return (
    <Sidebar>
      <div className="min-h-screen bg-gray-100 p-6">
        <ToastContainer />
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Create User</h1>
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 shadow rounded-md">
          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Role */}
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Role</option>
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
              <option value="SuperAdmin">SuperAdmin</option>
            </select>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create User
          </button>
        </form>
      </div>
    </Sidebar>
  );
}