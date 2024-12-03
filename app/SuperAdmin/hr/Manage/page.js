"use client";

import { useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({});
  const [loading, setLoading] = useState(false);
  // Fetch Users (Replace this with your backend API)
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        // Placeholder for API call to fetch users
        const fetchedUsers = [
          { id: 1, name: "John Doe", email: "john@example.com", role: "Hr", password: "password123" },
          { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Finance", password: "password123" },
          { id: 3, name: "Admin User", email: "admin@example.com", role: "Superadmin", password: "password123" },
        ];
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Handle Delete User
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      // Placeholder for API call to delete user
      console.log("Deleted user with ID:", id);

      // Update state after deletion
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  // Handle Edit User
  const handleEdit = (user) => {
    setEditingUser(user.id);
    setUpdatedUser(user);
  };

  // Save Edited User
  const handleSave = async () => {
    try {
      // Placeholder for API call to update user
      console.log("Updated user:", updatedUser);

      setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
      setEditingUser(null);
      setUpdatedUser({});
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  // Handle Input Change for Editing
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
  };

  return (
    <Sidebar>
    <div className="min-h-fit bg-gray-100 flex flex-col p-8">
      <h1 className="text-3xl font-semibold font-font text-gray-800 mb-6">Manage Users</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-lg p-6">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-black font-font uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium font-font text-black uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium font-font text-black uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium font-font text-black uppercase tracking-wider">
                  Password
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium font-font text-black uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 font-font py-4">
                    {editingUser === user.id ? (
                      <input
                        type="text"
                        name="name"
                        value={updatedUser.name}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-2 py-1"
                      />
                    ) : (
                      user.name
                    )}
                  </td>
                  <td className="px-6 font-font py-4">
                    {editingUser === user.id ? (
                      <input
                        type="email"
                        name="email"
                        value={updatedUser.email}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-2 py-1"
                      />
                    ) : (
                      user.email
                    )}
                  </td>
                  <td className="px-6 font-font py-4">
                    {editingUser === user.id ? (
                      <select
                        name="role"
                        value={updatedUser.role}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-2 py-1"
                      >
                        <option value="hr">HR</option>
                        <option value="finance">Finance</option>
                        <option value="superadmin">SuperAdmin</option>
                      </select>
                    ) : (
                      user.role
                    )}
                  </td>
                  <td className="px-6 font-font py-4">
                    {editingUser === user.id ? (
                      <input
                        type="password"
                        name="password"
                        value={updatedUser.password}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-2 py-1"
                      />
                    ) : (
                      "********" // Masked password
                    )}
                  </td>
                  <td className="px-6 py-4 font-font text-right">
                    {editingUser === user.id ? (
                      <button
                        onClick={handleSave}
                        className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700"
                      >
                        Save
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEdit(user)}
                          className="bg-blue-600 text-white font-font px-3 py-1 rounded-md hover:bg-blue-700 mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="bg-red-600 text-white font-font px-3 py-1 rounded-md hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    </Sidebar>
  );
}
